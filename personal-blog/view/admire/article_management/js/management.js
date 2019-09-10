new Vue({
	el:'#main',
	data:{
		class_1:true,
		class_2:false,
		class_3:false,
		class_4:false,
		class_5:false,
		article_class:1,
		article_list:[

		],
	},

	mounted:function(){
		this.get_article();
	},

	methods:{

		navigation_checked:function(e){

			var id = parseInt(e.target.dataset.id);
			this.class_1 = false;
			this.class_2 = false;
			this.class_3 = false;
			this.class_4 = false;
			this.class_5 = false;
			switch(id){
				case 1:
						this.class_1 = true;
						this.article_class = id;
						this.get_article();
						break;
				case 2:
						this.class_2 = true;
						this.article_class = id;
						this.get_article();
						break;
				case 3:
						this.class_3 = true;
						this.article_class = id;
						this.get_article();
						break;
				case 4:
						this.class_4 = true;
						this.article_class = id;
						this.get_article();
						break;
				case 5:
						this.class_5 = true;
						this.article_class = id;
						this.get_article();
						break;
			}
		},

		/*获取文章列表*/
		get_article:function(){

			this.article_list = [];
			var request_url = '../../../index.php?c=controller_article_option&m=get_article&p={"get_number":2,"get_classify":';
			request_url = request_url + this.article_class;
			request_url = request_url + ',"start_index":0}';
			var updates_cover;
			var that = this;
			$.get(request_url,function(data,status){

				if (status==='success') {
					var data_obj = $.parseJSON(data);
					
					for (var i = 0; i <  data_obj.return_content.result_num; i++) {

						//时间戳转换
						var time = data_obj.return_content.article_list[i].create_time;
						that.$options.methods.timestampToTime(time);
						data_obj.return_content.article_list[i].create_time = time;

						//封面地址转换
						updates_cover = 'http://www.linhuiqi.top/dashboard/个人博客/view/article_cover/'+data_obj.return_content.article_list[i].cover;
						data_obj.return_content.article_list[i].cover = updates_cover;	
						data_obj.return_content.article_list[i].show = true;	
						that.$set(that.article_list, i,  data_obj.return_content.article_list[i]);


					}
					console.log(that.article_list);
				}

				else console.log(status);
			    
			});
		},

		del_article:function(e){

			var id = parseInt(e.target.dataset.id);
			var index = e.target.dataset.index;
			var that = this;
			var request_url = '../../../index.php?c=controller_article_option&m=del_article&p={"article_id":' + id + '}';
			$.get(request_url,function(data,status){

				if (status==='success') {
					alert('操作成功！');
					console.log(data);
					that.article_list[index].show = false;

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