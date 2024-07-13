import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/backend/api/Home/Login.php', { email, password });
            const data = response.data;
            if (data.success) {

                const userType = data.userType;
                sessionStorage.setItem('user', JSON.stringify({ email, userType }));

                if (userType === 'admin') {
                    navigate('/admin');
                } else if (userType === 'company') {
                    navigate('/company');
                } else if (userType === 'customer') {
                    navigate('/customerDashboard');
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
            <div className="loginContainer">
                <div className="loginHeader">
                    <h1>EliteZ</h1>
                    <p>Inventory Fulfillment and Distribution</p>
                </div>
                <div className="loginBody">
                    <form onSubmit={handleLogin}>
                        <div className="loginInputsContainer">
                            <label htmlFor="email">Email</label>
                            <input type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="loginInputsContainer">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="loginButtonContainer">
                            <button type='submit'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
