// lib/getCard.ts — data access layer
// Reads ZCardProfile from a JSON file at data/cards/[slug].json
// No database required. Add a card by dropping a JSON file in data/cards/.

import fs from "fs";
import path from "path";
import type { ZCardProfile } from "./types";

const CARDS_DIR = path.join(process.cwd(), "data", "cards");

export async function getCard(slug: string): Promise<ZCardProfile | null> {
  try {
    const filePath = path.join(CARDS_DIR, `${slug}.json`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const card = JSON.parse(raw) as ZCardProfile;
    if (!card.active) return null;
    return card;
  } catch {
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    return fs
      .readdirSync(CARDS_DIR)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", ""));
  } catch {
    return [];
  }
}
