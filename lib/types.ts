// lib/types.ts — ZCardProfile schema

export type ActionType =
  | "call"
  | "whatsapp"
  | "email"
  | "sms"
  | "url"
  | "map"
  | "tally";

export interface ZCardAction {
  type: ActionType;
  label: string;
  value: string; // phone, email address, URL, Tally form ID, etc.
  icon?: string; // optional override emoji or icon name
}

export type SocialPlatform =
  | "linkedin"
  | "instagram"
  | "facebook"
  | "twitter"
  | "tiktok"
  | "youtube"
  | "github"
  | "website";

export interface ZCardSocial {
  platform: SocialPlatform;
  url: string;
}

export type ZCardTier = "core" | "pro" | "premium";

export interface ZCardProfile {
  // Identity
  slug: string;
  name: string;
  title?: string;
  company?: string;
  tagline?: string;
  avatar?: string; // URL
  cover?: string;  // URL — optional header image

  // Contact actions (ordered — first 2 shown as primary pills)
  actions: ZCardAction[];

  // Social links
  socials?: ZCardSocial[];

  // About / bio block
  bio?: string;

  // Optional: Tally form embed (lead capture)
  tallyFormId?: string;

  // Plan tier controls feature visibility
  tier: ZCardTier;

  // Theme override (Premium only)
  accentColor?: string; // hex
  darkMode?: boolean;   // default true

  // Meta
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
