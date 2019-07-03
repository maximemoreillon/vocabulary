
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

  // Get username from session
  $username = mysqli_real_escape_string($MySQL_connection, $_SESSION['username']);

  // Construct the query
  $sql = "INSERT INTO `$MySQL_table_name` (user_id, expression, reading, meaning, score, list)
    VALUES ( (SELECT id FROM users WHERE username ='$username'), '$expression', '$reading', '$meaning', 0, '$list' )";


  // Sendthe query
  if ($MySQL_connection->query($sql) === TRUE) {
    header('location: show_all.php');
  } else {
    echo "Error: " . $sql . "<br>" . $MySQL_connection->error;
  }
}


?>
