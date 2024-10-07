<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include '../Connection/connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Fetch the raw POST data
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['companyOwnerID'])) {
        echo json_encode(['error' => $data]);
        exit;
    }
    
    $companyOwnerID = $data['companyOwnerID'];
    
    try {
        // Prepare the SQL query to get customer details based on companyOwnerID
        $pstmt = $conn->prepare("SELECT o.orderID, oi.quantity, o.orderDate, o.status, o.deliveryDate, c.*
            FROM orders o
            JOIN orderitems oi ON o.orderID = oi.orderID
            JOIN products p ON oi.productID = p.productID
            JOIN customers c ON o.customerID = c.customerID
            WHERE p.companyOwnerID = ?
            ;
        ");
        
        $pstmt->bindParam(1, $companyOwnerID);
        $pstmt->execute();
        $orders = $pstmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($orders);
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
    }
?>
