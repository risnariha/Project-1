<?php
// Database connection
require_once '../Connection/DbConnector.php';

// Start session
require '../config/cors.php';



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the customer ID and items from the request
    $data = json_decode(file_get_contents('php://input'), true);
    $customerId = $data['customer_id'] ?? null;
    $items = $data['items'] ?? null;

    if (!$customerId || !$items) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input']);
        exit;
    }

    try {
        $db = new DbConnector();
        $pdo = $db->getConnection();

        // Prepare the invoice insert statement
        // $invoiceStmt = $pdo->prepare("INSERT INTO invoices (customer_id, total_amount, created_at) VALUES (?, ?, NOW())");
        $invoiceStmt = $pdo->prepare("INSERT INTO orders (customerID, total) VALUES (?, ?)");
        
        // Calculate total amount
        $totalAmount = 0;
        foreach ($items as $item) {
            $totalAmount += $item['price'] * $item['quantity'];
        }
        $totalAmount = number_format($totalAmount, 2, '.', '');
        // Execute invoice insert
        $invoiceStmt->execute([$customerId, $totalAmount]);

        // Get the last inserted invoice ID
        $invoiceId = $pdo->lastInsertId();

        // Prepare the invoice items insert statement
        // $invoiceItemStmt = $pdo->prepare("INSERT INTO invoice_items (invoice_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
        $invoiceItemStmt = $pdo->prepare("INSERT INTO orderitems (orderID, productID, quantity, price) VALUES (?, ?, ?, ?)");
        $invoiceOrderItemStmt = $pdo->prepare("UPDATE cart_items SET status=? WHERE product_id = ? AND customer_id = ?");
        // Insert each item into the invoice_items table
        $status = "ordered";
        foreach ($items as $item) {
            $invoiceItemStmt->execute([$invoiceId, $item['product_id'], $item['quantity'], $item['price']]);
            
        }
        foreach ($items as $item) {
        $invoiceOrderItemStmt->execute( [$status, $item['product_id'], $customerId] );
        }
        // Prepare response data
        $response = [
            'orderID' => $invoiceId,
            'customer_id' => $customerId,
            'total_amount' => $totalAmount,
            'items' => $items
        ];

        echo json_encode($response);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
