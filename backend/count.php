<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

include '../Connection/connection.php';

if($_SERVER['REQUEST_METHOD']=='POST'){
    try {
        $sql = "SELECT COUNT(*) as count FROM order";
        $pstmt = $con->prepare($sql);
        $pstmt->execute();
        $orders = $pstmt->fetch(PDO::FETCH_ASSOC)['count'];
        
    } catch (\Throwable $th) {
        //throw $th;
    }
    
   
    


}

?>