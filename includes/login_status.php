<?php
if( isset($_SESSION['username']) ){
  echo "User: ".$_SESSION['username']."<br>";
  echo '<a href="logout.php">Logout</a>';
}
 ?>
