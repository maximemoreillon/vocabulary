<?php


include 'includes/MySQL_connect.php';

// sql to create table
$sql = "DROP TABLE vocabulary";

if ($MySQL_connection->query($sql) === TRUE) {
    echo "Table deleted successfully";
} else {
    echo "Error deleting table: " . $conn->error;
}

$MySQL_connection->close();

require 'create_vocabulary_table.php';

 ?>
