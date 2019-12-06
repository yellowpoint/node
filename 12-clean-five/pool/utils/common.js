//一些公共的工具方法
//Object.freeze，它做的事情是阻止这个对象在未来被修改。
let common = Object.freeze({
	// 设置cookie方法
	setCookie: function(name, value, days, path) {
		let expires = ""
		if(days) {
			//days兼容传入日期
			//如果传入days不能转为数字，则表示是具体日期,日期也可能会被转换为时间戳，故判断其长度
			if(+days && +days.toString().length < 8) {
				let date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();

			} else {
				expires = "; expires=" + new Date(days).toGMTString();
			}

		}
		let _path = ''
		if(path) {
			_path = '; path=' + path
		}
		document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + _path;
	},

	// 获取cookie
	getCookie: function(name) {
		let nameEQ = encodeURIComponent(name) + "=";
		let ca = document.cookie.split(';');
		for(let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while(c.charAt(0) == ' ') c = c.substring(1, c.length);
			if(c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
		}
		return null;
	},

	// 删除cookie方法
	deleteCookie: function(name) {
		//用于处理不同域的cookie删除，与项目版本相同
		this.setCookie(name, '', -1)
		this.setCookie(name, '', -1, '/')
		this.setCookie(name, '', -1, '/gamepage')
	},

	getUrlParam: function(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
	},

	isOpenInWeixin: function() {
		return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger"
	},

	isOpenInAiSi: function() {
		return navigator.userAgent.toLowerCase().match(/i4Tools/i) == "i4tools"
	},

	isOpenInWeibo: function() {
		return navigator.userAgent.toLowerCase().match(/WeiBo/i) == "weibo"
	},
	isInPc: function() {
		var sUserAgent = navigator.userAgent.toLowerCase();
		var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
		var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
		var bIsMidp = sUserAgent.match(/midp/i) == "midp";
		var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
		var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
		var bIsAndroid = sUserAgent.match(/android/i) == "android";
		var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
		var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
		if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
			//		return "phone";
			return false;
		} else {
			//		return "pc";
			return true;
		}

	},
	//获取第二天零点的时间，可传几天后，默认是1天后
	getNextDate: function(next = 1) {
		let d = new Date(),
			year = d.getFullYear(),
			month = d.getMonth(),
			day = d.getDate(),
			nextDay = new Date(year, month, (day + next), '00', '00', '00');

		return nextDay;
	},
	//删除url上某个参数,返回url,可传入自定义链接，否则取location.href
	delUrlParam: function(name, myUrl) {
		var loca = myUrl || window.location.href;
		var baseUrl = loca.split('?')[0];
		var query = loca.split('?')[1];
		if(query && query.indexOf(name) > -1) {
			var obj = {}
			var arr = query.split("&");
			for(var i = 0; i < arr.length; i++) {
				arr[i] = arr[i].split("=");
				obj[arr[i][0]] = arr[i][1];
			};
			delete obj[name];
			var url = baseUrl + '?' + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
			if(!url.split('?')[1]) {
				url = url.split('?')[0]
			}
			return url
		};
		return loca
	},
	// 验证手机号
	isPhoneNumber(phone) {
		return /^\d+$/.test(phone)
	},
	// 验证邮箱
	isMail(mail) {
		return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(mail);
	},
	// 6-18密码验证
	isPassword(password) {
		return /^[A-Za-z0-9_]{6,18}$/.test(password);
	},
	// 判断客户端系统clientOS
	clientOS(){
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
		if (isAndroid) {
			//这个是安卓操作系统
			return true
		}else{
			return false
		}
	},
	// 判断ios版本信息
	iosVersion() {
		var str= navigator.userAgent.toLowerCase(); 
		var ver=str.match(/cpu iphone os (.*?) like mac os/);
		if(ver){
			return ver[1].split('_')[0];
		}else{
			return 0
		}
	},
	countdown(element, intervalContorl, count) { // 获取验证码倒计时
		let temp = element.innerHTML;
		let timer = count || 60;
		element.setAttribute('disabled', true);
		element.style.backgroundColor = '#aaa';
		element.innerHTML = `${timer}s`;
		intervalContorl = setInterval(() => {
			timer -= 1;
			if(timer <= 0) {
				clearInterval(intervalContorl);
				element.innerHTML = temp;
				element.removeAttribute('disabled');
				element.style.backgroundColor = '#445AFF';
			} else {
				element.innerHTML = `${timer}s`;
			}
		}, 1000);
	},
	getTruthTime(time) {
		// 服务器端时区，北京东八区
		let timezone = 8;
		let offsetGMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
		// 需要修复的时间，支持字符串传参
		let nowDate = time ? new Date(time).getTime() : new Date().getTime();
		let timeStamp = nowDate + (offsetGMT * 60 * 1000) + (timezone * 60 * 60 * 1000);
		return timeStamp
	},
	resetTruthTime(date) {
		let timeStamp = new Date(date).getTime();
		return timeStamp
	},
	timestampToTime(timestamp, format) {
		//13位时间戳转换为日期
		let Time = parseInt(timestamp).toString().length > 11 ? +timestamp : +timestamp * 1000;
		// 强制转换为东八区的时间去显示
		const timezone = 8; // 目标时区时间，东八区
		const offsetGMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
		const nowDate = new Date(Time).getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
		let date = new Date(Time);
		if (offsetGMT !== -480) {
			date = new Date(nowDate + offsetGMT * 60 * 1000 + timezone * 60 * 60 * 1000);
		}
		let result = format || 'Y/M/D '; //设置默认格式
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
	accAdd(arg1, arg2) { // 浮点加法
		if (isNaN(arg1)) {
			arg1 = 0;
		}
		if (isNaN(arg2)) {
			arg2 = 0;
		}
		arg1 = Number(arg1);
		arg2 = Number(arg2);
		var r1, r2, m, c;
		try {
			r1 = arg1.toString().split(".")[1].length;
		}
		catch (e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		}
		catch (e) {
			r2 = 0;
		}
		c = Math.abs(r1 - r2);
		m = Math.pow(10, Math.max(r1, r2));
		if (c > 0) {
			var cm = Math.pow(10, c);
			if (r1 > r2) {
				arg1 = Number(arg1.toString().replace(".", ""));
				arg2 = Number(arg2.toString().replace(".", "")) * cm;
			} else {
				arg1 = Number(arg1.toString().replace(".", "")) * cm;
				arg2 = Number(arg2.toString().replace(".", ""));
			}
		} else {
			arg1 = Number(arg1.toString().replace(".", ""));
			arg2 = Number(arg2.toString().replace(".", ""));
		}
		return (arg1 + arg2) / m;
	},
	accSub(arg1, arg2) { // 浮点减法
		if (isNaN(arg1)) {
			arg1 = 0;
		}
		if (isNaN(arg2)) {
			arg2 = 0;
		}
		arg1 = Number(arg1);
		arg2 = Number(arg2);
	
		var r1, r2, m, n;
		try {
			r1 = arg1.toString().split(".")[1].length;
		}
		catch (e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		}
		catch (e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
		n = (r1 >= r2) ? r1 : r2;
		return ((arg1 * m - arg2 * m) / m).toFixed(n);
	},
	accMul(arg1, arg2) { // 浮点乘法
		if (isNaN(arg1)) {
			arg1 = 0;
		}
		if (isNaN(arg2)) {
			arg2 = 0;
		}
		arg1 = Number(arg1);
		arg2 = Number(arg2);
		
		var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length;
		}
		catch (e) {
		}
		try {
			m += s2.split(".")[1].length;
		}
		catch (e) {
		}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	},
	accDiv(arg1, arg2) { // 浮点除法
		if (isNaN(arg1)) {
			arg1 = 0;
		}
		if (isNaN(arg2)) {
			arg2 = 0;
		}
		arg1 = Number(arg1);
		arg2 = Number(arg2);
		
		var t1 = 0, t2 = 0, r1, r2;
		try {
			t1 = arg1.toString().split(".")[1].length;
		}
		catch (e) {
		}
		try {
			t2 = arg2.toString().split(".")[1].length;
		}
		catch (e) {
		}
		r1 = Number(arg1.toString().replace(".", ""));
		r2 = Number(arg2.toString().replace(".", ""));
		return (r1 / r2) * Math.pow(10, t2 - t1);
  },
  toDecimal(val,len) {
    var f = parseFloat(val);
    if (isNaN(f)) {
      return '';
    }
    var s=val.toString();
    if(s.indexOf(".")>0){
      var f = s.split(".")[1].substring(0,len)
      s=s.split(".")[0]+"."+f;
    }
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + len) {
      s += '0';
    }
    return s;
  },
})

export default common