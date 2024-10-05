import React, { useRef, useState, useEffect } from "react";
import { Line, XAxis, CartesianGrid, Tooltip, LineChart as RechartsLineChart } from "recharts";
import { TrendingUp } from "lucide-react";
import { useDeviceContext } from './DeviceContent';


// Being used to display Frequency
function LineChart() {
  const chartContainerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(500);
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

  const chartData = deviceDataInRecentTime
    .slice(-10) // Get the last 10 entries
    .map((device) => {
      const date = new Date(device.time); // date object
      return {
        month: formatToTime(date),
        desktop: device.frequency,
      };
    });

  // To display the date in frequency title
  const dates = deviceDataInRecentTime
    .slice(-10)
    .map(device => new Date(device.time))
    .filter(date => !isNaN(date.getTime())); // Filter out invalid dates

  dates.sort((a, b) => a - b); // Sort in ascending order

  // Get the first and last valid dates
  const firstDate = dates[0];
  const lastDate = dates[dates.length - 1];

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

  // Create formatted strings
  const formattedFirstDate = formatDateTime(firstDate);
  const formattedLastDate = formatDateTime(lastDate);

  return (
    <div className="card" ref={chartContainerRef}>
      <div className="card-header">
        <p>{`${formattedFirstDate} - ${formattedLastDate}`}</p>
      </div>
      <div className="card-content">
        <RechartsLineChart
          width={containerWidth}
          height={200}
          data={chartData}
          margin={{ left: 2, right: 2 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={0}
            tickFormatter={(value) => value.slice(0, 8)}
            interval={2} // for every 2 ticks
          />
          <Tooltip formatter={(value) => [`${value}`, 'Frequency']} />
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