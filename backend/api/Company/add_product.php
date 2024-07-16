
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

require_once 'connect.php';
header('Content-Type: application/json');

// Function to create directory if not exists
function ensureDirectoryExists($directory) {
    if (!file_exists($directory)) {
        mkdir($directory, 0777, true); // Creates directory recursively
    }
}

$dbcon = new DbConnector();
$conn = $dbcon->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $company_name = trim($_POST['company_name']); // Get company name from POST
    $product_name = trim($_POST['product_name']);
    $product_price = trim($_POST['product_price']);
    $product_image = $_FILES['product_image']['name'];
    $quantity = trim($_POST['quantity']);
    $product_category = trim($_POST['product_category']);
    $net_weight = trim($_POST['net_weight']);

    // Sanitize inputs
    $product_name = htmlspecialchars($product_name);
    $product_price = htmlspecialchars($product_price);
    $quantity = htmlspecialchars($quantity);
    $product_category = htmlspecialchars($product_category);
    $net_weight = htmlspecialchars($net_weight);

    // Validate inputs
    if (!is_numeric($product_price) || empty($product_name) || empty($product_image) || empty($quantity) || empty($product_category) || empty($net_weight)) {
        echo json_encode(['message' => 'Invalid input!']);
        exit();
    } else {
        try {
            // Use the company name as the table name
            $table_name = $company_name; // Assuming table name matches company name

            // Check for existing product
            // $check_existing_query = $conn->prepare("SELECT * FROM `$table_name` WHERE (product_name = ? AND product_netweight = ?) OR product_image = ?");
            $check_existing_query = $conn->prepare("SELECT * FROM `products` WHERE (product_name = ? AND product_netweight = ?) OR product_image = ?");
            $check_existing_query->execute([$product_name, $net_weight, $product_image]);

            if ($check_existing_query->rowCount() > 0) {
                echo json_encode(['message' => 'This product already exists!']);
                exit();
            } else {
                // Directory to store images
                $upload_directory = $_SERVER['DOCUMENT_ROOT'] . '/Project-1/images/';
                ensureDirectoryExists($upload_directory);

                $product_image_temp_name = $_FILES['product_image']['tmp_name'];
                $product_image_folder = $upload_directory . $product_image;

                // Get the highest product ID
                // $highest_id_query = $conn->prepare("SELECT product_id FROM `$table_name` ORDER BY product_id DESC LIMIT 1");
                $highest_id_query = $conn->prepare("SELECT product_id FROM `products` ORDER BY product_id DESC LIMIT 1");
                $highest_id_query->execute();
                $highest_id_row = $highest_id_query->fetch(PDO::FETCH_ASSOC);
                
                if ($highest_id_row) {
                    $highest_id = $highest_id_row['product_id'];
                    $numeric_part = (int)substr($highest_id, 1); // Get the numeric part of the highest ID
                    $new_id = 'P' . str_pad($numeric_part + 1, 3, '0', STR_PAD_LEFT); // Increment and pad with zeros
                } else {
                    $new_id = 'P001'; // If no product exists, start with P001
                }

                // Insert product
                // $insert_query = $conn->prepare("INSERT INTO `$table_name` (product_id, product_name, product_price, product_image, product_quantity, product_category, product_netweight) VALUES (?, ?, ?, ?, ?, ?, ?)");
                $insert_query = $conn->prepare("INSERT INTO `products` (product_id, product_name, product_price, product_image, product_quantity, product_category, product_netweight) VALUES (?, ?, ?, ?, ?, ?, ?)");
                $insert_success = $insert_query->execute([$new_id, $product_name, $product_price, $product_image, $quantity, $product_category, $net_weight]);

                if ($insert_success) {
                    // Move uploaded file
                    move_uploaded_file($product_image_temp_name, $product_image_folder);
                    echo json_encode(['message' => 'Product inserted successfully.']);
                } else {
                    echo json_encode(['message' => 'There was an error inserting the product']);
                }
                exit();
            }
        } catch (PDOException $e) {
            echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
            exit();
        }
    }
}
?>

