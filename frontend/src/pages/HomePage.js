import React from 'react';
import Logo from '../imgs/Logo.png';
import LoginPage from './LoginPage';

function HomePage() {

  return (
    <div className="homepage">
      <header className="header">
        <div className="navbar">
          <img src={Logo} alt="Our Logo" className="logo" />
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md" onClick={() => window.location.href = '/login'}>
            Login
          </button>
          {/* <button classname="loginButton" onClick={() => window.location.href = '/login'}>Login</button> */}
          <button onClick={() => window.location.href = '/registration'}>Register</button>
        </div>
        
      </header>
      <section>
        <h1>Grid Aware EV Charging</h1>
        <p>Our EV charging solution intelligently regulates energy use, ensuring grid stability and efficient power management.</p>
      </section>
      <section id="features">
        <h2>Features</h2>
        <ul>
          <li>Real-time Grid Monitoring</li>
          <li>Real-time Vehicle Status</li>
          <li>User-friendly Interface</li>
          <li>Energy Efficiency Reports</li>
        </ul>
      </section>
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
    </div>
  );
}

export default HomePage;