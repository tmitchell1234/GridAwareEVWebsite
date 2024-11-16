import React, { useRef, useState, useEffect } from "react";
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, LineChart as RechartsLineChart } from "recharts";
import { TrendingUp } from "lucide-react";
import { useDeviceContext } from './DeviceContent';
import { map } from "d3";


// Being used to display Frequency
function LineChart() {
  const chartContainerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState("110%");
  const { deviceDataInRecentTime, isLoading, deviceDataInTenDays, isFrequencyChartLoading, isFrequencyTenDaysSelected, deviceDataInOneDays, isFrequencyOneDaysSelected } = useDeviceContext();
  const dateShowing = [];
  const [timeInterval, setTimeInterval] = useState(50);
  const [tickSlice, setTickSlice] = useState(8);

  useEffect(() => {
    if (isFrequencyTenDaysSelected) {
      setTimeInterval(65); 
      setTickSlice(30);
    } else {
      setTimeInterval(50); 
      setTickSlice(8);
    }
  }, [isFrequencyTenDaysSelected]);

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
    if (!date) return ""; // Handle undefined dates
    const utcDate = new Date(date);
  
    const hours = utcDate.getUTCHours();
    const minutes = utcDate.getUTCMinutes();
    const seconds = utcDate.getUTCSeconds();
    
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    if(isFrequencyTenDaysSelected) {
      return `${formattedHours}:${formattedMinutes} ${period}`;
    }else{
      return `${formattedHours}:${formattedMinutes}.${formattedSeconds} ${period}`;
    }
  };
  
  function formatDateTimeWithoutYear(date) {
    if (!date) return ""; // Handle undefined dates
    const utcDate = new Date(date);
  
    const month = utcDate.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
    const day = utcDate.getUTCDate();
    
    const hours = utcDate.getUTCHours();
    const minutes = utcDate.getUTCMinutes();
  
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${month} ${day}, ${formattedHours}:${formattedMinutes} ${period}`;
  }




  const chartData = [];
  deviceDataInRecentTime.sort((a, b) => new Date(a.time) - new Date(b.time)); // Sort by time (oldest to newest)
  deviceDataInTenDays.sort((a, b) => new Date(a.time) - new Date(b.time));
  deviceDataInOneDays.sort((a, b) => new Date(a.time) - new Date(b.time));
  // average every  10 mins
  if(isFrequencyTenDaysSelected) {
    let accumulatedFrequency = 0;
    let count = 0;
    let lastTime = new Date(deviceDataInTenDays[deviceDataInTenDays.length - 1].time); // Start from the most recent time
    
    for (let i = deviceDataInTenDays.length - 1; i >= 0; i--) {
      const device = deviceDataInTenDays[i];
      const deviceTime = new Date(device.time);
      
      
      // Check if  10 mins have passed
      if (Math.abs(deviceTime - lastTime) >= 20 * 60 * 1000) {
        if (count > 0) {
          // Calculate the average and push the data
          const averageFrequency = accumulatedFrequency / count;
          chartData.push({
            //name: formatToTime(lastTime),
            month: formatDateTimeWithoutYear(new Date(device.time)),
            desktop: averageFrequency
          });

          
          
          // Reset accumulation for the next 8 hours
          accumulatedFrequency = 0;
          count = 0;
          
          // Update the last time to the current time
          lastTime = deviceTime;
        }
      }

      if(chartData.length === 1 && dateShowing.length === 0) {
        dateShowing.push(lastTime);
      }
      
    
      // Accumulate frequency for averaging
      accumulatedFrequency += device.frequency;
      count++;
    }
    
    //remaining data not yet pushed (for the last interval less than 8 hours)
    if (count > 0) {
      dateShowing.push(lastTime);
      const averageFrequency = accumulatedFrequency / count;
      // chartData.push({
      //   month: formatDateTimeWithoutYear(new Date(lastTime)),
      //   desktop: averageFrequency
      // });

      const newData = {
        month: formatDateTimeWithoutYear(new Date(lastTime)),
        desktop: averageFrequency
      }
      if (!chartData.some(item => item.month === newData.month /*&& item.value === newData.value*/)) {
        chartData.push(newData);
      }
    }
  }else if(isFrequencyOneDaysSelected) {
    let accumulatedFrequency = 0;
    let count = 0;
    let lastTime = new Date(deviceDataInOneDays[deviceDataInOneDays.length - 1].time); // Start from the most recent time
    
    for (let i = deviceDataInOneDays.length - 1; i >= 0; i--) {
      const device = deviceDataInOneDays[i];
      const deviceTime = new Date(device.time);
      
      
      // Check if  10 mins have passed
      if (Math.abs(deviceTime - lastTime) >= 5 * 60 * 1000) {
        if (count > 0) {
          // Calculate the average and push the data
          const averageFrequency = accumulatedFrequency / count;
          chartData.push({
            //name: formatToTime(lastTime),
            month: formatDateTimeWithoutYear(new Date(device.time)),
            desktop: averageFrequency
          });

          
          
          // Reset accumulation for the next 8 hours
          accumulatedFrequency = 0;
          count = 0;
          
          // Update the last time to the current time
          lastTime = deviceTime;
        }
      }

      if(chartData.length === 1 && dateShowing.length === 0) {
        dateShowing.push(lastTime);
      }
      
    
      // Accumulate frequency for averaging
      accumulatedFrequency += device.frequency;
      count++;
    }
    
    //remaining data not yet pushed (for the last interval less than 8 hours)
    if (count > 0) {
      dateShowing.push(lastTime);
      const averageFrequency = accumulatedFrequency / count;
      // chartData.push({
      //   month: formatDateTimeWithoutYear(new Date(lastTime)),
      //   desktop: averageFrequency
      // });
      const newData = {
        month: formatDateTimeWithoutYear(new Date(lastTime)),
        desktop: averageFrequency
      }
      if (!chartData.some(item => item.month === newData.month /*&& item.value === newData.value*/)) {
        chartData.push(newData);
      }
    }
  }
  else{
    for (let i = deviceDataInRecentTime.length - 1; i >= 0; i--) {
      const device = deviceDataInRecentTime[i];
      
      // only displaying 10 data points, will allow users to choose how far back they want to see data
      if (chartData.length < 300) {
        if (chartData.length > 0 && device.frequency !== chartData[chartData.length - 1].frequency) {
          // Push the data if charging status changes
          chartData.push({
            month: formatToTime(new Date(device.time)),
            desktop: device.frequency,
          });
      
          // Store the date for the first pushed data
          if (chartData.length === 300) {
            dateShowing.push(device.time);
          }
      
        } // will make replace the last data in array to only display when the frequency changed since we are going inreverse o get the most recent data
        else if (chartData.length > 0 && device.frequency === chartData[chartData.length - 1].frequency) {
          chartData[chartData.length - 1] = {
            month: formatToTime(new Date(device.time)),
            desktop: device.frequency,
          };
      
          // Store the date for the first pushed data
          if (chartData.length === 300) {
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
  }
  chartData.reverse();

  // Function to format date and time
  const formatDateTime = (date) => {
    if (!date) return "";
    const utcDate = new Date(date);
  
    if (isNaN(utcDate.getTime())) {
      return ""; 
    }
  
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC' //display as UTC
    };
  
    return utcDate.toLocaleString('en-US', options); 
  };

  const formattedFirstDate = formatDateTime(new Date(dateShowing[1]));
  const formattedLastDate = formatDateTime(new Date(dateShowing[0]));



  return (
    <div className="card" ref={chartContainerRef}>
      {isFrequencyChartLoading ? ( // adding a loading animation hereee  while loading devices readings 
      <p>Loading data...</p> 
    ) : (
      <>
      <div className="card-header">
        {isFrequencyOneDaysSelected ? <p>Showing average frequency for the past 24 hours</p> : <h3></h3>}
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
            // tickFormatter={(value) => value.slice(0, 8)}
            tickFormatter={(value) => value.slice(0, tickSlice)}
            // {isFrequencyTenDaysSelected ? {interval: 50} : {interval: 1}}
            // interval={50} // for every ticks
            interval={timeInterval}
          />// eslint-disable-line
          <YAxis
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `${value} Hz`} 
            domain={[58, 62]}
          />// eslint-disable-line
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

export default LineChart;