import Vue from 'vue'
// 添加图片后缀，如果添加后图片不存在则使用原图，如果原图不存在则使用图片默认图
Vue.directive('img', async function(el, binding) {
	let imgURL = binding.value; //获取图片地址
	let size = 180;
	let suffix
	if(imgURL.indexOf('bao')!=-1){
		suffix = imgURL + `_${size}x${size}.jpg`
	}
	if (imgURL) {
		let exist = await imageIsExist(suffix);
		if (exist) {
			el.setAttribute('src', suffix);
		} else {
			let exist2 = await imageIsExist(imgURL);
			if (exist2) {
				el.setAttribute('src', imgURL);
			} else {
				el.setAttribute('src', require('@/static/errorImage.jpg'));

			}

		}
	}
})
/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function(url) {
	return new Promise((resolve) => {
		var img = new Image();
		img.onload = function() {
			if (this.complete == true && this.width > 2) {
				resolve(true);
			} else {
				resolve(false);
			}
			img = null;
		}
		img.onerror = function() {
			resolve(false);
			img = null;
		}
		img.src = url;
	})
}

export default {}
