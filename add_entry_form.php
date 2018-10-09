<?php include(dirname(__FILE__).'/includes/pre_main.php'); ?>

<form action="show_all.php" method="post">
  <input type="text" name="expression" placeholder="Expression"><br>
  <input type="text" name="reading" placeholder="Reading"><br>
  <input type="text" name="meaning" placeholder="Meaning"><br>
  <input type="submit" name="add_entry" value="Submit">
</form>

<div class="controls">
  <form action="show_all.php" method="get">
    <input class="control" type="submit" value="Return to list">
  </form>
</div>

<?php include(dirname(__FILE__).'/includes/post_main.php'); ?>
