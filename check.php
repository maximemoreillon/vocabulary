<?php include 'includes/pre_main.php'; ?>

<div class="result">

<?php

include 'includes/MySQL_connect.php';

// Read the request
$candidate = $_REQUEST['candidate'];
$target = $_REQUEST['target'];
$id = $_REQUEST['id'];
$mode = $_REQUEST['mode'];

if($candidate === $target) {
 echo "Correct!";

 // Increment score in DB
 $sql = "UPDATE vocabulary SET score = score + 1 WHERE id=$id";

}
else {
 echo "Wrong<br>";
 echo "The answer was: ". $target;

 // Decrement score in DB
 $sql = "UPDATE vocabulary SET score = score - 1 WHERE id=$id";
}

// Sendthe query
if ($MySQL_connection->query($sql) === TRUE) {

} else {

}

?>


</div>

<div class="controls">
  <form action="mcq.php" method="get">
    <input type="hidden" name="mode" value="<?php echo $mode; ?>">
    <input class="control" type="submit" value="Next">
  </form>
</div>

<?php include 'includes/post_main.php'; ?>
