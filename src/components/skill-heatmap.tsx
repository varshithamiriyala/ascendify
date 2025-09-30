"use client"

import * as React from "react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { Competency } from "@/lib/types"

interface SkillHeatmapProps {
  data: (Competency & { selfLevel?: number })[]
}

const chartConfig = {
  self: {
    label: "Self-Assessment",
    color: "hsl(var(--chart-1))",
  },
  official: {
    label: "Official Assessment",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function SkillHeatmap({ data }: SkillHeatmapProps) {
  const chartData = data.map(item => ({
    name: item.name,
    self: item.selfLevel ?? 0,
    official: item.level,
    fullMark: item.target,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill Heatmap</CardTitle>
        <CardDescription>
          Comparing your self-assessed skills against official ratings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px]"
        >
          <ResponsiveContainer>
            <RadarChart data={chartData}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <PolarAngleAxis dataKey="name" />
              <PolarGrid />
              <Radar
                name="Self-Assessment"
                dataKey="self"
                stroke="var(--color-self)"
                fill="var(--color-self)"
                fillOpacity={0.6}
              />
              <Radar
                name="Official Assessment"
                dataKey="official"
                stroke="var(--color-official)"
                fill="var(--color-official)"
                fillOpacity={0.6}
              />
              <ChartLegend />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
