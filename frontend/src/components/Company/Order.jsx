
import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaTruck,FaHome, FaShippingFast, FaCheck } from "react-icons/fa";
import { MdOutlineHomeWork } from "react-icons/md";
import axios from "axios";

function Order() {
  const [orders, setOrders] = useState([
    { name: 'John', refNo: 125, orderId: '041', district: 'Jaffna', status: 'Delivered', price: 'Rs.45000' },
    { name: 'Jane', refNo: 126, orderId: '042', district: 'Colombo', status: 'Pending', price: 'Rs.35000' },
    { name: 'Doe', refNo: 127, orderId: '043', district: 'Kandy', status: 'Shipped', price: 'Rs.40000' },
    { name: 'Smith', refNo: 128, orderId: '044', district: 'Galle', status: 'Delivered', price: 'Rs.30000' },
    { name: 'Will', refNo: 129, orderId: '045', district: 'Matara', status: 'Cancelled', price: 'Rs.20000' }
  ]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost/Project-1/backend/api/Company/view_orders.php")
  //     .then((response) => {
  //       if (Array.isArray(response.data)) {
  //         setOrders(response.data);
  //       } else {
  //         setError("Invalid response format");
  //         console.error("Invalid response format:", response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       setError("Error fetching orders");
  //       console.error("Error fetching orders:", error);
  //     });
  // }, []);

  // const handleDelete = (orderId) => {
  //   if (window.confirm("Are you sure you want to delete this order?")) {
  //     axios
  //       .get(`http://localhost/Project-1/backend/api/Company/delete_order.php?delete=${orderId}`)
  //       .then((response) => {
  //         if (response.data.success) {
  //           setOrders(orders.filter((order) => order.orderId !== orderId));
  //         } else {
  //           console.error("Error deleting order:", response.data.error);
  //         }
  //       })
  //       .catch((error) => console.error("Error deleting order:", error));
  //   }
  // };

  const handleStatusChange = (orderId, newStatus) => {
    // Update the status locally first for responsiveness
    const updatedOrders = orders.map(order => {
      if (order.orderId === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);

    // Then send a request to update status on the server
    axios.post(`/api/Company/update_order_status.php`, {
      orderId: orderId,
      status: newStatus
    })
    .then(response => {
      console.log("Order status updated successfully:", response.data);
    })
    .catch(error => {
      console.error("Error updating order status:", error);
    });
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="maincontainer ">
       <div className="table_heading">
        <h3>Order Details</h3>
        </div>
      <section className="display_details">
         <table className="d-felx">
          <thead className=" fs-5">
            <tr>
              <th>Name</th>
              <th>Ref No</th>
              <th>Order ID</th>
              <th>District</th>
              <th>Status</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.orderId} className="fs-6">
                <td>{order.name}</td>
                <td>{order.refNo}</td>
                <td>{order.orderId}</td>
                <td>{order.district}</td>
                <td>
                  {order.status === 'Processing' && <MdOutlineHomeWork />}
                  {order.status === 'Pending' && <FaShippingFast />}
                  {order.status === 'Delivered' && <FaCheck />}
                  <input
                    type="range"
                    min="1"
                    max="3"
                    value={order.status === 'Processing' ? 1 : order.status === 'Pending' ? 2 : 3}
                    onChange={(e) => {
                      const status = e.target.value === "1" ? 'Processing' : e.target.value === "2" ? 'Pending' : 'Delivered';
                      handleStatusChange(order.orderId, status);
                    }}
                  />
                </td>
                <td>{order.price}</td>
                <td>
                  <button className="btn btn-success m-2">Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(order.orderId)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Order;
