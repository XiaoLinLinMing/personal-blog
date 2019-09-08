<?php

require_once $_SERVER['DOCUMENT_ROOT'].'/dashboard/个人博客/controller/article_option.class.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/dashboard/个人博客/common/common.php';

header("Content-type: text/html; charset=UTF-8");
$json = $_POST['data'];
$json = json_decode($json, true);

$c = new controller_article_option();
$c->add_article($json);

?>