<?php

include 'includes/MySQL_connect.php';

// sql to create table
$sql = "CREATE TABLE vocabulary (
id INT(11) AUTO_INCREMENT NOT NULL,
user_id INT(11),
expression VARCHAR(30) NOT NULL,
reading VARCHAR(30),
meaning VARCHAR(30) NOT NULL,
score INT,
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES users(id)

)";

if ($MySQL_connection->query($sql) === TRUE) {
    echo "Table created successfully";
} else {
    echo "Error creating table: " . $MySQL_connection->error;
}

$conn->close();

?>
