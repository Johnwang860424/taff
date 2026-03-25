import { z } from "zod";

export const orderBodySchema = z.object({
  form: z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    address: z.string(),
    note: z.string(),
    facebook: z.string().optional().default(""),
    instagram: z.string().optional().default(""),
  }),
  deliveryMethod: z.enum(["pickup", "shippable"]),
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        flavor: z.string().min(1),
        pickupDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        quantity: z.number().int().min(1),
        price: z.number().min(0),
        category: z.enum(["pickupOnly", "shippable"]),
      }),
    )
    .min(1),
});

export type OrderBody = z.infer<typeof orderBodySchema>;
export type OrderItem = OrderBody["items"][number];
export type OrderForm = OrderBody["form"];
