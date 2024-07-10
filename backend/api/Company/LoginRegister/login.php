<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../connect.php';

$input = json_decode(file_get_contents('php://input'), true);
$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

try {
    if (empty($username) || empty($password)) {
        throw new Exception('Username and password are required');
    }

    $connection = (new DbConnector())->getConnection();

    $sql = "SELECT company_id, password FROM company WHERE username = :username";
    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $company = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$company || !password_verify($password, $company['password'])) {
        throw new Exception('Invalid username or password');
    }

    echo json_encode(['success' => true, 'company_id' => $company['company_id'],'company_name' => $company['company_name']]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
