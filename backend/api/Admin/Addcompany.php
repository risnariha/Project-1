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
    $company = json_decode($input, true);

    if ($company) {
        $errors = [];

        $sanitizedemail = filter_var($company['email'], FILTER_SANITIZE_EMAIL);
        $Validatedemail = filter_var($company['email'], FILTER_VALIDATE_EMAIL);
        if ($Validatedemail) {
            $email = $Validatedemail;
        } else {
            $errors[] = "Invalid Email";
        }

        if (empty($company['username'])) {
            $errors[] = "company name is required";
        } else {
            $fname = htmlspecialchars($company['username']);
        }

        if (empty($company['businessName'])) {
            $errors[] = "Shop name is required";
        } else {
            $shopname = htmlspecialchars($company['businessName']);
        }

        if (!isset($company['contactNumber']) || !preg_match("/^\d{10}$/", $company['contactNumber'])) {
            $errors[] = "Invalid Contact Number";
        } else {
            $contact = $company['contactNumber'];
        }

        if (empty($company['address'])) {
            $errors[] = "Address is required";
        } else {
            $address = htmlspecialchars($company['address']);
        }

        if (empty($company['district'])) {
            $errors[] = "District is required";
        } else {
            $district = htmlspecialchars($company['district']);
        }

        // if (empty($company['companyShopReferenceNo'])) {
        //     $errors[] = "Reference number is required";
        // } else {
        //     $refno = htmlspecialchars($company['companyShopReferenceNo']);
        // }

        if (!empty($errors)) {
            echo json_encode(['success' => false, 'message' => 'Validation errors', 'errors' => $errors]);
            exit;
        }

        // Generate a Unique company ID
           // Generate company ID


$refno='4545';
        // Generate a random password
        $PW = bin2hex(random_bytes(4));

        try {
            $conn->beginTransaction();

            // Insert into companys table
            $sql = "INSERT INTO companyowners 
                               (companyOwnerName, 
                                email, 
                                password, 
                                companyContactNumber, 
                                companyName, 
                                companyAddress, 
                                district)
                                 VALUES (?, ?, ?, ?, ?, ?, ?)";
            $pstmt = $conn->prepare($sql);
            // $pstmt->bindParam(1, $ID);
            $pstmt->bindParam(1, $fname);
            $pstmt->bindParam(2, $email);
            $pstmt->bindParam(3, $PW);
            $pstmt->bindParam(4, $contact);
            $pstmt->bindParam(5, $shopname);
            $pstmt->bindParam(6, $address);
            $pstmt->bindParam(7, $district);
           



            $r = $pstmt->execute();

            if ($r) {
                // Remove from request table
                $sqlDelete = "DELETE FROM registration_requests WHERE id = ?";
                $pstmtDelete = $conn->prepare($sqlDelete);
                $pstmtDelete->bindParam(1, $company['id']);
                $pstmtDelete->execute();

                $conn->commit();
                echo json_encode(['success' => true, 'message' => 'company added successfully']);
            } else {
                $conn->rollBack();
                $errorInfo = $pstmt->errorInfo();
                echo json_encode(['success' => false, 'message' => 'Error in Register', 'error' => $errorInfo[2]]);
            }
        } catch (Exception $e) {
            $conn->rollBack();
            echo json_encode(['success' => false, 'message' => 'Transaction failed', 'error' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

