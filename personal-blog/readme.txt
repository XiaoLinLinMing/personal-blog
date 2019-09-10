服务器部署环境 ：

注意！注意！注意！服务器必须能被外网访问！

XAMPP v3.2.4
Windows Server2012R2


成品访问地址：http://www.linhuiqi.top/dashboard/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/view/index/index.html
后台管理地址（无验证）：http://www.linhuiqi.top/dashboard/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/view/admire/admire.html


文件结构：


common----|
	  |-common.php [后端公用方法]

controller--|
	    |-article_cover_submit.php [文章封面提交]
	    |-article_option.class.php [用户操作类]
	    |-article_submit.php [文章文字内容提交]

journal----站点运行日志


SQL ---- 站点数据库脚本

view----|
	|
	|-article_cover [存放文章封面图片]
	|-article_layout [存放文章配图]
	|
  	|
	|-index----------------|
	|		       |
	|		       |-index.html [主页]
	|		       |-article [文章详情页面]
	|		       |-article_list [某类型文章列表]
	|		       |-bgm [主页背景音乐]
	|		       |-css [主页样式表]
	|		       |-js [主页脚本]
	|		       |-font [字体图标文件]
	|
	|
	|-admire------|-article_management [文章管理子页面]
		      |-css [后台主页样式表]
		      |-js [后台主页脚本]
		      |-release [文章编辑子页面]
		      |-admire.html [后台主页]
