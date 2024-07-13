import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const Addcustomer = ({showAddModal, handleCloseAddModal, handleSaveAddModal}) => {
 
  const [inputs, setInputs] = useState({
    id:"",
    name:"",
    email:"",
    pw:"",
    contact:"",
    shopname:"",
    place:"",
    refno:""

  });

  const handleInput = (event) => {
    setInputs({...inputs,[event.target.name]:event.target.value});
  }

  

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('')
    .then(response => {
      if(response.data === "Success") {
        alert("Customer added successfully");
        handleSave();
        handleClose();
      } else {
        alert("Error adding customer");
      }
    })
    .catch(error => {
      console.error("There was an error!", error);
    });
   
  };

  

  return (
    <Modal show={showAddModal} onHide={handleCloseAddModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" name="id" value={inputs.id} onChange={handleInput} required/>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={inputs.name} onChange={handleInput} required/>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" value={inputs.email} onChange={handleInput} required/>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" name="pw" value={inputs.pw} onChange={handleInput} required/>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control type="text" name="contact" value={inputs.contact} onChange={handleInput} required/>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Shop Name</Form.Label>
            <Form.Control type="text" name="shopname" value={inputs.shopname} onChange={handleInput} required/>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="place" value={inputs.place} onChange={handleInput} required/>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Reference No</Form.Label>
            <Form.Control type="text" name="refno" value={inputs.refno} onChange={handleInput} required/>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Addcustomer;










