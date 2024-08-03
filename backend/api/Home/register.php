<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../Connection/connection.php';


$input = json_decode(file_get_contents('php://input'), true);

$companyName = $input['companyName'];
$shopName = $input['shopName'];
$username = $input['userName'];
$email = $input['email'];
$address = $input['address'];
$contactNumber = $input['contactNumber'];
$district = $input['district'];
$userType = $input['selectedUserType'];

if (!preg_match('/^\d{10}$/', $contactNumber)) {
    echo json_encode(['success' => false, 'message' => 'Invalid contact number format']);
    exit();
}

// $connection = (new DbConnector())->getConnection();

try {
    // $connection->beginTransaction();
    $businessName = !empty($companyName) ? $companyName : $shopName;

    
    $status = 'pending';

    $sql = "INSERT INTO registration_requests (userType, username, email, businessName, address, contactNumber, district, status) 
            VALUES (:userType, :username, :email, :businessName, :address, :contactNumber, :district, :status)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':userType', $userType);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':businessName', $businessName);
    $stmt->bindParam(':address', $address);
    $stmt->bindParam(':contactNumber', $contactNumber);
    $stmt->bindParam(':district', $district);
    $stmt->bindParam(':status', $status);

    // Generate company ID
    // $lastCompanyIdSql = "SELECT MAX(company_id) AS maxCompanyId FROM company";
    // $lastCompanyIdStmt = $connection->prepare($lastCompanyIdSql);
    // $lastCompanyIdStmt->execute();
    // $lastCompanyIdResult = $lastCompanyIdStmt->fetch(PDO::FETCH_ASSOC);
    // $lastCompanyId = $lastCompanyIdResult['maxCompanyId'];

    // $companyId = 'D001';
    // if ($lastCompanyId) {
    //     $lastIdNumber = (int) substr($lastCompanyId, 1);
    //     $companyId = 'D' . sprintf('%03d', $lastIdNumber + 1);
    // }

    $result = $stmt->execute();
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Registration successful']);
    } else {
        $errorInfo = $stmt->errorInfo();
        echo json_encode(['success' => false, 'message' => 'Error in registration', 'error' => $errorInfo[2]]);
    }
    // $companyId = $connection->lastInsertId();

    // Create company-specific table
    // $sanitizedCompanyName = preg_replace('/[^a-zA-Z0-9_]/', '', $companyName);
    // $tableSql = "CREATE TABLE `{$sanitizedCompanyName}` (
    //     product_id VARCHAR(10) PRIMARY KEY,
    //     product_name VARCHAR(255) NOT NULL,
    //     product_price DECIMAL(10, 2) NOT NULL,
    //     product_quantity INT NOT NULL,
    //     product_netweight DECIMAL(10, 2) NOT NULL,
    //     product_category VARCHAR(255) NOT NULL,
    //     product_image VARCHAR(255) NOT NULL
    // )";
    // $connection->exec($tableSql);

    // $connection->commit();

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
