new Vue({
	el:'#main',
	data:{
			scale_1:false,
			scale_2:false,

			/*页面当前页数*/
			page_num:1,
			/*最多页数*/
			max_page_num:6,
			/*返回文章数量*/
			article_num:5,
			/*返回文章类型*/
			article_classify:0,
			/*文章返回起始地址*/
			start_index:0,


		/*文章列表 预览 正式上线清空*/
		article_list:[],
	},
	/*页面初始化*/
	mounted:function(){

			var url=window.location.search;
			if(url.indexOf("?")!=-1) result = url.substr(url.indexOf("=")+1);			
			this.article_classify = result;
			this.page_change(this);
	},
	methods:{

		/*图片缩放*/
		on_updates_animation:function(type){

			switch(type){

				case 0:this.scale_1=true;break;
				case 1:this.scale_2=true;break;
			}

		},

		out_updates_animation:function(type){

			switch(type){

				case 0:this.scale_1=false;break;
				case 1:this.scale_2=false;break;
			}
		},

		/*翻页*/
		page_turn:function(type){

			if(type==1){

				//this.$options.methods.timestampToTime(1403058804);
					if(this.page_num!=this.max_page_num){

						++this.page_num;
						/*数据库返回数据起始索引*/
						this.start_index = ((this.page_num-1)*5)+1;
						this.$options.methods.page_change(this);
					}
				}
			else{					
					if(this.page_num!=1){

						--this.page_num;
						/*数据库返回数据起始索引*/
						this.start_index = ((this.page_num-1)*5)+1;
						this.$options.methods.page_change(this);

					}
			}
					
				
		},

		/*文章跳转*/
		article_dump:function(e){

			window.location.href = '../article/article.html?article_id='+e.target.dataset.id;

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

		/**
		 * [page_change 获取文章列表]
		 * @param  {[type]} that [data]
		 * @return {[type]}      [null]
		 */
		page_change:function(that){

				/*请求地址 以及参数*/
				var request_url = '../../../index.php?c=controller_article_option&m=get_article&p=\
				{"get_number":'+that.article_num+',"get_classify":'+that.article_classify+',"start_index":'+that.start_index+'}';
				var updates_cover;
				$.get(request_url,function(data,status){

					if (status==='success') {

						that.article_list=[];
						console.log(data);
						var data_obj = $.parseJSON(data);
						//console.log(data_obj);
						for (var i = 0; i < data_obj.return_content.result_num; i++) {

							/*时间戳转正常时间*/						
							var time = data_obj.return_content.article_list[i].create_time;
							that.$options.methods.timestampToTime(time);
							data_obj.return_content.article_list[i].create_time = time;
							updates_cover = 'http://www.linhuiqi.top/dashboard/个人博客/view/article_cover/'+data_obj.return_content.article_list[i].cover;
							data_obj.return_content.article_list[i].cover = updates_cover;	
							that.$set(that.article_list, i,  data_obj.return_content.article_list[i]);
							console.log(that.article_list);
						}

						if ((parseInt(data_obj.return_content.article_count)%that.article_num) == 0)
							that.max_page_num = parseInt(data_obj.return_content.article_count) / that.article_num;
						else 
							that.max_page_num = parseInt(parseInt(data_obj.return_content.article_count) / that.article_num) + 1;
					}

					else console.log(status);

				});
			
		},

		/*点击跳转按钮*/
		page_jump:function(){

			if(this.page_num!=1&&this.page_num!=this.max_page_num){

				this.$options.methods.page_change(this);

			}

		}
	}
})