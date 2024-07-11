<?php
/* Start the session */
session_start();
header('Content-Type: application/json'); // Ensure JSON response

$response = array('success' => false, 'message' => '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include('connection.php');
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'];
    $password = $data['password'];

    // Use prepared statements to prevent SQL injection
    $query = 'SELECT * FROM admins WHERE admins.adminEmail = :email AND admins.adminPassword = :password';
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':email', $username);
    $stmt->bindParam(':password', $password);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $user = $stmt->fetch();

        $_SESSION['user'] = $user;
        $response['success'] = true;
        $response['user'] = $user;
        $response['message'] = 'Login successful';
    } else {
        $response['message'] = 'Please make sure that username and password are correct.';
    }
} else {
    $response['message'] = 'Invalid request';
}

echo json_encode($response);
?>
