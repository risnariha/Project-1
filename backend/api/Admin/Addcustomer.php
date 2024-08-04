<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, X-Requested-With");
header('Content-Type: application/json');

include '../Connection/connection.php';

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = file_get_contents('php://input');
    $customer = json_decode($input, true);

    if ($customer) {
        $errors = [];

        $sanitizedemail = filter_var($customer['email'], FILTER_SANITIZE_EMAIL);
        $Validatedemail = filter_var($sanitizedemail, FILTER_VALIDATE_EMAIL);
        if ($Validatedemail) {
            $email = strtolower($Validatedemail);
        } else {
            $errors[] = "Invalid Email";
        }

        if (empty($customer['username'])) {
            $errors[] = "Customer name is required";
        } else {
            $fname = htmlspecialchars($customer['username']);
        }

        if (empty($customer['businessName'])) {
            $errors[] = "Shop name is required";
        } else {
            $shopname = htmlspecialchars($customer['businessName']);
        }

        if (!isset($customer['contactNumber']) || !preg_match("/^\d{10}$/", $customer['contactNumber'])) {
            $errors[] = "Invalid Contact Number";
        } else {
            $contact = $customer['contactNumber'];
        }

        if (empty($customer['address'])) {
            $errors[] = "Address is required";
        } else {
            $address = htmlspecialchars($customer['address']);
        }

        if (empty($customer['district'])) {
            $errors[] = "District is required";
        } else {
            $district = htmlspecialchars($customer['district']);
        }

        // if (empty($customer['customerShopReferenceNo'])) {
        //     $errors[] = "Reference number is required";
        // } else {
        //     $refno = htmlspecialchars($customer['customerShopReferenceNo']);
        // }

        if (!empty($errors)) {
            echo json_encode(['success' => false, 'message' => 'Validation errors', 'errors' => $errors]);
            exit;
        }
        $highest_id_query = $conn->prepare("SELECT customerID FROM `customers` ORDER BY customerID DESC LIMIT 1");
        $highest_id_query->execute();
        $highest_id_row = $highest_id_query->fetch(PDO::FETCH_ASSOC);

        if ($highest_id_row) {
            $highest_id = $highest_id_row['customerID'];
            $numeric_part = (int)substr($highest_id, 4); // Get the numeric part of the highest ID
            $new_id = 'CUST' . str_pad($numeric_part + 1, '0', STR_PAD_LEFT); // Increment and pad with zeros
        } else {
            $new_id = 'CUST1'; // If no product exists, start with P001
        }
        // Generate a Unique Customer ID
        $ID = $new_id;

        $refno = '4545';
        // Generate a random password
        $PW = bin2hex(random_bytes(4));

        try {
            $conn->beginTransaction();

            // Insert into customers table
            $sql = "INSERT INTO customers (customerID, customerName, email, password, customerContactNumber, customerShopName, customerAddress, customerDistrict, customerShopReferenceNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $pstmt = $conn->prepare($sql);
            $pstmt->bindParam(1, $ID);
            $pstmt->bindParam(2, $fname);
            $pstmt->bindParam(3, $email);
            $pstmt->bindParam(4, $PW);
            $pstmt->bindParam(5, $contact);
            $pstmt->bindParam(6, $shopname);
            $pstmt->bindParam(7, $address);
            $pstmt->bindParam(8, $district);
            $pstmt->bindParam(9, $refno);

            $r = $pstmt->execute();

            if ($r) {
                // Remove from request table
                $sqlDelete = "DELETE FROM registration_requests WHERE id = ?";
                $pstmtDelete = $conn->prepare($sqlDelete);
                $pstmtDelete->bindParam(1, $customer['id']);
                $pstmtDelete->execute();

                $conn->commit();
                echo json_encode(['success' => true, 'message' => 'Customer added successfully']);
            } else {
                $conn->rollBack();
                $errorInfo = $pstmt->errorInfo();
                echo json_encode(['success' => false, 'message' => 'Error in Register', 'error' => $errorInfo[2]]);
            }
        } catch (Exception $e) {
            if ($conn->inTransaction()) {
                $conn->rollBack();
            }
            echo json_encode(['success' => false, 'message' => 'Transaction failed', 'error' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
