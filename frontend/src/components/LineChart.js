import React, { useRef, useState, useEffect } from "react";
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, LineChart as RechartsLineChart } from "recharts";
import { TrendingUp } from "lucide-react";
import { useDeviceContext } from './DeviceContent';
import { map } from "d3";


// Being used to display Frequency
function LineChart() {
  const chartContainerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(300);
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

  // Function to format time for X-axis
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



  const chartData = [];

  for (let i = deviceDataInRecentTime.length - 1; i >= 0; i--) {
    const device = deviceDataInRecentTime[i];
    
    // only displaying 10 data points, will allow users to choose how far back they want to see data
    if (chartData.length < 10) {
      if (chartData.length > 0 && device.frequency !== chartData[chartData.length - 1].frequency) {
        // Push the data if charging status changes
        chartData.push({
          month: formatToTime(new Date(device.time)),
          desktop: device.frequency,
        });
    
        // Store the date for the first pushed data
        if (chartData.length === 10) {
          dateShowing.push(device.time);
        }
    
      } // will make replace the last data in array to only display when the frequency changed since we are going inreverse o get the most recent data
      else if (chartData.length > 0 && device.frequency === chartData[chartData.length - 1].frequency) {
        chartData[chartData.length - 1] = {
          month: formatToTime(new Date(device.time)),
          desktop: device.frequency,
        };
    
        // Store the date for the first pushed data
        if (chartData.length === 10) {
          dateShowing.push(device.time);
        }
    
      }
      else if (chartData.length === 0) {
        dateShowing.push(device.time);
        chartData.push({
          month: formatToTime(new Date(device.time)),
          desktop: device.frequency,
        });
      }
    } else {
      break;
    }
  }
  chartData.reverse();

  // Function to format date and time
  const formatDateTime = (date) => {
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

  const formattedFirstDate = formatDateTime(new Date(dateShowing[1]));
  const formattedLastDate = formatDateTime(new Date(dateShowing[0]));

  return (
    <div className="card" ref={chartContainerRef}>
      <div className="card-header">
        <p>{`${formattedFirstDate} - ${formattedLastDate}`}</p>
      </div>
      <div className="card-content">
        <RechartsLineChart
          width={containerWidth}
          height={300}
          data={chartData}
          margin={{ left: 0, right: 0}}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={0}
            tickFormatter={(value) => value.slice(0, 8)}
            interval={1} // for every ticks
          />
          <YAxis
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `${value} Hz`} 
          />
          <Tooltip formatter={(value) => [`${value} Hz`, 'Frequency']} />
          <Line
            type="monotone"
            dataKey="desktop"
            stroke="teal"
            strokeWidth={2}
            dot={false}
          />
        </RechartsLineChart>
      </div>
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

export default LineChart;