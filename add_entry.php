<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if(isset($_POST['add_entry']) && isset($_POST['expression']) && isset($_POST['meaning']) ) {

    require 'includes/db_connect.php';

    // Read the content request
    $expression = mysqli_real_escape_string($conn, $_REQUEST['expression']);
    $reading = mysqli_real_escape_string($conn, $_REQUEST['reading']);
    $meaning = mysqli_real_escape_string($conn, $_REQUEST['meaning']);

    // Construct the query
    $sql = "INSERT INTO $DB_table_name (expression, reading, meaning)
    VALUES ('".$expression."', '".$reading."', '".$meaning."')";

    // Sendthe query
    if ($conn->query($sql) === TRUE) {
      // Success
    }

  }
}

?>
