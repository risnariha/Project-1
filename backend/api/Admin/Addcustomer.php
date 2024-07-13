<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

include '../Connection/connection.php';


// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user = json_decode(file_get_contents('php://input'));

    if ($user) {
        $sql = "INSERT INTO customers (ID, Name, Email, Password, ContactNo, ShopName, Address, ShopReferenceNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $pstmt = $con->prepare($sql);
        $pstmt->bindParam(1, $user->id);
        $pstmt->bindParam(2, $user->name);
        $pstmt->bindParam(3, $user->email);
        $pstmt->bindParam(4, $user->pw);
        $pstmt->bindParam(5, $user->contact);
        $pstmt->bindParam(6, $user->shopname);
        $pstmt->bindParam(7, $user->place);
        $pstmt->bindParam(8, $user->refno);

        $r = $pstmt->execute();

        if ($r) {
            echo json_encode("Success");
        } else {
            
            echo json_encode("Error in Register");
        }
    } else {
        echo json_encode("Invalid input");
    }
} else {
    echo json_encode("Invalid request method");
}
?>
