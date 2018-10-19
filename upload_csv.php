<?php
setlocale(LC_ALL, 'ja_JP.SJIS');

require 'includes/check_session.php';
require 'includes/config.php';

// Connect to DB
include 'includes/MySQL_connect.php';

// Treat POST request
// Check if POST request was done properly
if ( isset($_POST["upload"]) && isset($_FILES["file"]) ) {

  // Open the file
  if (($handle = fopen($_FILES['file']['tmp_name'], 'r+')) !== FALSE) {
    // Read the file

    $username = mysqli_real_escape_string($MySQL_connection, $_SESSION['username']);

    $sql ="";
    while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {

      $expression = $data[0];
      $reading = $data[1];
      $meaning = $data[2];

      $sql .= "INSERT INTO `$MySQL_table_name` (user_id, expression, reading, meaning, score)
        VALUES ((SELECT id FROM users WHERE username ='$username'),'$expression', '$reading','$meaning',0);";

    }
    fclose($handle);

    if ($MySQL_connection->multi_query($sql) === TRUE) {
      header('location: show_all.php');
    }
  }
}

?>
