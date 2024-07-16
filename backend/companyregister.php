<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

include '../Connection/connection.php';


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user = json_decode(file_get_contents('php://input'));

    if ($user) {
        
        $sql = "INSERT INTO company (fname, lname, email, phone, place, district, pw, refno) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $pstmt = $con->prepare($sql);
        $pstmt->bindParam(1, $user->fname);
        $pstmt->bindParam(2, $user->lname);
        $pstmt->bindParam(3, $user->email);
        $pstmt->bindParam(4, $user->phone);
        $pstmt->bindParam(5, $user->place);
        $pstmt->bindParam(6, $user->district);
        $pstmt->bindParam(7, $user->pw);
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
