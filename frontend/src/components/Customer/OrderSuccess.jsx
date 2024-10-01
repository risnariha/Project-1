import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OrderSuccess() {
    const { state } = useLocation();
    const { invoice } = state || {};
    const navigate = useNavigate();

    // Redirect to cart if no invoice details are provided
    if (!invoice) {
        return (
            <div className="container mt-5">
                <h3>No order details found. Please go back to the cart and place an order.</h3>
                <button 
                    className="btn btn-primary mt-3"
                    onClick={() => navigate('/customer/cart')}
                >
                    Back to Cart
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h3>Order Successful!</h3>
                </div>
                <div className="card-body">
                    <h4>Thank you for your order!</h4>
                    <p>Your order has been successfully placed. Here are your order details:</p>

                    <div className="card mt-3">
                        <div className="card-header">
                            <h5>Invoice Details</h5>
                        </div>
                        <div className="card-body">
                            <p><strong>Customer ID:</strong> {invoice.customer_id}</p>
                            <p><strong>Total Amount:</strong> Rs. {invoice.total_amount}</p>

                            <table className="table table-bordered mt-3">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoice.items.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.product_name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>Rs. {item.total_price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <button 
                                className="btn btn-primary mt-3"
                                onClick={() => navigate('/customer/cart')}
                            >
                                Back to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;
