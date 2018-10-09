<?php

include 'includes/db_connect.php';

// sql to create table
$sql = "CREATE TABLE $DB_table_name (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
expression VARCHAR(30) NOT NULL,
reading VARCHAR(30),
meaning VARCHAR(30) NOT NULL
)";

if ($conn->query($sql) === TRUE) {
    echo "Table created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();
?>
