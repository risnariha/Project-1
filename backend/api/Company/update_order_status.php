<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include '../Connection/connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->orderId) && isset($data->status)) {
        $orderId = $data->orderId;
        $status = $data->status;

        $query = "UPDATE orders SET status = :status WHERE orderID = :orderId";
        $pstmt = $conn->prepare($query);
        $pstmt->bindParam(':status', $status);
        $pstmt->bindParam(':orderId', $orderId);

        // Execute the query
        if ($pstmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Order status updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update order status']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }
} 
?>
