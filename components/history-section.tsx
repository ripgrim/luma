"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartConfig } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { trpc } from "@/utils/trpc"
import { useState } from "react"
import { trpc } from "@/utils/trpc"
import { useSession, useListAccounts } from "@/hooks/auth-hooks"
// import { KeyIcon } from "lucide-react"
import { CardMask } from "@/components/ui/card-mask"
import { useRoblosecurity } from "@/providers/RoblosecurityProvider"
import { Skeleton } from "@/components/ui/skeleton"

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
  rap: {
    label: "RAP",
    color: "hsl(var(--chart-2))",
  },
  num_limiteds: {
    label: "Limiteds",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

// interface HistorySectionProps {
//   locked: boolean;
// }

const loadingData = [
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
]

export default function HistorySection(/*{ locked }: HistorySectionProps*/) {
  const { isRobloCookieVerified, isLoadingCookieStatus } = useRoblosecurity();
  const [timeRange, setTimeRange] = useState("90d")
  const { user } = useSession()
  const { data: accounts, isPending: accountsLoading } = useListAccounts();

  const robloxAccount = accounts?.find(account => account.provider === "roblox");
  const robloxAccountIdStr = robloxAccount?.accountId;
  const robloxUserId = robloxAccountIdStr ? parseInt(robloxAccountIdStr, 10) : undefined;

  const { data, isLoading: chartDataIsLoading } = trpc.chart.getChartData.useQuery(
    {
      userId: robloxUserId as number, // Asserting as number because enabled flag handles undefined
    },
    {
      enabled: !!robloxUserId && !isNaN(robloxUserId) && robloxUserId > 0,
    }
  );

  const componentContentIsLoading = accountsLoading || chartDataIsLoading;

  if (isLoadingCookieStatus || !isRobloCookieVerified) {
    return (
      <Card className="w-full overflow-hidden flex flex-col justify-around bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
          <div>
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-[120px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full overflow-hidden flex flex-col justify-around bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
        <div>
          <CardTitle className="text-2xl font-bold mb-2 mt-0">History</CardTitle>
          <CardDescription>
            Value, RAP, and Limiteds count over time
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Timespan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7d</SelectItem>
              <SelectItem value="30d">1mo</SelectItem>
              <SelectItem value="90d">3mo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {componentContentIsLoading ? (
          <ChartAreaInteractive data={loadingData} config={chartConfig} timeRange={timeRange} />
        ) : (
          <ChartAreaInteractive data={data} config={chartConfig} timeRange={timeRange} />
        )}
      </CardContent>
    </Card>
  )
} 