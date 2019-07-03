<?php
require 'includes/check_session.php';
include 'includes/config.php';
?>

<?php include 'includes/pre_header.php'; ?>

<header>
	<?php
	$active_nav = "practice";
	include 'includes/header.php';
	?>
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

?>

<!-- Select containing list -->
<?php include 'includes/list_selector.php'; ?>

<?php



// Pick one word selected based on its score
//TODO that's quite a rubbish way to select by score
$target_selected = False;
$no_entry = False;
while(!$target_selected && !$no_entry){

  $sql = "SELECT id, expression, reading, meaning, score FROM `$MySQL_table_name`
  WHERE user_id=(SELECT id FROM users WHERE username ='$username')";

	// filter lists if specified
	if(isset($_REQUEST['list'])) {
		if($_REQUEST['list'] !== 'all'){
			$list = $_REQUEST["list"];
			$sql.= "AND list='$list'";
		}
	}

	$sql.= "ORDER BY RAND() LIMIT 1 ";

  $result = $MySQL_connection->query($sql);
	if ($result->num_rows > 0) {
		$row = $result->fetch_assoc();
	  $score = $row["score"];
	  $random_number = mt_rand($min_score,$max_score);

	  if($random_number >= $score){
	    $target_selected = True;
	  }
	}
	else {
		// There is no entry in the vocabulary list
		$no_entry = True;
	}
}

if(!$no_entry){

	// If there is at least one entry, quizz can be made
	$target = new StdClass;
	$target->meaning = $row["meaning"];
	$target->expression =$row["expression"];
	$target->reading= $row["reading"];
	$target->id= $row["id"];
	$target->score = $row["score"];

	$candidates = [];

	// The target must appear among the candidates
	array_push($candidates,$target);

	// Pick candidates randomly
	$sql = "SELECT expression, reading, meaning FROM `$MySQL_table_name`
	  WHERE user_id=(SELECT id FROM users WHERE username ='$username')";

	// filter lists if specified
	if(isset($_REQUEST['list'])) {
		if($_REQUEST['list'] !== 'all'){
			$list = $_REQUEST["list"];
			$sql.= "AND list='$list'";
		}
	}

	$sql .= "AND NOT id='$target->id'
	  ORDER BY RAND() LIMIT $candidate_count";

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

	// Shuffle array of candidates
	// Once doesn't seem to shuffle properly
	shuffle($candidates);
	shuffle($candidates);
	shuffle($candidates);
}

$MySQL_connection->close();

?>

<?php if($no_entry) : ?>
	<div>
		The vocabulary list is empty. Add a new entry <a href="add_entry_form.php">here</a>.
	</div>
<?php else : ?>
	<!-- Show normal operations if enough entries -->
	<form class="mcq_form" action="check.php" method="post">

	  <div class="target_wrapper" onclick="toggle_reading_visibility()">
	    <?php
	    echo "<input type='hidden' name='mode' value='$mode'>";
	    echo "<input type='hidden' name='id' value='".$target->id."'>";
	    echo "<input type='hidden' name='score' value='".$target->score."'>";

			if(isset($_REQUEST['list'])) {
				$list = $_REQUEST["list"];
				echo "<input type='hidden' name='list' value='$list'>";
			}



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

		<!-- reading / pronounciation -->
	  <div class="target_reading_wrapper" id="reading" style="visibility: hidden;">
	    <?php
	    if($mode === "find_meaning"){
	      echo ($target->reading);
	    }
	    ?>
	  </div>

		<!-- display the candidates for the given target -->
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

	<script type="text/javascript" src="js/mcq.js"></script>
<?php endif; ?>

<?php include 'includes/post_main.php'; ?>
