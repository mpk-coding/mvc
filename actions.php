<?php
//
include("functions.php");
//
//
//
if (!empty(getPOST())) {
    //
    if (getPOST("form") == "register") {
        setData();
    }
    //
    if (getPOST("form") == "login") {
        getData();
    }
    //
    if (getPOST("page")) {
        getPage();
        //
    }
    //  logged in
    if($_SESSION["id"]) {
        $response["id"] = $_SESSION["id"];
        //
        if (getPOST("logout")) {
            session_unset();
            //
            $response = "session_unset() called.";
            //
        } else {
            //
            if (getPOST("form") == "newEntry") {
                addTweet();
                //
            }
            //          
            if (getPOST("follow")) {
                followUser();
                //
            }
            //
            if (getPOST("unfollow")) {
                unfollowUser();
                //
            }
            //
            getCurrentUser();
            getUserProfile();
            //
            getTweets();
            getRecommended();
            //                
        }
        //
    } else {
    //  NOT logged in
        $response["status"] = 0;
        //
    }
    //
    echo json_encode($response, JSON_FORCE_OBJECT);
    getConnection()->close();
    //           
}
//
//  DB_LINK
//
function getConnection()
{
    return mysqli_connect('database-1.cwnojimqezx3.eu-central-1.rds.amazonaws.com', 'admin', '$M4r14d8p455w0rd', 'mvc');
    //
}
//
function checkIfExists($target, $val, $database)
{
    $query = "SELECT $target from $database WHERE $target='" . mysqli_real_escape_string(getConnection(), $val) . "'";
    $result = mysqli_query(getConnection(), $query);
    return mysqli_num_rows($result);
}
//
//  REGISTER
//
function setData()
{
    global $response;
    //
    if (validateForm("register")) {
        if (getConnection()) {
            $email = getPOST("email");
            $password = getPOST("password");
            $salt = bin2hex(random_bytes(32));
            //
            $securePassword = md5(md5($salt) . $password);
            //
            $query = "INSERT INTO credentials (email, password, salt) VALUES ('" . mysqli_real_escape_string(getConnection(), $email) . "', '" . mysqli_real_escape_string(getConnection(), $securePassword) . "', '" . mysqli_real_escape_string(getConnection(), $salt) . "')";
            //
            if (checkIfExists("email", $email, "credentials")) {
                setFeedback("error", "register", "email", "<p class='form--error'>Username already taken</p>");
                //
                $response = getFeedback();
                getConnection()->close();
            } else {
                if (mysqli_query(getConnection(), $query)) {
                    setFeedback("success", "register", "account", "<p class='form--success'>Account successfully registered.</p>");
                    //
                    $_SESSION["id"] = mysqli_insert_id(getConnection());
                    //
                    $response = getFeedback();
                }
                //                
            }
            //
        } else {
            setFeedback("error", "register", "server", "<p class='form--error'>Our servers are currently experiencing issues, please try again later.</p>");
            //
            $response = getFeedback();     
            getConnection()->close();
            //  
        }
        //
    } else {
        $response = getFeedback();
        getConnection()->close();
        //            
    }
    //
}
//
//  LOGIN
//
function getData()
{
    global $response;
    //
    if (validateForm("login")) {
        if (getConnection()) {
            $email = getPOST("email");
            $password = getPOST("password");
            $salt = mysqli_fetch_array(mysqli_query(getConnection(), "SELECT salt FROM credentials WHERE email='${email}'"))[0];
            //
            $securePassword = md5(md5($salt) . $password);
            //
            $query = "SELECT email, password FROM credentials WHERE email = '" . mysqli_real_escape_string(getConnection(), $email) . "' AND password = '" . mysqli_real_escape_string(getConnection(), $securePassword) . "'";
            //
            $row = "SELECT * FROM credentials WHERE email = '" . mysqli_real_escape_string(getConnection(), $email) . "' AND password = '" . mysqli_real_escape_string(getConnection(), $securePassword) . "'";
            //
            if (checkIfExists("email", $email, "credentials")) {
                if (mysqli_num_rows(mysqli_query(getConnection(), $query))) {
                    if (getPOST("rememberCheckbox")) {
                    //  setUserCookie();
                    }
                    //
                    //  LOGGED IN
                    //
                    $response = getFeedback();
                    $_SESSION["id"] = mysqli_fetch_assoc(mysqli_query(getConnection(), $row))["id"];
                    //
                    $response["id"] = $_SESSION["id"];
                    //
                } else {
                    setFeedback("error", "login", "password", "<p class='form--error'>The password you entered was incorrect</p>");
                    //
                    $response = getFeedback();
                    getConnection()->close();
                    //
                }
                //                
            } else {
                setFeedback("error", "login", "email", "<p class='form--error'>No account registered under that adress</p>");
                //
                $response = getFeedback();
                getConnection()->close();
            }
            //
        } else {
            setFeedback("error", "login", "server", "<p class='form--error'>Our servers are currently experiencing issues, please try again later.</p>");
            //
            $response = getFeedback();
            getConnection()->close();
            //
        }
        //
    } else {
        $response = getFeedback();
        getConnection()->close();
        //
    }
    //
}
//
//  PAGE
//
function getPage() {
    global $response;
    //
    if (getPOST("page")) {
        $response["page"] = getPOST("page");
        //
    }
    //
}
//
//  TWEETS
//
function addTweet() {
    global $response;
    //
    if (validateForm("newEntry")) {
        if (getConnection()) {
            $tweet = getPOST("tweet");
            //
            $query = "INSERT INTO tweets (userid, tweet, datetime) VALUES ('" . mysqli_real_escape_string(getConnection(), $_SESSION["id"]) . "', '" . mysqli_real_escape_string(getConnection(), $tweet) . "', '" . mysqli_real_escape_string(getConnection(), date("Y-m-d H:i:s")) . "')";
            //
            if (mysqli_query(getConnection(), $query)) {
                //
                setFeedback("success", "addTweet", "textarea", "<p class='form-entry--success'>Tweet added!</p>");
                //
                $response["success"] = getFeedback()["success"];
                //
            }
            //
        } else {
            setFeedback("error", "register", "server", "<p class='form--error'>Our servers are currently experiencing issues, please try again later.</p>");
            //
            $response["error"]= getFeedback()["error"];     
            getConnection()->close();
            //  
        }
        //
    } else {
        $response["error"] = getFeedback()["error"];
        getConnection()->close();
        //
    }
    //
}
//
function getTweets() {
    //
    global $response;
    //
    if (getPOST("page") == "timeline") {
        $followingQuery = "SELECT isFollowing FROM following WHERE follower='" . $_SESSION["id"] . "'";
        //
        if (mysqli_num_rows(mysqli_query(getConnection(), $followingQuery))) {
            $index = 0;
            $criteria = mysqli_query(getConnection(), $followingQuery);
            while($row = mysqli_fetch_assoc($criteria)) {
                $following[$index] = $row["isFollowing"];
                $index++;
                //
            }
            //
            $string = "";
            for ($i = 0; $i < sizeof($following); $i++) {
                if ($i < sizeof($following) - 1) {
                    $string .= " userid='" . $following[$i] . "' OR";
                    //                    
                } else {
                    $string .= " userid='" . $following[$i] . "'";
                    //                    
                }
                //
            }
            //
            $queryTweets = "SELECT * FROM tweets WHERE" . $string . " ORDER BY datetime DESC";
            //              
        } else {
            $queryTweets = "SELECT * FROM tweets ORDER BY datetime DESC";
            //
        }  
    //
    } elseif (getPOST("page") == "userProfile") {
        $findId = "SELECT id FROM credentials WHERE email='" . getPOST("userProfile") . "'";
        //
        if ($result = mysqli_query(getConnection(), $findId)) {
            if ($id = mysqli_fetch_array($result)[0]) {
                $queryTweets = "SELECT * FROM tweets WHERE userid='" . $id . "'";
                //
            }
            //
        }
        //
    } else {
        $queryTweets = "SELECT * FROM tweets ORDER BY datetime DESC";
        //
    }
    //
    $numRows = 0;
    //
    if ($result = mysqli_query(getConnection(), $queryTweets)) {
        while ($rowTweets = mysqli_fetch_assoc($result)) {
            if ($numRows < 50) {
                if ($rowTweets["userid"] != $_SESSION["id"]) {
                    $rowTweets["isFollowing"] = mysqli_num_rows(mysqli_query(getConnection(), "SELECT follower, isFollowing FROM following WHERE follower='" . $_SESSION["id"] . "' AND isFollowing='" . $rowTweets["userid"] . "'"));                    
                } else {
                    $rowTweets["isFollowing"] = "self";
                }
                $rowTweets["userid"] = mysqli_fetch_array(mysqli_query(getConnection(), "SELECT email FROM credentials WHERE id='". $rowTweets["userid"] . "'"))[0];
                $dateTime = new DateTime($rowTweets['datetime']);
                $timeStamp = $dateTime->getTimestamp();
                $rowTweets["datetime"] = $rowTweets["datetime"] . " (" . get_time_ago($timeStamp) . ")";
                $response["tweets"][$numRows] = $rowTweets;
                $numRows++;  
                //                           
            }
            //
        };    
        //
        getConnection()->close(); 
        //                           
    } else {
        //
        getConnection()->close();
        //        
    }
    //
}
//
//  RECOMMENDED
//
function getRecommended() {
    global $response;
    $quantity = 3;
    //
    $followingQuery = "SELECT isFollowing FROM following WHERE follower='" . $_SESSION["id"] . "'";
    //        
    if (mysqli_num_rows(mysqli_query(getConnection(), $followingQuery))) {
        $index = 0;
        $criteria = mysqli_query(getConnection(), $followingQuery);
        while($row = mysqli_fetch_assoc($criteria)) {
            $following[$index] = $row["isFollowing"];
            $index++;
            //
        }
        //
        $string = "";
        for ($i = 0; $i < sizeof($following); $i++) {
            $string .= " AND id!='" . $following[$i] . "'";
            //
        };
        //    
        $query = "SELECT email, id FROM credentials WHERE id!='" . $_SESSION["id"] . "'" . $string;
        //            
    } else {
        $query = "SELECT email, id FROM credentials WHERE id!='" . $_SESSION["id"] . "'";
            //
    }
    //
    if (getConnection()) {
        if($result = mysqli_query(getConnection(), $query)) {
            $counter = 0;
            //
            while ($row = mysqli_fetch_assoc($result)) {
                if ($counter < $quantity) {
                    $response["recommended"][$counter] = $row;
                    $response["recommended"][$counter]["followers"] = mysqli_fetch_array(mysqli_query(getConnection(), "SELECT COUNT(isFollowing) FROM following WHERE isFollowing='" . $row["id"] . "'"))[0];
                    $counter++;
                    //                            
                }
                //
            }
            //
        }
        //
    } else {
        getConnection() -> close();
        //
    }
    //
}
//
//  USER INTERACTION
//
function followUser() {
    global $response;
    //
    if (getConnection()) {
        //  vars
        $followEmail = getPOST("follow");
        //  find id of $followEmail
        $findIdQuery = "SELECT id FROM credentials WHERE email='" . mysqli_real_escape_string(getConnection(), $followEmail) . "'";
        if ($followId = mysqli_fetch_array(mysqli_query(getConnection(), $findIdQuery))[0]) {
            //  assign Id to a variable
            $response["follow"] = $followId;
            //  see if user is already following the target 
            $followingQuery = "SELECT follower, isFollowing FROM following WHERE follower='" . $_SESSION["id"] . "' AND isFollowing='" .$followId . "'";
            if (mysqli_num_rows(mysqli_query(getConnection(), $followingQuery))) {
                //  output feedback
            } else {
                //  add relation
                $addRelationQuery = "INSERT into following (follower, isFollowing) VALUES (" . $_SESSION["id"] . ",". $followId . ")";
                if ($success = mysqli_query(getConnection(), $addRelationQuery)) {
                    $response["followUser"] = "success";
                    //
                    getConnection()->close();
                    //
                } else {
                    getConnection()->close();
                    //                    
                }
                getConnection()->close();
                //
            }
            //
        } else {
            getConnection() -> close();
            //
        }
        //
    } else {
        getConnection() -> close();
        //        
    }    
    //
}
//
function unfollowUser() {
    global $response;
    //
    if (getConnection()) {
        //  vars
        $unfollowEmail = getPOST("unfollow");
        //  find id of $followEmail
        $findIdQuery = "SELECT id FROM credentials WHERE email='" . mysqli_real_escape_string(getConnection(), $unfollowEmail) . "'";
        if ($unfollowId = mysqli_fetch_array(mysqli_query(getConnection(), $findIdQuery))[0]) {
            //  assign Id to a variable
            $response["unfollow"] = $unfollowId;
            //  see if user is already following the target 
            $followingQuery = "SELECT follower, isFollowing FROM following WHERE follower='" . $_SESSION["id"] . "' AND isFollowing='" . $unfollowId . "'";
            if (mysqli_num_rows(mysqli_query(getConnection(), $followingQuery))) {
                //  add relation
                $removeRelationQuery = "DELETE FROM following WHERE follower='" . $_SESSION["id"] . "' AND isFollowing='". $unfollowId . "'";
                if ($success = mysqli_query(getConnection(), $removeRelationQuery)) {
                    $response["unfollowUser"] = "success";
                    //
                    getConnection()->close();
                    //
                } else {
                    getConnection()->close();
                    //                    
                }
                getConnection()->close();
                //
            } else {
                //  output feedback
            }
            //
        } else {
            getConnection() -> close();
            //
        }
        //
    } else {
        getConnection() -> close();
        //        
    }    
    //
}
//
//  FORM VALIDATION
//
function validateForm($form)
{
    //
    $validEmail = true;
    $validPassword = true;
    //
    $validEntry = true;
    //
    setFormState();
    setFeedback("error");
    //
    // register
    //
    if ($form == "register") {
        //
        // email
        //
        if (getPOST("email") == "") {
            //
            setFeedback("error", "register", "email", "<p class='form--error'>Username is required</p>");
            $validEmail = false;
            //
        } else {
            if (!filter_var(getPOST("email"), FILTER_VALIDATE_EMAIL)) {
                //
                setFeedback("error", "register", "email", "<p class='form--error'>Please, enter a valid email adress</p>");
                $validEmail = false;
                //
            } else {
                $validEmail = true;
            }
        }
        //
        //  password
        //
        if (getPOST("password") == "") {
            //
            setFeedback("error", "register", "password", "<p class='form--error'>Password is required</p>");
            $validPassword = false;
        }
    }
    //
    //  login
    //
    if ($form == "login") {
        //
        //  email
        //
        if (getPOST("email") == "") {
            setFormState($form, "error");
            //
            setFeedback("error", "login", "email", "<p class='form--error'>Please, enter your email adress</p>");
            $validEmail = false;
        } else {
            if (!filter_var(getPOST("email"), FILTER_VALIDATE_EMAIL)) {
                //
                setFeedback("error", "login", "email", "<p class='form--error'>Please, enter a valid email adress</p>");
                $validEmail = false;
                //
            } else {
                $validEmail = true;
            }
        }
        //
        //  password
        //
        if (getPOST("password") == "") {
            setFormState($form, "error");
            //
            setFeedback("error", "login", "password", "<p class='form--error'>Please, enter your password</p>");
            $validPassword = false;
        }
    }
    //
    //  entry
    //
    if ($form == "newEntry") {
        //
        //  content
        //
        if (getPOST("tweet") == "") {
            //
            setFeedback("error", "addTweet", "textarea", "<p class='form-entry--error'>Entry content is required</p>");
            $validEntry = false;
        }
        //
    }
    //
    //  validation state
    //
    if (($validEmail == false || $validPassword == false) || $validEntry == false) {
        setFormState($form, "error");
        return false;
    } else {
        setFormState($form, "success");
        return true;
    }
    //
}
//
//  USER DATA
//
function getCurrentUser() {
    global $response;
    //
    if (getConnection()) {
        $query = "SELECT email FROM credentials WHERE id='" . $_SESSION['id'] . "'";
        //
        if ($result = mysqli_query(getConnection(), $query)) {
            $response["user"]["id"] = $_SESSION["id"];
            $response["user"]["email"] = mysqli_fetch_assoc($result)["email"];
            //
            $query = "SELECT COUNT(isFollowing) FROM following WHERE isFollowing='" . $_SESSION["id"] . "'";
            if ($result = mysqli_query(getConnection(), $query)) {
                $response["user"]["followers"] = mysqli_fetch_array($result)[0];
                //
            } else {
                getConnection()->close();
            }
            //
        } else {
            getConnection()->close();
            //
        }
        //
    } else {
        getConnection()->close();
        //
    }
    //
}
//
function getUserProfile() {
    global $response;
    //
    if (getPOST("page") == "userProfile") {
        $idQuery = "SELECT id FROM credentials WHERE email='" . getPOST("userProfile") . "'";
        //
        if (getConnection()) {
            if ($result = mysqli_query(getConnection(), $idQuery)) {
                if ($row = mysqli_fetch_array($result)[0]) {
                    $profilesQuery = "SELECT email, location, info FROM profiles WHERE userid='" . $row . "'";
                    //
                    if ($resultUser = mysqli_query(getConnection(), $profilesQuery)) {
                        if ($rowUser = mysqli_fetch_assoc($resultUser)) {
                            $response["userProfile"] = $rowUser;
                            //
                        }
                        //
                    }
                    //
                    $followers = "SELECT COUNT(isFollowing) FROM following WHERE isFollowing='" . $row . "'";
                    //
                    if ($resultFollowers = mysqli_query(getConnection(), $followers)) {
                        $response["userProfile"]["followers"] = mysqli_fetch_array($resultFollowers)[0];
                        //
                    }
                    //
                }
                //
            }
            //
        } else {
            getConnection()->close();
            //
        }  
        //  
    }
    //
}
//
?>