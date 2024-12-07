<?php
session_start();
session_unset();
session_destroy();
setcookie('playerId', '', time() - 3600, "/");
setcookie('playerName', '', time() - 3600, "/");


if(!isset($_SESSION["PID"])){

    header("Location: banahome.php");
  
  }

?>