<?php

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];
$contentType = $_SERVER["CONTENT_TYPE"];

if ($requestMethod != "POST") {
    applyJSON([
        "message" => "Method not allowed; only POST method permitted"
    ], 405
    );
} 

if ($contentType != "application/json") {
    applyJSON([
        "message" => "Content type not allowed; convert to JSON"
    ], 415
    );
}

$filename = "users.json";
$users = [];

if (file_exists($filename)) {
    $json = file_get_contents($filename);
    $users = json_decode($json, true);
} else {
    stop();
}

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);


if ($requestMethod == "POST") {

    $email = $requestData["email"];
    $password = $requestData["password"];
    $name = $requestData["name"];
    $age = $requestData["age"];
    $occupation = $requestData["occupation"];


    if(!isset($email) || !isset($password) ||  !isset($name) || !isset($age) ||  !isset($occupation)) {
        applyJSON([
            "message" => "Required keys missing"
        ], 400
        );
    }

    if (empty($email) || empty($password) || empty($name) || empty($age) || empty($occupation)) {

        applyJSON([
            "message" => "Key missing values"
        ], 400
        );
    }
    
    if (!is_numeric($age)) {
        applyJSON([
            "message" => "Age needs to be a number"
        ], 406
        );
    }
    
    if(!strpos($email, "@") || !strpos($email, ".") ){
        applyJSON([
            "message" => "You need to write a correct emailadress"
        ], 403
        );
    }

    if(strlen($password) < 6){
        applyJSON([
            "message" => "Password is too short"
        ], 403
        );
    }

    if (!preg_match('/[\'^£$%&*()}{@#~?!><>,|=_+¬-]/', $password)){
        applyJSON([
            "message" => "Password need to contain atleast one special character"
        ], 403
        );
    }

    $currentId = 0;

    forEach($users as $user) {
        if($user["id"] > $currentId) {
            $currentId = $user["id"];
        }
        if($email == $user["email"]){
            applyJSON([
                "message" => "Email already exist"
            ], 403
            );
        }
    }
    
    $highestId = $currentId + 1;
    
    $newUser = ["id" => $highestId, "email" => $email, "password" => $password, "name" => $name, "age" => $age, "occupation" => $occupation, "picture" => "profiles/standard_picture"];

    $users[] = $newUser;
}


file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
$json = file_get_contents($filename);
$data = json_decode($json, true);

applyJSON($newUser);



?>
