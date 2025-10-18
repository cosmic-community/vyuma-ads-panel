// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// User types
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    email: string;
    password?: string; // Hashed password
    role: 'advertiser' | 'admin' | 'developer';
    status: 'active' | 'suspended' | 'pending';
    company_name?: string;
    phone?: string;
    verified?: boolean;
    spending_limit?: number;
    created_at?: string;
    last_login?: string;
  };
}

// Campaign types
export interface Campaign extends CosmicObject {
  type: 'campaigns';
  metadata: {
    user_id?: string;
    status: 'draft' | 'active' | 'paused' | 'completed';
    objective: 'brand_awareness' | 'website_traffic' | 'lead_generation' | 'conversions' | 'app_installs';
    budget_type: 'daily' | 'lifetime';
    daily_budget?: number;
    lifetime_budget?: number;
    start_date?: string;
    end_date?: string;
    impressions?: number;
    clicks?: number;
    conversions?: number;
    spend?: number;
    ctr?: number;
    cpc?: number;
    cpm?: number;
    roi?: number;
    created_at?: string;
  };
}

// Ad types
export interface Ad extends CosmicObject {
  type: 'ads';
  metadata: {
    campaign_id?: string;
    status: 'pending' | 'approved' | 'rejected' | 'active' | 'paused';
    format: 'image' | 'video' | 'carousel' | 'collection' | 'stories';
    media_url?: string;
    headline?: string;
    description?: string;
    cta?: string;
    landing_url?: string;
    impressions?: number;
    clicks?: number;
    conversions?: number;
    spend?: number;
    rejection_reason?: string;
    created_at?: string;
  };
}

// Audience types
export interface Audience extends CosmicObject {
  type: 'audiences';
  metadata: {
    user_id?: string;
    type: 'saved' | 'custom' | 'lookalike';
    locations?: string[];
    age_min?: number;
    age_max?: number;
    genders?: string[];
    interests?: string[];
    behaviors?: string[];
    created_at?: string;
  };
}

// Platform Settings
export interface PlatformSettings extends CosmicObject {
  type: 'platform_settings';
  metadata: {
    key: string;
    value: any;
    description?: string;
  };
}

// API Response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  role: 'advertiser' | 'admin' | 'developer';
  name: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

// Dashboard types
export interface DashboardMetrics {
  totalCampaigns: number;
  activeCampaigns: number;
  totalSpend: number;
  totalImpressions: number;
  totalClicks: number;
  averageCTR: number;
  averageCPC: number;
  totalConversions: number;
}

export interface AdminMetrics {
  totalUsers: number;
  activeUsers: number;
  pendingAds: number;
  totalRevenue: number;
  systemHealth: 'good' | 'warning' | 'critical';
  recentAlerts: Alert[];
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
}

// Form types
export interface CampaignFormData {
  title: string;
  objective: Campaign['metadata']['objective'];
  budget_type: Campaign['metadata']['budget_type'];
  daily_budget?: number;
  lifetime_budget?: number;
  start_date?: string;
  end_date?: string;
}

export interface AdFormData {
  title: string;
  campaign_id: string;
  format: Ad['metadata']['format'];
  media_url?: string;
  headline: string;
  description: string;
  cta: string;
  landing_url: string;
}

// Type guards
export function isUser(obj: CosmicObject): obj is User {
  return obj.type === 'users';
}

export function isCampaign(obj: CosmicObject): obj is Campaign {
  return obj.type === 'campaigns';
}

export function isAd(obj: CosmicObject): obj is Ad {
  return obj.type === 'ads';
}