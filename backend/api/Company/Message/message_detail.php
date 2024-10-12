<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include '../../Connection/connection.php'; // Adjust the path to your connection file


if (isset($_GET['contact_id'])) {
    $contactID = $_GET['contact_id'];

    try {
        $stmt = $conn->prepare("SELECT * FROM contact WHERE contactID = :contactID");
        $stmt->bindParam(':contactID', $contactID, PDO::PARAM_INT);
        $stmt->execute();
        $company = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($message) {
            echo json_encode($message);
        } else {
            echo json_encode(['error' => 'No company found with this ID.']);
        }
    } catch (Exception $e) {
        echo json_encode(['error' => 'Error fetching company: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Company ID is required.']);
}
?>
