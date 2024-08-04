<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include('../Connection/connection.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['customer_id']) && isset($data['product_id']) && isset($data['price'])) {
        $customer_id = $data['customer_id'];
        $product_id = $data['product_id'];
        $price = $data['price'];

        $query = "INSERT INTO cart_items (customer_id, product_id, quantity, price) VALUES (:customer_id, :product_id, 1, :price)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':customer_id', $customer_id);
        $stmt->bindParam(':product_id', $product_id);
        $stmt->bindParam(':price', $price);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Product added to cart successfully."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Failed to add product to cart."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Missing required parameters."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
}
