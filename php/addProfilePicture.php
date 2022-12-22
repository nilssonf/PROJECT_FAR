<?php

if(isset($_FILES["uploadProfilePic"])) {
        $source = $_FILES["uploadProfilePic"]["tmp_name"];
        $destination = "../profiles/" . $_FILES["uploadProfilePic"]["name"];

        if(move_uploaded_file($source, $destination)) {
            header("Content-Type: application/json");
            http_response_code(201);

            echo json_encode([
                "message" => "The file was uploaded"
            ]);

            exit();
        } 
        header("Content-Type: application/json");
        http_response_code(400);
        echo json_encode([
                "message" => "Failed to upload the file"
        ]);
        exit();
}

?>