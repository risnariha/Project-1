<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin ,Content-Type, Authorization, X-Requested-With");
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
        $Validatedemail = filter_var($customer['email'], FILTER_VALIDATE_EMAIL);
        if($Validatedemail){
            $email = $Validatedemail;
        } else {
            $errors[] = "Invalid Email";
        }

        if (empty($customer['fname'])) {
            $errors[] = "Customer name is required";
        }else{
            $fname = htmlspecialchars($customer['fname']);
        }

        if (empty($customer['shopname'])) {
            $errors[] = "Shop name is required";
        } else{
            $shopname = htmlspecialchars($customer['shopname']);
        }

        if (!isset($customer['contact']) || !preg_match("/^\d{10}$/", $customer['contact'])) {
            $errors[] = "Invalid Contact Number";
        }else{
           $contact = $customer['contact'];
        }

        if (empty($customer['place'])) {
            $errors[] = "Address is required";
        }else{
            $address = htmlspecialchars($customer['place']);
       
         }

        if (empty($customer['district'])) {
            $errors[] = "District is required";
        }else{
            $district = htmlspecialchars($customer['district']);
         }

        if (empty($customer['refno'])) {
            $errors[] = "Reference number is required";
        }else{
            $refno = htmlspecialchars($customer['refno']);
         }

         if (!empty($errors)) {
            echo json_encode(['success' => false, 'message' => 'Validation errors', 'errors' => $errors]);
            exit;
        }
       
        // Generate a Unique Customer ID
        $ID = uniqid("CUST", true);

        
        // Generate a random password
        $PW = bin2hex(random_bytes(4));

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
            echo json_encode(['success' => true, 'message' => 'Customer added successfully']);
        } else {
            $errorInfo = $pstmt->errorInfo();
            echo json_encode(['success' => false, 'message' => 'Error in Register', 'error' => $errorInfo[2]]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>