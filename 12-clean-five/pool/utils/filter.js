const vFilter = {
	moment: function(time, format) {
		if(!time) {
			return '';
		}
		let Time = parseInt(time).toString().length > 11 ? +time : +time * 1000;
		// 强制转换为东八区的时间去显示
		const timezone = 8; // 目标时区时间，东八区
		const offsetGMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
		const nowDate = new Date(Time).getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
		let date = new Date(Time);
		if (offsetGMT !== -480) {
			date = new Date(nowDate + offsetGMT * 60 * 1000 + timezone * 60 * 60 * 1000);
		}
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

		for(let key in box) {
			box[key] = add0(box[key]).toString()
			//月为大写M，分钟为小写m,此时需要去掉i，区分大小写
			result = result.replace(new RegExp(key + '+', (key === 'M' || key === 'm') ? 'g' : 'ig'), box[key])
		}
		// 有时差的时候，加上提示
		if (new Date().getTimezoneOffset() !== -480) {
			result += ' (北京时间)';
		}
		return result
	},
	//用星号隐藏手机号 如186****1054
	//参数 mobile： 手机；default：没有手机号码时的默认文字
	hideMobile: function(mobile, defaultText) {
		mobile = mobile.toString()
		return mobile ? mobile.substring(0, 3) + "****" + mobile.substring(7, 11) : defaultText
	},
	hideText: function(text) {
		if(text.length >= 6 && text.length <= 16) {
			return text ? text.substring(0, 2) + "****" + text.substring( text.length-2, text.length) : '';
		}else if(text.length >= 16) {
			return text ? text.substring(0, 2) + "************" + text.substring( text.length-2, text.length) : '';
		}
		return text
	},
	//格式化金额，都是以分为单位传入的不会有小数点，传出元为单位的两位小数
	money(money) {
		//防止其有的还是传的元,有小数点的话就不除100
		if(money.toString().indexOf('.') == -1) {
			money = +money / 100
		}
		money = money.toFixed(2)
		return Number(money)
	},
}

export default vFilter