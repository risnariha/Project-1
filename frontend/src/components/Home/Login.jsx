import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import './Login.css';
import './LoginRegister.css'
import axios from 'axios';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const sessionUser = JSON.parse(sessionStorage.getItem('user'));
        const localUser = JSON.parse(localStorage.getItem('user'));
        const user = sessionUser || localUser;
        if(localUser){
            setRememberMe(true);
        }
        if (user) {
            setEmail(user.email);
            
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/backend/api/Home/Login.php', { email, password });
            const data = response.data;
            if (data.success) {
                const userType = data.userType;
                const user = { email, userType };
                if (rememberMe) {
                    localStorage.setItem('user', JSON.stringify(user));
                    sessionStorage.setItem('user', JSON.stringify(user));
                } else {
                    localStorage.clear();
                    sessionStorage.setItem('user', JSON.stringify(user));
                }
                if (userType === 'admin') {
                    navigate('/admin/dash');
                } else if (userType === 'company') {
                    navigate('/company/dash');
                } else if (userType === 'customer') {
                    navigate('/customer/dash');
                } else {
                    setErrorMessage('Invalid credentials');
                }
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login">
            {errorMessage && (
                <div id="errorMessage">
                    <strong>ERROR: </strong> <p>{errorMessage}</p>
                </div>
            )}
            <div className="homeHeader">

                <div className="homeHeaderLinks">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/faqs">FAQs</Link>
                    <Link to="/Login">Log in</Link>
                </div>
            </div>
            {/* <div className="loginContainer"> */}
            {/* <div className="loginHeader">
                    <h1>EliteZ</h1>
                    <p>Inventory Fulfillment and Distribution</p>
                </div> */}
            <div className="loginBody">
                <div className="homeBanner  background-opacity">
                    <div className="homePageContainer">
                        <div className="homeBannerHeader form-box">
                            <form className='form'
                                onSubmit={handleLogin}>
                                <h2 id='h1' >Login</h2 >
                                <div className="input-box ">
                                    <input
                                        type="text"
                                        placeholder='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <FaUser className='icon text-white' />
                                </div>
                                <div className="input-box">
                                    <input
                                        type="password"
                                        placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <FaLock className='icon text-white' />
                                </div>
                                <div className="remember-forgot">
                                    <label><input 
                                    type='checkbox' 
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    /> 
                                    Remember me</label>
                                    <Link to="/forgot-password">Forgot password?</Link>
                                </div>
                                <button type='submit' className='submit'>Login</button>
                                <div className='justify-content-center d-flex fs-6 mt-2'>
                                    <span className='text-white'>Don't have an account?<Link to="/register" className='register'> Register</Link></span>
                                </div>
                                {/* <h2 id='h1'>Login</h2> */}
                                {/* <div className="loginInputsContainer">
                                     <label htmlFor="email">Email</label> 
                                    <input type="text"
                                        placeholder="Email"
                                        className='rounded-pill'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="loginInputsContainer">
                                    <label htmlFor="password">Password</label>
                                    <input type="password"
                                        placeholder="Password"
                                        className='rounded-pill'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="loginButtonContainer">
                                    <button type='submit'>Login</button>
                                </div> */}

                            </form>

                            {/* <form onSubmit={handleLoginSubmit}>
                                <h1>Login</h1>
                                <div className="input-box">
                                    <input
                                        type="text"
                                        placeholder='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <FaUser className='icon' />
                                </div>
                                <div className="input-box">
                                    <input
                                        type="password"
                                        placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <FaLock className='icon' />
                                </div>
                                <div className="remember-forgot">
                                    <label><input type='checkbox' /> Remember me</label>
                                    <Link to="/forgot-password">Forgot password?</Link>
                                </div>
                                <button type='submit'>Login</button>
                                <div className='register-link'>
                                    <p>Don't have an account?<Link to="/register"> Register</Link></p>
                                </div>
                            </form> */}
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
        // </div>
    );
};
