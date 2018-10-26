
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

  $username = mysqli_real_escape_string($MySQL_connection, $_SESSION['username']);
  $id = mysqli_real_escape_string($MySQL_connection, $_REQUEST['id']);


  // SQL query
  $sql = "SELECT expression, reading, meaning, score
  FROM `$MySQL_table_name`
  WHERE id=$id";

  $result = $MySQL_connection->query($sql);

  if ($result->num_rows > 0) {

    $row = $result->fetch_assoc();

		$meaning = $row["meaning"];
		$expression =$row["expression"];
		$reading= $row["reading"];

  }

  $MySQL_connection->close();

  ?>

	<form action="edit_entry.php" method="post">
		<input type="hidden" name="id" value="<?php echo $id;?>">
	  <input type="text" name="expression" value="<?php echo $expression;?>"><br>
	  <input type="text" name="reading" value="<?php echo $reading;?>"><br>
	  <input type="text" name="meaning" value="<?php echo $meaning;?>"><br>
	  <input type="submit" name="add_entry" value="Submit">
	</form>

  <!-- delete button -->
  <form method='post' action='delete_entry.php'>
  <input type='hidden' name='id' value='<?php echo $id;?>'>
  <i class="fas fa-trash-alt" onclick="this.parentNode.submit()"></i>
  </form>

	<!-- Return button -->
	<form method='post' action='show_one.php'>
  <input type='hidden' name='id' value='<?php echo $id;?>'>
  <i class="fas fa-arrow-left" onclick="this.parentNode.submit()"></i>
  </form>


	<?php include 'includes/post_main.php'; ?>
