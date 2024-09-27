<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


include '../Connection/connection.php';

if($_SERVER['REQUEST_METHOD']=='POST'){
    $Id = file_get_contents('php://input');
    $id = json_decode($Id,true);

try{
    $stmt = $conn->prepare('DELETE FROM registration_requests WHERE id=?  ');
    $stmt->bindParam(1,$id);
    $stmt->execute();
    $rejectcompany = $stmt->fetchAll(PDO::FETCH_ASSOC); 

    echo json_encode(['success'=> true, 'data'=>$rejectcompany]);
    

} catch (Exception $e) {
    echo json_encode(['success'=> false, 'message'=>'Error rejecting Request company', 'error'=>$e->getMessage()]);

}

}

?>
