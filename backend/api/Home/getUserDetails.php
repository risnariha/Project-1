<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Specify your frontend URL here
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
    

if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include('../Connection/connection.php');
        $data = json_decode(file_get_contents('php://input'), true);
        $email = $data['email'];
        $table = $data['userType'];
        try {
        $query = "SELECT * FROM $table WHERE email = :email";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $data = $stmt->fetch();
        if($data){
            $user = $data;
            $user['password']='';
        echo json_encode($user);
        
        }else{
            echo json_encode(array('error' => 'data is null: ',$user));
        }
        } catch (PDOException $e) {
            echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
    }
}else{
    echo json_encode(array('error' => 'post data is null: '));
}

// if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
//     http_response_code(200);
//     exit();
// }

// require_once '../connect.php';

// $input = json_decode(file_get_contents('php://input'), true);
// $username = $input['username'] ?? '';
// $password = $input['password'] ?? '';

// try {
//     if (empty($username) || empty($password)) {
//         throw new Exception('Username and password are required');
//     }

//     $connection = (new DbConnector())->getConnection();

//     $sql = "SELECT company_id, password FROM company WHERE username = :username";
//     $stmt = $connection->prepare($sql);
//     $stmt->bindParam(':username', $username);
//     $stmt->execute();
//     $company = $stmt->fetch(PDO::FETCH_ASSOC);

//     if (!$company || !password_verify($password, $company['password'])) {
//         throw new Exception('Invalid username or password');
//     }

//     echo json_encode(['success' => true, 'company_id' => $company['company_id'],'company_name' => $company['company_name']]);
// } catch (Exception $e) {
//     http_response_code(400);
//     echo json_encode(['success' => false, 'message' => $e->getMessage()]);
// }
// 
