// ── Product ───────────────────────────────────────────────────────
export type Category =
  | "GROUND_MASALA"
  | "WHOLE_SPICE"
  | "BLENDED_MIX"
  | "PREMIUM_RANGE";

export const CATEGORY_LABELS: Record<Category, string> = {
  GROUND_MASALA: "Ground Masala",
  WHOLE_SPICE:   "Whole Spice",
  BLENDED_MIX:   "Blended Mix",
  PREMIUM_RANGE: "Premium Range",
};

export interface Product {
  id:          string;
  name:        string;
  slug:        string;
  category:    Category;
  weight:      string;
  description: string;
  badge:       string | null;
  imageUrl:    string;
  accentColor: string;
  inStock:     boolean;
  sortOrder:   number;
  createdAt:   string;
  updatedAt:   string;
}

// ── Enquiry ───────────────────────────────────────────────────────
export type EnquiryStatus = "NEW" | "SEEN" | "REPLIED" | "CLOSED";

export interface Enquiry {
  id:        string;
  name:      string;
  phone:     string;
  email:     string;
  quantity:  string | null;
  message:   string | null;
  status:    EnquiryStatus;
  productId: string | null;
  product:   { name: string } | null;
  createdAt: string;
}

// ── API Response ──────────────────────────────────────────────────
export interface ApiSuccess<T> {
  success: true;
  data:    T;
}
export interface ApiError {
  success: false;
  error:   string;
}
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ── Phase (splash → entering → ready) ────────────────────────────
export type Phase = "splash" | "entering" | "ready";
