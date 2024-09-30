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

    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity < 1) return; // Prevent negative or zero quantities

        const updatedItems = [...Items];
        updatedItems[index].quantity = newQuantity;
        setItems(updatedItems);
    };

    const updateQuantity = async (itemID, newQuantity) => {
        try {
            const response = await axios.post('http://localhost:8080/backend/api/Customer/update_cart_quantity.php', {
                item_id: itemID,
                quantity: newQuantity
            });

            if (response.data.success) {
                console.log("Quantity updated successfully!");
            } else {
                console.error("Failed to update quantity.");
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleBlur = (itemID, quantity) => {
        updateQuantity(itemID, quantity);
    };

    const handlePlaceOrder = async () => {
        try {
            // Send request to create an order
            const response = await axios.post('http://localhost:8080/backend/api/Customer/place_order.php', {
                customer_id: userID,
                items: Items
            });

            if (response.data.success) {
                // Set invoice details and show invoice modal/page
                setInvoice(response.data.invoice);
                console.log("Order placed successfully! Invoice:", response.data.invoice);
            } else {
                console.error("Failed to place order.");
            }
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    const handleProceedToPayment = () => {
        // Navigate to payment page or show payment options
        navigate('/customer/payment', { state: { invoice: invoice } });
    };

    return (
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-6"><b>CART ITEMS</b></div>
                    <div className="col-md-6">
                        <button 
                            onClick={handlePlaceOrder} 
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
                            <th>Product</th>
                            <th>Product Name</th>
                            <th>Price per Product</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Items.map((Item, index) => (
                            <tr key={index} className=''>
                                <td className='col-1'><img src={Item.product_image} className='w-100'/></td>    
                                <td className='d-flex align-items-center'>{Item.product_name}</td>
                                <td>{Item.price}</td>
                                <td className=''>
                                    <input
                                        type="number"
                                        value={Item.quantity}
                                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                        onBlur={() => handleBlur(Item.item_id, Item.quantity)}
                                        className="form-control form-control-sm"
                                    />
                                </td>
                                <td>{Item.price * Item.quantity}</td>
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
