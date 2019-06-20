<?php

include "/var/www/secrets/MySQL_credentials.php";

$MySQL_DB_name = "vocabulary";

// Create connection
$MySQL_connection = new mysqli("localhost", $MySQL_username, $MySQL_password, $MySQL_DB_name);
// Check connection
if ($MySQL_connection->connect_error) {
  die("Connection failed: " . $MySQL_connection->connect_error);
}

mysqli_set_charset("utf8");



?>
