<?php
session_start();
session_unset();
session_destroy();


if(!isset($_SESSION["PID"])){

    header("Location: bana.html");
  
  }

?>