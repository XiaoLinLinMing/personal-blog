<?php

header("Content-Type: text/html;charset=utf-8");
include 'controller/article_option.class.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/dashboard/个人博客/common/common.php';

$controller_name = $_GET['c'];
$model_name = $_GET['m'];
$param = $_GET['p'];
/*非法参数识别*/
$pos = strpos($controller_name, "controller_");

if(($pos!=0)||($pos===false)) echo '非法参数';
else {
	$param = json_decode($param, true);
	eval('$C = new '.$controller_name.'();');
	eval('$C->'.$model_name.'($param);');
}

/*数据约定*/

/**
 * c[控制器名称] 
 * m[模型名称]
 * p[模型参数] 统一使用json字符串格式
 * url约定 
 */

?>