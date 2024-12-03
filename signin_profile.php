<?php
session_start();
require_once 'connection.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login_submit'])) {
    
    $playerName = mysqli_real_escape_string($conn, $_POST['playerName']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    
    $sql = "SELECT * FROM `player` WHERE `pname` = '$playerName' AND `password` = '$password'";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $playerId = $row['PID']; 
        $_SESSION['playerId'] = $playerId;
        $_SESSION['playerName'] = $playerName; 

        header("Location: gamescreen.php");
        exit();
    } else {
        
        echo "<script>
            alert('Invalid username or password. Please try again.');
            window.location.href='continue.php';
        </script>";
    }

    $conn->close();
} else {
    
    header("Location: continue.php");
    exit();
}
?>
