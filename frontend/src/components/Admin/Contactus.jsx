import React from 'react'
import 'typeface-poppins';




function Contactus() {
  return (
    <div className="container justify-content-center rounded bg-white mt-5" style={{ width: '70%', fontFamily: 'Poppins' }} >
     
      <div className='card shadow mb-5' >
        <div className='card-body'>
        <h2 className='text-center text-primary'>Get in Touch</h2>
        <div className='row'>
            <div className='col-md-6 '>
                <img src ="public/contact.jpg"  alt='img' style={{ width: '90%' }}/>
            </div>
            <div className='col-md-6 border-left mt-4' style={{ fontSize: '16px' }}>
              
                <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control"  placeholder=' Name' required />
              </div>
              <div className="form-group mt-3">
                <label>Mobile Number</label>
                <input type="text" className="form-control"  placeholder='Mobile ' required />
              </div>
              <div className="form-group mt-3">
                <label>Email Address</label>
                <input type="text" className="form-control"  placeholder='Email' required />
              </div>
              <div className="form-group mt-3">
                <label>Message</label>
                <textarea rows ='4' className="form-control" placeholder=' Message......' required />
              </div>
              <div className='text-end mt-4'>
                <input type="submit" className="btn btn-primary shadow w-100" value='Send Email' />
              </div>
            </div>
        </div>
        </div>
      </div>

    </div>
  )
}

export default Contactus