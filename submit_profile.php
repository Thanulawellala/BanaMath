<?php
session_start();
require_once 'connection.php';

    
    $playername = $_POST['playerName'];
    $password = $_POST['password'];


    
    $sql= "INSERT INTO `player`(`pname`, `password`)
        VALUES ('".$playername."','".$password."')";

    if ($conn->query($sql) === TRUE) {
        
        header("Location: gamescreen.html");
        
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    
    $conn->close();


?>