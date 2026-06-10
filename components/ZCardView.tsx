"use client";
// components/ZCardView.tsx
// Mobile-first ZCard display component.
// Fonts loaded via next/font in layout.tsx — DM Serif Display + Inter.

import { useEffect, useState } from "react";
import type { ZCardProfile, ZCardAction, ZCardSocial } from "@/lib/types";
import { saveVCard } from "@/lib/vcard";

// ─── Icon map ────────────────────────────────────────────────────────────────

const ACTION_ICONS: Record<string, string> = {
  call: "📞",
  whatsapp: "💬",
  email: "✉️",
  sms: "💬",
  url: "🔗",
  map: "📍",
  tally: "📋",
};

const SOCIAL_ICONS: Record<string, string> = {
  linkedin: "in",
  instagram: "ig",
  facebook: "fb",
  twitter: "𝕏",
  tiktok: "tt",
  youtube: "yt",
  github: "gh",
  website: "www",
};

// ─── Action resolver ──────────────────────────────────────────────────────────

function resolveHref(action: ZCardAction): string {
  switch (action.type) {
    case "call":      return `tel:${action.value}`;
    case "whatsapp":  return `https://wa.me/${action.value.replace(/\D/g, "")}`;
    case "email":     return `mailto:${action.value}`;
    case "sms":       return `sms:${action.value}`;
    case "map":       return `https://maps.google.com/?q=${encodeURIComponent(action.value)}`;
    case "tally":     return `https://tally.so/r/${action.value}`;
    default:          return action.value;
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ActionButton({ action, primary }: { action: ZCardAction; primary: boolean }) {
  const href = resolveHref(action);
  const icon = action.icon ?? ACTION_ICONS[action.type] ?? "→";

  return (
    <a
      href={href}
      target={action.type === "url" || action.type === "tally" ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={`zc-action-btn ${primary ? "zc-action-primary" : "zc-action-secondary"}`}
    >
      <span className="zc-action-icon">{icon}</span>
      <span className="zc-action-label">{action.label}</span>
    </a>
  );
}

function SocialChip({ social }: { social: ZCardSocial }) {
  const label = SOCIAL_ICONS[social.platform] ?? social.platform.slice(0, 2).toUpperCase();
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="zc-social-chip"
      aria-label={social.platform}
    >
      {label}
    </a>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ZCardView({ card }: { card: ZCardProfile }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const accent = card.accentColor ?? "#C9A84C";
  const primaryActions = card.actions.slice(0, 2);
  const secondaryActions = card.actions.slice(2);

  return (
    <>
      <style>{`
        /* ── Reset & base ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink:      #0A0A0F;
          --surface:  #13131A;
          --surface2: #1C1C26;
          --platinum: #E8E4DC;
          --muted:    #7A7A8C;
          --white:    #FFFFFF;
          --accent:   ${accent};
          --radius-pill: 100px;
          --radius-card: 20px;
          --font-display: 'DM Serif Display', Georgia, serif;
          --font-body:    'Inter', system-ui, sans-serif;
        }

        html { background: var(--ink); }

        body {
          background: var(--ink);
          color: var(--white);
          font-family: var(--font-body);
          min-height: 100dvh;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Page shell ── */
        .zc-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100dvh;
          padding: 0 0 env(safe-area-inset-bottom, 24px);
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .zc-page.mounted { opacity: 1; transform: translateY(0); }

        /* ── Cover / header ── */
        .zc-cover {
          width: 100%;
          height: 220px;
          background: var(--surface);
          background-image: ${card.cover ? `url(${card.cover})` : "none"};
          background-size: cover;
          background-position: center top;
          position: relative;
          flex-shrink: 0;
        }
        .zc-cover::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, var(--ink) 100%);
        }

        /* ── Avatar ── */
        .zc-avatar-wrap {
          position: absolute;
          bottom: -52px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }
        .zc-avatar {
          width: 104px;
          height: 104px;
          border-radius: 50%;
          border: 3px solid var(--accent);
          object-fit: cover;
          background: var(--surface2);
          display: block;
        }
        .zc-avatar-placeholder {
          width: 104px;
          height: 104px;
          border-radius: 50%;
          border: 3px solid var(--accent);
          background: var(--surface2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 2.4rem;
          color: var(--accent);
        }

        /* ── Body card ── */
        .zc-body {
          width: 100%;
          max-width: 480px;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        /* ── Nameplate ── */
        .zc-nameplate {
          margin-top: 64px;
          width: 100%;
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--accent);
          margin-bottom: 12px;
        }
        .zc-name {
          font-family: var(--font-display);
          font-size: clamp(1.9rem, 6vw, 2.6rem);
          font-weight: 400;
          color: var(--white);
          letter-spacing: -0.01em;
          line-height: 1.1;
        }
        .zc-title {
          margin-top: 6px;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .zc-company {
          margin-top: 2px;
          font-size: 0.9rem;
          color: var(--muted);
        }

        /* ── Tagline ── */
        .zc-tagline {
          font-size: 0.95rem;
          color: var(--platinum);
          text-align: center;
          line-height: 1.55;
          margin-bottom: 24px;
          opacity: 0.85;
          max-width: 320px;
        }

        /* ── Actions ── */
        .zc-actions {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 16px;
        }
        .zc-actions-row {
          display: grid;
          gap: 10px;
        }
        .zc-actions-row.two  { grid-template-columns: 1fr 1fr; }
        .zc-actions-row.one  { grid-template-columns: 1fr; }

        .zc-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 18px;
          border-radius: var(--radius-pill);
          font-family: var(--font-body);
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.1s ease, opacity 0.15s ease;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .zc-action-btn:active {
          transform: scale(0.96);
          opacity: 0.88;
        }
        .zc-action-primary {
          background: var(--accent);
          color: var(--ink);
        }
        .zc-action-secondary {
          background: var(--surface2);
          color: var(--platinum);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .zc-action-icon { font-size: 1rem; line-height: 1; }
        .zc-action-label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* ── Save contact CTA ── */
        .zc-save-btn {
          width: 100%;
          padding: 15px;
          border-radius: var(--radius-pill);
          border: 1px solid rgba(201,168,76,0.35);
          background: transparent;
          color: var(--accent);
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.1s ease;
          -webkit-tap-highlight-color: transparent;
          margin-bottom: 28px;
        }
        .zc-save-btn:active {
          transform: scale(0.97);
          background: rgba(201,168,76,0.08);
        }

        /* ── Bio ── */
        .zc-bio {
          width: 100%;
          background: var(--surface);
          border-radius: var(--radius-card);
          padding: 18px 20px;
          font-size: 0.9rem;
          line-height: 1.65;
          color: var(--platinum);
          margin-bottom: 20px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .zc-bio-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 8px;
        }

        /* ── Socials ── */
        .zc-socials {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 32px;
        }
        .zc-social-chip {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--surface2);
          border: 1px solid rgba(255,255,255,0.07);
          color: var(--platinum);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-decoration: none;
          transition: border-color 0.15s, color 0.15s, transform 0.1s;
          -webkit-tap-highlight-color: transparent;
        }
        .zc-social-chip:active {
          transform: scale(0.93);
          border-color: var(--accent);
          color: var(--accent);
        }

        /* ── Tally form embed ── */
        .zc-tally-wrap {
          width: 100%;
          margin-bottom: 24px;
        }
        .zc-tally-wrap iframe {
          width: 100%;
          min-height: 420px;
          border: none;
          border-radius: var(--radius-card);
          background: var(--surface);
        }

        /* ── Footer ── */
        .zc-footer {
          margin-top: auto;
          padding: 24px 0 12px;
          text-align: center;
          font-size: 0.7rem;
          color: var(--muted);
          letter-spacing: 0.06em;
        }
        .zc-footer a {
          color: var(--accent);
          text-decoration: none;
          opacity: 0.7;
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .zc-page { transition: none; opacity: 1; transform: none; }
          .zc-action-btn, .zc-save-btn, .zc-social-chip { transition: none; }
        }

        /* ── Desktop polish ── */
        @media (min-width: 520px) {
          .zc-cover { height: 260px; border-radius: 0 0 24px 24px; }
          .zc-body { padding: 0 32px; }
        }
      `}</style>

      <div className={`zc-page${mounted ? " mounted" : ""}`}>

        {/* Cover */}
        <div className="zc-cover">
          <div className="zc-avatar-wrap">
            {card.avatar ? (
              <img className="zc-avatar" src={card.avatar} alt={card.name} />
            ) : (
              <div className="zc-avatar-placeholder">
                {card.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="zc-body">

          {/* Nameplate */}
          <div className="zc-nameplate">
            <h1 className="zc-name">{card.name}</h1>
            {card.title && <p className="zc-title">{card.title}</p>}
            {card.company && <p className="zc-company">{card.company}</p>}
          </div>

          {/* Tagline */}
          {card.tagline && <p className="zc-tagline">{card.tagline}</p>}

          {/* Primary & secondary actions */}
          <div className="zc-actions">
            {primaryActions.length > 0 && (
              <div className={`zc-actions-row ${primaryActions.length === 2 ? "two" : "one"}`}>
                {primaryActions.map((a, i) => (
                  <ActionButton key={i} action={a} primary={true} />
                ))}
              </div>
            )}
            {secondaryActions.map((a, i) => (
              <div className="zc-actions-row one" key={i}>
                <ActionButton action={a} primary={false} />
              </div>
            ))}
          </div>

          {/* Save contact */}
          <button
            className="zc-save-btn"
            onClick={() => saveVCard(card)}
          >
            + Save Contact
          </button>

          {/* Bio */}
          {card.bio && (
            <div className="zc-bio">
              <div className="zc-bio-label">About</div>
              <p>{card.bio}</p>
            </div>
          )}

          {/* Tally form */}
          {card.tallyFormId && card.tier !== "core" && (
            <div className="zc-tally-wrap">
              <iframe
                src={`https://tally.so/embed/${card.tallyFormId}?alignLeft=1&hideTitle=1&transparentBackground=1`}
                title="Contact form"
                loading="lazy"
              />
            </div>
          )}

          {/* Socials */}
          {card.socials && card.socials.length > 0 && (
            <div className="zc-socials">
              {card.socials.map((s, i) => (
                <SocialChip key={i} social={s} />
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <footer className="zc-footer">
          <a href="https://zcard.ca" target="_blank" rel="noopener noreferrer">
            Powered by ZCard
          </a>
        </footer>

      </div>
    </>
  );
}
