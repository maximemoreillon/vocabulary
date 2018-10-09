<?php

include "/var/www/secrets/MySQL_credentials.php";

$DB_name = "moreillon";
$DB_table_name = "vocabulary";

// Create connection
$conn = new mysqli("localhost", $MySQL_username, $MySQL_password, $DB_name);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
