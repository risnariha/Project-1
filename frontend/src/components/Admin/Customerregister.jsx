import React from 'react'
import  { useState } from 'react';
import axios from 'axios'



export default function Customerregister() {
    const handleSubmit = (event)=>{
        event.preventDefault();

        // Log inputs for debugging
         console.log(inputs);


        //API request
        axios.post('http://localhost/Project/Project-1/backend/customerregister.php', inputs)
        .then(response => {
            if(response.data === "Success") {
            alert("Register successfully");
            
            } else {
            alert("Error in Register:"+ response.data);
            }
        })
        .catch(error => {
            console.error("There was an error!", error);
        });
    }

  const [inputs,setInputs] = useState({
    fname:"",
    lname:"",
    email:"",
    phone:"",
    place:"",
    district:"",
    pw:"",
    refno:""
    
  })


  const handleInput = (event) =>{
    setInputs({...inputs,[event.target.name]:event.target.value})
  }

  
  
  return (
    <div className="container  shadow p-3  justify-content-center rounded bg-white" style={{ width: '78%', marginTop:'8%' }}>
    <div className="row">
      <div className='col-md-4 '>
        <img src ="public/reg.jpg" width="115%" alt='img'/>
      </div>
      <div className='col-md-8 '>
        <div className='row mb-4 mt-3'>
          <div className='col-md-6 align-items-start'>
            <h3 className='text-primary'><strong>Create An Acconut</strong></h3>
          </div>
          <div className='col-md-6 text-end'>
            <p>Already have an account? Please <a href="#">Login</a></p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} >
          <div className='row'>
            <div className=" col-md-11 form-group mb-3 ms-2">
              <label>First Name</label>
              <input type="text" style={{ background: '#d1e4ec' }} className="form-control" name="fname" onChange={handleInput} required />
            </div>
          </div>
          <div className='row'>
            <div className=" col-md-11 form-group mb-3 ms-2">
              <label>Last Name</label>
              <input type="text" style={{ background: '#d1e4ec' }} className="form-control" name="lname" onChange={handleInput} required />
            </div>
          </div>
          <div className='row'>
            <div className="  col-md-5 form-group mb-3 ">
              <label>Email</label>
              <input type="email"  style={{ background: '#d1e4ec' }}className="form-control" name="email" onChange={handleInput} required />
            </div>
            <div className=" col-md-5 form-group mb-3 ms-5">
              <label>Phone Number</label>
              <input type="text" style={{ background: '#d1e4ec' }} className="form-control" name="phone" onChange={handleInput} required />
            </div>
          </div>
          <div className='row'>
            <div className="col-md-5 form-group mb-3 ">
              <label>Address</label>
              <input type="text"  style={{ background: '#d1e4ec' }}className="form-control" name="place" onChange={handleInput} required />
            </div>
            <div className=" col-md-5 form-group mb-3 ms-5 ">
              <label>District</label>
              <input type="text"  style={{ background: '#d1e4ec' }}className="form-control" name="district" onChange={handleInput} required />
            </div>
          </div>
          <div className='row'>
            <div className="col-md-5 form-group mb-3  ">
              <label>Create a Password</label>
              <input type="password" style={{ background: '#d1e4ec' }} className="form-control" name="pw" onChange={handleInput} required />
            </div>
            <div className="col-md-5 form-group mb-3 ms-5">
              <label>Reference Number of Shop</label>
              <input type="text"  style={{ background: '#d1e4ec' }}className="form-control" name="refno" onChange={handleInput} required />
            </div>
          </div>
                    
          <div className='  text-center mt-3 mb-3'>
            <input type="submit" className="btn btn-primary shadow w-100 " value='Create  Account' />
          </div>
        </form>
      </div>
    </div>
  </div>
    
    
)
};


