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
  const [aboutUs, setAboutUs] = useState(false);

  // Handle the toggle when the user clicks the "Features" link
  const toggleFeatures = () => {
    setShowFeatures(true);
    setShowHome(false);
    setHowItWorks(false);
    setshowBenefits(false);
    setAboutUs(false);
  };

  const toggleBenefits = () => {
    setshowBenefits(true);
    setShowHome(false);
    setHowItWorks(false);
    setShowFeatures(false);
    setAboutUs(false);
  };

  const toggleHome = () => {
    setShowHome(true);
    setShowFeatures(false);
    setshowBenefits(false);
    setHowItWorks(false);
    setAboutUs(false);
  };

  const toggleHowItWorks = () => {
    setHowItWorks(true);
    setShowHome(false);
    setShowFeatures(false);
    setshowBenefits(false);
    setAboutUs(false);
  }

  const toggleAboutUs = () => {
    setHowItWorks(false);
    setShowHome(false);
    setShowFeatures(false);
    setshowBenefits(false);
    setAboutUs(true);
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
            <a href="#about-us" onClick={toggleAboutUs}>About Us</a>
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
            <section 
              id="features" 
              style={{ 
                padding: '20px', 
                width: '300%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                borderRadius: '20px', 
                'margin-left': '-100%',
                textAlign: 'center', 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
              }}
            >
              <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Features</h2>
              <ul style={{ listStyleType: 'none', padding: '0', lineHeight: '2' }}>
                <li>Real-time Grid Monitoring</li>
                <li>Real-time Vehicle Status</li>
                <li>User-friendly Interface</li>
                <li>Energy Efficiency Reports</li>
              </ul>
            </section>
          )}

{showBenefits && (
  <section 
    id="benefits" 
    style={{ 
      padding: '20px', 
      width: '300%', 
      backgroundColor: 'rgba(255, 255, 255, 0.2)', 
      borderRadius: '20px', 
      marginLeft: '-100%', 
      textAlign: 'center', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
    }}
  >
    <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Benefits</h2>
    <ul style={{ 
      listStyleType: 'disc', 
      listStylePosition: 'inside', 
      display: 'inline-block', // Aligns the list in the center
      margin: 0, 
      padding: 0, 
      textAlign: 'left', // Aligns bullet points and text properly
      lineHeight: '1.8' // Adds spacing for readability
    }}>
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
            <section id="how-it-works" style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '20px' }}>
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

          {aboutUs && (
            <section id="about-us" style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '20px' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>About Us</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                {/* First row */}
                <div>
                  <h3>Dr. Qun Zhou Sun</h3>
                  <p>Director of Smart Infrastructure Data Analytics Laboratory at UCF</p>
                  <p>Our project sponsor</p>
                  <p>Developed the stochastic algorithm</p>
                </div>
                <div>
                  <h3>Ibraheim, Ames, and Erik</h3>
                  <p>Research Assistants and Graduate Research Assistants</p>
                  <p>Physical hardware development</p>
                </div>

                {/* Second row */}
                <div>
                  <h3>Samuel Pann</h3>
                  <p>Hardware Integration</p>
                  <p>ESP32 programming</p>
                </div>
                <div>
                  <h3>Benjamin Belizaire</h3>
                  <p>Mobile Development</p>
                </div>

                {/* Third row */}
                <div>
                  <h3>Tom Mitchell</h3>
                  <p>Project Manager</p>
                  <p>Server and Database Development</p>
                </div>
                <div>
                  <h3>John Vea</h3>
                  <p>Website Development</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </AuroraBackground>
  );
}

export default HomePage;