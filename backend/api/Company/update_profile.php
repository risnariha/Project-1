<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once '../Connection/connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $address = isset($_POST['address']) ? $_POST['address'] : '';
    $number = isset($_POST['number']) ? $_POST['number'] : '';
    $businessInfo = isset($_POST['businessInfo']) ? $_POST['businessInfo'] : '';
    $user_id = isset($_POST['user_id']) ? $_POST['user_id'] : '';

    // Handle file upload
    $image = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $image = $_FILES['image']['name'];
        $uploadDir = '../../../frontend/public/images/profiles/';
        $uploadFile = $uploadDir . basename($image);

        if (!move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
            echo json_encode(['message' => 'Failed to upload image.']);
            exit();
        }
    }

    try {
        $update_query = "UPDATE `companyowners` SET email = :email, companyAddress = :address, companyContactNumber = :number, businessInfo = :businessInfo";
        if ($image) {
            $update_query .= ", image = :image";
        }
        $update_query .= " WHERE companyOwnerID = :user_id";

        $stmt = $conn->prepare($update_query);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':number', $number);
        $stmt->bindParam(':businessInfo', $businessInfo);
        $stmt->bindParam(':user_id', $user_id);
        if ($image) {
            $stmt->bindParam(':image', $image);
        }

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Profile updated successfully']);
        } else {
            echo json_encode(['message' => 'Error updating profile']);
        }
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['message' => 'Invalid request method']);
}
?>
