
<div class="border border-1 border-secondary rounded overflow-hidden float-left st-1 position-relative product-qty">



<di class="col-12">

<span>Quantity: </span>

////////check

<input type="text" class="border- fs-5 fw-bold text-start" style="outline: none;" pattern="[0-9]" value="1" id="qty ing" onkeyup='ch'>

<div class="position-absolute qty-buttons">

<div class="justify-content-center d-flex flex-column align-items-center border border-1 border-secondary qty-Inc">
    <i class="bi bi-caret-up-fill text-primary fs-5" onclick='qty_inc(<?php echo $product_data["qty"]; ?>)'> </i>

</div>


<div class="justify-content-center d-flex flex-column align-items-center border border-1 border-secondary qty-dec"> 
<i class="bi bi-caret-down-fill text-primary fs-5" onclick='qty_dec(<?php echo $product_data["qty"]; ?>)'></i>
</div>
</div>

</div>
</div>
</div>
<div class="row">
    <div class="col-12 mt-5">
        <div class="row">
            <div class="col-4 d-grid">
                <button class="btn btn-success" type="submit" id="payhere-payment" onclick="paynow('<?php echo $paid ?>');">buy now</button>
            </div>
            <div class="col-4 d-grid">
                <button class="btn btn-primary" onclick="changocarqty('<?php echo $paid; ?>');">add to cart</button>
            </div>
            <div class="col-4 d-grid">
                <button class="btn btn-secondary">
                    <i class="bi bi-heart-f111 fs-4 text-danger"></i>
                </button>
            </div>
        </div>
    </div>
</div>

<script src="scriptt . js"></script>
<script spc="bootstrap . bundle. js"></script>
<script type="text/javascript" spc="https;//www.payhere.lk/lib/payhere.js"></script>
    </body>

            

               
                