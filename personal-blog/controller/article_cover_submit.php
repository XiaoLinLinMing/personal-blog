<?php

require_once $_SERVER['DOCUMENT_ROOT'].'/dashboard/个人博客/common/common.php';

if ($_FILES["file"]["error"] > 0) {
	send_content_text(0,"error", "错误："+$_FILES["file"]["error"]);
	return;
}
//限制文件类型
$array = explode(".", $_FILES["file"]["name"]);
$suffix = end($array);
$type = $_FILES["file"]["type"];

//允许上传的文件后缀
$allow_suffix = array("gif", "jpeg", "jpg", "png");

//若文件类型 与 大小不符合标准
if (

	(($type == 'image/gif')||
	($type == 'image/jpg')||
	($type == 'image/jpeg')||
	($type == 'image/ejpeg')||
	($type == 'image/x-png')||
	($type == 'image/png'))&&
	($_FILES["file"]["size"] < 1024000)&&
	(in_array($suffix, $allow_suffix))

) {
	
	//开始保存封面
	move_uploaded_file($_FILES["file"]["tmp_name"], "../view/article_cover/" . $_POST['name'].'.jpg');
	send_content_text(1, "success", "../view/article_cover/" . $_POST['name'].'.jpg');
}

else{
	send_content_text(0, "error", $_FILES["file"]);
}

?>