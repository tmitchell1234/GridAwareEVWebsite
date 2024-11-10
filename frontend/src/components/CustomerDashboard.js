import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import logo from '../imgs/Logo.png'; 
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import FrequencyChart from './FrequencyChart';
import CurrentChart from './CurrentChart';
import LineChart from './LineChart';
import BarChart from './BarChart';
import DeviceMap  from './DeviceMap';
import AdminProfile from './AdminProfile';
import { useDeviceContext } from './DeviceContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import VoltageChartSetting from './VoltageChartSetting';
import FrequencyChartSetting from './FrequencyChartSetting';
import ChargingHistoryChartSettings from './ChargingHistoryChartSettings';

const Sidebar = ({ setSelected }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); 
  
  

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/');
  };

  // display whatever page the user select on the sidebar
  const handlePageSelection = (label) => {
    setSelected(label);
  };

  // Parse and Decode JWT from cookie
  const UserToken = localStorage.getItem('jwt');
  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }
  const [decodedUserToken, setdecodedUserToken] = useState(parseJwt(UserToken)); 

  useEffect(() => {
    const UserToken = localStorage.getItem('jwt');
    const parsedToken = parseJwt(UserToken);
    setdecodedUserToken(parsedToken);
  }, [localStorage.getItem('jwt')]);
  
  // if(parseJwt(localStorage.getItem('jwt')) !== decodedUserToken) {
  //   setdecodedUserToken(parseJwt(localStorage.getItem('jwt')));
  // }
  //  Styling for the sidebar 
  const sidebarStyle = {
    height: '100vh',
    backgroundColor: '#f8f9fa',
    borderRight: '1px solid #dee2e6',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.3s',
    width: isHovered ? '250px' : '90px',
  };

  const sidebarHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#e9ecef',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const logoImageStyle = {
    width: '30px',
    height: '30px',
    marginRight: '5px',
    marginLeft: '19px',
  };

  const textStyle = {
    fontWeight: 'bold',
  };

  const sidebarLinksStyle = {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'flex-start',
  };

  const sidebarLinkStyle = {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center', 
    padding: '10px',
    textDecoration: 'none',
    color: '#212529',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
    width: '100%', 
    boxSizing: 'border-box', 
  };

  const sidebarLinkHoverStyle = {
    backgroundColor: '#e2e6ea',
  };

  const iconStyle = {
    fontSize: '24px', // Slightly larger font size
  };

  const labelStyle = {
    fontSize: '16px',
    marginTop: '5px', // Space between icon and label
  };

  const sidebarFooterStyle = {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ecef',
  };

  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  };

  const avatarLabelStyle = {
    fontSize: '18px',
  };

  return (
    <div
      style={sidebarStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={sidebarHeaderStyle}>
        <div style={logoStyle}>
          <img src={logo} alt="Logo" style={logoImageStyle} />
          <span style={textStyle}>{isHovered ? 'Grid Aware' : ''}</span>
        </div>
      </div>
      <div style={sidebarLinksStyle}>
        {[
          { label: 'Dashboard', href: '#', icon: <FaHome style={iconStyle} />,  onClick: () => handlePageSelection('Dashboard')},
          { label: 'Profile', href: '#', icon: <FaUser style={iconStyle} />,  onClick: () => handlePageSelection('Profile')},
          { label: 'Settings', href: '#', icon: <FaCog style={iconStyle} />,  onClick: () => handlePageSelection('Settings')},
          { label: 'Logout', href: '#', icon: <FaSignOutAlt style={iconStyle} />, onClick: handleLogout }, 
        ].map((link, index) => (
          <a
            key={index}
            href={link.href}
            style={sidebarLinkStyle}
            onClick={link.onClick} 
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = sidebarLinkHoverStyle.backgroundColor}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {link.icon}
            {isHovered && <span style={labelStyle}>{link.label}</span>}
          </a>
        ))}
      </div>
      <div style={sidebarFooterStyle}>
        <FaUserCircle style={avatarStyle} />
        {isHovered && <span style={avatarLabelStyle}>{decodedUserToken.user_first_name}</span>}
      </div>
    </div>
  );
};



const CustomerDashboard = () => {
  const [isSelected, setSelected] = useState('Dashboard');
  // const [devices, setDevices] = useState([]); 
  // const [deviceDataInRecentTime, setDeviceDataInRecentTime] = useState([]); 
  const apiKey = process.env.REACT_APP_API_KEY; 
  const { devices = [], setDevices, deviceDataInRecentTime = [], setDeviceDataInRecentTime, isVoltageSettingsSelected, setIsVoltageSettingsSelected, chartDateChanged, setChartDateChanged, 
    tenDaysDataAdded, settenDaysDataAdded, isLoading, setIsLoading, isTenDaysVoltageSelected, deviceDataInTenDays, setDeviceDataInTenDays, isVoltageChartLoading, setIsVoltageChartLoading, isVoltageSelected,
    isFrequencyChartSettingsSelected, setIsFrequencyChartSettingsSelected, isFrequencyChartLoading, setIsFrequencyChartLoading, isFrequencyTenDaysSelected, setIsFrequencyTenDaysSelected,
    isChargingHisorySettingsSelected, setIsChargingHisorySettingsSelected, isChargingHistoryLoading, setIsChargingHistoryLoading, isChargingHistoryTenDaysSelected, setIsChargingHistoryTenDaysSelected,
    deviceCordinates, setDeviceCordinates, isMapLoading, setIsMapLoading, deviceLocationsFetched, setDeviceLocationsFetched, deviceColors, setDeviceColors
  } = useDeviceContext();
  const [dontFetchData, setDontFetchData] = useState(false);
  let deviceCordimates = {};
  let combinedGeoJSON = {
    type: 'FeatureCollection',
    features: []
  };
  // const [isLoading, setIsLoading] = useState(true);
  // const [chartDateChanged, setChartDateChanged] = useState(false);
  // setIsVoltageSettingsSelected(false);


  
  const dashboardStyle = {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  };

  const contentStyle = {
    flex: 1,
    padding: '20px',
    margin: '20px',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'auto',
  };

  // Function to fetch user devices
  const getUserDevices = async () => {
    const userData = {
      api_key: apiKey,
      user_jwt: localStorage.getItem('jwt'),
    };

    try {
      const response = await fetch('https://gridawarecharging.com/api/get_devices_for_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        alert('Failed to retrieve user devices.');
        return;
      }

      const data = await response.json();
      // console.log('User devices:', data);
      setDevices(data); // Store devices in state
      // logMacAddress();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch devices on component mount
  useEffect(() => {
    getUserDevices();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      setIsVoltageChartLoading(true);
      setIsFrequencyChartLoading(true);
      setIsChargingHistoryLoading(true);
      try {
        const data = await getDataInRecentTimeInterval(devices[0].device_mac_address, 5.0);
        setDeviceDataInRecentTime(data);
        // console.log("Latest Fetched Data: ", data[data.length - 1]);
        // console.log(" ", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); 
        setIsVoltageChartLoading(false);
        setIsFrequencyChartLoading(false);
        setIsChargingHistoryLoading(false);
      }
    };

    const fetchNewDData = async () => {
      try {
        const data = await getDataInRecentTimeInterval(devices[0].device_mac_address, 5.0);
        setDeviceDataInRecentTime(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if(devices.length > 0){
      fetchData();
      // console.log('Devices:', devices[0].ip_address);
      const intervalId = setInterval(() => fetchNewDData(), 2500);
      return () => clearInterval(intervalId);
    }
    // fetchData();
  }, [devices]);


  // will be used to not fetch continuous data when user is looking at past 7 days data in all of the charts.
  useEffect(() => {
    if(isTenDaysVoltageSelected && isFrequencyTenDaysSelected && isChargingHistoryTenDaysSelected){
      setDontFetchData(true);
    }
    else if(isSelected !== 'Dashboard'){
      setDontFetchData(true);
    }
    else{
      setDontFetchData(false);
    }
    // console.log('Dont fetch data:', dontFetchData);
  }, [isTenDaysVoltageSelected, isFrequencyTenDaysSelected, isChargingHistoryTenDaysSelected, isSelected]);


  // fetching new data to display to users every couple seconds.    IF FAILED TO FECTH DATA, DISPLAY MESSAGE THAT DEVICE ISN'T CONNECTED or offline 
  useEffect(() => {
    let intervalId;

  
    const fetchNewData = async (duration) => {
      if (devices && devices.length > 0) {
        try {
          const data = await getDataInRecentTimeInterval(devices[0].device_mac_address, duration);
          
          if(!tenDaysDataAdded){
            setDeviceDataInTenDays(data);
          }
          else{
            setDeviceDataInRecentTime(data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false); // Set loading to false after the fetch completes
          setIsVoltageChartLoading(false);
          setIsFrequencyChartLoading(false);
          setIsChargingHistoryLoading(false);
        }
      }
    };

    if (isTenDaysVoltageSelected && !tenDaysDataAdded) {
      // console.log('Adding 7 days data');
      fetchNewData(432000.0); // Last 10 days
      settenDaysDataAdded(true);
      setIsVoltageChartLoading(false);
      console.log('Voltage 10 dats data added');
    } else if (isFrequencyTenDaysSelected && !tenDaysDataAdded) {
      // console.log('Adding 7 days data');
      fetchNewData(432000.0); // Last 10 days
      settenDaysDataAdded(true);
      setIsFrequencyChartLoading(false);
    } else if (isChargingHistoryTenDaysSelected && !tenDaysDataAdded) {
      // console.log('Adding 7 days data');
      fetchNewData(432000.0); // Last 10 days
      settenDaysDataAdded(true);
      setIsChargingHistoryLoading(false);

    } else {
      // Always fetch the last 20 seconds data
      // console.log('Adding 20 seconds data');
      if(!dontFetchData){
        fetchNewData(15.0); // Last 20 seconds
        // console.log('Fetching new data');
      }
      // else{
      //   console.log('Not fetching new data');
      // }
      intervalId = setInterval(() => fetchNewData(10.0), 2500); // Fetch every 2.5 seconds
    }
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [devices, chartDateChanged, isVoltageSettingsSelected, isChargingHistoryLoading, isFrequencyChartLoading, isVoltageChartLoading, tenDaysDataAdded]); // Updated dependencies


  // function generatePolygonAroundPoint(long, lat) {
  //   const centerLon = parseFloat(long);
  //   const centerLat = parseFloat(lat);
  //   // turns the coordinates array to a polygon
  //   const polygonCoordinates = [
  //     [centerLon, centerLat + 0.5],
  //     [centerLon + 0.5, centerLat + 0.25],
  //     [centerLon + 1.0, centerLat],
  //     [centerLon + 0.5, centerLat - 0.25],
  //     [centerLon, centerLat - 0.5],
  //     [centerLon - 0.5, centerLat - 0.25],
  //     [centerLon - 1.0, centerLat],
  //     [centerLon - 0.5, centerLat + 0.25],
  //     [centerLon, centerLat + 0.5],  
  //   ];
  
  //   return [polygonCoordinates];
  // }

  function generatePolygonAroundPoint(centerLon, centerLat) {
    const lon = parseFloat(centerLon);
    const lat = parseFloat(centerLat);
  
    // Define incremental changes for longitude and latitude
    const deltaLon = 0.5;
    const deltaLat = 0.3;
  
    // Approximate a polygon with more points, altering around the center
    const polygonCoordinates = [
      [lon, lat + deltaLat * 1.2],
      [lon + deltaLon * 0.5, lat + deltaLat * 0.7],
      [lon + deltaLon, lat],
      [lon + deltaLon * 0.5, lat - deltaLat * 0.7],
      [lon, lat - deltaLat * 1.2],
      [lon - deltaLon * 0.5, lat - deltaLat * 0.7],
      [lon - deltaLon, lat],
      [lon - deltaLon * 0.5, lat + deltaLat * 0.7],
      [lon, lat + deltaLat * 1.2],  // Close the loop
    ];
  
    return [polygonCoordinates];
  }

  

  // grap IP addresses of devices
  useEffect(() => {
    const fetchCoordinates = async () => {
      let deciesIPAdresses = [];
      

      if (isSelected === 'Dashboard' && devices.length > 0) {
        deciesIPAdresses = devices.map((device) => device.ip_address);
        // console.log('Devices IP Addresses:', deciesIPAdresses);

        for (let index = 0; index < deciesIPAdresses.length; index++) {
          let deviceIP = deciesIPAdresses[index];

          if (deviceIP === 'UCF') {
            deviceIP = '132.170.27.91'; // Update IP
            // console.log('Updated IP Address:', deviceIP);
          }

          // console.log(" String to get location: ");
          // console.log('http://www.geoplugin.net/json.gp?ip=${deviceIP}');

          try {
            // const response = await fetch(`http://www.geoplugin.net/json.gp?ip=${deviceIP}`);
            // const response = await fetch(`https://freegeoip.app/json/${deviceIP}`);
            const response = await fetch(`https://get.geojs.io/v1/ip/geo/${deviceIP}.json`);
            const data = await response.json();
            console.log('IP Data:', data);
            // console.log('IP Data:', data); 
    
            if (data.latitude && data.longitude) {
              const cordinatePolygone = generatePolygonAroundPoint(data.longitude, data.latitude);
              // Create a feature for this device
              const feature = {

                
                type: 'Feature',
                properties: { name: data.city + " " + devices[index].device_mac_address || 'Unknown City'},
                geometry: {
                  type: 'Polygon',
                  coordinates: //[
                    cordinatePolygone,
                  
                }, 
                id: data.country_code || "USA",
              };


    
              // Add the feature to our combined GeoJSON
              combinedGeoJSON.features.push(feature);
            }
          } catch (error) {
            console.error(`Error fetching data for IP ${deviceIP}:`, error);
          }
        }

        // Update state after all fetches complete
        setDeviceCordinates(combinedGeoJSON);
        // setIsMapLoading(false);
        // console.log('Device Coordinates:', deviceCordinates);
      }
    };

    fetchCoordinates();
  }, [devices, isSelected]);

  useEffect(() => {
    if (isSelected === 'Dashboard') {
      const updateDeviceColors = async () => {
        try {
          // Wait for all device data fetches to complete
          const deviceUpdates = await Promise.all(
            devices.map(async (device, index) => {
              try {
                const deviceData = await getDataInRecentTimeInterval(device.device_mac_address, 2.0);
                // console.log('Device Data: FOR COLOOOOOUUUUURRRRRRRRR: ', deviceData);
                
                if (deviceData && deviceData.length > 0) {
                  const chargingStatus = deviceData[deviceData.length - 1].is_charging;
                  deviceColors[index]=(chargingStatus ? 'green' : 'red');
                } else {
                  console.warn(`No data received for device ${device.device_mac_address}`);
                  deviceColors[index]='gray'; // Default if no data
                }
              } catch (error) {
                console.error(`Error fetching data for device ${device.device_mac_address}:`, error);
                deviceColors[index]='gray'; // Default color if error
              }
            })
          );
        } catch (error) {
          console.error('Error updating device colors:', error);
        }
      };
  
      // Initial update
      updateDeviceColors();
  
      // Set up interval
      const intervalId = setInterval(updateDeviceColors, 1500);//1500 was the closest I got to matching the charging bar time 
  
      return () => clearInterval(intervalId);
    }
  }, [devices, isSelected, deviceDataInRecentTime]);


  // display the map after fetching the cordinates
  useEffect(() => {
    // console.log('Device Coordinates:', combinedGeoJSON.features);
    //   console.log('Device Coordinates:', deviceCordinates);
    //   console.log('Device Coordinates lenght:', deviceCordinates.length);
    
    // Check if coordinates were successfully fetched
    if (deviceCordinates.features !== undefined && deviceCordinates.features !== null) {
      // console.log('Setting map to not loading'); // Debugging log
      // console.log('Device Coordinates:', deviceCordinates);
      setIsMapLoading(false);
    }
  }, [deviceCordinates]);


  
  


  // useEffect(() => {
  //   console.log("Here");
  //   if(devices.length > 0){
  //     setDeviceDataInRecentTime(getDataInRecentTimeInterval(devices[0].device_mac_address, 30000.0));
  //     console.log('Device data in recent time:', deviceDataInRecentTime);
  //   }
  // }, []);
  
  // const logMacAddress = () => {
  //   if(devices){
  //     console.log(devices[0].device_mac_address);
  //     console.log(devices.length);
  //   }
    
  // }


  const getDataInRecentTimeInterval = async (deviceMAC, timeSeconds) => {
    const userJWT = localStorage.getItem('jwt');
    const requestData = {
      api_key: apiKey,
      user_jwt: userJWT,
      device_mac_address: deviceMAC,
      time_seconds: timeSeconds
    };

    // console.log('Request data here :', requestData);
    try {
      const response = await fetch('https://gridawarecharging.com/api/get_data_in_recent_time_interval', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.length > 0) {
          // console.log('Measurements:', data);
          return data; 
        } else {
          console.log('No measurements found in the time interval.');
          return []; 
        }
      } else {
        console.error('Error retrieving data:', response.status);
        alert('Failed to retrieve data. Status code: ' + response.status);
      }
    } catch (error) {
      console.error('Error during the fetch operation:', error);
      alert('Error retrieving data.');
    }
  };

  

  return (
    <div style={dashboardStyle}>
      <Sidebar setSelected={setSelected} />
      <div className="dashboardcontainer" style={contentStyle}>
        {isSelected === 'Dashboard' && (
          <>
          
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            
            
            <div className="charts-container">
              <div className="frequencyChart">
                {!isVoltageSettingsSelected ?(
                  <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {isVoltageSelected ? ( // have measurement value : (voltage is just watts) and (current AMP)
                <> 
                <h2 style={{ clear: 'left' }}>Voltage</h2>
                </>
              ) : (
                <>
                <h2 style={{ clear: 'left' }}>Current</h2>
                </>
              )}
                <button
                  style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    width: '28px', 
                    height: '28px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%', 
                  }}
                  className="VoltageSettings"
                  onClick={() => setIsVoltageSettingsSelected(true)}
                >
                  <FontAwesomeIcon icon={faGear} style={{ fontSize: '28px', padding: '0' }} />
                </button>
              </div>
                {isVoltageSelected ? ( // adding a loading animation hereee  while loading devices readings 
                  <FrequencyChart />
                ) : (
                  <CurrentChart />
                // <>
                // <p>current here</p>
                // </>
                )}
                </>
              ):(
                <>
                <VoltageChartSetting />
                </>
              )}
              </div>
              <div className="LineChartContainer">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h2 style={{ clear: 'left' }}>Frequency</h2>
                  <button
                    style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      width: '28px', 
                      height: '28px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%', 
                    }}
                    className="FrequencySettings"

                    onClick={() => setIsFrequencyChartSettingsSelected(true)}
                  >
                    <FontAwesomeIcon icon={faGear} style={{ fontSize: '28px', padding: '0' }} />
                  </button>
                </div>
                {isFrequencyChartSettingsSelected ? (
                  <FrequencyChartSetting />
                ) : (
                  <>
                    {isFrequencyTenDaysSelected ? (
                      <p>Showing average frequency for the past 7 days</p>  // have the bound be 58 - 62 on the graph 
                    ) : (
                      <></>
                    )}
                    <LineChart />
                  </>
                )}
                  
                
                
              </div>
              <div className="ChargingHistoryBarChart">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {isChargingHistoryTenDaysSelected ? (
                          <h2 style={{ clear: 'left' }}>Halting History</h2>
                        ) : (
                          <h2 style={{ clear: 'left' }}>Charging History</h2>
                        )}
                  
                  <button
                    style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      width: '28px', 
                      height: '28px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%', 
                    }}
                    className="ChargingHistorySettings"
                    onClick={() => setIsChargingHisorySettingsSelected(true)}
                  >
                    <FontAwesomeIcon icon={faGear} style={{ fontSize: '28px', padding: '0' }} />
                  </button>
                </div>
                {isChargingHisorySettingsSelected ? (
                  <ChargingHistoryChartSettings />
                ) : (
                  <>
                    {isChargingHistoryTenDaysSelected ? (
                      <p>Showing Halting History for the past 7 days</p>
                    ) : (
                      <></>
                    )}
                    <BarChart />
                </>
                )}
              </div>
            </div>
            
            <div className="mapContainer">
              {isMapLoading ? (
                <p>Loading map...</p>
              ) : (
                <DeviceMap/>
              )}
              
            </div>
          </>
        )}

        {isSelected === 'Profile' && (
          <>
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <AdminProfile />
          </>
        )}

        {isSelected === 'Settings' && (
          <>
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <p>This is the settings page content.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;



// "use client";
// import React, { useState } from "react";
// import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
// import {
//   IconArrowLeft,
//   IconBrandTabler,
//   IconSettings,
//   IconUserBolt,
// } from "@tabler/icons-react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { cn } from "./utils/utils";

// export function CustomerDashboard() {
//   const links = [
//     {
//       label: "Dashboard",
//       href: "#",
//       icon: (
//         <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//     {
//       label: "Profile",
//       href: "#",
//       icon: (
//         <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//     {
//       label: "Settings",
//       href: "#",
//       icon: (
//         <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//     {
//       label: "Logout",
//       href: "#",
//       icon: (
//         <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//   ];
//   const [open, setOpen] = useState(false);
//   return (
//     (<div
//       className={cn(
//         "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
//         // for your use case, use `h-screen` instead of `h-[60vh]`
//         "h-[60vh]"
//       )}>
//       <Sidebar open={open} setOpen={setOpen} animate={false}>
//         <SidebarBody className="justify-between gap-10">
//           <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//             <>
//               <Logo />
//             </>
//             <div className="mt-8 flex flex-col gap-2">
//               {links.map((link, idx) => (
//                 <SidebarLink key={idx} link={link} />
//               ))}
//             </div>
//           </div>
//           <div>
//             <SidebarLink
//               link={{
//                 label: "Manu Arora",
//                 href: "#",
//                 icon: (
//                   <Image
//                     src="https://assets.aceternity.com/manu.png"
//                     className="h-7 w-7 flex-shrink-0 rounded-full"
//                     width={50}
//                     height={50}
//                     alt="Avatar" />
//                 ),
//               }} />
//           </div>
//         </SidebarBody>
//       </Sidebar>
//       <Dashboard />
//     </div>)
//   );
// }
// const Logo = () => {
//   return (
//     (<Link
//       href="#"
//       className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
//       <div
//         className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//       <motion.span
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="font-medium text-black dark:text-white whitespace-pre">
//         Acet Labs
//       </motion.span>
//     </Link>)
//   );
// };
// const LogoIcon = () => {
//   return (
//     (<Link
//       href="#"
//       className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
//       <div
//         className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//     </Link>)
//   );
// };

// // Dummy dashboard component with content
// const Dashboard = () => {
//   return (
//     (<div className="flex flex-1">
//       <div
//         className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
//         <div className="flex gap-2">
//           {[...new Array(4)].map((i) => (
//             <div
//               key={"first" + i}
//               className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"></div>
//           ))}
//         </div>
//         <div className="flex gap-2 flex-1">
//           {[...new Array(2)].map((i) => (
//             <div
//               key={"second" + i}
//               className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"></div>
//           ))}
//         </div>
//       </div>
//     </div>)
//   );
// };

// export default CustomerDashboard();