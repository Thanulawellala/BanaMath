<?php

// chatgpt
// github
session_start();
require_once 'connection.php'; 


$loggedInPlayerId = isset($_SESSION['playerId']) ? $_SESSION['playerId'] : null;


$sql = "SELECT PID, pname, score FROM player ORDER BY score DESC LIMIT 10";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
    <link rel="stylesheet" href="css/styles2.css">
    <script src="script1.js" defer></script>
</head>
<body>
    <div id="leaderboard-container"> 
        
        <h1>Top Score Board</h1>
        <?php
        if ($result && $result->num_rows > 0) {
            echo '<ul class="leaderboards">';

            
            echo '<li class="header"><span class="player-position">#</span><span class="player-name">Player</span><span class="player-score">Score</span></li>';

            
            $position = 1;
            while ($row = $result->fetch_assoc()) {
                
                $isLoggedInPlayer = ($row['PID'] == $loggedInPlayerId);
                
                echo '<li class="' . ($isLoggedInPlayer ? 'highlight' : '') . '">';
                echo '<span class="player-position">' . $position . '</span>'; 
                echo '<span class="player-name">' . htmlspecialchars($row['pname']) . '</span>';
                echo '<span class="player-score">' . intval($row['score']) . '</span>';
                echo '</li>';

                $position++;
            }

            echo '</ul>';
        } else {
            echo '<p>No leaderboard data available.</p>';
        }
        ?>

<div class="buttons-container">
            
            <button onclick="restartGame()">Play Again</button>

            
            <form action="logout.php" method="POST">
                <button type="submit" class="logout-button">Log Out</button>
            </form>
        </div>

    </div>

</body>
</html>

<?php

$conn->close();
?>
