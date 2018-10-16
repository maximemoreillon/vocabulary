<?php
require 'includes/check_session.php';
?>

<?php include 'includes/pre_header.php'; ?>

<header>
	<div class="top_left">

	</div>
	<div class="top_center">
		<a class="fas fa-list-ul" href="show_all.php"></a>
	</div>

	<div class="login_status top_right">
	  	<?php include 'includes/login_status.php'; ?>
	</div>
</header>
<main>


<div class="index">
	<a type="button" href='mcq.php?mode=find_meaning'>Guess meaning</a>
	<a type="button" href='mcq.php?mode=find_expression'>Guess expression</a>
</div>

<?php include 'includes/post_main.php'; ?>
