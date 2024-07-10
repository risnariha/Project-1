<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

include 'dbconnect.php';
$dbcon=new dbconnect();
$con=$dbcon->connection();

if($_SERVER['REQUEST_METHOD']=='POST'){
    try {
        $sql = "SELECT COUNT (*) FROM order";
        $pstmt = $con->prepare($sql);
        $row = $pstmt->execute();
        if($row>0){
           
           
        } else {
            echo 0;
        }
    } catch (\Throwable $th) {
        //throw $th;
    }
    
   
    


}

?>