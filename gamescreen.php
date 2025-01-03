<?php
session_start();
require_once 'connection.php'; 
if (!isset($_COOKIE['playerId']) || !isset($_COOKIE['playerName'])) {
    header("Location: continue.php"); 
    exit();
}

$playerId = $_COOKIE['playerId'];
$playerName = $_COOKIE['playerName'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Banana Math Game</title>
    <link rel="stylesheet" href="css/style1.css">
    <script src="gamescript.js" defer></script>
</head>
<body>
    
    <div class="game-container">
        
        <div class="header">
            <div class="health-bar">
                <div class="heart"></div>
                <div class="heart"></div>
                <div class="heart"></div>
            </div>
            <div class="score">Score: 0</div>
            <div class="timer">Time Remaining: 20</div>
            <div class="question-number">Q1</div>
            <div class="logout"><a href="logout.php">Log out</div></a>
            

        </div>
    
        
        <div class="puzzle-container">
            <div class="puzzle-box">
                <img id="puzzle-image" src="puzzle-image.png" alt="Puzzle Image" />
            </div>
        </div>
        
    
        
        <div class="answer-container">
            <label for="answer">What's the number?</label>
            <input type="number" id="answer" placeholder="Type your answer here">
            <button class="button">Submit Answer</button>
        </div>
    </div>
    
    <div id="gameOverModal" class="modal">
    <div class="modal-content">
        <span class="close-button" onclick="closeModal()">&times;</span>
        <p id="gameOverMessage">Game Over!</p>
        <p id="finalScoreMessage"></p>
    </div>
</div>

</div>


<div id="toast" class="toast">
    <p id="toastMessage"></p>
</div>


    
</body>
</html>
