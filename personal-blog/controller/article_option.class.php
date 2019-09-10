<?php


/**
 * 
 */
header("Content-Type: text/html;charset=utf-8");

require_once $_SERVER['DOCUMENT_ROOT'].'/dashboard/个人博客/common/common.php';

class controller_article_option 
{
	public $db_obj;
	function __construct()
	{
		$this->db_obj = new mysqli('localhost', 'root', '', 'blog');
	}

	/**
	 * [add_article 添加文章]
	 * @param [string] $title    [文章标题]
	 * @param [string] $author   [作者名称]
	 * @param [number] $classify [类别序号]
	 * @param [recommend] $recommend [文章是否为推荐]
	 * @param [json str] $content  [是否操作成功]
	 */
	public function add_article($param_array){

		$title = $param_array["title"];
		$author = $param_array["author"];
		$classify = intval($param_array["classify"]);
		$content = $param_array["content"];
		$recommend = $param_array["recommend"];


		
		$article_id = time();
		$content_new = str_replace('%article_layout%', strval($article_id), $content);
		$content_preview = substr($content_new, 0, 75);
		$result = $this->db_obj->query("INSERT INTO T_ARTICLE (ID, TITLE, AUTHOR, READING_VOLUME, CALSSIFY, PREVIEW_CONTENT, RECOMMEND, CREATE_TIEM) VALUES (".$article_id.",'".$title."','".$author."',0, ".$classify.",'".$content_preview."',".$recommend.", NOW())");

		$result = $this->db_obj->query("INSERT INTO T_ARTICLE_CONTENT (MALE_ID, CONTENT) VALUES (".$article_id.",'". $content_new ."')");
		if($result == false) send_content_text(0, "操作失败", "添加失败");

		else 
			send_content_text(1, "操作成功", $article_id);
		
	}

	/**
	 * [add_article_cover 添加文章封面，与添加文章内容关联]
	 * @param [type] $cover [description]
	 */
	public function add_article_cover($param_array){
		return;
	}
	
	/**
	 * [get_article 获取指定类型文章列表]
	 * @param  [number] $get_number   [获取的文章个数]
	 * @param  [number] $get_classify [获取的文章类别]
	 * @param  [起始位置] $start_index  [返回文章的起始位置]
	 * @return [json str]               [文章列表]
	 */
	public function get_article($param_array){

		$get_number = $param_array["get_number"];
		$get_classify = $param_array["get_classify"];
		$start_index= $param_array["start_index"];

		$result = $this->db_obj->query("SELECT * FROM T_ARTICLE WHERE CALSSIFY=".$get_classify." LIMIT ".$start_index.","."$get_number");
		$result_array = array('result_num' => $result->num_rows);
		$article_list = array();
		for ($i=0; $i < $result->num_rows; $i++) { 

			$row = $result->fetch_assoc();
			$result_item = array();
			$result_item['article_id'] = $row['ID'];
			$result_item['classify_name'] = $row['CLASSIFY_NAME'];
			$result_item['read_num'] = $row['READING_VOLUME'];
			$result_item['create_time'] = $row['CREATE_TIEM'];
			$result_item['preview_content'] = $row['PREVIEW_CONTENT'];
			$result_item['title'] = $row['TITLE'];
			$result_item['cover'] = $row['ID'] . '.jpg';
			$article_list[$i] = $result_item;

		}

		$result = $this->db_obj->query("SELECT COUNT(CALSSIFY=".$get_classify." or null) FROM T_ARTICLE");
		$row = $result->fetch_assoc();
		$result_array['article_list'] = $article_list;
		$result_array['article_count'] = $row['COUNT(CALSSIFY='.$get_classify.' or null)'];
		send_content_json(1, 'Success request' , $result_array);
	}

	/**
	 * [get_article_content 获取文章的详细内容]
	 * @param  [number] $article_id [文章id]
	 * @return [json str]             [内容、阅读量、作者、创建时间]
	 */
	public function get_article_content($param_array){

		$article_id= $param_array["article_id"];

		$result = $this->db_obj->query("SELECT * FROM T_ARTICLE_CONTENT WHERE MALE_ID=".$article_id);
		$row = $result->fetch_assoc();
		$result_array = array('result_num' => $result->num_rows, 'content' => $row['CONTENT']);

		$result = $this->db_obj->query("SELECT * FROM T_ARTICLE WHERE ID=".$article_id);
		$row = $result->fetch_assoc();
		$result_array['read_num'] = $row['READING_VOLUME'];
		$result_array['author'] = $row['AUTHOR'];
		$result_array['title'] = $row['TITLE'];
		$result_array['create_time'] = $row['CREATE_TIEM'];
		$result_item['classify_name'] = $row['CLASSIFY_NAME'];

		send_content_json(1, "Success request", $result_array);

	}

	/**
	 * [reading_article 添加阅读量]
	 * @param  [number] $article_id [需要添加阅读量的文章id]
	 * @return [type]             [description]
	 */
	public function reading_article($param_array){

		$article_id = $param_array["article_id"];

		$result = $this->db_obj->query("SELECT READING_VOLUME FROM T_ARTICLE WHERE ID=".$article_id);
		$row = $result->fetch_assoc();
		$read_num = intval($row['READING_VOLUME'])+1;
		$this->db_obj->query("UPDATE T_ARTICLE SET READING_VOLUME=".strval($read_num)." WHERE ID=".$article_id);
		send_content_text(0,'1',"UPDATE T_ARTICLE SET READING_VOLUME=".strval($read_num)." WHERE ID=".$article_id);
	}

	/**
	 * [modify_article 文章编辑修改]
	 * @param  [type] $article_id      [需要修改的文章id]
	 * @param  [type] $article_content [修改过后的文章内容]
	 * @return [json str]                  [是否修改成功]
	 */
	public function modify_article($param_array){

		$article_id = $param_array["article_id"];
		$article_content = $param_array["article_content"];

		$preview_content = substr($article_content, 0, 75);
		//更新预览内容
		$this->db_obj->query("UPDATE T_ARTICLE SET PREVIEW_CONTENT='".$preview_content."' WHERE ID=".$article_id);
		//更新文章内容
		$this->db_obj->query("UPDATE T_ARTICLE_CONTENT SET CONTENT='".$article_content."' WHERE MALE_ID=".$article_id);
	}

	/**
	 * [del_article 删除文章]
	 * @param  [type] $article_id [被删除的文章id]
	 * @return [json str]             [是否删除成功]
	 */
	public function del_article($param_array){

		$article_id = $param_array["article_id"];

		$result = $this->db_obj->query("DELETE FROM T_ARTICLE WHERE ID=".$article_id);
		$result = $this->db_obj->query("DELETE FROM T_ARTICLE_CONTENT WHERE MALE_ID=".$article_id);
		
		if($result == false) send_content_text(1, "操作失败", "删除失败");
		else send_content_text(1, "操作成功", "删除成功");
	}

	/**
	 * [get_recent_updates 获取最近更新的文章]
	 * @param  [number] $get_number [获取的个数]
	 * @return [json str]             [文章预览数据]
	 */
	public function get_recent_updates($param_array){

		$get_number = $param_array["get_number"];

		$result = $this->db_obj->query("SELECT * FROM T_ARTICLE ORDER BY ID DESC LIMIT 0,".$get_number);

		$result_array = array('result_num' => $result->num_rows);
		$article_list = array();
		for ($i=0; $i < $result->num_rows; $i++) { 
			$result_item = array();
			$row = $result->fetch_assoc();
			$result_item['title'] = $row['TITLE'];
			$result_item['article_id'] = $row['ID'];
			$result_item['classify_name'] = $row['CLASSIFY_NAME'];
			$result_item['cover'] = $row['ID'] . '.jpg';
			$article_list[$i] = $result_item;
		}
		$result_array['article_list'] = $article_list;
		send_content_json(1,"Success request", $result_array);

	}

	/**
	 * [get_recommend 获取推荐阅读文章列表]
	 * @param  [number] $get_number [获取文章个数]
	 * @return [json str]             [文章列表]
	 */
	public function get_recommend($param_array){

		$get_number = $param_array["get_number"];

		$result = $this->db_obj->query("SELECT * FROM T_ARTICLE WHERE RECOMMEND=1 LIMIT 0,".$get_number);

		$result_array = array('result_num' => $result->num_rows);
		$article_list = array();
		for ($i=0; $i < $result->num_rows; $i++) { 
			$result_item = array();
			$row = $result->fetch_assoc();
			$result_item['read_num'] = $row['READING_VOLUME'];
			$result_item['classify_name'] = $row['CLASSIFY_NAME'];
			$result_item['create_time'] = $row['CREATE_TIEM'];
			$result_item['preview_content'] = $row['PREVIEW_CONTENT'];
			$result_item['article_id'] = $row['ID'];
			$result_item['cover'] = $row['ID'] . '.jpg';
			$result_item['title'] = $row['TITLE'];
			$article_list[$i] = $result_item;
		}

		$result_array['article_list'] = $article_list;

		send_content_json(1,"Success request", $result_array);
	}

	/**
	 * [get_comment 获取评论]
	 * @param  [number] $article_id  [评论所属文章id]
	 * @param  [number] $start_index [起始id]
	 * @param  [number] $get_number  [获取评论个数]
	 * @return [json str]              [评论列表]
	 */
	public function get_comment($param_array){

		$get_number = $param_array["get_number"];
		$article_id = $param_array["article_id"];
		$start_index = $param_array["start_index"];

		$result = $this->db_obj->query("SELECT * FROM T_COMMENT WHERE ARTICLE_ID=".$article_id." LIMIT ".$start_index.",".$get_number);

		$result_array = array('result_num' => $result->num_rows);
		$article_list = array();
		for ($i=0; $i < $result->num_rows; $i++) { 

			$result_item = array();
			$row = $result->fetch_assoc();
			$result_item['com_id'] = $row['COM_ID'];
			$result_item['content'] = $row['COM_CONTENT'];
			$result_item['create_time'] = $row['COM_TIME'];
			$result_item['commentator_name'] = $row['COMMENTATOR_NAME'];

			$article_list[$i] = $result_item;
		}

		$result_array['article_list'] = $article_list;
		send_content_json(1,"Success request", $result_array);
	}

	/**
	 * [del_commend 删除评论]
	 * @param  [number] $com_id [评论id]
	 * @return [type]         [description]
	 */
	public function del_commend($param_array){

		$com_id = $param_array["com_id"];

		$result = $this->db_obj->query("DELETE FROM T_COMMENT WHERE COM_ID=".$com_id);

		if($result===false) send_content_text(0,"Query failure", "Query failure");
		else send_content_text(1, 'Query success', 'Query success');
	}

	/**
	 * [add_commend 添加评论]
	 * @param [number] $article_id      [评论所属文章id]
	 * @param [string] $commend_content [评论内容]
	 * @param [string] $commend_author  [评论作者]
	 */
	public function add_commend($param_array){

		$com_id = $param_array["article_id"];
		$commend_content = $param_array["commend_content"];
		$commend_author = $param_array["commend_author"];

		$result = $this->db_obj->query("INSERT INTO T_COMMENT (ARTICLE_ID, COM_COMTENT, COMMENTATOR_NAME,COM_TIME) VALUES (".$article_id.", '".$commend_content."', '".$commend_author."', NOW())");
		if($result===false) send_content_text(0,"Query failure", "Query failure");
		else send_content_text(1, 'Query success', 'Query success');
	}

}

?>