# ZCard Master Template
**TAP · zcard.ca · Built for Vercel**

Mobile-first digital business card platform. Each card lives at `zcard.ca/[slug]`.
Cards are plain JSON files — no database, no backend, no env vars required.

---

## Stack
| Layer | Tool | Cost |
|-------|------|------|
| Hosting / routing | Vercel Pro | $20/mo |
| Card storage | JSON files in `data/cards/` | $0 |
| Forms / lead capture | Tally Free | $0 |
| Edge sync (Manila, optional) | Cloudflare Workers Paid | $5/mo |

---

## File structure

```
data/
  cards/
    william-saldanha.json   ← one file per card
    [slug].json             ← add more cards here

app/
  layout.tsx                ← root layout, Google Fonts
  not-found.tsx             ← 404 for missing/inactive cards
  [slug]/
    page.tsx                ← server component: reads JSON, renders card

components/
  ZCardView.tsx             ← full card UI (client component)

lib/
  types.ts                  ← ZCardProfile TypeScript schema
  getCard.ts                ← reads card from data/cards/[slug].json
  vcard.ts                  ← .vcf generator for Save Contact
  demo.ts                   ← reference only

.env.local.example          ← optional Cloudflare vars only
```

---

## Adding a new card

1. Copy `data/cards/william-saldanha.json`
2. Rename to `data/cards/[new-slug].json`
3. Edit the fields
4. Commit and push — Vercel auto-deploys
5. Card is live at `zcard.ca/[new-slug]`

That's it. No database, no dashboard, no migrations.

---

## Card JSON structure

```json
{
  "slug": "first-last",
  "name": "Full Name",
  "title": "Job Title",
  "company": "Company Name",
  "tagline": "One line that makes people want to connect.",
  "avatar": "https://...",
  "cover": "https://...",
  "actions": [
    { "type": "call",     "label": "Call",     "value": "+1..." },
    { "type": "email",    "label": "Email",    "value": "name@..." },
    { "type": "whatsapp", "label": "WhatsApp", "value": "+1..." },
    { "type": "url",      "label": "Website",  "value": "https://..." }
  ],
  "socials": [
    { "platform": "linkedin", "url": "https://linkedin.com/in/..." }
  ],
  "bio": "Optional about text.",
  "tallyFormId": "",
  "tier": "core",
  "accentColor": "#C9A84C",
  "darkMode": true,
  "active": true,
  "createdAt": "2026-06-01T00:00:00Z",
  "updatedAt": "2026-06-01T00:00:00Z"
}
```

### Action types
| type | opens |
|------|-------|
| `call` | Phone dialer |
| `whatsapp` | WhatsApp chat |
| `email` | Email client |
| `sms` | SMS |
| `url` | Browser |
| `map` | Google Maps |
| `tally` | Tally form |

### Tiers
| Feature | Core | Pro | Premium |
|---------|------|-----|---------|
| Actions | 2 | 4 | Unlimited |
| Tally form embed | — | ✓ | ✓ |
| Custom accent color | — | — | ✓ |
| Custom subdomain | — | — | ✓ |

---

## Domain routing (Vercel)
- `zcard.ca/[slug]` — all client cards
- `tap.zcard.ca` — TAP marketing site
- `[name].zcard.ca` — Premium custom subdomains (wildcard DNS)

---

*Built by TAP · Toronto · 2026*
