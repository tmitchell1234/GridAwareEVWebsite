import React, { createContext, useContext, useState } from 'react';

const DeviceContent = createContext();

// to be able to access the devices data from any component Which I will use later when a user selects a device on the map, the devies data will be displayed in the charts
export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [deviceDataInRecentTime, setDeviceDataInRecentTime] = useState([]);
  const [deviceDataInTenDays, setDeviceDataInTenDays] = useState([]);
  const [deviceDataInOneDays, setDeviceDataInOneDays] = useState([]);
  const [isVoltageSettingsSelected, setIsVoltageSettingsSelected] = useState(false);
  const [chartDateChanged, setChartDateChanged] = useState(false);
  const [tenDaysDataAdded, settenDaysDataAdded] = useState(false);
  const [oneDaysDataAdded, setOneDaysDataAdded] = useState(false);
  const [isOneDaysVoltageSelected, setIsOneDaysVoltageSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoltageChartLoading, setIsVoltageChartLoading] = useState(true);
  const [isTenDaysVoltageSelected, setIsTenDaysVoltageSelected] = useState(false);
  const [isVoltageSelected, setIsVoltageSelected] = useState(true);
  const [isFrequencyChartSettingsSelected, setIsFrequencyChartSettingsSelected] = useState(false);
  const [isFrequencyChartLoading, setIsFrequencyChartLoading] = useState(true);
  const [isFrequencyTenDaysSelected, setIsFrequencyTenDaysSelected] = useState(false);
  const [isFrequencyOneDaysSelected, setIsFrequencyOneDaysSelected] = useState(false);
  const [isChargingHisorySettingsSelected, setIsChargingHisorySettingsSelected] = useState(false);
  const [isChargingHistoryLoading, setIsChargingHistoryLoading] = useState(true);
  const [isChargingHistoryTenDaysSelected, setIsChargingHistoryTenDaysSelected] = useState(false);
  const [isChargingHistoryOneDaysSelected, setIsChargingHistoryOneDaysSelected] = useState(false);
  const [deviceCordinates, setDeviceCordinates] = useState({});
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [deviceLocationsFetched, setDeviceLocationsFetched] = useState(false);
  const [deviceColors, setDeviceColors] = useState([]);
  const [currentDeviceShowing, setCurrentDeviceShowing] = useState([]);
  

  return (
    <DeviceContent.Provider value={{ devices, setDevices, deviceDataInRecentTime, setDeviceDataInRecentTime, isVoltageSettingsSelected, setIsVoltageSettingsSelected, 
    chartDateChanged, setChartDateChanged, tenDaysDataAdded, settenDaysDataAdded, isLoading, setIsLoading, isTenDaysVoltageSelected, setIsTenDaysVoltageSelected, 
    deviceDataInTenDays, setDeviceDataInTenDays, isVoltageChartLoading, setIsVoltageChartLoading, isVoltageSelected, setIsVoltageSelected, 
    isFrequencyChartSettingsSelected, setIsFrequencyChartSettingsSelected, isFrequencyChartLoading, setIsFrequencyChartLoading, isFrequencyTenDaysSelected, setIsFrequencyTenDaysSelected,
    isChargingHisorySettingsSelected, setIsChargingHisorySettingsSelected, isChargingHistoryLoading, setIsChargingHistoryLoading, isChargingHistoryTenDaysSelected, setIsChargingHistoryTenDaysSelected,
    deviceCordinates, setDeviceCordinates, isMapLoading, setIsMapLoading, deviceLocationsFetched, setDeviceLocationsFetched, deviceColors, setDeviceColors,
    deviceDataInOneDays, setDeviceDataInOneDays, oneDaysDataAdded, setOneDaysDataAdded, isOneDaysVoltageSelected, setIsOneDaysVoltageSelected,
    isFrequencyOneDaysSelected, setIsFrequencyOneDaysSelected,
    isChargingHistoryOneDaysSelected, setIsChargingHistoryOneDaysSelected,
    currentDeviceShowing, setCurrentDeviceShowing
    }}>
      {children}
    </DeviceContent.Provider>
  );
};

export const useDeviceContext = () => {
  return useContext(DeviceContent);
};