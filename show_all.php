
<!-- Respond to POST requests to add or delete an entry -->
<?php
require(dirname(__FILE__).'/add_entry.php');
require(dirname(__FILE__).'/delete_entry.php');
?>


<!-- Everything before <main> -->
<?php include(dirname(__FILE__).'/includes/pre_main.php'); ?>

<table class="expressions_list">
  <tr>
    <th>Expression</th>
    <th>Reading</th>
    <th>Meaning</th>
    <th>Delete</th>
  </tr>

  <!-- filling the table using PHP -->
  <?php

  require(dirname(__FILE__).'/includes/db_connect.php');

  // SQL query
  $sql = "SELECT id, expression, reading, meaning FROM `vocabulary`";
  $result = $conn->query($sql);

  // Treat result
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      echo "<tr>";
      echo "<td>" .$row["expression"]. "</td>";
      echo "<td>" .$row["reading"]. "</td>";
      echo "<td>" .$row["meaning"]. "</td>";
      echo "<td>";
      echo "<form method='post' action=".htmlspecialchars($_SERVER["PHP_SELF"])."> ";
      echo "<input type='hidden' name='id' value='".$row["id"]."'>";
      echo "<input type='submit' name='delete' value='X'>";
      echo "</form>";
      echo "</td>";
      echo "</tr>";
    }
  }

  $conn->close();

  ?>

</table>

<div class="controls">
  <form action="add_entry_form.php" method="get">
    <input class="control" type="submit" value="Add entry">
  </form>

  <form action="index.php" method="get">
    <input class="control" type="submit" value="Return to test">
  </form>
</div>

<?php include(dirname(__FILE__).'/includes/post_main.php'); ?>
