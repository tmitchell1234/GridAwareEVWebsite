import React, { useState, useEffect } from "react";
import { useDeviceContext } from './DeviceContent';

function FrequencyChartSetting() {
  const [selectedTimeOption, setSelectedTimeOption] = useState(null); 
  const {isFrequencyChartSettingsSelected, setIsFrequencyChartSettingsSelected, 
    chartDateChanged, setChartDateChanged, isLoading, setIsLoading, 
    isFrequencyTenDaysSelected, setIsFrequencyTenDaysSelected, settenDaysDataAdded, 
    isFrequencyChartLoading, setIsFrequencyChartLoading
    } = useDeviceContext();


  const handleTimeChange = (option) => {
    setSelectedTimeOption(option);
    // if(option === "live") {
    //   setIsVoltageSettingsSelected(false);
    // }
  };

  useEffect(() => {
    // console.log("10 Days Voltage Selected:", isFrequencyTenDaysSelected);
    if(isFrequencyTenDaysSelected) {
      setSelectedTimeOption("10days");
    }else { 
      setSelectedTimeOption("live");
    } 

  }, [isFrequencyTenDaysSelected]);

  const handleSubmit = () => {
    if(selectedTimeOption === "10days") {
        setIsFrequencyChartLoading(true);
        setChartDateChanged(true);
        setIsFrequencyTenDaysSelected(true);
        
        setIsFrequencyChartSettingsSelected(false);
    }
    else if(selectedTimeOption === "live") {
        setIsFrequencyChartLoading(true);
      setIsFrequencyTenDaysSelected(false);
      setIsFrequencyChartSettingsSelected(false);
       setChartDateChanged(true);
    }
  };

  const handleCancel = () => {
    // console.log("Cancel clicked. Selections reset.");
    setIsFrequencyChartSettingsSelected(false);
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

export default FrequencyChartSetting;