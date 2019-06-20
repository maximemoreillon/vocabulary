<?php
require 'includes/check_session.php';
require 'includes/config.php';
?>

<?php include 'includes/pre_header.php'; ?>

<header>
	<?php
	$active_nav = "vocabulary";
	include 'includes/header.php';
	?>
</header>

<main>

	<form action="add_entry.php" method="post">
	  <input type="text" name="expression" placeholder="Expression"><br>
	  <input type="text" name="reading" placeholder="Reading / Pronounciation (optional)"><br>
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

	<!-- Return button -->
	<div class="add_entry_button_wrapper">
		<a href="show_all.php" class="fas fa-arrow-left"></a>
	</div>

<?php include 'includes/post_main.php'; ?>
