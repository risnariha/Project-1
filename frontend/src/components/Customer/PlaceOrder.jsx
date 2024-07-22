import React from "react";


function PlaceOrder(){



    const payNow=() =>{
     
<div>
        <input type="number" name="card_num" placeholder="Card Number" className="form-control" />
          <input type="text" name="nameoncard" placeholder="Name on Card" className="form-control" />
           <input type="date" name="Exp" placeholder="Expiration" className="form-control" />
           <input type="text" name="CVV" placeholder="CVV" className="form-control" />
           <input type="submit" value="Proceed"></input>
</div>

    }


    const Cash=() =>{

        <div class="alert alert-success">
        <strong>Success!</strong> 
      </div>

    }
    
return(
                    <div>
                        <form method="POST">
                            <div className="mb-3">
                                <label>First Name</label>
                                <input type="text" name="f_name" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label>Last Name</label>
                                 <input type="text" name="l_name" classname="form-control" />
                            </div>
                            <div className="mb-3">
                                <label>Address 1</label>
                                 <input type="text" name="addrs1" classname="form-control" />
                            </div>
                            <div className="mb-3">
                                <label>address 2</label>
                                 <input type="text" name="addrs2" classname="form-control" />
                            </div>
                            <div className="mb-3">
                                <label>Mobile Number</label>
                                 <input type="number" name="mob_no" classname="form-control" />
                            </div>
                            <div className="mb-3">
                                <label>Email</label>
                                 <input type="text" name="email" classname="form-control" />
                            </div>

                            <div classname="mb-3">
                                <label>Postal Code</label>
                                 <input type="text" name="postal" classname="form-control" />
                            </div>

                            <div className="mb-3">
                               <label> Payment Method </label>
                               <button onClick={()=> payNow()}>Credit/Debit Card</button>
                               <button onClick={()=> Cash()}>Cash on Delivery</button>
   
                            </div>

                        </form>
                        
                   </div>     
          
                     



     



)};
export default PlaceOrder;