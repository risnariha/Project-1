import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { useOutletContext } from 'react-router-dom';


function Customer() {
  const { user } = useOutletContext();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleShowViewModal = (customer) => {
    setSelectedCustomer(customer);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => setShowViewModal(false);
  const handleShowRequestAddModal = () => setShowRequestAddModal(true);
  const handleCloseRequestAddModal = () => setShowRequestAddModal(false);
  const handleSaveAddModal = () => {
    // Fetch updated records here if necessary
    setShowRequestAddModal(false);
  };

  const fetchCustomerData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/backend/api/company/customer_detail.php"
      );
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

  return (
    <div className="maincontainer">
      <div className="table_heading">
        <h3>Customer Details</h3>
      </div>
      <section className="display_product">
        {customers.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Shop Name</th>
                <th>Email</th>
                <th>District</th>
                
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.customerID}>
                  <td>{customer.customerName}</td>
                  <td>{customer.customerShopName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.customerDistrict}</td>
                  <td>
                    {" "}
                    <button
                      className="btn btn-primary me-1"
                      onClick={() => handleShowViewModal(customer)}
                    >
                      View
                    </button>
                    <button className="btn btn-danger me-1">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty_text">No Customer Available</div>
        )}
      </section>

      {selectedCustomer && (
        <Modal show={showViewModal} onHide={handleCloseViewModal}>
          <Modal.Header closeButton>
            <Modal.Title>View Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ fontSize: "135%" }}>
            <p>
              <strong>ID:</strong> {selectedCustomer.customerID}
            </p>
            <p>
              <strong>Name:</strong> {selectedCustomer.customerName}
            </p>
            <p>
              <strong>Shop Name:</strong> {selectedCustomer.customerShopName}
            </p>
            <p>
              <strong>Email:</strong> {selectedCustomer.email}
            </p>
            <p>
              <strong>Contact Number:</strong>{" "}
              {selectedCustomer.customerContactNumber}
            </p>
            <p>
              <strong>Address:</strong> {selectedCustomer.customerAddress}
            </p>
            <p>
              <strong>District:</strong> {selectedCustomer.customerDistrict}
            </p>
            <p>
              <strong>Reference No:</strong>{" "}
              {selectedCustomer.customerShopReferenceNo}
            </p>
            <p>
              <strong>Password:</strong> {selectedCustomer.password}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseViewModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Customer;
