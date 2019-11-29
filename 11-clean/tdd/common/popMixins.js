let  popMixins={//弹窗
	data() {
		return {
			isShowPop:false
		}
	},
	onLoad(options){
	},
	methods: {
		closePop(){
			this.isShowPop=false;
		},
		openPop(){
			this.isShowPop=true
		}
	}
}
export default popMixins;