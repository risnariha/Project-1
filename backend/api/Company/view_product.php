<?php
// Enable CORS
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

// Ensure headers are set before any output
header('Content-Type: application/json');

require_once '../Connection/connection.php';
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if the 'product_id' parameter is set in the URL
    if (isset($_GET['product_id'])) {
        $productID = $_GET['product_id'];

        try {
            // Prepare the SQL query to fetch the product by its ID
            $query = $conn->prepare("SELECT * FROM `products` WHERE productID = ?");
            $query->execute([$productID]);
            $product = $query->fetch(PDO::FETCH_ASSOC);

            // If a product is found, return it as JSON
            if ($product) {
                echo json_encode($product);
            } else {
                // If no product is found, return an empty array
                echo json_encode([]);
            }
        } catch (PDOException $e) {
            // Return an error message if an exception occurs
            echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
        }
    } else {
        // Return an error message if 'product_id' is not provided
        echo json_encode(['message' => 'Product ID not provided']);
    }
}
    

// Get the posted data
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['companyOwnerID'])) {
    echo json_encode(['error' => $data]);
    exit;
}

$companyOwnerID = $data['companyOwnerID'];

try {
    $stmt = $conn->prepare("SELECT * FROM `products` WHERE companyOwnerID = ?");
    $stmt->execute([$companyOwnerID]);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($products);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
}
?>
