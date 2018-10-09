<?php include 'includes/pre_main.php'; ?>

<form action="check.php" method="post">
<?php

include 'includes/db_connect.php';

$sql = "SELECT id, expression, reading, meaning FROM $DB_table_name ORDER BY RAND() LIMIT 5;";
$result = $conn->query($sql);

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

// Shuffle array of candidates
shuffle($candidates);

echo "<div class='expression'>";
echo $expression;
echo "</div>";
echo "<div class='reading'>";
echo $reading;
echo "</div>";
echo "<input type='hidden' name='answer' value='".$true_meaning."'><br>";

echo "<div class='candidates_wrapper'>";
foreach ($candidates as $candidate){
    echo "<input class='candidate' type='submit' name='candidate' value='".$candidate."'><br>";
}
echo "</div>";







?>

</form>

<div class="controls">
  <form action="show_all.php" method="get">
    <input class= "control" type="submit" value="Show list">
  </form>
</div>

<?php include(dirname(__FILE__).'/includes/post_main.php'); ?>
