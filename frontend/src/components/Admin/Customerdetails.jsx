import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Addcustomer from './Addcustomer';

function Customerdetails() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleShowViewModal = (customer) => {
    setSelectedCustomer(customer);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => setShowViewModal(false);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleSaveAddModal = () => {
    // Fetch updated records here if necessary
    setShowAddModal(false);
  };


  const fetchCustomerData = () => {
    setLoading(true);
    axios.post('')
      .then(response => {
        setRecords(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }

  useEffect(() => {
    //fetchCustomerData();
  }, []);

  //if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='container mt-5' style={{ bodyBackground: '#eaeaea', marginLeft:"8%"  }}>
      <div className='row justify-content-center'>
        <div className='col-md-12 col-lg-9'>
          <div className='card'>
            <div className='card-header bg-dark text-white d-flex justify-content-between align-items-center'>
                <form className="d-flex" role="search">
                    <input className="form-control" placeholder="Search" aria-label="Search"/>
                </form>
                <h1 className='h4 text-center'>Customers Details</h1>
                <button className="btn btn-info text-dark m-2" onClick={handleShowAddModal}>
                    Add Customer
                </button>
              
            </div>
            <div className='card-body p-0'>
              <div className='table-responsive'>
                <table className='table table-bordered table-striped'>
                  <thead className='thead-dark'>
                    <tr>
                      <th>Customer Name</th>
                      <th>Shop Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*<tr>
                        <td>fgygfy</td>
                        <td>fgygfy</td>
                        <td>fgygfy</td>
                        <td>fgygfy</td>
                        <td>fgygfy</td>
                        <td>
                          <button className="btn btn-primary m-1" onClick={() => handleShowViewModal()}>View</button>
                          <button className="btn btn-success m-1">Edit</button>
                          <button className="btn btn-danger m-1">Delete</button>
                        </td>
                    </tr>*/}
                    {records.map((item,id) => (
                      <tr key={id}>
                        <td>{item.name}</td>
                        <td>{item.shopname}</td>
                        <td>{item.email}</td>
                        <td>{item.contact}</td>
                        
                        <td>
                          <button className="btn btn-primary m-1" onClick={() => handleShowViewModal(item)}>View</button>
                          <button className="btn btn-success m-1">Edit</button>
                          <button className="btn btn-danger m-1">Delete</button>
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

      {selectedCustomer && (
        <Modal show={showViewModal} onHide={handleCloseViewModal}>
          <Modal.Header closeButton>
            <Modal.Title>View Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>ID:</strong> {selectedCustomer.id}</p>
            <p><strong>Name:</strong> {selectedCustomer.name}</p>
            <p><strong>Shop Name:</strong> {selectedCustomer.shopname}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Contact Number:</strong> {selectedCustomer.contact}</p>
            <p><strong>Address:</strong> {selectedCustomer.place}</p>
            <p><strong>Reference No:</strong> {selectedCustomer.refno}</p>
            <p><strong>Password:</strong> {selectedCustomer.pw}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseViewModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
      <Addcustomer
        showAddModal={showAddModal}
        handleCloseAddModal={handleCloseAddModal}
        handleSaveAddModal={handleSaveAddModal}
      />
    </div>
  );
}

export default Customerdetails;
