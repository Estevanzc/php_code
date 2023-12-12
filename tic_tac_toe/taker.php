<?php
$action = $_GET["action"] ?? false;
if ($action == 0) {
    $data = [];
    if (file_exists("data.txt")) {
        $data = json_decode(file_get_contents("data.txt"), true);
    }
    print_r(json_encode($data));
} else if ($action == 1) {
    if (file_exists("data.txt")) {
        $data = json_decode($_GET["data"], true);
        file_put_contents("data.txt", json_encode($data));
        echo false;
    }
}
?>