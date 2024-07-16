const express=require("express");
const cors=require("cors");
const stripe=require("stripe")("sk_test_51Pa2sPAiPGKfCuNVVqYTGsKEYd8w2YC3Cc7my0hcCtnTVuHpDX1IowBvVv4HHKXwopkspDMXeIWeLuEIYXe47Her00r5ESXKfj");


const{v4:uuidv4}=require("uuid");


const app=express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
req.send("it is working");

});
app.post("/payment",(req,res)=>{
   const {product,token}=req.body;
   const transactionKey=uuidv4();
   return stripe.customer.create({
    email:token.email,
    source:token.id
   }).then((customer)=>{
 

    stripe.charges.create({
        amount:product.price,
        currency:"LKR",
       customer:customer.id,
       receipt_email:token.email,
       description: product.name

    }).then((result)=>{

        res.json(result);
    }).catch((err)=>{
        console.log(err);
    });
});
});


app.listen(5000,()=>{

console.log("server has been started in 5000");

});






