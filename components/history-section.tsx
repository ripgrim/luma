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

export default function HistorySection() {
  const [timeRange, setTimeRange] = useState("90d")
  // const { chart_data, isLoading } = trpc.chart.getChartData.useQuery({
  //   userId: 1517579 // Replace with actual userID as needed
  // })

  var rawData = {
    "num_points": 81,
    "nominal_scan_time": [1729036800, 1729123200, 1729641600, 1729728000, 1729814400, 1730073600, 1730332800, 1731542400, 1731715200, 1737504000, 1738281600, 1741219200, 1741305600, 1741392000, 1741478400, 1741564800, 1741651200, 1741737600, 1741824000, 1741910400, 1741996800, 1742083200, 1742169600, 1742256000, 1742342400, 1742428800, 1742515200, 1742601600, 1742688000, 1742774400, 1742860800, 1742947200, 1743033600, 1743120000, 1743206400, 1743292800, 1743379200, 1743465600, 1743552000, 1743638400, 1743724800, 1743811200, 1743897600, 1743984000, 1744070400, 1744156800, 1744243200, 1744329600, 1744416000, 1744502400, 1744588800, 1744675200, 1744761600, 1744848000, 1744934400, 1745020800, 1745107200, 1745280000, 1745366400, 1745452800, 1745539200, 1745625600, 1745712000, 1745798400, 1745884800, 1745971200, 1746057600, 1746144000, 1746230400, 1746316800, 1746403200, 1746489600, 1746576000, 1746662400, 1746748800, 1746835200, 1746921600, 1747008000, 1747094400, 1747180800, 1747267200],
    "value": [429, 429, 7557, 7557, 7557, 7569, 7556, 7629, 7629, 10229, 9000, 54363, 55045, 55042, 65748, 101013, 165155, 165176, 165149, 165805, 165866, 165933, 165960, 165952, 165939, 204364, 204406, 204364, 206026, 205506, 207554, 207655, 207811, 221305, 218210, 212209, 212056, 212008, 215356, 275505, 275470, 274491, 277732, 213199, 213307, 213462, 240661, 233384, 256232, 258791, 258807, 261875, 261641, 259496, 259156, 256117, 234344, 237069, 244735, 248232, 246242, 241089, 240968, 235867, 235872, 237773, 238247, 240221, 245241, 230288, 277583, 277592, 287365, 287360, 416587, 415404, 417600, 397703, 397496, 572387, 572587],
    "rap": [429, 429, 7257, 7257, 7059, 6919, 6653, 7094, 7027, 9845, 8396, 51374, 52290, 52771, 64543, 92644, 152272, 153428, 154292, 152881, 154516, 151342, 151534, 150657, 152737, 191652, 189449, 194299, 195676, 195511, 193668, 196662, 198658, 223427, 222173, 215259, 213706, 215533, 216449, 265913, 264857, 265392, 266804, 203996, 202842, 203955, 228416, 222227, 246900, 252097, 246867, 246086, 249459, 248731, 245090, 238946, 225936, 222049, 228305, 231474, 230936, 231109, 229942, 228420, 228993, 230652, 234968, 235468, 235679, 224236, 271553, 271507, 281583, 281342, 422004, 421015, 419155, 377885, 380238, 522076, 522814],
    "num_limiteds": [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 5, 11, 11, 10, 10, 12, 12, 12, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 9, 9, 9, 24, 27, 27, 27, 29, 29, 29, 29, 34, 33, 33, 33, 33, 33, 33, 33, 33, 31, 30, 30, 30, 27, 27, 27, 26, 22, 21, 21, 24, 24, 24, 19, 22, 22, 23, 23, 26, 26, 26, 26, 26, 26, 26]
  };

  // Transform rawData into the format expected by ChartAreaInteractive
  const chartData = rawData.nominal_scan_time.map((timestamp, index) => ({
    date: new Date(timestamp * 1000).toISOString().split('T')[0], // Format as YYYY-MM-DD string
    value: rawData.value[index],
    rap: rawData.rap[index],
    num_limiteds: rawData.num_limiteds[index],
  }));

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
        {/* {isLoading ? ( */}
          <ChartAreaInteractive data={chartData} config={chartConfig} timeRange={timeRange} />
        {/* ) : (
          <ChartAreaInteractive data={data} config={chartConfig} timeRange={timeRange} />
        )} */}
      </CardContent>
    </Card>
  )
} 