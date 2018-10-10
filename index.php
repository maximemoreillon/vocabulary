<?php require 'includes/check_session.php'; ?>

<?php include 'includes/pre_main.php'; ?>


<div class="controls">
	<!-- CHANGE THIS TO NORMAL BUTTONS -->
	<form action="mcq.php" method="get">
		<input type="hidden" name="mode" value="find_meaning">
    <input class= "control" type="submit" value="Find meaning">
  </form>
	<form action="mcq.php" method="get">
		<input type="hidden" name="mode" value="find_expression">
    <input class= "control" type="submit" value="Find expression">
  </form>
  <form action="show_all.php" method="get">
    <input class= "control" type="submit" value="Manage expressions">
  </form>
</div>

<?php include 'includes/post_main.php'; ?>
