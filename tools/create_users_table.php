<?php

include 'includes/MySQL_connect.php';

// sql to create table
$sql = "CREATE TABLE users (
id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(100) NOT NULL,
password VARCHAR(100) NOT NULL
)";

if ($MySQL_connection->query($sql) === TRUE) {
    echo "Table created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();

?>
