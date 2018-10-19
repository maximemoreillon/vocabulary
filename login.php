<?php

session_start();

$errors = array();

if (isset($_POST['login'])) {

  // Connect to DB
  require 'includes/MySQL_connect.php';

  // Escape input
  $username = mysqli_real_escape_string($MySQL_connection, $_POST['username']);
  $password = mysqli_real_escape_string($MySQL_connection, $_POST['password']);

  if (empty($username)) {
  	array_push($errors, "Username is required");
  }
  if (empty($password)) {
  	array_push($errors, "Password is required");
  }

  if (count($errors) == 0) {
  	$password_hashed = md5($password);
  	$query = "SELECT * FROM users WHERE username='$username' AND password='$password_hashed'";
  	$results = mysqli_query($MySQL_connection, $query);
  	if (mysqli_num_rows($results) == 1) {

  	  $_SESSION['username'] = $username;

      // Redirect
  	  header('location: index.php');
  	}
    else {
  		array_push($errors, "Wrong username/password combination");
  	}
  }
}
?>
