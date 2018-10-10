<?php require 'includes/check_session.php'; ?>

<?php include 'includes/pre_main.php'; ?>

<form action="check.php" method="post">
  <?php

  $candidate_count = 5; // Excluding correct answer

  include 'includes/MySQL_connect.php';
  $username = mysqli_real_escape_string($MySQL_connection, $_SESSION['username']);

  // Pick one word selected based on its score
  // TODO: Pick by score and not randomly

  $sql = "SELECT expression, reading, meaning FROM vocabulary WHERE user_id=(SELECT id FROM users WHERE username ='$username') ORDER BY RAND() LIMIT 1 ";
  $result = $MySQL_connection->query($sql);
  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    
    $meaning = $row["meaning"];
    $expression =$row["expression"];
    $reading= $row["reading"];
  }


  // Pick candidates

  $sql = "SELECT expression, reading, meaning FROM vocabulary WHERE user_id=(SELECT id FROM users WHERE username ='$username') ORDER BY RAND() LIMIT $candidate_count ";
  $result = $MySQL_connection->query($sql);


  if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {

      $meaning = $row["meaning"];
      $expression =$row["expression"];
      $reading= $row["reading"];

    }
  }

  $MySQL_connection->close();

  // Shuffle array of candidates
  //shuffle($candidates);


  ?>

</form>

<div class="controls">
  <form action="index.php" method="get">
    <input class= "control" type="submit" value="Return">
  </form>
</div>

<?php include 'includes/post_main.php'; ?>
