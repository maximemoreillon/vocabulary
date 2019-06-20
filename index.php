<?php
require 'includes/check_session.php';
?>

<?php include 'includes/pre_header.php'; ?>

<header>
	<?php
	$active_nav = "practice";
	include 'includes/header.php';
	?>
</header>
<main>


<div class="index">
	<a type="button" href='mcq.php?mode=find_meaning'>Guess meaning</a>
	<a type="button" href='mcq.php?mode=find_expression'>Guess expression</a>
</div>

<?php include 'includes/post_main.php'; ?>
