<?php
session_start();
require_once 'connection.php';

$playername = $_POST['playerName'];
$password = $_POST['password'];

$sql = "INSERT INTO `player` (`pname`, `password`) VALUES ('" . $playername . "', '" . $password . "')";

if ($conn->query($sql) === TRUE) {
    // Get the last inserted player ID
    $playerId = $conn->insert_id;

    // Store player ID and name in session
    $_SESSION['playerId'] = $playerId;
    $_SESSION['playerName'] = $playername;

    // Redirect to the game screen
    header("Location: gamescreen.php");
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
