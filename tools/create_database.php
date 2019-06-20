<?php

// Load credentials
include "/var/www/secrets/MySQL_credentials.php";

$MySQL_connection = new mysqli("localhost", $MySQL_username, $MySQL_password);

// Check connection
if ($MySQL_connection->connect_error) {
    die("Connection failed: " . $MySQL_connection->connect_error);
}

// Create database
$sql = "CREATE DATABASE vocabulary DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;";
if ($MySQL_connection->query($sql) === TRUE) {
    echo "Database created successfully";
} else {
    echo "Error creating database: " . $conn->error;
}

$MySQL_connection->close();

 ?>
