import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom';

function CartItems(){
    const [Items, setItems]=useState([]);

    useEffect(()=> {
         const apiUrl='http://localhost8080/backend/api/action.php';
        
         fetch(apiUrl)
         .then((response)=> response.json())
         .then((data)=>{

            setItems(data);
         });

    },[]);

    return(

        <div className="card">
            <div className="card-header"> 
                <div className="row">
                    <div className="col-md-6"><b>CART ITEMS</b></div>
                     <div className="col-md-6">
                                     <Link to="/PlaceOrder" className="btn btn-success btn-sm float-end">Place Order</Link>
                     </div>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th> Product Name</th>
                            <th> Price per Product</th>
                            <th> Quantity</th>
                             <th> Total Price</th>
                             
                        </tr>
                    </thead>
                    <tbody>

                        {Items.map((Item,index))}
                           <tr key={index}>

                            <td>{Item.product_name}</td>
                            <td>{Item.priceper_product}</td>
                            <td>{Item.quantity}</td>
                            <td>{Item.total}</td>

                            </tr> 
                    </tbody>

                </table>
            </div>

        </div>

      
    )



}

export default CartItems;
//last