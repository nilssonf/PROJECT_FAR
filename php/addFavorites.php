<?php
//TODO: data to be added in favorites.json needs to be connected to the API. how?

//Method: POST
//only drink ID? 
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

$filename = "favorites.json";
$favorites = [];

if (file_exists($filename)) {
    $json = file_get_contents($filename);
    $favorites = json_decode($json, true);
} else {
    stop();
}

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);


$favorite = $requestData["drinkId"];
$userId = $requestData["userId"];

if(!isset($favorite)) {
    applyJSON([
        "message" => "Required key missing"
    ], 400
    );
}

if (empty($favorite)) {

    applyJSON([
        "message" => "Key missing value"
    ], 400
    );
}

$currentId = 0;

forEach($favorites as $fave) {
    if($fave["favoriteId"] > $currentId) {
        $currentId = $fave["favoriteId"];
    }
}

$highestId = $currentId + 1;

$newFavorite = ["favoriteId" => $highestId, "drinkId" => $favorite, "userId" => $userId];

$favorites[] = $newFavorite;


file_put_contents($filename, json_encode($favorites, JSON_PRETTY_PRINT));
$json = file_get_contents($filename);
$data = json_decode($json, true);

applyJSON($newFavorite);

?>