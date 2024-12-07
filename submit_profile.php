<?php
session_start();
require_once 'connection.php';

$playername = $_POST['playerName'];
$password = $_POST['password'];

$password = password_hash($password, PASSWORD_BCRYPT);


$sql = "INSERT INTO `player` (`pname`, `password`) VALUES ('" . $playername . "', '" . $password . "')";

if ($conn->query($sql) === TRUE) {
    
    $playerId = $conn->insert_id;

    
    $_SESSION['playerId'] = $playerId;
    $_SESSION['playerName'] = $playername;

    setcookie('playerId', $playerId, time() + (86400 * 30), "/"); 
    setcookie('playerName', $playerName, time() + (86400 * 30), "/"); 

    
    header("Location: gamescreen.php");
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
