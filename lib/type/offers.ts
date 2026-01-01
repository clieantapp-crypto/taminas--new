// === EXTRA FEATURE ===
export interface ExtraFeature {
  id?: string;
  content: string;
  price: number;
  offer_id?: string;
}

// === EXTRA EXPENSE ===
export interface ExtraExpense {
  id?: string;
  reason: string;
  price: number;
  offer_id?: string;
}

// === COMPANY ===
export interface Company {
  id: string;
  name: string;
  image_url: string;
  created_at?: string;
  updated_at?: string;
}

// === OFFER ===
export interface Offer {
  id: string;
  companyId?: string;
  company_id?: string;
  name: string;
  type: string;
  main_price: number | string;
  extra_features: ExtraFeature[];
  extra_expenses: ExtraExpense[];
  company?: Company;
  created_at?: string;
  updated_at?: string;
}
