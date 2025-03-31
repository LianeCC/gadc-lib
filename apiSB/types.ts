export type SupabaseSessionStatus = 'IN_PROGRESS' | 'SAVED';

export interface SupabaseSession {
  id: string;
  status: SupabaseSessionStatus;
  created_at: string;
  updated_at: string;
}

export interface SupabaseCompany {
  id: string;
  session_id: string;
  siret: string | null;
  name: string | null;
  address: string | null;
  address_complement: string | null;
  postal_code: string | null;
  city: string | null;
  phone: string | null;
  mobile: string | null;
  email: string | null;
  certification_body: string | null;
  certification_login: string | null;
  certification_password: string | null;
  trackdechet_login: string | null;
  trackdechet_password: string | null;
  has_td: boolean;
  has_stock: boolean;
  had_stock_lastyear: boolean;
  has_manipulated: boolean;
  has_bought: boolean;
  is_selling: boolean;
  created_at: string;
  updated_at: string;
  siret_data_availableintd: boolean | null;
  siret_data_confirmed: boolean | null;
  readonly_fields: string[] | null;
}

export interface SupabaseFluid {
  id: string;
  name: string;
  order: number;
}

export interface SupabaseBilan {
  bilan_uid: string;
  session_id: string;
  fluid_id: string;
  fluid: SupabaseFluid;
  returned_qty_this_year_on_td: number;
  bought_qty_this_year_fr: number;
  bought_qty_this_year_eu: number;
  bought_qty_this_year_non_eu: number;
  data_for_return: boolean;
  data_for_buy: boolean;
}

export interface SupabaseDistributor {
  distributor_uid: string;
  session_id: string;
  nom: string;
  ville: string;
  distrib_siret: string;
  type: string;
  nom_contact: string;
  email_contact: string;
  tel_contact: string;
}

export interface SupabaseDatabase {
  public: {
    Tables: {
      sessions: {
        Row: SupabaseSession;
        Insert: Omit<SupabaseSession, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SupabaseSession, 'created_at' | 'updated_at'>>;
      };
      company: {
        Row: SupabaseCompany;
        Insert: Omit<SupabaseCompany, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SupabaseCompany, 'id' | 'created_at' | 'updated_at'>>;
      };
      fluid: {
        Row: SupabaseFluid;
        Insert: SupabaseFluid;
        Update: Partial<SupabaseFluid>;
      };
      bilan: {
        Row: SupabaseBilan;
        Insert: Omit<SupabaseBilan, 'bilan_uid'>;
        Update: Partial<Omit<SupabaseBilan, 'bilan_uid'>>;
      };
      distributor: {
        Row: SupabaseDistributor;
        Insert: Omit<SupabaseDistributor, 'distributor_uid'>;
        Update: Partial<Omit<SupabaseDistributor, 'distributor_uid'>>;
      };
    };
  };
} 