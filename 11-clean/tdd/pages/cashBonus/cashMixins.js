let  cashMixins={//弹窗
	data() {
		return {
			time:''
		}
	},
	onLoad(options){
	},
	methods: {
		inintTimeOut(t){
			this.computTime(t);
			let that=this;
			setInterval(function(){
				t--;
				that.computTime(t);
			},1000)
		},
		computTime(t){
			// debugger;
			let hours=Math.floor(t/3600);
			let middles=Math.floor(t%3600/60);
			let seconds=Math.floor(t%3600%60);
			 hours= hours<10?`0${hours}`:hours;
			 middles= middles<10?`0${middles}`:middles;
			 seconds= seconds<10?`0${seconds}`:seconds;
			this.time= `${hours}:${middles}:${seconds}`
			
		},
		jumpRules(){
			// 跳转规则页面
			uni.navigateTo({
				url:'/pages/cashBonus/rules'
			})
		}
	}
}
export default cashMixins;