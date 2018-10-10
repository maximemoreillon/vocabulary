<?php


include 'includes/MySQL_connect.php';

// sql to create table
$sql = "DROP TABLE users";

if ($MySQL_connection->query($sql) === TRUE) {
    echo "Table deleted successfully";
} else {
    echo "Error deleting table: " . $MySQL_connection->error;
}

$MySQL_connection->close();

require 'create_users_table.php';

 ?>
