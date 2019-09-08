<?php

header("Content-Type: text/html;charset=utf-8");
function send_content_text($code_no, $return_tip, $return_text){

 $return_json = array('code_no' =>$code_no, 'return_tip' =>$return_tip, 'return_content' =>$return_text);
 echo json_encode($return_json,JSON_UNESCAPED_UNICODE);
}


function send_content_json($code_no, $return_tip, $return_array){
    
$return_json = array('code_no' =>$code_no, 'return_tip' =>$return_tip, 'return_content' =>$return_array);
echo json_encode($return_json,JSON_UNESCAPED_UNICODE);

}

?>