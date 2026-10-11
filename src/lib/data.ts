// ── Core data & config for the Farooj Almasi app ──

export interface MenuItem {
  id: number | string;
  name: string;
  nameAr: string;
  /** App selling price (what the customer pays in the app). */
  price: number;
  /**
   * Phase 6 — standard restaurant menu price (what the counter would charge).
   * Absent for legacy items → defaults to `price` at read time. When set
   * higher than `price`, the delta is the app-exclusive saving that shows
   * on reports and the invoice.
   */
  menuPrice?: number;
  emoji: string;
  cal: string;
  available: boolean;
  qty?: number;
  /** Uploaded product photo URL (Firebase Storage or any URL, e.g. GitHub raw). */
  img?: string;
  /** Optional per-item note from the customer (e.g. "no onions"). Displays everywhere. */
  note?: string;
  /** Branches the item is sold at. ["all"] or a list of branchIds. Admin-managed. */
  branches?: string[];
  /** Per-branch on/off override; missing branchId key = follow `available`. Admin-managed. */
  availability?: Record<string, boolean>;
  /** Admin-editable long description shown on the product-detail sheet. Falls back to
   * a category-derived default when empty. */
  description?: string;
  descriptionAr?: string;
}
export type Menu = Record<string, MenuItem[]>;
export interface Branch {
  id: string;
  nameEn: string;
  nameAr: string;
  whatsapp: string;
  lat: number;
  lng: number;
  // Phase 4 additions — all optional so existing/hardcoded rows stay valid.
  phone?: string;
  address?: string;
  active?: boolean;
  hours?: { open?: string; close?: string };
  menuOverrides?: string[];
  prepMinutesPickup?: number;
  prepMinutesDelivery?: number;
}
export interface Coupon { discount: number; type: 'percent' | 'fixed'; label: string; }

// Default store WhatsApp. Blank until the real Farooj Almasi number is set here
// or a branch-specific number is added from the admin app.
export const WHATSAPP_NUMBER = '';
export const VAT_RATE = 0.15;

// Fallback list — used only when the live `branches` Firestore collection is empty.
// Farooj Almasi launches with NO seeded branches: add real branches from the
// admin app (Settings → Branches) and they appear here automatically.
export const BRANCHES: Branch[] = [];

// Promo codes unlocked by the loyalty & daily-streak rewards (see loyalty.ts /
// streak.ts). Add more promo codes from the admin app when you want them.
export const VALID_COUPONS: Record<string, Coupon> = {
  WELCOME5: { discount: 5, type: 'fixed', label: 'SR 5 off' },
  ALMASI10: { discount: 10, type: 'percent', label: '10% off' },
  FAROOJ15: { discount: 15, type: 'percent', label: '15% off' },
};

export const PAYMENT_METHODS: [string, string, string][] = [
  ['cash', '💵', 'Cash'],
];

export const PICKUP_SLOTS = ['ASAP', '15 min', '30 min', '45 min', '1 hour'];

// Fallback menu — used only when the live `menu` Firestore collection is empty.
// Farooj Almasi launches EMPTY: the category scaffold is kept so the menu screen
// renders cleanly; add real items from the admin app and they replace this.
export const DEFAULT_MENU: Menu = {
    "🍗 Chicken": [],
    "🍔 Burgers": [],
    "🌯 Sandwiches": [],
    "🍟 Sides": [],
    "🥤 Drinks": [],
};
