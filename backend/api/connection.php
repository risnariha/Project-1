<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Content-Type: application/json; charset=UTF-8");

    $con = new PDO("mysql:host=localhost; dbname=customer","root","");
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $con->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        $sql='SELECT * FROM customerdetails';
        $stmt = $con->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $data=array();
        foreach($result as $row){
            $data[]=$row;   
        }
        echo json_encode($data);
    }