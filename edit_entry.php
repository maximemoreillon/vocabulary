
<?php

require 'includes/check_session.php';
require 'includes/config.php';

if(isset($_REQUEST['expression']) && isset($_REQUEST['meaning']) ) {

  include 'includes/MySQL_connect.php';

  // Read the content request
  $expression = mysqli_real_escape_string($MySQL_connection, $_REQUEST['expression']);
  $reading = mysqli_real_escape_string($MySQL_connection, $_REQUEST['reading']);
  $meaning = mysqli_real_escape_string($MySQL_connection, $_REQUEST['meaning']);
  $list = mysqli_real_escape_string($MySQL_connection, $_REQUEST['list']);
  $id = mysqli_real_escape_string($MySQL_connection, $_REQUEST['id']);


  // Construct the query
  $sql = "UPDATE `$MySQL_table_name`
  SET expression='$expression', reading='$reading', meaning='$meaning', list='$list'
  WHERE id=$id";

  // Send the query
  if ($MySQL_connection->query($sql) === TRUE) {
    header('location: show_one.php?id='.$id);
  }
  else {
    echo "Error: " . $sql . "<br>" . $MySQL_connection->error;
  }
}


?>
