<?php

require 'includes/check_session.php';
require 'includes/config.php';

// Connect to MySQL
include 'includes/MySQL_connect.php';

// Read the request content
$username = mysqli_real_escape_string($MySQL_connection, $_SESSION['username']);

// Compose file name
$export_filename = "vocabulary_backup_backup_".$username."_".date("Y/m/d").".csv";


// SQL query
$sql = "SELECT expression, reading, meaning, score FROM `".$MySQL_table_name."` WHERE user_id=(SELECT id FROM users WHERE username ='$username')";
$result = $MySQL_connection->query($sql);


// Open file to output to
echo "\xEF\xBB\xBF";/// Byte Order Mark HERE!!!!

$fp = fopen('php://output', 'w');

if ($fp && $result->num_rows > 0) {

  // Force download
  header('Content-Encoding: UTF-8');
  header('Content-Type: application/csv; charset=UTF-8');
  header('Content-Disposition: attachment; filename="'.$export_filename.'"');


  //output each row of the data, format line as csv and write to file pointer
  while($row = $result->fetch_assoc()) {

    // Put values in the right columns
    $lineData[0] = $row['expression'];
    $lineData[1] = $row['reading'];
    $lineData[2] = $row['meaning'];
    $lineData[3] = $row['score'];

    // Write to file
    fputcsv($fp, $lineData);
  }

}


fclose($fp);
$MySQL_connection->close();
exit();

?>
