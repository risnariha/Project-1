<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include '../../Connection/connection.php'; // Adjust the path to your connection file

if (isset($_GET['contact_id'])) {
    $contactID = $_GET['contact_id'];

    $query = "SELECT dataFile FROM contact WHERE contactID = :contactID";
    $pstmt = $conn->prepare($query);
    $pstmt->bindParam(':contactID', $contactID);
    $pstmt->execute();

    $file = $pstmt->fetch(PDO::FETCH_ASSOC); // Corrected from $stmt to $pstmt

    if ($file) {
        $filePath = $file['dataFile'];
        // Debugging: print the file path
        error_log("File path: " . $filePath);
        
        if (file_exists($filePath)) {
            // Set headers for file download
            header('Content-Description: File Transfer');
            header('Content-Type: application/pdf'); // Change MIME type if needed
            header('Content-Disposition: attachment; filename=' . basename($filePath));
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($filePath));
            readfile($filePath);
            exit;
        } else {
            error_log("File does not exist: " . $filePath);
            echo json_encode(['error' => 'File does not exist.']);
        }
        
    } else {
        echo json_encode(['error' => 'Application not found.']);
    }
} else {
    echo json_encode(['error' => 'No application ID provided.']);
}
?>
