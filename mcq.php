<?php
require 'includes/check_session.php';
include 'includes/config.php';
?>

<?php include 'includes/pre_header.php'; ?>

<header>
	<div class="top_left">
    <a href="index.php" class="fas fa-arrow-left"></a>
	</div>
	<div class="top_center">
		<a class="fas fa-list-ul" href="show_all.php"></a>
	</div>

	<div class="login_status top_right">
	  	<?php include 'includes/login_status.php'; ?>
	</div>
</header>
<main>

<?php
require 'includes/check_session.php';
require 'includes/config.php';

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
//TODO that's quite a rubbish way to select by score
$target_selected = False;
while(!$target_selected){

  $sql = "SELECT id, expression, reading, meaning, score FROM `".$MySQL_table_name."`
  WHERE user_id=(SELECT id FROM users WHERE username ='$username')
  ORDER BY RAND() LIMIT 1 ";

  $result = $MySQL_connection->query($sql);
  $row = $result->fetch_assoc();
  $score = $row["score"];
  $random_number = mt_rand($min_score,$max_score);

  if($random_number >= $score){
    $target_selected = True;
  }
}


$target = new StdClass;
$target->meaning = $row["meaning"];
$target->expression =$row["expression"];
$target->reading= $row["reading"];
$target->id= $row["id"];
$target->score = $row["score"];

array_push($candidates,$target);



// Pick candidates randomly
$sql = "SELECT expression, reading, meaning FROM `".$MySQL_table_name."`
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
// Once doesn't seem to shuffle properly
shuffle($candidates);
shuffle($candidates);
shuffle($candidates);

?>

<form class="mcq_form" action="check.php" method="post">

  <div class="target_wrapper">
    <?php

    echo "<input type='hidden' name='mode' value='$mode'>";
    echo "<input type='hidden' name='id' value='".$target->id."'>";
    echo "<input type='hidden' name='score' value='".$target->score."'>";

    if($mode === "find_expression"){
      echo ($target->meaning);
      echo "<input type='hidden' name='target' value='".$target->expression."'>";

    }
    else {
      echo ($target->expression);
      echo "<input type='hidden' name='target' value='".$target->meaning."'>";
    }



    ?>
  </div>

  <div class="target_reading_wrapper">
    <?php
    if($mode === "find_meaning"){
      echo ($target->reading);
    }
    ?>
  </div>

  <div class="candidates_wrapper">
    <?php

    foreach ($candidates as $candidate) {

      if($mode === "find_expression"){
        echo "<input class='candidate' type='submit' name='candidate' value='".$candidate->expression."'>";
      }
      else {
        echo "<input class='candidate' type='submit' name='candidate' value='".$candidate->meaning."'>";
      }
      echo '<br>';
    }
    ?>

  </div>


</form>


<?php include 'includes/post_main.php'; ?>
