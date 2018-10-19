<?php

session_start();

$errors = array();

// connect to the database
require 'includes/MySQL_connect.php';

// REGISTER USER
if (isset($_POST['register'])) {

  // receive all input values from the form
  $username = mysqli_real_escape_string($MySQL_connection, $_POST['username']);
  $password_1 = mysqli_real_escape_string($MySQL_connection, $_POST['password_1']);
  $password_2 = mysqli_real_escape_string($MySQL_connection, $_POST['password_2']);

  // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
  if (empty($username)) {
    array_push($errors, "Username is required");
  }
  if (empty($password_1)) {
    array_push($errors, "Password is required");
  }
  if ($password_1 != $password_2) {
	   array_push($errors, "The two passwords do not match");
  }

  // first check the database to make sure the user does not already exist
  $user_check_query = "SELECT * FROM users WHERE username='$username' LIMIT 1";
  $result = mysqli_query($MySQL_connection, $user_check_query);
  $user = mysqli_fetch_assoc($result);

  if ($user) { // if user exists
    if ($user['username'] === $username) {
      array_push($errors, "Username already exists");
    }
  }

  // Finally, register user if there are no errors in the form
  if (count($errors) == 0) {

    //encrypt the password before saving in the database
  	$password = md5($password_1);

  	$query = "INSERT INTO users (username, password)
  			  VALUES('$username', '$password')";

  	mysqli_query($MySQL_connection, $query);

    // Set session
  	$_SESSION['username'] = $username;

    // Redirect
  	header('location: show_all.php');
  }
}

?>
