# ZCard Master Template
**TAP · zcard.ca · Built for Vercel + Supabase**

Mobile-first digital business card platform. Each card lives at `zcard.ca/[slug]`.

---

## Stack
| Layer | Tool | Cost |
|-------|------|------|
| Hosting / routing | Vercel Pro | $20/mo |
| Database | Supabase Free | $0 |
| Edge sync (Manila) | Cloudflare Workers Paid | $5/mo |
| Forms / lead capture | Tally Free | $0 |

---

## File structure

```
app/
  layout.tsx          ← root layout, Google Fonts (DM Serif Display + Inter)
  not-found.tsx       ← 404 for missing/inactive cards
  [slug]/
    page.tsx          ← server component: fetches card, renders ZCardView

components/
  ZCardView.tsx       ← client component: full card UI

lib/
  types.ts            ← ZCardProfile TypeScript schema
  getCard.ts          ← Supabase data access (server-only)
  vcard.ts            ← .vcf generator for Save Contact
  demo.ts             ← sample card (William Saldanha)

supabase/
  schema.sql          ← run once in Supabase SQL editor

.env.local.example    ← copy to .env.local, fill in keys
```

---

## Quick start

1. **Clone / copy** this template into your Next.js 14+ project
2. Run `schema.sql` in your Supabase SQL editor
3. Copy `.env.local.example` → `.env.local` and fill in your keys
4. Add to `package.json` dependencies if not present:
   ```
   @supabase/supabase-js
   ```
5. Deploy to Vercel — set env vars in Project → Settings → Environment Variables

---

## Adding a new card

Insert a row into the `zcards` table in Supabase. Minimum fields:

```json
{
  "slug": "first-last",
  "name": "Full Name",
  "tier": "core",
  "active": true,
  "actions": [
    { "type": "call",  "label": "Call",  "value": "+1..." },
    { "type": "email", "label": "Email", "value": "name@..." }
  ]
}
```

Card is instantly live at `zcard.ca/first-last`.

---

## Tiers

| Feature | Core | Pro | Premium |
|---------|------|-----|---------|
| Actions | 2 | 4 | Unlimited |
| Tally form embed | — | ✓ | ✓ |
| Custom accent color | — | — | ✓ |
| Custom subdomain ([name].zcard.ca) | — | — | ✓ |
| Analytics | — | Basic | Full |

---

## Domain routing (Vercel)
- `zcard.ca/[slug]` — all client cards (wildcard catch-all)
- `tap.zcard.ca` — TAP marketing site
- `[name].zcard.ca` — Premium custom subdomains via wildcard DNS on Vercel

No Hostinger involvement. All routing through Vercel.

---

*Built by TAP · Toronto · 2026*
