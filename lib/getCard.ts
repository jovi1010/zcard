// lib/getCard.ts — data access layer
// Fetches ZCardProfile from Supabase by slug.
// Server-side only (Next.js server component / generateMetadata).

import { createClient } from "@supabase/supabase-js";
import type { ZCardProfile } from "./types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getCard(slug: string): Promise<ZCardProfile | null> {
  const { data, error } = await supabase
    .from("zcards")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (error || !data) return null;
  return data as ZCardProfile;
}
