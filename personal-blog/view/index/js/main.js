new Vue({
	el:'#main',
	data:{

		scale_1:false,
		scale_2:false,
		admire:false,
		scale_cover:false,	

		/*文章列表 预览*/
		article_list:[],

		/*顶部广告图片地址*/
		ad_style:"background: url('img/test.jpg');	background-position: center;\
	background-repeat:no-repeat;\
		background-size: 100% 100%;",

		/*近期更新列表*/
		recent_updates:[]
	},

	/*页面初始化*/
	mounted:function(){

		this.ini();
	},

	methods:{

		on_updates_animation:function(type){

			switch(type){

				case 1:this.scale_1=true;break;
				case 2:this.scale_2=true;break;
				case 3:this.scale_cover=true;break;
			}

		},

		out_updates_animation:function(type){

			switch(type){

				case 1:this.scale_1=false;break;
				case 2:this.scale_2=false;break;
				case 3:this.scale_cover=false;break;
			}
		},

		admire_fun:function(type){
			if(type==1)this.admire=true;
			else this.admire=false;
		},


		/**
		 * [根据文章di 跳转至文章阅读页面]
		 * @param  事件
		 * 
		 */
		article_dump:function(e){
			//console.log(e.target.dataset.id);
			window.location.href=("article/article.html?article_id="+e.target.dataset.id);
		},


		jump_classify:function(e){

			
			window.location.href="article_list/article_list.html?classify="+e;

		},

		ini:function(){
			
			//获取2篇 最近更新文章
			var request_url = '../../index.php?c=controller_article_option&m=get_recent_updates&p={"get_number":2}';

			var that = this;
			console.log('ok');
			/*近期更新文章获取*/
			$.get(request_url,function(data,status){

				var updates_cover, style ,style_str_left = "background:url('";
				var style_str_right = "');background-position: center;\
										background-repeat:no-repeat;back\
										ground-size: 100% 100%;";

				if (status==='success') {
					var data_obj = $.parseJSON(data);
					
					for (var i = 0; i <  data_obj.return_content.result_num; i++) {

						updates_cover = 'www.linhuiqi.top/dashboard/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/view/article_cover/'+data_obj.return_content.article_list[i].cover;
						style = style_str_left + updates_cover + style_str_right;
						data_obj.return_content.article_list[i].cover = style;				
						that.$set(that.recent_updates, i,  data_obj.return_content.article_list[i]);

					}
					console.log(that.recent_updates);
				}

				else console.log(status);
			    
			});

				/*推荐阅读获取 3篇*/
				request_url = '../../index.php?c=controller_article_option&m=get_recommend&p={"get_number":3}';

				$.get(request_url,function(data,status){

					if (status==='success') {
						var cover_ur;
						var data_obj = $.parseJSON(data);
						for (var i = 0; i < data_obj.return_content.result_num; i++) {
							
							//时间戳转换
							var time = data_obj.return_content.article_list[i].create_time;
							that.$options.methods.timestampToTime(time);
							data_obj.return_content.article_list[i].create_time = time;

							cover_url = 'http://www.linhuiqi.top/dashboard/\
										 个人博客\
										/view/article_cover/'+data_obj.return_content.article_list[i].cover;

							data_obj.return_content.article_list[i].cover = cover_url;
							that.$set(that.article_list, i, data_obj.return_content.article_list[i])
						}
						console.log(that.article_list);
					}

					else console.log(status);
				    
				});
		},

		/*时间戳转换*/
		timestampToTime:function (timestamp) {
		    var date = new Date(timestamp);
		    var Y = date.getFullYear() + '-';
		    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		    var D = date.getDate() + ' ';
		    var h = date.getHours() + ':';
		    var m = date.getMinutes() + ':';
		    var s = date.getSeconds();
		    return Y+M+D;
		},
	}
})
