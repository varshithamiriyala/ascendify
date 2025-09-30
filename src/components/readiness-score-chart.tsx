"use client";

import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from 'recharts';

import { Card, CardContent } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

interface ReadinessScoreChartProps {
  score: number;
}

const chartConfig = {
  score: {
    label: 'Readiness',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export default function ReadinessScoreChart({ score }: ReadinessScoreChartProps) {
  const chartData = [{ name: 'score', value: score, fill: 'var(--color-score)' }];

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-full max-h-[250px]"
    >
      <ResponsiveContainer>
        <RadialBarChart
          data={chartData}
          startAngle={90}
          endAngle={-270}
          innerRadius="70%"
          outerRadius="100%"
          barSize={20}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            dataKey="value"
            background={{ fill: 'hsl(var(--muted))' }}
            cornerRadius={10}
            angleAxisId={0}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-4xl font-bold"
          >
            {score}%
          </text>
           <text
            x="50%"
            y="65%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-muted-foreground text-sm"
          >
            Readiness
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
