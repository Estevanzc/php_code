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
    $_SESSION["links"][] = $_GET["link"];
} else if ($action == 2) {
    unset($_SESSION["links"][$_GET["link"]]);
}
$link_list = [];
if ($links != null) {
    foreach ($links as $link) {
        $link = $embed->get($link);
        $icon = $link->icon;
        $link_list[] = [
            "title" => $link->title,
            "icon" => $link->image,
            "link" => (string)$link->url
        ];
    }
}
print_r(json_encode($link_list));
