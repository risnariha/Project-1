<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../Connection/connection.php';

$counts = array();

try {
    // Fetch product count
    $stmt = $conn->prepare("SELECT COUNT(*) AS count FROM products");
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $counts['products'] = $row['count'];

    // Fetch customer count
    $stmt = $conn->prepare("SELECT COUNT(*) AS count FROM customers");
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $counts['customers'] = $row['count'];

    // Fetch order count
    $stmt = $conn->prepare("SELECT COUNT(*) AS count FROM orders");
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $counts['orders'] = $row['count'];

    // Fetch delivery count
    $stmt = $conn->prepare("SELECT COUNT(*) AS count FROM deliveredorders");
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $counts['delivery'] = $row['count'];

    echo json_encode($counts);
} catch (PDOException $e) {
    echo json_encode(array("error" => "Query failed: " . $e->getMessage()));
}

$conn = null;
?>
