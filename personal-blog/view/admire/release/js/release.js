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

			var that = this;
			/*确认提交之后开始替换 空格符替换*/
			this.dialog_show = true;
			this.content='';
			this.content = $("#editor").text();
			var re = /\s/g;
			//this.content = this.content.replace(re,'&nbsp;');		
			this.author = $("#author").text();
			
			//检查内容似乎否完整
			if (this.title===''||this.content===''||this.author==='') {
				
				alert('内容不完整！');
				return;
			}

			try{

				if($("#cover")[0].files[0].size==0) {alert('封面不完整！'); return;}

			}catch(e){

				alert('未选择封面');
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

					
					
					var result_obj = $.parseJSON(result);
					console.log(result_obj.return_content);
					//文件内容上传成功后 上传封面
					var formData = new FormData();
					formData.append("file",$("#cover")[0].files[0]);
					formData.append("service",'App.Passion.UploadFile');
					formData.append("name",result_obj.return_content);
					$.ajax({
						url:"../../../controller/article_cover_submit.php",
					 	type:'post',
		        		data: formData,
		        		processData: false,
		        		cache:false,  //默认是true，但是一般不做缓存         
		             	contentType:false,
		        		success:function(res){

		        			console.log(res);
		        		},
		        		error:function(XMLHttpRequest, textStatus){
		        			console.log(textStatus);
		        		}
					});
				}
			});
			
		},

		submit_cover:function(){

			 var formData = new FormData();
			 formData.append("file",$("#cover")[0].files[0]);
			 formData.append("service",'App.Passion.UploadFile');
			 formData.append("name",'123456');
			 $.ajax({
			 	url:"../../../controller/article_cover_submit.php",
			 	type:'post',
        		data: formData,
        		processData: false,
        		cache:false,  //默认是true，但是一般不做缓存         
             	contentType:false,
        		success:function(res){
        			console.log(res);
        		}
			 });
		}
	}

})