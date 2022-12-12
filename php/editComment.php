<?php

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "PUT") {
    applyJSON([
        "message" => "Method not allowed; only PUT method permitted"
    ], 405
    );
} 

$filename = "comments.json";
$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);
$existingComments = json_decode(file_get_contents($filename), true);

$drinkId = $requestData["drinkId"];
$commentId = $requestData["commentId"];
$userId = $requestData["userId"];
$editedComment = $requestData["comment"];
$date = date("Y-m-d");

if(!isset($commentId) && !isset($drinkId) && !isset($userId) && !isset($editedComment)) {
    applyJSON([
        "message" => "Required key missing"
    ], 400
    );
}

if (empty($editedComment) || empty($drinkId) || empty($userId) || empty($commentId)) {

    applyJSON([
        "message" => "Key missing value"
    ], 400
    );
}

if (!is_numeric($commentId) ||!is_numeric($userId)) {
    applyJSON([
        "message" => "ID:s has to be a number"
    ], 406
    );
}

$updateComment = [["drinkId" => $drinkId, "commentId" => $commentId, "userId" => $userId, "comment" => $editedComment, "date" => $date]];

forEach($existingComments as $index => $comment) {

    if ($commentId == $comment["commentId"]) {
        array_splice($existingComments, $index, 1, $updateComment);
        $json = json_encode($existingComments, JSON_PRETTY_PRINT);
        file_put_contents($filename, $json);
        applyJSON($updateComment[0]);
    } 
} 
applyJSON([
    "message" => "Comment not found"
], 404
);

?>