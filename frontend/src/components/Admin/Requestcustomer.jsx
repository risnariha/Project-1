import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Addcustomer from './Addcustomer';

const Requestcustomer = ({ showRequestAddModal, handleCloseRequestAddModal, handleShowViewModal }) => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCustomerDetailsModal, setShowCustomerDetailsModal] = useState(false);

    const fetchCustomerData = async () => {
        setLoading(true);
        try {
          const response = await fetch('http://localhost:8080/backend/api/Admin/Requestcustomer.php');
          const jsonData = await response.json();
          if (jsonData.success) {
            setCustomers(jsonData.data);
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
        fetchCustomerData();
      }, []);
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;

      const handleViewCustomerDetails = async (customer) => {
        try {
          const response = await fetch(`http://localhost:8080/backend/api/Admin/Getrequestcustomer.php?id=${customer.id}`);
          const jsonData = await response.json();
          if (jsonData.success) {
            setSelectedCustomer(jsonData.data);
            setShowCustomerDetailsModal(true);
          } else {
            setError(jsonData.message);
          }
        } catch (error) {
          setError(error.message);
        }
      };
    
      const handleCloseCustomerDetailsModal = () => {
        setSelectedCustomer(null);
        setShowCustomerDetailsModal(false);
      };
    
      const handleAcceptCustomer = () => {
        // Implement accept customer logic here
        setShowCustomerDetailsModal(false);
      };
    
      const handleRejectCustomer = () => {
        // Implement reject customer logic here
        setShowCustomerDetailsModal(false);
      };

      return (
        <>
        <Modal show={showRequestAddModal} onHide={handleCloseRequestAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Customer Requests</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='table-responsive'>
              <table className='table table-bordered table-striped'>
                <thead className='thead-dark'>
                  <tr style={{ fontSize: '145%' }}>
                    <th>Customer ID</th>
                    <th>Username</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.customerID} style={{ fontSize: '145%' }}>
                      <td>{customer.id}</td>
                      <td>{customer.username}</td>
                      <td className='d-flex justify-content-center'>
                        <button className="btn btn-primary me-1" onClick={() => handleViewCustomerDetails(customer)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseRequestAddModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        {selectedCustomer && (
        <Modal show={showCustomerDetailsModal} onHide={handleCloseCustomerDetailsModal}>
          <Modal.Header closeButton>
            <Modal.Title>View Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{fontSize:'135%'}}>
            <p><strong>ID:</strong> {selectedCustomer.id}</p>
            <p><strong>Name:</strong> {selectedCustomer.username}</p>
            <p><strong>Shop Name:</strong> {selectedCustomer.businessName}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Contact Number:</strong> {selectedCustomer.contactNumber}</p>
            <p><strong>Address:</strong> {selectedCustomer.address}</p>
            <p><strong>District:</strong> {selectedCustomer.district}</p>
            {/*<p><strong>Reference No:</strong> {selectedCustomer.customerShopReferenceNo}</p>*/}
            {/*<p><strong>Password:</strong> {selectedCustomer.password}</p>*/}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleAcceptCustomer}>Accept</Button>
            <Button variant="danger" onClick={handleRejectCustomer}>Reject</Button>
          </Modal.Footer>
        </Modal>
      )}
        </>
        
      );
    }

export default Requestcustomer