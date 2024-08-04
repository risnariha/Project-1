import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';



function Aboutus() {
  return (
    <div className="container p-5 m-4" style={{ fontFamily: 'Poppins' }}>
        <div className="row">
          <div className="col-xl-7 col-lg-7 mt-4">
            <div className="about_info p-4">
              <div className="section_title mb-20px">
                <h4 className="text-primary" style={{ fontSize: '28px' }}>About Us</h4>
                <h1 className="mt-2" style={{ fontSize: '48px' }}>EliteZ</h1>
              </div>
              <p className="text-secondary mt-1" style={{ fontSize: '16px' }}>
                Our mission is to streamline the process of getting diverse products from various companies into the hands
                of shop owners efficiently. We manage stock levels, ensure accurate picking of items, and provide comprehensive 
                analysis reports to companies. These reports include product names, quantities, and customer addresses, enabling 
                distributors to optimize delivery routes. By focusing on secure packing and timely shipping, we aim to enhance 
                the distribution network, ensuring that orders reach their destinations swiftly and accurately.
              </p>
              <Link to="/" className="line-button text-primary text-decoration-underline " style={{ fontSize: '15px' }}>Learn More</Link>
            </div>
          </div>
          <div className="col-lg-5 col-md-4">
            <div className="img_1 mt-3">
              <img src="public/login1.jpg"  alt="image" style={{ width: '130%' }}/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Aboutus