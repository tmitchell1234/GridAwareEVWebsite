import React from "react";
// import { Bar, BarChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart.tsx";


import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function FrequencyChart() {
  const data = [
    { name: "September 1", value: 10 },
    { name: "September 2", value: 21 },
    { name: "September 3", value: 18 },
    { name: "September 4", value: 16 },
    { name: "September 5", value: 21 },
    { name: "September 6", value: 18 },
  ];

  const barColor = "#0F52BA"; // Blue

  return (
    <ResponsiveContainer width="80%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill={barColor} />
      </BarChart>
    </ResponsiveContainer>
  );
}
export default FrequencyChart;
