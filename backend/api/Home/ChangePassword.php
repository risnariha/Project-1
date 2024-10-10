<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

$response = array('success' => false, 'message' => '');

// print_r($_SESSION);  
// exit(); 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include('../Connection/connection.php');
    include('User.php'); 
    
    $data = json_decode(file_get_contents('php://input'), true);
    $currentPassword = $data['currentPassword'];
    $newPassword = $data['newPassword'];

       // Make sure user is logged in
       if (!isset($_SESSION['user'])) {
        $response['message'] = 'User not logged in';
        echo json_encode($response);
        exit;
    }


    $email = $_SESSION['user']['email'];
    $userType = $_SESSION['user']['type']; // 'admin', 'company', or 'customer'

    // Validate the input
    if (empty($currentPassword) || empty($newPassword)) {
        $response['message'] = 'Current password and new password are required';
        echo json_encode($response);
        exit;
    }

    
    $User = new User(); 

    // Check the current password in the appropriate table
    $user = null;
    
    
    if ($user = $User->check_user( $email, $password, 'admins')) {
        $userType = 'admin';
    } elseif ($user = $User->check_user($email, $password, 'companyowners')) {
        $userType = 'company';
    } elseif ($user = $User->check_user( $email, $password, 'customers')) {
        $userType = 'customer';
    } 
    else {
        $response['message'] = 'Invalid email or password';
        echo json_encode($response);
        exit;
    }

    if (!$user) {
        $response['message'] = 'Current password is incorrect';
        echo json_encode($response);
        exit;
    }
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    // Update the password and set is_first_login to false in the respective table
    switch ($userType) {
        case 'admin':
            $sql = "UPDATE admins SET password = ?, is_first_login = FALSE WHERE email = ?";
            break;
        case 'company':
            $sql = "UPDATE companyowners SET password = ?, is_first_login = FALSE WHERE email = ?";
            break;
        case 'customer':
            $sql = "UPDATE customers SET password = ?, is_first_login = FALSE WHERE email = ?";
            break;
    }

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $hashedPassword);
    $stmt->bindParam(2, $email);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'Password updated successfully';
        $response['userType'] = $userType; // To redirect user back to their dashboard
    } else {
        $response['message'] = 'Failed to update password. Please try again.';
    }
} else {
    $response['message'] = 'Invalid request method';
}

echo json_encode($response);
$conn = null;
?>
