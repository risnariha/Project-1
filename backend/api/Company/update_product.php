<?php
// Enable CORS
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); // cache for 1 day
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

header('Content-Type: application/json');

require_once '../Connection/connection.php';

$response = [];

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['update_product_id'])) {
    $update_product_id = htmlspecialchars(trim($_POST['update_product_id']));
    $update_product_name = htmlspecialchars(trim($_POST['update_product_name']));
    $update_product_price = htmlspecialchars(trim($_POST['update_product_price']));
    $update_product_quantity = htmlspecialchars(trim($_POST['update_product_quantity']));
    $update_product_category = htmlspecialchars(trim($_POST['update_product_category']));
    $update_product_netweight = htmlspecialchars(trim($_POST['update_product_netweight']));

    if (isset($_FILES['update_product_image']) && $_FILES['update_product_image']['name']) {
        $update_product_image = basename($_FILES['update_product_image']['name']);
        $update_product_image_tmp_name = $_FILES['update_product_image']['tmp_name'];
        $imageDir = '../../../frontend/public/images/products/' . $update_product_id;
        $update_product_image_folder = $imageDir . '/' . $update_product_image;

        $allowed_extensions = ['jpg', 'jpeg', 'png'];
        $file_extension = pathinfo($update_product_image, PATHINFO_EXTENSION);

        if (!in_array($file_extension, $allowed_extensions)) {
            $response = ["error" => "Invalid image format. Only JPG, JPEG, and PNG are allowed."];
            echo json_encode($response);
            exit;
        } elseif (!move_uploaded_file($update_product_image_tmp_name, $update_product_image_folder)) {
            $response = ["error" => "Failed to upload the image."];
            echo json_encode($response);
            exit;
        }
    } else {
        $update_product_image = $_POST['current_product_image'];
    }

    try {
        $check_name_query = "SELECT * FROM `products` WHERE productName = :product_name AND productID != :product_id";
        $check_name_stmt = $conn->prepare($check_name_query);
        $check_name_stmt->execute([':product_name' => $update_product_name, ':product_id' => $update_product_id]);

        $check_image_query = "SELECT * FROM `products` WHERE productImage = :product_image AND productID != :product_id";
        $check_image_stmt = $conn->prepare($check_image_query);
        $check_image_stmt->execute([':product_image' => $update_product_image, ':product_id' => $update_product_id]);

        if ($check_name_stmt->rowCount() > 0) {
            $response = ["error" => "Product name already exists."];
        } elseif ($check_image_stmt->rowCount() > 0) {
            $response = ["error" => "Product image already exists."];
        } else {
            $update_query = "UPDATE `products` SET productName = :product_name, productPrice = :product_price, productQuantity = :product_quantity, productImage = :product_image, productCategory = :product_category, productNetweight = :product_netweight WHERE productID = :product_id";
            $update_stmt = $conn->prepare($update_query);
            $update_success = $update_stmt->execute([
                ':product_name' => $update_product_name,
                ':product_price' => $update_product_price,
                ':product_quantity' => $update_product_quantity,
                ':product_image' => $update_product_image,
                ':product_category' => $update_product_category,
                ':product_netweight' => $update_product_netweight,
                ':product_id' => $update_product_id
            ]);

            if ($update_success) {
                $response = ["success" => "Product updated successfully."];
            } else {
                $response = ["error" => "There was an error updating the product."];
            }
        }
    } catch (PDOException $e) {
        $response = ["error" => $e->getMessage()];
    }
} else {
    $response = ["error" => "Invalid request method or missing product ID."];
}

echo json_encode($response);
?>
