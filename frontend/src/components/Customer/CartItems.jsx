import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';


function CartItems() {
    const [Items, setItems] = useState([]);
    const [invoice, setInvoice] = useState(null);
    const { user } = useOutletContext();
    const userID = JSON.parse(sessionStorage.getItem('userID'));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            if (userID) {
                try {
                    const response = await axios.get('http://localhost:8080/backend/api/Customer/cart_items.php', {
                        params: { customer_id: userID }
                    });
                    if (response.data) {
                        setItems(response.data);
                        console.log("get cart:", response.data);
                    }
                } catch (error) {
                    console.error("There was an error fetching the cart items:", error);
                }
            }
        };

        fetchCartItems();
    }, [userID]);

    return (
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-6 "><h5><b>CART ITEMS</b></h5></div>
                    <div className="col-md-6">
                        <Link to="/customer/PlaceOrder"
                            className={`${Items.length > 0 ? "" : "disabled"} btn btn-success btn-sm float-end`}
                            aria-disabled={!Items.length}
                        >Place Order</button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th style={{fontSize:'130%'}}>Product</th>
                            <th style={{fontSize:'130%'}}>Product Name</th>
                            <th style={{fontSize:'130%'}}>Price per Product</th>
                            <th style={{fontSize:'130%'}}>Quantity</th>
                            <th style={{fontSize:'130%'}}>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Items.map((Item, index) => (
                            <tr key={index} className=''>
                                <td className='col-1'><img src={Item.product_image} className='w-100'/></td>    
                                <td className='d-flex align-items-center'>{Item.product_name}</td>
                                <td>{Item.price}</td>
                                <td>{Item.quantity}</td>
                                <td>{Item.price *Item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Invoice Modal or Invoice Section */}
            {invoice && (
                <div className="card mt-3">
                    <div className="card-header">
                        <h5>Invoice Details</h5>
                    </div>
                    <div className="card-body">
                        <p><strong>Customer ID:</strong> {invoice.customer_id}</p>
                        <p><strong>Total Amount:</strong> {invoice.total_amount}</p>
                        <table className="table table-bordered">
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
                                        <td>{item.total_price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={handleProceedToPayment} className="btn btn-primary">Proceed to Payment</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartItems;
