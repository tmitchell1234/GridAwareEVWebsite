"use client";

import React, { useRef, useState, useEffect } from "react";
import { Bar, XAxis, YAxis, Tooltip, CartesianGrid, BarChart as RechartsBarChart } from "recharts";
import { TrendingUp } from "lucide-react";
import { useDeviceContext } from './DeviceContent';



// Being used to display Charging History
function CustomBarChart() {
  const chartContainerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(250);
  const { deviceDataInRecentTime, isTenDaysVoltageSelected, isLoading } = useDeviceContext();
  const dateShowing = [];
  const [numOfTicks, setNumOfTicks] = useState(0);


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
  // Start from the last element and move backward to make sure I grab the lastest information available
  deviceDataInRecentTime.sort((a, b) => new Date(a.time) - new Date(b.time)); // Sort by time (oldest to newest)
  for (let i = deviceDataInRecentTime.length - 1; i >= 0; i--) {
    const device = deviceDataInRecentTime[i];

    // only displaying 10 data points, will allow users to choose how far back they want to see data
    if (chartData.length < 20) {
      if (chartData.length > 0 && device.is_charging !== (chartData[chartData.length - 1].is_charging === "Charging")) {
        // Push the data if charging status changes
        chartData.push({
          month: formatToTime(device.time), 
          desktop: device.is_charging ? 5 : 1,
          is_charging: device.is_charging ? "Charging" : "Not Charging"
        });

        // Store the date for the first pushed data
        if (chartData.length === 20) {
          dateShowing.push(device.time);
        }

      }// will make replace the last data in array to only display when the charging status changed since we are going inreverse o get the most recent data
      else if (chartData.length > 0 && device.is_charging === (chartData[chartData.length - 1].is_charging === "Charging")) {
        chartData[chartData.length - 1] = {
          month: formatToTime(device.time), 
          desktop: device.is_charging ? 5 : 1,
          is_charging: device.is_charging ? "Charging" : "Not Charging"
        };

        // Store the date for the first pushed data
        if (chartData.length === 20) {
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
    } else {
      break;
    }
  }
  // reversing to show the data in ascending order
  chartData.reverse();

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

  // Create formatted strings to show the chart dates
  const formattedFirstDate = formatDateTime(new Date(dateShowing[1]));
  const formattedLastDate = formatDateTime(new Date(dateShowing[0]));
  // console.log(dateShowing);

  return (
    <div className="card" ref={chartContainerRef}>
      {isLoading ? ( // adding a loading animation hereee  while loading devices readings 
      <p>Loading data...</p> 
    ) : (
      <>
      <div className="card-header">
        {/* <p>January - June 2024</p> */}
        <p>{`${formattedFirstDate} - ${formattedLastDate}`}</p>
      </div>
      <div className="card-content">
        <RechartsBarChart
          width={containerWidth}
          height={280}
          data={chartData}
          layout="vertical"
          margin={{ left: -2 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis type="number" hide />// eslint-disable-line
          <YAxis
            dataKey="month"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 5)}
            interval={2}
          />// eslint-disable-line
          <Tooltip 
            formatter={(value, name, props) => {
              const { is_charging } = props.payload; // Access is_charging from props
              return [`${is_charging}`]; // Display only charging status
            }} 
          />
          <Bar dataKey="desktop" fill="teal" radius={5} />
        </RechartsBarChart>
      </div>
      </>
      )}
      {/* <div className="card-footer">
        <div className="flex gap-2 font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted">
          Showing total frequency for the last 6 months
        </div>
      </div> */}
    </div>
  );
}

export default CustomBarChart;