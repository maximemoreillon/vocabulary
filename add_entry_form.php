<?php include 'includes/pre_header.php'; ?>

<header>
	<div class="top_left">
		<a class="fas fa-list-ul" href="show_all.php"></a>
	</div>
	<div class="top_center">

	</div>

  <div class="top_right">
		<div class="login_status">
	  	<?php include 'includes/login_status.php'; ?>
		</div>
	</div>

<form action="add_entry.php" method="post">
  <input type="text" name="expression" placeholder="Expression"><br>
  <input type="text" name="reading" placeholder="Reading"><br>
  <input type="text" name="meaning" placeholder="Meaning"><br>
  <input type="submit" class="control" name="add_entry" value="Submit">
</form>

<div class="controls">
  <form action="show_all.php" method="get">
    <input class="control" type="submit" value="Return to list">
  </form>
</div>

<?php include 'includes/post_main.php'; ?>
