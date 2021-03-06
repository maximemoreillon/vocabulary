<?php
require 'includes/check_session.php';
require 'includes/config.php';
?>


<?php

include 'includes/MySQL_connect.php';

// Read the request
$candidate = $_REQUEST['candidate'];
$target = $_REQUEST['target'];
$id = $_REQUEST['id'];
$mode = $_REQUEST['mode'];
$score = $_REQUEST['score'];
$list = "all";
if(isset($_REQUEST['list'])) {
  $list = $_REQUEST["list"];
}

$message = "";

if($candidate === $target) {
 $message = "Correct!";
 $new_score = $score+1;
}
else {
 $message = "Wrong<br> The answer was: ". $target;
 $new_score = $score-1;
}

// score saturation
if($new_score>$max_score){
  $new_score = $max_score;
}
else if($new_score<$min_score){
  $new_score = $min_score;
}

// Update score
$sql = "UPDATE `$MySQL_table_name` SET score=$new_score WHERE id=$id";
if ($MySQL_connection->query($sql) === TRUE) {
  // Success
}

?>

<?php include 'includes/pre_header.php'; ?>


<header>
	<?php
	$active_nav = "practice";
	include 'includes/header.php';
	?>
</header>

<main>
<div class="result">
  <?php echo $message; ?>
</div>

<div class="controls">
  <form action="mcq.php" method="get">
    <input type="hidden" name="mode" value="<?php echo $mode; ?>">
    <input type="hidden" name="list" value="<?php echo $list; ?>">
    <input class="control" type="submit" value="Next">
  </form>
</div>

<?php include 'includes/post_main.php'; ?>
