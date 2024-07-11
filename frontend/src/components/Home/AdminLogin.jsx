import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminLogin.css';

export const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('adminLogin.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const result = await response.json();
            console.log(result);
            if (result.success) {
                sessionStorage.setItem('user', JSON.stringify(result.user));
                navigate('/adminDashboard');
            } else {
                setErrorMessage(result.message);
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
                            <label htmlFor="username">Username</label>
                            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="loginInputsContainer">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="loginButtonContainer">
                            <button>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
