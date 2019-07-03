
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
  $sql = "SELECT expression, reading, meaning, score, list
  FROM `$MySQL_table_name`
  WHERE id=$id";


  $result = $MySQL_connection->query($sql);

  // Treat result
  if ($result->num_rows > 0) {


    $row = $result->fetch_assoc();


    echo '<div class="target_wrapper">';
    echo $row["expression"];
    echo '</div>';

		if($row["reading"] != ''){
			echo '<div class="target_reading_wrapper">';
	    echo "(".$row["reading"]. ")";
	    echo '</div>';
		}

    echo '<div class="target_reading_wrapper">';
    echo $row["meaning"];
    echo '</div>';

		// Show score
    echo "Score: ". $row["score"]. "/10<br><br>";

		// Show list
    echo "List: ". $row["list"]. "<br>";

  }

  $MySQL_connection->close();

  ?>

	<!-- show navigation buttons -->
	<div class="buttons_wrapper">

		<!-- Return button -->
		<div class="button_container">
			<a href="show_all.php" class="button fas fa-arrow-left"></a>
		</div>

		<!-- edit button -->
		<form method='get' action='edit_entry_form.php' class="button_container">
		  <input type='hidden' name='id' value='<?php echo $id;?>'>
		  <i class="button fas fa-edit" onclick="this.parentNode.submit()"></i>
	  </form>

	</div>




	<?php include 'includes/post_main.php'; ?>
