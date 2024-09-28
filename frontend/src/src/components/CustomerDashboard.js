import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import logo from '../imgs/Logo.png'; 
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import FrequencyChart from './FrequencyChart';
import DeviceMap  from './DeviceMap';
import AdminProfile from './AdminProfile';

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
  // Set the default page to Dashboard upon loading
  const [isSelected, setSelected] = useState('Dashboard');
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

  return (
    <div style={dashboardStyle}>
      <Sidebar setSelected={setSelected} />
      <div className="dashboardcontainer" style={contentStyle}>
      {isSelected === "Dashboard" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {/* Adding dashboard content here */}
            <div className="charts-container">
              <div className="frequencyChart">
                <h1>Frequency</h1>
                <FrequencyChart />
              </div>
              <div className="frequencyChart">
                <h1>Frequency</h1>
                <FrequencyChart />
              </div>
              <div className="frequencyChart">
                <h1>Charging History</h1>
                <FrequencyChart />
              </div>
            </div>
            <div className='mapContainer'>
              <DeviceMap bubbleColor="red" />
            </div>
          </>
        )}

        {isSelected === "Profile" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            {/* Adding Profile Page content here */}
            <AdminProfile />
          </>
        )}

        {isSelected === "Settings" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            {/* Adding Settings Page content here */}
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