<?php
include('../config/cors.php');
require '../Connection/DbConnector.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $db = new DbConnector();
    $conn = $db->getConnection();

    $order_id = $_GET['order_id'];

    try {
        // $sql = "SELECT * FROM orderitems WHERE orderID = ?";
        $sql = "SELECT 
                    oi.orderItemID,
                    oi.orderID,
                    oi.productID,
                    oi.quantity,
                    oi.price,
                    p.productName
                FROM 
                    orderitems oi
                JOIN 
                    products p ON oi.productID = p.productID
                WHERE 
                    oi.orderID = ?
            ";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(1, $order_id);
        $data = $stmt->execute();
        if ($data) {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response =[
                'orderID' => $order_id,
                'items' => $data
            ];
            echo json_encode($response);
        } else {
            echo json_encode(["message" => "error in get order items"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'get orders query error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
