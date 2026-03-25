"use client";

import { useState, useRef, useEffect } from "react";
import { Facebook, Instagram, ChevronDown } from "lucide-react";

type Platform = "facebook" | "instagram";

type Props = {
  value: Platform;
  onChange: (value: Platform) => void;
  hasError: boolean;
};

const PLATFORMS = [
  {
    value: "instagram" as const,
    label: "Instagram",
    icon: <Instagram size={14} className="text-pink-500" />,
  },
  {
    value: "facebook" as const,
    label: "Facebook",
    icon: <Facebook size={14} className="text-blue-500" />,
  },
];

const SocialPlatformSelect = ({ value, onChange, hasError }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = PLATFORMS.find((p) => p.value === value)!;

  return (
    <div className="relative w-36 shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-2 border-b ${
          hasError ? "border-red-400" : "border-gray-300"
        } py-3 text-base font-sans text-gray-800 focus:outline-none focus:border-accent-gold transition-colors`}
      >
        <span className="flex items-center gap-2">
          {current.icon}
          <span>{current.label}</span>
        </span>
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 z-20 w-full bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden">
          {PLATFORMS.map((platform) => (
            <button
              key={platform.value}
              type="button"
              onClick={() => {
                onChange(platform.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm font-sans transition-colors ${
                value === platform.value
                  ? "bg-accent-gold/5 text-accent-gold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {platform.icon}
              {platform.label}
              {value === platform.value && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-gold" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialPlatformSelect;
