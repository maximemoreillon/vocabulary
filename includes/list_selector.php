<?php
$selected = "all";
if(isset($_REQUEST['list'])) {
  $selected = $_REQUEST['list'];
}
?>

<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="get">
  <label for="list">List:</label>
  <select name="list" onchange="this.parentNode.submit()">
    <option value="all">All</option>
    <?php
    // Deal with lists
    $sql = "SELECT DISTINCT list
    FROM `$MySQL_table_name`
    WHERE user_id=(SELECT id FROM users WHERE username ='$username')";

    // Perform query
    $result = $MySQL_connection->query($sql);

    // Treat result
    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $list = $row["list"];
        // Not sure why the following if is necessary
        if($list){
          // Check if the list is the requested list
          if($list === $selected) {
            echo "<option value='$list' selected='selected'>$list</option>";
          }
          else {
            echo "<option value='$list'>$list</option>";
          }

        }
      }
    }
    ?>

  </select>
</form>
