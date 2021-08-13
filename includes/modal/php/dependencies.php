<?php
//
function setFormState($type = "error", $val = false)
{
    global $formState;
    $formState = [
        $type => $val,
    ];
    //
}
//
function setFeedback($type, $form = "", $input = "", $value = "")
{
    global $feedback;
    //
    if ($type == "error") {
        if ($form == "" && $input == "" && $value == "") {
            unset($feedback);
            //
        }
        //
        $feedback["error"][$form][$input] = $value; 
        //       
    }
    //
    if ($type == "success") {
        $feedback["success"][$form][$input] = $value;
        //
    }
    // 
    if ($form == "" && $input == "" && $value == "") {
        $feedback["message"] = $type;
        //
    }
    //
}
//
function getPOST($key = "")
  {
  if ($key == "") {
    return $_POST;
  } else {
    return $_POST["$key"];
  }
}
//
function getFormError($type = "")
{
    global $formState;
    if ($type = "") {
        return $formState;
    } else {
        return json_encode($formState);
    }
}
//
function getFeedback($form = "", $input = "")
{
    global $feedback;
    if ($form == "" && $input == "") {
        return $feedback;
    } else {
        return $feedback[$form][$input];   
    }
}
//
function registrationSuccess()
{
    global $success;
    //
    if ($success == true) {
        return "<p class='form--success'>Registration successful!</p>";
    }
}
?>