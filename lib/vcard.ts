// lib/vcard.ts — generates and triggers download of a .vcf contact file

import type { ZCardProfile } from "./types";

export function saveVCard(card: ZCardProfile): void {
  const phone = card.actions.find((a) => a.type === "call")?.value ?? "";
  const email = card.actions.find((a) => a.type === "email")?.value ?? "";
  const website = card.actions.find((a) => a.type === "url")?.value ?? "https://zcard.ca";

  const vcf = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${card.name}`,
    card.title && card.company
      ? `TITLE:${card.title}\nORG:${card.company}`
      : card.title
      ? `TITLE:${card.title}`
      : card.company
      ? `ORG:${card.company}`
      : "",
    phone ? `TEL;TYPE=CELL:${phone}` : "",
    email ? `EMAIL:${email}` : "",
    website ? `URL:${website}` : "",
    card.avatar ? `PHOTO;VALUE=URI:${card.avatar}` : "",
    card.tagline ? `NOTE:${card.tagline}` : "",
    `X-ZCARD-URL:https://zcard.ca/${card.slug}`,
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\n");

  const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${card.name.replace(/\s+/g, "_")}.vcf`;
  a.click();
  URL.revokeObjectURL(url);
}
