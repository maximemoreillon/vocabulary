
<?php

require 'includes/check_session.php';
require 'includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if(isset($_POST['add_entry']) && isset($_POST['expression']) && isset($_POST['meaning']) ) {

    include 'includes/MySQL_connect.php';

    // Read the content request
    $expression = mysqli_real_escape_string($MySQL_connection, $_REQUEST['expression']);
    $reading = mysqli_real_escape_string($MySQL_connection, $_REQUEST['reading']);
    $meaning = mysqli_real_escape_string($MySQL_connection, $_REQUEST['meaning']);

    // Get username from session
    $username = mysqli_real_escape_string($MySQL_connection, $_SESSION['username']);

    // Construct the query
    $sql = "INSERT INTO `$MySQL_table_name` (user_id, expression, reading, meaning, score)
      VALUES ( (SELECT id FROM users WHERE username ='$username'), '$expression', '$reading', '$meaning', 0 )";

    // Sendthe query
    if ($MySQL_connection->query($sql) === TRUE) {
      header('location: show_all.php');
    } else {
      echo "Error: " . $sql . "<br>" . $MySQL_connection->error;
    }
  }
}

?>
