"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Line } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export function ChartAreaInteractive({ data, config, timeRange }: { data: any, config: ChartConfig, timeRange: string }) {
    const isMobile = useIsMobile()

    const filteredData = data?.filter((item: any) => {
        const date = new Date(item.date)
        const referenceDate = data.length > 0 ? new Date(data[data.length - 1].date) : new Date()
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    }) || []

    // Get min and max values for the limiteds Y-axis
    const minLimiteds = Math.min(...(filteredData.map((item: any) => item.num_limiteds || 0)))
    const maxLimiteds = Math.max(...(filteredData.map((item: any) => item.num_limiteds || 0)))
    const limitedsRange = maxLimiteds - minLimiteds
    const yAxisDomain = [
        Math.max(0, minLimiteds - limitedsRange * 0.1),
        maxLimiteds + limitedsRange * 0.1
    ]

    // Get max value and round to nearest thousand for the value axis
    const maxValue = Math.max(...(filteredData.map((item: any) => item.value || 0)))
    const roundedMaxValue = Math.ceil(maxValue / 1000) * 1000
    const valueAxisDomain = [0, 600000] // Fixed to 600K to match max historical value

    return (
        <ChartContainer
            config={config}
            className="aspect-auto h-[250px] w-full"
        >
            <AreaChart data={filteredData} width={Math.max(800, filteredData.length * 32)} height={250}>
                <defs>
                    <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1976d2" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#0a2342" stopOpacity={0.5} />
                    </linearGradient>
                    <linearGradient id="fillRAP" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00e676" stopOpacity={1} />
                        <stop offset="100%" stopColor="#0a4223" stopOpacity={0.2} />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={true} horizontal={true} />
                <XAxis
                    dataKey="date"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        })
                    }}
                />
                <YAxis 
                    yAxisId="left"
                    orientation="left"
                    domain={valueAxisDomain}
                    tickFormatter={(value) => {
                        if (value >= 1000000) {
                            return `${(value / 1000000).toFixed(1)}M`
                        }
                        if (value >= 1000) {
                            return `${Math.round(value / 1000)}K`
                        }
                        return value.toString()
                    }}
                />
                <YAxis 
                    yAxisId="right"
                    orientation="right"
                    domain={yAxisDomain}
                    tickFormatter={(value) => Math.round(value).toString()}
                    label={{ value: 'Limiteds', angle: 90, position: 'right' }}
                />
                <ChartTooltip
                    cursor={true}
                    content={
                        <ChartTooltipContent
                            labelFormatter={(value) => {
                                return new Date(value).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                            indicator="dot"
                        />
                    }
                />
                <Area
                    yAxisId="left"
                    dataKey="value"
                    type="natural"
                    fill="url(#fillValue)"
                    stroke="#2255bd"
                    strokeWidth={1}
                    dot={false}
                />
                <Area
                    yAxisId="left"
                    dataKey="rap"
                    type="natural"
                    fill="url(#fillRAP)"
                    stroke="#29a286"
                    strokeWidth={1}
                    dot={false}
                />
                <Line
                    yAxisId="right"
                    type="natural"
                    dataKey="num_limiteds"
                    stroke="#ff9800"
                    strokeWidth={2}
                    dot={false}
                    name="Limiteds"
                />
            </AreaChart>
        </ChartContainer >
    )
}
