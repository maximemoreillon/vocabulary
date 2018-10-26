<?php

require 'includes/check_session.php';
require 'includes/config.php';


// WARNING: SOMEONE COULD DELETE SOMEONE ELSE'S ENTRIES USING THIS

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if(isset($_REQUEST['id'])) {

    // Connect to MySQL
    include 'includes/MySQL_connect.php';

    // Read the request content
    $id = mysqli_real_escape_string($MySQL_connection, $_POST['id']);

    // Construct the query
    $sql = "DELETE FROM `".$MySQL_table_name."` WHERE id=".$id;

    // Send the query
    if ($MySQL_connection->query($sql) === TRUE) {
      header('location: show_all.php');
    }
  }
}

?>
