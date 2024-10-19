import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function OrderSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const { invoice, totalAmount, paymentMethod, cardDetails } = location.state;

    return (
        <div className="container mt-5">
            <div className="card text-center">
                <div className="card-body">
                    <h2>Order Successful!</h2>
                    <p>Your payment was successfully processed.</p>

                    <h5><strong>Invoice ID:</strong> {invoice.id}</h5>
                    <h5><strong>Total Amount Paid:</strong> Rs. {totalAmount}.00</h5>
                    <h5><strong>Payment Method:</strong> {paymentMethod === 'credit_card' ? 'Credit Card' : 'Cash on Delivery'}</h5>

                    {/* Show card details if Credit Card was used */}
                    {paymentMethod === 'credit_card' && (
                        <div>
                            <h5>Card Number: **** **** **** {cardDetails.cardNumber.slice(-4)}</h5>
                            <p>Expiry Date: {cardDetails.expiryDate}</p>
                        </div>
                    )}
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
                                            <td>Rs. {item.price * item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <button
                                className="btn btn-primary mt-3"
                                onClick={() => navigate('/customer/CartItems')}
                            >
                                Back to Cart
                            </button>
                            <Button
                                variant="secondary"
                                className="mt-3"
                                onClick={() => navigate('/customer/orders')}
                            >
                                View Orders
                            </Button>
                        </div>

                    </div>

                    {/* Navigate back to the customer dashboard */}
                    <Button variant="primary" onClick={() => navigate('/customer/dash')}>
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;



// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// function OrderSuccess() {
//     const { state } = useLocation();
//     const { invoice } = state || {};
//     const navigate = useNavigate();

//     // Redirect to cart if no invoice details are provided
//     if (!invoice) {
//         return (
//             <div className="container mt-5">
//                 <h3>No order details found. Please go back to the cart and place an order.</h3>
//                 <button
//                     className="btn btn-primary mt-3"
//                     onClick={() => navigate('/customer/cart')}
//                 >
//                     Back to Cart
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="container mt-5">
//             <div className="card">
//                 <div className="card-header bg-success text-white justify-content-center d-flex align-items-center">
//                     <h3 >Order Successful!</h3>
//                 </div>
//                 <div className="card-body">
//                     <h4>Thank you for your order!</h4>
//                     <p>Your order has been successfully placed. Here are your order details:</p>

//                     <div className="card mt-3">
//                         <div className="card-header">
//                             <h5>Invoice Details</h5>
//                         </div>
//                         <div className="card-body">
//                             <p><strong>Customer ID:</strong> {invoice.customer_id}</p>
//                             <p><strong>Total Amount:</strong> Rs. {invoice.total_amount}</p>

//                             <table className="table table-bordered mt-3">
//                                 <thead>
//                                     <tr>
//                                         <th>Product Name</th>
//                                         <th>Price</th>
//                                         <th>Quantity</th>
//                                         <th>Total Price</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {invoice.items.map((item, index) => (
//                                         <tr key={index}>
//                                             <td>{item.product_name}</td>
//                                             <td>{item.price}</td>
//                                             <td>{item.quantity}</td>
//                                             <td>Rs. {item.price*item.quantity}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>

//                             <button
//                                 className="btn btn-primary mt-3"
//                                 onClick={() => navigate('/customer/CartItems')}
//                             >
//                                 Back to Cart
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default OrderSuccess;
