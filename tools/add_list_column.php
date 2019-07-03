<?php

include '../includes/MySQL_connect.php';

// sql to create table
$sql = "ALTER TABLE vocabulary
ADD list VARCHAR(30)";

if ($MySQL_connection->query($sql) === TRUE) {
    echo "Column created successfully";
} else {
    echo "Error creating table: " . $MySQL_connection->error;
}

$MySQL_connection->close();

?>
