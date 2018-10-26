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


	<form action="upload_csv.php" method="post" enctype="multipart/form-data">
		Upload CSV file: <br>
		<input type="file" name="file">
    
	  <input type="submit" name="upload" value="Upload CSV">
	</form>


	<!-- Return button -->
	<div class="add_entry_button_wrapper">
		<a href="show_all.php" class="fas fa-arrow-left"></a>
	</div>

<?php include 'includes/post_main.php'; ?>
