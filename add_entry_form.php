<?php
require 'includes/check_session.php';
require 'includes/config.php';
?>

<?php include 'includes/pre_header.php'; ?>

<header>
	<div class="top_left">
    <a href="show_all.php" class="fas fa-arrow-left"></a>
	</div>
	<div class="top_center">
	</div>
	<div class="login_status top_right">
  	<?php include 'includes/login_status.php'; ?>
	</div>
</header>
<main>

	<form action="add_entry.php" method="post">
	  <input type="text" name="expression" placeholder="Expression"><br>
	  <input type="text" name="reading" placeholder="Reading"><br>
	  <input type="text" name="meaning" placeholder="Meaning"><br>
	  <input type="submit" name="add_entry" value="Submit">
	</form>

	<!--
	<form action="upload_csv.php" method="post" enctype="multipart/form-data">
		Upload CSV file: <br>
		<input type="file" name="file">
	  <input type="submit" name="upload" value="Upload CSV">
	</form>
	-->

<?php include 'includes/post_main.php'; ?>
