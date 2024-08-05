import React from 'react'
import './style.css';

function Setting() {
  return (
    <div class="settings-container">
    <header class="settings-header">
      <h1>Settings</h1>
    </header>
    <div class="settings-content">
      <a href="#" class="settings-item">
        <span>Currency</span>
        <span>LKR</span>
      </a>
      <a href="#" class="settings-item">
        <span>Language</span>
        <span>English</span>
      </a>
      <hr />
      <a href="#" class="settings-item">Notification Settings</a>
      <a href="#" class="settings-item">Viewed</a>
      <a href="#" class="settings-item">Our site uses cookies</a>
      <a href="#" class="settings-item">Clear cache</a>
      <a href="#" class="settings-item">App Video Preferences</a>
      <a href="#" class="settings-item">Network acceleration</a>
      <hr />
      <a href="#" class="settings-item">Rate Elitez </a>
      <a href="#" class="settings-item">Privacy Policy</a>
      <a href="#" class="settings-item">Legal Information</a>
      <a href="#" class="settings-item">Version 8.102.22</a>
    </div>
    <button class="sign-out-button">SIGN OUT</button>
    <footer class="settings-footer">
      <p>Elitez</p>
      <p>Version 8.102.22</p>
      <p>© 2024 Elitez All rights reserved.</p>
    </footer>
  </div>
  )
}

export default Setting