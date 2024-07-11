<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

$response = array('success' => false, 'message' => '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include('../Connection/connection.php');
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];
    $password = $data['password'];

    if (empty($email) || empty($password)) {
        $response['message'] = 'Email and Password are required';
        echo json_encode($response);
        exit;
    }

    function check_user($conn, $email, $password, $table)
    {
        $query = "SELECT * FROM $table WHERE email = :email";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $user = $stmt->fetch();
            $hash = $user['password'];
            if ($password === $hash) {
                return $user;
            }
        }
        return false;
    }

    $user = null;
    $userType = null;
    if ($user = check_user($conn, $email, $password, 'admins')) {
        $userType = 'admin';
    } elseif ($user = check_user($conn, $email, $password, 'companyowners')) {
        $userType = 'company';
    } elseif ($user = check_user($conn, $email, $password, 'customers')) {
        $userType = 'customer';
    } else {
        $response['message'] = 'Invalid email or password';
    }

    if ($userType) {
        $_SESSION['user'] = [
            'email' => $user['email'],
            'type' => $userType
        ];
        $response['success'] = true;
        $response['userType'] = $userType;
        $response['message'] = 'Login successful';
    } else {
        $response['message'] = 'Please make sure that email and password are correct.';
    }
} else {
    $response['message'] = 'Invalid request';
}

echo json_encode($response);
$conn = null;

