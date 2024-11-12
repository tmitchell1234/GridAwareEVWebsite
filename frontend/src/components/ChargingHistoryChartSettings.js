import React, { useState, useEffect } from "react";
import { useDeviceContext } from './DeviceContent';

function ChargingHistoryChartSettings() {
  const [selectedTimeOption, setSelectedTimeOption] = useState(null); 
  const {chartDateChanged, setChartDateChanged, isLoading, setIsLoading,
        setIsChargingHisorySettingsSelected, setIsChargingHistoryLoading, 
        isChargingHistoryTenDaysSelected, setIsChargingHistoryTenDaysSelected,
        isChargingHistoryOneDaysSelected, setIsChargingHistoryOneDaysSelected
    } = useDeviceContext();


  const handleTimeChange = (option) => {
    setSelectedTimeOption(option);
    // if(option === "live") {
    //   setIsVoltageSettingsSelected(false);
    // }
  };

  useEffect(() => {
    // console.log("10 Days Voltage Selected:", isChargingHistoryTenDaysSelected);
    if(isChargingHistoryTenDaysSelected) {
      setSelectedTimeOption("10days");
    }else if(isChargingHistoryOneDaysSelected){
      setSelectedTimeOption("Oneday");
    }else { 
      setSelectedTimeOption("live");
    } 

  }, [isChargingHistoryTenDaysSelected]);

  const handleSubmit = () => {
    if(selectedTimeOption === "10days") {
        setIsChargingHistoryLoading(true);
        setChartDateChanged(true);
        setIsChargingHistoryTenDaysSelected(true);
        setIsChargingHistoryOneDaysSelected(false);
        setIsChargingHisorySettingsSelected(false);
    }else if(selectedTimeOption === "Oneday") {
      setIsChargingHistoryLoading(true);
        setChartDateChanged(true);
        setIsChargingHistoryTenDaysSelected(false);
        setIsChargingHistoryOneDaysSelected(true);
        setIsChargingHisorySettingsSelected(false);
    }
    else if(selectedTimeOption === "live") {
        setIsChargingHistoryLoading(true);
        setIsChargingHistoryTenDaysSelected(false);
        setIsChargingHistoryOneDaysSelected(false);
        setIsChargingHisorySettingsSelected(false);
       setChartDateChanged(true);
    }
  };

  const handleCancel = () => {
    // console.log("Cancel clicked. Selections reset.");
    setIsChargingHisorySettingsSelected(false);
  };


  return (
    <div className="voltageSettingsContainer">
      <h3>Time:</h3>
      {/*10 Days and Live */}
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
            checked={selectedTimeOption === "Oneday"}
            onChange={() => handleTimeChange("Oneday")}
          />
          <span className="checkmark"></span>
          1 Day
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

export default ChargingHistoryChartSettings;