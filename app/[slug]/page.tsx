// ZCard Master Template — TAP / zcard.ca
// app/[slug]/page.tsx
// Mobile-first. Drop into Next.js 14+ app router.

import type { Metadata } from "next";
import { getCard } from "@/lib/getCard";
import { notFound } from "next/navigation";
import ZCardView from "@/components/ZCardView";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const card = await getCard(params.slug);
  if (!card) return { title: "ZCard" };
  return {
    title: `${card.name} — ZCard`,
    description: card.tagline ?? `Connect with ${card.name}`,
    openGraph: {
      title: card.name,
      description: card.tagline ?? "",
      images: card.avatar ? [{ url: card.avatar }] : [],
    },
  };
}

export default async function ZCardPage({ params }: Props) {
  const card = await getCard(params.slug);
  if (!card) notFound();
  return <ZCardView card={card} />;
}
