import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Payment() {
    const { state } = useLocation();
    const { invoice } = state || {};
    const navigate = useNavigate();

    if (!invoice) {
        return <div>No invoice details found. Please go back to the cart and place an order.</div>;
    }

    const handlePayment = () => {
        // Logic to handle payment (e.g., redirect to payment gateway or complete payment process)
        console.log("Payment completed for invoice:", invoice);
        // After payment, navigate to a success or order confirmation page
        navigate('/customer/order-success', { state: { invoice } });
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3>Payment</h3>
            </div>
            <div className="card-body">
                <p><strong>Total Amount:</strong> {invoice.total_amount}</p>
                <button onClick={handlePayment} className="btn btn-success">Proceed with Payment</button>
            </div>
        </div>
    );
}

export default Payment;
