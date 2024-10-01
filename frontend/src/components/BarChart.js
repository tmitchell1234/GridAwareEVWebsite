"use client"

import { Bar, XAxis, YAxis, Tooltip, CartesianGrid, BarChart as RechartsBarChart } from "recharts";
import { TrendingUp } from "lucide-react";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

function CustomBarChart() {
  return (
    <div className="card">
      <div className="card-header">
        <p>January - June 2024</p>
      </div>
      <div className="card-content">
        <RechartsBarChart
          width={500}
          height={200}
          data={chartData}
          layout="vertical"
          margin={{ left: -20 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis type="number" hide />
          <YAxis
            dataKey="month"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <Tooltip formatter={(value) => [`${value}`, "Frequency"]} />
          <Bar dataKey="desktop" fill="teal" radius={5} />
        </RechartsBarChart>
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

export default CustomBarChart;