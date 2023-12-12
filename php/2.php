<?php
    $data = [];
    if (file_exists("data.txt")) {
        $data = json_decode(file_get_contents("data.txt"), true);
    };
    $email = $_POST["email"] ?? false;
    $password = $_POST["password"] ?? false;
    if (!$email || !$password) {
        header("Location: 2.html");
        exit();
    };
    $new_data = [
        "email" => $email,
        "password" => $password,
    ];
    $data[] = $new_data;
    file_put_contents("data.txt", json_encode($data));
    header("Location: 1.html");
    exit();