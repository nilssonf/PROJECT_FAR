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

$filename = "comments.json";
$comments = [];

if (file_exists($filename)) {
    $json = file_get_contents($filename);
    $comments = json_decode($json, true);
} else {
    stop();
}

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);


$addedComment = $requestData["comment"];

$drinkId = $requestData["drinkId"];
$userId = $requestData["userId"];
$date = date("Y-m-d");

if(!isset($addedComment) && !isset($drinkId) && !isset($userId)) {
    applyJSON([
        "message" => "Required key missing"
    ], 400
    );
}

if (empty($addedComment) || empty($drinkId) || empty($userId)) {

    applyJSON([
        "message" => "Key missing value"
    ], 400
    );
}

$currentId = 0;

forEach($comments as $comment) {
    if($comment["commentId"] > $currentId) {
        $currentId = $comment["commentId"];
    }
}

$highestId = $currentId + 1;

$newComment = ["drinkId" => $drinkId, "commentId" => $highestId, "userId" => $userId, "comment" => $addedComment, "date" => $date];

$comments[] = $newComment;


file_put_contents($filename, json_encode($comments, JSON_PRETTY_PRINT));
$json = file_get_contents($filename);
$data = json_decode($json, true);

applyJSON($newComment);

?>