import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOutletContext } from "react-router-dom";

function PlaceOrder() {
  const { user } = useOutletContext();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [sname, setSName] = useState();
  const [number, setNumber] = useState();
  const [address, setAddress] = useState();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
useEffect(()=>{
  if(user){
    setEmail(user.email);
    setName(user.customerName);
    setNumber(user.customerContactNumber);
    setAddress(user.customerAddress);
    setSName(user.customerShopName);
  }
},[]);
  const handleProceed = () => {
    // Show success alert and close the modal
    alert("Payment Successful!");
    handleCloseModal();
  };

  return (
    <div
      className="container justify-content-center rounded bg-white mt-5"
      style={{ width: "40%", fontFamily: "Poppins" }}
    >
      <form method="POST" style={{ fontSize: "140%" }}>
        <div className="mb-3">
          <label>Customer Name</label>
          <input type="text" name="f_name" className="form-control" value={name}/>
        </div>
        <div className="mb-3">
          <label>Shop Name</label>
          <input type="text" name="l_name" className="form-control" value={sname} />
        </div>
        <div className="mb-3">
          <label>Address 1</label>
          <input type="text" name="addrs1" className="form-control" value={address}/>
        </div>
        <div className="mb-3">
          <label>Mobile Number</label>
          <input type="number" name="mob_no" className="form-control" value={number}/>
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="text" name="email" className="form-control" value={email} />
        </div>
        <div className="mb-3">
          <label>Postal Code</label>
          <input type="text" name="postal" className="form-control" />
        </div>
        <div className="mb-3">
          <label>Payment Method</label>
          <div className="d-flex">
            <button
              type="button"
              className="mb-3 mt-2 bg-light border border-black me-2"
              onClick={handleShowModal}
            >
              Credit/Debit Card
            </button>
            <button
              type="button"
              className="mb-3 mt-2 bg-light border border-black"
              onClick={() => alert("Cash on Delivery selected")}
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </form>

      {/* Modal for Credit/Debit Card Payment */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Credit/Debit Card Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="card_holder" className="form-label" style={{ fontSize: '1.2rem' }}>
              Card holder:
            </label>
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                name="card_holder"
                placeholder="Card Name"
                required
              />
              <i className="fas fa-user position-absolute" style={{ fontSize: '1.5rem', top: '50%', right: '10px', transform: 'translateY(-50%)' }}></i>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="card_number" className="form-label" style={{ fontSize: '1.2rem' }}>
              Card number:
            </label>
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                name="card_number"
                placeholder="Card Number"
                data-mask="0000 0000 0000 0000"
                required
              />
              <i className="fas fa-credit-card position-absolute" style={{ fontSize: '1.5rem', top: '50%', right: '10px', transform: 'translateY(-50%)' }}></i>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="expiry_date" className="form-label" style={{ fontSize: '1.2rem' }}>
              Expiry date:
            </label>
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                name="expiry_date"
                placeholder="00 / 00"
                data-mask="00 / 00"
                required
              />
              <i className="far fa-calendar-days position-absolute" style={{ fontSize: '1.5rem', top: '50%', right: '10px', transform: 'translateY(-50%)' }}></i>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="cvc" className="form-label" style={{ fontSize: '1.2rem' }}>
              CVC:
            </label>
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                name="cvc"
                placeholder="000"
                data-mask="000"
                required
              />
              <i className="fas fa-lock position-absolute" style={{ fontSize: '1.5rem', top: '50%', right: '10px', transform: 'translateY(-50%)' }}></i>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleProceed}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PlaceOrder;
