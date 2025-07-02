'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { getMockTrendData } from '@/lib/mock-data';

const chartData = getMockTrendData();

const chartConfig = {
  'Blood Glucose': {
    label: 'Blood Glucose (mg/dL)',
    color: 'hsl(var(--chart-1))',
  },
  'Total Cholesterol': {
    label: 'Total Cholesterol (mg/dL)',
    color: 'hsl(var(--chart-2))',
  },
  'Hemoglobin A1c': {
    label: 'HbA1c (%)',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function TrendsChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Health Trends</CardTitle>
        <CardDescription>A visualization of key health markers over the past year.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="w-full overflow-x-auto">
          <ChartContainer config={chartConfig} className="h-[250px] w-full min-w-[350px]">
            <LineChart data={chartData} margin={{ left: 12, right: 12, top: 5, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={['dataMin - 10', 'dataMax + 10']}
                hide
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              {Object.keys(chartConfig).map((key) => (
                  <Line
                      key={key}
                      dataKey={key}
                      stroke={chartConfig[key as keyof typeof chartConfig].color}
                      strokeWidth={2}
                      dot={true}
                      type="monotone"
                  />
              ))}
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
