"use client";

import React, { useRef, useState, useEffect } from "react";
import { Bar, XAxis, YAxis, Tooltip, CartesianGrid, BarChart as RechartsBarChart, Cell } from "recharts";
import { TrendingUp } from "lucide-react";
import { useDeviceContext } from './DeviceContent';



// Being used to display Charging History
function CustomBarChart() {
  const chartContainerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(250);
  const { deviceDataInRecentTime, isTenDaysVoltageSelected, isLoading, 
        isChargingHistoryLoading, isChargingHistoryTenDaysSelected, deviceDataInTenDays,
        deviceDataInOneDays, isChargingHistoryOneDaysSelected
       } = useDeviceContext();
  const dateShowing = [];
  const [numOfTicks, setNumOfTicks] = useState(0);

  const [timeInterval, setTimeInterval] = useState(50);
  const [tickSlice, setTickSlice] = useState(8);

  useEffect(() => {
    if (isChargingHistoryTenDaysSelected) {
      setTimeInterval(20); 
      setTickSlice(10);
    }else if(isChargingHistoryOneDaysSelected) {
      setTimeInterval(18); 
      setTickSlice(22);
    } else {
      setTimeInterval(5); 
      setTickSlice(5);
    }
  }, [isChargingHistoryTenDaysSelected]);


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
    const utcDate = new Date(date);
  
    const hours = utcDate.getUTCHours();
    const minutes = utcDate.getUTCMinutes();
    const seconds = utcDate.getUTCSeconds();
    
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    if(isChargingHistoryTenDaysSelected || isChargingHistoryOneDaysSelected) {
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
  
  
  

  // Create chart data including is_charging
  const chartData = [];

  // console.log(deviceDataInRecentTime.length);
  // Start from the last element and move backward to make sure I grab the lastest information available
  deviceDataInRecentTime.sort((a, b) => new Date(a.time) - new Date(b.time)); // Sort by time (oldest to newest)
  // Sort the deviceDataInTenDays by time
  deviceDataInTenDays.sort((a, b) => new Date(a.time) - new Date(b.time));
  deviceDataInOneDays.sort((a, b) => new Date(a.time) - new Date(b.time));

  // console.log("Device In Recent Time: ", deviceDataInRecentTime);

  if (isChargingHistoryTenDaysSelected) {
    // Use local variables to track transitions
    let numOfTransitions = 0;
    let lastDeviceChargingState = deviceDataInTenDays[deviceDataInTenDays.length - 1].is_charging ? "Charging" : "Not Charging";
    let lastDeviceHour = new Date(deviceDataInTenDays[deviceDataInTenDays.length - 1].time).getHours();
    let lastDeviceHourStoring = new Date(deviceDataInTenDays[deviceDataInTenDays.length - 1].time);

   
    let tempChartData = [];
    for (let i = deviceDataInTenDays.length - 1; i >= 0; i--) {
      const device = deviceDataInTenDays[i];
      const currentDeviceHour = new Date(device.time).getHours();

      // If the current hour matches the last recorded hour
      if (lastDeviceHour === currentDeviceHour) {
        // If the charging state has changed, count it as a transition
        if (device.is_charging !== (lastDeviceChargingState === "Charging")) {
          numOfTransitions++;
        }

        
        lastDeviceChargingState = device.is_charging ? "Charging" : "Not Charging";
      } else {
        // Push the accumulated transitions to the tempChartData array
        chartData.push({
          month: formatDateTimeWithoutYear(lastDeviceHourStoring),
          desktop: numOfTransitions/5, // divide by 5 to make the chart more readable ( lines wouldnt be as long)
          is_charging: "Halted " + numOfTransitions + " times"
        });

        if(chartData.length === 1) {
          dateShowing.push(lastDeviceHourStoring);
        }

        // Reset for the new hour
        lastDeviceHour = currentDeviceHour;
        lastDeviceHourStoring = new Date(device.time);
        numOfTransitions = 0;

        // Update the last device charging state
        lastDeviceChargingState = device.is_charging ? "Charging" : "Not Charging";
      }
    }

    // Push any remaining data after the loop
    // chartData.push({
    //   month: formatDateTimeWithoutYear(lastDeviceHourStoring),/*formatToTime(lastDeviceHourStoring),*/
    //   desktop: numOfTransitions/5, // divide by 5 to make the chart more readable ( lines wouldnt be as long)
    //   is_charging: "Halted " + numOfTransitions + " times"
    // });
    const newData = {
      month: formatDateTimeWithoutYear(lastDeviceHourStoring),/*formatToTime(lastDeviceHourStoring),*/
      desktop: numOfTransitions/5, // divide by 5 to make the chart more readable ( lines wouldnt be as long)
      is_charging: "Halted " + numOfTransitions + " times"
    }
    if (!chartData.some(item => item.month === newData.month /*&& item.value === newData.value*/)) {
      chartData.push(newData);
    }

    dateShowing.push(lastDeviceHourStoring);
  }else if(isChargingHistoryOneDaysSelected) {
    let numOfTransitions = 0;
    let lastDeviceChargingState = deviceDataInOneDays[deviceDataInOneDays.length - 1].is_charging ? "Charging" : "Not Charging";
    let lastDeviceHour = new Date(deviceDataInOneDays[deviceDataInOneDays.length - 1].time).getHours();
    let lastDeviceHourStoring = new Date(deviceDataInOneDays[deviceDataInOneDays.length - 1].time);

    for (let i = deviceDataInOneDays.length - 1; i >= 0; i--) {
      const device = deviceDataInOneDays[i];
      const currentDeviceHour = new Date(device.time).getHours();

      // If the current hour matches the last recorded hour
      if (lastDeviceHour === currentDeviceHour) {
        // If the charging state has changed, count it as a transition
        if (device.is_charging !== (lastDeviceChargingState === "Charging")) {
          numOfTransitions++;
        }

        
        lastDeviceChargingState = device.is_charging ? "Charging" : "Not Charging";
      } else {
        // Push the accumulated transitions to the tempChartData array
        chartData.push({
          month: formatDateTimeWithoutYear(lastDeviceHourStoring),
          desktop: numOfTransitions/5, // divide by 5 to make the chart more readable ( lines wouldnt be as long)
          is_charging: "Halted " + numOfTransitions + " times"
        });

        if(chartData.length === 1) {
          dateShowing.push(lastDeviceHourStoring);
        }

        // Reset for the new hour
        lastDeviceHour = currentDeviceHour;
        lastDeviceHourStoring = new Date(device.time);
        numOfTransitions = 0;

        // Update the last device charging state
        lastDeviceChargingState = device.is_charging ? "Charging" : "Not Charging";
      }
    }

    // Push any remaining data after the loop
    // chartData.push({
    //   month: formatDateTimeWithoutYear(lastDeviceHourStoring),/*formatToTime(lastDeviceHourStoring),*/
    //   desktop: numOfTransitions/5, // divide by 5 to make the chart more readable ( lines wouldnt be as long)
    //   is_charging: "Halted " + numOfTransitions + " times"
    // });

    const newData = {
      month: formatDateTimeWithoutYear(lastDeviceHourStoring),/*formatToTime(lastDeviceHourStoring),*/
      desktop: numOfTransitions/5, // divide by 5 to make the chart more readable ( lines wouldnt be as long)
      is_charging: "Halted " + numOfTransitions + " times"
    }
    if (!chartData.some(item => item.month === newData.month /*&& item.value === newData.value*/)) {
      chartData.push(newData);
    }


    dateShowing.push(lastDeviceHourStoring);
  }
  else{


    // experimenting to show halting history here for every second
    // console.log("Device Data in Recent Time: ", deviceDataInRecentTime);
  //   if (!deviceDataInRecentTime || deviceDataInRecentTime.length === 0) {
  //     console.error("deviceDataInRecentTime is null or empty");
  //     return; // or handle the error as needed
  // }
  //   let numOfTransitions = 0;
  //   let lastDeviceChargingState = deviceDataInRecentTime[deviceDataInRecentTime.length - 1].is_charging ? "Charging" : "Not Charging";
  //   let lastDeviceSecond = new Date(deviceDataInRecentTime[deviceDataInRecentTime.length - 1].time).getSeconds();
  //   let lastDeviceSecondStoring = new Date(deviceDataInRecentTime[deviceDataInRecentTime.length - 1].time);

  //   for (let i = deviceDataInRecentTime.length - 1; i >= 0; i--) {
  //     const device = deviceDataInRecentTime[i];
  //     const currentDeviceSecond = new Date(device.time).getSeconds();

  //     // If the current hour matches the last recorded hour
  //     if (lastDeviceSecond === currentDeviceSecond) {
  //       // If the charging state has changed, count it as a transition
  //       if (device.is_charging !== (lastDeviceChargingState === "Charging")) {
  //         numOfTransitions++;
  //       }

        
  //       lastDeviceChargingState = device.is_charging ? "Charging" : "Not Charging";
  //     } else {
  //       // Push the accumulated transitions to the tempChartData array
  //       chartData.push({
  //         month: formatDateTimeWithoutYear(lastDeviceSecondStoring),
  //         desktop: numOfTransitions, 
  //         is_charging: "Halted " + numOfTransitions + " times"
  //       });

  //       if(chartData.length === 1) {
  //         dateShowing.push(lastDeviceSecondStoring);
  //       }

  //       // Reset for the new hour
  //       lastDeviceSecond = currentDeviceSecond;
  //       lastDeviceSecondStoring = new Date(device.time);
  //       numOfTransitions = 0;

  //       // Update the last device charging state
  //       lastDeviceChargingState = device.is_charging ? "Charging" : "Not Charging";
  //     }
  //   }

  //   // Push any remaining data after the loop
  //   chartData.push({
  //     month: formatDateTimeWithoutYear(lastDeviceSecondStoring),/*formatToTime(lastDeviceHourStoring),*/
  //     desktop: numOfTransitions,
  //     is_charging: "Halted " + numOfTransitions + " times"
  //   });

  //   dateShowing.push(lastDeviceSecondStoring);
    



    for (let i = deviceDataInRecentTime.length - 1; i >= 0; i--) {
      const device = deviceDataInRecentTime[i];

      // only displaying 10 data points, will allow users to choose how far back they want to see data
      // if (chartData.length < 21) {
        if (chartData.length > 0 && device.is_charging !== (chartData[chartData.length - 1].is_charging === "Charging")) {
          // Push the data if charging status changes
          chartData.push({
            month: formatToTime(device.time), 
            desktop: device.is_charging ? 5 : 1,
            is_charging: device.is_charging ? "Charging" : "Not Charging"
          });

          // Store the date for the first pushed data
          if (chartData.length === 21) {
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
          if (chartData.length === 21) {
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
      // } else {
      //   break;
      // }
    }
  }
  // reversing to show the data in ascending order
  chartData.reverse();

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

  // const formatDateTime = (date) => {
  //   // console.log("Input date: ", date);
  //   if (!date || isNaN(date.getTime())) {
  //     return ""; // Return empty string if date is invalid
  //   }
  //   const options = { 
  //     year: 'numeric', 
  //     month: 'long', 
  //     day: 'numeric', 
  //     hour: '2-digit', 
  //     minute: '2-digit',
  //     hour12: true // for AM and PM
  //   }; 
  //   return date.toLocaleString('en-US', options); 
  // };

  // Create formatted strings to show the chart dates
  const formattedFirstDate = formatDateTime(new Date(dateShowing[1]));
  const formattedLastDate = formatDateTime(new Date(dateShowing[0]));
  // console.log(dateShowing);

  return (
    <div className="card" ref={chartContainerRef}>
      {isChargingHistoryLoading ? ( // adding a loading animation hereee  while loading devices readings 
      <p>Loading data...</p> 
    ) : (
      <>
      <div className="card-header">
        {/* <p>January - June 2024</p> */}
        {isChargingHistoryOneDaysSelected ? <p>Showing Halting History for the past 24 hours</p> : <h3></h3>}
        <p>{`${formattedFirstDate} - ${formattedLastDate}`}</p>
      </div>
      <div className="card-content">
        <RechartsBarChart
          width={containerWidth}
          height={280}
          data={chartData}
          layout="vertical"
          margin={{ left: 11.5 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis type="number" hide />// eslint-disable-line
          <YAxis
            dataKey="month"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, tickSlice)}
            interval={timeInterval}
          />// eslint-disable-line
          <Tooltip 
            formatter={(value, name, props) => {
              const { is_charging } = props.payload; // Access is_charging from props
              return [`${is_charging}`]; // Display only charging status
            }} 
          />
          {isChargingHistoryTenDaysSelected || isChargingHistoryOneDaysSelected ? (
            <Bar dataKey="desktop" fill="teal" radius={5} />) : (
              <Bar dataKey="desktop" radius={5}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.desktop === 5 ? "teal" : "red"} 
                />
              ))}
            </Bar>

            )}
          
          {/* <Bar dataKey="desktop" fill="teal" radius={5} /> */}
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