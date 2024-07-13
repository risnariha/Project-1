<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


include '../Connection/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $stmt = $conn->prepare('SELECT * FROM customers');
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);
    exit;
}



?>
