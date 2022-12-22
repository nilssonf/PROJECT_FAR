<?php
    require_once "functions.php";

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    
    if ($requestMethod != "PUT") {
        applyJSON([
            "message" => "Method not allowed; only PUT method permitted"
        ], 405
        );
    } 
    
    $filename = "users.json";
    $requestJSON = file_get_contents("php://input");
    $requestData = json_decode($requestJSON, true);
    $existingUsers = json_decode(file_get_contents($filename), true);

    $id = $requestData["id"];
    $email = $requestData["email"];
    $password = $requestData["password"];
    $name = $requestData["name"];
    $age = $requestData["age"];
    $occupation = $requestData["occupation"];
    $picture = $requestData["picture"];

    if(!isset($email) || !isset($password) || !isset($name) || !isset($age) || !isset($occupation) || !isset($picture)) {
        applyJSON([
            "message" => "Required keys missing"
        ], 400
        );
    }

    if (empty($email) || empty($password) || empty($name) || empty($age) || empty($occupation) || empty($picture)) {

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

    $updateUser = [["id" => $id, "email" => $email, "password" => $password, "name" => $name, "age" => $age, "occupation" => $occupation, "picture" => $picture]];

    forEach($existingUsers as $index => $user) {

        if ($id == $user["id"]) {
            array_splice($existingUsers, $index, 1, $updateUser);
            $json = json_encode($existingUsers, JSON_PRETTY_PRINT);
            file_put_contents($filename, $json);
            applyJSON($updateUser[0]);
        } 

        if($email == $user["email"] && $id != $user["id"]){
                applyJSON([
                    "message" => "Email already exist"
                ], 403
                );
            }
        }
    applyJSON([
        "message" => "User not found"
    ], 404
    );

?>