import React, { useState } from "react";
import { useDeviceContext } from './DeviceContent';

function VoltageChartSetting() {
  const [selectedDataOption, setSelectedDataOption] = useState(null);
  const [selectedTimeOption, setSelectedTimeOption] = useState(null); 
  const {isVoltageSettingsSelected, setIsVoltageSettingsSelected, chartDateChanged, setChartDateChanged, isLoading, setIsLoading, isTenDaysVoltageSelected, setIsTenDaysVoltageSelected, settenDaysDataAdded} = useDeviceContext();

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

  const handleSubmit = () => {
    // console.log("Submit clicked");
    // console.log("Selected Data Option:", selectedDataOption);
    // console.log("Selected Time Option:", selectedTimeOption);
    if(selectedTimeOption === "10days") {
      setIsLoading(true);
        setChartDateChanged(true);
        setIsTenDaysVoltageSelected(true);
        
        setIsVoltageSettingsSelected(false);
    }
    else if(selectedTimeOption === "live") {
      setIsLoading(true);
      setIsTenDaysVoltageSelected(false);
      setIsVoltageSettingsSelected(false);
      // settenDaysDataAdded(false);
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