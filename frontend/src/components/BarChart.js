"use client";

import React, { useRef, useState, useEffect } from "react";
import { Bar, XAxis, YAxis, Tooltip, CartesianGrid, BarChart as RechartsBarChart } from "recharts";
import { TrendingUp } from "lucide-react";
import { useDeviceContext } from './DeviceContent';


// Being used to display Charging History
function CustomBarChart() {
  const chartContainerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(500);
  const { deviceDataInRecentTime } = useDeviceContext();
  const dateShowing = [];

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

  // Function to format time
  const formatToTime = (date) => {
    if (!date) return ""; // Handle undefined dates
    const options = { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true // for AM and PM
    }; 
    return new Date(date).toLocaleString('en-US', options); 
  };

  // Create chart data including is_charging
  const chartData = [];

  // console.log(deviceDataInRecentTime.length);
  deviceDataInRecentTime.forEach((device) => {

    if (chartData.length < 10) {
      
      if (chartData.length > 0 && device.is_charging !== (chartData[chartData.length - 1].is_charging === "Charging")) {
        // console.log("Here");
        chartData.push({
          month: formatToTime(device.time), 
          desktop: device.is_charging ? 5 : 1,
          is_charging: device.is_charging ? "Charging" : "Not Charging"
        });
        if(chartData.length === 10) {
          dateShowing.push(device.time);
        }
        
      }
      else if (chartData.length === 0) {
        dateShowing.push(device.time);
        chartData.push({
          month: formatToTime(device.time), 
          desktop: device.is_charging ? 5 : 1,
          is_charging: device.is_charging ? "Charging" : "Not Charging"
        });
      }
    } 
    else {
      // console.log("count is 10");
      return;
    }
  });

  const formatDateTime = (date) => {
    // console.log("Input date: ", date);
    if (!date || isNaN(date.getTime())) {
      return ""; // Return empty string if date is invalid
    }
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true // for AM and PM
    }; 
    return date.toLocaleString('en-US', options); 
  };

  // Create formatted strings
  const formattedFirstDate = formatDateTime(new Date(dateShowing[0]));
  const formattedLastDate = formatDateTime(new Date(dateShowing[1]));
  // console.log(dateShowing);

  // To display the date in frequency title
  const dates = deviceDataInRecentTime
    .slice(-10)
    .map(device => new Date(device.time))
    .filter(date => !isNaN(date.getTime())); // Filter out invalid dates

  dates.sort((a, b) => a - b); // Sort in ascending order

  return (
    <div className="card" ref={chartContainerRef}>
      <div className="card-header">
        {/* <p>January - June 2024</p> */}
        <p>{`${formattedFirstDate} - ${formattedLastDate}`}</p>
      </div>
      <div className="card-content">
        <RechartsBarChart
          width={containerWidth}
          height={200}
          data={chartData}
          layout="vertical"
          margin={{ left: -5 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis type="number" hide />
          <YAxis
            dataKey="month"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 5)}
            interval={2}
          />
          <Tooltip 
            formatter={(value, name, props) => {
              const { is_charging } = props.payload; // Access is_charging from props
              return [`${is_charging}`]; // Display only is_charging
            }} 
          />
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