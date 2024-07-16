import React,{useState}from 'react';
import StripeCheckout from 'react-stripe-checkout';

const App = () => {
const[product, setProduct]=useState({

name:"Product",
price:2000*100,
productBy:"TechGY",


});

// hi Risna

const makePayment=(token)=>{
const body={
token,
product

}
const headers={
  "Content-Type":"application/json"
}
return fetch("http://localhost:5000/payment",{
method:"POST",
headers,
body:JSON.stringify(body)

}).then((response)=>{
  console.log(response);
})
.catch((err)=>{
console.log(err);

});
};

  return (
    <div>
    <StripeCheckout name="Buy Product" 
    amount={product.price}
    currency="LKR"
    token={makePayment}
    stripeKey="pk_test_51Pa2sPAiPGKfCuNVOfPunyGfImCFjlG8U9mjo3MtLnJcxhO0igIS2LqLwfVVTjBUBXv7o2CwCymMX9fNHBYY9YHn00q12iky0F"
    >
     <button>Buy Now{product.price/100}</button>

    </StripeCheckout>
      <h1>Elitz</h1>
    </div>
  )
}

export default App