import React, { useState } from 'react';
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope, FaHome, FaCheck, FaRegAddressCard, FaPhone } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyNumber, setCompanyNumber] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const navigate = useNavigate();

  const handleFirstStepSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/Company/LoginRegister/checkCompany.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ companyName, companyNumber })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setStep(2);
          setMessage('');
        } else {
          setMessage('Company validation failed');
          setMessageType('error');
        }
      } else {
        const errorText = await response.text();
        console.error('Failed to validate company:', errorText);
        setMessage('Server error. Please try again later.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error during validation:', error);
      setMessage('Network error. Please check your connection.');
      setMessageType('error');
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost/Project-1/backend/api/Company/LoginRegister/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ companyName, username, email, address, contactNumber, password })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          localStorage.setItem('companyName', companyName); // Save company name to local storage
          setMessage('Registration successful');
          setMessageType('success');
          setTimeout(() => navigate('/dashboard'), 2000);
        } else {
          setMessage(result.message || 'Registration failed');
          setMessageType('error');
        }
      } else {
        const errorText = await response.text();
        console.error('Failed to register company:', errorText);
        setMessage('Server error. Please try again later.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('Network error. Please check your connection.');
      setMessageType('error');
    }
  };

  return (
    <div className="wrapper register">
      <div className="form-box register">
        {message && <div className={`message ${messageType}`}>{message}</div>}
        {step === 1 && (
          <form onSubmit={handleFirstStepSubmit}>
            <h1>Registration</h1>
            <h3>Validation Form</h3>
            <div className="input-box">
              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
              <FaHome className="icon" />
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Company Register Number"
                value={companyNumber}
                onChange={(e) => setCompanyNumber(e.target.value)}
                required
              />
              <FaCheck className="icon" />
            </div>
            <button type="submit">Next</button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleRegisterSubmit}>
            <h1>Registration</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaEnvelope className="icon" />
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <FaRegAddressCard className="icon" />
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
              <FaPhone className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className="icon" />
            </div>
            <button type="submit">Register</button>
          </form>
        )}
        <div className="register-link">
          <form action="">
          <p>Already have an account?<Link to="/login"> Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
