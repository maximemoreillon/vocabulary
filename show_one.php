
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

  // Treat result
  if ($result->num_rows > 0) {


    $row = $result->fetch_assoc();


    echo '<div class="target_wrapper">';
    echo $row["expression"]. "<br>";
    echo '</div>';

		if($row["reading"] != ''){
			echo '<div class="target_reading_wrapper">';
	    echo "(".$row["reading"]. ")<br>";
	    echo '</div>';
		}


    echo '<div class="target_reading_wrapper">';
    echo $row["meaning"]. "<br>";
    echo '</div>';
    echo "Score: ". $row["score"]. "/10<br>";

  }

  $MySQL_connection->close();

  ?>

  <!-- delete button -->
  <form method='post' action='delete_entry.php'>
  <input type='hidden' name='id' value='<?php echo $id;?>'>
  <i class="fas fa-trash-alt" onclick="this.parentNode.submit()"></i>
  </form>

	<!-- Return button -->
	<div class="add_entry_button_wrapper">
		<a href="show_all.php" class="fas fa-arrow-left"></a>
	</div>


	<?php include 'includes/post_main.php'; ?>
