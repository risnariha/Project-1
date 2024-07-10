<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


include 'dbconnect.php';
$dbcon=new dbconnect();
$con=$dbcon->connection();




if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $stmt = $con->query('SELECT * FROM customer');
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);
    exit;
}



?>
