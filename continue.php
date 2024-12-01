<!-- new-profile.html -->
<?php
session_start();
require_once 'connection.php'; 
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Continue Profile</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="profile-container">
        <div class="continue-content">
            <h2>Log In</h2>
            
            <form action="signin_profile.php" method="POST"  onsubmit="return validateForm1()">
                <label for="playerName">Player Name</label>
                <input type="text" id="playerName" name="playerName" placeholder="Enter Player Name" required>
                
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter Password" required>
                
                <button type="submit" name="login_submit" class="button continue-profile">Continue</button>
            </form>
            
        </div>
    </div>
    <script src="script.js"></script>

</body>
</html>
