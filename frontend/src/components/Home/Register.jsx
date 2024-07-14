import React, { useState } from 'react';
import './LoginRegister.css';
import './Login.css';
import { FaUser, FaLock, FaEnvelope, FaHome, FaCheck, FaRegAddressCard, FaPhone } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [userName, setUserName] = useState(null);
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const navigate = useNavigate();

  const handleFirstStepSubmit = async (event) => {
    event.preventDefault();

    try {
      // const response = await fetch('http://localhost:8080/backend/api/Company/LoginRegister/checkCompany.php', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },

      sessionStorage.setItem('stepOne', JSON.stringify({ companyName, companyNumber }))
      const response = JSON.parse(sessionStorage.getItem('stepOne'))

      if (response) {

        setStep(2);
        setMessage('');
      } else {
        setMessage('Company validation failed');
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
      const response = await fetch('http://localhost:8080/backend/api/Home/Login.php', {
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
    <div className="login">
      <div className="homeHeader">

        <div className="homeHeaderLinks">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/Login">Log in</Link>
        </div>
      </div>
      {errorMessage && (
        <div id="errorMessage">
          <strong>ERROR: </strong> <p>{errorMessage}</p>
        </div>
      )}
      {/* <div className="form-box register"> */}
      <div className="loginBody">
        <div className="homeBanner  background-opacity">
          <div className="homePageContainer">
            <div className="homeBannerHeader form-box">
              {message && <div className={`message ${messageType}`}>{message}</div>}
              {step === 1 && (
                <form onSubmit={handleFirstStepSubmit} className='form'>
                  <h2 id='h1'>Registration</h2>
                  {/* <h3>Validation Form</h3> */}
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                    <FaHome className="icon" />
                  </div>
                  <div className="input-box">

                    {/* <div className='option'> */}
                      <select id="userType" 
                      value={selectedUserType} 
                      onChange={(e) => setSelectedUserType(e.target.value)}
                      className='option'>
                        <option value="" >  Please choose an option</option>
                        <option value="Company">Company</option>
                        <option value="Shop">Shop</option>
                      </select>
                    {/* </div> */}
                    <FaCheck className="icon" />
                  </div>
                  <button type="submit" className='submit'>Next</button>
                  <div className="register-link">

                    <span>Already have an account?<Link to="/login"> Login</Link></span>

                  </div>
                </form>
              )}
              {step === 2 && (
                <form onSubmit={handleRegisterSubmit} className='form'>
                  <h2 id='h1'>Registration</h2>
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
              <h1>EliteZ</h1>
              <div className="homeHeaderLogo">
                <div id="logoContainer">
                  <div id="ring"></div>
                  <div id="ring"></div>
                  <div id="ring"></div>
                  <div id="ring"></div>
                </div>
                {/* <div id="logoTitle">EliteZ</div> */}
              </div>
              <p>Inventory Fulfillment and Distribution</p>

            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Register;
