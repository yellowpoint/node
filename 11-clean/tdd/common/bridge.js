//与安卓IOS通信
const setupWebViewJavascriptBridge = function(callback) {
	if(window.WebViewJavascriptBridge) {
		return callback(WebViewJavascriptBridge);
	}
	if(window.WVJBCallbacks) {
		return window.WVJBCallbacks.push(callback);
	}
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() {
		document.documentElement.removeChild(WVJBIframe)
	}, 0)
}

//var params = {'order_no':'201511120981234','channel':'wx','amount':1,'subject':'粉色外套'};
const sending = function(params) {
	setupWebViewJavascriptBridge(function(bridge) {
		bridge.registerHandler('testJSFunction', function(data, responseCallback) {
			conosle('JS方法被调用:' + data);
			responseCallback('js执行过了');
		})
	})
	try {
		if(params != undefined) {
			window.webkit.messageHandlers.bridge.postMessage(params)
		}
	} catch(e) {
		console.log(params)
	}
}

export {
	sending
}