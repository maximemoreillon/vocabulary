<?php include 'includes/pre_main.php'; ?>

<form action="add_entry.php" method="post">
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

<?php include 'includes/post_main.php'; ?>
