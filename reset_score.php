<?php

require 'includes/check_session.php';
require 'includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if(isset($_POST['username'])) {

    // Connect to MySQL
    include 'includes/MySQL_connect.php';

    // Read the request content
    $username = mysqli_real_escape_string($MySQL_connection, $_POST['username']);

    // Construct the query
    $sql = "UPDATE `".$MySQL_table_name."` SET score = 0 WHERE user_id=(SELECT id FROM users WHERE username ='$username')";

    // Send the query
    if ($MySQL_connection->query($sql) === TRUE) {
      header('location: show_all.php');
    }
  }
}

 ?>
