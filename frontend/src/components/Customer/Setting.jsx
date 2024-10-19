// import React from 'react'
import './style.css';

function Setting() {
  return (
    <div className="settings-container">
    <header className="settings-header">
      <h1>Settings</h1>
    </header>
    <div className="settings-content">
      <a href="#" className="settings-item">
        <span>Currency</span>
        <span>LKR</span>
      </a>
      <a href="#" className="settings-item">
        <span>Language</span>
        <span>English</span>
      </a>
      <hr />
      <a href="#" className="settings-item">Notification Settings</a>
      <a href="#" className="settings-item">Viewed</a>
      <a href="#" className="settings-item">Our site uses cookies</a>
      <a href="#" className="settings-item">Clear cache</a>
      <a href="#" className="settings-item">App Video Preferences</a>
      <a href="#" className="settings-item">Network acceleration</a>
      <hr />
      <a href="#" className="settings-item">Rate Elitez </a>
      <a href="#" className="settings-item">Privacy Policy</a>
      <a href="#" className="settings-item">Legal Information</a>
      <a href="#" className="settings-item">Version 8.102.22</a>
    </div>
    <button className="sign-out-button">SIGN OUT</button>
    <footer className="settings-footer">
      <p>Elitez</p>
      <p>Version 8.102.22</p>
      <p>© 2024 Elitez All rights reserved.</p>
    </footer>
  </div>
  )
}

export default Setting