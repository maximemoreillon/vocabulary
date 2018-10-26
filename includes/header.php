
<!-- practice icon -->
<a
<?php
if($active_nav === "practice"){
  echo "class='nav_active'";
}

?>
href='index.php'>
  <div class="nav_icon">
    <i class="fas fa-dumbbell"></i>
  </div>
  <div class="nav_icon_caption">
    Practice
  </div>
</a>

<!-- vocabulary list icon -->
<a
<?php
if($active_nav === "vocabulary"){
  echo "class='nav_active'";
}
?>
href='show_all.php'>
  <div class="nav_icon">
    <i class="fas fa-list-ul"></i>
  </div>
  <div class="nav_icon_caption">
    Vocabulary
  </div>
</a>


<a
<?php
if($active_nav === "options"){
  echo "class='nav_active'";
}
?>
href='options.php'>
  <div class="nav_icon">
    <i class="fas fa-cogs"></i>
  </div>
  <div class="nav_icon_caption">
    Settings
  </div>
</a>

<!-- Logout icon
<a href="logout.php">
  <div class="nav_icon">
    <i class="fas fa-sign-out-alt"></i>
  </div>
  <div class="nav_icon_caption">
    Logout
  </div>
</a>
-->
