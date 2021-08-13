<?php
//
//
//
include("functions.php");
include("views/header.php");
//
if ($_GET["page"] == "timeline") {
  include("views/timeline.php");
  //
} elseif ($_GET["user"]) {
  include("views/userProfile.php");
  //
} else {
  include("views/home.php");
  //
}
//
include("views/footer.php");
//
//
//
?>