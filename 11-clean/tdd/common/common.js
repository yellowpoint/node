import {
	host,
	host_other
} from '@/common/config'
//一些公共的工具方法
//Object.freeze，它做的事情是阻止这个对象在未来被修改。
let debounce_timeout = null
let common = Object.freeze({
	// 设置cookie方法,默认存在根目录，之前是为了区分在一个域名下的不同项目的存储，现在都是一个项目一个二级域名
	setCookie: function(name, value, days, path='/') {
		let expires = ""
		if (days) {
			//days兼容传入日期
			//如果传入days不能转为数字，则表示是具体日期,日期也可能会被转换为时间戳，故判断其长度
			if (+days && +days.toString().length < 8) {
				let date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();

			} else {
				expires = "; expires=" + new Date(days).toGMTString();
			}

		}
		let _path = ''
		if (path) {
			_path = '; path=' + path
		}
		document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + _path;
	},

	// 获取cookie
	getCookie: function(name) {
		let nameEQ = encodeURIComponent(name) + "=";
		let ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
		}
		return null;
	},

	// 删除cookie方法
	deleteCookie: function(name) {
		//用于处理不同域的cookie删除，与项目版本相同
		this.setCookie(name, '', -1)
		this.setCookie(name, '', -1, '/')
	},

	getUrlParam: function(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[
			1].replace(/\+/g, '%20')) || null;
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
		if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
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
		if (query && query.indexOf(name) > -1) {
			var obj = {}
			var arr = query.split("&");
			for (var i = 0; i < arr.length; i++) {
				arr[i] = arr[i].split("=");
				obj[arr[i][0]] = arr[i][1];
			};
			delete obj[name];
			var url = baseUrl + '?' + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
			if (!url.split('?')[1]) {
				url = url.split('?')[0]
			}
			return url
		};
		return loca
	},
	isPhoneNumber(phone) {
		return /^1\d{10}$/.test(phone)
	},
	isCode(code) { //验证码的验证
		return /^\d{6}$/.test(code)
	},
	isEmail(code){//邮箱校验
		return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(code)
	},
	// 判断客户端系统clientOS
	clientOS() {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
		if (isAndroid) {
			//这个是安卓操作系统
			return true
		} else {
			return false
		}
	},
	// 判断ios版本信息
	iosVersion() {
		var str = navigator.userAgent.toLowerCase();
		var ver = str.match(/cpu iphone os (.*?) like mac os/);
		if (ver) {
			return ver[1].split('_')[0];
		} else {
			return 0
		}
	},
	//获取元素距离顶部的距离
	getElementTop(element) {
		var actualTop = element.offsetTop;
		var current = element.offsetParent;
		while (current !== null) {
			actualTop += current.offsetTop;
			current = current.offsetParent;
		}
		return actualTop;
	},
	urlParse() {
		let url = window.location.href.substr(window.location.href.indexOf("?"));
		let obj = {};
		let reg = /[?&][^?&]+=[^?&]+/g;
		let arr = url.match(reg);
		if (arr) {
			arr.forEach(item => {
				let tempArr = item.substring(1).split("=");
				let key = decodeURIComponent(tempArr[0]);
				let val = decodeURIComponent(tempArr[1]);
				obj[key] = val;
			});
		}
		return obj;
	},
	// 防抖函数，一定时间间隔内没有再触发事件时，事件处理函数才会执行一次
	debounce(fn, wait) {
		if (debounce_timeout !== null) clearTimeout(debounce_timeout)
		debounce_timeout = setTimeout(fn, wait)
	},
	isWeiXin() {
		// window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
		var ua = window.navigator.userAgent.toLowerCase();
		//通过正则表达式匹配ua中是否含有MicroMessenger字符串
		if(ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	},
	getRandom(n,m){  
		//n-m区间  
		let c = m-n+1 
		let timestamp = String(new Date().getTime())   
		let number = String(Math.floor(Math.random() * c + n))
		return timestamp+number
	},
	//得到图片验证码
	getImgCode() {
		//13位时间戳加十位随机数
		
		let random = this.getRandom(1000000000, 9999999999)
		//请求图片验证码
		
		let data={
			random:random,
			imgUrl:`${host}/other/validatecode?random=${random}`
		}
		return data
	},
	//刷新验证码
	freshCode() {
		this.getImgCode()
	},
	isImgCode(str){ //验证图形验证
		   var pattern=/^(\w)+$/;
			var len = escape(str).replace(/%u\w{2}/g,"").length;

			if(len==4 && pattern.test(str)){
				  return true
			}else{
				 return false
			}
	},
	formatDate(d){ 
		var now=new Date(d); 
	     var year=now.getFullYear(); 
	     var month=now.getMonth()+1; 
	     var date=now.getDate(); 
	     var hour=now.getHours(); 
	     var minute=now.getMinutes(); 
	     var second=now.getSeconds(); 
	     return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
	} 


})



export default common
