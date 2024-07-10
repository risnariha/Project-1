import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function Customerdetails() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleShowModal = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const fetchCustomerData = () => {
    setLoading(true);
    axios.post('http://localhost/Project/Project-1/backend/Listcustomer.php')
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
    fetchCustomerData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='container mt-5' style={{ bodyBackground: '#eaeaea', marginLeft:"8%"  }}>
      <div className='row justify-content-center'>
        <div className='col-md-12 col-lg-9'>
          <div className='card'>
            <div className='card-header bg-dark text-white d-flex justify-content-between align-items-center'>
              <h1 className='h4 text-center'>Customers Details</h1>
              <form className="d-flex" role="search">
                <input className="form-control" placeholder="Search" aria-label="Search"/>
              </form>
            </div>
            <div className='card-body p-0'>
              <div className='table-responsive'>
                <table className='table table-bordered table-striped'>
                  <thead className='thead-dark'>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>District</th>
                      <th>Reference No</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((item) => (
                      <tr key={item.refno}>
                        <td>{item.fname}</td>
                        <td>{item.lname}</td>
                        <td>{item.email}</td>
                        <td>{item.district}</td>
                        <td>{item.refno}</td>
                        <td>
                          <button className="btn btn-primary m-1" onClick={() => handleShowModal(item)}>View</button>
                          {/*<button className="btn btn-danger m-1">Delete</button>*/}
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
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>View Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>First Name:</strong> {selectedCustomer.fname}</p>
            <p><strong>Last Name:</strong> {selectedCustomer.lname}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Phone No:</strong> {selectedCustomer.phone}</p>
            <p><strong>District:</strong> {selectedCustomer.district}</p>
            <p><strong>Address:</strong> {selectedCustomer.address}</p>
            <p><strong>Reference No:</strong> {selectedCustomer.refno}</p>
            <p><strong>Password:</strong> {selectedCustomer.pw}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Customerdetails;
