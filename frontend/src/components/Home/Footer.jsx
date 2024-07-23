import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mb-0 ">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p>We provide comprehensive inventory management and distribution solutions to streamline your supply chain.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <p>Email: info@inventoryfulfillment.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/services" className="text-white text-decoration-none">Services</a></li>
              <li><a href="/about" className="text-white text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
              <li><a href="/faq" className="text-white text-decoration-none">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="border-top border-secondary my-3"></div>
        <div className="text-center">
          <p className="mb-0">&copy; 2024 Inventory Fulfillment and Distribution. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
