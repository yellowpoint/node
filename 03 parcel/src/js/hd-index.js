AlloyLever.config({
	entry: "#entry" //请点击这个DOM元素6次召唤vConsole。//你可以通过AlloyLever.entry('#entry2')设置多个机关入口召唤神龙
})

//首页顶部轮播图
function topSwiper() {
	var topBanner = new Swiper('.swiper-topBanner', {
		loop: true,
		autoplay: 4000,
		speed: 500,
		autoplayDisableOnInteraction: false,
		pagination: '.swiper-pagination',
		spaceBetween: 20,
	});
}

var dataBox = '',
	url, successFunc,
	token = GetQueryString('token') || getCookie('token') || '';
//优先取url上的token，作用是在链接上可以区分各种用户，然后是cookie里面的；

successFunc = function(data) {
	var bannerList = data.data.bannerList,
		loanList = data.data.loanList,
		recomLoanList = data.data.recomLoanList,
		webUrl = '';

	//首页顶部轮播
	$.each(bannerList, function(i, bannerList) {
		try {
			//有url则跳转url没有则跳转loan的链接
			webUrl = bannerList.url ? bannerList.url : bannerList.loan.url
			dataBox += '<div class="swiper-slide loanItem" " data-url="' + webUrl + '" ><div class="imgBox"><img src="' + bannerList.imageUrl + '" alt=""></div></div>'

		} catch(e) {
			console.log(e)
		}

	})
	$('.banner .swiper-wrapper').empty().append(dataBox);
	//在https环境下swiper初始化失败，故延迟100ms执行；http没事
	//可能是因为在https环境下加载后台返回http的图片会出现警告，
	setTimeout(function() {
		topSwiper();
	}, 100)

	//获取中间按钮文字与跳转链接后的flag，插到第一个的后面，最后一个也是固定的
	//2017年12月29日 11:18:27 再加一个固定的办信用卡
	dataBox = '';
	$.each(loanList, function(i) {
		dataBox += '<a class="nb_item" href="list.html?flag=' + i + '"><img src="images/index/icon_' + (i + 2) + '.png" alt="' + loanList[i].typeName + '"/><span>' + loanList[i].typeName + '</span></a>'
	})
	$('.nb_item.act').after(dataBox)

	//加载推荐贷款列表
	$('.index .productList').empty().append(loanListFuc(recomLoanList))

	//数据加载完成后显示界面
	$('.hd-noLoad').hide();
	$('.hd-hasLoad').show();
}

//进行过调查问卷才进入首页，否则跳到调查页面,通过token来判断，token为0的话说明是直接跳过问卷到首页的
//if(!token) {
//	window.location.href = 'questionnaire.html'
//} else {
//	if(token == '0') {
//		token = '';
//		deleteCookie('token')
//	}
//	url = apiDomain + '/home/v2?token=' + token;
//	loadData(url, true, successFunc);
//}

url = apiDomain + '/home/v2?token=' + token;
loadData(url, true, successFunc);

goTop()

//分享的内容
wxShare('宜融贷超市', 'https://api.51app.cn/loanpage/v1.0.0/index.html', 'https://api.51app.cn/loanpage/v1.0.0/images/logo.png', '宜融贷是一款借款、贷款机构合集的应用平台。')

//第一次进入首页则弹pos机弹窗
if(!getCookie('isPos')) {
	$('.result').show()
	setCookie('isPos', '1', 30)
}
//原为额度结果弹窗，后首页要用就直接复制过来了，有时间再封装
$('body').off('click', '.ro-2_2', function() {}).on('click', '.ro-2_2', function() {
	window.location.href = 'getPosEnter.html?from=pop'
})
$('body').on('click', '.ro-2_1', function() {
	$('.result').hide()
})

//首页贷款按钮添加小红点，点击一次后消失
if(!getCookie('isClickCreditCard') || getCookie('isClickCreditCard') != 1) {
	$('.nb_item2').addClass('redPoint')
} else {
	$('.nb_item2').removeClass('redPoint')
}
$('body').on('click', '.nb_item2', function() {
	$('.nb_item2').removeClass('redPoint')
	setCookie('isClickCreditCard', 1, 15)
})