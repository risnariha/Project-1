<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


include('../Connection/connection.php');
// Get the customer ID from the query parameters
$customer_id = isset($_GET['customer_id']) ? $_GET['customer_id'] : 0;

if ($customer_id != 0) {
    // Prepare the SQL query to fetch cart items for the given customer ID
    $query = "SELECT * FROM cart_items WHERE customer_id = :customer_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':customer_id', $customer_id);
    $stmt->execute();
    
    $num = $stmt->rowCount();

    if ($num > 0) {
        $cart_items_arr = array();
        $cart_items_arr["items"] = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $item = array(
                "id" => $id,
                "product_id" => $product_id,
                "quantity" => $quantity,
                "price" => $price,
                // Add other fields as necessary
            );

            array_push($cart_items_arr["items"], $item);
        }

        http_response_code(200);
        echo json_encode($cart_items_arr);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "No cart items found for the given customer ID."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Invalid customer ID."]);
}
?>
