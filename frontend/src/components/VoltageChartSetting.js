import React, { useState, useEffect } from "react";
import { useDeviceContext } from './DeviceContent';

function VoltageChartSetting() {
  const [selectedDataOption, setSelectedDataOption] = useState(null);
  const [selectedTimeOption, setSelectedTimeOption] = useState(null); 
  const {isVoltageSettingsSelected, setIsVoltageSettingsSelected, chartDateChanged, setChartDateChanged, isLoading, setIsLoading, isTenDaysVoltageSelected, setIsTenDaysVoltageSelected, settenDaysDataAdded, isVoltageChartLoading, setIsVoltageChartLoading, isVoltageSelected, setIsVoltageSelected} = useDeviceContext();

  const handleDataChange = (option) => {
    setSelectedDataOption(option);
    // console.log(`Data option selected: ${option}`);
  };

  const handleTimeChange = (option) => {
    setSelectedTimeOption(option);
    // if(option === "live") {
    //   setIsVoltageSettingsSelected(false);
    // }
  };

  useEffect(() => {
    // console.log("10 Days Voltage Selected:", isTenDaysVoltageSelected);
    if(isVoltageSelected) {
      setSelectedDataOption("voltage");
    }else {
      setSelectedDataOption("current");
    }

    if(isTenDaysVoltageSelected) {
      setSelectedTimeOption("10days");
    }else { 
      setSelectedTimeOption("live");
    } 

  }, [isVoltageSelected, isTenDaysVoltageSelected]);

  const handleSubmit = () => {
    if(selectedTimeOption === "10days") {
        setIsVoltageChartLoading(true);
        setChartDateChanged(true);
        setIsTenDaysVoltageSelected(true);
        
        setIsVoltageSettingsSelected(false);
    }
    else if(selectedTimeOption === "live") {
      setIsVoltageChartLoading(true);
      setIsTenDaysVoltageSelected(false);
      setIsVoltageSettingsSelected(false);
       setChartDateChanged(true);
    }

    if(selectedDataOption === "voltage") {
      setIsVoltageSelected(true);
      setIsVoltageChartLoading(true);
      setIsVoltageSettingsSelected(false);
      setChartDateChanged(true);
    }else if(selectedDataOption === "current") {
      setIsVoltageSelected(false);
      setIsVoltageChartLoading(true);
      setIsVoltageSettingsSelected(false);
      setChartDateChanged(true);
    }
  };

  const handleCancel = () => {
    // console.log("Cancel clicked. Selections reset.");
    setIsVoltageSettingsSelected(false);
  };


  return (
    <div className="voltageSettingsContainer">
      {/* Group 1: Current and Voltage */}
      <h3>Data Type:</h3>
      <div className="currentOrVoltageChartSelection row">
        
        <label className="CheckboxLabel">
          <input
            type="checkbox"
            checked={selectedDataOption === "current"}
            onChange={() => handleDataChange("current")}
          />
          <span className="checkmark"></span>
          Current
        </label>
        <label className="CheckboxLabel">
          <input
            type="checkbox"
            checked={selectedDataOption === "voltage"}
            onChange={() => handleDataChange("voltage")}
          />
          <span className="checkmark"></span>
          Voltage
        </label>
      </div>
      <h3>Time:</h3>
      {/* Group 2: 10 Days and Live */}
      <div className="tenDaysOrLiveSelection row">
        <label className="CheckboxLabel">
          <input
            type="checkbox"
            checked={selectedTimeOption === "10days"}
            onChange={() => handleTimeChange("10days")}
          />
          <span className="checkmark"></span>
          7 Days
        </label>
        <label className="CheckboxLabel">
          <input
            type="checkbox"
            checked={selectedTimeOption === "live"}
            onChange={() => handleTimeChange("live")}
          />
          <span className="checkmark"></span>
          Live
        </label>
      </div>
      <div className="SubmitChartSettingbuttonContainer">
        <button className="submitChartOrTimeButton" onClick={handleSubmit}>
          Submit
        </button>
        <button className="cancelChartOrTimeButton" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default VoltageChartSetting;