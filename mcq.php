<?php require 'includes/check_session.php'; ?>

<?php include 'includes/pre_main.php'; ?>


<?php

$candidate_count = 4; // Excluding correct answer

// Set mode according to GET request
$mode = "find_meaning";
if (isset($_REQUEST['mode'])) {
  if($_REQUEST['mode'] === "find_expression"){
    $mode = $_REQUEST['mode'];
  }
}


include 'includes/MySQL_connect.php';
$username = mysqli_real_escape_string($MySQL_connection, $_SESSION['username']);

$candidates = [];


// Pick one word selected based on its score
// TODO: Pick by score and not randomly

$sql = "SELECT id, expression, reading, meaning FROM vocabulary
WHERE user_id=(SELECT id FROM users WHERE username ='$username')
ORDER BY RAND() LIMIT 1 ";

$result = $MySQL_connection->query($sql);
if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();

  $target = new StdClass;
  $target->meaning = $row["meaning"];
  $target->expression =$row["expression"];
  $target->reading= $row["reading"];
  $target->id= $row["id"];

  array_push($candidates,$target);

}


// Pick candidates randomly
$sql = "SELECT expression, reading, meaning FROM vocabulary
  WHERE user_id=(SELECT id FROM users WHERE username ='$username')
  AND NOT id='$target->id'
  ORDER BY RAND() LIMIT $candidate_count ";

$result = $MySQL_connection->query($sql);

if ($result->num_rows > 0) {

  while($row = $result->fetch_assoc()) {

    $candidate = new StdClass;
    $candidate->meaning = $row["meaning"];
    $candidate->expression = $row["expression"];
    $candidate->reading = $row["reading"];

    array_push($candidates,$candidate);

  }
}

$MySQL_connection->close();

// Shuffle array of candidates
shuffle($candidates);


?>

<form class="mcq_form" action="check.php" method="post">

  <div class="target_wrapper">
    <?php
    if($mode === "find_expression"){
      echo ($target -> meaning);
      echo "<input type='hidden' name='target' value='".$target -> expression."'>";

    }
    else {
      echo ($target -> expression);
      echo "<input type='hidden' name='target' value='".$target -> meaning."'>";
    }

    echo "<input type='hidden' name='mode' value='$mode'>";
    echo "<input type='hidden' name='id' value='".$target -> id."'>";

    ?>
  </div>

  <div class="target_reading_wrapper">
    <?php
    if($mode === "find_meaning"){
      echo ($target -> reading);
    }
    ?>
  </div>

  <div class="candidates_wrapper">
    <?php

    foreach ($candidates as $candidate) {

      if($mode === "find_expression"){
        echo "<input class='candidate' type='submit' name='candidate' value='".$candidate -> expression."'>";
      }
      else {
        echo "<input class='candidate' type='submit' name='candidate' value='".$candidate -> meaning."'>";
      }
      echo '<br>';
    }
    ?>

  </div>


</form>

<div class="controls">
  <form action="index.php" method="get">
    <input class= "control" type="submit" value="Return">
  </form>
</div>

<?php include 'includes/post_main.php'; ?>
