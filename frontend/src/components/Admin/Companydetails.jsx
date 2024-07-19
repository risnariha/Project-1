import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Requestcompany from './Requestcompany';

function Companydetails() {
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showRequestAddModal, setShowRequestAddModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleShowViewModal = (company) => {
    setSelectedCompany(company);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => setShowViewModal(false);
  const handleShowRequestAddModal = () => setShowRequestAddModal(true);
  const handleCloseRequestAddModal = () => setShowRequestAddModal(false);
  const handleSaveAddModal = () => {
    // Fetch updated records here if necessary
    setShowRequestAddModal(false);
  };


  const fetchCompany = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/backend/api/Admin/Listcompany.php');
      const jsonData = await response.json();
      if (jsonData.success) {
        setCompany(jsonData.data);
      } else {
        setError(jsonData.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='container mt-5' style={{ bodyBackground: '#eaeaea' }}>
      <div className='row justify-content-center'>
        <div className='col-md-11   col-lg-11'>
          <div className='card'>
            <div className='card-header bg-dark text-white d-flex justify-content-between align-items-center'>
                <form className="d-flex" role="search">
                    <input className="form-control" placeholder="Search" aria-label="Search"/>
                </form>
                <h1 className='h4 text-center'>Company Details</h1>
                <button className="btn btn-info text-dark m-2" onClick={handleShowRequestAddModal}>
                    Company Request
                </button>
              
            </div>
            <div className='card-body p-0'>
              <div className='table-responsive'>
                <table className='table table-bordered table-striped'>
                  <thead className='thead-dark'>
                    <tr style={{fontSize:'145%'}}>
                      <th>Company Name</th>
                      <th>Company Owner Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
          
                    {company.map((company) => (
                      <tr key={company.companyOwnerID} style={{fontSize:'145%'}}>
                        <td>{company.companyName}</td>
                        <td>{company.companyOwnerName}</td>
                        <td>{company.email}</td>
                        <td>{company.companyContactNumber}</td>
                        
                        <td className='d-flex justify-content-center'>
                          <button className="btn btn-primary me-1" onClick={() => handleShowViewModal(company)}>View Products</button>
                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

     {/* {selectedCustomer && (
        <Modal show={showViewModal} onHide={handleCloseViewModal}>
          <Modal.Header closeButton>
            <Modal.Title>View Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{fontSize:'135%'}}>
            <p><strong>ID:</strong> {selectedCustomer.customerID}</p>
            <p><strong>Name:</strong> {selectedCustomer.customerName}</p>
            <p><strong>Shop Name:</strong> {selectedCustomer.customerShopName}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Contact Number:</strong> {selectedCustomer.customerContactNumber}</p>
            <p><strong>Address:</strong> {selectedCustomer.customerAddress}</p>
            <p><strong>District:</strong> {selectedCustomer.customerDistrict}</p>
            <p><strong>Reference No:</strong> {selectedCustomer.customerShopReferenceNo}</p>
            <p><strong>Password:</strong> {selectedCustomer.password}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseViewModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}*/}
      <Requestcompany
        showRequestAddModal={showRequestAddModal}
        handleCloseRequestAddModal={handleCloseRequestAddModal}
        handleShowViewModal={handleShowViewModal}
      />
    </div>
  );
}

export default Companydetails;
