<?php

$apiUrl = 'http://marcconrad.com/uob/banana/api.php?out=json';


$response = file_get_contents($apiUrl);


header('Content-Type: application/json');


echo $response;  //Stack Overflow
?>
