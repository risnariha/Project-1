<?php

class dbconnect  {
    private $host="localhost";
    private $user="root";
   private $dbname="ims";
   private $dbpw="";
   

   public function connection(){
    try {
        //create connection
    $con = new PDO("mysql:host=".$this->host.";dbname=".$this->dbname,$this->user,$this->dbpw);
    return $con;
    } catch (\Exception $e) {
        die("connection failed".$e->getMessage());
    }
   }
}


?>