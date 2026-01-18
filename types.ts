
export type QRType = 
  | 'URL' | 'TEXT' | 'EMAIL' | 'PHONE' | 'SMS' 
  | 'VCARD' | 'MECARD' | 'LOCATION' | 'MP3' 
  | 'WIFI' | 'VIDEO' | 'PDF' | 'SOCIAL' | 'WHATSAPP';

export type BodyShape = 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
export type EyeFrameShape = 'square' | 'rounded' | 'extra-rounded';
export type EyeBallShape = 'square' | 'rounded';

export type View = 'home' | 'pro' | 'terms' | 'privacy' | 'cookies' | 'checkout' | 'signup' | 'login' | 'faq';

export interface QRConfig {
  content: string;
  type: QRType;
  bodyShape: BodyShape;
  eyeFrameShape: EyeFrameShape;
  eyeBallShape: EyeBallShape;
  bgColor: string;
  fgColor: string;
  isGradient: boolean;
  gradientColor?: string;
  logo?: string;
  resolution: number;
}

export type LangCode = 'pt' | 'en' | 'es' | 'fr';

export interface Language {
  code: LangCode;
  label: string;
  flag: string;
}

export interface Plan {
  id: 'free' | 'pro';
  name: string;
  price: number;
}

// User Profile in Session
export interface UserData {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  status: 'active' | 'inactive';
  subscriptionExpiresAt: string | null;
  plan: 'free' | 'pro';
}

// Complete Database Schema
export interface UserSchema extends UserData {
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}
