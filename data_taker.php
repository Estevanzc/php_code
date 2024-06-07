<?php
require_once("vendor/autoload.php");

use Embed\Embed;

$embed = new Embed();
session_start();
$links = isset($_SESSION["links"]) ? $_SESSION["links"] : null;
$action = $_GET["action"] ?? 0;
/*class Links {
    public $name;
    public $icon;
    public $links;
    public function __construct($links) {
        $this->name = $links->tittle;
        $this->icon = $links->icon;
        $this->name = $links->tittle;
    }
}*/
if ($action == 1) {
    $_SESSION["links"][] = urldecode($_GET["link"]);
} else if ($action == 2) {
    unset($_SESSION["links"][(int)$_GET["link"]]);
}
$link_list = [];
if ($links != null) {
    $counter = 0;
    foreach ($links as $link) {
        $link = $embed->get($link);
        $link_list[] = [
            "title" => $link->title,
            "icon" => $link->image,
            "link" => (string)$link->url,
            "link_num" => $counter
        ];
        $counter ++;
    }
}
print_r(json_encode($link_list));
