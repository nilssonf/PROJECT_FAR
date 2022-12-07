<?php

//if 

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

    //TODO: check isset keys, gives "key missing values" RN

    if(!isset($email) && !isset($password) && !isset($name) && !isset($age) && !isset($occupation)) {
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

    //TODO: password & email character handling

    $currentId = 0;

    forEach($users as $user) {
        if($user["id"] > $currentId) {
            $currentId = $user["id"];
        }
    }

    $highestId = $currentId + 1;
    
    $newUser = ["id" => $highestId, "email" => $email, "password" => $password, "name" => $name, "age" => $age, "occupation" => $occupation, "picture" => "standard_picture"];

    $users[] = $newUser;
}


file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
$json = file_get_contents($filename);
$data = json_decode($json, true);

applyJSON($newUser);

?>