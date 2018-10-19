
<?php
require 'includes/check_session.php';
require 'includes/config.php';
?>

<?php include 'includes/pre_header.php'; ?>

<header>
	<div class="top_left">
    <a href="index.php" class="fas fa-arrow-left"></a>
  </div>
	<div class="top_center">
    <a href="add_entry_form.php" class="fas fa-plus"></a>
	</div>

	<div class="login_status top_right">
	  	<?php include 'includes/login_status.php'; ?>
	</div>
</header>
<main>



<table class="expressions_table">

  <tr>
    <th>Expression</th>
    <th>Reading</th>
    <th><a href="<?php echo $_SERVER['PHP_SELF']."?sort=meaning"; ?>">Meaning</th>
    <th><a href="<?php echo $_SERVER['PHP_SELF']."?sort=score"; ?>">Score</th>
    <th>Delete</th>
  </tr>


  <!-- filling the table using PHP -->
  <?php

  include 'includes/MySQL_connect.php';

  $username = mysqli_real_escape_string($MySQL_connection, $_SESSION['username']);


  // SQL query
  $sql = "SELECT id, expression, reading, meaning, score
  FROM `".$MySQL_table_name."`
  WHERE user_id=(SELECT id FROM users WHERE username ='$username')";

  if(isset($_REQUEST['sort'])) {
    if($_REQUEST['sort'] === "score"){
      $sql .= "ORDER BY score";
    }
    else if($_REQUEST['sort'] === "meaning"){
      $sql .= "ORDER BY meaning";
    }
  }


  $result = $MySQL_connection->query($sql);

  // Treat result
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      echo "<tr>";
      echo "<td>" .$row["expression"]. "</td>";
      echo "<td>" .$row["reading"]. "</td>";
      echo "<td>" .$row["meaning"]. "</td>";
      echo "<td>" .$row["score"]. "/10</td>";
      echo "<td>";
      echo "<form method='post' action='delete_entry.php'> ";
      echo "<input type='hidden' name='id' value='".$row["id"]."'>";
      echo '<i class="fas fa-trash-alt" onclick="this.parentNode.submit()"></i>';
      echo "</form>";
      echo "</td>";
      echo "</tr>";
    }
  }

  $MySQL_connection->close();

  ?>

</table>



<?php include 'includes/post_main.php'; ?>
