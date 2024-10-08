import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import logo from '../imgs/Logo.png'; 
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import FrequencyChart from './FrequencyChart';
import LineChart from './LineChart';
import BarChart from './BarChart';
import DeviceMap  from './DeviceMap';
import AdminProfile from './AdminProfile';
import { useDeviceContext } from './DeviceContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

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
  const { devices = [], setDevices, deviceDataInRecentTime = [], setDeviceDataInRecentTime } = useDeviceContext();
  const [isLoading, setIsLoading] = useState(true);
  
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
      try {
        const data = await getDataInRecentTimeInterval(devices[0].device_mac_address, 20.0);
        setDeviceDataInRecentTime(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };
    if(devices.length > 0){
      fetchData();
    }
    // fetchData();
  }, [devices]);



  // fetching new data to display to users every couple seconds.
  useEffect(() => {
    let intervalId;

    const fetchNewData = async () => {
      if (!isLoading && devices && devices.length > 0) {
        try {
          const data = await getDataInRecentTimeInterval(devices[0].device_mac_address, 20.0); //last 20 seconds
          setDeviceDataInRecentTime(data);
          // console.log('Device data in recent time:', deviceDataInRecentTime);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    // Fetch data immediately, then every 2 seconds
    fetchNewData();
    intervalId = setInterval(fetchNewData, 2000); // Fetch every second seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [devices, isLoading]);






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
          {isLoading ? ( // adding a loading animation hereee  while loading devices readings 
        <p>Loading data...</p> 
      ) : (
        <>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            
            
            <div className="charts-container">
              <div className="frequencyChart">
                
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ clear: 'left' }}>Voltage</h2>
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
                >
                  <FontAwesomeIcon icon={faGear} style={{ fontSize: '28px', padding: '0' }} />
                </button>
              </div>
                <FrequencyChart />
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
                  >
                    <FontAwesomeIcon icon={faGear} style={{ fontSize: '28px', padding: '0' }} />
                  </button>
                </div>
                
                <LineChart />
              </div>
              <div className="ChargingHistoryBarChart">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h2 style={{ clear: 'left' }}>Charging History</h2>
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
                  >
                    <FontAwesomeIcon icon={faGear} style={{ fontSize: '28px', padding: '0' }} />
                  </button>
                </div>
                <BarChart />
              </div>
            </div>
            </>
      )}
            <div className="mapContainer">
              <DeviceMap bubbleColor="red" />
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