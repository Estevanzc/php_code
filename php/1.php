<?php
    $data = [];
    if (file_exists("data.txt")) {
        $data = json_decode(file_get_contents("data.txt"), true);
    } else {
        header("Location: 1.html");
        exit();
    };
    $email = $_POST["email"] ?? false;
    $password = $_POST["password"] ?? false;
    if (!$email || !$password) {
        header("Location: 1.html");
        exit();
    };
    foreach ($data as $datas) {
        $num = 0;
        if ($datas["email"] == $email) {
            $num ++;
        };
        if ($datas["password"] == $password) {
            $num ++;
        };
        if ($num == 2) {
            header("Location: 3.html");
            exit();
            break;
        };
        header("Location: 1.html");
        exit();
    };