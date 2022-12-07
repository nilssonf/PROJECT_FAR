<?php

//POST request for log in - if 200 (OK), GET parameters for logged in user. 
//if !200 (not OK), no GET parameters

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];
$contentType = $_SERVER["CONTENT_TYPE"];

if ($requestMethod != "POST") {
    applyJSON([
        "message" => "Method not allowed; only POST method permitted"
    ], 405
    );
} 

$filename = "users.json";

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);
$existingUsers = json_decode(file_get_contents($filename), true);

$email = $requestData["email"];
$password = $requestData["password"];

forEach($existingUsers as $user) {
    if ($email == $user["email"] && $password == $user["password"]) {

        applyJSON($user);
    } 
}

applyJSON([
    "message" => "User not found"
], 404
);

?> 
