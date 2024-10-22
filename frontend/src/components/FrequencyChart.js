import React, { useRef, useState, useEffect } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart.tsx"; 
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useDeviceContext } from './DeviceContent';


// Being used to display Voltage 
function FrequencyChart() {
  const chartContainerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(200); //initial width
  const { deviceDataInRecentTime, isTenDaysVoltageSelected, deviceDataInTenDays, isLoading } = useDeviceContext();
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

  function formatDateTimeWithoutYear(date) {
    const options = {
      month: 'long',  
      day: 'numeric',  
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true,  
    };
  
    return date.toLocaleString('en-US', options);
  }

  const data = [];

  deviceDataInRecentTime.sort((a, b) => new Date(a.time) - new Date(b.time)); // Sort by time (oldest to newest)
  deviceDataInTenDays.sort((a, b) => new Date(a.time) - new Date(b.time));
  if(isTenDaysVoltageSelected) {
    let accumulatedVoltage = 0;
    let count = 0;
    let lastTime = new Date(deviceDataInTenDays[deviceDataInTenDays.length - 1].time); // Start from the most recent time
    
    for (let i = deviceDataInTenDays.length - 1; i >= 0; i--) {
      const device = deviceDataInTenDays[i];
      const deviceTime = new Date(device.time);
      
      
      // Check if 8 hours have passed
      if (Math.abs(deviceTime - lastTime) >= 8 * 60 * 60 * 1000) {
        if (count > 0) {
          // Calculate the average and push the data
          const averageVoltage = accumulatedVoltage / count;
          data.push({
            //name: formatToTime(lastTime),
            name: formatDateTimeWithoutYear(new Date(device.time)),
            value: averageVoltage
          });

          
          
          // Reset accumulation for the next 8 hours
          accumulatedVoltage = 0;
          count = 0;
          
          // Update the last time to the current time
          lastTime = deviceTime;
        }
      }

      if(data.length === 1 && dateShowing.length === 0) {
        dateShowing.push(lastTime);
      }
      
    
      // Accumulate voltage for averaging
      accumulatedVoltage += device.voltage;
      count++;
    }
    
    //remaining data not yet pushed (for the last interval less than 8 hours)
    if (count > 0) {
      dateShowing.push(lastTime);
      const averageVoltage = accumulatedVoltage / count;
      data.push({
        name: formatDateTimeWithoutYear(new Date(lastTime)),
        value: averageVoltage
      });
    }
  }
  else{
    for (let i = deviceDataInRecentTime.length - 1; i >= 0; i--) {
      const device = deviceDataInRecentTime[i];
      
      // only displaying 10 data points, will allow users to choose how far back they want to see data
      if (data.length < 60) {
        if (data.length > 0 && device.voltage !== data[data.length - 1].voltage) {
          // Push the data if charging status changes
          data.push({
            name: formatToTime(new Date(device.time)),
            value: device.voltage,
          });
      
          // Store the date for the first pushed data
          if (data.length === 60) {
            dateShowing.push(device.time);
          }
      
        } 
        // will make replace the last data in array to only display when the voltage changed since we are going inreverse o get the most recent data
        else if (data.length > 0 && device.voltage === data[data.length - 1].voltage) {
          data[data.length - 1] = {
            name: formatToTime(new Date(device.time)),
            value: device.voltage,
          };
      
          // Store the date for the first pushed data
          if (data.length === 60) {
            dateShowing.push(device.time);
          }
      
        }
        else if (data.length === 0) {
          dateShowing.push(device.time);
          data.push({
            name: formatToTime(new Date(device.time)),
            value: device.voltage,
          });
        }
      } else {
        break;
      }
    }
  }

  // reversing to show the data in ascending order
  data.reverse();

  

  const formattedFirstDate = formatDateTime(new Date(dateShowing[1]));
  const formattedLastDate = formatDateTime(new Date(dateShowing[0]));
  
  const barColor = "#0F52BA"; // Blue

  return (
    
    <div ref={chartContainerRef} style={{ width: "100%" }}> 
    {isLoading ? ( // adding a loading animation hereee  while loading devices readings 
      <p>Loading data...</p> 
    ) : (
      <>
      <div className="card-header">
        {/* <p>January - June 2024</p> */}
        {isTenDaysVoltageSelected ? (
          <>
            <p>Showing average voltage for the past 7 days</p>
            <p>{`${formattedFirstDate} - ${formattedLastDate}`}</p>
          </>
        ) : (
          <p>{`${formattedFirstDate} - ${formattedLastDate}`}</p>
        )}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ left: 0, right: 0 }}>
          <XAxis dataKey="name" /> // eslint-disable-line
          <YAxis /> // eslint-disable-line
          <Tooltip />
          <Bar dataKey="value" fill={barColor} />
        </BarChart>
      </ResponsiveContainer>
      </>
      )}
    </div>
  );
}

export default FrequencyChart;