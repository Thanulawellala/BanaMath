<?php

//chatgpt

session_start();
if (!isset($_SESSION['playerId'])) {
    echo json_encode(['success' => false, 'message' => 'Player ID not found in session']);
    exit();}
require_once 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    if (!isset($_SESSION['playerId'])) {
        echo json_encode(['success' => false, 'message' => 'Player not logged in']);
        exit();
    }

    $playerId = $_SESSION['playerId'];
    $finalScore = intval($_POST['score']); 

    
    $sql = "UPDATE `player` SET `score` = GREATEST(`score`, $finalScore) WHERE `PID` = $playerId";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Score updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error updating score: ' . $conn->error]);
    }

    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
