import React, { useState } from 'react';
import Logo from '../imgs/Logo.png';
import AuroraBackground from "../components/AuroraBackground";
import { faL } from '@fortawesome/free-solid-svg-icons';

function HomePage() {
  // State to control the visibility of the features section
  const [showFeatures, setShowFeatures] = useState(false);
  const [showBenefits, setshowBenefits] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [howItWorks, setHowItWorks] = useState(false);

  // Handle the toggle when the user clicks the "Features" link
  const toggleFeatures = () => {
    setShowFeatures(true);
    setShowHome(false);
    setHowItWorks(false);
    setshowBenefits(false);
  };

  const toggleBenefits = () => {
    setshowBenefits(true);
    setShowHome(false);
    setHowItWorks(false);
    setShowFeatures(false);
  };

  const toggleHome = () => {
    setShowHome(true);
    setShowFeatures(false);
    setshowBenefits(false);
    setHowItWorks(false);
  };

  const toggleHowItWorks = () => {
    setHowItWorks(true);
    setShowHome(false);
    setShowFeatures(false);
    setshowBenefits(false);
  }

  return (
    <AuroraBackground>
      <div className="homepage">
        <header className="header">
          <div className="navbar">
            
            <a href="#Home" onClick={toggleHome}>Home</a>
            <a href="#features" onClick={toggleFeatures}>Features</a>
            <a href="#how-it-works" onClick={toggleHowItWorks}>How It Works</a>
            <a href="#benefits" onClick={toggleBenefits}>Benefits</a>
            <a href="#contact">Contact</a>
            <button className="homePageSigninButton" onClick={() => window.location.href = '/login'}>
              Login
            </button>
            <button className="homePageRegisterButton" onClick={() => window.location.href = '/registration'}>
              Register
            </button>
          </div>
        </header>

        <section>
          <h1>Grid Aware EV Charging</h1>
          <p>Our EV charging solution intelligently regulates energy use, ensuring grid stability and efficient power management.</p>
        </section>

        <div className="homepageInfoContainer">
          {showHome && (
            <img src={Logo} alt="Our Logo" className="logo fade-in-scale" />
          )}

          {showFeatures && (
            <section id="features">
              <h2>Features</h2>
              <ul>
                <li>Real-time Grid Monitoring</li>
                <li>Real-time Vehicle Status</li>
                <li>User-friendly Interface</li>
                <li>Energy Efficiency Reports</li>
              </ul>
            </section>
          )}

          {showBenefits && (
            <section id="benefits">
              <h2>Benefits</h2>
              <ul>
                <li>Grid Stability</li>
                <li>Data and Analysis</li>
                <li>Fleet Management</li>
                <li>Customer Attraction</li>
                <li>Support For Green Initiatives</li>
                <li>Energy Efficiency Reports</li>
              </ul>
            </section>
          )}

          {howItWorks && (
            <section id="how-it-works">
            <h2>How It Works</h2>
            <p>Our Grid Aware EV Charging solution ensures efficient energy use and grid stability by pausing or halting charging when necessary to avoid grid overload.</p>
            <ul>
              <li><strong>Real-time Grid Monitoring:</strong> Our system continuously tracks grid conditions to monitor energy demand, supply, and stability.</li>
              <li><strong>Dynamic Charging Control:</strong> The system automatically pauses or halts charging during peak times or grid instability, resuming charging when conditions improve.</li>
              <li><strong>Energy Efficiency Optimization:</strong> Charging is optimized during peak hours.</li>
              <li><strong>User-friendly Interface:</strong> The platform provides real-time monitoring of charging status, grid conditions, and energy use, with customizable settings.</li>
              <li><strong>Data Analytics & Reports:</strong> Receive detailed reports on charging history and energy consumption to help optimize usage.</li>
            </ul>
          </section>
          )}
        </div>
      </div>
    </AuroraBackground>
  );
}

export default HomePage;