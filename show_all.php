
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


  // SQL query
  $sql = "SELECT id, expression, reading, meaning, score
  FROM `$MySQL_table_name`
  WHERE user_id=(SELECT id FROM users WHERE username ='$username')";

	// Check if data needs to be sorted in a certain way
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
	  echo "<th><a href='".$_SERVER['PHP_SELF']."?sort=meaning'>Meaning</th>";
	  echo "<th><a href='".$_SERVER['PHP_SELF']."?sort=score'>Score</th>";
	  //echo "<th>Delete</th>";
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

	<!-- Add button here -->
	<div class="add_entry_button_wrapper">
		<i id="modal_open_button" style="display:none;" class="fas fa-plus-circle" ></i>
		<a href="add_entry_form.php" class="fas fa-plus"></a>
	</div>

</main>
<footer>
	<?php include 'includes/footer.php'; ?>
</footer>
</div>

<!-- Modal -->
<div id="add_expression_modal" class="modal">

  <!-- Modal content -->
  <div class="modal_content">
    <div class="close">&times;</div>
		<form action="add_entry.php" method="post">
		  <input type="text" name="expression" placeholder="Expression"><br>
		  <input type="text" name="reading" placeholder="Reading"><br>
		  <input type="text" name="meaning" placeholder="Meaning"><br>
		  <input type="submit" name="add_entry" value="Submit">
		</form>
  </div>

</div>

<script src="js/modal.js"></script>
<script>
function show_one(id){
	var url = "show_one.php?id=" + id;
	window.location.href = url;
}

</script>

</body>
</html>
