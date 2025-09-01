import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "Un gráfico de área interactivo"

const chartData = [
  { date: "2024-04-01", reservas: 45, checkins: 38 },
  { date: "2024-04-02", reservas: 52, checkins: 41 },
  { date: "2024-04-03", reservas: 38, checkins: 35 },
  { date: "2024-04-04", reservas: 67, checkins: 58 },
  { date: "2024-04-05", reservas: 89, checkins: 72 },
  { date: "2024-04-06", reservas: 95, checkins: 85 },
  { date: "2024-04-07", reservas: 73, checkins: 65 },
  { date: "2024-04-08", reservas: 82, checkins: 74 },
  { date: "2024-04-09", reservas: 34, checkins: 28 },
  { date: "2024-04-10", reservas: 56, checkins: 48 },
  { date: "2024-04-11", reservas: 78, checkins: 69 },
  { date: "2024-04-12", reservas: 91, checkins: 83 },
  { date: "2024-04-13", reservas: 105, checkins: 92 },
  { date: "2024-04-14", reservas: 67, checkins: 58 },
  { date: "2024-04-15", reservas: 43, checkins: 39 },
  { date: "2024-04-16", reservas: 48, checkins: 42 },
  { date: "2024-04-17", reservas: 87, checkins: 76 },
  { date: "2024-04-18", reservas: 94, checkins: 86 },
  { date: "2024-04-19", reservas: 112, checkins: 98 },
  { date: "2024-04-20", reservas: 125, checkins: 108 },
  { date: "2024-04-21", reservas: 89, checkins: 78 },
  { date: "2024-04-22", reservas: 76, checkins: 67 },
  { date: "2024-04-23", reservas: 68, checkins: 59 },
  { date: "2024-04-24", reservas: 93, checkins: 82 },
  { date: "2024-04-25", reservas: 87, checkins: 75 },
  { date: "2024-04-26", reservas: 102, checkins: 89 },
  { date: "2024-04-27", reservas: 118, checkins: 103 },
  { date: "2024-04-28", reservas: 95, checkins: 84 },
  { date: "2024-04-29", reservas: 78, checkins: 69 },
  { date: "2024-04-30", reservas: 86, checkins: 76 },
  { date: "2024-05-01", reservas: 134, checkins: 118 },
  { date: "2024-05-02", reservas: 127, checkins: 112 },
  { date: "2024-05-03", reservas: 145, checkins: 128 },
  { date: "2024-05-04", reservas: 156, checkins: 138 },
  { date: "2024-05-05", reservas: 142, checkins: 125 },
  { date: "2024-05-06", reservas: 168, checkins: 148 },
  { date: "2024-05-07", reservas: 152, checkins: 134 },
  { date: "2024-05-08", reservas: 139, checkins: 122 },
  { date: "2024-05-09", reservas: 128, checkins: 113 },
  { date: "2024-05-10", reservas: 161, checkins: 142 },
  { date: "2024-05-11", reservas: 174, checkins: 153 },
  { date: "2024-05-12", reservas: 158, checkins: 139 },
  { date: "2024-05-13", reservas: 146, checkins: 129 },
  { date: "2024-05-14", reservas: 183, checkins: 161 },
  { date: "2024-05-15", reservas: 195, checkins: 172 },
  { date: "2024-05-16", reservas: 187, checkins: 165 },
  { date: "2024-05-17", reservas: 201, checkins: 177 },
  { date: "2024-05-18", reservas: 189, checkins: 167 },
  { date: "2024-05-19", reservas: 176, checkins: 155 },
  { date: "2024-05-20", reservas: 164, checkins: 145 },
  { date: "2024-05-21", reservas: 152, checkins: 134 },
  { date: "2024-05-22", reservas: 143, checkins: 126 },
  { date: "2024-05-23", reservas: 167, checkins: 147 },
  { date: "2024-05-24", reservas: 178, checkins: 157 },
  { date: "2024-05-25", reservas: 192, checkins: 169 },
  { date: "2024-05-26", reservas: 205, checkins: 181 },
  { date: "2024-05-27", reservas: 198, checkins: 175 },
  { date: "2024-05-28", reservas: 186, checkins: 164 },
  { date: "2024-05-29", reservas: 174, checkins: 153 },
  { date: "2024-05-30", reservas: 162, checkins: 143 },
  { date: "2024-05-31", reservas: 149, checkins: 131 },
  { date: "2024-06-01", reservas: 218, checkins: 192 },
  { date: "2024-06-02", reservas: 234, checkins: 206 },
  { date: "2024-06-03", reservas: 227, checkins: 200 },
  { date: "2024-06-04", reservas: 245, checkins: 216 },
  { date: "2024-06-05", reservas: 258, checkins: 228 },
  { date: "2024-06-06", reservas: 241, checkins: 213 },
  { date: "2024-06-07", reservas: 229, checkins: 202 },
  { date: "2024-06-08", reservas: 267, checkins: 236 },
  { date: "2024-06-09", reservas: 283, checkins: 250 },
  { date: "2024-06-10", reservas: 276, checkins: 244 },
  { date: "2024-06-11", reservas: 291, checkins: 257 },
  { date: "2024-06-12", reservas: 304, checkins: 269 },
  { date: "2024-06-13", reservas: 287, checkins: 254 },
  { date: "2024-06-14", reservas: 312, checkins: 276 },
  { date: "2024-06-15", reservas: 325, checkins: 287 },
  { date: "2024-06-16", reservas: 318, checkins: 281 },
  { date: "2024-06-17", reservas: 336, checkins: 297 },
  { date: "2024-06-18", reservas: 329, checkins: 291 },
  { date: "2024-06-19", reservas: 342, checkins: 302 },
  { date: "2024-06-20", reservas: 358, checkins: 316 },
  { date: "2024-06-21", reservas: 371, checkins: 328 },
  { date: "2024-06-22", reservas: 364, checkins: 322 },
  { date: "2024-06-23", reservas: 387, checkins: 342 },
  { date: "2024-06-24", reservas: 395, checkins: 349 },
  { date: "2024-06-25", reservas: 403, checkins: 356 },
  { date: "2024-06-26", reservas: 418, checkins: 369 },
  { date: "2024-06-27", reservas: 426, checkins: 376 },
  { date: "2024-06-28", reservas: 412, checkins: 364 },
  { date: "2024-06-29", reservas: 398, checkins: 352 },
  { date: "2024-06-30", reservas: 385, checkins: 340 },
]

const chartConfig = {
  huespedes: {
    label: "Huéspedes",
  },
  reservas: {
    label: "Reservas",
    color: "var(--primary)",
  },
  checkins: {
    label: "Check-ins",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total de Huéspedes</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total de los últimos 3 meses
          </span>
          <span className="@[540px]/card:hidden">Últimos 3 meses</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Últimos 3 meses</ToggleGroupItem>
            <ToggleGroupItem value="30d">Últimos 30 días</ToggleGroupItem>
            <ToggleGroupItem value="7d">Últimos 7 días</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Seleccionar un valor"
            >
              <SelectValue placeholder="Últimos 3 meses" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Últimos 3 meses
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Últimos 30 días
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Últimos 7 días
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-reservas)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-reservas)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-checkins)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-checkins)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("es-ES", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("es-ES", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="checkins"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-checkins)"
              stackId="a"
            />
            <Area
              dataKey="reservas"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-reservas)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
