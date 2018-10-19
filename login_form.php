<?php require 'login.php'; ?>

<?php include 'includes/pre_header.php'; ?>

<header>
	<div class="top_left">
	</div>
	<div class="top_center">
    Vocabulary
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
    <input type="password" name="password" placeholder="Password"><br>
    <input type="submit" name="login" value="Login">
  </form>

  <div>
    Not registered? Register <a href="register_form.php">here</a>
  </div>


<?php include 'includes/post_main.php'; ?>
