# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Taff Dessert Studio — a Next.js 16 (App Router) storefront for a dessert brand: a home page, an online menu, a cart/checkout flow, and a merged about page (brand story + contact info) at `/brand`. It deploys to Cloudflare Workers via OpenNext, and reads/writes all data through Cloudflare bindings (D1 + R2) rather than external SaaS. A separate admin project (`taff-backend`, not in this repo) manages products/inventory/site images in the same D1/R2 resources and calls this app's `/api/revalidate` endpoint to bust caches after edits.

The Chinese README describes an earlier Google Sheets + Cloudinary architecture — that has been fully replaced by D1/R2 (see "Data architecture" below); treat the README's data-flow section as stale.

## Commands

```bash
npm run dev      # next dev --turbo (also runs initOpenNextCloudflareForDev, see next.config.ts)
npm run build    # next build
npm run lint     # eslint
npm run cf-typegen  # regenerate cloudflare-env.d.ts from wrangler.jsonc bindings

npm run preview  # opennextjs-cloudflare build && preview — build+run the actual Worker locally
npm run deploy   # opennextjs-cloudflare build && deploy — build+deploy the Worker
npm run upload   # opennextjs-cloudflare build && upload — build+upload a new Worker version
```

There is no test suite configured in this repo. Verify changes via `npm run lint`, `npm run build`, and by exercising the app in the browser (`npm run dev`, or `npm run preview` for Worker-accurate behavior with real D1/R2 bindings).

`npm run dev` does not have real D1/R2 data available unless local bindings are seeded — `npm run preview` runs against the actual `.open-next` Worker build with wrangler-managed local bindings, which is the closer-to-production way to check data-dependent pages (menu, cart submit).

## Architecture

### Cloudflare bindings, not env vars

Almost all data access goes through bindings declared in `wrangler.jsonc`, accessed via `lib/cloudflare.ts`'s `getDb()` (D1, binding `DB`) and `getImagesBucket()` (R2, binding `IMAGES_BUCKET`), both wrapping `getCloudflareContext()` from `@opennextjs/cloudflare`. The only actual secret is `ADMIN_SECRET_TOKEN` (`.env.local`), used to authorize `POST /api/revalidate`.

Two other R2/D1-backed pieces:
- `NEXT_INC_CACHE_R2_BUCKET` — OpenNext's own incremental cache store (see `open-next.config.ts`), unrelated to app data.
- `IMAGES` — Cloudflare Images optimization binding.

### Menu data flow (`lib/menu.ts`)

- D1 tables: `products`, `variants` (flavor + price per product), `inventory` (stock per variant per pickup date).
- `getStaticData()` wraps the products+variants query in `unstable_cache` tagged `"menu"` — this is invalidated on demand by the admin backend calling `POST /api/revalidate` with that tag, not by time.
- `getMenuData()` always re-reads `inventory` live (uncached) on every request, then merges it with the cached static data in `buildMenuData()`.
- Products are split into `shippableItems` (category `"宅配"`) vs `pickupOnlyItems` (category `"自取"`) — this pickup/shippable distinction is the recurring domain split threaded through cart, order form, and validation.
- Image URLs stored in D1 may be absolute URLs from either this worker or the admin worker; `lib/images.ts`'s `toLocalImageUrl()` rewrites any `/api/images/...` URL to a relative path so images are always served by whichever worker renders the page.

### Image serving (`app/api/images/[...key]/route.ts`, `lib/site-images.ts`)

- All images (product photos, fixed site images for home/brand-story/contact) live in the `IMAGES_BUCKET` R2 bucket and are served through this app's own `/api/images/[...key]` route (ETag + 1-day cache), not a CDN.
- `getSiteImageUrl(key)` in `lib/site-images.ts` looks up one of three fixed R2 keys (`site/home`, `site/brand-story`, `site/contact`) and appends `?v=<uploadedTimestamp>` for cache-busting — if nothing has been uploaded yet it returns `""`. The `site/contact` key is currently unused (the contact page was merged into `/brand`) but is kept because the admin backend can still upload to it.

### Order submission (`app/api/order/route.ts`, `lib/order/*`)

Single-request flow, in order:
1. `lib/order/validation.ts` — zod schema (`orderBodySchema`) validates the request shape.
2. `lib/order/inventory.ts`'s `checkInventory()` — resolves each cart item's `(name, flavor)` to a `variant_id`, sums required quantity per `(variantId, pickupDate)`, and compares against `inventory.stock`. Returns per-item insufficient-stock messages (client gets HTTP 409 with `items: string[]`).
3. `lib/order/repository.ts`'s `writeOrder()` — inserts into `orders` + `order_items` and decrements `inventory.stock`, all as one `db.batch()` (atomic).

Client-side, `hooks/useOrderForm.ts` runs a social-account existence check (`GET /api/social-validate`, scrapes facebook.com/instagram.com — best-effort, treats timeouts/ambiguous responses as "skip, don't block") before submitting the order.

### Cart state (`context/CartContext.tsx`)

- Cart identity key is `(name, flavor, pickupDate)` via `cartItemKey()` — same product+flavor on a different pickup date is a distinct line item, not a quantity bump. Anything touching cart merging/dedup logic must preserve this.
- Persisted to `localStorage` (`taff_cart`); on load, items whose `pickupDate` is already in the past are silently dropped.

### Cache invalidation contract

`POST /api/revalidate` (Bearer-style `Authorization` header checked against `ADMIN_SECRET_TOKEN`) calls `revalidateTag(tag, "max")`. This is the only invalidation path for the `"menu"` tag — there is no time-based revalidation for product/variant data. The admin backend is expected to call this after any product/variant mutation.

### Routing & app shell

`/` home, `/menu`, `/brand` (關於塔芙 — merged brand story + contact info), `/cart` — each page under `app/` is a thin wrapper that renders the corresponding component from `components/{home,brand,menu,cart}/` (cart renders inline in `app/cart/page.tsx`). There is no `/contact` route anymore; the former contact page's content lives on `/brand`.

Navigation is rendered by two components in `app/layout.tsx`, switching at the `md` breakpoint:
- `components/Navbar.tsx` — one sticky `top-0` block containing the mobile top bar (h-14, brand identity only) and the desktop nav (links from `constants/menu.ts` + cart icon with badge).
- `components/MobileTabBar.tsx` — fixed bottom tab bar (`md:hidden`, h-16 + `env(safe-area-inset-bottom)`), tabs 首頁/菜單/購物車/我們.

Bottom-bar geometry is a contract shared across files: the layout wraps children in `pb-[calc(64px+env(safe-area-inset-bottom))] md:pb-0`, the cart submit bar sticks at `bottom-[calc(64px+env(safe-area-inset-bottom))]`, and the mobile menu category pills stick at `top-14` (below the h-14 header). Change one and you must change them together. Avoid `min-h-screen` on page `<main>`s — combined with the header/tab-bar space it makes even empty pages scroll.

Menu UI is split into `Desktop`/`Mobile` variant components rather than one responsive component (`components/menu/MenuDesktop.tsx` / `MenuMobile.tsx`, switched at `md` in `app/menu/page.tsx`); home and brand instead switch layouts internally at `lg`.

### Add-to-cart UI (shared)

The order-selection flow (pick flavor → pick pickup date → add) lives in `hooks/useMenuItemSelection.ts` and is rendered by shared shells: `components/menu/AddToCartSheet.tsx` (mobile bottom sheet, swipe-to-close) and `AddToCartDialog.tsx` (desktop centered modal), both wrapping `AddToCartModalContent`. The menu pages and the home 本週推薦 section (`components/home/FeaturedSection.tsx`) all reuse these — change the flow there, not per-page.

### Design system

Visual tokens (palette, fonts, `--radius-soft`, `--spacing-page`) are defined in `app/globals.css` `@theme` and documented in `DESIGN.md` (kept in sync with the implementation — update it when tokens or component conventions change). Icons are hairline (strokeWidth ~1.2–1.6); borders use `ghost-line` instead of shadows (the desktop add-to-cart dialog is the one sanctioned shadow).

### Deployment

Deploys as a Cloudflare Worker via `@opennextjs/cloudflare` (not Vercel). `wrangler.jsonc` defines the bindings above plus a self-reference service binding (`WORKER_SELF_REFERENCE`, required by OpenNext's caching model — see the linked docs in that file). `open-next.config.ts` wires the R2-backed incremental cache override.

## Spec workflow (OpenSpec)

This repo uses OpenSpec (`openspec/`) for spec-driven change proposals: `openspec/specs/*/spec.md` holds current-state specs (e.g. `cart-context`, `cart-item-flavor-pickup`, `menu-flavor-schedule`), and `openspec/changes/` holds proposed/archived change packages. If asked to plan a non-trivial feature, check `openspec/specs/` first for the relevant existing spec before proposing changes to that behavior.

Caveat: the `design-system` and `mobile-first-layout` specs predate the July 2026 redesign (they describe the old hamburger sidebar, editorial page numbers, and hover-list menu) — where they conflict with the code or `DESIGN.md`, the code/`DESIGN.md` is authoritative.
