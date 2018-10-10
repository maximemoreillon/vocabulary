<?php require 'includes/check_session.php'; ?>


<?php include 'includes/pre_main.php'; ?>

<form action="check.php" method="post">
  <?php

  include 'includes/MySQL_connect.php';
  $username = mysqli_real_escape_string($MySQL_connection, $_SESSION['username']);

  $sql = "SELECT expression, reading, meaning FROM vocabulary WHERE user_id=(SELECT id FROM users WHERE username ='$username') ORDER BY RAND() LIMIT 5 ";
  $result = $MySQL_connection->query($sql);

  $first = false;

  $candidates = [];
  $true_meaning = "";
  $expression = "";
  $reading = "";

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

      if(!$first) {
        $first = true;
        $true_meaning = $row["meaning"];
        $expression =$row["expression"];
        $reading= $row["reading"];
      }
      array_push($candidates,$row["meaning"]);
    }
  }

  $MySQL_connection->close();

  // Shuffle array of candidates
  shuffle($candidates);

  echo "<div class='expression'>";
  echo $expression;
  echo "</div>";
  echo "<div class='reading'>";
  echo $reading;
  echo "</div>";
  echo "<input type='hidden' name='answer' value='$true_meaning'><br>";

  echo "<div class='candidates_wrapper'>";
  foreach ($candidates as $candidate) {
    echo "<input class='candidate' type='submit' name='candidate' value='$candidate'><br>";
  }
  echo "</div>";
  ?>

</form>

<div class="controls">
  <form action="index.php" method="get">
    <input class= "control" type="submit" value="Return">
  </form>
</div>

<?php include 'includes/post_main.php'; ?>
