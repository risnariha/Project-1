<?php
include('../Connection/DbConnector.php');

class User
{
    private $db;
    private $conn;

    public function __construct()
    {
        $this->db = new DbConnector();
        $this->conn = $this->db->getConnection();
    }
    public function check_user($email, $password, $table)
    {

        $query = "SELECT * FROM $table WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $user = $stmt->fetch();
            $hash = $user['password'];
            if ($password === $hash) {
                return $user;
            }
        }
        return false;
    }

    public function register($userType, $username, $email, $businessName, $address, $contactNumber, $district, $status)
    {


        try {
            $sql = "INSERT INTO registration_requests (userType, username, email, businessName, address, contactNumber, district, status) 
            VALUES (:userType, :username, :email, :businessName, :address, :contactNumber, :district, :status)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':userType', $userType);
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':businessName', $businessName);
            $stmt->bindParam(':address', $address);
            $stmt->bindParam(':contactNumber', $contactNumber);
            $stmt->bindParam(':district', $district);
            $stmt->bindParam(':status', $status);
            $result = $stmt->execute();
            return $result;
        } catch (PDOException $e) {
            echo "Register failed : " . $e->getMessage();
        }
        return false;
    }

    public function getUserDetails($email, $table)
    {
        try {
            $query = "SELECT * FROM $table WHERE email = :email";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $data = $stmt->fetch();
            if ($data) {
                $user = $data;
                $user['password'] = '';
                echo json_encode($user);
            } else {
                echo json_encode(array('error' => 'data is null: ', $data));
            }
        } catch (PDOException $e) {
            echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
        }
    }
}
