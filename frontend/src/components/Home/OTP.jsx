import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OTP = () => {
  const location = useLocation();
  const code = location.state?.code;
  console.log("code is : ", code);
  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    
    const localUser = JSON.parse(localStorage.getItem('user'));
    const user = sessionUser || localUser;
    
}, []);

  const [v1, setV1] = useState('');
  const [v2, setV2] = useState('');
  const [v3, setV3] = useState('');
  const [v4, setV4] = useState('');
  const [v5, setV5] = useState('');
  const [v6, setV6] = useState('');
  const [email, setEmail] = useState(''); 
  const [userType, setUserType]= useState('')
  
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  const handleverify = async(e) =>{
    e.preventDefault();
    const enteredOTP = `${v1}${v2}${v3}${v4}${v5}${v6}`;
    try {
      
        if(code === enteredOTP){
          navigate('/Resetpassword');
        }else{
          console.log("pin number not match");
          setErrorMessage("pin number not match");
        }
      
    } catch (error) {
      
    }
  }

  const handleResend = async (e) =>{
    e.preventDefault();
    
    try {
        const response = await axios.post("http://localhost:8080/backend/api/Home/forgotpassword.php",{email,userType});
        const data = response.data;
        
        console.log(data);
        if(data.success){
            //navigate("/otp");
        } else{
            setErrorMessage(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        setErrorMessage('An error occurred. Please try again.');
    }
}

  return (
    <div className='vh-100  align-items-center justify-content-center ' style={{marginTop:'10%'}}>
    <div className=" container card mt-5 p-2  shadow " style={{width:'50%'}}>
       {errorMessage && (
                <div id="errorMessage">
                    <strong>ERROR: </strong> <p>{errorMessage}</p>
                </div>
            )}
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4 text-danger" >OTP VERIFICATION</h3>
        <p style={{fontSize:'120%'}}>We've sent a password reset code to your email. Please check your email and enter the  Code number.</p>
        
        <div className="d-flex justify-content-between mb-3">
          <input type="text" maxLength="1" className="form-control text-center mx-1" style={{ width: '50px', fontSize: '24px' }} value={v1} onChange= {(e) => setV1(e.target.value)} />
          <input type="text" maxLength="1" className="form-control text-center mx-1" style={{ width: '50px', fontSize: '24px' }} value={v2} onChange= {(e) => setV2(e.target.value)} />
          <input type="text" maxLength="1" className="form-control text-center mx-1" style={{ width: '50px', fontSize: '24px' }} value={v3} onChange= {(e) => setV3(e.target.value)} />
          <input type="text" maxLength="1" className="form-control text-center mx-1" style={{ width: '50px', fontSize: '24px' }} value={v4} onChange= {(e) => setV4(e.target.value)} />
          <input type="text" maxLength="1" className="form-control text-center mx-1" style={{ width: '50px', fontSize: '24px' }} value={v5} onChange= {(e) => setV5(e.target.value)} />
          <input type="text" maxLength="1" className="form-control text-center mx-1" style={{ width: '50px', fontSize: '24px' }} value={v6} onChange= {(e) => setV6(e.target.value)} />
        </div>

        <p className="text-center" style={{fontSize:'110%'}}>
          Didn't get the code?
          <Link onClick={handleResend} className="ms-1" to = '#'>Resend</Link>
        </p>

        <div className="text-center">
          <button  onClick={handleverify} className="btn btn-primary w-100">Verify</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default OTP;
