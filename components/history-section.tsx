"use client"

import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { useListAccounts, useSession } from "@/hooks/auth-hooks"
import { useRoblosecurity } from "@/providers/RoblosecurityProvider"
import { trpc } from "@/utils/trpc"
import { useMemo, useState } from "react"

const chartConfig = {
    value: {
        label: "Value",
        color: "hsl(var(--chart-1))"
    },
    rap: {
        label: "RAP",
        color: "hsl(var(--chart-2))"
    },
    num_limiteds: {
        label: "Limiteds",
        color: "hsl(var(--chart-3))"
    }
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
    { date: "2024-04-13", desktop: 342, mobile: 380 }
]

export default function HistorySection(/*{ locked }: HistorySectionProps*/) {
    const { isRobloCookieVerified, isLoadingCookieStatus } = useRoblosecurity()
    const [timeRange, setTimeRange] = useState("90d")
    const [componentContentIsLoading, setComponentContentIsLoading] = useState(true)
    const [data, setData] = useState<any[]>([])

    // Memoize chart config to prevent unnecessary re-renders
    const chartConfig = useMemo(
        () => ({
            value: {
                label: "Value",
                theme: {
                    light: "#1976d2",
                    dark: "#1976d2"
                }
            },
            rap: {
                label: "RAP",
                theme: {
                    light: "#00e676",
                    dark: "#00e676"
                }
            },
            num_limiteds: {
                label: "Limiteds",
                theme: {
                    light: "#ff9800",
                    dark: "#ff9800"
                }
            }
        }),
        []
    )

    // Memoize loading data to prevent unnecessary re-renders
    const loadingData = useMemo(() => {
        const now = new Date()
        return Array.from({ length: 90 }, (_, i) => {
            const date = new Date(now)
            date.setDate(date.getDate() - i)
            return {
                date: date.toISOString(),
                value: 0,
                rap: 0,
                num_limiteds: 0
            }
        }).reverse()
    }, [])

    const { user } = useSession()
    const { data: accounts, isPending: accountsLoading } = useListAccounts()
    const robloxAccountIdStr = accounts?.find((account) => account.provider === "roblox")?.accountId
    const robloxUserId = robloxAccountIdStr ? Number.parseInt(robloxAccountIdStr, 10) : undefined

    const { data: chartData, isLoading: chartDataIsLoading } = trpc.chart.getChartData.useQuery(
        {
            userId: robloxUserId as number // Asserting as number because enabled flag handles undefined
        },
        {
            enabled: !!robloxUserId
        }
    )

    if (isLoadingCookieStatus || !isRobloCookieVerified) {
        return (
            <Card className="flex w-full flex-col justify-around overflow-hidden border-border bg-card">
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
                    <div>
                        <Skeleton className="mb-2 h-6 w-24" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                    <Skeleton className="h-10 w-[120px]" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[200px] w-full" />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="flex w-full flex-col justify-around overflow-hidden border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
                <div>
                    <CardTitle className="mt-0 mb-2 font-bold text-2xl">History</CardTitle>
                    <CardDescription>Value, RAP, and Limiteds count over time</CardDescription>
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
                    <ChartAreaInteractive
                        data={loadingData}
                        config={chartConfig}
                        timeRange={timeRange}
                    />
                ) : (
                    <ChartAreaInteractive
                        data={chartData}
                        config={chartConfig}
                        timeRange={timeRange}
                    />
                )}
            </CardContent>
        </Card>
    )
}
