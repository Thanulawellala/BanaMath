<?php
// Set the API URL
$apiUrl = 'http://marcconrad.com/uob/banana/api.php?out=json';

// Fetch the data from the API
$response = file_get_contents($apiUrl);

// Set the correct content-type header for JSON
header('Content-Type: application/json');

// Output the response from the API
echo $response;
?>
