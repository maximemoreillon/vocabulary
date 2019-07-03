
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

  <?php

	include 'includes/MySQL_connect.php';

	// Get session info for username
  $username = mysqli_real_escape_string($MySQL_connection, $_SESSION['username']);

	// Get ID of the expression from the request
  $id = mysqli_real_escape_string($MySQL_connection, $_REQUEST['id']);



  // SQL query
  $sql = "SELECT expression, reading, meaning, score, list
  FROM `$MySQL_table_name`
  WHERE id=$id";

  $result = $MySQL_connection->query($sql);

  if ($result->num_rows > 0) {

    $row = $result->fetch_assoc();

		$meaning = $row["meaning"];
		$expression =$row["expression"];
		$reading= $row["reading"];
		$list= $row["list"];

  }

  $MySQL_connection->close();

  ?>

	<form action="edit_entry.php" class="entry_form" method="post">
		<?php include 'includes/entry_form_fields.php'; ?>
	</form>




	<!-- show navigation buttons -->
	<div class="buttons_wrapper">

		<!-- return button -->
		<form method='get' action='show_one.php' class="button_container">
		  <input type='hidden' name='id' value='<?php echo $id;?>'>
		  <i class="button fas fa-arrow-left" onclick="this.parentNode.submit()"></i>
	  </form>

		<!-- delete button -->
		<form method='post' action='delete_entry.php' class="button_container">
		  <input type='hidden' name='id' value='<?php echo $id;?>'>
		  <i class="button fas fa-trash-alt" onclick="if(confirm('Really?')) this.parentNode.submit();"></i>
	  </form>

	</div>


	<?php include 'includes/post_main.php'; ?>
