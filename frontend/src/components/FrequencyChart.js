import React, { useRef, useState, useEffect } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart.tsx"; 
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useDeviceContext } from './DeviceContent';


// Being used to display Voltage 
function FrequencyChart() {
  const chartContainerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(500); //initial width
  const { deviceDataInRecentTime } = useDeviceContext();

  useEffect(() => {
    if (chartContainerRef.current) {
      setContainerWidth(chartContainerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (chartContainerRef.current) {
        setContainerWidth(chartContainerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const data = [
  //   { name: "September 1", value: 10 },
  //   { name: "September 2", value: 21 },
  //   { name: "September 3", value: 18 },
  //   { name: "September 4", value: 16 },
  //   { name: "September 5", value: 21 },
  //   { name: "September 6", value: 18 },
  // ];

  // console.log("deviceDataInRecentTime herrrreere")
  // console.log(deviceDataInRecentTime)
  // const data = deviceDataInRecentTime.map((device) => {
  //   return {
  //     name: device.time,
  //     value: device.frequency,
  //   };
  // });

  // const data = deviceDataInRecentTime
  //   .slice(-10) // Get the last 10 entries
  //   .map((device) => ({
  //     name: device.time,
  //     value: device.voltage,
  // }));
  const formatToTime = (date) => {
    if (!date || isNaN(date.getTime())) {
      return ""; // Return empty string if date is invalid
    }
    const options = { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true // for AM and PM
    }; 
    return date.toLocaleString('en-US', options); 
  };

  const data = deviceDataInRecentTime
    .slice(-10) // Get the last 10 entries
    .map((device) => ({
      name: formatToTime(new Date(device.time)),
      value: device.voltage,
  }));

  
  const barColor = "#0F52BA"; // Blue

  return (
    <div ref={chartContainerRef} style={{ width: "100%" }}> 
      <ResponsiveContainer width={containerWidth} height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={barColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FrequencyChart;