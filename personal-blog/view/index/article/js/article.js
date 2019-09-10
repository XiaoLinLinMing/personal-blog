new Vue({
	el:'#main',
	data:{
		article_id:0,
		author:'',
		create_time:'',
		read_num:0,
		content:'',
		title:'',
		content_test:"<h4>阅读本文大概需要 4 分钟。<br></h4><h4>作者：\
					 黄小斜<br><br></h4>大家都知道互联网大公司一向以技\
					 术强悍而知名，BAT的技术在国内互联网公司里算是比较领\
					 先的了，这也是因为大公司的业务繁杂庞大，必须要有足够\
					 优秀的技术去支撑。相对而言，小公司更倾向于选用快速扁\
					 平化的技术架构，相对来说技术的沉淀就不会像大公司这么\
					 多，遇到这样的问题，你该如何选择呢？简单来说。是选择\
					 在大公司里做凤尾，还是在小公司里做鸡头呢？ <br>\
					 首先，从成长方面来考虑，在小公司里，相对来说，做\
					 的事情比较独立，而且大公司里，做的事情非常细化，往\
					 往你只要负责一个模块，你并且把它做得非常的出色，你需\
					 要能够在某一个方面、某个系统或者模块中能够出色的完成任\
					 务。 <br>同时，在大公司里，你必须要保持快速成长和学习\
					 ，才能达到比较好的水平。因为身边的人基本上都非常优秀，\
					 所以你也没有时间去浪费，你必须要马跟进，要么就会掉队。\
					  <br> <br><img src='../img/test.jpg' style='max-width:750px;'/>"
	},

	/*页面初始化*/
	mounted:function(){
		var url=window.location.search;
		if(url.indexOf("?")!=-1) result = url.substr(url.indexOf("=")+1);
		this.article_id = result;
		console.log(this.article_id);
		this.load_article(this.article_id);
	},
	
	methods:{


		load_article:function(article_id){

			var that = this;
			//请求地址拼接
			var url = '../../../index.php?c=controller_article_option&m=get_article_content&\
			p={"article_id":'+article_id+'}';

			$.get(url, function(data,status){

				//若请求成功
				if (status==='success') {

					var return_obj = $.parseJSON(data);
					that.content = return_obj.return_content.content;
					that.author = return_obj.return_content.author;
					that.title = return_obj.return_content.title;
					that.create_time = return_obj.return_content.create_time;
					that.read_num = parseInt(return_obj.return_content.read_num);
					//console.log(that.content);
					url = '../../../index.php?c=controller_article_option&m=reading_article&\
					p={"article_id":'+article_id+'}';
					$.get(url, function(data, status){
						console.log(data);
					});
				}
				else console.log(statsu);//打印错误信息
			});

		}
	}
})