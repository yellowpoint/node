//基础公共库环境变量管理存放路径
var config = {
	project: {
		name: 'static-tdd-uni',
		clean: 'true',
		pack: 'uni'
	},
	reources: [],

	dev: {
		properties: {
			'//api-tdd.51app.cn': '//192.168.119.120:9240'
		}
	},
	pro: {
		properties: {
			'//192.168.119.120:9240': '//api-tdd.51app.cn'
		}
	}
};

for(var key in config) {
	exports[key] = config[key];
}