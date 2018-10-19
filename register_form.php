<?php require 'register.php'; ?>

<?php include 'includes/pre_header.php'; ?>

<header>
	<div class="top_left">
    <a href="login_form.php" class="fas fa-arrow-left"></a>
	</div>
  <div class="top_center">

	</div>
	<div class="top_right">
	</div>
</header>

<main>

<div class="error_message">
  <?php
  foreach ($errors as $error){
    echo $error;
    echo "<br>";
  }
  ?>
</div>

<form action=<?php echo $_SERVER['PHP_SELF']; ?> method="post">
  <input type="text" name="username" placeholder="Username"><br>
  <input type="password" name="password_1" placeholder="Password"><br>
  <input type="password" name="password_2" placeholder="Confirm password"><br>
  <input type="submit" name="register" value="Register">
</form>

<?php include 'includes/post_main.php'; ?>
