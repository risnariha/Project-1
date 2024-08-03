<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

header('Content-Type: application/json');
include '../Connection/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $address = $_POST['address'];
    $number = $_POST['number'];
    $user_id = $_POST['user_id'];
    $imagePath = null;

    if (isset($_FILES['image'])) {
        // Check if the user already has an image and delete it
        
        $stmt = $conn->prepare('SELECT * FROM companyOweners WHERE companyOwnerID = ?');
        $stmt->bindParam(1, $user_id);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && $user['image']) {
            unlink($user['image']);
        }

        // Save new image
        $image = $_FILES['image']['name'];

        $imagePath_move = '../../../frontend/public/images/companyowners/' . $user_id . '/' . $image;
        $imagePath='../../../public/images/companyowners/' . $user_id . '/' . $image;
        // echo json_encode($imagePath);
        // exit;
        if (!file_exists(dirname($imagePath_move))) {
            mkdir(dirname($imagePath_move), 0777, true);
        }
        move_uploaded_file($_FILES['image']['tmp_name'], $imagePath_move);
    }

    // Update user information in the database
    $query = "UPDATE companyowners SET email = ?, companyAddress = ?, companyContactNumber = ?" . ($imagePath ? ", image = ?" : "") . " WHERE companyOwnerID = ?";
    $params = [$email, $address, $number];

    if ($imagePath) {
        $params[] = $imagePath;
    }
    $params[] = $user_id;
   
    $stmt = $conn->prepare($query);
    echo json_encode($stmt->execute($params));
    exit;
    if ($stmt->execute($params)) {
        $sql=" SELECT * FROM companyowners WHERE companyOwnerID = ?";
        $statement->bindParam(1, $user_id);
        $statement->execute();
        $user = $statement->fetch(PDO::FETCH_ASSOC);
        echo json_encode(['message' => $user]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update profile']);
    }
}
?>
