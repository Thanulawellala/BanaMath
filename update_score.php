<?php
session_start();
if (!isset($_SESSION['playerId'])) {
    echo json_encode(['success' => false, 'message' => 'Player ID not found in session']);
    exit();}
require_once 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the player is logged in
    if (!isset($_SESSION['playerId'])) {
        echo json_encode(['success' => false, 'message' => 'Player not logged in']);
        exit();
    }

    $playerId = $_SESSION['playerId'];
    $finalScore = intval($_POST['score']); // Get the score from the POST request

    // Update the score in the database
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
