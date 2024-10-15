<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

 // Adjust the path to your connection file
include '../../Connection/connection.php'; // Adjust the path to your connection file



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['companyOwnerID'])) {
        echo json_encode(['error' => 'companyOwnerID is missing']);
        exit;
    }

    $companyOwnerID = $data['companyOwnerID'];
    $type = "customer";

    try {
        // Check if $conn is available
        if (!$conn) {
            throw new Exception('Database connection failed');
        }

        $pstmt = $conn->prepare("SELECT * FROM contact WHERE companyOwnerID = ? AND sender = ? ORDER BY date DESC");
        $pstmt->bindParam(1, $companyOwnerID, PDO::PARAM_INT);
        $pstmt->bindParam(2, $type, PDO::PARAM_STR);
        $pstmt->execute();

        $messages = $pstmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($messages);

    } catch (PDOException $e) {
        error_log($e->getMessage());
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    } catch (Exception $e) {
        error_log($e->getMessage());
        echo json_encode(['error' => $e->getMessage()]);
    }
}
