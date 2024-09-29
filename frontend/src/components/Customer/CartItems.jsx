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

    // Function to handle quantity increment and decrement
    const handleQuantity = (index, action) => {
    const updatedItems = Items.map((item, i) => {
      if (i === index) {
        // Increment or decrement based on the action
        if (action === 'increment') {
          return { ...item, quantity: item.quantity + 1 };
        } else if (action === 'decrement' && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });
  
    setItems(updatedItems); // Update the state with the new quantity
  };
  

    return (
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-6 "><h5><b>CART ITEMS</b></h5></div>
                    <div className="col-md-6">
                        <Link to="/customer/PlaceOrder"
                            className={`${Items.length > 0 ? "" : "disabled"} btn btn-success btn-sm float-end p-1`}
                            aria-disabled={!Items.length}
                        >Place Order</Link>
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
                                <td>
                                    <button onClick={()=>handleQuantity(index, 'increment')} className='w-20 bg bg-success m-2'>+</button>
                                    <span>{Item.quantity}</span>
                                    <button onClick={()=>handleQuantity(index, 'decrement')} className='w-20 bg bg-danger m-2'>-</button>
                                </td>
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
