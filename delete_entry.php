<?php

require 'includes/check_session.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if(isset($_POST['id'])) {

    // Connect to MySQL
    include 'includes/MySQL_connect.php';

    // Read the request content
    $id = mysqli_real_escape_string($MySQL_connection, $_POST['id']);

    // Construct the query
    $sql = "DELETE FROM vocabulary WHERE id=".$id;

    // Send the query
    if ($MySQL_connection->query($sql) === TRUE) {
      header('location: show_all.php');
    }
  }
}

?>
