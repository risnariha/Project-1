import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Order() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomerData = () => {
    setLoading(true);
    axios.post('url')
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchCustomerData();
  }, []);
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-12 col-lg-9'>
          <div className='card'>
            <div className='card-header bg-dark text-white'>
              <h1 className='h4'>Recent_Orders</h1>
            </div>
            <div className='card-body p-0'>
              <div className='table-responsive'>
                <table className='table table-bordered table-striped'>
                  <thead className='thead-dark'>
                    <tr>
                      <th>Order_ID</th>
                      <th>Ref_NO</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                      <th>Status</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  {orders.map((item) => (
                      <tr key={item.refno}>
                        <td>{item.orderid}</td>
                        <td>{item.refno}</td>
                        <td>{item.quantity}</td>
                        <td>{item.totalamount}</td>
                        <td>{item.status}</td>
                      
                        
                      </tr>
                    ))}
                    
                    
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order;
