<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


include '../Connection/connection.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../Phpmailer/src/Exception.php';
require '../Phpmailer/src/PHPMailer.php';
require '../Phpmailer/src/SMTP.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if($_SERVER['REQUEST_METHOD']=='POST') {
    $input = file_get_contents('php://input',true);
    $company = json_decode($input,true);
    $id = $company['id'];
    $fname = $company['username'];
    $email = $company['email'];

    if($id && $email){
        try {
            $stmt = $conn->prepare('UPDATE registration_requests set STATUS ="rejected" WHERE id = ? ');
            $stmt->bindParam(1,$id);
            $r = $stmt->execute();
            $rejectcompany = $stmt->fetchAll(PDO::FETCH_ASSOC);
            //echo json_encode(['success'=> true, 'data'=>$rejectcompany]);

            if($r){
                $mail = new PHPMailer(true);
                try{
                    //Server settings
                    $mail->isSMTP();                                            // Send using SMTP
                    $mail->Host       = 'smtp.gmail.com';                       // Set the SMTP server to send through
                    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
                    $mail->Username   = 'nknkrisna@gmail.com';                 // SMTP username
                    $mail->Password   = 'wqzt qnlr rfha oolb';                  // SMTP password
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
                    $mail->Port       = 587;                                    // TCP port to connect to

                    //Recipients
                    $mail->setFrom('nknkrisna@gmail.com', 'Admin of Elitez');
                    $mail->addAddress($email, $fname);

                    // Content
                    $mail->isHTML(true);
                    $mail->Subject = 'Your Registration request is cancelled';
                    
                    $mail->Body = "Dear $fname,<br><br>Your details are not reliable, so we are rejecting your request. Can you provide proof that you have a company?.";
                    // $mail->AltBody = "Dear $fname,\n\nYour account login password is: $duplicatePassword\n\nYou can now log in to your account using your email ($email) and password.";

                    $mail->send();
                    $message = "New user removed successfully and sent to your email.";
                    $sqlupdate = "UPDATE registration_requests set STATUS ='rejected' WHERE id = ?";
                    $pstmtupdate = $conn->prepare($sqlupdate);
                    $pstmtupdate->bindParam(1, $id);
                    $pstmtupdate->execute();

                    //$conn->commit();
                    echo json_encode(['success' => true, 'message' => $message]);
                }catch(Exception $e){
                    
                    $sqlupdatee = "UPDATE registration_requests set STATUS ='pending' WHERE id = ?";
                    $pstmtupdate = $conn->prepare($sqlupdatee);
                    $pstmtupdate->bindParam(1, $id);
                    $pstmtupdate->execute();

                    echo json_encode(['success'=>false, 'message'=>'Error sending mail']);
                }
            }
        } catch (Exception $e) {
            echo json_encode(['success'=> false, 'message'=>'Error rejecting Request company', 'error'=>$e->getMessage()]);
        }
    }
}
    

    
?>
