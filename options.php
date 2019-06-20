<?php
require 'includes/check_session.php';
?>

<?php include 'includes/pre_header.php'; ?>

<header>
	<?php
	$active_nav = "options";
	include 'includes/header.php';
	?>
</header>
<main>

  <!-- login status -->
  <div class="account_info">
    <h1>Account info</h1>
    Logged in as: <?php echo $_SESSION['username'];?><br>
    <a href="logout.php">Logout</a>
  </div>

<?php include 'includes/post_main.php'; ?>
