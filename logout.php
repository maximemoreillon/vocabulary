<?php

session_destroy();
unset($_SESSION['username']);
header("location: login_form.php");

 ?>
