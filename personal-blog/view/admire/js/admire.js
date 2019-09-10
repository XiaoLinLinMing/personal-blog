new Vue({

	el:"#main",
	data:{
		fun_name:'发布文章',
		iframe_src:'release/release.html'
	},

	methods:{

		jump_fun:function(type){

			switch(type){
				case 1:
						$("#show").attr("src","release/release.html");
						$("#title").text('发布文章');
						break;
				case 2:
						$("#show").attr("src","article_management/management.html");
						$("#title").text('文章管理');
						break;
				case 3:
						$("#show").attr("src","ad_index/ad_index.html");
						$("#title").text('主页广告管理');
						break;
				case 4:
						$("#show").attr("src","visitor/visitor.html");
						$("#title").text('访客数据');
						break;
			}
		}
	}

})