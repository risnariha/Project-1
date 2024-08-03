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

header('Content-Type: application/json');

require_once 'connect.php';


$response = [];

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['update_product_id'])) {
    $update_product_id = $_POST['update_product_id'];
    $update_product_name = htmlspecialchars($_POST['update_product_name']);
    $update_product_price = htmlspecialchars($_POST['update_product_price']);
    $update_product_quantity = htmlspecialchars($_POST['update_product_quantity']);

    if (isset($_FILES['update_product_image']) && $_FILES['update_product_image']['name']) {
        $update_product_image = basename($_FILES['update_product_image']['name']);
        $update_product_image_tmp_name = $_FILES['update_product_image']['tmp_name'];
        $update_product_image_folder = '/Project-1/images/' . $update_product_image;

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
        $check_name_query = "SELECT * FROM `products` WHERE product_name=:product_name AND product_id != :product_id";
        $check_name_stmt = $conn->prepare($check_name_query);
        $check_name_stmt->execute([':product_name' => $update_product_name, ':product_id' => $update_product_id]);

        $check_image_query = "SELECT * FROM `products` WHERE product_image=:product_image AND product_id != :product_id";
        $check_image_stmt = $conn->prepare($check_image_query);
        $check_image_stmt->execute([':product_image' => $update_product_image, ':product_id' => $update_product_id]);

        if ($check_name_stmt->rowCount() > 0) {
            $response = ["error" => "Product name already exists."];
        } elseif ($check_image_stmt->rowCount() > 0) {
            $response = ["error" => "Product image already exists."];
        } else {
            $update_query = "UPDATE `products` SET product_name=:product_name, product_price=:product_price, product_quantity=:product_quantity, product_image=:product_image WHERE product_id=:product_id";
            $update_stmt = $conn->prepare($update_query);
            $update_success = $update_stmt->execute([
                ':product_name' => $update_product_name,
                ':product_price' => $update_product_price,
                ':product_quantity' => $update_product_quantity,
                ':product_image' => $update_product_image,
                ':product_id' => $update_product_id
            ]);

            if ($update_success) {
                $response = ["success" => "Product updated successfully."];
            } else {
                $response = ["error" => "There is some error updating the product."];
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
