<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if(isset($_POST['delete']) && isset($_POST['id'])) {

    // Connect to MySQL
    require 'includes/db_connect.php';

    // Read the request content
    $id = mysqli_real_escape_string($conn, $_POST['id']);

    // Construct the query
    $sql = "DELETE FROM $DB_table_name WHERE id=".$id;

    // Send the query
    if ($conn->query($sql) === TRUE) {
       // Success
    }

  }
}

?>
