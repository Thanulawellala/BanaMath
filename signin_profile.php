<?php
session_start();
require_once 'connection.php'; // Ensure this file sets up $conn for the database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login_submit'])) {
    // Get the player name and password from the form
    $playerName = mysqli_real_escape_string($conn, $_POST['playerName']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    // Query to check if the player exists
    $sql = "SELECT * FROM `player` WHERE `pname` = '$playerName' AND `password` = '$password'";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        // Player exists; log them in
        $_SESSION['playerName'] = $playerName; // Store player name in session
        echo "<script>
            alert('Welcome, $playerName!');
            window.location.href='gamescreen.html';
        </script>";
        exit();
    } else {
        // Player does not exist or incorrect password
        echo "<script>
            alert('Invalid username or password. Please try again.');
            window.location.href='continue.html';
        </script>";
    }

    $conn->close();
} else {
    // If the page is accessed directly, redirect to the login page
    header("Location: continue.html");
    exit();
}
?>
