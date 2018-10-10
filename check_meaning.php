<?php include 'includes/pre_main.php'; ?>

<div class="result">

  
<?php

// Read the request
$candidate = $_REQUEST['candidate'];
$answer = $_REQUEST['answer'];

if($candidate === $answer) {
 echo "Bravo!";
}
else {
 echo "Wrong<br>";
 echo "The answer was: ". $answer;
}

?>


</div>

<div class="controls">
  <form action="index.php" method="get">
    <input class="control" type="submit" value="Next">
  </form>
</div>

<?php include 'includes/post_main.php'; ?>
