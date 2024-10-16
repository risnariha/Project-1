


function paynow(id) {
    var qty = documentgetelementbyid("qty_input").value;

    var r = new xmlhttprequest();

r.onreadystatechange = function () {
    if (r.readystate == 4) {
        var t = r.responsetext;

        var obj = json.parse(t);

        var mail = obj["mail"];
        var amount = obj["amount"];

        if (t == "1") {
            alert("please log in or sign up");
            window.location = "index.php";
        } else if (t == "2") {
            alert("please update your profile first");
            window.location = "updateprofile.php";
        } else {
            // payment completed. if can be a successful failure.
            payhere.oncompleted = function oncompleted(orderid) {
                // note: prompt user to pay again or show an error page
                console.log("payment dismissed");
            };

            // error occurred
            payhere.onerror = function ondismissed() {
                //note: show an error page
                console.log("error:" + error);
            };

        
                    
          // put the payment varlables here
          var payment = {
              "sandbox": true,
              "merchant_id": "1228440",  // sandbox merchant id
              "return_ur1": "http://localhost/eshop/singleproductview.php?id" + id,  // important
              "cancel_ur1": "http://localhost/eshop/singleproductview.php?id" + id,   // important
              "notify_ur1": "http://sample.com/notify",
              "order_id": obj ["id"],
              "items": obj["item"],
              "amount": amount,
              "currency": "lkr",
              "first_name": obj["fname"],
              "last-name": obj["iname"],
              "email": mail,
              "phone": obj["mobile"],
              "address": obj["address"],
              "city": obj["city"],
              "country": "srilanka",
              "delivery_address": obj["address"],
              "delivery_city": obj["city"],
              "delivery_country": "sri lanka",
              "custom_1": "",
              "custom_2": ""
          };

          // show the payhere.js popup, when "payhere pay" is clicked
          // document.getelmentybyid('payhere-payment').onclick = funcation (e)
          {
            payhere.startpayment(payment);
          };
        }
    }
}
 
r.open("get", "buynowprocess.php?id=" + id + "&qty=" + qty, true);
r.send();
}


                