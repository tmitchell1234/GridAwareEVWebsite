import React, { createContext, useContext, useState } from 'react';

const DeviceContent = createContext();

// to be able to access the devices data from any component Which I will use later when a user selects a device on the map, the devies data will be displayed in the charts
export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [deviceDataInRecentTime, setDeviceDataInRecentTime] = useState([]);
  const [deviceDataInTenDays, setDeviceDataInTenDays] = useState([]);
  const [isVoltageSettingsSelected, setIsVoltageSettingsSelected] = useState(false);
  const [chartDateChanged, setChartDateChanged] = useState(false);
  const [tenDaysDataAdded, settenDaysDataAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTenDaysVoltageSelected, setIsTenDaysVoltageSelected] = useState(false);

  return (
    <DeviceContent.Provider value={{ devices, setDevices, deviceDataInRecentTime, setDeviceDataInRecentTime, isVoltageSettingsSelected, setIsVoltageSettingsSelected, chartDateChanged, setChartDateChanged, tenDaysDataAdded, settenDaysDataAdded, isLoading, setIsLoading, isTenDaysVoltageSelected, setIsTenDaysVoltageSelected, deviceDataInTenDays, setDeviceDataInTenDays}}>
      {children}
    </DeviceContent.Provider>
  );
};

export const useDeviceContext = () => {
  return useContext(DeviceContent);
};