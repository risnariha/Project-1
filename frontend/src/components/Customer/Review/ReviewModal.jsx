import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';

const ReviewModal = ({ show, onHide, onSubmit, onRatingChange }) => {
  const { user } = useOutletContext()
  const [userReview, setUserReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleRatingChange = (ratingValue) => {
    setRating(ratingValue);
    onRatingChange(ratingValue);
  };

 
    const handleSubmit = () => {
        if (!userReview || !rating) {
          alert('Please fill in all required fields');
          return;
        }
        onSubmit({userReview, rating });
        setRating();
        onHide();
     
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="modal-title-custom">
          Write your Review
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center modal-body-custom">
        <h4 className="rating-stars-custom">
          {[...Array(5)].map((star, index) => (
            <i
              key={index}
              className={`fa fa-star star-light submit_star mr-1 ${
                index < rating ? "text-warning" : ""
              }`}
              onMouseEnter={() => handleRatingChange(index + 1)}
              onClick={() => handleRatingChange(index + 1)}
            ></i>
          ))}
        </h4>
        <Form.Group className="form-group-custom">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={user.customerName}
            readOnly
          />
        </Form.Group>

        {/* User Review Input */}
        <Form.Group className="form-group-custom">
          <Form.Control
            as="textarea"
            placeholder="Enter your feedback"
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
            className="feedback-input-custom"
            required
          />
        </Form.Group>

        <Button
          className="btn-primary submit-btn-custom"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewModal;
