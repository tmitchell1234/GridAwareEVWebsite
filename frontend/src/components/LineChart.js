"use client"

import { Line, XAxis, CartesianGrid, Tooltip, LineChart as RechartsLineChart } from "recharts";
import { TrendingUp } from "lucide-react";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 35 },
  { month: "April", desktop: 252 },
  { month: "May", desktop: 15 },
  { month: "June", desktop: 214 },
];

function LineChart() {
  return (
    <div className="card">
      <div className="card-header">
        <p>January - June 2024</p>
      </div>
      <div className="card-content">
        <RechartsLineChart
          width={500}
          height={200}
          data={chartData}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <Tooltip 
            formatter={(value) => [`${value}`, 'Frequency']} 
          />
          <Line
            type="monotone"
            dataKey="desktop"
            stroke="teal"
            strokeWidth={2}
            dot={false}
          />
        </RechartsLineChart>
      </div>
      <div className="card-footer">
        <div className="flex gap-2 font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted">
          Showing total frequency for the last 6 months
        </div>
      </div>
    </div>
  );
}

export default LineChart;