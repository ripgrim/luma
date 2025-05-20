"use client";

import { useSearchParams } from "next/navigation";
import { TradePageLayout } from "@/components/trades/TradePageLayout";

export function TradesPageClient() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "inbound";
  return <TradePageLayout tradeType={type as any} />;
}