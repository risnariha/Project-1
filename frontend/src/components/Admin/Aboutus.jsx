import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';



function Aboutus() {
  return (
    <div className="container p-5 m-3" style={{ fontFamily: 'Poppins' }}>
        <div className="row">
          <div className="col-xl-7 col-lg-7 mt-0">
            <div className="about_info p-4">
              <div className="section_title mb-20px">
                <h4 className="text-primary" style={{ fontSize: '28px' }}>About Us</h4>
                <h1 className="mt-2" style={{ fontSize: '48px' }}>EliteZ</h1>
              </div>
              <p className="text-secondary mt-1" style={{ fontSize: '16px' }}>
              Our mission is to modernize inventory and distribution, making it more efficient, affordable, and accessible for businesses.
               By using technology, we simplify supply chain management, allowing companies to focus on delivering quality products to
               their customers.<br></br>EliteZ connects businesses with customers directly, eliminating the need for store visits. Our platform 
               allows online order management, real-time inventory tracking, and efficient delivery planning, reducing costs and boosting
                satisfaction. Designed for businesses of all sizes, EliteZ offers scalable tools to manage inventory, process orders, 
                and grow your market reach.
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