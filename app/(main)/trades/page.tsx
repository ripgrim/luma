"use client"

import { Suspense } from "react";
import { TradesPageClient } from "@/components/trades/TradesPageClient";

export default function TradesPage() {
  return (
    <Suspense fallback={null}>
      <TradesPageClient />
    </Suspense>
  );
} 