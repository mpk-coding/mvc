<!doctype html>
<html lang="en" class="h-100">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

  <link rel="stylesheet" href="css/style.css">

  <!-- Bootstrap Bundle with Popper -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
  </script>

  <!-- jQuery -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

  <!-- Index JS -->
  <script src="js/index.js"></script>

  <!-- BS Modal Custom JS -->
  <script src="includes/modal/js/modal.js"></script>

  <!-- Custom JS -->
  <script src="js/tweetComponent.js"></script>
  <script src="js/recommendedComponent.js"></script>
  <script src="js/timeline.js"></script>
  <script src="js/userProfile.js"></script>

  <title>Hello, world!</title>
</head>

<body class="d-flex flex-column h-100">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class=" container-fluid">
      <a class="navbar-brand text-primary link-primary" href="/mvc">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Hamburger">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a id="timelineLink" href="?page=timeline" class="nav-link">Your timeline</a>
          </li>
          <li class="nav-item">
            <a href="?page=yourtweets" class="nav-link">Your tweets</a>
          </li>
          <li class="nav-item">
            <a href="?page=publicprofiles" class="nav-link">Public profile</a>
          </li>
        </ul>
        <form class="d-flex searchBar">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-primary" type="submit">Search</button>
        </form>
        <button class="btn btn-outline-primary text-nowrap" type="submit" data-bs-toggle="modal"
          data-bs-target="#loginModal">Login / Register</button>
      </div>
    </div>
  </nav>