
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

	// get username from query
  $username = mysqli_real_escape_string($MySQL_connection, $_SESSION['username']);

	?>


	<!-- Select containing list -->
	<?php include 'includes/list_selector.php'; ?>


	<!-- Add button -->
  <div class="add_entry_button_wrapper">
      <a href="add_entry_form.php" class="fas fa-plus"></a>
  </div>


	<?php
	// Deal with vocabulary table


  // SQL query
  $sql = "SELECT id, expression, reading, meaning, score
  FROM `$MySQL_table_name`
  WHERE user_id=(SELECT id FROM users WHERE username ='$username')";

	// filter lists if specified
	if(isset($_REQUEST['list'])) {
		if($_REQUEST['list'] !== 'all'){
			$list = $_REQUEST["list"];
			$sql.= "AND list='$list'";
		}
	}

	// Check if data needs to be sorted in a certain way
	// UNUSED AT THE MOMENT
  if(isset($_REQUEST['sort'])) {
    if($_REQUEST['sort'] === "score"){
      $sql .= "ORDER BY score";
    }
    else if($_REQUEST['sort'] === "meaning"){
      $sql .= "ORDER BY meaning";
    }
  }

	// Perform query
  $result = $MySQL_connection->query($sql);

  // Treat result
  if ($result->num_rows > 0) {

		echo "<table class='expressions_table'>";

		// Headers

		echo "<tr>";
	  echo "<th>Expression</th>";
	  echo "<th>Meaning</th>";
	  echo "<th>Score</th>";
	  echo "</tr>";


    while($row = $result->fetch_assoc()) {
      echo "<tr onclick='show_one(".$row["id"].")'>";
      echo "<td>";
			echo "<div class='table_expression'>".$row["expression"]."</div>";
			if($row["reading"] != ''){
				echo "<div class='table_reading'>(".$row["reading"].")</div>";
			}
			echo "</td>";
      echo "<td>" .$row["meaning"]. "</td>";
      echo "<td>" .$row["score"]. "/10</td>";

      echo "</tr>";
    }

		echo "</table>";
  }
	else{
		echo "No entry yet";
	}

  $MySQL_connection->close();

  ?>



</main>
<footer>
	<?php include 'includes/footer.php'; ?>
</footer>
</div>

<script>
function show_one(id){
	var url = "show_one.php?id=" + id;
	window.location.href = url;
}
</script>

</body>
</html>
