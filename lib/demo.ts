// lib/demo.ts — sample ZCardProfile for dev/preview
// William Saldanha — first ZCard client (Pro plan)

import type { ZCardProfile } from "./types";

export const DEMO_CARD: ZCardProfile = {
  slug: "william-saldanha",
  name: "William Saldanha",
  title: "VP Sales",
  company: "Fluid Exponents Canada",
  tagline: "Building high-trust revenue relationships across the Canadian tech sector.",
  avatar: "", // replace with real URL
  cover: "",  // optional header image URL

  actions: [
    { type: "call",      label: "Call",      value: "+14161234567" },
    { type: "email",     label: "Email",     value: "william@fluidexponents.ca" },
    { type: "whatsapp",  label: "WhatsApp",  value: "+14161234567" },
    { type: "url",       label: "Website",   value: "https://fluidexponents.ca" },
  ],

  socials: [
    { platform: "linkedin",  url: "https://linkedin.com/in/william-saldanha" },
    { platform: "instagram", url: "https://instagram.com/william.saldanha" },
  ],

  bio: "15+ years helping Canadian B2B companies scale their sales operations. Focused on SaaS, professional services, and enterprise partnerships.",

  tallyFormId: "", // add Tally form ID to enable lead capture

  tier: "pro",
  accentColor: "#C9A84C",
  darkMode: true,

  active: true,
  createdAt: "2026-06-01T00:00:00Z",
  updatedAt: "2026-06-01T00:00:00Z",
};
