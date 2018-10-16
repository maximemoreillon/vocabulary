<div class="title">
  Vocabulary
</div>

<div class="login_status">

  <?php
  if( isset($_SESSION['username']) ){
    echo "User: ".$_SESSION['username']."<br>";
    echo '<a href="logout.php">Logout</a>';
  }
  ?>


</div>
