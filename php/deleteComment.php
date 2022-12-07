<?php

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "DELETE") {
    applyJSON([
        "message" => "Method not allowed; only DELETE method permitted"
    ], 405
    );
} 

$filename = "comments.json";
$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);
$existingComments = json_decode(file_get_contents($filename), true);

//USE LATER

$id = $requestData["commentId"];

forEach($existingComments as $index => $comment) {

    if ($id == $comment["commentId"]) {
        array_splice($existingComments, $index, 1);
        $json = json_encode($existingComments, JSON_PRETTY_PRINT);
        file_put_contents($filename, $json);
        applyJSON($comment["commentId"]);
    } 
}

applyJSON([
    "message" => "Comment not found"
], 404
);

?>