<?php

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "DELETE") {
    applyJSON([
        "message" => "Method not allowed; only DELETE method permitted"
    ], 405
    );
} 

$filename = "favorites.json";
$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);
$existingFavorites = json_decode(file_get_contents($filename), true);



$id = $requestData["drinkId"];

forEach($existingFavorites as $index => $fave) {

    if ($id == $fave["drinkId"]) {
        array_splice($existingFavorites, $index, 1);
        $json = json_encode($existingFavorites, JSON_PRETTY_PRINT);
        file_put_contents($filename, $json);
        applyJSON($fave["drinkId"]);
    } 
}

applyJSON([
    "message" => "Favorite not found"
], 404
);

?>