<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include '../Connection/connection.php';
//include '../config/cors.php';



try {
    // Count customer requests
    $stmt = $conn->prepare("SELECT COUNT(*) as request_count FROM registration_requests WHERE userType = 'Shop'");
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode(['success' => true, 'request_count' => $result['request_count']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No requests found']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
