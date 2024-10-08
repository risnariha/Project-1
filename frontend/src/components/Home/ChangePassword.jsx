import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'


const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        
        // Validate new password and confirmation
        if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/backend/api/Home/ChangePassword.php', {
                currentPassword,
                newPassword
            });

            const data = response.data;
            console.log(data);

            if (data.success) {
                setSuccessMessage('Password updated successfully');
                // Redirect to the dashboard after password change
                setTimeout(() => {
                    navigate(data.userType === 'admin' ? '/admin/dash' : 
                             data.userType === 'company' ? '/company/dash' : 
                             '/customer/dash');
                }, 2000); // 2-second delay before redirecting
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="change-password">
            <form className="form-box" onSubmit={handleChangePassword}>
                <h2>Change Password</h2>
                {errorMessage && <p className="error">{errorMessage}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Current Password</label>
                        <input 
                        type="password" class="form-control" id="exampleInputPassword1"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required/>
                </div>
                <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">New Password</label>
                        <input 
                        type="password" class="form-control" id="exampleInputPassword1"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        />
                </div>
                <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                        <input 
                        type="password" class="form-control" id="exampleInputPassword1"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required/>
                </div>
                
                <button type="submit" className="submit">Update Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
