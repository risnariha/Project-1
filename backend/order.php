<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

include '../Connection/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        $sql = "SELECT * FROM order LIMIT 10";
        $pstmt = $con->prepare($sql);
        $row = $pstmt->execute();
        if ($row > 0) {
            while ($order = $pstmt->fetchAll(PDO::FETCH_ASSOC)) {
                echo json_encode($order);
            }
        } else {
            echo 0;
        }



    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }

    exit;
}

?>