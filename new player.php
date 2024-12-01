<?php
session_start();
require_once 'connection.php'; 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Player Profile</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="profile-container">
        <div class="profile-content">
            <h2>New Player Profile</h2>
            
            <form action="submit_profile.php" method="POST" onsubmit="return validateForm()">
                <label for="playerName">Player Name</label>
                <input type="text" id="playerName" name="playerName" placeholder="Enter Player Name" required>
                
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter Password" required>
                
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Enter Confirm Password" required>
                
                <button type="submit" class="button create-profile">Create Profile</button>
            </form>
            
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
