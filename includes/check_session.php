<?php

session_start();

if (!isset($_SESSION['username'])) {

  // If not logged in, redirect to login screen
	header('location: login_form.php');
}

?>
