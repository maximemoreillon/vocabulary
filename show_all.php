
<?php require 'includes/check_session.php'; ?>

<!-- Everything before <main> -->
<?php include 'includes/pre_main.php'; ?>

<table class="expressions_list">

  <tr>
    <th>Expression</th>
    <th>Reading</th>
    <th>Meaning</th>
    <th>Score</th>
    <th>Delete</th>
  </tr>


  <!-- filling the table using PHP -->
  <?php

  include 'includes/MySQL_connect.php';

  $username = mysqli_real_escape_string($MySQL_connection, $_SESSION['username']);


  // SQL query
  $sql = "SELECT id, expression, reading, meaning, score FROM vocabulary WHERE user_id=(SELECT id FROM users WHERE username ='$username')";

  $result = $MySQL_connection->query($sql);

  // Treat result
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      echo "<tr>";
      echo "<td>" .$row["expression"]. "</td>";
      echo "<td>" .$row["reading"]. "</td>";
      echo "<td>" .$row["meaning"]. "</td>";
      echo "<td>" .$row["score"]. "</td>";
      echo "<td>";
      echo "<form method='post' action='delete_entry.php'> ";
      echo "<input type='hidden' name='id' value='".$row["id"]."'>";
      echo "<input type='image' src='images/icons/delete.svg'>";
      echo "</form>";
      echo "</td>";
      echo "</tr>";
    }
  }

  $MySQL_connection->close();

  ?>

</table>

<div class="controls">
  <form action="add_entry_form.php" method="get">
    <input class="control" type="submit" value="Add entry">
  </form>

  <form action="index.php" method="get">
    <input class="control" type="submit" value="Return">
  </form>
</div>

<?php include 'includes/post_main.php'; ?>
