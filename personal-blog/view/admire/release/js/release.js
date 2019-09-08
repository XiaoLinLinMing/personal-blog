new Vue({

	el:"#main",
	data:{
		content:''/*文章内容*/,
		dialog_show: false,
		title:''/*文章标题*/,
		author:''/*文章作者*/,
		show_recommend:false,
	},

	methods:{

		submit_content:function(){

			/*确认提交之后开始替换 空格符替换*/
			this.dialog_show = true;
			this.content='';
			this.content = $("#editor").text();
			var re = /\s/g;
			this.content = this.content.replace(re,'&nbsp;');		
			this.author = $("#author").text();

			if (this.title===''||this.content===''||this.author==='') {
				
				alert('内容不完整！');
				return;
			}


			var article_content = {}
			article_content['classify'] = $("#classify").val();
			article_content['title'] = this.title;
			article_content['content'] = this.content;
			article_content['author'] = this.author;
			if (this.show_recommend) article_content['recommend'] = 1;
			else article_content['recommend'] = 0;

			$.ajax({

				type:'post',
				url: '../../../controller/article_submit.php',
				data: 'data='+JSON.stringify(article_content),
				success:function(result){
					console.log(result);
				}
			});
			
		}
	}

})