import React, { useEffect, useState } from "react";
import "./LoginRegister.css";
import "./Login.css";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaHome,
  FaCheck,
  FaRegAddressCard,
  FaPhone,
} from "react-icons/fa";
// import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("");
  const [shopName, setShopname] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [provinceList, setProvinceList] = useState([]); // List of provinces
  const [selectedProvince, setSelectedProvince] = useState(""); // Selected province
  const [district, setDistrict] = useState(""); // Selected district
  const [districtData, setDistrictData] = useState({}); // Districts by province
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const stepOne = JSON.parse(sessionStorage.getItem("stepOne"));
    if (stepOne) {
      const email = stepOne.email;
      setEmail(email || "");
      const userType = stepOne.selectedUserType;
      setSelectedUserType(userType || "");
    }
  }, []);

  useEffect(() => {
    // Fetch provinces and districts
    const fetchData = async () => {
      // Replace with your API calls to fetch provinces and district data
      const provinces = [
        "North",
        "NorthWestern",
        "Western",
        "NorthCentral",
        "Central",
        "Sabaragamuwa",
        "Eastern",
        "Uva",
        "Southern",
      ];
      const districts = {
        North: ["Jaffna", "Mullaitivu", "Vavuniya", "Kilinochchi", "Mannar"],
        NorthWestern: ["Puttalam", "Kurunegala"],
        Western: ["Colombo", "Gampaha", "Kalutara"],
        NorthCentral: ["Anuradhapura", "Polonnaruwa"],
        Central: ["Kandy", "Nuwara Eliya", "Matale"],
        Sabaragamuwa: ["Kegalle", "Ratnapura"],
        Eastern: ["Trincomalee", "Batticaloa", "Ampara"],
        Uva: ["Badulla", "Monaragala"],
        Southern: ["Galle", "Hambantota", "Matara"],
      };

      setProvinceList(provinces);
      setDistrictData(districts);
    };

    fetchData();
  }, []);

  const handleFirstStepSubmit = async (event) => {
    event.preventDefault();
    console.log(email);
    try {
      const response = await axios.post(
        "http://localhost:8080/backend/api/Home/emailVerification.php",
        { email }
      );

      const data = response.data;

      sessionStorage.setItem(
        "stepOne",
        JSON.stringify({ email, selectedUserType })
      );

      if (data) {
        console.log(data.message);
      }
      if (data.success) {

        setStep(2);
        setMessage("");
        // console.log('step : ', step);
      } else {
        setMessage("email validation failed");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error during validation:", error);
      setMessage("Network error. Please check your connection.");
      setMessageType("error");
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/backend/api/Home/register.php",
        {
          companyName,
          shopName,
          selectedUserType,
          userName,
          email,
          address,
          contactNumber,
          district,
        }
      );

      if (response.data) {
        console.log(response.data);
        const data = response.data;
        if (data.success) {
          // localStorage.setItem('companyName', companyName); // Save company name to local storage
          setMessage("Registration request successfully sent");
          setMessageType("success");
          sessionStorage.clear("stepOne");
          setTimeout(() => navigate("/"), 2000);
        } else {
          setMessage(data.message || "Registration failed");
          setMessageType("error");
        }
      } else {
        console.log("server error.....");
        setMessage("Server error. Please try again later.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("Network error. Please check your connection.");
      setMessageType("error");
    }
  };

  return (
    <div className="login">
      <div className="homeHeader">
        <div className="homeHeaderLinks">
          <Link to="/" style={{ fontSize: "150%" }}>
            Home
          </Link>
          <Link to="/products" style={{ fontSize: "150%" }}>
            Products
          </Link>
          <Link to="/faqs" style={{ fontSize: "150%" }}>
            FAQs
          </Link>
          <Link to="/Login" style={{ fontSize: "150%" }}>
            Log in
          </Link>
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
              {message && (
                <div className={`message ${messageType} option`}>{message}</div>
              )}
              {step === 1 && (
                <form onSubmit={handleFirstStepSubmit} className="form">
                  <h2 id="h1">Registration</h2>

                  {/* <h3>Validation Form</h3> */}
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
                    <div className="option">
                      <select
                        id="userType"
                        value={selectedUserType}
                        onChange={(e) => setSelectedUserType(e.target.value)}
                        className="select"
                      >
                        <option value=""> Please choose an option</option>
                        <option value="Company">Company</option>
                        <option value="Shop">Shop</option>
                      </select>
                    </div>
                    {/* <FaCheck className="icon" /> */}
                    {/* <IoIosArrowDown className='icon' /> */}
                  </div>
                  <button type="submit" className="submit">
                    Next
                  </button>
                  <div className="register-link">
                    <span style={{ fontSize: "145%" }}>
                      Already have an account ?
                      <Link
                        to="/login"
                        onClick={() => sessionStorage.clear("stepOne")}
                      >
                        &nbsp; Login
                      </Link>
                    </span>
                  </div>
                </form>
              )}
              {step === 2 && (
                <form onSubmit={handleRegisterSubmit} className="form">
                  <h2 id="h1">Registration</h2>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                    <FaUser className="icon" />
                  </div>
                  {selectedUserType === "Company" && (
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
                  )}
                  {selectedUserType === "Shop" && (
                    <div className="input-box">
                      <input
                        type="text"
                        placeholder="Shop Name"
                        value={shopName}
                        onChange={(e) => setShopname(e.target.value)}
                        required
                      />
                      <FaHome className="icon" />
                    </div>
                  )}
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
                  {/* <div className="input-box">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <FaLock className="icon" />
                  </div> */}

                  <div className="input-box">
                    <div className="option">
                      <select
                        value={selectedProvince}
                        className="select"
                        onChange={(e) => {
                          setSelectedProvince(e.target.value);
                          setDistrict(""); // Reset district when province changes
                        }}
                        required
                      >
                        <option value="" disabled>
                          Select a Province
                        </option>
                        {provinceList.map((province, index) => (
                          <option key={index} value={province}>
                            {province}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* District Dropdown */}
                  <div className="input-box">
                    <div className="option">
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="select"
                        required
                        disabled={!selectedProvince} // Disable until province is selected
                      >
                        <option value="" disabled>
                          Select a District
                        </option>
                        {districtData[selectedProvince]?.map((dist, index) => (
                          <option key={index} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="submit">
                    Send Registration Request
                  </button>
                  <button
                    type="submit"
                    className="mt-2 text-white bg-secondary"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
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
    </div>
  );
};

export default Register;
