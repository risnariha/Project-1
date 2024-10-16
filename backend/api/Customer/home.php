<?php

if ($product_data["qty"] > 0) {

<span class="card_text text-warning fw_bold">in stock</span> <br />
<span class="card_text text-success fw_bold"><?php echo $product_data["qty"];?> items available</span><br />
<a  href= '<?php echo "singleproductview.php?id=" . $product_data["id"]; ?>' class="col-12 btn-success">buy now</a>
<button class="col-12 btn btn-danger mt-2" onclick='add_cart_item(<?php echo $product_data["id"]; ?>)'>add to cart</button>

} else {



<span class="card-text  text-danger fw-bold">out of stock</span> <br />
<span class="card-text text-danger fw-bold">00 items available</span><br /><br />
<button class="col-12 btn  btn-success disabled">buy now</button>
<button classs="col-12 btn btn-danger mt-2 disabled">add to cart</button>



}

$watchlist_rs = databass::search("select * from 'watchlist' where 'product_id'='" . $product_data["id"] . "'
and user_email'='" . $session["u"]["email"] . "'");

$watchlist_num = $watclist_rs->num_rows;

