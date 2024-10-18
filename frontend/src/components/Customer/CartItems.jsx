import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useNavigate, useOutletContext } from 'react-router-dom';

function CartItems() {
    const [Items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [invoice, setInvoice] = useState(null);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const { user } = useOutletContext();
    const userID = JSON.parse(sessionStorage.getItem('userID'));
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (userID) {
                try {
                    const response = await axios.get('http://localhost:8080/backend/api/Customer/cart_items.php', {
                        params: { customer_id: userID }
                    });
                    if (response.data) {
                        setItems(response.data);
                        calculateTotalAmount(response.data);
                    }
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                }
            }
        };

        fetchCartItems();
    }, [userID]);

    const handleProceedToPayment = async () => {
        if (selectedItems.length === 0) {
            alert('Please select items to proceed.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/backend/api/Customer/generate_invoice.php', {
                customer_id: userID,
                items: selectedItems
            });

            if (response.data) {
                setInvoice(response.data);
                navigate('/customer/payment', { state: { invoice: response.data, totalAmount } });
            }
        } catch (error) {
            console.error("Error proceeding to payment:", error);
        }
    };

    const handleQuantityChange = (index, newQuantity) => {
        const updateItems = [...Items];
        updateItems[index].quantity = newQuantity;
        setItems(updateItems);
        calculateTotalAmount(updateItems);
    };

    const updateCartQuantity = async (item) => {
        try {
            const response = await axios.post('http://localhost:8080/backend/api/Customer/update_cart_quantity.php', {
                id: item.id,
                quantity: item.quantity
            });
            if (!response.data.success) {
                console.error("Error updating cart item.");
            }
        } catch (error) {
            console.error("Error updating cart item:", error);
        }
    };

    const handlePlaceOrder = () => {
        setShowInvoiceModal(true);
    };

    const handleCloseModal = () => {
        setShowInvoiceModal(false);
    };

    const calculateTotalAmount = (items) => {
        const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotalAmount(total);
    };

    const toggleItemSelection = (item) => {
        const isSelected = selectedItems.find((selected) => selected.id === item.id);
        if (isSelected) {
            setSelectedItems(selectedItems.filter((selected) => selected.id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await axios.delete('http://localhost:8080/backend/api/Customer/remove_cart_item.php', {
                data: {
                    customer_id: userID, // Pass customer ID
                    item_id: itemId      // Pass item ID
                }
            });
            setItems(Items.filter((item) => item.id !== itemId));
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    return (
        <div className={`card`}>
            <div className="card-header">
                <div className="row">
                    <div className="col-md-6 "><h5><b>CART ITEMS</b></h5></div>
                    <div className="col-md-6">
                        <div
                            className={`${selectedItems.length > 0 ? "" : "disabled"} btn btn-success btn-sm float-end`}
                            aria-disabled={!selectedItems.length}
                            onClick={handlePlaceOrder}
                        >Place Order</div>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Product</th>
                            <th>Product Name</th>
                            <th>Price per Product</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Items.map((Item, index) => (
                            <tr key={index}>
                                <td className=''>
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.some((selected) => selected.id === Item.id)}
                                        onChange={() => toggleItemSelection(Item)}
                                        className='h-6 w-6 d-flex align-items-center'
                                    />
                                </td>
                                <td><img src={Item.product_image} className='' /></td>
                                <td className=''>{Item.product_name}</td>
                                <td>{Item.price}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={Item.quantity}
                                        min='1'
                                        className='form-control text-center'
                                        onChange={(e) => {
                                            const newQuantity = e.target.value;
                                            handleQuantityChange(index, newQuantity);
                                            updateCartQuantity(Item);
                                        }}
                                    />
                                </td>
                                <td>{Item.price * Item.quantity}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleRemoveItem(Item.id)}>Remove</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Invoice Modal */}
            <Modal show={showInvoiceModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Your Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to confirm this order?</p>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.product_name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price * item.quantity}.00</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={3} className="text-center"><strong>Total Amount:</strong></td>
                                <td className='bold'>{totalAmount}.00</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="primary" onClick={handleProceedToPayment}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CartItems;
