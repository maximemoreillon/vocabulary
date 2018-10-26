
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
    $id = mysqli_real_escape_string($MySQL_connection, $_REQUEST['id']);


    // Construct the query
    $sql = "UPDATE `$MySQL_table_name`
    SET expression=$expression, reading=$reading, meaning=$meaning
    WHERE id=$id";

    /*(user_id, expression, reading, meaning, score)
      VALUES ( (SELECT id FROM users WHERE username ='$username'), '$expression', '$reading', '$meaning', 0 )";
      */

    // Sendthe query
    if ($MySQL_connection->query($sql) === TRUE) {
      header('location: show_all.php');
    } else {
      echo "Error: " . $sql . "<br>" . $MySQL_connection->error;
    }
  }
}

?>
