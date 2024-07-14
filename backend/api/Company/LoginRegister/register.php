<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../Connection/connection.php';

$input = json_decode(file_get_contents('php://input'), true);

$companyName = $input['companyName'];
$username = $input['username'];
$email = $input['email'];
$address = $input['address'];
$contactNumber = $input['contactNumber'];
$password = $input['password'];

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit();
}

if (!preg_match('/^\d{10}$/', $contactNumber)) {
    echo json_encode(['success' => false, 'message' => 'Invalid contact number format']);
    exit();
}

$connection = (new DbConnector())->getConnection();

try {
    $checkSql = "SELECT * FROM company WHERE company_name = :companyName";
    $checkStmt = $connection->prepare($checkSql);
    $checkStmt->bindParam(':companyName', $companyName);
    $checkStmt->execute();
    $existingCompany = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if ($existingCompany) {
        echo json_encode(['success' => false, 'message' => 'Company already registered']);
        exit();
    }

    $connection->beginTransaction();

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $companySql = "INSERT INTO company (company_id, company_name, username, email, address, contact_number, password) VALUES (:companyId, :companyName, :username, :email, :address, :contactNumber, :password)";
    $stmt = $connection->prepare($companySql);

    // Generate company ID
    $lastCompanyIdSql = "SELECT MAX(company_id) AS maxCompanyId FROM company";
    $lastCompanyIdStmt = $connection->prepare($lastCompanyIdSql);
    $lastCompanyIdStmt->execute();
    $lastCompanyIdResult = $lastCompanyIdStmt->fetch(PDO::FETCH_ASSOC);
    $lastCompanyId = $lastCompanyIdResult['maxCompanyId'];

    $companyId = 'D001';
    if ($lastCompanyId) {
        $lastIdNumber = (int) substr($lastCompanyId, 1);
        $companyId = 'D' . sprintf('%03d', $lastIdNumber + 1);
    }

    $stmt->bindParam(':companyId', $companyId);
    $stmt->bindParam(':companyName', $companyName);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':address', $address);
    $stmt->bindParam(':contactNumber', $contactNumber);
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->execute();
    $companyId = $connection->lastInsertId();

    // Create company-specific table
    $sanitizedCompanyName = preg_replace('/[^a-zA-Z0-9_]/', '', $companyName);
    $tableSql = "CREATE TABLE `{$sanitizedCompanyName}` (
        product_id VARCHAR(10) PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        product_price DECIMAL(10, 2) NOT NULL,
        product_quantity INT NOT NULL,
        product_netweight DECIMAL(10, 2) NOT NULL,
        product_category VARCHAR(255) NOT NULL,
        product_image VARCHAR(255) NOT NULL
    )";
    $connection->exec($tableSql);

    $connection->commit();
    echo json_encode(['success' => true, 'company_name' => $companyName]);
} catch (Exception $e) {
    $connection->rollBack();
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
