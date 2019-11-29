const vFilter = {
	// format:传入格式 默认是y/M/d ,还可以是y-M-d h:m:s;请注意大写M表示月，小写m表示分钟，格式可自定义，是替换里面的关键字
	moment: function(time, format) {
		if(!time){
			return
		}
		let Time = parseInt(time).toString().length > 11 ? +time : +time * 1000;
		let date = new Date(Time);
		let result = format || 'y/M/d '; //设置默认格式
		let box = {
			'y': date.getFullYear(),
			'M': date.getMonth() + 1,
			'd': date.getDate(),
			'h': date.getHours(),
			'm': date.getMinutes(),
			's': date.getSeconds()
		}

		function add0(data) {
			return +data < 10 ? ('0' + data) : data
		}

		for (let key in box) {
			box[key] = add0(box[key]).toString()
			//月为大写M，分钟为小写m,此时需要去掉i，区分大小写
			result = result.replace(new RegExp(key + '+', (key === 'M' || key === 'm') ? 'g' : 'ig'), box[key])
		}
		return result
	},
	//用星号隐藏手机号 如186****1054
	//参数 mobile： 手机；default：没有手机号码时的默认文字
	hideMobile: function(mobile, defaultText = '幸运用户') {
		if (typeof mobile === 'string' || typeof mobile === 'number') {
			return mobile ? String(mobile).substring(0, 3) + "****" + String(mobile).substring(7, 11) : defaultText
		} else {
			return defaultText
		}

	},
	//格式化金额，该项目是以元为单位，传出元为单位的两位小数
	money(money) {
		if (!money) {
			money = 0
		}
	
		money = money.toFixed(2)
		return Number(money)
	},
	imgSuffix(src,size=180){
		//淘宝的图片加 _180x180.jpg 
		//自己的图片加 ?x-oss-process=image/resize,w_400 
		if(src.indexOf('bao')!=-1){
			let suffix = `_${size}x${size}.jpg`
			return src+suffix
		}else{
			return src
		}
	}
}

export default vFilter
