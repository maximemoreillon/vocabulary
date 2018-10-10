<?php include 'includes/pre_main.php'; ?>

<form action="login.php" method="post">
  <input type="text" name="username" placeholder="Username"><br>
  <input type="password" name="password" placeholder="Password"><br>
  <input type="submit" name="login" value="Login">
</form>

<div>
  Not registered? Register <a href="register_form.php">here</a>
</div>


<?php include 'includes/post_main.php'; ?>
