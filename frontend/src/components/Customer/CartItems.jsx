import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

function CartItems() {
    const [Items, setItems] = useState([]);
    const { user } = useOutletContext();
    const userID = JSON.parse(sessionStorage.getItem('userID'));
    console.log("pass Outlet : ", user);

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
                    <div className="col-md-6"><b>CART ITEMS</b></div>
                    <div className="col-md-6">
                        <Link to="/customer/PlaceOrder"
                            className={`${Items.length > 0 ? "" : "disabled"} btn btn-success btn-sm float-end`}
                            aria-disabled={!Items.length}
                        >Place Order</Link>
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
                                <td>{Item.quantity}</td>
                                <td>{Item.price *Item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CartItems;
