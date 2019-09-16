function observe(e, t, n) {
	for(var i = 0, a = t.length; i < a; i++) {
		watch(e, t[i], n)
	}
}

function watch(e, t, n) {
	Object.defineProperty(e, t, {
		get: function() {
			return this["__" + t]
		},
		set: function(e) {
			e !== this["__" + t] && (this["__" + t] = e, n())
		}
	})
}! function(e) {
	"use strict";
	var t = document,
		n = "getElementsByClassName",
		i = function(e) {
			return t.querySelectorAll(e)
		},
		a = {
			type: 0,
			shade: !0,
			shadeClose: !0,
			fixed: !0,
			anim: "scale"
		},
		r = {
			extend: function(e) {
				var t = JSON.parse(JSON.stringify(a));
				for(var n in e) t[n] = e[n];
				return t
			},
			timer: {},
			end: {}
		};
	r.touch = function(e, t) {
		e.addEventListener("click", function(e) {
			t.call(this, e)
		}, !1)
	};
	var o = 0,
		s = ["layui-m-layer"],
		l = function(e) {
			var t = this;
			t.config = r.extend(e), t.view()
		};
	l.prototype.view = function() {
		var e = this,
			a = e.config,
			r = t.createElement("div");
		e.id = r.id = s[0] + o, r.setAttribute("class", s[0] + " " + s[0] + (a.type || 0)), r.setAttribute("index", o);
		var l = function() {
				var e = "object" == typeof a.title;
				return a.title ? '<h3 style="' + (e ? a.title[1] : "") + '">' + (e ? a.title[0] : a.title) + "</h3>" : ""
			}(),
			d = function() {
				"string" == typeof a.btn && (a.btn = [a.btn]);
				var e, t = (a.btn || []).length;
				return 0 !== t && a.btn ? (e = '<span yes type="1">' + a.btn[0] + "</span>", 2 === t && (e = '<span no type="0">' + a.btn[1] + "</span>" + e), '<div class="layui-m-layerbtn">' + e + "</div>") : ""
			}();
		if(a.fixed || (a.top = a.hasOwnProperty("top") ? a.top : 100, a.style = a.style || "", a.style += " top:" + (t.body.scrollTop + a.top) + "px"), 2 === a.type && (a.content = '<i></i><i class="layui-m-layerload"></i><i></i><p>' + (a.content || "") + "</p>"), a.skin && (a.anim = "up"), "msg" === a.skin && (a.shade = !1), r.innerHTML = (a.shade ? "<div " + ("string" == typeof a.shade ? 'style="' + a.shade + '"' : "") + ' class="layui-m-layershade"></div>' : "") + '<div class="layui-m-layermain" ' + (a.fixed ? "" : 'style="position:static;"') + '><div class="layui-m-layersection"><div class="layui-m-layerchild ' + (a.skin ? "layui-m-layer-" + a.skin + " " : "") + (a.className ? a.className : "") + " " + (a.anim ? "layui-m-anim-" + a.anim : "") + '" ' + (a.style ? 'style="' + a.style + '"' : "") + ">" + l + '<div class="layui-m-layercont">' + a.content + "</div>" + d + "</div></div></div>", !a.type || 2 === a.type) {
			var c = t[n](s[0] + a.type);
			c.length >= 1 && layer.close(c[0].getAttribute("index"))
		}
		document.body.appendChild(r);
		var u = e.elem = i("#" + e.id)[0];
		a.success && a.success(u), e.index = o++, e.action(a, u)
	}, l.prototype.action = function(e, t) {
		var i = this;
		e.time && (r.timer[i.index] = setTimeout(function() {
			layer.close(i.index)
		}, 1e3 * e.time));
		var a = function() {
			0 == this.getAttribute("type") ? (e.no && e.no(), layer.close(i.index)) : e.yes ? e.yes(i.index) : layer.close(i.index)
		};
		if(e.btn)
			for(var o = t[n]("layui-m-layerbtn")[0].children, s = o.length, l = 0; s > l; l += 1) r.touch(o[l], a);
		if(e.shade && e.shadeClose) {
			var d = t[n]("layui-m-layershade")[0];
			r.touch(d, function() {
				layer.close(i.index, e.end)
			})
		}
		e.end && (r.end[i.index] = e.end)
	}, e.layer = {
		v: "2.0",
		index: o,
		open: function(e) {
			return new l(e || {}).index
		},
		close: function(e) {
			var n = i("#" + s[0] + e)[0];
			n && (n.innerHTML = "", t.body.removeChild(n), clearTimeout(r.timer[e]), delete r.timer[e], "function" == typeof r.end[e] && r.end[e](), delete r.end[e])
		},
		closeAll: function() {
			for(var e = t[n](s[0]), i = 0, a = e.length; a > i; i += 1) layer.close(0 | e[0].getAttribute("index"))
		}
	}, "function" == typeof define ? define(function() {
		return layer
	}) : function() {
		var e = document.scripts,
			n = e[e.length - 1],
			i = n.src,
			a = i.substring(0, i.lastIndexOf("/") + 1);
		n.getAttribute("merge") || document.head.appendChild(function() {
			var e = t.createElement("link");
//			return e.href = a + "../css/layer.css?2.0", e.type = "text/css", e.rel = "styleSheet", e.id = "layermcss", e
			return e
		}())
	}()
}(window),
function() {
	"use strict";

	function e(t, i) {
		var a;
		if(i = i || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = i.touchBoundary || 10, this.layer = t, this.tapDelay = i.tapDelay || 200, this.tapTimeout = i.tapTimeout || 700, !e.notNeeded(t)) {
			for(var r = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], o = this, s = 0, l = r.length; l > s; s++) o[r[s]] = function(e, t) {
				return function() {
					return e.apply(t, arguments)
				}
			}(o[r[s]], o);
			n && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0)), t.addEventListener("click", this.onClick, !0), t.addEventListener("touchstart", this.onTouchStart, !1), t.addEventListener("touchmove", this.onTouchMove, !1), t.addEventListener("touchend", this.onTouchEnd, !1), t.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (t.removeEventListener = function(e, n, i) {
				var a = Node.prototype.removeEventListener;
				"click" === e ? a.call(t, e, n.hijacked || n, i) : a.call(t, e, n, i)
			}, t.addEventListener = function(e, n, i) {
				var a = Node.prototype.addEventListener;
				"click" === e ? a.call(t, e, n.hijacked || (n.hijacked = function(e) {
					e.propagationStopped || n(e)
				}), i) : a.call(t, e, n, i)
			}), "function" == typeof t.onclick && (a = t.onclick, t.addEventListener("click", function(e) {
				a(e)
			}, !1), t.onclick = null)
		}
	}
	var t = navigator.userAgent.indexOf("Windows Phone") >= 0,
		n = navigator.userAgent.indexOf("Android") > 0 && !t,
		i = /iP(ad|hone|od)/.test(navigator.userAgent) && !t,
		a = i && /OS 4_\d(_\d)?/.test(navigator.userAgent),
		r = i && /OS [6-7]_\d/.test(navigator.userAgent),
		o = navigator.userAgent.indexOf("BB10") > 0;
	e.prototype.needsClick = function(e) {
		switch(e.nodeName.toLowerCase()) {
			case "button":
			case "select":
			case "textarea":
				if(e.disabled) return !0;
				break;
			case "input":
				if(i && "file" === e.type || e.disabled) return !0;
				break;
			case "label":
			case "iframe":
			case "video":
				return !0
		}
		return /\bneedsclick\b/.test(e.className)
	}, e.prototype.needsFocus = function(e) {
		switch(e.nodeName.toLowerCase()) {
			case "textarea":
				return !0;
			case "select":
				return !n;
			case "input":
				switch(e.type) {
					case "button":
					case "checkbox":
					case "file":
					case "image":
					case "radio":
					case "submit":
						return !1
				}
				return !e.disabled && !e.readOnly;
			default:
				return /\bneedsfocus\b/.test(e.className)
		}
	}, e.prototype.sendClick = function(e, t) {
		var n, i;
		document.activeElement && document.activeElement !== e && document.activeElement.blur(), i = t.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(e), !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, e.dispatchEvent(n)
	}, e.prototype.determineEventType = function(e) {
		return n && "select" === e.tagName.toLowerCase() ? "mousedown" : "click"
	}, e.prototype.focus = function(e) {
		var t;
		i && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type && "month" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
	}, e.prototype.updateScrollParent = function(e) {
		var t, n;
		if(!(t = e.fastClickScrollParent) || !t.contains(e)) {
			n = e;
			do {
				if(n.scrollHeight > n.offsetHeight) {
					t = n, e.fastClickScrollParent = n;
					break
				}
				n = n.parentElement
			} while (n)
		}
		t && (t.fastClickLastScrollTop = t.scrollTop)
	}, e.prototype.getTargetElementFromEventTarget = function(e) {
		return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
	}, e.prototype.onTouchStart = function(e) {
		var t, n, r;
		if(e.targetTouches.length > 1) return !0;
		if(t = this.getTargetElementFromEventTarget(e.target), n = e.targetTouches[0], i) {
			if(r = window.getSelection(), r.rangeCount && !r.isCollapsed) return !0;
			if(!a) {
				if(n.identifier && n.identifier === this.lastTouchIdentifier) return e.preventDefault(), !1;
				this.lastTouchIdentifier = n.identifier, this.updateScrollParent(t)
			}
		}
		return this.trackingClick = !0, this.trackingClickStart = e.timeStamp, this.targetElement = t, this.touchStartX = n.pageX, this.touchStartY = n.pageY, e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(), !0
	}, e.prototype.touchHasMoved = function(e) {
		var t = e.changedTouches[0],
			n = this.touchBoundary;
		return Math.abs(t.pageX - this.touchStartX) > n || Math.abs(t.pageY - this.touchStartY) > n
	}, e.prototype.onTouchMove = function(e) {
		return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1, this.targetElement = null), !0)
	}, e.prototype.findControl = function(e) {
		return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
	}, e.prototype.onTouchEnd = function(e) {
		var t, o, s, l, d, c = this.targetElement;
		if(!this.trackingClick) return !0;
		if(e.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
		if(e.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
		if(this.cancelNextClick = !1, this.lastClickTime = e.timeStamp, o = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, r && (d = e.changedTouches[0], c = document.elementFromPoint(d.pageX - window.pageXOffset, d.pageY - window.pageYOffset) || c, c.fastClickScrollParent = this.targetElement.fastClickScrollParent), "label" === (s = c.tagName.toLowerCase())) {
			if(t = this.findControl(c)) {
				if(this.focus(c), n) return !1;
				c = t
			}
		} else if(this.needsFocus(c)) return e.timeStamp - o > 100 || i && window.top !== window && "input" === s ? (this.targetElement = null, !1) : (this.focus(c), this.sendClick(c, e), i && "select" === s || (this.targetElement = null, e.preventDefault()), !1);
		return !(!i || a || !(l = c.fastClickScrollParent) || l.fastClickLastScrollTop === l.scrollTop) || (this.needsClick(c) || (e.preventDefault(), this.sendClick(c, e)), !1)
	}, e.prototype.onTouchCancel = function() {
		this.trackingClick = !1, this.targetElement = null
	}, e.prototype.onMouse = function(e) {
		return !this.targetElement || (!!e.forwardedTouchEvent || (!(e.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick)) || (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1)))
	}, e.prototype.onClick = function(e) {
		var t;
		return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === e.target.type && 0 === e.detail || (t = this.onMouse(e), t || (this.targetElement = null), t)
	}, e.prototype.destroy = function() {
		var e = this.layer;
		n && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)), e.removeEventListener("click", this.onClick, !0), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1), e.removeEventListener("touchend", this.onTouchEnd, !1), e.removeEventListener("touchcancel", this.onTouchCancel, !1)
	}, e.notNeeded = function(e) {
		var t, i, a;
		if(void 0 === window.ontouchstart) return !0;
		if(i = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
			if(!n) return !0;
			if(t = document.querySelector("meta[name=viewport]")) {
				if(-1 !== t.content.indexOf("user-scalable=no")) return !0;
				if(i > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
			}
		}
		if(o && (a = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), a[1] >= 10 && a[2] >= 3 && (t = document.querySelector("meta[name=viewport]")))) {
			if(-1 !== t.content.indexOf("user-scalable=no")) return !0;
			if(document.documentElement.scrollWidth <= window.outerWidth) return !0
		}
		return "none" === e.style.msTouchAction || "manipulation" === e.style.touchAction || (!!(+(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1] >= 27 && (t = document.querySelector("meta[name=viewport]")) && (-1 !== t.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) || ("none" === e.style.touchAction || "manipulation" === e.style.touchAction))
	}, e.attach = function(t, n) {
		return new e(t, n)
	}, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
		return e
	}) : "undefined" != typeof module && module.exports ? (module.exports = e.attach, module.exports.FastClick = e) : window.FastClick = e
}(),
function(e) {
	if("object" == typeof exports && "undefined" != typeof module) module.exports = e();
	else if("function" == typeof define && define.amd) define([], e);
	else {
		var t;
		"undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self), t.html2canvas = e()
	}
}(function() {
	var e;
	return function e(t, n, i) {
		function a(o, s) {
			if(!n[o]) {
				if(!t[o]) {
					var l = "function" == typeof require && require;
					if(!s && l) return l(o, !0);
					if(r) return r(o, !0);
					var d = new Error("Cannot find module '" + o + "'");
					throw d.code = "MODULE_NOT_FOUND", d
				}
				var c = n[o] = {
					exports: {}
				};
				t[o][0].call(c.exports, function(e) {
					var n = t[o][1][e];
					return a(n || e)
				}, c, c.exports, e, t, n, i)
			}
			return n[o].exports
		}
		for(var r = "function" == typeof require && require, o = 0; o < i.length; o++) a(i[o]);
		return a
	}({
		1: [function(t, n, i) {
			(function(t) {
				! function(a) {
					function r(e) {
						throw RangeError(R[e])
					}

					function o(e, t) {
						for(var n = e.length; n--;) e[n] = t(e[n]);
						return e
					}

					function s(e, t) {
						return o(e.split(A), t).join(".")
					}

					function l(e) {
						for(var t, n, i = [], a = 0, r = e.length; a < r;) t = e.charCodeAt(a++), t >= 55296 && t <= 56319 && a < r ? (n = e.charCodeAt(a++), 56320 == (64512 & n) ? i.push(((1023 & t) << 10) + (1023 & n) + 65536) : (i.push(t), a--)) : i.push(t);
						return i
					}

					function d(e) {
						return o(e, function(e) {
							var t = "";
							return e > 65535 && (e -= 65536, t += N(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t += N(e)
						}).join("")
					}

					function c(e) {
						return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : S
					}

					function u(e, t) {
						return e + 22 + 75 * (e < 26) - ((0 != t) << 5)
					}

					function p(e, t, n) {
						var i = 0;
						for(e = n ? B(e / P) : e >> 1, e += B(e / t); e > O * E >> 1; i += S) e = B(e / O);
						return B(i + (O + 1) * e / (e + M))
					}

					function h(e) {
						var t, n, i, a, o, s, l, u, h, m, f = [],
							g = e.length,
							v = 0,
							w = k,
							y = I;
						for(n = e.lastIndexOf(D), n < 0 && (n = 0), i = 0; i < n; ++i) e.charCodeAt(i) >= 128 && r("not-basic"), f.push(e.charCodeAt(i));
						for(a = n > 0 ? n + 1 : 0; a < g;) {
							for(o = v, s = 1, l = S; a >= g && r("invalid-input"), u = c(e.charCodeAt(a++)), (u >= S || u > B((T - v) / s)) && r("overflow"), v += u * s, h = l <= y ? C : l >= y + E ? E : l - y, !(u < h); l += S) m = S - h, s > B(T / m) && r("overflow"), s *= m;
							t = f.length + 1, y = p(v - o, t, 0 == o), B(v / t) > T - w && r("overflow"), w += B(v / t), v %= t, f.splice(v++, 0, w)
						}
						return d(f)
					}

					function m(e) {
						var t, n, i, a, o, s, d, c, h, m, f, g, v, w, y, x = [];
						for(e = l(e), g = e.length, t = k, n = 0, o = I, s = 0; s < g; ++s)(f = e[s]) < 128 && x.push(N(f));
						for(i = a = x.length, a && x.push(D); i < g;) {
							for(d = T, s = 0; s < g; ++s)(f = e[s]) >= t && f < d && (d = f);
							for(v = i + 1, d - t > B((T - n) / v) && r("overflow"), n += (d - t) * v, t = d, s = 0; s < g; ++s)
								if(f = e[s], f < t && ++n > T && r("overflow"), f == t) {
									for(c = n, h = S; m = h <= o ? C : h >= o + E ? E : h - o, !(c < m); h += S) y = c - m, w = S - m, x.push(N(u(m + y % w, 0))), c = B(y / w);
									x.push(N(u(c, 0))), o = p(n, v, i == a), n = 0, ++i
								}++n, ++t
						}
						return x.join("")
					}

					function f(e) {
						return s(e, function(e) {
							return L.test(e) ? h(e.slice(4).toLowerCase()) : e
						})
					}

					function g(e) {
						return s(e, function(e) {
							return z.test(e) ? "xn--" + m(e) : e
						})
					}
					var v = "object" == typeof i && i,
						w = "object" == typeof n && n && n.exports == v && n,
						y = "object" == typeof t && t;
					y.global !== y && y.window !== y || (a = y);
					var x, b, T = 2147483647,
						S = 36,
						C = 1,
						E = 26,
						M = 38,
						P = 700,
						I = 72,
						k = 128,
						D = "-",
						L = /^xn--/,
						z = /[^ -~]/,
						A = /\x2E|\u3002|\uFF0E|\uFF61/g,
						R = {
							overflow: "Overflow: input needs wider integers to process",
							"not-basic": "Illegal input >= 0x80 (not a basic code point)",
							"invalid-input": "Invalid input"
						},
						O = S - C,
						B = Math.floor,
						N = String.fromCharCode;
					if(x = {
							version: "1.2.4",
							ucs2: {
								decode: l,
								encode: d
							},
							decode: h,
							encode: m,
							toASCII: g,
							toUnicode: f
						}, "function" == typeof e && "object" == typeof e.amd && e.amd) e("punycode", function() {
						return x
					});
					else if(v && !v.nodeType)
						if(w) w.exports = x;
						else
							for(b in x) x.hasOwnProperty(b) && (v[b] = x[b]);
					else a.punycode = x
				}(this)
			}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {}],
		2: [function(e, t, n) {
			function i(e, t, n) {
				!e.defaultView || t === e.defaultView.pageXOffset && n === e.defaultView.pageYOffset || e.defaultView.scrollTo(t, n)
			}

			function a(e, t) {
				try {
					t && (t.width = e.width, t.height = e.height, t.getContext("2d").putImageData(e.getContext("2d").getImageData(0, 0, e.width, e.height), 0, 0))
				} catch(t) {
					s("Unable to copy canvas content from", e, t)
				}
			}

			function r(e, t) {
				for(var n = 3 === e.nodeType ? document.createTextNode(e.nodeValue) : e.cloneNode(!1), i = e.firstChild; i;) !0 !== t && 1 === i.nodeType && "SCRIPT" === i.nodeName || n.appendChild(r(i, t)), i = i.nextSibling;
				return 1 === e.nodeType && (n._scrollTop = e.scrollTop, n._scrollLeft = e.scrollLeft, "CANVAS" === e.nodeName ? a(e, n) : "TEXTAREA" !== e.nodeName && "SELECT" !== e.nodeName || (n.value = e.value)), n
			}

			function o(e) {
				if(1 === e.nodeType) {
					e.scrollTop = e._scrollTop, e.scrollLeft = e._scrollLeft;
					for(var t = e.firstChild; t;) o(t), t = t.nextSibling
				}
			}
			var s = e("./log");
			t.exports = function(e, t, n, a, s, l, d) {
				var c = r(e.documentElement, s.javascriptEnabled),
					u = t.createElement("iframe");
				return u.className = "html2canvas-container", u.style.visibility = "hidden", u.style.position = "fixed", u.style.left = "-10000px", u.style.top = "0px", u.style.border = "0", u.width = n, u.height = a, u.scrolling = "no", t.body.appendChild(u), new Promise(function(t) {
					var n = u.contentWindow.document;
					u.contentWindow.onload = u.onload = function() {
						var e = setInterval(function() {
							n.body.childNodes.length > 0 && (o(n.documentElement), clearInterval(e), "view" === s.type && (u.contentWindow.scrollTo(l, d), !/(iPad|iPhone|iPod)/g.test(navigator.userAgent) || u.contentWindow.scrollY === d && u.contentWindow.scrollX === l || (n.documentElement.style.top = -d + "px", n.documentElement.style.left = -l + "px", n.documentElement.style.position = "absolute")), t(u))
						}, 50)
					}, n.open(), n.write("<!DOCTYPE html><html></html>"), i(e, l, d), n.replaceChild(n.adoptNode(c), n.documentElement), n.close()
				})
			}
		}, {
			"./log": 13
		}],
		3: [function(e, t, n) {
			function i(e) {
				this.r = 0, this.g = 0, this.b = 0, this.a = null;
				this.fromArray(e) || this.namedColor(e) || this.rgb(e) || this.rgba(e) || this.hex6(e) || this.hex3(e)
			}
			i.prototype.darken = function(e) {
				var t = 1 - e;
				return new i([Math.round(this.r * t), Math.round(this.g * t), Math.round(this.b * t), this.a])
			}, i.prototype.isTransparent = function() {
				return 0 === this.a
			}, i.prototype.isBlack = function() {
				return 0 === this.r && 0 === this.g && 0 === this.b
			}, i.prototype.fromArray = function(e) {
				return Array.isArray(e) && (this.r = Math.min(e[0], 255), this.g = Math.min(e[1], 255), this.b = Math.min(e[2], 255), e.length > 3 && (this.a = e[3])), Array.isArray(e)
			};
			i.prototype.hex3 = function(e) {
				var t = null;
				return null !== (t = e.match(/^#([a-f0-9]{3})$/i)) && (this.r = parseInt(t[1][0] + t[1][0], 16), this.g = parseInt(t[1][1] + t[1][1], 16), this.b = parseInt(t[1][2] + t[1][2], 16)), null !== t
			};
			i.prototype.hex6 = function(e) {
				var t = null;
				return null !== (t = e.match(/^#([a-f0-9]{6})$/i)) && (this.r = parseInt(t[1].substring(0, 2), 16), this.g = parseInt(t[1].substring(2, 4), 16), this.b = parseInt(t[1].substring(4, 6), 16)), null !== t
			};
			i.prototype.rgb = function(e) {
				var t = null;
				return null !== (t = e.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/)) && (this.r = Number(t[1]), this.g = Number(t[2]), this.b = Number(t[3])), null !== t
			};
			i.prototype.rgba = function(e) {
				var t = null;
				return null !== (t = e.match(/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/)) && (this.r = Number(t[1]), this.g = Number(t[2]), this.b = Number(t[3]), this.a = Number(t[4])), null !== t
			}, i.prototype.toString = function() {
				return null !== this.a && 1 !== this.a ? "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" : "rgb(" + [this.r, this.g, this.b].join(",") + ")"
			}, i.prototype.namedColor = function(e) {
				e = e.toLowerCase();
				var t = a[e];
				if(t) this.r = t[0], this.g = t[1], this.b = t[2];
				else if("transparent" === e) return this.r = this.g = this.b = this.a = 0, !0;
				return !!t
			}, i.prototype.isColor = !0;
			var a = {
				aliceblue: [240, 248, 255],
				antiquewhite: [250, 235, 215],
				aqua: [0, 255, 255],
				aquamarine: [127, 255, 212],
				azure: [240, 255, 255],
				beige: [245, 245, 220],
				bisque: [255, 228, 196],
				black: [0, 0, 0],
				blanchedalmond: [255, 235, 205],
				blue: [0, 0, 255],
				blueviolet: [138, 43, 226],
				brown: [165, 42, 42],
				burlywood: [222, 184, 135],
				cadetblue: [95, 158, 160],
				chartreuse: [127, 255, 0],
				chocolate: [210, 105, 30],
				coral: [255, 127, 80],
				cornflowerblue: [100, 149, 237],
				cornsilk: [255, 248, 220],
				crimson: [220, 20, 60],
				cyan: [0, 255, 255],
				darkblue: [0, 0, 139],
				darkcyan: [0, 139, 139],
				darkgoldenrod: [184, 134, 11],
				darkgray: [169, 169, 169],
				darkgreen: [0, 100, 0],
				darkgrey: [169, 169, 169],
				darkkhaki: [189, 183, 107],
				darkmagenta: [139, 0, 139],
				darkolivegreen: [85, 107, 47],
				darkorange: [255, 140, 0],
				darkorchid: [153, 50, 204],
				darkred: [139, 0, 0],
				darksalmon: [233, 150, 122],
				darkseagreen: [143, 188, 143],
				darkslateblue: [72, 61, 139],
				darkslategray: [47, 79, 79],
				darkslategrey: [47, 79, 79],
				darkturquoise: [0, 206, 209],
				darkviolet: [148, 0, 211],
				deeppink: [255, 20, 147],
				deepskyblue: [0, 191, 255],
				dimgray: [105, 105, 105],
				dimgrey: [105, 105, 105],
				dodgerblue: [30, 144, 255],
				firebrick: [178, 34, 34],
				floralwhite: [255, 250, 240],
				forestgreen: [34, 139, 34],
				fuchsia: [255, 0, 255],
				gainsboro: [220, 220, 220],
				ghostwhite: [248, 248, 255],
				gold: [255, 215, 0],
				goldenrod: [218, 165, 32],
				gray: [128, 128, 128],
				green: [0, 128, 0],
				greenyellow: [173, 255, 47],
				grey: [128, 128, 128],
				honeydew: [240, 255, 240],
				hotpink: [255, 105, 180],
				indianred: [205, 92, 92],
				indigo: [75, 0, 130],
				ivory: [255, 255, 240],
				khaki: [240, 230, 140],
				lavender: [230, 230, 250],
				lavenderblush: [255, 240, 245],
				lawngreen: [124, 252, 0],
				lemonchiffon: [255, 250, 205],
				lightblue: [173, 216, 230],
				lightcoral: [240, 128, 128],
				lightcyan: [224, 255, 255],
				lightgoldenrodyellow: [250, 250, 210],
				lightgray: [211, 211, 211],
				lightgreen: [144, 238, 144],
				lightgrey: [211, 211, 211],
				lightpink: [255, 182, 193],
				lightsalmon: [255, 160, 122],
				lightseagreen: [32, 178, 170],
				lightskyblue: [135, 206, 250],
				lightslategray: [119, 136, 153],
				lightslategrey: [119, 136, 153],
				lightsteelblue: [176, 196, 222],
				lightyellow: [255, 255, 224],
				lime: [0, 255, 0],
				limegreen: [50, 205, 50],
				linen: [250, 240, 230],
				magenta: [255, 0, 255],
				maroon: [128, 0, 0],
				mediumaquamarine: [102, 205, 170],
				mediumblue: [0, 0, 205],
				mediumorchid: [186, 85, 211],
				mediumpurple: [147, 112, 219],
				mediumseagreen: [60, 179, 113],
				mediumslateblue: [123, 104, 238],
				mediumspringgreen: [0, 250, 154],
				mediumturquoise: [72, 209, 204],
				mediumvioletred: [199, 21, 133],
				midnightblue: [25, 25, 112],
				mintcream: [245, 255, 250],
				mistyrose: [255, 228, 225],
				moccasin: [255, 228, 181],
				navajowhite: [255, 222, 173],
				navy: [0, 0, 128],
				oldlace: [253, 245, 230],
				olive: [128, 128, 0],
				olivedrab: [107, 142, 35],
				orange: [255, 165, 0],
				orangered: [255, 69, 0],
				orchid: [218, 112, 214],
				palegoldenrod: [238, 232, 170],
				palegreen: [152, 251, 152],
				paleturquoise: [175, 238, 238],
				palevioletred: [219, 112, 147],
				papayawhip: [255, 239, 213],
				peachpuff: [255, 218, 185],
				peru: [205, 133, 63],
				pink: [255, 192, 203],
				plum: [221, 160, 221],
				powderblue: [176, 224, 230],
				purple: [128, 0, 128],
				rebeccapurple: [102, 51, 153],
				red: [255, 0, 0],
				rosybrown: [188, 143, 143],
				royalblue: [65, 105, 225],
				saddlebrown: [139, 69, 19],
				salmon: [250, 128, 114],
				sandybrown: [244, 164, 96],
				seagreen: [46, 139, 87],
				seashell: [255, 245, 238],
				sienna: [160, 82, 45],
				silver: [192, 192, 192],
				skyblue: [135, 206, 235],
				slateblue: [106, 90, 205],
				slategray: [112, 128, 144],
				slategrey: [112, 128, 144],
				snow: [255, 250, 250],
				springgreen: [0, 255, 127],
				steelblue: [70, 130, 180],
				tan: [210, 180, 140],
				teal: [0, 128, 128],
				thistle: [216, 191, 216],
				tomato: [255, 99, 71],
				turquoise: [64, 224, 208],
				violet: [238, 130, 238],
				wheat: [245, 222, 179],
				white: [255, 255, 255],
				whitesmoke: [245, 245, 245],
				yellow: [255, 255, 0],
				yellowgreen: [154, 205, 50]
			};
			t.exports = i
		}, {}],
		4: [function(t, n, i) {
			function a(e, t) {
				var n = S++;
				if(t = t || {}, t.logging && (v.options.logging = !0, v.options.start = Date.now()), t.async = void 0 === t.async || t.async, t.allowTaint = void 0 !== t.allowTaint && t.allowTaint, t.removeContainer = void 0 === t.removeContainer || t.removeContainer, t.javascriptEnabled = void 0 !== t.javascriptEnabled && t.javascriptEnabled, t.imageTimeout = void 0 === t.imageTimeout ? 1e4 : t.imageTimeout, t.renderer = "function" == typeof t.renderer ? t.renderer : h, t.strict = !!t.strict, "string" == typeof e) {
					if("string" != typeof t.proxy) return Promise.reject("Proxy must be used when rendering url");
					var i = null != t.width ? t.width : window.innerWidth,
						a = null != t.height ? t.height : window.innerHeight;
					return x(u(e), t.proxy, document, i, a, t).then(function(e) {
						return o(e.contentWindow.document.documentElement, e, t, i, a)
					})
				}
				var s = (void 0 === e ? [document.documentElement] : e.length ? e : [e])[0];
				return s.setAttribute(T + n, n), r(s.ownerDocument, t, s.ownerDocument.defaultView.innerWidth, s.ownerDocument.defaultView.innerHeight, n).then(function(e) {
					return "function" == typeof t.onrendered && (v("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"), t.onrendered(e)), e
				})
			}

			function r(e, t, n, i, a) {
				return y(e, e, n, i, t, e.defaultView.pageXOffset, e.defaultView.pageYOffset).then(function(r) {
					v("Document cloned");
					var s = T + a,
						l = "[" + s + "='" + a + "']";
					e.querySelector(l).removeAttribute(s);
					var d = r.contentWindow,
						c = d.document.querySelector(l);
					return("function" == typeof t.onclone ? Promise.resolve(t.onclone(d.document)) : Promise.resolve(!0)).then(function() {
						return o(c, r, t, n, i)
					})
				})
			}

			function o(e, t, n, i, a) {
				var r = t.contentWindow,
					o = new p(r.document),
					u = new m(n, o),
					h = b(e),
					g = "view" === n.type ? i : d(r.document),
					w = "view" === n.type ? a : c(r.document),
					y = new n.renderer(g, w, u, n, document);
				return new f(e, y, o, u, n).ready.then(function() {
					v("Finished rendering");
					var i;
					return i = "view" === n.type ? l(y.canvas, {
						width: y.canvas.width,
						height: y.canvas.height,
						top: 0,
						left: 0,
						x: 0,
						y: 0
					}) : e === r.document.body || e === r.document.documentElement || null != n.canvas ? y.canvas : l(y.canvas, {
						width: null != n.width ? n.width : h.width,
						height: null != n.height ? n.height : h.height,
						top: h.top,
						left: h.left,
						x: 0,
						y: 0
					}), s(t, n), i
				})
			}

			function s(e, t) {
				t.removeContainer && (e.parentNode.removeChild(e), v("Cleaned up container"))
			}

			function l(e, t) {
				var n = document.createElement("canvas"),
					i = Math.min(e.width - 1, Math.max(0, t.left)),
					a = Math.min(e.width, Math.max(1, t.left + t.width)),
					r = Math.min(e.height - 1, Math.max(0, t.top)),
					o = Math.min(e.height, Math.max(1, t.top + t.height));
				n.width = t.width, n.height = t.height;
				var s = a - i,
					l = o - r;
				return v("Cropping canvas at:", "left:", t.left, "top:", t.top, "width:", s, "height:", l), v("Resulting crop with width", t.width, "and height", t.height, "with x", i, "and y", r), n.getContext("2d").drawImage(e, i, r, s, l, t.x, t.y, s, l), n
			}

			function d(e) {
				return Math.max(Math.max(e.body.scrollWidth, e.documentElement.scrollWidth), Math.max(e.body.offsetWidth, e.documentElement.offsetWidth), Math.max(e.body.clientWidth, e.documentElement.clientWidth))
			}

			function c(e) {
				return Math.max(Math.max(e.body.scrollHeight, e.documentElement.scrollHeight), Math.max(e.body.offsetHeight, e.documentElement.offsetHeight), Math.max(e.body.clientHeight, e.documentElement.clientHeight))
			}

			function u(e) {
				var t = document.createElement("a");
				return t.href = e, t.href = t.href, t
			}
			var p = t("./support"),
				h = t("./renderers/canvas"),
				m = t("./imageloader"),
				f = t("./nodeparser"),
				g = t("./nodecontainer"),
				v = t("./log"),
				w = t("./utils"),
				y = t("./clone"),
				x = t("./proxy").loadUrlDocument,
				b = w.getBounds,
				T = "data-html2canvas-node",
				S = 0;
			a.CanvasRenderer = h, a.NodeContainer = g, a.log = v, a.utils = w;
			var C = "undefined" == typeof document || "function" != typeof Object.create || "function" != typeof document.createElement("canvas").getContext ? function() {
				return Promise.reject("No canvas support")
			} : a;
			n.exports = C, "function" == typeof e && e.amd && e("html2canvas", [], function() {
				return C
			})
		}, {
			"./clone": 2,
			"./imageloader": 11,
			"./log": 13,
			"./nodecontainer": 14,
			"./nodeparser": 15,
			"./proxy": 16,
			"./renderers/canvas": 20,
			"./support": 22,
			"./utils": 26
		}],
		5: [function(e, t, n) {
			function i(e) {
				if(this.src = e, a("DummyImageContainer for", e), !this.promise || !this.image) {
					a("Initiating DummyImageContainer"), i.prototype.image = new Image;
					var t = this.image;
					i.prototype.promise = new Promise(function(e, n) {
						t.onload = e, t.onerror = n, t.src = r(), !0 === t.complete && e(t)
					})
				}
			}
			var a = e("./log"),
				r = e("./utils").smallImage;
			t.exports = i
		}, {
			"./log": 13,
			"./utils": 26
		}],
		6: [function(e, t, n) {
			function i(e, t) {
				var n, i, r = document.createElement("div"),
					o = document.createElement("img"),
					s = document.createElement("span");
				r.style.visibility = "hidden", r.style.fontFamily = e, r.style.fontSize = t, r.style.margin = 0, r.style.padding = 0, document.body.appendChild(r), o.src = a(), o.width = 1, o.height = 1, o.style.margin = 0, o.style.padding = 0, o.style.verticalAlign = "baseline", s.style.fontFamily = e, s.style.fontSize = t, s.style.margin = 0, s.style.padding = 0, s.appendChild(document.createTextNode("Hidden Text")), r.appendChild(s), r.appendChild(o), n = o.offsetTop - s.offsetTop + 1, r.removeChild(s), r.appendChild(document.createTextNode("Hidden Text")), r.style.lineHeight = "normal", o.style.verticalAlign = "super", i = o.offsetTop - r.offsetTop + 1, document.body.removeChild(r), this.baseline = n, this.lineWidth = 1, this.middle = i
			}
			var a = e("./utils").smallImage;
			t.exports = i
		}, {
			"./utils": 26
		}],
		7: [function(e, t, n) {
			function i() {
				this.data = {}
			}
			var a = e("./font");
			i.prototype.getMetrics = function(e, t) {
				return void 0 === this.data[e + "-" + t] && (this.data[e + "-" + t] = new a(e, t)), this.data[e + "-" + t]
			}, t.exports = i
		}, {
			"./font": 6
		}],
		8: [function(e, t, n) {
			function i(t, n, i) {
				this.image = null, this.src = t;
				var a = this,
					o = r(t);
				this.promise = (n ? new Promise(function(e) {
					"about:blank" === t.contentWindow.document.URL || null == t.contentWindow.document.documentElement ? t.contentWindow.onload = t.onload = function() {
						e(t)
					} : e(t)
				}) : this.proxyLoad(i.proxy, o, i)).then(function(t) {
					return e("./core")(t.contentWindow.document.documentElement, {
						type: "view",
						width: t.width,
						height: t.height,
						proxy: i.proxy,
						javascriptEnabled: i.javascriptEnabled,
						removeContainer: i.removeContainer,
						allowTaint: i.allowTaint,
						imageTimeout: i.imageTimeout / 2
					})
				}).then(function(e) {
					return a.image = e
				})
			}
			var a = e("./utils"),
				r = a.getBounds,
				o = e("./proxy").loadUrlDocument;
			i.prototype.proxyLoad = function(e, t, n) {
				var i = this.src;
				return o(i.src, e, i.ownerDocument, t.width, t.height, n)
			}, t.exports = i
		}, {
			"./core": 4,
			"./proxy": 16,
			"./utils": 26
		}],
		9: [function(e, t, n) {
			function i(e) {
				this.src = e.value, this.colorStops = [], this.type = null, this.x0 = .5, this.y0 = .5, this.x1 = .5, this.y1 = .5, this.promise = Promise.resolve(!0)
			}
			i.TYPES = {
				LINEAR: 1,
				RADIAL: 2
			}, i.REGEXP_COLORSTOP = /^\s*(rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*[0-9\.]+)?\s*\)|[a-z]{3,20}|#[a-f0-9]{3,6})(?:\s+(\d{1,3}(?:\.\d+)?)(%|px)?)?(?:\s|$)/i, t.exports = i
		}, {}],
		10: [function(e, t, n) {
			function i(e, t) {
				this.src = e, this.image = new Image;
				var n = this;
				this.tainted = null, this.promise = new Promise(function(i, a) {
					n.image.onload = i, n.image.onerror = a, t && (n.image.crossOrigin = "anonymous"), n.image.src = e, !0 === n.image.complete && i(n.image)
				})
			}
			t.exports = i
		}, {}],
		11: [function(e, t, n) {
			function i(e, t) {
				this.link = null, this.options = e, this.support = t, this.origin = this.getOrigin(window.location.href)
			}
			var a = e("./log"),
				r = e("./imagecontainer"),
				o = e("./dummyimagecontainer"),
				s = e("./proxyimagecontainer"),
				l = e("./framecontainer"),
				d = e("./svgcontainer"),
				c = e("./svgnodecontainer"),
				u = e("./lineargradientcontainer"),
				p = e("./webkitgradientcontainer"),
				h = e("./utils").bind;
			i.prototype.findImages = function(e) {
				var t = [];
				return e.reduce(function(e, t) {
					switch(t.node.nodeName) {
						case "IMG":
							return e.concat([{
								args: [t.node.src],
								method: "url"
							}]);
						case "svg":
						case "IFRAME":
							return e.concat([{
								args: [t.node],
								method: t.node.nodeName
							}])
					}
					return e
				}, []).forEach(this.addImage(t, this.loadImage), this), t
			}, i.prototype.findBackgroundImage = function(e, t) {
				return t.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(e, this.loadImage), this), e
			}, i.prototype.addImage = function(e, t) {
				return function(n) {
					n.args.forEach(function(i) {
						this.imageExists(e, i) || (e.splice(0, 0, t.call(this, n)), a("Added image #" + e.length, "string" == typeof i ? i.substring(0, 100) : i))
					}, this)
				}
			}, i.prototype.hasImageBackground = function(e) {
				return "none" !== e.method
			}, i.prototype.loadImage = function(e) {
				if("url" === e.method) {
					var t = e.args[0];
					return !this.isSVG(t) || this.support.svg || this.options.allowTaint ? t.match(/data:image\/.*;base64,/i) ? new r(t.replace(/url\(['"]{0,}|['"]{0,}\)$/gi, ""), !1) : this.isSameOrigin(t) || !0 === this.options.allowTaint || this.isSVG(t) ? new r(t, !1) : this.support.cors && !this.options.allowTaint && this.options.useCORS ? new r(t, !0) : this.options.proxy ? new s(t, this.options.proxy) : new o(t) : new d(t)
				}
				return "linear-gradient" === e.method ? new u(e) : "gradient" === e.method ? new p(e) : "svg" === e.method ? new c(e.args[0], this.support.svg) : "IFRAME" === e.method ? new l(e.args[0], this.isSameOrigin(e.args[0].src), this.options) : new o(e)
			}, i.prototype.isSVG = function(e) {
				return "svg" === e.substring(e.length - 3).toLowerCase() || d.prototype.isInline(e)
			}, i.prototype.imageExists = function(e, t) {
				return e.some(function(e) {
					return e.src === t
				})
			}, i.prototype.isSameOrigin = function(e) {
				return this.getOrigin(e) === this.origin
			}, i.prototype.getOrigin = function(e) {
				var t = this.link || (this.link = document.createElement("a"));
				return t.href = e, t.href = t.href, t.protocol + t.hostname + t.port
			}, i.prototype.getPromise = function(e) {
				return this.timeout(e, this.options.imageTimeout).catch(function() {
					return new o(e.src).promise.then(function(t) {
						e.image = t
					})
				})
			}, i.prototype.get = function(e) {
				var t = null;
				return this.images.some(function(n) {
					return(t = n).src === e
				}) ? t : null
			}, i.prototype.fetch = function(e) {
				return this.images = e.reduce(h(this.findBackgroundImage, this), this.findImages(e)), this.images.forEach(function(e, t) {
					e.promise.then(function() {
						a("Succesfully loaded image #" + (t + 1), e)
					}, function(n) {
						a("Failed loading image #" + (t + 1), e, n)
					})
				}), this.ready = Promise.all(this.images.map(this.getPromise, this)), a("Finished searching images"), this
			}, i.prototype.timeout = function(e, t) {
				var n, i = Promise.race([e.promise, new Promise(function(i, r) {
					n = setTimeout(function() {
						a("Timed out loading image", e), r(e)
					}, t)
				})]).then(function(e) {
					return clearTimeout(n), e
				});
				return i.catch(function() {
					clearTimeout(n)
				}), i
			}, t.exports = i
		}, {
			"./dummyimagecontainer": 5,
			"./framecontainer": 8,
			"./imagecontainer": 10,
			"./lineargradientcontainer": 12,
			"./log": 13,
			"./proxyimagecontainer": 17,
			"./svgcontainer": 23,
			"./svgnodecontainer": 24,
			"./utils": 26,
			"./webkitgradientcontainer": 27
		}],
		12: [function(e, t, n) {
			function i(e) {
				a.apply(this, arguments), this.type = a.TYPES.LINEAR;
				var t = i.REGEXP_DIRECTION.test(e.args[0]) || !a.REGEXP_COLORSTOP.test(e.args[0]);
				t ? e.args[0].split(/\s+/).reverse().forEach(function(e, t) {
					switch(e) {
						case "left":
							this.x0 = 0, this.x1 = 1;
							break;
						case "top":
							this.y0 = 0, this.y1 = 1;
							break;
						case "right":
							this.x0 = 1, this.x1 = 0;
							break;
						case "bottom":
							this.y0 = 1, this.y1 = 0;
							break;
						case "to":
							var n = this.y0,
								i = this.x0;
							this.y0 = this.y1, this.x0 = this.x1, this.x1 = i, this.y1 = n;
							break;
						case "center":
							break;
						default:
							var a = .01 * parseFloat(e, 10);
							if(isNaN(a)) break;
							0 === t ? (this.y0 = a, this.y1 = 1 - this.y0) : (this.x0 = a, this.x1 = 1 - this.x0)
					}
				}, this) : (this.y0 = 0, this.y1 = 1), this.colorStops = e.args.slice(t ? 1 : 0).map(function(e) {
					var t = e.match(a.REGEXP_COLORSTOP),
						n = +t[2],
						i = 0 === n ? "%" : t[3];
					return {
						color: new r(t[1]),
						stop: "%" === i ? n / 100 : null
					}
				}), null === this.colorStops[0].stop && (this.colorStops[0].stop = 0), null === this.colorStops[this.colorStops.length - 1].stop && (this.colorStops[this.colorStops.length - 1].stop = 1), this.colorStops.forEach(function(e, t) {
					null === e.stop && this.colorStops.slice(t).some(function(n, i) {
						return null !== n.stop && (e.stop = (n.stop - this.colorStops[t - 1].stop) / (i + 1) + this.colorStops[t - 1].stop, !0)
					}, this)
				}, this)
			}
			var a = e("./gradientcontainer"),
				r = e("./color");
			i.prototype = Object.create(a.prototype), i.REGEXP_DIRECTION = /^\s*(?:to|left|right|top|bottom|center|\d{1,3}(?:\.\d+)?%?)(?:\s|$)/i, t.exports = i
		}, {
			"./color": 3,
			"./gradientcontainer": 9
		}],
		13: [function(e, t, n) {
			var i = function() {
				i.options.logging && window.console && window.console.log && Function.prototype.bind.call(window.console.log, window.console).apply(window.console, [Date.now() - i.options.start + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)))
			};
			i.options = {
				logging: !1
			}, t.exports = i
		}, {}],
		14: [function(e, t, n) {
			function i(e, t) {
				this.node = e, this.parent = t, this.stack = null, this.bounds = null, this.borders = null, this.clip = [], this.backgroundClip = [], this.offsetBounds = null, this.visible = null, this.computedStyles = null, this.colors = {}, this.styles = {}, this.backgroundImages = null, this.transformData = null, this.transformMatrix = null, this.isPseudoElement = !1, this.opacity = null
			}

			function a(e) {
				var t = e.options[e.selectedIndex || 0];
				return t ? t.text || "" : ""
			}

			function r(e) {
				if(e && "matrix" === e[1]) return e[2].split(",").map(function(e) {
					return parseFloat(e.trim())
				});
				if(e && "matrix3d" === e[1]) {
					var t = e[2].split(",").map(function(e) {
						return parseFloat(e.trim())
					});
					return [t[0], t[1], t[4], t[5], t[12], t[13]]
				}
			}

			function o(e) {
				return -1 !== e.toString().indexOf("%")
			}

			function s(e) {
				return e.replace("px", "")
			}

			function l(e) {
				return parseFloat(e)
			}
			var d = e("./color"),
				c = e("./utils"),
				u = c.getBounds,
				p = c.parseBackgrounds,
				h = c.offsetBounds;
			i.prototype.cloneTo = function(e) {
				e.visible = this.visible, e.borders = this.borders, e.bounds = this.bounds, e.clip = this.clip, e.backgroundClip = this.backgroundClip, e.computedStyles = this.computedStyles, e.styles = this.styles, e.backgroundImages = this.backgroundImages, e.opacity = this.opacity
			}, i.prototype.getOpacity = function() {
				return null === this.opacity ? this.opacity = this.cssFloat("opacity") : this.opacity
			}, i.prototype.assignStack = function(e) {
				this.stack = e, e.children.push(this)
			}, i.prototype.isElementVisible = function() {
				return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : "none" !== this.css("display") && "hidden" !== this.css("visibility") && !this.node.hasAttribute("data-html2canvas-ignore") && ("INPUT" !== this.node.nodeName || "hidden" !== this.node.getAttribute("type"))
			}, i.prototype.css = function(e) {
				return this.computedStyles || (this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null)), this.styles[e] || (this.styles[e] = this.computedStyles[e])
			}, i.prototype.prefixedCss = function(e) {
				var t = ["webkit", "moz", "ms", "o"],
					n = this.css(e);
				return void 0 === n && t.some(function(t) {
					return void 0 !== (n = this.css(t + e.substr(0, 1).toUpperCase() + e.substr(1)))
				}, this), void 0 === n ? null : n
			}, i.prototype.computedStyle = function(e) {
				return this.node.ownerDocument.defaultView.getComputedStyle(this.node, e)
			}, i.prototype.cssInt = function(e) {
				var t = parseInt(this.css(e), 10);
				return isNaN(t) ? 0 : t
			}, i.prototype.color = function(e) {
				return this.colors[e] || (this.colors[e] = new d(this.css(e)))
			}, i.prototype.cssFloat = function(e) {
				var t = parseFloat(this.css(e));
				return isNaN(t) ? 0 : t
			}, i.prototype.fontWeight = function() {
				var e = this.css("fontWeight");
				switch(parseInt(e, 10)) {
					case 401:
						e = "bold";
						break;
					case 400:
						e = "normal"
				}
				return e
			}, i.prototype.parseClip = function() {
				var e = this.css("clip").match(this.CLIP);
				return e ? {
					top: parseInt(e[1], 10),
					right: parseInt(e[2], 10),
					bottom: parseInt(e[3], 10),
					left: parseInt(e[4], 10)
				} : null
			}, i.prototype.parseBackgroundImages = function() {
				return this.backgroundImages || (this.backgroundImages = p(this.css("backgroundImage")))
			}, i.prototype.cssList = function(e, t) {
				var n = (this.css(e) || "").split(",");
				return n = n[t || 0] || n[0] || "auto", n = n.trim().split(" "), 1 === n.length && (n = [n[0], o(n[0]) ? "auto" : n[0]]), n
			}, i.prototype.parseBackgroundSize = function(e, t, n) {
				var i, a, r = this.cssList("backgroundSize", n);
				if(o(r[0])) i = e.width * parseFloat(r[0]) / 100;
				else {
					if(/contain|cover/.test(r[0])) {
						var s = e.width / e.height,
							l = t.width / t.height;
						return s < l ^ "contain" === r[0] ? {
							width: e.height * l,
							height: e.height
						} : {
							width: e.width,
							height: e.width / l
						}
					}
					i = parseInt(r[0], 10)
				}
				return a = "auto" === r[0] && "auto" === r[1] ? t.height : "auto" === r[1] ? i / t.width * t.height : o(r[1]) ? e.height * parseFloat(r[1]) / 100 : parseInt(r[1], 10), "auto" === r[0] && (i = a / t.height * t.width), {
					width: i,
					height: a
				}
			}, i.prototype.parseBackgroundPosition = function(e, t, n, i) {
				var a, r, s = this.cssList("backgroundPosition", n);
				return a = o(s[0]) ? (e.width - (i || t).width) * (parseFloat(s[0]) / 100) : parseInt(s[0], 10), r = "auto" === s[1] ? a / t.width * t.height : o(s[1]) ? (e.height - (i || t).height) * parseFloat(s[1]) / 100 : parseInt(s[1], 10), "auto" === s[0] && (a = r / t.height * t.width), {
					left: a,
					top: r
				}
			}, i.prototype.parseBackgroundRepeat = function(e) {
				return this.cssList("backgroundRepeat", e)[0]
			}, i.prototype.parseTextShadows = function() {
				var e = this.css("textShadow"),
					t = [];
				if(e && "none" !== e)
					for(var n = e.match(this.TEXT_SHADOW_PROPERTY), i = 0; n && i < n.length; i++) {
						var a = n[i].match(this.TEXT_SHADOW_VALUES);
						t.push({
							color: new d(a[0]),
							offsetX: a[1] ? parseFloat(a[1].replace("px", "")) : 0,
							offsetY: a[2] ? parseFloat(a[2].replace("px", "")) : 0,
							blur: a[3] ? a[3].replace("px", "") : 0
						})
					}
				return t
			}, i.prototype.parseTransform = function() {
				if(!this.transformData)
					if(this.hasTransform()) {
						var e = this.parseBounds(),
							t = this.prefixedCss("transformOrigin").split(" ").map(s).map(l);
						t[0] += e.left, t[1] += e.top, this.transformData = {
							origin: t,
							matrix: this.parseTransformMatrix()
						}
					} else this.transformData = {
						origin: [0, 0],
						matrix: [1, 0, 0, 1, 0, 0]
					};
				return this.transformData
			}, i.prototype.parseTransformMatrix = function() {
				if(!this.transformMatrix) {
					var e = this.prefixedCss("transform"),
						t = e ? r(e.match(this.MATRIX_PROPERTY)) : null;
					this.transformMatrix = t || [1, 0, 0, 1, 0, 0]
				}
				return this.transformMatrix
			}, i.prototype.parseBounds = function() {
				return this.bounds || (this.bounds = this.hasTransform() ? h(this.node) : u(this.node))
			}, i.prototype.hasTransform = function() {
				return "1,0,0,1,0,0" !== this.parseTransformMatrix().join(",") || this.parent && this.parent.hasTransform()
			}, i.prototype.getValue = function() {
				var e = this.node.value || "";
				return "SELECT" === this.node.tagName ? e = a(this.node) : "password" === this.node.type && (e = Array(e.length + 1).join("•")), 0 === e.length ? this.node.placeholder || "" : e
			}, i.prototype.MATRIX_PROPERTY = /(matrix|matrix3d)\((.+)\)/, i.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g, i.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g, i.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/, t.exports = i
		}, {
			"./color": 3,
			"./utils": 26
		}],
		15: [function(e, t, n) {
			function i(e, t, n, i, a) {
				H("Starting NodeParser"), this.renderer = t, this.options = a, this.range = null, this.support = n, this.renderQueue = [], this.stack = new j(!0, 1, e.ownerDocument, null);
				var r = new _(e, null);
				if(a.background && t.rectangle(0, 0, t.width, t.height, new V(a.background)), e === e.ownerDocument.documentElement) {
					var o = new _(r.color("backgroundColor").isTransparent() ? e.ownerDocument.body : e.ownerDocument.documentElement, null);
					t.rectangle(0, 0, t.width, t.height, o.color("backgroundColor"))
				}
				r.visibile = r.isElementVisible(), this.createPseudoHideStyles(e.ownerDocument), this.disableAnimations(e.ownerDocument), this.nodes = O([r].concat(this.getChildren(r)).filter(function(e) {
					return e.visible = e.isElementVisible()
				}).map(this.getPseudoElements, this)), this.fontMetrics = new W, H("Fetched nodes, total:", this.nodes.length), H("Calculate overflow clips"), this.calculateOverflowClips(), H("Start fetching images"), this.images = i.fetch(this.nodes.filter(P)), this.ready = this.images.ready.then(K(function() {
					return H("Images loaded, starting parsing"), H("Creating stacking contexts"), this.createStackingContexts(), H("Sorting stacking contexts"), this.sortStackingContexts(this.stack), this.parse(this.stack), H("Render queue created with " + this.renderQueue.length + " items"), new Promise(K(function(e) {
						a.async ? "function" == typeof a.async ? a.async.call(this, this.renderQueue, e) : this.renderQueue.length > 0 ? (this.renderIndex = 0, this.asyncRenderer(this.renderQueue, e)) : e() : (this.renderQueue.forEach(this.paint, this), e())
					}, this))
				}, this))
			}

			function a(e) {
				return e.parent && e.parent.clip.length
			}

			function r(e) {
				return e.replace(/(\-[a-z])/g, function(e) {
					return e.toUpperCase().replace("-", "")
				})
			}

			function o() {}

			function s(e, t, n, i) {
				return e.map(function(a, r) {
					if(a.width > 0) {
						var o = t.left,
							s = t.top,
							l = t.width,
							d = t.height - e[2].width;
						switch(r) {
							case 0:
								d = e[0].width, a.args = u({
									c1: [o, s],
									c2: [o + l, s],
									c3: [o + l - e[1].width, s + d],
									c4: [o + e[3].width, s + d]
								}, i[0], i[1], n.topLeftOuter, n.topLeftInner, n.topRightOuter, n.topRightInner);
								break;
							case 1:
								o = t.left + t.width - e[1].width, l = e[1].width, a.args = u({
									c1: [o + l, s],
									c2: [o + l, s + d + e[2].width],
									c3: [o, s + d],
									c4: [o, s + e[0].width]
								}, i[1], i[2], n.topRightOuter, n.topRightInner, n.bottomRightOuter, n.bottomRightInner);
								break;
							case 2:
								s = s + t.height - e[2].width, d = e[2].width, a.args = u({
									c1: [o + l, s + d],
									c2: [o, s + d],
									c3: [o + e[3].width, s],
									c4: [o + l - e[3].width, s]
								}, i[2], i[3], n.bottomRightOuter, n.bottomRightInner, n.bottomLeftOuter, n.bottomLeftInner);
								break;
							case 3:
								l = e[3].width, a.args = u({
									c1: [o, s + d + e[2].width],
									c2: [o, s],
									c3: [o + l, s + e[0].width],
									c4: [o + l, s + d]
								}, i[3], i[0], n.bottomLeftOuter, n.bottomLeftInner, n.topLeftOuter, n.topLeftInner)
						}
					}
					return a
				})
			}

			function l(e, t, n, i) {
				var a = (Math.sqrt(2) - 1) / 3 * 4,
					r = n * a,
					o = i * a,
					s = e + n,
					l = t + i;
				return {
					topLeft: c({
						x: e,
						y: l
					}, {
						x: e,
						y: l - o
					}, {
						x: s - r,
						y: t
					}, {
						x: s,
						y: t
					}),
					topRight: c({
						x: e,
						y: t
					}, {
						x: e + r,
						y: t
					}, {
						x: s,
						y: l - o
					}, {
						x: s,
						y: l
					}),
					bottomRight: c({
						x: s,
						y: t
					}, {
						x: s,
						y: t + o
					}, {
						x: e + r,
						y: l
					}, {
						x: e,
						y: l
					}),
					bottomLeft: c({
						x: s,
						y: l
					}, {
						x: s - r,
						y: l
					}, {
						x: e,
						y: t + o
					}, {
						x: e,
						y: t
					})
				}
			}

			function d(e, t, n) {
				var i = e.left,
					a = e.top,
					r = e.width,
					o = e.height,
					s = t[0][0] < r / 2 ? t[0][0] : r / 2,
					d = t[0][1] < o / 2 ? t[0][1] : o / 2,
					c = t[1][0] < r / 2 ? t[1][0] : r / 2,
					u = t[1][1] < o / 2 ? t[1][1] : o / 2,
					p = t[2][0] < r / 2 ? t[2][0] : r / 2,
					h = t[2][1] < o / 2 ? t[2][1] : o / 2,
					m = t[3][0] < r / 2 ? t[3][0] : r / 2,
					f = t[3][1] < o / 2 ? t[3][1] : o / 2,
					g = r - c,
					v = o - h,
					w = r - p,
					y = o - f;
				return {
					topLeftOuter: l(i, a, s, d).topLeft.subdivide(.5),
					topLeftInner: l(i + n[3].width, a + n[0].width, Math.max(0, s - n[3].width), Math.max(0, d - n[0].width)).topLeft.subdivide(.5),
					topRightOuter: l(i + g, a, c, u).topRight.subdivide(.5),
					topRightInner: l(i + Math.min(g, r + n[3].width), a + n[0].width, g > r + n[3].width ? 0 : c - n[3].width, u - n[0].width).topRight.subdivide(.5),
					bottomRightOuter: l(i + w, a + v, p, h).bottomRight.subdivide(.5),
					bottomRightInner: l(i + Math.min(w, r - n[3].width), a + Math.min(v, o + n[0].width), Math.max(0, p - n[1].width), h - n[2].width).bottomRight.subdivide(.5),
					bottomLeftOuter: l(i, a + y, m, f).bottomLeft.subdivide(.5),
					bottomLeftInner: l(i + n[3].width, a + y, Math.max(0, m - n[3].width), f - n[2].width).bottomLeft.subdivide(.5)
				}
			}

			function c(e, t, n, i) {
				var a = function(e, t, n) {
					return {
						x: e.x + (t.x - e.x) * n,
						y: e.y + (t.y - e.y) * n
					}
				};
				return {
					start: e,
					startControl: t,
					endControl: n,
					end: i,
					subdivide: function(r) {
						var o = a(e, t, r),
							s = a(t, n, r),
							l = a(n, i, r),
							d = a(o, s, r),
							u = a(s, l, r),
							p = a(d, u, r);
						return [c(e, o, d, p), c(p, u, l, i)]
					},
					curveTo: function(e) {
						e.push(["bezierCurve", t.x, t.y, n.x, n.y, i.x, i.y])
					},
					curveToReversed: function(i) {
						i.push(["bezierCurve", n.x, n.y, t.x, t.y, e.x, e.y])
					}
				}
			}

			function u(e, t, n, i, a, r, o) {
				var s = [];
				return t[0] > 0 || t[1] > 0 ? (s.push(["line", i[1].start.x, i[1].start.y]), i[1].curveTo(s)) : s.push(["line", e.c1[0], e.c1[1]]), n[0] > 0 || n[1] > 0 ? (s.push(["line", r[0].start.x, r[0].start.y]), r[0].curveTo(s), s.push(["line", o[0].end.x, o[0].end.y]), o[0].curveToReversed(s)) : (s.push(["line", e.c2[0], e.c2[1]]), s.push(["line", e.c3[0], e.c3[1]])), t[0] > 0 || t[1] > 0 ? (s.push(["line", a[1].end.x, a[1].end.y]), a[1].curveToReversed(s)) : s.push(["line", e.c4[0], e.c4[1]]), s
			}

			function p(e, t, n, i, a, r, o) {
				t[0] > 0 || t[1] > 0 ? (e.push(["line", i[0].start.x, i[0].start.y]), i[0].curveTo(e), i[1].curveTo(e)) : e.push(["line", r, o]), (n[0] > 0 || n[1] > 0) && e.push(["line", a[0].start.x, a[0].start.y])
			}

			function h(e) {
				return e.cssInt("zIndex") < 0
			}

			function m(e) {
				return e.cssInt("zIndex") > 0
			}

			function f(e) {
				return 0 === e.cssInt("zIndex")
			}

			function g(e) {
				return -1 !== ["inline", "inline-block", "inline-table"].indexOf(e.css("display"))
			}

			function v(e) {
				return e instanceof j
			}

			function w(e) {
				return e.node.data.trim().length > 0
			}

			function y(e) {
				return /^(normal|none|0px)$/.test(e.parent.css("letterSpacing"))
			}

			function x(e) {
				return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(t) {
					var n = e.css("border" + t + "Radius"),
						i = n.split(" ");
					return i.length <= 1 && (i[1] = i[0]), i.map(z)
				})
			}

			function b(e) {
				return e.nodeType === Node.TEXT_NODE || e.nodeType === Node.ELEMENT_NODE
			}

			function T(e) {
				return "auto" !== (-1 !== ["absolute", "relative", "fixed"].indexOf(e.css("position")) ? e.css("zIndex") : "auto")
			}

			function S(e) {
				return "static" !== e.css("position")
			}

			function C(e) {
				return "none" !== e.css("float")
			}

			function E(e) {
				return -1 !== ["inline-block", "inline-table"].indexOf(e.css("display"))
			}

			function M(e) {
				var t = this;
				return function() {
					return !e.apply(t, arguments)
				}
			}

			function P(e) {
				return e.node.nodeType === Node.ELEMENT_NODE
			}

			function I(e) {
				return !0 === e.isPseudoElement
			}

			function k(e) {
				return e.node.nodeType === Node.TEXT_NODE
			}

			function D(e) {
				return function(t, n) {
					return t.cssInt("zIndex") + e.indexOf(t) / e.length - (n.cssInt("zIndex") + e.indexOf(n) / e.length)
				}
			}

			function L(e) {
				return e.getOpacity() < 1
			}

			function z(e) {
				return parseInt(e, 10)
			}

			function A(e) {
				return e.width
			}

			function R(e) {
				return e.node.nodeType !== Node.ELEMENT_NODE || -1 === ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(e.node.nodeName)
			}

			function O(e) {
				return [].concat.apply([], e)
			}

			function B(e) {
				var t = e.substr(0, 1);
				return t === e.substr(e.length - 1) && t.match(/'|"/) ? e.substr(1, e.length - 2) : e
			}

			function N(e) {
				for(var t, n = [], i = 0, a = !1; e.length;) F(e[i]) === a ? (t = e.splice(0, i), t.length && n.push(X.ucs2.encode(t)), a = !a, i = 0) : i++, i >= e.length && (t = e.splice(0, i), t.length && n.push(X.ucs2.encode(t)));
				return n
			}

			function F(e) {
				return -1 !== [32, 13, 10, 9, 45].indexOf(e)
			}

			function G(e) {
				return /[^\u0000-\u00ff]/.test(e)
			}
			var H = e("./log"),
				X = e("punycode"),
				_ = e("./nodecontainer"),
				Y = e("./textcontainer"),
				U = e("./pseudoelementcontainer"),
				W = e("./fontmetrics"),
				V = e("./color"),
				j = e("./stackingcontext"),
				q = e("./utils"),
				K = q.bind,
				Q = q.getBounds,
				Z = q.parseBackgrounds,
				J = q.offsetBounds;
			i.prototype.calculateOverflowClips = function() {
				this.nodes.forEach(function(e) {
					if(P(e)) {
						I(e) && e.appendToDOM(), e.borders = this.parseBorders(e);
						var t = "hidden" === e.css("overflow") ? [e.borders.clip] : [],
							n = e.parseClip();
						n && -1 !== ["absolute", "fixed"].indexOf(e.css("position")) && t.push([
							["rect", e.bounds.left + n.left, e.bounds.top + n.top, n.right - n.left, n.bottom - n.top]
						]), e.clip = a(e) ? e.parent.clip.concat(t) : t, e.backgroundClip = "hidden" !== e.css("overflow") ? e.clip.concat([e.borders.clip]) : e.clip, I(e) && e.cleanDOM()
					} else k(e) && (e.clip = a(e) ? e.parent.clip : []);
					I(e) || (e.bounds = null)
				}, this)
			}, i.prototype.asyncRenderer = function(e, t, n) {
				n = n || Date.now(), this.paint(e[this.renderIndex++]), e.length === this.renderIndex ? t() : n + 20 > Date.now() ? this.asyncRenderer(e, t, n) : setTimeout(K(function() {
					this.asyncRenderer(e, t)
				}, this), 0)
			}, i.prototype.createPseudoHideStyles = function(e) {
				this.createStyles(e, "." + U.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }.' + U.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }')
			}, i.prototype.disableAnimations = function(e) {
				this.createStyles(e, "* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}")
			}, i.prototype.createStyles = function(e, t) {
				var n = e.createElement("style");
				n.innerHTML = t, e.body.appendChild(n)
			}, i.prototype.getPseudoElements = function(e) {
				var t = [
					[e]
				];
				if(e.node.nodeType === Node.ELEMENT_NODE) {
					var n = this.getPseudoElement(e, ":before"),
						i = this.getPseudoElement(e, ":after");
					n && t.push(n), i && t.push(i)
				}
				return O(t)
			}, i.prototype.getPseudoElement = function(e, t) {
				var n = e.computedStyle(t);
				if(!n || !n.content || "none" === n.content || "-moz-alt-content" === n.content || "none" === n.display) return null;
				for(var i = B(n.content), a = "url" === i.substr(0, 3), o = document.createElement(a ? "img" : "html2canvaspseudoelement"), s = new U(o, e, t), l = n.length - 1; l >= 0; l--) {
					var d = r(n.item(l));
					o.style[d] = n[d]
				}
				if(o.className = U.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + U.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER, a) return o.src = Z(i)[0].args[0], [s];
				var c = document.createTextNode(i);
				return o.appendChild(c), [s, new Y(c, s)]
			}, i.prototype.getChildren = function(e) {
				return O([].filter.call(e.node.childNodes, b).map(function(t) {
					var n = [t.nodeType === Node.TEXT_NODE ? new Y(t, e) : new _(t, e)].filter(R);
					return t.nodeType === Node.ELEMENT_NODE && n.length && "TEXTAREA" !== t.tagName ? n[0].isElementVisible() ? n.concat(this.getChildren(n[0])) : [] : n
				}, this))
			}, i.prototype.newStackingContext = function(e, t) {
				var n = new j(t, e.getOpacity(), e.node, e.parent);
				e.cloneTo(n), (t ? n.getParentStack(this) : n.parent.stack).contexts.push(n), e.stack = n
			}, i.prototype.createStackingContexts = function() {
				this.nodes.forEach(function(e) {
					P(e) && (this.isRootElement(e) || L(e) || T(e) || this.isBodyWithTransparentRoot(e) || e.hasTransform()) ? this.newStackingContext(e, !0) : P(e) && (S(e) && f(e) || E(e) || C(e)) ? this.newStackingContext(e, !1) : e.assignStack(e.parent.stack)
				}, this)
			}, i.prototype.isBodyWithTransparentRoot = function(e) {
				return "BODY" === e.node.nodeName && e.parent.color("backgroundColor").isTransparent()
			}, i.prototype.isRootElement = function(e) {
				return null === e.parent
			}, i.prototype.sortStackingContexts = function(e) {
				e.contexts.sort(D(e.contexts.slice(0))), e.contexts.forEach(this.sortStackingContexts, this)
			}, i.prototype.parseTextBounds = function(e) {
				return function(t, n, i) {
					if("none" !== e.parent.css("textDecoration").substr(0, 4) || 0 !== t.trim().length) {
						if(this.support.rangeBounds && !e.parent.hasTransform()) {
							var a = i.slice(0, n).join("").length;
							return this.getRangeBounds(e.node, a, t.length)
						}
						if(e.node && "string" == typeof e.node.data) {
							var r = e.node.splitText(t.length),
								o = this.getWrapperBounds(e.node, e.parent.hasTransform());
							return e.node = r, o
						}
					} else this.support.rangeBounds && !e.parent.hasTransform() || (e.node = e.node.splitText(t.length));
					return {}
				}
			}, i.prototype.getWrapperBounds = function(e, t) {
				var n = e.ownerDocument.createElement("html2canvaswrapper"),
					i = e.parentNode,
					a = e.cloneNode(!0);
				n.appendChild(e.cloneNode(!0)), i.replaceChild(n, e);
				var r = t ? J(n) : Q(n);
				return i.replaceChild(a, n), r
			}, i.prototype.getRangeBounds = function(e, t, n) {
				var i = this.range || (this.range = e.ownerDocument.createRange());
				return i.setStart(e, t), i.setEnd(e, t + n), i.getBoundingClientRect()
			}, i.prototype.parse = function(e) {
				var t = e.contexts.filter(h),
					n = e.children.filter(P),
					i = n.filter(M(C)),
					a = i.filter(M(S)).filter(M(g)),
					r = n.filter(M(S)).filter(C),
					s = i.filter(M(S)).filter(g),
					l = e.contexts.concat(i.filter(S)).filter(f),
					d = e.children.filter(k).filter(w),
					c = e.contexts.filter(m);
				t.concat(a).concat(r).concat(s).concat(l).concat(d).concat(c).forEach(function(e) {
					this.renderQueue.push(e), v(e) && (this.parse(e), this.renderQueue.push(new o))
				}, this)
			}, i.prototype.paint = function(e) {
				try {
					e instanceof o ? this.renderer.ctx.restore() : k(e) ? (I(e.parent) && e.parent.appendToDOM(), this.paintText(e), I(e.parent) && e.parent.cleanDOM()) : this.paintNode(e)
				} catch(e) {
					if(H(e), this.options.strict) throw e
				}
			}, i.prototype.paintNode = function(e) {
				v(e) && (this.renderer.setOpacity(e.opacity), this.renderer.ctx.save(), e.hasTransform() && this.renderer.setTransform(e.parseTransform())), "INPUT" === e.node.nodeName && "checkbox" === e.node.type ? this.paintCheckbox(e) : "INPUT" === e.node.nodeName && "radio" === e.node.type ? this.paintRadio(e) : this.paintElement(e)
			}, i.prototype.paintElement = function(e) {
				var t = e.parseBounds();
				this.renderer.clip(e.backgroundClip, function() {
					this.renderer.renderBackground(e, t, e.borders.borders.map(A))
				}, this), this.renderer.clip(e.clip, function() {
					this.renderer.renderBorders(e.borders.borders)
				}, this), this.renderer.clip(e.backgroundClip, function() {
					switch(e.node.nodeName) {
						case "svg":
						case "IFRAME":
							var n = this.images.get(e.node);
							n ? this.renderer.renderImage(e, t, e.borders, n) : H("Error loading <" + e.node.nodeName + ">", e.node);
							break;
						case "IMG":
							var i = this.images.get(e.node.src);
							i ? this.renderer.renderImage(e, t, e.borders, i) : H("Error loading <img>", e.node.src);
							break;
						case "CANVAS":
							this.renderer.renderImage(e, t, e.borders, {
								image: e.node
							});
							break;
						case "SELECT":
						case "INPUT":
						case "TEXTAREA":
							this.paintFormValue(e)
					}
				}, this)
			}, i.prototype.paintCheckbox = function(e) {
				var t = e.parseBounds(),
					n = Math.min(t.width, t.height),
					i = {
						width: n - 1,
						height: n - 1,
						top: t.top,
						left: t.left
					},
					a = [3, 3],
					r = [a, a, a, a],
					o = [1, 1, 1, 1].map(function(e) {
						return {
							color: new V("#A5A5A5"),
							width: e
						}
					}),
					l = d(i, r, o);
				this.renderer.clip(e.backgroundClip, function() {
					this.renderer.rectangle(i.left + 1, i.top + 1, i.width - 2, i.height - 2, new V("#DEDEDE")), this.renderer.renderBorders(s(o, i, l, r)), e.node.checked && (this.renderer.font(new V("#424242"), "normal", "normal", "bold", n - 3 + "px", "arial"), this.renderer.text("✔", i.left + n / 6, i.top + n - 1))
				}, this)
			}, i.prototype.paintRadio = function(e) {
				var t = e.parseBounds(),
					n = Math.min(t.width, t.height) - 2;
				this.renderer.clip(e.backgroundClip, function() {
					this.renderer.circleStroke(t.left + 1, t.top + 1, n, new V("#DEDEDE"), 1, new V("#A5A5A5")), e.node.checked && this.renderer.circle(Math.ceil(t.left + n / 4) + 1, Math.ceil(t.top + n / 4) + 1, Math.floor(n / 2), new V("#424242"))
				}, this)
			}, i.prototype.paintFormValue = function(e) {
				var t = e.getValue();
				if(t.length > 0) {
					var n = e.node.ownerDocument,
						i = n.createElement("html2canvaswrapper");
					["lineHeight", "textAlign", "fontFamily", "fontWeight", "fontSize", "color", "paddingLeft", "paddingTop", "paddingRight", "paddingBottom", "width", "height", "borderLeftStyle", "borderTopStyle", "borderLeftWidth", "borderTopWidth", "boxSizing", "whiteSpace", "wordWrap"].forEach(function(t) {
						try {
							i.style[t] = e.css(t)
						} catch(e) {
							H("html2canvas: Parse: Exception caught in renderFormValue: " + e.message)
						}
					});
					var a = e.parseBounds();
					i.style.position = "fixed", i.style.left = a.left + "px", i.style.top = a.top + "px", i.textContent = t, n.body.appendChild(i), this.paintText(new Y(i.firstChild, e)), n.body.removeChild(i)
				}
			}, i.prototype.paintText = function(e) {
				e.applyTextTransform();
				var t = X.ucs2.decode(e.node.data),
					n = this.options.letterRendering && !y(e) || G(e.node.data) ? t.map(function(e) {
						return X.ucs2.encode([e])
					}) : N(t),
					i = e.parent.fontWeight(),
					a = e.parent.css("fontSize"),
					r = e.parent.css("fontFamily"),
					o = e.parent.parseTextShadows();
				this.renderer.font(e.parent.color("color"), e.parent.css("fontStyle"), e.parent.css("fontVariant"), i, a, r), o.length ? this.renderer.fontShadow(o[0].color, o[0].offsetX, o[0].offsetY, o[0].blur) : this.renderer.clearShadow(), this.renderer.clip(e.parent.clip, function() {
					n.map(this.parseTextBounds(e), this).forEach(function(t, i) {
						t && (this.renderer.text(n[i], t.left, t.bottom), this.renderTextDecoration(e.parent, t, this.fontMetrics.getMetrics(r, a)))
					}, this)
				}, this)
			}, i.prototype.renderTextDecoration = function(e, t, n) {
				switch(e.css("textDecoration").split(" ")[0]) {
					case "underline":
						this.renderer.rectangle(t.left, Math.round(t.top + n.baseline + n.lineWidth), t.width, 1, e.color("color"));
						break;
					case "overline":
						this.renderer.rectangle(t.left, Math.round(t.top), t.width, 1, e.color("color"));
						break;
					case "line-through":
						this.renderer.rectangle(t.left, Math.ceil(t.top + n.middle + n.lineWidth), t.width, 1, e.color("color"))
				}
			};
			var $ = {
				inset: [
					["darken", .6],
					["darken", .1],
					["darken", .1],
					["darken", .6]
				]
			};
			i.prototype.parseBorders = function(e) {
				var t = e.parseBounds(),
					n = x(e),
					i = ["Top", "Right", "Bottom", "Left"].map(function(t, n) {
						var i = e.css("border" + t + "Style"),
							a = e.color("border" + t + "Color");
						"inset" === i && a.isBlack() && (a = new V([255, 255, 255, a.a]));
						var r = $[i] ? $[i][n] : null;
						return {
							width: e.cssInt("border" + t + "Width"),
							color: r ? a[r[0]](r[1]) : a,
							args: null
						}
					}),
					a = d(t, n, i);
				return {
					clip: this.parseBackgroundClip(e, a, i, n, t),
					borders: s(i, t, a, n)
				}
			}, i.prototype.parseBackgroundClip = function(e, t, n, i, a) {
				var r = e.css("backgroundClip"),
					o = [];
				switch(r) {
					case "content-box":
					case "padding-box":
						p(o, i[0], i[1], t.topLeftInner, t.topRightInner, a.left + n[3].width, a.top + n[0].width), p(o, i[1], i[2], t.topRightInner, t.bottomRightInner, a.left + a.width - n[1].width, a.top + n[0].width), p(o, i[2], i[3], t.bottomRightInner, t.bottomLeftInner, a.left + a.width - n[1].width, a.top + a.height - n[2].width), p(o, i[3], i[0], t.bottomLeftInner, t.topLeftInner, a.left + n[3].width, a.top + a.height - n[2].width);
						break;
					default:
						p(o, i[0], i[1], t.topLeftOuter, t.topRightOuter, a.left, a.top), p(o, i[1], i[2], t.topRightOuter, t.bottomRightOuter, a.left + a.width, a.top), p(o, i[2], i[3], t.bottomRightOuter, t.bottomLeftOuter, a.left + a.width, a.top + a.height), p(o, i[3], i[0], t.bottomLeftOuter, t.topLeftOuter, a.left, a.top + a.height)
				}
				return o
			}, t.exports = i
		}, {
			"./color": 3,
			"./fontmetrics": 7,
			"./log": 13,
			"./nodecontainer": 14,
			"./pseudoelementcontainer": 18,
			"./stackingcontext": 21,
			"./textcontainer": 25,
			"./utils": 26,
			punycode: 1
		}],
		16: [function(e, t, n) {
			function i(e, t, n) {
				var i = "withCredentials" in new XMLHttpRequest;
				if(!t) return Promise.reject("No proxy configured");
				var a = o(i),
					l = s(t, e, a);
				return i ? c(l) : r(n, l, a).then(function(e) {
					return m(e.content)
				})
			}

			function a(e, t, n) {
				var i = "crossOrigin" in new Image,
					a = o(i),
					l = s(t, e, a);
				return i ? Promise.resolve(l) : r(n, l, a).then(function(e) {
					return "data:" + e.type + ";base64," + e.content
				})
			}

			function r(e, t, n) {
				return new Promise(function(i, a) {
					var r = e.createElement("script"),
						o = function() {
							delete window.html2canvas.proxy[n], e.body.removeChild(r)
						};
					window.html2canvas.proxy[n] = function(e) {
						o(), i(e)
					}, r.src = t, r.onerror = function(e) {
						o(), a(e)
					}, e.body.appendChild(r)
				})
			}

			function o(e) {
				return e ? "" : "html2canvas_" + Date.now() + "_" + ++f + "_" + Math.round(1e5 * Math.random())
			}

			function s(e, t, n) {
				return e + "?url=" + encodeURIComponent(t) + (n.length ? "&callback=html2canvas.proxy." + n : "")
			}

			function l(e) {
				return function(t) {
					var n, i = new DOMParser;
					try {
						n = i.parseFromString(t, "text/html")
					} catch(e) {
						p("DOMParser not supported, falling back to createHTMLDocument"), n = document.implementation.createHTMLDocument("");
						try {
							n.open(), n.write(t), n.close()
						} catch(e) {
							p("createHTMLDocument write not supported, falling back to document.body.innerHTML"), n.body.innerHTML = t
						}
					}
					var a = n.querySelector("base");
					if(!a || !a.href.host) {
						var r = n.createElement("base");
						r.href = e, n.head.insertBefore(r, n.head.firstChild)
					}
					return n
				}
			}

			function d(e, t, n, a, r, o) {
				return new i(e, t, window.document).then(l(e)).then(function(e) {
					return h(e, n, a, r, o, 0, 0)
				})
			}
			var c = e("./xhr"),
				u = e("./utils"),
				p = e("./log"),
				h = e("./clone"),
				m = u.decode64,
				f = 0;
			n.Proxy = i, n.ProxyURL = a, n.loadUrlDocument = d
		}, {
			"./clone": 2,
			"./log": 13,
			"./utils": 26,
			"./xhr": 28
		}],
		17: [function(e, t, n) {
			function i(e, t) {
				var n = document.createElement("a");
				n.href = e, e = n.href, this.src = e, this.image = new Image;
				var i = this;
				this.promise = new Promise(function(n, r) {
					i.image.crossOrigin = "Anonymous", i.image.onload = n, i.image.onerror = r, new a(e, t, document).then(function(e) {
						i.image.src = e
					}).catch(r)
				})
			}
			var a = e("./proxy").ProxyURL;
			t.exports = i
		}, {
			"./proxy": 16
		}],
		18: [function(e, t, n) {
			function i(e, t, n) {
				a.call(this, e, t), this.isPseudoElement = !0, this.before = ":before" === n
			}
			var a = e("./nodecontainer");
			i.prototype.cloneTo = function(e) {
				i.prototype.cloneTo.call(this, e), e.isPseudoElement = !0, e.before = this.before
			}, i.prototype = Object.create(a.prototype), i.prototype.appendToDOM = function() {
				this.before ? this.parent.node.insertBefore(this.node, this.parent.node.firstChild) : this.parent.node.appendChild(this.node), this.parent.node.className += " " + this.getHideClass()
			}, i.prototype.cleanDOM = function() {
				this.node.parentNode.removeChild(this.node), this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "")
			}, i.prototype.getHideClass = function() {
				return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")]
			}, i.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before", i.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after", t.exports = i
		}, {
			"./nodecontainer": 14
		}],
		19: [function(e, t, n) {
			function i(e, t, n, i, a) {
				this.width = e, this.height = t, this.images = n, this.options = i, this.document = a
			}
			var a = e("./log");
			i.prototype.renderImage = function(e, t, n, i) {
				var a = e.cssInt("paddingLeft"),
					r = e.cssInt("paddingTop"),
					o = e.cssInt("paddingRight"),
					s = e.cssInt("paddingBottom"),
					l = n.borders,
					d = t.width - (l[1].width + l[3].width + a + o),
					c = t.height - (l[0].width + l[2].width + r + s);
				this.drawImage(i, 0, 0, i.image.width || d, i.image.height || c, t.left + a + l[3].width, t.top + r + l[0].width, d, c)
			}, i.prototype.renderBackground = function(e, t, n) {
				t.height > 0 && t.width > 0 && (this.renderBackgroundColor(e, t), this.renderBackgroundImage(e, t, n))
			}, i.prototype.renderBackgroundColor = function(e, t) {
				var n = e.color("backgroundColor");
				n.isTransparent() || this.rectangle(t.left, t.top, t.width, t.height, n)
			}, i.prototype.renderBorders = function(e) {
				e.forEach(this.renderBorder, this)
			}, i.prototype.renderBorder = function(e) {
				e.color.isTransparent() || null === e.args || this.drawShape(e.args, e.color)
			}, i.prototype.renderBackgroundImage = function(e, t, n) {
				e.parseBackgroundImages().reverse().forEach(function(i, r, o) {
					switch(i.method) {
						case "url":
							var s = this.images.get(i.args[0]);
							s ? this.renderBackgroundRepeating(e, t, s, o.length - (r + 1), n) : a("Error loading background-image", i.args[0]);
							break;
						case "linear-gradient":
						case "gradient":
							var l = this.images.get(i.value);
							l ? this.renderBackgroundGradient(l, t, n) : a("Error loading background-image", i.args[0]);
							break;
						case "none":
							break;
						default:
							a("Unknown background-image type", i.args[0])
					}
				}, this)
			}, i.prototype.renderBackgroundRepeating = function(e, t, n, i, a) {
				var r = e.parseBackgroundSize(t, n.image, i),
					o = e.parseBackgroundPosition(t, n.image, i, r);
				switch(e.parseBackgroundRepeat(i)) {
					case "repeat-x":
					case "repeat no-repeat":
						this.backgroundRepeatShape(n, o, r, t, t.left + a[3], t.top + o.top + a[0], 99999, r.height, a);
						break;
					case "repeat-y":
					case "no-repeat repeat":
						this.backgroundRepeatShape(n, o, r, t, t.left + o.left + a[3], t.top + a[0], r.width, 99999, a);
						break;
					case "no-repeat":
						this.backgroundRepeatShape(n, o, r, t, t.left + o.left + a[3], t.top + o.top + a[0], r.width, r.height, a);
						break;
					default:
						this.renderBackgroundRepeat(n, o, r, {
							top: t.top,
							left: t.left
						}, a[3], a[0])
				}
			}, t.exports = i
		}, {
			"./log": 13
		}],
		20: [function(e, t, n) {
			function i(e, t) {
				r.apply(this, arguments), this.canvas = this.options.canvas || this.document.createElement("canvas"), this.options.canvas || (this.canvas.width = e, this.canvas.height = t), this.ctx = this.canvas.getContext("2d"), this.taintCtx = this.document.createElement("canvas").getContext("2d"), this.ctx.textBaseline = "bottom", this.variables = {}, s("Initialized CanvasRenderer with size", e, "x", t)
			}

			function a(e) {
				return e.length > 0
			}
			var r = e("../renderer"),
				o = e("../lineargradientcontainer"),
				s = e("../log");
			i.prototype = Object.create(r.prototype), i.prototype.setFillStyle = function(e) {
				return this.ctx.fillStyle = "object" == typeof e && e.isColor ? e.toString() : e, this.ctx
			}, i.prototype.rectangle = function(e, t, n, i, a) {
				this.setFillStyle(a).fillRect(e, t, n, i)
			}, i.prototype.circle = function(e, t, n, i) {
				this.setFillStyle(i), this.ctx.beginPath(), this.ctx.arc(e + n / 2, t + n / 2, n / 2, 0, 2 * Math.PI, !0), this.ctx.closePath(), this.ctx.fill()
			}, i.prototype.circleStroke = function(e, t, n, i, a, r) {
				this.circle(e, t, n, i), this.ctx.strokeStyle = r.toString(), this.ctx.stroke()
			}, i.prototype.drawShape = function(e, t) {
				this.shape(e), this.setFillStyle(t).fill()
			}, i.prototype.taints = function(e) {
				if(null === e.tainted) {
					this.taintCtx.drawImage(e.image, 0, 0);
					try {
						this.taintCtx.getImageData(0, 0, 1, 1), e.tainted = !1
					} catch(t) {
						this.taintCtx = document.createElement("canvas").getContext("2d"), e.tainted = !0
					}
				}
				return e.tainted
			}, i.prototype.drawImage = function(e, t, n, i, a, r, o, s, l) {
				this.taints(e) && !this.options.allowTaint || this.ctx.drawImage(e.image, t, n, i, a, r, o, s, l)
			}, i.prototype.clip = function(e, t, n) {
				this.ctx.save(), e.filter(a).forEach(function(e) {
					this.shape(e).clip()
				}, this), t.call(n), this.ctx.restore()
			}, i.prototype.shape = function(e) {
				return this.ctx.beginPath(), e.forEach(function(e, t) {
					"rect" === e[0] ? this.ctx.rect.apply(this.ctx, e.slice(1)) : this.ctx[0 === t ? "moveTo" : e[0] + "To"].apply(this.ctx, e.slice(1))
				}, this), this.ctx.closePath(), this.ctx
			}, i.prototype.font = function(e, t, n, i, a, r) {
				this.setFillStyle(e).font = [t, n, i, a, r].join(" ").split(",")[0]
			}, i.prototype.fontShadow = function(e, t, n, i) {
				this.setVariable("shadowColor", e.toString()).setVariable("shadowOffsetY", t).setVariable("shadowOffsetX", n).setVariable("shadowBlur", i)
			}, i.prototype.clearShadow = function() {
				this.setVariable("shadowColor", "rgba(0,0,0,0)")
			}, i.prototype.setOpacity = function(e) {
				this.ctx.globalAlpha = e
			}, i.prototype.setTransform = function(e) {
				this.ctx.translate(e.origin[0], e.origin[1]), this.ctx.transform.apply(this.ctx, e.matrix), this.ctx.translate(-e.origin[0], -e.origin[1])
			}, i.prototype.setVariable = function(e, t) {
				return this.variables[e] !== t && (this.variables[e] = this.ctx[e] = t), this
			}, i.prototype.text = function(e, t, n) {
				this.ctx.fillText(e, t, n)
			}, i.prototype.backgroundRepeatShape = function(e, t, n, i, a, r, o, s, l) {
				var d = [
					["line", Math.round(a), Math.round(r)],
					["line", Math.round(a + o), Math.round(r)],
					["line", Math.round(a + o), Math.round(s + r)],
					["line", Math.round(a), Math.round(s + r)]
				];
				this.clip([d], function() {
					this.renderBackgroundRepeat(e, t, n, i, l[3], l[0])
				}, this)
			}, i.prototype.renderBackgroundRepeat = function(e, t, n, i, a, r) {
				var o = Math.round(i.left + t.left + a),
					s = Math.round(i.top + t.top + r);
				this.setFillStyle(this.ctx.createPattern(this.resizeImage(e, n), "repeat")), this.ctx.translate(o, s), this.ctx.fill(), this.ctx.translate(-o, -s)
			}, i.prototype.renderBackgroundGradient = function(e, t) {
				if(e instanceof o) {
					var n = this.ctx.createLinearGradient(t.left + t.width * e.x0, t.top + t.height * e.y0, t.left + t.width * e.x1, t.top + t.height * e.y1);
					e.colorStops.forEach(function(e) {
						n.addColorStop(e.stop, e.color.toString())
					}), this.rectangle(t.left, t.top, t.width, t.height, n)
				}
			}, i.prototype.resizeImage = function(e, t) {
				var n = e.image;
				if(n.width === t.width && n.height === t.height) return n;
				var i, a = document.createElement("canvas");
				return a.width = t.width, a.height = t.height, i = a.getContext("2d"), i.drawImage(n, 0, 0, n.width, n.height, 0, 0, t.width, t.height), a
			}, t.exports = i
		}, {
			"../lineargradientcontainer": 12,
			"../log": 13,
			"../renderer": 19
		}],
		21: [function(e, t, n) {
			function i(e, t, n, i) {
				a.call(this, n, i), this.ownStacking = e, this.contexts = [], this.children = [], this.opacity = (this.parent ? this.parent.stack.opacity : 1) * t
			}
			var a = e("./nodecontainer");
			i.prototype = Object.create(a.prototype), i.prototype.getParentStack = function(e) {
				var t = this.parent ? this.parent.stack : null;
				return t ? t.ownStacking ? t : t.getParentStack(e) : e.stack
			}, t.exports = i
		}, {
			"./nodecontainer": 14
		}],
		22: [function(e, t, n) {
			function i(e) {
				this.rangeBounds = this.testRangeBounds(e), this.cors = this.testCORS(), this.svg = this.testSVG()
			}
			i.prototype.testRangeBounds = function(e) {
				var t, n, i, a, r = !1;
				return e.createRange && (t = e.createRange(), t.getBoundingClientRect && (n = e.createElement("boundtest"), n.style.height = "123px", n.style.display = "block", e.body.appendChild(n), t.selectNode(n), i = t.getBoundingClientRect(), a = i.height, 123 === a && (r = !0), e.body.removeChild(n))), r
			}, i.prototype.testCORS = function() {
				return void 0 !== (new Image).crossOrigin
			}, i.prototype.testSVG = function() {
				var e = new Image,
					t = document.createElement("canvas"),
					n = t.getContext("2d");
				e.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
				try {
					n.drawImage(e, 0, 0), t.toDataURL()
				} catch(e) {
					return !1
				}
				return !0
			}, t.exports = i
		}, {}],
		23: [function(e, t, n) {
			function i(e) {
				this.src = e, this.image = null;
				var t = this;
				this.promise = this.hasFabric().then(function() {
					return t.isInline(e) ? Promise.resolve(t.inlineFormatting(e)) : a(e)
				}).then(function(e) {
					return new Promise(function(n) {
						window.html2canvas.svg.fabric.loadSVGFromString(e, t.createCanvas.call(t, n))
					})
				})
			}
			var a = e("./xhr"),
				r = e("./utils").decode64;
			i.prototype.hasFabric = function() {
				return window.html2canvas.svg && window.html2canvas.svg.fabric ? Promise.resolve() : Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg"))
			}, i.prototype.inlineFormatting = function(e) {
				return /^data:image\/svg\+xml;base64,/.test(e) ? this.decode64(this.removeContentType(e)) : this.removeContentType(e)
			}, i.prototype.removeContentType = function(e) {
				return e.replace(/^data:image\/svg\+xml(;base64)?,/, "")
			}, i.prototype.isInline = function(e) {
				return /^data:image\/svg\+xml/i.test(e)
			}, i.prototype.createCanvas = function(e) {
				var t = this;
				return function(n, i) {
					var a = new window.html2canvas.svg.fabric.StaticCanvas("c");
					t.image = a.lowerCanvasEl, a.setWidth(i.width).setHeight(i.height).add(window.html2canvas.svg.fabric.util.groupSVGElements(n, i)).renderAll(), e(a.lowerCanvasEl)
				}
			}, i.prototype.decode64 = function(e) {
				return "function" == typeof window.atob ? window.atob(e) : r(e)
			}, t.exports = i
		}, {
			"./utils": 26,
			"./xhr": 28
		}],
		24: [function(e, t, n) {
			function i(e, t) {
				this.src = e, this.image = null;
				var n = this;
				this.promise = t ? new Promise(function(t, i) {
					n.image = new Image, n.image.onload = t, n.image.onerror = i, n.image.src = "data:image/svg+xml," + (new XMLSerializer).serializeToString(e), !0 === n.image.complete && t(n.image)
				}) : this.hasFabric().then(function() {
					return new Promise(function(t) {
						window.html2canvas.svg.fabric.parseSVGDocument(e, n.createCanvas.call(n, t))
					})
				})
			}
			var a = e("./svgcontainer");
			i.prototype = Object.create(a.prototype), t.exports = i
		}, {
			"./svgcontainer": 23
		}],
		25: [function(e, t, n) {
			function i(e, t) {
				r.call(this, e, t)
			}

			function a(e, t, n) {
				if(e.length > 0) return t + n.toUpperCase()
			}
			var r = e("./nodecontainer");
			i.prototype = Object.create(r.prototype), i.prototype.applyTextTransform = function() {
				this.node.data = this.transform(this.parent.css("textTransform"))
			}, i.prototype.transform = function(e) {
				var t = this.node.data;
				switch(e) {
					case "lowercase":
						return t.toLowerCase();
					case "capitalize":
						return t.replace(/(^|\s|:|-|\(|\))([a-z])/g, a);
					case "uppercase":
						return t.toUpperCase();
					default:
						return t
				}
			}, t.exports = i
		}, {
			"./nodecontainer": 14
		}],
		26: [function(e, t, n) {
			n.smallImage = function() {
				return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
			}, n.bind = function(e, t) {
				return function() {
					return e.apply(t, arguments)
				}
			}, n.decode64 = function(e) {
				var t, n, i, a, r, o, s, l, d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
					c = e.length,
					u = "";
				for(t = 0; t < c; t += 4) n = d.indexOf(e[t]), i = d.indexOf(e[t + 1]), a = d.indexOf(e[t + 2]), r = d.indexOf(e[t + 3]), o = n << 2 | i >> 4, s = (15 & i) << 4 | a >> 2, l = (3 & a) << 6 | r, u += 64 === a ? String.fromCharCode(o) : 64 === r || -1 === r ? String.fromCharCode(o, s) : String.fromCharCode(o, s, l);
				return u
			}, n.getBounds = function(e) {
				if(e.getBoundingClientRect) {
					var t = e.getBoundingClientRect(),
						n = null == e.offsetWidth ? t.width : e.offsetWidth;
					return {
						top: t.top,
						bottom: t.bottom || t.top + t.height,
						right: t.left + n,
						left: t.left,
						width: n,
						height: null == e.offsetHeight ? t.height : e.offsetHeight
					}
				}
				return {}
			}, n.offsetBounds = function(e) {
				var t = e.offsetParent ? n.offsetBounds(e.offsetParent) : {
					top: 0,
					left: 0
				};
				return {
					top: e.offsetTop + t.top,
					bottom: e.offsetTop + e.offsetHeight + t.top,
					right: e.offsetLeft + t.left + e.offsetWidth,
					left: e.offsetLeft + t.left,
					width: e.offsetWidth,
					height: e.offsetHeight
				}
			}, n.parseBackgrounds = function(e) {
				var t, n, i, a, r, o, s, l = " \r\n\t",
					d = [],
					c = 0,
					u = 0,
					p = function() {
						t && ('"' === n.substr(0, 1) && (n = n.substr(1, n.length - 2)), n && s.push(n), "-" === t.substr(0, 1) && (a = t.indexOf("-", 1) + 1) > 0 && (i = t.substr(0, a), t = t.substr(a)), d.push({
							prefix: i,
							method: t.toLowerCase(),
							value: r,
							args: s,
							image: null
						})), s = [], t = i = n = r = ""
					};
				return s = [], t = i = n = r = "", e.split("").forEach(function(e) {
					if(!(0 === c && l.indexOf(e) > -1)) {
						switch(e) {
							case '"':
								o ? o === e && (o = null) : o = e;
								break;
							case "(":
								if(o) break;
								if(0 === c) return c = 1, void(r += e);
								u++;
								break;
							case ")":
								if(o) break;
								if(1 === c) {
									if(0 === u) return c = 0, r += e, void p();
									u--
								}
								break;
							case ",":
								if(o) break;
								if(0 === c) return void p();
								if(1 === c && 0 === u && !t.match(/^url$/i)) return s.push(n), n = "", void(r += e)
						}
						r += e, 0 === c ? t += e : n += e
					}
				}), p(), d
			}
		}, {}],
		27: [function(e, t, n) {
			function i(e) {
				a.apply(this, arguments), this.type = "linear" === e.args[0] ? a.TYPES.LINEAR : a.TYPES.RADIAL
			}
			var a = e("./gradientcontainer");
			i.prototype = Object.create(a.prototype), t.exports = i
		}, {
			"./gradientcontainer": 9
		}],
		28: [function(e, t, n) {
			function i(e) {
				return new Promise(function(t, n) {
					var i = new XMLHttpRequest;
					i.open("GET", e), i.onload = function() {
						200 === i.status ? t(i.responseText) : n(new Error(i.statusText))
					}, i.onerror = function() {
						n(new Error("Network Error"))
					}, i.send()
				})
			}
			t.exports = i
		}, {}]
	}, {}, [4])(4)
}),
function() {
	function e(e) {
		return Math.sqrt(e.x * e.x + e.y * e.y)
	}

	function t(e, t) {
		return e.x * t.x + e.y * t.y
	}

	function n(n, i) {
		var a = e(n) * e(i);
		if(0 === a) return 0;
		var r = t(n, i) / a;
		return r > 1 && (r = 1), Math.acos(r)
	}

	function i(e, t) {
		return e.x * t.y - t.x * e.y
	}

	function a(e, t) {
		var a = n(e, t);
		return i(e, t) > 0 && (a *= -1), 180 * a / Math.PI
	}

	function r(e, t) {
		var n = new o(e);
		return n.add(t), n
	}
	var o = function(e) {
		this.handlers = [], this.el = e
	};
	o.prototype.add = function(e) {
		this.handlers.push(e)
	}, o.prototype.del = function(e) {
		e || (this.handlers = []);
		for(var t = this.handlers.length; t >= 0; t--) this.handlers[t] === e && this.handlers.splice(t, 1)
	}, o.prototype.dispatch = function() {
		for(var e = 0, t = this.handlers.length; e < t; e++) {
			var n = this.handlers[e];
			"function" == typeof n && n.apply(this.el, arguments)
		}
	};
	var s = function(e, t) {
		this.element = "string" == typeof e ? document.querySelector(e) : e, this.start = this.start.bind(this), this.move = this.move.bind(this), this.end = this.end.bind(this), this.cancel = this.cancel.bind(this), this.element.addEventListener("touchstart", this.start, !1), this.element.addEventListener("touchmove", this.move, !1), this.element.addEventListener("touchend", this.end, !1), this.element.addEventListener("touchcancel", this.cancel, !1), this.preV = {
			x: null,
			y: null
		}, this.pinchStartLen = null, this.scale = 1, this.isDoubleTap = !1;
		var n = function() {};
		this.rotate = r(this.element, t.rotate || n), this.touchStart = r(this.element, t.touchStart || n), this.multipointStart = r(this.element, t.multipointStart || n), this.multipointEnd = r(this.element, t.multipointEnd || n), this.pinch = r(this.element, t.pinch || n), this.swipe = r(this.element, t.swipe || n), this.tap = r(this.element, t.tap || n), this.doubleTap = r(this.element, t.doubleTap || n), this.longTap = r(this.element, t.longTap || n), this.singleTap = r(this.element, t.singleTap || n), this.pressMove = r(this.element, t.pressMove || n), this.touchMove = r(this.element, t.touchMove || n), this.touchEnd = r(this.element, t.touchEnd || n), this.touchCancel = r(this.element, t.touchCancel || n), this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.singleTapTimeout = null, this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, this.preTapPosition = {
			x: null,
			y: null
		}
	};
	s.prototype = {
		start: function(t) {
			if(t.touches) {
				this.now = Date.now(), this.x1 = t.touches[0].pageX, this.y1 = t.touches[0].pageY, this.delta = this.now - (this.last || this.now), this.touchStart.dispatch(t), null !== this.preTapPosition.x && (this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30), this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now;
				var n = this.preV;
				if(t.touches.length > 1) {
					this._cancelLongTap(), this._cancelSingleTap();
					var i = {
						x: t.touches[1].pageX - this.x1,
						y: t.touches[1].pageY - this.y1
					};
					n.x = i.x, n.y = i.y, this.pinchStartLen = e(n), this.multipointStart.dispatch(t)
				}
				this.longTapTimeout = setTimeout(function() {
					this.longTap.dispatch(t)
				}.bind(this), 750)
			}
		},
		move: function(t) {
			if(t.touches) {
				var n = this.preV,
					i = t.touches.length,
					r = t.touches[0].pageX,
					o = t.touches[0].pageY;
				if(this.isDoubleTap = !1, i > 1) {
					var s = {
						x: t.touches[1].pageX - r,
						y: t.touches[1].pageY - o
					};
					null !== n.x && (this.pinchStartLen > 0 && (t.scale = e(s) / this.pinchStartLen, this.pinch.dispatch(t)), t.angle = a(s, n), this.rotate.dispatch(t)), n.x = s.x, n.y = s.y
				} else null !== this.x2 ? (t.deltaX = r - this.x2, t.deltaY = o - this.y2) : (t.deltaX = 0, t.deltaY = 0), this.pressMove.dispatch(t);
				this.touchMove.dispatch(t), this._cancelLongTap(), this.x2 = r, this.y2 = o, i > 1 && t.preventDefault()
			}
		},
		end: function(e) {
			if(e.changedTouches) {
				this._cancelLongTap();
				var t = this;
				e.touches.length < 2 && this.multipointEnd.dispatch(e), this.touchEnd.dispatch(e), this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.y1 - this.y2) > 30 ? (e.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), this.swipeTimeout = setTimeout(function() {
					t.swipe.dispatch(e)
				}, 0)) : (this.tapTimeout = setTimeout(function() {
					t.tap.dispatch(e), t.isDoubleTap && (t.doubleTap.dispatch(e), clearTimeout(t.singleTapTimeout), t.isDoubleTap = !1)
				}, 0), t.isDoubleTap || (t.singleTapTimeout = setTimeout(function() {
					t.singleTap.dispatch(e)
				}, 250))), this.preV.x = 0, this.preV.y = 0, this.scale = 1, this.pinchStartLen = null, this.x1 = this.x2 = this.y1 = this.y2 = null
			}
		},
		cancel: function(e) {
			clearTimeout(this.singleTapTimeout), clearTimeout(this.tapTimeout), clearTimeout(this.longTapTimeout), clearTimeout(this.swipeTimeout), this.touchCancel.dispatch(e)
		},
		_cancelLongTap: function() {
			clearTimeout(this.longTapTimeout)
		},
		_cancelSingleTap: function() {
			clearTimeout(this.singleTapTimeout)
		},
		_swipeDirection: function(e, t, n, i) {
			return Math.abs(e - t) >= Math.abs(n - i) ? e - t > 0 ? "Left" : "Right" : n - i > 0 ? "Up" : "Down"
		},
		on: function(e, t) {
			this[e] && this[e].add(t)
		},
		off: function(e, t) {
			this[e] && this[e].del(t)
		},
		destroy: function() {
			return this.singleTapTimeout && clearTimeout(this.singleTapTimeout), this.tapTimeout && clearTimeout(this.tapTimeout), this.longTapTimeout && clearTimeout(this.longTapTimeout), this.swipeTimeout && clearTimeout(this.swipeTimeout), this.element.removeEventListener("touchstart", this.start), this.element.removeEventListener("touchmove", this.move), this.element.removeEventListener("touchend", this.end), this.element.removeEventListener("touchcancel", this.cancel), this.rotate.del(), this.touchStart.del(), this.multipointStart.del(), this.multipointEnd.del(), this.pinch.del(), this.swipe.del(), this.tap.del(), this.doubleTap.del(), this.longTap.del(), this.singleTap.del(), this.pressMove.del(), this.touchMove.del(), this.touchEnd.del(), this.touchCancel.del(), this.preV = this.pinchStartLen = this.scale = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = null, null
		}
	}, "undefined" != typeof module && "object" == typeof exports ? module.exports = s : window.AlloyFinger = s
}(), ! function() {
	"use strict";
	var e, t = function(i, a) {
		function r(e) {
			return Math.floor(e)
		}

		function o() {
			var e = b.params.autoplay,
				t = b.slides.eq(b.activeIndex);
			t.attr("data-swiper-autoplay") && (e = t.attr("data-swiper-autoplay") || b.params.autoplay), b.autoplayTimeoutId = setTimeout(function() {
				b.params.loop ? (b.fixLoop(), b._slideNext(), b.emit("onAutoplay", b)) : b.isEnd ? a.autoplayStopOnLast ? b.stopAutoplay() : (b._slideTo(0), b.emit("onAutoplay", b)) : (b._slideNext(), b.emit("onAutoplay", b))
			}, e)
		}

		function s(t, n) {
			var i = e(t.target);
			if(!i.is(n))
				if("string" == typeof n) i = i.parents(n);
				else if(n.nodeType) {
				var a;
				return i.parents().each(function(e, t) {
					t === n && (a = n)
				}), a ? n : void 0
			}
			if(0 !== i.length) return i[0]
		}

		function l(e, t) {
			t = t || {};
			var n = window.MutationObserver || window.WebkitMutationObserver,
				i = new n(function(e) {
					e.forEach(function(e) {
						b.onResize(!0), b.emit("onObserverUpdate", b, e)
					})
				});
			i.observe(e, {
				attributes: void 0 === t.attributes || t.attributes,
				childList: void 0 === t.childList || t.childList,
				characterData: void 0 === t.characterData || t.characterData
			}), b.observers.push(i)
		}

		function d(e) {
			e.originalEvent && (e = e.originalEvent);
			var t = e.keyCode || e.charCode;
			if(!b.params.allowSwipeToNext && (b.isHorizontal() && 39 === t || !b.isHorizontal() && 40 === t)) return !1;
			if(!b.params.allowSwipeToPrev && (b.isHorizontal() && 37 === t || !b.isHorizontal() && 38 === t)) return !1;
			if(!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
				if(37 === t || 39 === t || 38 === t || 40 === t) {
					var n = !1;
					if(b.container.parents("." + b.params.slideClass).length > 0 && 0 === b.container.parents("." + b.params.slideActiveClass).length) return;
					var i = {
							left: window.pageXOffset,
							top: window.pageYOffset
						},
						a = window.innerWidth,
						r = window.innerHeight,
						o = b.container.offset();
					b.rtl && (o.left = o.left - b.container[0].scrollLeft);
					for(var s = [
							[o.left, o.top],
							[o.left + b.width, o.top],
							[o.left, o.top + b.height],
							[o.left + b.width, o.top + b.height]
						], l = 0; l < s.length; l++) {
						var d = s[l];
						d[0] >= i.left && d[0] <= i.left + a && d[1] >= i.top && d[1] <= i.top + r && (n = !0)
					}
					if(!n) return
				}
				b.isHorizontal() ? (37 !== t && 39 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === t && !b.rtl || 37 === t && b.rtl) && b.slideNext(), (37 === t && !b.rtl || 39 === t && b.rtl) && b.slidePrev()) : (38 !== t && 40 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === t && b.slideNext(), 38 === t && b.slidePrev())
			}
		}

		function c(e) {
			e.originalEvent && (e = e.originalEvent);
			var t = 0,
				n = b.rtl ? -1 : 1,
				i = u(e);
			if(b.params.mousewheelForceToAxis)
				if(b.isHorizontal()) {
					if(!(Math.abs(i.pixelX) > Math.abs(i.pixelY))) return;
					t = i.pixelX * n
				} else {
					if(!(Math.abs(i.pixelY) > Math.abs(i.pixelX))) return;
					t = i.pixelY
				}
			else t = Math.abs(i.pixelX) > Math.abs(i.pixelY) ? -i.pixelX * n : -i.pixelY;
			if(0 !== t) {
				if(b.params.mousewheelInvert && (t = -t), b.params.freeMode) {
					var a = b.getWrapperTranslate() + t * b.params.mousewheelSensitivity,
						r = b.isBeginning,
						o = b.isEnd;
					if(a >= b.minTranslate() && (a = b.minTranslate()), a <= b.maxTranslate() && (a = b.maxTranslate()), b.setWrapperTransition(0), b.setWrapperTranslate(a), b.updateProgress(), b.updateActiveIndex(), (!r && b.isBeginning || !o && b.isEnd) && b.updateClasses(), b.params.freeModeSticky ? (clearTimeout(b.mousewheel.timeout), b.mousewheel.timeout = setTimeout(function() {
							b.slideReset()
						}, 300)) : b.params.lazyLoading && b.lazy && b.lazy.load(), b.emit("onScroll", b, e), b.params.autoplay && b.params.autoplayDisableOnInteraction && b.stopAutoplay(), 0 === a || a === b.maxTranslate()) return
				} else {
					if((new window.Date).getTime() - b.mousewheel.lastScrollTime > 60)
						if(t < 0)
							if(b.isEnd && !b.params.loop || b.animating) {
								if(b.params.mousewheelReleaseOnEdges) return !0
							} else b.slideNext(), b.emit("onScroll", b, e);
					else if(b.isBeginning && !b.params.loop || b.animating) {
						if(b.params.mousewheelReleaseOnEdges) return !0
					} else b.slidePrev(), b.emit("onScroll", b, e);
					b.mousewheel.lastScrollTime = (new window.Date).getTime()
				}
				return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
			}
		}

		function u(e) {
			var t = 0,
				n = 0,
				i = 0,
				a = 0;
			return "detail" in e && (n = e.detail), "wheelDelta" in e && (n = -e.wheelDelta / 120), "wheelDeltaY" in e && (n = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = n, n = 0), i = 10 * t, a = 10 * n, "deltaY" in e && (a = e.deltaY), "deltaX" in e && (i = e.deltaX), (i || a) && e.deltaMode && (1 === e.deltaMode ? (i *= 40, a *= 40) : (i *= 800, a *= 800)), i && !t && (t = i < 1 ? -1 : 1), a && !n && (n = a < 1 ? -1 : 1), {
				spinX: t,
				spinY: n,
				pixelX: i,
				pixelY: a
			}
		}

		function p(t, n) {
			t = e(t);
			var i, a, r, o = b.rtl ? -1 : 1;
			i = t.attr("data-swiper-parallax") || "0", a = t.attr("data-swiper-parallax-x"), r = t.attr("data-swiper-parallax-y"), a || r ? (a = a || "0", r = r || "0") : b.isHorizontal() ? (a = i, r = "0") : (r = i, a = "0"), a = a.indexOf("%") >= 0 ? parseInt(a, 10) * n * o + "%" : a * n * o + "px", r = r.indexOf("%") >= 0 ? parseInt(r, 10) * n + "%" : r * n + "px", t.transform("translate3d(" + a + ", " + r + ",0px)")
		}

		function h(e) {
			return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
		}
		if(!(this instanceof t)) return new t(i, a);
		var m = {
				direction: "horizontal",
				touchEventsTarget: "container",
				initialSlide: 0,
				speed: 300,
				autoplay: !1,
				autoplayDisableOnInteraction: !0,
				autoplayStopOnLast: !1,
				iOSEdgeSwipeDetection: !1,
				iOSEdgeSwipeThreshold: 20,
				freeMode: !1,
				freeModeMomentum: !0,
				freeModeMomentumRatio: 1,
				freeModeMomentumBounce: !0,
				freeModeMomentumBounceRatio: 1,
				freeModeMomentumVelocityRatio: 1,
				freeModeSticky: !1,
				freeModeMinimumVelocity: .02,
				autoHeight: !1,
				setWrapperSize: !1,
				virtualTranslate: !1,
				effect: "slide",
				coverflow: {
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: !0
				},
				flip: {
					slideShadows: !0,
					limitRotation: !0
				},
				cube: {
					slideShadows: !0,
					shadow: !0,
					shadowOffset: 20,
					shadowScale: .94
				},
				fade: {
					crossFade: !1
				},
				parallax: !1,
				zoom: !1,
				zoomMax: 3,
				zoomMin: 1,
				zoomToggle: !0,
				scrollbar: null,
				scrollbarHide: !0,
				scrollbarDraggable: !1,
				scrollbarSnapOnRelease: !1,
				keyboardControl: !1,
				mousewheelControl: !1,
				mousewheelReleaseOnEdges: !1,
				mousewheelInvert: !1,
				mousewheelForceToAxis: !1,
				mousewheelSensitivity: 1,
				mousewheelEventsTarged: "container",
				hashnav: !1,
				hashnavWatchState: !1,
				history: !1,
				replaceState: !1,
				breakpoints: void 0,
				spaceBetween: 0,
				slidesPerView: 1,
				slidesPerColumn: 1,
				slidesPerColumnFill: "column",
				slidesPerGroup: 1,
				centeredSlides: !1,
				slidesOffsetBefore: 0,
				slidesOffsetAfter: 0,
				roundLengths: !1,
				touchRatio: 1,
				touchAngle: 45,
				simulateTouch: !0,
				shortSwipes: !0,
				longSwipes: !0,
				longSwipesRatio: .5,
				longSwipesMs: 300,
				followFinger: !0,
				onlyExternal: !1,
				threshold: 0,
				touchMoveStopPropagation: !0,
				touchReleaseOnEdges: !1,
				uniqueNavElements: !0,
				pagination: null,
				paginationElement: "span",
				paginationClickable: !1,
				paginationHide: !1,
				paginationBulletRender: null,
				paginationProgressRender: null,
				paginationFractionRender: null,
				paginationCustomRender: null,
				paginationType: "bullets",
				resistance: !0,
				resistanceRatio: .85,
				nextButton: null,
				prevButton: null,
				watchSlidesProgress: !1,
				watchSlidesVisibility: !1,
				grabCursor: !1,
				preventClicks: !0,
				preventClicksPropagation: !0,
				slideToClickedSlide: !1,
				lazyLoading: !1,
				lazyLoadingInPrevNext: !1,
				lazyLoadingInPrevNextAmount: 1,
				lazyLoadingOnTransitionStart: !1,
				preloadImages: !0,
				updateOnImagesReady: !0,
				loop: !1,
				loopAdditionalSlides: 0,
				loopedSlides: null,
				control: void 0,
				controlInverse: !1,
				controlBy: "slide",
				normalizeSlideIndex: !0,
				allowSwipeToPrev: !0,
				allowSwipeToNext: !0,
				swipeHandler: null,
				noSwiping: !0,
				noSwipingClass: "swiper-no-swiping",
				passiveListeners: !0,
				containerModifierClass: "swiper-container-",
				slideClass: "swiper-slide",
				slideActiveClass: "swiper-slide-active",
				slideDuplicateActiveClass: "swiper-slide-duplicate-active",
				slideVisibleClass: "swiper-slide-visible",
				slideDuplicateClass: "swiper-slide-duplicate",
				slideNextClass: "swiper-slide-next",
				slideDuplicateNextClass: "swiper-slide-duplicate-next",
				slidePrevClass: "swiper-slide-prev",
				slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
				wrapperClass: "swiper-wrapper",
				bulletClass: "swiper-pagination-bullet",
				bulletActiveClass: "swiper-pagination-bullet-active",
				buttonDisabledClass: "swiper-button-disabled",
				paginationCurrentClass: "swiper-pagination-current",
				paginationTotalClass: "swiper-pagination-total",
				paginationHiddenClass: "swiper-pagination-hidden",
				paginationProgressbarClass: "swiper-pagination-progressbar",
				paginationClickableClass: "swiper-pagination-clickable",
				paginationModifierClass: "swiper-pagination-",
				lazyLoadingClass: "swiper-lazy",
				lazyStatusLoadingClass: "swiper-lazy-loading",
				lazyStatusLoadedClass: "swiper-lazy-loaded",
				lazyPreloaderClass: "swiper-lazy-preloader",
				notificationClass: "swiper-notification",
				preloaderClass: "preloader",
				zoomContainerClass: "swiper-zoom-container",
				observer: !1,
				observeParents: !1,
				a11y: !1,
				prevSlideMessage: "Previous slide",
				nextSlideMessage: "Next slide",
				firstSlideMessage: "This is the first slide",
				lastSlideMessage: "This is the last slide",
				paginationBulletMessage: "Go to slide {{index}}",
				runCallbacksOnInit: !0
			},
			f = a && a.virtualTranslate;
		a = a || {};
		var g = {};
		for(var v in a)
			if("object" != typeof a[v] || null === a[v] || a[v].nodeType || a[v] === window || a[v] === document || void 0 !== n && a[v] instanceof n || "undefined" != typeof jQuery && a[v] instanceof jQuery) g[v] = a[v];
			else {
				g[v] = {};
				for(var w in a[v]) g[v][w] = a[v][w]
			}
		for(var y in m)
			if(void 0 === a[y]) a[y] = m[y];
			else if("object" == typeof a[y])
			for(var x in m[y]) void 0 === a[y][x] && (a[y][x] = m[y][x]);
		var b = this;
		if(b.params = a, b.originalParams = g, b.classNames = [], void 0 !== e && void 0 !== n && (e = n), (void 0 !== e || (e = void 0 === n ? window.Dom7 || window.Zepto || window.jQuery : n)) && (b.$ = e, b.currentBreakpoint = void 0, b.getActiveBreakpoint = function() {
				if(!b.params.breakpoints) return !1;
				var e, t = !1,
					n = [];
				for(e in b.params.breakpoints) b.params.breakpoints.hasOwnProperty(e) && n.push(e);
				n.sort(function(e, t) {
					return parseInt(e, 10) > parseInt(t, 10)
				});
				for(var i = 0; i < n.length; i++)(e = n[i]) >= window.innerWidth && !t && (t = e);
				return t || "max"
			}, b.setBreakpoint = function() {
				var e = b.getActiveBreakpoint();
				if(e && b.currentBreakpoint !== e) {
					var t = e in b.params.breakpoints ? b.params.breakpoints[e] : b.originalParams,
						n = b.params.loop && t.slidesPerView !== b.params.slidesPerView;
					for(var i in t) b.params[i] = t[i];
					b.currentBreakpoint = e, n && b.destroyLoop && b.reLoop(!0)
				}
			}, b.params.breakpoints && b.setBreakpoint(), b.container = e(i), 0 !== b.container.length)) {
			if(b.container.length > 1) {
				var T = [];
				return b.container.each(function() {
					T.push(new t(this, a))
				}), T
			}
			b.container[0].swiper = b, b.container.data("swiper", b), b.classNames.push(b.params.containerModifierClass + b.params.direction), b.params.freeMode && b.classNames.push(b.params.containerModifierClass + "free-mode"), b.support.flexbox || (b.classNames.push(b.params.containerModifierClass + "no-flexbox"), b.params.slidesPerColumn = 1), b.params.autoHeight && b.classNames.push(b.params.containerModifierClass + "autoheight"), (b.params.parallax || b.params.watchSlidesVisibility) && (b.params.watchSlidesProgress = !0), b.params.touchReleaseOnEdges && (b.params.resistanceRatio = 0), ["cube", "coverflow", "flip"].indexOf(b.params.effect) >= 0 && (b.support.transforms3d ? (b.params.watchSlidesProgress = !0, b.classNames.push(b.params.containerModifierClass + "3d")) : b.params.effect = "slide"), "slide" !== b.params.effect && b.classNames.push(b.params.containerModifierClass + b.params.effect), "cube" === b.params.effect && (b.params.resistanceRatio = 0, b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.centeredSlides = !1, b.params.spaceBetween = 0, b.params.virtualTranslate = !0, b.params.setWrapperSize = !1), "fade" !== b.params.effect && "flip" !== b.params.effect || (b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.watchSlidesProgress = !0, b.params.spaceBetween = 0, b.params.setWrapperSize = !1, void 0 === f && (b.params.virtualTranslate = !0)), b.params.grabCursor && b.support.touch && (b.params.grabCursor = !1), b.wrapper = b.container.children("." + b.params.wrapperClass), b.params.pagination && (b.paginationContainer = e(b.params.pagination), b.params.uniqueNavElements && "string" == typeof b.params.pagination && b.paginationContainer.length > 1 && 1 === b.container.find(b.params.pagination).length && (b.paginationContainer = b.container.find(b.params.pagination)), "bullets" === b.params.paginationType && b.params.paginationClickable ? b.paginationContainer.addClass(b.params.paginationModifierClass + "clickable") : b.params.paginationClickable = !1, b.paginationContainer.addClass(b.params.paginationModifierClass + b.params.paginationType)), (b.params.nextButton || b.params.prevButton) && (b.params.nextButton && (b.nextButton = e(b.params.nextButton), b.params.uniqueNavElements && "string" == typeof b.params.nextButton && b.nextButton.length > 1 && 1 === b.container.find(b.params.nextButton).length && (b.nextButton = b.container.find(b.params.nextButton))), b.params.prevButton && (b.prevButton = e(b.params.prevButton), b.params.uniqueNavElements && "string" == typeof b.params.prevButton && b.prevButton.length > 1 && 1 === b.container.find(b.params.prevButton).length && (b.prevButton = b.container.find(b.params.prevButton)))), b.isHorizontal = function() {
				return "horizontal" === b.params.direction
			}, b.rtl = b.isHorizontal() && ("rtl" === b.container[0].dir.toLowerCase() || "rtl" === b.container.css("direction")), b.rtl && b.classNames.push(b.params.containerModifierClass + "rtl"), b.rtl && (b.wrongRTL = "-webkit-box" === b.wrapper.css("display")), b.params.slidesPerColumn > 1 && b.classNames.push(b.params.containerModifierClass + "multirow"), b.device.android && b.classNames.push(b.params.containerModifierClass + "android"), b.container.addClass(b.classNames.join(" ")), b.translate = 0, b.progress = 0, b.velocity = 0, b.lockSwipeToNext = function() {
				b.params.allowSwipeToNext = !1, !1 === b.params.allowSwipeToPrev && b.params.grabCursor && b.unsetGrabCursor()
			}, b.lockSwipeToPrev = function() {
				b.params.allowSwipeToPrev = !1, !1 === b.params.allowSwipeToNext && b.params.grabCursor && b.unsetGrabCursor()
			}, b.lockSwipes = function() {
				b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !1, b.params.grabCursor && b.unsetGrabCursor()
			}, b.unlockSwipeToNext = function() {
				b.params.allowSwipeToNext = !0, !0 === b.params.allowSwipeToPrev && b.params.grabCursor && b.setGrabCursor()
			}, b.unlockSwipeToPrev = function() {
				b.params.allowSwipeToPrev = !0, !0 === b.params.allowSwipeToNext && b.params.grabCursor && b.setGrabCursor()
			}, b.unlockSwipes = function() {
				b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !0, b.params.grabCursor && b.setGrabCursor()
			}, b.setGrabCursor = function(e) {
				b.container[0].style.cursor = "move", b.container[0].style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", b.container[0].style.cursor = e ? "-moz-grabbin" : "-moz-grab", b.container[0].style.cursor = e ? "grabbing" : "grab"
			}, b.unsetGrabCursor = function() {
				b.container[0].style.cursor = ""
			}, b.params.grabCursor && b.setGrabCursor(), b.imagesToLoad = [], b.imagesLoaded = 0, b.loadImage = function(e, t, n, i, a, r) {
				function o() {
					r && r()
				}
				var s;
				e.complete && a ? o() : t ? (s = new window.Image, s.onload = o, s.onerror = o, i && (s.sizes = i), n && (s.srcset = n), t && (s.src = t)) : o()
			}, b.preloadImages = function() {
				function e() {
					void 0 !== b && null !== b && b && (void 0 !== b.imagesLoaded && b.imagesLoaded++, b.imagesLoaded === b.imagesToLoad.length && (b.params.updateOnImagesReady && b.update(), b.emit("onImagesReady", b)))
				}
				b.imagesToLoad = b.container.find("img");
				for(var t = 0; t < b.imagesToLoad.length; t++) b.loadImage(b.imagesToLoad[t], b.imagesToLoad[t].currentSrc || b.imagesToLoad[t].getAttribute("src"), b.imagesToLoad[t].srcset || b.imagesToLoad[t].getAttribute("srcset"), b.imagesToLoad[t].sizes || b.imagesToLoad[t].getAttribute("sizes"), !0, e)
			}, b.autoplayTimeoutId = void 0, b.autoplaying = !1, b.autoplayPaused = !1, b.startAutoplay = function() {
				return void 0 === b.autoplayTimeoutId && !!b.params.autoplay && !b.autoplaying && (b.autoplaying = !0, b.emit("onAutoplayStart", b), void o())
			}, b.stopAutoplay = function(e) {
				b.autoplayTimeoutId && (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplaying = !1, b.autoplayTimeoutId = void 0, b.emit("onAutoplayStop", b))
			}, b.pauseAutoplay = function(e) {
				b.autoplayPaused || (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplayPaused = !0, 0 === e ? (b.autoplayPaused = !1, o()) : b.wrapper.transitionEnd(function() {
					b && (b.autoplayPaused = !1, b.autoplaying ? o() : b.stopAutoplay())
				}))
			}, b.minTranslate = function() {
				return -b.snapGrid[0]
			}, b.maxTranslate = function() {
				return -b.snapGrid[b.snapGrid.length - 1]
			}, b.updateAutoHeight = function() {
				var e, t = [],
					n = 0;
				if("auto" !== b.params.slidesPerView && b.params.slidesPerView > 1)
					for(e = 0; e < Math.ceil(b.params.slidesPerView); e++) {
						var i = b.activeIndex + e;
						if(i > b.slides.length) break;
						t.push(b.slides.eq(i)[0])
					} else t.push(b.slides.eq(b.activeIndex)[0]);
				for(e = 0; e < t.length; e++)
					if(void 0 !== t[e]) {
						var a = t[e].offsetHeight;
						n = a > n ? a : n
					}
				n && b.wrapper.css("height", n + "px")
			}, b.updateContainerSize = function() {
				var e, t;
				e = void 0 !== b.params.width ? b.params.width : b.container[0].clientWidth, t = void 0 !== b.params.height ? b.params.height : b.container[0].clientHeight, 0 === e && b.isHorizontal() || 0 === t && !b.isHorizontal() || (e = e - parseInt(b.container.css("padding-left"), 10) - parseInt(b.container.css("padding-right"), 10), t = t - parseInt(b.container.css("padding-top"), 10) - parseInt(b.container.css("padding-bottom"), 10), b.width = e, b.height = t, b.size = b.isHorizontal() ? b.width : b.height)
			}, b.updateSlidesSize = function() {
				b.slides = b.wrapper.children("." + b.params.slideClass), b.snapGrid = [], b.slidesGrid = [], b.slidesSizesGrid = [];
				var e, t = b.params.spaceBetween,
					n = -b.params.slidesOffsetBefore,
					i = 0,
					a = 0;
				if(void 0 !== b.size) {
					"string" == typeof t && t.indexOf("%") >= 0 && (t = parseFloat(t.replace("%", "")) / 100 * b.size), b.virtualSize = -t, b.rtl ? b.slides.css({
						marginLeft: "",
						marginTop: ""
					}) : b.slides.css({
						marginRight: "",
						marginBottom: ""
					});
					var o;
					b.params.slidesPerColumn > 1 && (o = Math.floor(b.slides.length / b.params.slidesPerColumn) === b.slides.length / b.params.slidesPerColumn ? b.slides.length : Math.ceil(b.slides.length / b.params.slidesPerColumn) * b.params.slidesPerColumn, "auto" !== b.params.slidesPerView && "row" === b.params.slidesPerColumnFill && (o = Math.max(o, b.params.slidesPerView * b.params.slidesPerColumn)));
					var s, l = b.params.slidesPerColumn,
						d = o / l,
						c = d - (b.params.slidesPerColumn * d - b.slides.length);
					for(e = 0; e < b.slides.length; e++) {
						s = 0;
						var u = b.slides.eq(e);
						if(b.params.slidesPerColumn > 1) {
							var p, h, m;
							"column" === b.params.slidesPerColumnFill ? (h = Math.floor(e / l), m = e - h * l, (h > c || h === c && m === l - 1) && ++m >= l && (m = 0, h++), p = h + m * o / l, u.css({
								"-webkit-box-ordinal-group": p,
								"-moz-box-ordinal-group": p,
								"-ms-flex-order": p,
								"-webkit-order": p,
								order: p
							})) : (m = Math.floor(e / d), h = e - m * d), u.css("margin-" + (b.isHorizontal() ? "top" : "left"), 0 !== m && b.params.spaceBetween && b.params.spaceBetween + "px").attr("data-swiper-column", h).attr("data-swiper-row", m)
						}
						"none" !== u.css("display") && ("auto" === b.params.slidesPerView ? (s = b.isHorizontal() ? u.outerWidth(!0) : u.outerHeight(!0), b.params.roundLengths && (s = r(s))) : (s = (b.size - (b.params.slidesPerView - 1) * t) / b.params.slidesPerView, b.params.roundLengths && (s = r(s)), b.isHorizontal() ? b.slides[e].style.width = s + "px" : b.slides[e].style.height = s + "px"), b.slides[e].swiperSlideSize = s, b.slidesSizesGrid.push(s), b.params.centeredSlides ? (n = n + s / 2 + i / 2 + t, 0 === e && (n = n - b.size / 2 - t), Math.abs(n) < .001 && (n = 0),
							a % b.params.slidesPerGroup == 0 && b.snapGrid.push(n), b.slidesGrid.push(n)) : (a % b.params.slidesPerGroup == 0 && b.snapGrid.push(n), b.slidesGrid.push(n), n = n + s + t), b.virtualSize += s + t, i = s, a++)
					}
					b.virtualSize = Math.max(b.virtualSize, b.size) + b.params.slidesOffsetAfter;
					var f;
					if(b.rtl && b.wrongRTL && ("slide" === b.params.effect || "coverflow" === b.params.effect) && b.wrapper.css({
							width: b.virtualSize + b.params.spaceBetween + "px"
						}), b.support.flexbox && !b.params.setWrapperSize || (b.isHorizontal() ? b.wrapper.css({
							width: b.virtualSize + b.params.spaceBetween + "px"
						}) : b.wrapper.css({
							height: b.virtualSize + b.params.spaceBetween + "px"
						})), b.params.slidesPerColumn > 1 && (b.virtualSize = (s + b.params.spaceBetween) * o, b.virtualSize = Math.ceil(b.virtualSize / b.params.slidesPerColumn) - b.params.spaceBetween, b.isHorizontal() ? b.wrapper.css({
							width: b.virtualSize + b.params.spaceBetween + "px"
						}) : b.wrapper.css({
							height: b.virtualSize + b.params.spaceBetween + "px"
						}), b.params.centeredSlides)) {
						for(f = [], e = 0; e < b.snapGrid.length; e++) b.snapGrid[e] < b.virtualSize + b.snapGrid[0] && f.push(b.snapGrid[e]);
						b.snapGrid = f
					}
					if(!b.params.centeredSlides) {
						for(f = [], e = 0; e < b.snapGrid.length; e++) b.snapGrid[e] <= b.virtualSize - b.size && f.push(b.snapGrid[e]);
						b.snapGrid = f, Math.floor(b.virtualSize - b.size) - Math.floor(b.snapGrid[b.snapGrid.length - 1]) > 1 && b.snapGrid.push(b.virtualSize - b.size)
					}
					0 === b.snapGrid.length && (b.snapGrid = [0]), 0 !== b.params.spaceBetween && (b.isHorizontal() ? b.rtl ? b.slides.css({
						marginLeft: t + "px"
					}) : b.slides.css({
						marginRight: t + "px"
					}) : b.slides.css({
						marginBottom: t + "px"
					})), b.params.watchSlidesProgress && b.updateSlidesOffset()
				}
			}, b.updateSlidesOffset = function() {
				for(var e = 0; e < b.slides.length; e++) b.slides[e].swiperSlideOffset = b.isHorizontal() ? b.slides[e].offsetLeft : b.slides[e].offsetTop
			}, b.currentSlidesPerView = function() {
				var e, t, n = 1;
				if(b.params.centeredSlides) {
					var i, a = b.slides[b.activeIndex].swiperSlideSize;
					for(e = b.activeIndex + 1; e < b.slides.length; e++) b.slides[e] && !i && (a += b.slides[e].swiperSlideSize, n++, a > b.size && (i = !0));
					for(t = b.activeIndex - 1; t >= 0; t--) b.slides[t] && !i && (a += b.slides[t].swiperSlideSize, n++, a > b.size && (i = !0))
				} else
					for(e = b.activeIndex + 1; e < b.slides.length; e++) b.slidesGrid[e] - b.slidesGrid[b.activeIndex] < b.size && n++;
				return n
			}, b.updateSlidesProgress = function(e) {
				if(void 0 === e && (e = b.translate || 0), 0 !== b.slides.length) {
					void 0 === b.slides[0].swiperSlideOffset && b.updateSlidesOffset();
					var t = -e;
					b.rtl && (t = e), b.slides.removeClass(b.params.slideVisibleClass);
					for(var n = 0; n < b.slides.length; n++) {
						var i = b.slides[n],
							a = (t + (b.params.centeredSlides ? b.minTranslate() : 0) - i.swiperSlideOffset) / (i.swiperSlideSize + b.params.spaceBetween);
						if(b.params.watchSlidesVisibility) {
							var r = -(t - i.swiperSlideOffset),
								o = r + b.slidesSizesGrid[n];
							(r >= 0 && r < b.size || o > 0 && o <= b.size || r <= 0 && o >= b.size) && b.slides.eq(n).addClass(b.params.slideVisibleClass)
						}
						i.progress = b.rtl ? -a : a
					}
				}
			}, b.updateProgress = function(e) {
				void 0 === e && (e = b.translate || 0);
				var t = b.maxTranslate() - b.minTranslate(),
					n = b.isBeginning,
					i = b.isEnd;
				0 === t ? (b.progress = 0, b.isBeginning = b.isEnd = !0) : (b.progress = (e - b.minTranslate()) / t, b.isBeginning = b.progress <= 0, b.isEnd = b.progress >= 1), b.isBeginning && !n && b.emit("onReachBeginning", b), b.isEnd && !i && b.emit("onReachEnd", b), b.params.watchSlidesProgress && b.updateSlidesProgress(e), b.emit("onProgress", b, b.progress)
			}, b.updateActiveIndex = function() {
				var e, t, n, i = b.rtl ? b.translate : -b.translate;
				for(t = 0; t < b.slidesGrid.length; t++) void 0 !== b.slidesGrid[t + 1] ? i >= b.slidesGrid[t] && i < b.slidesGrid[t + 1] - (b.slidesGrid[t + 1] - b.slidesGrid[t]) / 2 ? e = t : i >= b.slidesGrid[t] && i < b.slidesGrid[t + 1] && (e = t + 1) : i >= b.slidesGrid[t] && (e = t);
				b.params.normalizeSlideIndex && (e < 0 || void 0 === e) && (e = 0), n = Math.floor(e / b.params.slidesPerGroup), n >= b.snapGrid.length && (n = b.snapGrid.length - 1), e !== b.activeIndex && (b.snapIndex = n, b.previousIndex = b.activeIndex, b.activeIndex = e, b.updateClasses(), b.updateRealIndex())
			}, b.updateRealIndex = function() {
				b.realIndex = parseInt(b.slides.eq(b.activeIndex).attr("data-swiper-slide-index") || b.activeIndex, 10)
			}, b.updateClasses = function() {
				b.slides.removeClass(b.params.slideActiveClass + " " + b.params.slideNextClass + " " + b.params.slidePrevClass + " " + b.params.slideDuplicateActiveClass + " " + b.params.slideDuplicateNextClass + " " + b.params.slideDuplicatePrevClass);
				var t = b.slides.eq(b.activeIndex);
				t.addClass(b.params.slideActiveClass), a.loop && (t.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children("." + b.params.slideClass + ":not(." + b.params.slideDuplicateClass + ')[data-swiper-slide-index="' + b.realIndex + '"]').addClass(b.params.slideDuplicateActiveClass) : b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + b.realIndex + '"]').addClass(b.params.slideDuplicateActiveClass));
				var n = t.next("." + b.params.slideClass).addClass(b.params.slideNextClass);
				b.params.loop && 0 === n.length && (n = b.slides.eq(0), n.addClass(b.params.slideNextClass));
				var i = t.prev("." + b.params.slideClass).addClass(b.params.slidePrevClass);
				if(b.params.loop && 0 === i.length && (i = b.slides.eq(-1), i.addClass(b.params.slidePrevClass)), a.loop && (n.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children("." + b.params.slideClass + ":not(." + b.params.slideDuplicateClass + ')[data-swiper-slide-index="' + n.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicateNextClass) : b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + n.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicateNextClass), i.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children("." + b.params.slideClass + ":not(." + b.params.slideDuplicateClass + ')[data-swiper-slide-index="' + i.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicatePrevClass) : b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + i.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicatePrevClass)), b.paginationContainer && b.paginationContainer.length > 0) {
					var r, o = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length;
					if(b.params.loop ? (r = Math.ceil((b.activeIndex - b.loopedSlides) / b.params.slidesPerGroup), r > b.slides.length - 1 - 2 * b.loopedSlides && (r -= b.slides.length - 2 * b.loopedSlides), r > o - 1 && (r -= o), r < 0 && "bullets" !== b.params.paginationType && (r = o + r)) : r = void 0 !== b.snapIndex ? b.snapIndex : b.activeIndex || 0, "bullets" === b.params.paginationType && b.bullets && b.bullets.length > 0 && (b.bullets.removeClass(b.params.bulletActiveClass), b.paginationContainer.length > 1 ? b.bullets.each(function() {
							e(this).index() === r && e(this).addClass(b.params.bulletActiveClass)
						}) : b.bullets.eq(r).addClass(b.params.bulletActiveClass)), "fraction" === b.params.paginationType && (b.paginationContainer.find("." + b.params.paginationCurrentClass).text(r + 1), b.paginationContainer.find("." + b.params.paginationTotalClass).text(o)), "progress" === b.params.paginationType) {
						var s = (r + 1) / o,
							l = s,
							d = 1;
						b.isHorizontal() || (d = s, l = 1), b.paginationContainer.find("." + b.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + l + ") scaleY(" + d + ")").transition(b.params.speed)
					}
					"custom" === b.params.paginationType && b.params.paginationCustomRender && (b.paginationContainer.html(b.params.paginationCustomRender(b, r + 1, o)), b.emit("onPaginationRendered", b, b.paginationContainer[0]))
				}
				b.params.loop || (b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.isBeginning ? (b.prevButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.prevButton)) : (b.prevButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.prevButton))), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.isEnd ? (b.nextButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.nextButton)) : (b.nextButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.nextButton))))
			}, b.updatePagination = function() {
				if(b.params.pagination && b.paginationContainer && b.paginationContainer.length > 0) {
					var e = "";
					if("bullets" === b.params.paginationType) {
						for(var t = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length, n = 0; n < t; n++) e += b.params.paginationBulletRender ? b.params.paginationBulletRender(b, n, b.params.bulletClass) : "<" + b.params.paginationElement + ' class="' + b.params.bulletClass + '"></' + b.params.paginationElement + ">";
						b.paginationContainer.html(e), b.bullets = b.paginationContainer.find("." + b.params.bulletClass), b.params.paginationClickable && b.params.a11y && b.a11y && b.a11y.initPagination()
					}
					"fraction" === b.params.paginationType && (e = b.params.paginationFractionRender ? b.params.paginationFractionRender(b, b.params.paginationCurrentClass, b.params.paginationTotalClass) : '<span class="' + b.params.paginationCurrentClass + '"></span> / <span class="' + b.params.paginationTotalClass + '"></span>', b.paginationContainer.html(e)), "progress" === b.params.paginationType && (e = b.params.paginationProgressRender ? b.params.paginationProgressRender(b, b.params.paginationProgressbarClass) : '<span class="' + b.params.paginationProgressbarClass + '"></span>', b.paginationContainer.html(e)), "custom" !== b.params.paginationType && b.emit("onPaginationRendered", b, b.paginationContainer[0])
				}
			}, b.update = function(e) {
				function t() {
					b.rtl, b.translate, n = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate()), b.setWrapperTranslate(n), b.updateActiveIndex(), b.updateClasses()
				}
				if(b)
					if(b.updateContainerSize(), b.updateSlidesSize(), b.updateProgress(), b.updatePagination(), b.updateClasses(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), e) {
						var n;
						b.controller && b.controller.spline && (b.controller.spline = void 0), b.params.freeMode ? (t(), b.params.autoHeight && b.updateAutoHeight()) : (("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0)) || t()
					} else b.params.autoHeight && b.updateAutoHeight()
			}, b.onResize = function(e) {
				b.params.breakpoints && b.setBreakpoint();
				var t = b.params.allowSwipeToPrev,
					n = b.params.allowSwipeToNext;
				b.params.allowSwipeToPrev = b.params.allowSwipeToNext = !0, b.updateContainerSize(), b.updateSlidesSize(), ("auto" === b.params.slidesPerView || b.params.freeMode || e) && b.updatePagination(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), b.controller && b.controller.spline && (b.controller.spline = void 0);
				var i = !1;
				if(b.params.freeMode) {
					var a = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate());
					b.setWrapperTranslate(a), b.updateActiveIndex(), b.updateClasses(), b.params.autoHeight && b.updateAutoHeight()
				} else b.updateClasses(), i = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0);
				b.params.lazyLoading && !i && b.lazy && b.lazy.load(), b.params.allowSwipeToPrev = t, b.params.allowSwipeToNext = n
			}, b.touchEventsDesktop = {
				start: "mousedown",
				move: "mousemove",
				end: "mouseup"
			}, window.navigator.pointerEnabled ? b.touchEventsDesktop = {
				start: "pointerdown",
				move: "pointermove",
				end: "pointerup"
			} : window.navigator.msPointerEnabled && (b.touchEventsDesktop = {
				start: "MSPointerDown",
				move: "MSPointerMove",
				end: "MSPointerUp"
			}), b.touchEvents = {
				start: b.support.touch || !b.params.simulateTouch ? "touchstart" : b.touchEventsDesktop.start,
				move: b.support.touch || !b.params.simulateTouch ? "touchmove" : b.touchEventsDesktop.move,
				end: b.support.touch || !b.params.simulateTouch ? "touchend" : b.touchEventsDesktop.end
			}, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === b.params.touchEventsTarget ? b.container : b.wrapper).addClass("swiper-wp8-" + b.params.direction), b.initEvents = function(e) {
				var t = e ? "off" : "on",
					n = e ? "removeEventListener" : "addEventListener",
					i = "container" === b.params.touchEventsTarget ? b.container[0] : b.wrapper[0],
					r = b.support.touch ? i : document,
					o = !!b.params.nested;
				if(b.browser.ie) i[n](b.touchEvents.start, b.onTouchStart, !1), r[n](b.touchEvents.move, b.onTouchMove, o), r[n](b.touchEvents.end, b.onTouchEnd, !1);
				else {
					if(b.support.touch) {
						var s = !("touchstart" !== b.touchEvents.start || !b.support.passiveListener || !b.params.passiveListeners) && {
							passive: !0,
							capture: !1
						};
						i[n](b.touchEvents.start, b.onTouchStart, s), i[n](b.touchEvents.move, b.onTouchMove, o), i[n](b.touchEvents.end, b.onTouchEnd, s)
					}(a.simulateTouch && !b.device.ios && !b.device.android || a.simulateTouch && !b.support.touch && b.device.ios) && (i[n]("mousedown", b.onTouchStart, !1), document[n]("mousemove", b.onTouchMove, o), document[n]("mouseup", b.onTouchEnd, !1))
				}
				window[n]("resize", b.onResize), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.nextButton[t]("click", b.onClickNext), b.params.a11y && b.a11y && b.nextButton[t]("keydown", b.a11y.onEnterKey)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.prevButton[t]("click", b.onClickPrev), b.params.a11y && b.a11y && b.prevButton[t]("keydown", b.a11y.onEnterKey)), b.params.pagination && b.params.paginationClickable && (b.paginationContainer[t]("click", "." + b.params.bulletClass, b.onClickIndex), b.params.a11y && b.a11y && b.paginationContainer[t]("keydown", "." + b.params.bulletClass, b.a11y.onEnterKey)), (b.params.preventClicks || b.params.preventClicksPropagation) && i[n]("click", b.preventClicks, !0)
			}, b.attachEvents = function() {
				b.initEvents()
			}, b.detachEvents = function() {
				b.initEvents(!0)
			}, b.allowClick = !0, b.preventClicks = function(e) {
				b.allowClick || (b.params.preventClicks && e.preventDefault(), b.params.preventClicksPropagation && b.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
			}, b.onClickNext = function(e) {
				e.preventDefault(), b.isEnd && !b.params.loop || b.slideNext()
			}, b.onClickPrev = function(e) {
				e.preventDefault(), b.isBeginning && !b.params.loop || b.slidePrev()
			}, b.onClickIndex = function(t) {
				t.preventDefault();
				var n = e(this).index() * b.params.slidesPerGroup;
				b.params.loop && (n += b.loopedSlides), b.slideTo(n)
			}, b.updateClickedSlide = function(t) {
				var n = s(t, "." + b.params.slideClass),
					i = !1;
				if(n)
					for(var a = 0; a < b.slides.length; a++) b.slides[a] === n && (i = !0);
				if(!n || !i) return b.clickedSlide = void 0, void(b.clickedIndex = void 0);
				if(b.clickedSlide = n, b.clickedIndex = e(n).index(), b.params.slideToClickedSlide && void 0 !== b.clickedIndex && b.clickedIndex !== b.activeIndex) {
					var r, o = b.clickedIndex,
						l = "auto" === b.params.slidesPerView ? b.currentSlidesPerView() : b.params.slidesPerView;
					if(b.params.loop) {
						if(b.animating) return;
						r = parseInt(e(b.clickedSlide).attr("data-swiper-slide-index"), 10), b.params.centeredSlides ? o < b.loopedSlides - l / 2 || o > b.slides.length - b.loopedSlides + l / 2 ? (b.fixLoop(), o = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + r + '"]:not(.' + b.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() {
							b.slideTo(o)
						}, 0)) : b.slideTo(o) : o > b.slides.length - l ? (b.fixLoop(), o = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + r + '"]:not(.' + b.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() {
							b.slideTo(o)
						}, 0)) : b.slideTo(o)
					} else b.slideTo(o)
				}
			};
			var S, C, E, M, P, I, k, D, L, z, A = "input, select, textarea, button, video",
				R = Date.now(),
				O = [];
			b.animating = !1, b.touches = {
				startX: 0,
				startY: 0,
				currentX: 0,
				currentY: 0,
				diff: 0
			};
			var B, N;
			b.onTouchStart = function(t) {
				if(t.originalEvent && (t = t.originalEvent), (B = "touchstart" === t.type) || !("which" in t) || 3 !== t.which) {
					if(b.params.noSwiping && s(t, "." + b.params.noSwipingClass)) return void(b.allowClick = !0);
					if(!b.params.swipeHandler || s(t, b.params.swipeHandler)) {
						var n = b.touches.currentX = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX,
							i = b.touches.currentY = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY;
						if(!(b.device.ios && b.params.iOSEdgeSwipeDetection && n <= b.params.iOSEdgeSwipeThreshold)) {
							if(S = !0, C = !1, E = !0, P = void 0, N = void 0, b.touches.startX = n, b.touches.startY = i, M = Date.now(), b.allowClick = !0, b.updateContainerSize(), b.swipeDirection = void 0, b.params.threshold > 0 && (D = !1), "touchstart" !== t.type) {
								var a = !0;
								e(t.target).is(A) && (a = !1), document.activeElement && e(document.activeElement).is(A) && document.activeElement.blur(), a && t.preventDefault()
							}
							b.emit("onTouchStart", b, t)
						}
					}
				}
			}, b.onTouchMove = function(t) {
				if(t.originalEvent && (t = t.originalEvent), !B || "mousemove" !== t.type) {
					if(t.preventedByNestedSwiper) return b.touches.startX = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX, void(b.touches.startY = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY);
					if(b.params.onlyExternal) return b.allowClick = !1, void(S && (b.touches.startX = b.touches.currentX = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX, b.touches.startY = b.touches.currentY = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY, M = Date.now()));
					if(B && b.params.touchReleaseOnEdges && !b.params.loop)
						if(b.isHorizontal()) {
							if(b.touches.currentX < b.touches.startX && b.translate <= b.maxTranslate() || b.touches.currentX > b.touches.startX && b.translate >= b.minTranslate()) return
						} else if(b.touches.currentY < b.touches.startY && b.translate <= b.maxTranslate() || b.touches.currentY > b.touches.startY && b.translate >= b.minTranslate()) return;
					if(B && document.activeElement && t.target === document.activeElement && e(t.target).is(A)) return C = !0, void(b.allowClick = !1);
					if(E && b.emit("onTouchMove", b, t), !(t.targetTouches && t.targetTouches.length > 1)) {
						if(b.touches.currentX = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX, b.touches.currentY = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY, void 0 === P) {
							var n;
							b.isHorizontal() && b.touches.currentY === b.touches.startY || !b.isHorizontal() && b.touches.currentX === b.touches.startX ? P = !1 : (n = 180 * Math.atan2(Math.abs(b.touches.currentY - b.touches.startY), Math.abs(b.touches.currentX - b.touches.startX)) / Math.PI, P = b.isHorizontal() ? n > b.params.touchAngle : 90 - n > b.params.touchAngle)
						}
						if(P && b.emit("onTouchMoveOpposite", b, t), void 0 === N && b.browser.ieTouch && (b.touches.currentX === b.touches.startX && b.touches.currentY === b.touches.startY || (N = !0)), S) {
							if(P) return void(S = !1);
							if(N || !b.browser.ieTouch) {
								b.allowClick = !1, b.emit("onSliderMove", b, t), t.preventDefault(), b.params.touchMoveStopPropagation && !b.params.nested && t.stopPropagation(), C || (a.loop && b.fixLoop(), k = b.getWrapperTranslate(), b.setWrapperTransition(0), b.animating && b.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), b.params.autoplay && b.autoplaying && (b.params.autoplayDisableOnInteraction ? b.stopAutoplay() : b.pauseAutoplay()), z = !1, !b.params.grabCursor || !0 !== b.params.allowSwipeToNext && !0 !== b.params.allowSwipeToPrev || b.setGrabCursor(!0)), C = !0;
								var i = b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY;
								i *= b.params.touchRatio, b.rtl && (i = -i), b.swipeDirection = i > 0 ? "prev" : "next", I = i + k;
								var r = !0;
								if(i > 0 && I > b.minTranslate() ? (r = !1, b.params.resistance && (I = b.minTranslate() - 1 + Math.pow(-b.minTranslate() + k + i, b.params.resistanceRatio))) : i < 0 && I < b.maxTranslate() && (r = !1, b.params.resistance && (I = b.maxTranslate() + 1 - Math.pow(b.maxTranslate() - k - i, b.params.resistanceRatio))), r && (t.preventedByNestedSwiper = !0), !b.params.allowSwipeToNext && "next" === b.swipeDirection && I < k && (I = k), !b.params.allowSwipeToPrev && "prev" === b.swipeDirection && I > k && (I = k), b.params.threshold > 0) {
									if(!(Math.abs(i) > b.params.threshold || D)) return void(I = k);
									if(!D) return D = !0, b.touches.startX = b.touches.currentX, b.touches.startY = b.touches.currentY, I = k, void(b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY)
								}
								b.params.followFinger && ((b.params.freeMode || b.params.watchSlidesProgress) && b.updateActiveIndex(), b.params.freeMode && (0 === O.length && O.push({
									position: b.touches[b.isHorizontal() ? "startX" : "startY"],
									time: M
								}), O.push({
									position: b.touches[b.isHorizontal() ? "currentX" : "currentY"],
									time: (new window.Date).getTime()
								})), b.updateProgress(I), b.setWrapperTranslate(I))
							}
						}
					}
				}
			}, b.onTouchEnd = function(t) {
				if(t.originalEvent && (t = t.originalEvent), E && b.emit("onTouchEnd", b, t), E = !1, S) {
					b.params.grabCursor && C && S && (!0 === b.params.allowSwipeToNext || !0 === b.params.allowSwipeToPrev) && b.setGrabCursor(!1);
					var n = Date.now(),
						i = n - M;
					if(b.allowClick && (b.updateClickedSlide(t), b.emit("onTap", b, t), i < 300 && n - R > 300 && (L && clearTimeout(L), L = setTimeout(function() {
							b && (b.params.paginationHide && b.paginationContainer.length > 0 && !e(t.target).hasClass(b.params.bulletClass) && b.paginationContainer.toggleClass(b.params.paginationHiddenClass), b.emit("onClick", b, t))
						}, 300)), i < 300 && n - R < 300 && (L && clearTimeout(L), b.emit("onDoubleTap", b, t))), R = Date.now(), setTimeout(function() {
							b && (b.allowClick = !0)
						}, 0), !S || !C || !b.swipeDirection || 0 === b.touches.diff || I === k) return void(S = C = !1);
					S = C = !1;
					var a;
					if(a = b.params.followFinger ? b.rtl ? b.translate : -b.translate : -I, b.params.freeMode) {
						if(a < -b.minTranslate()) return void b.slideTo(b.activeIndex);
						if(a > -b.maxTranslate()) return void(b.slides.length < b.snapGrid.length ? b.slideTo(b.snapGrid.length - 1) : b.slideTo(b.slides.length - 1));
						if(b.params.freeModeMomentum) {
							if(O.length > 1) {
								var r = O.pop(),
									o = O.pop(),
									s = r.position - o.position,
									l = r.time - o.time;
								b.velocity = s / l, b.velocity = b.velocity / 2, Math.abs(b.velocity) < b.params.freeModeMinimumVelocity && (b.velocity = 0), (l > 150 || (new window.Date).getTime() - r.time > 300) && (b.velocity = 0)
							} else b.velocity = 0;
							b.velocity = b.velocity * b.params.freeModeMomentumVelocityRatio, O.length = 0;
							var d = 1e3 * b.params.freeModeMomentumRatio,
								c = b.velocity * d,
								u = b.translate + c;
							b.rtl && (u = -u);
							var p, h = !1,
								m = 20 * Math.abs(b.velocity) * b.params.freeModeMomentumBounceRatio;
							if(u < b.maxTranslate()) b.params.freeModeMomentumBounce ? (u + b.maxTranslate() < -m && (u = b.maxTranslate() - m), p = b.maxTranslate(), h = !0, z = !0) : u = b.maxTranslate();
							else if(u > b.minTranslate()) b.params.freeModeMomentumBounce ? (u - b.minTranslate() > m && (u = b.minTranslate() + m), p = b.minTranslate(), h = !0, z = !0) : u = b.minTranslate();
							else if(b.params.freeModeSticky) {
								var f, g = 0;
								for(g = 0; g < b.snapGrid.length; g += 1)
									if(b.snapGrid[g] > -u) {
										f = g;
										break
									}
								u = Math.abs(b.snapGrid[f] - u) < Math.abs(b.snapGrid[f - 1] - u) || "next" === b.swipeDirection ? b.snapGrid[f] : b.snapGrid[f - 1], b.rtl || (u = -u)
							}
							if(0 !== b.velocity) d = b.rtl ? Math.abs((-u - b.translate) / b.velocity) : Math.abs((u - b.translate) / b.velocity);
							else if(b.params.freeModeSticky) return void b.slideReset();
							b.params.freeModeMomentumBounce && h ? (b.updateProgress(p), b.setWrapperTransition(d), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating = !0, b.wrapper.transitionEnd(function() {
								b && z && (b.emit("onMomentumBounce", b), b.setWrapperTransition(b.params.speed), b.setWrapperTranslate(p), b.wrapper.transitionEnd(function() {
									b && b.onTransitionEnd()
								}))
							})) : b.velocity ? (b.updateProgress(u), b.setWrapperTransition(d), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function() {
								b && b.onTransitionEnd()
							}))) : b.updateProgress(u), b.updateActiveIndex()
						}
						return void((!b.params.freeModeMomentum || i >= b.params.longSwipesMs) && (b.updateProgress(), b.updateActiveIndex()))
					}
					var v, w = 0,
						y = b.slidesSizesGrid[0];
					for(v = 0; v < b.slidesGrid.length; v += b.params.slidesPerGroup) void 0 !== b.slidesGrid[v + b.params.slidesPerGroup] ? a >= b.slidesGrid[v] && a < b.slidesGrid[v + b.params.slidesPerGroup] && (w = v, y = b.slidesGrid[v + b.params.slidesPerGroup] - b.slidesGrid[v]) : a >= b.slidesGrid[v] && (w = v, y = b.slidesGrid[b.slidesGrid.length - 1] - b.slidesGrid[b.slidesGrid.length - 2]);
					var x = (a - b.slidesGrid[w]) / y;
					if(i > b.params.longSwipesMs) {
						if(!b.params.longSwipes) return void b.slideTo(b.activeIndex);
						"next" === b.swipeDirection && (x >= b.params.longSwipesRatio ? b.slideTo(w + b.params.slidesPerGroup) : b.slideTo(w)), "prev" === b.swipeDirection && (x > 1 - b.params.longSwipesRatio ? b.slideTo(w + b.params.slidesPerGroup) : b.slideTo(w))
					} else {
						if(!b.params.shortSwipes) return void b.slideTo(b.activeIndex);
						"next" === b.swipeDirection && b.slideTo(w + b.params.slidesPerGroup), "prev" === b.swipeDirection && b.slideTo(w)
					}
				}
			}, b._slideTo = function(e, t) {
				return b.slideTo(e, t, !0, !0)
			}, b.slideTo = function(e, t, n, i) {
				void 0 === n && (n = !0), void 0 === e && (e = 0), e < 0 && (e = 0), b.snapIndex = Math.floor(e / b.params.slidesPerGroup), b.snapIndex >= b.snapGrid.length && (b.snapIndex = b.snapGrid.length - 1);
				var a = -b.snapGrid[b.snapIndex];
				if(b.params.autoplay && b.autoplaying && (i || !b.params.autoplayDisableOnInteraction ? b.pauseAutoplay(t) : b.stopAutoplay()), b.updateProgress(a), b.params.normalizeSlideIndex)
					for(var r = 0; r < b.slidesGrid.length; r++) - Math.floor(100 * a) >= Math.floor(100 * b.slidesGrid[r]) && (e = r);
				return !(!b.params.allowSwipeToNext && a < b.translate && a < b.minTranslate() || !b.params.allowSwipeToPrev && a > b.translate && a > b.maxTranslate() && (b.activeIndex || 0) !== e || (void 0 === t && (t = b.params.speed), b.previousIndex = b.activeIndex || 0, b.activeIndex = e, b.updateRealIndex(), b.rtl && -a === b.translate || !b.rtl && a === b.translate ? (b.params.autoHeight && b.updateAutoHeight(), b.updateClasses(), "slide" !== b.params.effect && b.setWrapperTranslate(a), 1) : (b.updateClasses(), b.onTransitionStart(n), 0 === t || b.browser.lteIE9 ? (b.setWrapperTranslate(a), b.setWrapperTransition(0), b.onTransitionEnd(n)) : (b.setWrapperTranslate(a), b.setWrapperTransition(t), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function() {
					b && b.onTransitionEnd(n)
				}))), 0)))
			}, b.onTransitionStart = function(e) {
				void 0 === e && (e = !0), b.params.autoHeight && b.updateAutoHeight(), b.lazy && b.lazy.onTransitionStart(), e && (b.emit("onTransitionStart", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeStart", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextStart", b) : b.emit("onSlidePrevStart", b)))
			}, b.onTransitionEnd = function(e) {
				b.animating = !1, b.setWrapperTransition(0), void 0 === e && (e = !0), b.lazy && b.lazy.onTransitionEnd(), e && (b.emit("onTransitionEnd", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeEnd", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextEnd", b) : b.emit("onSlidePrevEnd", b))), b.params.history && b.history && b.history.setHistory(b.params.history, b.activeIndex), b.params.hashnav && b.hashnav && b.hashnav.setHash()
			}, b.slideNext = function(e, t, n) {
				return b.params.loop ? !b.animating && (b.fixLoop(), b.container[0].clientLeft, b.slideTo(b.activeIndex + b.params.slidesPerGroup, t, e, n)) : b.slideTo(b.activeIndex + b.params.slidesPerGroup, t, e, n)
			}, b._slideNext = function(e) {
				return b.slideNext(!0, e, !0)
			}, b.slidePrev = function(e, t, n) {
				return b.params.loop ? !b.animating && (b.fixLoop(), b.container[0].clientLeft, b.slideTo(b.activeIndex - 1, t, e, n)) : b.slideTo(b.activeIndex - 1, t, e, n)
			}, b._slidePrev = function(e) {
				return b.slidePrev(!0, e, !0)
			}, b.slideReset = function(e, t, n) {
				return b.slideTo(b.activeIndex, t, e)
			}, b.disableTouchControl = function() {
				return b.params.onlyExternal = !0, !0
			}, b.enableTouchControl = function() {
				return b.params.onlyExternal = !1, !0
			}, b.setWrapperTransition = function(e, t) {
				b.wrapper.transition(e), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTransition(e), b.params.parallax && b.parallax && b.parallax.setTransition(e), b.params.scrollbar && b.scrollbar && b.scrollbar.setTransition(e), b.params.control && b.controller && b.controller.setTransition(e, t), b.emit("onSetTransition", b, e)
			}, b.setWrapperTranslate = function(e, t, n) {
				var i = 0,
					a = 0;
				b.isHorizontal() ? i = b.rtl ? -e : e : a = e, b.params.roundLengths && (i = r(i), a = r(a)), b.params.virtualTranslate || (b.support.transforms3d ? b.wrapper.transform("translate3d(" + i + "px, " + a + "px, 0px)") : b.wrapper.transform("translate(" + i + "px, " + a + "px)")), b.translate = b.isHorizontal() ? i : a;
				var o, s = b.maxTranslate() - b.minTranslate();
				o = 0 === s ? 0 : (e - b.minTranslate()) / s, o !== b.progress && b.updateProgress(e), t && b.updateActiveIndex(), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTranslate(b.translate), b.params.parallax && b.parallax && b.parallax.setTranslate(b.translate), b.params.scrollbar && b.scrollbar && b.scrollbar.setTranslate(b.translate), b.params.control && b.controller && b.controller.setTranslate(b.translate, n), b.emit("onSetTranslate", b, b.translate)
			}, b.getTranslate = function(e, t) {
				var n, i, a, r;
				return void 0 === t && (t = "x"), b.params.virtualTranslate ? b.rtl ? -b.translate : b.translate : (a = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (i = a.transform || a.webkitTransform, i.split(",").length > 6 && (i = i.split(", ").map(function(e) {
					return e.replace(",", ".")
				}).join(", ")), r = new window.WebKitCSSMatrix("none" === i ? "" : i)) : (r = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), n = r.toString().split(",")), "x" === t && (i = window.WebKitCSSMatrix ? r.m41 : 16 === n.length ? parseFloat(n[12]) : parseFloat(n[4])), "y" === t && (i = window.WebKitCSSMatrix ? r.m42 : 16 === n.length ? parseFloat(n[13]) : parseFloat(n[5])), b.rtl && i && (i = -i), i || 0)
			}, b.getWrapperTranslate = function(e) {
				return void 0 === e && (e = b.isHorizontal() ? "x" : "y"), b.getTranslate(b.wrapper[0], e)
			}, b.observers = [], b.initObservers = function() {
				if(b.params.observeParents)
					for(var e = b.container.parents(), t = 0; t < e.length; t++) l(e[t]);
				l(b.container[0], {
					childList: !1
				}), l(b.wrapper[0], {
					attributes: !1
				})
			}, b.disconnectObservers = function() {
				for(var e = 0; e < b.observers.length; e++) b.observers[e].disconnect();
				b.observers = []
			}, b.createLoop = function() {
				b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove();
				var t = b.wrapper.children("." + b.params.slideClass);
				"auto" !== b.params.slidesPerView || b.params.loopedSlides || (b.params.loopedSlides = t.length), b.loopedSlides = parseInt(b.params.loopedSlides || b.params.slidesPerView, 10), b.loopedSlides = b.loopedSlides + b.params.loopAdditionalSlides, b.loopedSlides > t.length && (b.loopedSlides = t.length);
				var n, i = [],
					a = [];
				for(t.each(function(n, r) {
						var o = e(this);
						n < b.loopedSlides && a.push(r), n < t.length && n >= t.length - b.loopedSlides && i.push(r), o.attr("data-swiper-slide-index", n)
					}), n = 0; n < a.length; n++) b.wrapper.append(e(a[n].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
				for(n = i.length - 1; n >= 0; n--) b.wrapper.prepend(e(i[n].cloneNode(!0)).addClass(b.params.slideDuplicateClass))
			}, b.destroyLoop = function() {
				b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove(), b.slides.removeAttr("data-swiper-slide-index")
			}, b.reLoop = function(e) {
				var t = b.activeIndex - b.loopedSlides;
				b.destroyLoop(), b.createLoop(), b.updateSlidesSize(), e && b.slideTo(t + b.loopedSlides, 0, !1)
			}, b.fixLoop = function() {
				var e;
				b.activeIndex < b.loopedSlides ? (e = b.slides.length - 3 * b.loopedSlides + b.activeIndex, e += b.loopedSlides, b.slideTo(e, 0, !1, !0)) : ("auto" === b.params.slidesPerView && b.activeIndex >= 2 * b.loopedSlides || b.activeIndex > b.slides.length - 2 * b.params.slidesPerView) && (e = -b.slides.length + b.activeIndex + b.loopedSlides, e += b.loopedSlides, b.slideTo(e, 0, !1, !0))
			}, b.appendSlide = function(e) {
				if(b.params.loop && b.destroyLoop(), "object" == typeof e && e.length)
					for(var t = 0; t < e.length; t++) e[t] && b.wrapper.append(e[t]);
				else b.wrapper.append(e);
				b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0)
			}, b.prependSlide = function(e) {
				b.params.loop && b.destroyLoop();
				var t = b.activeIndex + 1;
				if("object" == typeof e && e.length) {
					for(var n = 0; n < e.length; n++) e[n] && b.wrapper.prepend(e[n]);
					t = b.activeIndex + e.length
				} else b.wrapper.prepend(e);
				b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.slideTo(t, 0, !1)
			}, b.removeSlide = function(e) {
				b.params.loop && (b.destroyLoop(), b.slides = b.wrapper.children("." + b.params.slideClass));
				var t, n = b.activeIndex;
				if("object" == typeof e && e.length) {
					for(var i = 0; i < e.length; i++) t = e[i], b.slides[t] && b.slides.eq(t).remove(), t < n && n--;
					n = Math.max(n, 0)
				} else t = e, b.slides[t] && b.slides.eq(t).remove(), t < n && n--, n = Math.max(n, 0);
				b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.params.loop ? b.slideTo(n + b.loopedSlides, 0, !1) : b.slideTo(n, 0, !1)
			}, b.removeAllSlides = function() {
				for(var e = [], t = 0; t < b.slides.length; t++) e.push(t);
				b.removeSlide(e)
			}, b.effects = {
				fade: {
					setTranslate: function() {
						for(var e = 0; e < b.slides.length; e++) {
							var t = b.slides.eq(e),
								n = t[0].swiperSlideOffset,
								i = -n;
							b.params.virtualTranslate || (i -= b.translate);
							var a = 0;
							b.isHorizontal() || (a = i, i = 0);
							var r = b.params.fade.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
							t.css({
								opacity: r
							}).transform("translate3d(" + i + "px, " + a + "px, 0px)")
						}
					},
					setTransition: function(e) {
						if(b.slides.transition(e), b.params.virtualTranslate && 0 !== e) {
							var t = !1;
							b.slides.transitionEnd(function() {
								if(!t && b) {
									t = !0, b.animating = !1;
									for(var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], n = 0; n < e.length; n++) b.wrapper.trigger(e[n])
								}
							})
						}
					}
				},
				flip: {
					setTranslate: function() {
						for(var t = 0; t < b.slides.length; t++) {
							var n = b.slides.eq(t),
								i = n[0].progress;
							b.params.flip.limitRotation && (i = Math.max(Math.min(n[0].progress, 1), -1));
							var a = n[0].swiperSlideOffset,
								r = -180 * i,
								o = r,
								s = 0,
								l = -a,
								d = 0;
							if(b.isHorizontal() ? b.rtl && (o = -o) : (d = l, l = 0, s = -o, o = 0), n[0].style.zIndex = -Math.abs(Math.round(i)) + b.slides.length, b.params.flip.slideShadows) {
								var c = b.isHorizontal() ? n.find(".swiper-slide-shadow-left") : n.find(".swiper-slide-shadow-top"),
									u = b.isHorizontal() ? n.find(".swiper-slide-shadow-right") : n.find(".swiper-slide-shadow-bottom");
								0 === c.length && (c = e('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), n.append(c)), 0 === u.length && (u = e('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), n.append(u)), c.length && (c[0].style.opacity = Math.max(-i, 0)), u.length && (u[0].style.opacity = Math.max(i, 0))
							}
							n.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + s + "deg) rotateY(" + o + "deg)")
						}
					},
					setTransition: function(t) {
						if(b.slides.transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t), b.params.virtualTranslate && 0 !== t) {
							var n = !1;
							b.slides.eq(b.activeIndex).transitionEnd(function() {
								if(!n && b && e(this).hasClass(b.params.slideActiveClass)) {
									n = !0, b.animating = !1;
									for(var t = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], i = 0; i < t.length; i++) b.wrapper.trigger(t[i])
								}
							})
						}
					}
				},
				cube: {
					setTranslate: function() {
						var t, n = 0;
						b.params.cube.shadow && (b.isHorizontal() ? (t = b.wrapper.find(".swiper-cube-shadow"), 0 === t.length && (t = e('<div class="swiper-cube-shadow"></div>'), b.wrapper.append(t)), t.css({
							height: b.width + "px"
						})) : (t = b.container.find(".swiper-cube-shadow"), 0 === t.length && (t = e('<div class="swiper-cube-shadow"></div>'), b.container.append(t))));
						for(var i = 0; i < b.slides.length; i++) {
							var a = b.slides.eq(i),
								r = 90 * i,
								o = Math.floor(r / 360);
							b.rtl && (r = -r, o = Math.floor(-r / 360));
							var s = Math.max(Math.min(a[0].progress, 1), -1),
								l = 0,
								d = 0,
								c = 0;
							i % 4 == 0 ? (l = 4 * -o * b.size, c = 0) : (i - 1) % 4 == 0 ? (l = 0, c = 4 * -o * b.size) : (i - 2) % 4 == 0 ? (l = b.size + 4 * o * b.size, c = b.size) : (i - 3) % 4 == 0 && (l = -b.size, c = 3 * b.size + 4 * b.size * o), b.rtl && (l = -l), b.isHorizontal() || (d = l, l = 0);
							var u = "rotateX(" + (b.isHorizontal() ? 0 : -r) + "deg) rotateY(" + (b.isHorizontal() ? r : 0) + "deg) translate3d(" + l + "px, " + d + "px, " + c + "px)";
							if(s <= 1 && s > -1 && (n = 90 * i + 90 * s, b.rtl && (n = 90 * -i - 90 * s)), a.transform(u), b.params.cube.slideShadows) {
								var p = b.isHorizontal() ? a.find(".swiper-slide-shadow-left") : a.find(".swiper-slide-shadow-top"),
									h = b.isHorizontal() ? a.find(".swiper-slide-shadow-right") : a.find(".swiper-slide-shadow-bottom");
								0 === p.length && (p = e('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), a.append(p)), 0 === h.length && (h = e('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), a.append(h)), p.length && (p[0].style.opacity = Math.max(-s, 0)), h.length && (h[0].style.opacity = Math.max(s, 0))
							}
						}
						if(b.wrapper.css({
								"-webkit-transform-origin": "50% 50% -" + b.size / 2 + "px",
								"-moz-transform-origin": "50% 50% -" + b.size / 2 + "px",
								"-ms-transform-origin": "50% 50% -" + b.size / 2 + "px",
								"transform-origin": "50% 50% -" + b.size / 2 + "px"
							}), b.params.cube.shadow)
							if(b.isHorizontal()) t.transform("translate3d(0px, " + (b.width / 2 + b.params.cube.shadowOffset) + "px, " + -b.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + b.params.cube.shadowScale + ")");
							else {
								var m = Math.abs(n) - 90 * Math.floor(Math.abs(n) / 90),
									f = 1.5 - (Math.sin(2 * m * Math.PI / 360) / 2 + Math.cos(2 * m * Math.PI / 360) / 2),
									g = b.params.cube.shadowScale,
									v = b.params.cube.shadowScale / f,
									w = b.params.cube.shadowOffset;
								t.transform("scale3d(" + g + ", 1, " + v + ") translate3d(0px, " + (b.height / 2 + w) + "px, " + -b.height / 2 / v + "px) rotateX(-90deg)")
							}
						var y = b.isSafari || b.isUiWebView ? -b.size / 2 : 0;
						b.wrapper.transform("translate3d(0px,0," + y + "px) rotateX(" + (b.isHorizontal() ? 0 : n) + "deg) rotateY(" + (b.isHorizontal() ? -n : 0) + "deg)")
					},
					setTransition: function(e) {
						b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.cube.shadow && !b.isHorizontal() && b.container.find(".swiper-cube-shadow").transition(e)
					}
				},
				coverflow: {
					setTranslate: function() {
						for(var t = b.translate, n = b.isHorizontal() ? -t + b.width / 2 : -t + b.height / 2, i = b.isHorizontal() ? b.params.coverflow.rotate : -b.params.coverflow.rotate, a = b.params.coverflow.depth, r = 0, o = b.slides.length; r < o; r++) {
							var s = b.slides.eq(r),
								l = b.slidesSizesGrid[r],
								d = s[0].swiperSlideOffset,
								c = (n - d - l / 2) / l * b.params.coverflow.modifier,
								u = b.isHorizontal() ? i * c : 0,
								p = b.isHorizontal() ? 0 : i * c,
								h = -a * Math.abs(c),
								m = b.isHorizontal() ? 0 : b.params.coverflow.stretch * c,
								f = b.isHorizontal() ? b.params.coverflow.stretch * c : 0;
							Math.abs(f) < .001 && (f = 0), Math.abs(m) < .001 && (m = 0), Math.abs(h) < .001 && (h = 0), Math.abs(u) < .001 && (u = 0), Math.abs(p) < .001 && (p = 0);
							var g = "translate3d(" + f + "px," + m + "px," + h + "px)  rotateX(" + p + "deg) rotateY(" + u + "deg)";
							if(s.transform(g), s[0].style.zIndex = 1 - Math.abs(Math.round(c)), b.params.coverflow.slideShadows) {
								var v = b.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top"),
									w = b.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
								0 === v.length && (v = e('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), s.append(v)), 0 === w.length && (w = e('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), s.append(w)), v.length && (v[0].style.opacity = c > 0 ? c : 0), w.length && (w[0].style.opacity = -c > 0 ? -c : 0)
							}
						}
						if(b.browser.ie) {
							b.wrapper[0].style.perspectiveOrigin = n + "px 50%"
						}
					},
					setTransition: function(e) {
						b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
					}
				}
			}, b.lazy = {
				initialImageLoaded: !1,
				loadImageInSlide: function(t, n) {
					if(void 0 !== t && (void 0 === n && (n = !0), 0 !== b.slides.length)) {
						var i = b.slides.eq(t),
							a = i.find("." + b.params.lazyLoadingClass + ":not(." + b.params.lazyStatusLoadedClass + "):not(." + b.params.lazyStatusLoadingClass + ")");
						!i.hasClass(b.params.lazyLoadingClass) || i.hasClass(b.params.lazyStatusLoadedClass) || i.hasClass(b.params.lazyStatusLoadingClass) || (a = a.add(i[0])), 0 !== a.length && a.each(function() {
							var t = e(this);
							t.addClass(b.params.lazyStatusLoadingClass);
							var a = t.attr("data-background"),
								r = t.attr("data-src"),
								o = t.attr("data-srcset"),
								s = t.attr("data-sizes");
							b.loadImage(t[0], r || a, o, s, !1, function() {
								if(a ? (t.css("background-image", 'url("' + a + '")'), t.removeAttr("data-background")) : (o && (t.attr("srcset", o), t.removeAttr("data-srcset")), s && (t.attr("sizes", s), t.removeAttr("data-sizes")), r && (t.attr("src", r), t.removeAttr("data-src"))), t.addClass(b.params.lazyStatusLoadedClass).removeClass(b.params.lazyStatusLoadingClass), i.find("." + b.params.lazyPreloaderClass + ", ." + b.params.preloaderClass).remove(), b.params.loop && n) {
									var e = i.attr("data-swiper-slide-index");
									if(i.hasClass(b.params.slideDuplicateClass)) {
										var l = b.wrapper.children('[data-swiper-slide-index="' + e + '"]:not(.' + b.params.slideDuplicateClass + ")");
										b.lazy.loadImageInSlide(l.index(), !1)
									} else {
										var d = b.wrapper.children("." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
										b.lazy.loadImageInSlide(d.index(), !1)
									}
								}
								b.emit("onLazyImageReady", b, i[0], t[0])
							}), b.emit("onLazyImageLoad", b, i[0], t[0])
						})
					}
				},
				load: function() {
					var t, n = b.params.slidesPerView;
					if("auto" === n && (n = 0), b.lazy.initialImageLoaded || (b.lazy.initialImageLoaded = !0), b.params.watchSlidesVisibility) b.wrapper.children("." + b.params.slideVisibleClass).each(function() {
						b.lazy.loadImageInSlide(e(this).index())
					});
					else if(n > 1)
						for(t = b.activeIndex; t < b.activeIndex + n; t++) b.slides[t] && b.lazy.loadImageInSlide(t);
					else b.lazy.loadImageInSlide(b.activeIndex);
					if(b.params.lazyLoadingInPrevNext)
						if(n > 1 || b.params.lazyLoadingInPrevNextAmount && b.params.lazyLoadingInPrevNextAmount > 1) {
							var i = b.params.lazyLoadingInPrevNextAmount,
								a = n,
								r = Math.min(b.activeIndex + a + Math.max(i, a), b.slides.length),
								o = Math.max(b.activeIndex - Math.max(a, i), 0);
							for(t = b.activeIndex + n; t < r; t++) b.slides[t] && b.lazy.loadImageInSlide(t);
							for(t = o; t < b.activeIndex; t++) b.slides[t] && b.lazy.loadImageInSlide(t)
						} else {
							var s = b.wrapper.children("." + b.params.slideNextClass);
							s.length > 0 && b.lazy.loadImageInSlide(s.index());
							var l = b.wrapper.children("." + b.params.slidePrevClass);
							l.length > 0 && b.lazy.loadImageInSlide(l.index())
						}
				},
				onTransitionStart: function() {
					b.params.lazyLoading && (b.params.lazyLoadingOnTransitionStart || !b.params.lazyLoadingOnTransitionStart && !b.lazy.initialImageLoaded) && b.lazy.load()
				},
				onTransitionEnd: function() {
					b.params.lazyLoading && !b.params.lazyLoadingOnTransitionStart && b.lazy.load()
				}
			}, b.scrollbar = {
				isTouched: !1,
				setDragPosition: function(e) {
					var t = b.scrollbar,
						n = b.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
						i = n - t.track.offset()[b.isHorizontal() ? "left" : "top"] - t.dragSize / 2,
						a = -b.minTranslate() * t.moveDivider,
						r = -b.maxTranslate() * t.moveDivider;
					i < a ? i = a : i > r && (i = r), i = -i / t.moveDivider, b.updateProgress(i), b.setWrapperTranslate(i, !0)
				},
				dragStart: function(e) {
					var t = b.scrollbar;
					t.isTouched = !0, e.preventDefault(), e.stopPropagation(), t.setDragPosition(e), clearTimeout(t.dragTimeout), t.track.transition(0), b.params.scrollbarHide && t.track.css("opacity", 1), b.wrapper.transition(100), t.drag.transition(100), b.emit("onScrollbarDragStart", b)
				},
				dragMove: function(e) {
					var t = b.scrollbar;
					t.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), b.wrapper.transition(0), t.track.transition(0), t.drag.transition(0), b.emit("onScrollbarDragMove", b))
				},
				dragEnd: function(e) {
					var t = b.scrollbar;
					t.isTouched && (t.isTouched = !1, b.params.scrollbarHide && (clearTimeout(t.dragTimeout), t.dragTimeout = setTimeout(function() {
						t.track.css("opacity", 0), t.track.transition(400)
					}, 1e3)), b.emit("onScrollbarDragEnd", b), b.params.scrollbarSnapOnRelease && b.slideReset())
				},
				draggableEvents: function() {
					return !1 !== b.params.simulateTouch || b.support.touch ? b.touchEvents : b.touchEventsDesktop
				}(),
				enableDraggable: function() {
					var t = b.scrollbar,
						n = b.support.touch ? t.track : document;
					e(t.track).on(t.draggableEvents.start, t.dragStart), e(n).on(t.draggableEvents.move, t.dragMove), e(n).on(t.draggableEvents.end, t.dragEnd)
				},
				disableDraggable: function() {
					var t = b.scrollbar,
						n = b.support.touch ? t.track : document;
					e(t.track).off(t.draggableEvents.start, t.dragStart), e(n).off(t.draggableEvents.move, t.dragMove), e(n).off(t.draggableEvents.end, t.dragEnd)
				},
				set: function() {
					if(b.params.scrollbar) {
						var t = b.scrollbar;
						t.track = e(b.params.scrollbar), b.params.uniqueNavElements && "string" == typeof b.params.scrollbar && t.track.length > 1 && 1 === b.container.find(b.params.scrollbar).length && (t.track = b.container.find(b.params.scrollbar)), t.drag = t.track.find(".swiper-scrollbar-drag"), 0 === t.drag.length && (t.drag = e('<div class="swiper-scrollbar-drag"></div>'), t.track.append(t.drag)), t.drag[0].style.width = "", t.drag[0].style.height = "", t.trackSize = b.isHorizontal() ? t.track[0].offsetWidth : t.track[0].offsetHeight, t.divider = b.size / b.virtualSize, t.moveDivider = t.divider * (t.trackSize / b.size), t.dragSize = t.trackSize * t.divider, b.isHorizontal() ? t.drag[0].style.width = t.dragSize + "px" : t.drag[0].style.height = t.dragSize + "px", t.divider >= 1 ? t.track[0].style.display = "none" : t.track[0].style.display = "", b.params.scrollbarHide && (t.track[0].style.opacity = 0)
					}
				},
				setTranslate: function() {
					if(b.params.scrollbar) {
						var e, t = b.scrollbar,
							n = (b.translate, t.dragSize);
						e = (t.trackSize - t.dragSize) * b.progress, b.rtl && b.isHorizontal() ? (e = -e, e > 0 ? (n = t.dragSize - e, e = 0) : -e + t.dragSize > t.trackSize && (n = t.trackSize + e)) : e < 0 ? (n = t.dragSize + e, e = 0) : e + t.dragSize > t.trackSize && (n = t.trackSize - e), b.isHorizontal() ? (b.support.transforms3d ? t.drag.transform("translate3d(" + e + "px, 0, 0)") : t.drag.transform("translateX(" + e + "px)"), t.drag[0].style.width = n + "px") : (b.support.transforms3d ? t.drag.transform("translate3d(0px, " + e + "px, 0)") : t.drag.transform("translateY(" + e + "px)"), t.drag[0].style.height = n + "px"), b.params.scrollbarHide && (clearTimeout(t.timeout), t.track[0].style.opacity = 1, t.timeout = setTimeout(function() {
							t.track[0].style.opacity = 0, t.track.transition(400)
						}, 1e3))
					}
				},
				setTransition: function(e) {
					b.params.scrollbar && b.scrollbar.drag.transition(e)
				}
			}, b.controller = {
				LinearSpline: function(e, t) {
					this.x = e, this.y = t, this.lastIndex = e.length - 1;
					var n, i;
					this.x.length, this.interpolate = function(e) {
						return e ? (i = a(this.x, e), n = i - 1, (e - this.x[n]) * (this.y[i] - this.y[n]) / (this.x[i] - this.x[n]) + this.y[n]) : 0
					};
					var a = function() {
						var e, t, n;
						return function(i, a) {
							for(t = -1, e = i.length; e - t > 1;) i[n = e + t >> 1] <= a ? t = n : e = n;
							return e
						}
					}()
				},
				getInterpolateFunction: function(e) {
					b.controller.spline || (b.controller.spline = b.params.loop ? new b.controller.LinearSpline(b.slidesGrid, e.slidesGrid) : new b.controller.LinearSpline(b.snapGrid, e.snapGrid))
				},
				setTranslate: function(e, n) {
					function i(t) {
						e = t.rtl && "horizontal" === t.params.direction ? -b.translate : b.translate, "slide" === b.params.controlBy && (b.controller.getInterpolateFunction(t), r = -b.controller.spline.interpolate(-e)), r && "container" !== b.params.controlBy || (a = (t.maxTranslate() - t.minTranslate()) / (b.maxTranslate() - b.minTranslate()), r = (e - b.minTranslate()) * a + t.minTranslate()), b.params.controlInverse && (r = t.maxTranslate() - r), t.updateProgress(r), t.setWrapperTranslate(r, !1, b), t.updateActiveIndex()
					}
					var a, r, o = b.params.control;
					if(b.isArray(o))
						for(var s = 0; s < o.length; s++) o[s] !== n && o[s] instanceof t && i(o[s]);
					else o instanceof t && n !== o && i(o)
				},
				setTransition: function(e, n) {
					function i(t) {
						t.setWrapperTransition(e, b), 0 !== e && (t.onTransitionStart(), t.wrapper.transitionEnd(function() {
							r && (t.params.loop && "slide" === b.params.controlBy && t.fixLoop(), t.onTransitionEnd())
						}))
					}
					var a, r = b.params.control;
					if(b.isArray(r))
						for(a = 0; a < r.length; a++) r[a] !== n && r[a] instanceof t && i(r[a]);
					else r instanceof t && n !== r && i(r)
				}
			}, b.hashnav = {
				onHashCange: function(e, t) {
					var n = document.location.hash.replace("#", "");
					n !== b.slides.eq(b.activeIndex).attr("data-hash") && b.slideTo(b.wrapper.children("." + b.params.slideClass + '[data-hash="' + n + '"]').index())
				},
				attachEvents: function(t) {
					var n = t ? "off" : "on";
					e(window)[n]("hashchange", b.hashnav.onHashCange)
				},
				setHash: function() {
					if(b.hashnav.initialized && b.params.hashnav)
						if(b.params.replaceState && window.history && window.history.replaceState) window.history.replaceState(null, null, "#" + b.slides.eq(b.activeIndex).attr("data-hash") || "");
						else {
							var e = b.slides.eq(b.activeIndex),
								t = e.attr("data-hash") || e.attr("data-history");
							document.location.hash = t || ""
						}
				},
				init: function() {
					if(b.params.hashnav && !b.params.history) {
						b.hashnav.initialized = !0;
						var e = document.location.hash.replace("#", "");
						if(e)
							for(var t = 0, n = b.slides.length; t < n; t++) {
								var i = b.slides.eq(t),
									a = i.attr("data-hash") || i.attr("data-history");
								if(a === e && !i.hasClass(b.params.slideDuplicateClass)) {
									var r = i.index();
									b.slideTo(r, 0, b.params.runCallbacksOnInit, !0)
								}
							}
						b.params.hashnavWatchState && b.hashnav.attachEvents()
					}
				},
				destroy: function() {
					b.params.hashnavWatchState && b.hashnav.attachEvents(!0)
				}
			}, b.history = {
				init: function() {
					if(b.params.history) {
						if(!window.history || !window.history.pushState) return b.params.history = !1, void(b.params.hashnav = !0);
						b.history.initialized = !0, this.paths = this.getPathValues(), (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, b.params.runCallbacksOnInit), b.params.replaceState || window.addEventListener("popstate", this.setHistoryPopState))
					}
				},
				setHistoryPopState: function() {
					b.history.paths = b.history.getPathValues(), b.history.scrollToSlide(b.params.speed, b.history.paths.value, !1)
				},
				getPathValues: function() {
					var e = window.location.pathname.slice(1).split("/"),
						t = e.length;
					return {
						key: e[t - 2],
						value: e[t - 1]
					}
				},
				setHistory: function(e, t) {
					if(b.history.initialized && b.params.history) {
						var n = b.slides.eq(t),
							i = this.slugify(n.attr("data-history"));
						window.location.pathname.includes(e) || (i = e + "/" + i), b.params.replaceState ? window.history.replaceState(null, null, i) : window.history.pushState(null, null, i)
					}
				},
				slugify: function(e) {
					return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
				},
				scrollToSlide: function(e, t, n) {
					if(t)
						for(var i = 0, a = b.slides.length; i < a; i++) {
							var r = b.slides.eq(i),
								o = this.slugify(r.attr("data-history"));
							if(o === t && !r.hasClass(b.params.slideDuplicateClass)) {
								var s = r.index();
								b.slideTo(s, e, n)
							}
						} else b.slideTo(0, e, n)
				}
			}, b.disableKeyboardControl = function() {
				b.params.keyboardControl = !1, e(document).off("keydown", d)
			}, b.enableKeyboardControl = function() {
				b.params.keyboardControl = !0, e(document).on("keydown", d)
			}, b.mousewheel = {
				event: !1,
				lastScrollTime: (new window.Date).getTime()
			}, b.params.mousewheelControl && (b.mousewheel.event = navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function() {
				var e = "onwheel",
					t = e in document;
				if(!t) {
					var n = document.createElement("div");
					n.setAttribute(e, "return;"), t = "function" == typeof n[e]
				}
				return !t && document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", "") && (t = document.implementation.hasFeature("Events.wheel", "3.0")), t
			}() ? "wheel" : "mousewheel"), b.disableMousewheelControl = function() {
				if(!b.mousewheel.event) return !1;
				var t = b.container;
				return "container" !== b.params.mousewheelEventsTarged && (t = e(b.params.mousewheelEventsTarged)), t.off(b.mousewheel.event, c), !0
			}, b.enableMousewheelControl = function() {
				if(!b.mousewheel.event) return !1;
				var t = b.container;
				return "container" !== b.params.mousewheelEventsTarged && (t = e(b.params.mousewheelEventsTarged)), t.on(b.mousewheel.event, c), !0
			}, b.parallax = {
				setTranslate: function() {
					b.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
						p(this, b.progress)
					}), b.slides.each(function() {
						var t = e(this);
						t.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
							p(this, Math.min(Math.max(t[0].progress, -1), 1))
						})
					})
				},
				setTransition: function(t) {
					void 0 === t && (t = b.params.speed), b.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
						var n = e(this),
							i = parseInt(n.attr("data-swiper-parallax-duration"), 10) || t;
						0 === t && (i = 0), n.transition(i)
					})
				}
			}, b.zoom = {
				scale: 1,
				currentScale: 1,
				isScaling: !1,
				gesture: {
					slide: void 0,
					slideWidth: void 0,
					slideHeight: void 0,
					image: void 0,
					imageWrap: void 0,
					zoomMax: b.params.zoomMax
				},
				image: {
					isTouched: void 0,
					isMoved: void 0,
					currentX: void 0,
					currentY: void 0,
					minX: void 0,
					minY: void 0,
					maxX: void 0,
					maxY: void 0,
					width: void 0,
					height: void 0,
					startX: void 0,
					startY: void 0,
					touchesStart: {},
					touchesCurrent: {}
				},
				velocity: {
					x: void 0,
					y: void 0,
					prevPositionX: void 0,
					prevPositionY: void 0,
					prevTime: void 0
				},
				getDistanceBetweenTouches: function(e) {
					if(e.targetTouches.length < 2) return 1;
					var t = e.targetTouches[0].pageX,
						n = e.targetTouches[0].pageY,
						i = e.targetTouches[1].pageX,
						a = e.targetTouches[1].pageY;
					return Math.sqrt(Math.pow(i - t, 2) + Math.pow(a - n, 2))
				},
				onGestureStart: function(t) {
					var n = b.zoom;
					if(!b.support.gestures) {
						if("touchstart" !== t.type || "touchstart" === t.type && t.targetTouches.length < 2) return;
						n.gesture.scaleStart = n.getDistanceBetweenTouches(t)
					}
					return n.gesture.slide && n.gesture.slide.length || (n.gesture.slide = e(this), 0 === n.gesture.slide.length && (n.gesture.slide = b.slides.eq(b.activeIndex)), n.gesture.image = n.gesture.slide.find("img, svg, canvas"), n.gesture.imageWrap = n.gesture.image.parent("." + b.params.zoomContainerClass), n.gesture.zoomMax = n.gesture.imageWrap.attr("data-swiper-zoom") || b.params.zoomMax, 0 !== n.gesture.imageWrap.length) ? (n.gesture.image.transition(0), void(n.isScaling = !0)) : void(n.gesture.image = void 0)
				},
				onGestureChange: function(e) {
					var t = b.zoom;
					if(!b.support.gestures) {
						if("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
						t.gesture.scaleMove = t.getDistanceBetweenTouches(e)
					}
					t.gesture.image && 0 !== t.gesture.image.length && (b.support.gestures ? t.scale = e.scale * t.currentScale : t.scale = t.gesture.scaleMove / t.gesture.scaleStart * t.currentScale, t.scale > t.gesture.zoomMax && (t.scale = t.gesture.zoomMax - 1 + Math.pow(t.scale - t.gesture.zoomMax + 1, .5)), t.scale < b.params.zoomMin && (t.scale = b.params.zoomMin + 1 - Math.pow(b.params.zoomMin - t.scale + 1, .5)), t.gesture.image.transform("translate3d(0,0,0) scale(" + t.scale + ")"))
				},
				onGestureEnd: function(e) {
					var t = b.zoom;
					!b.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || t.gesture.image && 0 !== t.gesture.image.length && (t.scale = Math.max(Math.min(t.scale, t.gesture.zoomMax), b.params.zoomMin), t.gesture.image.transition(b.params.speed).transform("translate3d(0,0,0) scale(" + t.scale + ")"), t.currentScale = t.scale, t.isScaling = !1, 1 === t.scale && (t.gesture.slide = void 0))
				},
				onTouchStart: function(e, t) {
					var n = e.zoom;
					n.gesture.image && 0 !== n.gesture.image.length && (n.image.isTouched || ("android" === e.device.os && t.preventDefault(), n.image.isTouched = !0, n.image.touchesStart.x = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX, n.image.touchesStart.y = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY))
				},
				onTouchMove: function(e) {
					var t = b.zoom;
					if(t.gesture.image && 0 !== t.gesture.image.length && (b.allowClick = !1, t.image.isTouched && t.gesture.slide)) {
						t.image.isMoved || (t.image.width = t.gesture.image[0].offsetWidth, t.image.height = t.gesture.image[0].offsetHeight, t.image.startX = b.getTranslate(t.gesture.imageWrap[0], "x") || 0, t.image.startY = b.getTranslate(t.gesture.imageWrap[0], "y") || 0, t.gesture.slideWidth = t.gesture.slide[0].offsetWidth, t.gesture.slideHeight = t.gesture.slide[0].offsetHeight, t.gesture.imageWrap.transition(0), b.rtl && (t.image.startX = -t.image.startX), b.rtl && (t.image.startY = -t.image.startY));
						var n = t.image.width * t.scale,
							i = t.image.height * t.scale;
						if(!(n < t.gesture.slideWidth && i < t.gesture.slideHeight)) {
							if(t.image.minX = Math.min(t.gesture.slideWidth / 2 - n / 2, 0), t.image.maxX = -t.image.minX, t.image.minY = Math.min(t.gesture.slideHeight / 2 - i / 2, 0), t.image.maxY = -t.image.minY, t.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, t.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !t.image.isMoved && !t.isScaling) {
								if(b.isHorizontal() && Math.floor(t.image.minX) === Math.floor(t.image.startX) && t.image.touchesCurrent.x < t.image.touchesStart.x || Math.floor(t.image.maxX) === Math.floor(t.image.startX) && t.image.touchesCurrent.x > t.image.touchesStart.x) return void(t.image.isTouched = !1);
								if(!b.isHorizontal() && Math.floor(t.image.minY) === Math.floor(t.image.startY) && t.image.touchesCurrent.y < t.image.touchesStart.y || Math.floor(t.image.maxY) === Math.floor(t.image.startY) && t.image.touchesCurrent.y > t.image.touchesStart.y) return void(t.image.isTouched = !1)
							}
							e.preventDefault(), e.stopPropagation(), t.image.isMoved = !0, t.image.currentX = t.image.touchesCurrent.x - t.image.touchesStart.x + t.image.startX, t.image.currentY = t.image.touchesCurrent.y - t.image.touchesStart.y + t.image.startY, t.image.currentX < t.image.minX && (t.image.currentX = t.image.minX + 1 - Math.pow(t.image.minX - t.image.currentX + 1, .8)), t.image.currentX > t.image.maxX && (t.image.currentX = t.image.maxX - 1 + Math.pow(t.image.currentX - t.image.maxX + 1, .8)), t.image.currentY < t.image.minY && (t.image.currentY = t.image.minY + 1 - Math.pow(t.image.minY - t.image.currentY + 1, .8)), t.image.currentY > t.image.maxY && (t.image.currentY = t.image.maxY - 1 + Math.pow(t.image.currentY - t.image.maxY + 1, .8)), t.velocity.prevPositionX || (t.velocity.prevPositionX = t.image.touchesCurrent.x), t.velocity.prevPositionY || (t.velocity.prevPositionY = t.image.touchesCurrent.y), t.velocity.prevTime || (t.velocity.prevTime = Date.now()), t.velocity.x = (t.image.touchesCurrent.x - t.velocity.prevPositionX) / (Date.now() - t.velocity.prevTime) / 2, t.velocity.y = (t.image.touchesCurrent.y - t.velocity.prevPositionY) / (Date.now() - t.velocity.prevTime) / 2, Math.abs(t.image.touchesCurrent.x - t.velocity.prevPositionX) < 2 && (t.velocity.x = 0), Math.abs(t.image.touchesCurrent.y - t.velocity.prevPositionY) < 2 && (t.velocity.y = 0), t.velocity.prevPositionX = t.image.touchesCurrent.x, t.velocity.prevPositionY = t.image.touchesCurrent.y, t.velocity.prevTime = Date.now(), t.gesture.imageWrap.transform("translate3d(" + t.image.currentX + "px, " + t.image.currentY + "px,0)")
						}
					}
				},
				onTouchEnd: function(e, t) {
					var n = e.zoom;
					if(n.gesture.image && 0 !== n.gesture.image.length) {
						if(!n.image.isTouched || !n.image.isMoved) return n.image.isTouched = !1, void(n.image.isMoved = !1);
						n.image.isTouched = !1, n.image.isMoved = !1;
						var i = 300,
							a = 300,
							r = n.velocity.x * i,
							o = n.image.currentX + r,
							s = n.velocity.y * a,
							l = n.image.currentY + s;
						0 !== n.velocity.x && (i = Math.abs((o - n.image.currentX) / n.velocity.x)), 0 !== n.velocity.y && (a = Math.abs((l - n.image.currentY) / n.velocity.y));
						var d = Math.max(i, a);
						n.image.currentX = o, n.image.currentY = l;
						var c = n.image.width * n.scale,
							u = n.image.height * n.scale;
						n.image.minX = Math.min(n.gesture.slideWidth / 2 - c / 2, 0), n.image.maxX = -n.image.minX, n.image.minY = Math.min(n.gesture.slideHeight / 2 - u / 2, 0), n.image.maxY = -n.image.minY, n.image.currentX = Math.max(Math.min(n.image.currentX, n.image.maxX), n.image.minX), n.image.currentY = Math.max(Math.min(n.image.currentY, n.image.maxY), n.image.minY), n.gesture.imageWrap.transition(d).transform("translate3d(" + n.image.currentX + "px, " + n.image.currentY + "px,0)")
					}
				},
				onTransitionEnd: function(e) {
					var t = e.zoom;
					t.gesture.slide && e.previousIndex !== e.activeIndex && (t.gesture.image.transform("translate3d(0,0,0) scale(1)"), t.gesture.imageWrap.transform("translate3d(0,0,0)"), t.gesture.slide = t.gesture.image = t.gesture.imageWrap = void 0, t.scale = t.currentScale = 1)
				},
				toggleZoom: function(t, n) {
					var i = t.zoom;
					if(i.gesture.slide || (i.gesture.slide = t.clickedSlide ? e(t.clickedSlide) : t.slides.eq(t.activeIndex), i.gesture.image = i.gesture.slide.find("img, svg, canvas"), i.gesture.imageWrap = i.gesture.image.parent("." + t.params.zoomContainerClass)), i.gesture.image && 0 !== i.gesture.image.length) {
						var a, r, o, s, l, d, c, u, p, h, m, f, g, v, w, y, x, b;
						void 0 === i.image.touchesStart.x && n ? (a = "touchend" === n.type ? n.changedTouches[0].pageX : n.pageX, r = "touchend" === n.type ? n.changedTouches[0].pageY : n.pageY) : (a = i.image.touchesStart.x, r = i.image.touchesStart.y), i.scale && 1 !== i.scale ? (i.scale = i.currentScale = 1, i.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), i.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), i.gesture.slide = void 0) : (i.scale = i.currentScale = i.gesture.imageWrap.attr("data-swiper-zoom") || t.params.zoomMax, n ? (x = i.gesture.slide[0].offsetWidth, b = i.gesture.slide[0].offsetHeight, o = i.gesture.slide.offset().left, s = i.gesture.slide.offset().top, l = o + x / 2 - a, d = s + b / 2 - r, p = i.gesture.image[0].offsetWidth, h = i.gesture.image[0].offsetHeight, m = p * i.scale, f = h * i.scale, g = Math.min(x / 2 - m / 2, 0), v = Math.min(b / 2 - f / 2, 0), w = -g, y = -v, c = l * i.scale, u = d * i.scale, c < g && (c = g), c > w && (c = w), u < v && (u = v), u > y && (u = y)) : (c = 0, u = 0), i.gesture.imageWrap.transition(300).transform("translate3d(" + c + "px, " + u + "px,0)"), i.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + i.scale + ")"))
					}
				},
				attachEvents: function(t) {
					var n = t ? "off" : "on";
					if(b.params.zoom) {
						var i = (b.slides, !("touchstart" !== b.touchEvents.start || !b.support.passiveListener || !b.params.passiveListeners) && {
							passive: !0,
							capture: !1
						});
						b.support.gestures ? (b.slides[n]("gesturestart", b.zoom.onGestureStart, i), b.slides[n]("gesturechange", b.zoom.onGestureChange, i), b.slides[n]("gestureend", b.zoom.onGestureEnd, i)) : "touchstart" === b.touchEvents.start && (b.slides[n](b.touchEvents.start, b.zoom.onGestureStart, i), b.slides[n](b.touchEvents.move, b.zoom.onGestureChange, i), b.slides[n](b.touchEvents.end, b.zoom.onGestureEnd, i)), b[n]("touchStart", b.zoom.onTouchStart), b.slides.each(function(t, i) {
							e(i).find("." + b.params.zoomContainerClass).length > 0 && e(i)[n](b.touchEvents.move, b.zoom.onTouchMove)
						}), b[n]("touchEnd", b.zoom.onTouchEnd), b[n]("transitionEnd", b.zoom.onTransitionEnd), b.params.zoomToggle && b.on("doubleTap", b.zoom.toggleZoom)
					}
				},
				init: function() {
					b.zoom.attachEvents()
				},
				destroy: function() {
					b.zoom.attachEvents(!0)
				}
			}, b._plugins = [];
			for(var F in b.plugins) {
				var G = b.plugins[F](b, b.params[F]);
				G && b._plugins.push(G)
			}
			return b.callPlugins = function(e) {
				for(var t = 0; t < b._plugins.length; t++) e in b._plugins[t] && b._plugins[t][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
			}, b.emitterEventListeners = {}, b.emit = function(e) {
				b.params[e] && b.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
				var t;
				if(b.emitterEventListeners[e])
					for(t = 0; t < b.emitterEventListeners[e].length; t++) b.emitterEventListeners[e][t](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
				b.callPlugins && b.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
			}, b.on = function(e, t) {
				return e = h(e), b.emitterEventListeners[e] || (b.emitterEventListeners[e] = []), b.emitterEventListeners[e].push(t), b
			}, b.off = function(e, t) {
				var n;
				if(e = h(e), void 0 === t) return b.emitterEventListeners[e] = [], b;
				if(b.emitterEventListeners[e] && 0 !== b.emitterEventListeners[e].length) {
					for(n = 0; n < b.emitterEventListeners[e].length; n++) b.emitterEventListeners[e][n] === t && b.emitterEventListeners[e].splice(n, 1);
					return b
				}
			}, b.once = function(e, t) {
				e = h(e);
				var n = function() {
					t(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), b.off(e, n)
				};
				return b.on(e, n), b
			}, b.a11y = {
				makeFocusable: function(e) {
					return e.attr("tabIndex", "0"), e
				},
				addRole: function(e, t) {
					return e.attr("role", t), e
				},
				addLabel: function(e, t) {
					return e.attr("aria-label", t), e
				},
				disable: function(e) {
					return e.attr("aria-disabled", !0), e
				},
				enable: function(e) {
					return e.attr("aria-disabled", !1), e
				},
				onEnterKey: function(t) {
					13 === t.keyCode && (e(t.target).is(b.params.nextButton) ? (b.onClickNext(t), b.isEnd ? b.a11y.notify(b.params.lastSlideMessage) : b.a11y.notify(b.params.nextSlideMessage)) : e(t.target).is(b.params.prevButton) && (b.onClickPrev(t), b.isBeginning ? b.a11y.notify(b.params.firstSlideMessage) : b.a11y.notify(b.params.prevSlideMessage)), e(t.target).is("." + b.params.bulletClass) && e(t.target)[0].click())
				},
				liveRegion: e('<span class="' + b.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
				notify: function(e) {
					var t = b.a11y.liveRegion;
					0 !== t.length && (t.html(""), t.html(e))
				},
				init: function() {
					b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.a11y.makeFocusable(b.nextButton), b.a11y.addRole(b.nextButton, "button"), b.a11y.addLabel(b.nextButton, b.params.nextSlideMessage)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.a11y.makeFocusable(b.prevButton), b.a11y.addRole(b.prevButton, "button"), b.a11y.addLabel(b.prevButton, b.params.prevSlideMessage)), e(b.container).append(b.a11y.liveRegion)
				},
				initPagination: function() {
					b.params.pagination && b.params.paginationClickable && b.bullets && b.bullets.length && b.bullets.each(function() {
						var t = e(this);
						b.a11y.makeFocusable(t), b.a11y.addRole(t, "button"), b.a11y.addLabel(t, b.params.paginationBulletMessage.replace(/{{index}}/, t.index() + 1))
					})
				},
				destroy: function() {
					b.a11y.liveRegion && b.a11y.liveRegion.length > 0 && b.a11y.liveRegion.remove()
				}
			}, b.init = function() {
				b.params.loop && b.createLoop(), b.updateContainerSize(), b.updateSlidesSize(), b.updatePagination(), b.params.scrollbar && b.scrollbar && (b.scrollbar.set(), b.params.scrollbarDraggable && b.scrollbar.enableDraggable()), "slide" !== b.params.effect && b.effects[b.params.effect] && (b.params.loop || b.updateProgress(), b.effects[b.params.effect].setTranslate()), b.params.loop ? b.slideTo(b.params.initialSlide + b.loopedSlides, 0, b.params.runCallbacksOnInit) : (b.slideTo(b.params.initialSlide, 0, b.params.runCallbacksOnInit), 0 === b.params.initialSlide && (b.parallax && b.params.parallax && b.parallax.setTranslate(), b.lazy && b.params.lazyLoading && (b.lazy.load(), b.lazy.initialImageLoaded = !0))), b.attachEvents(), b.params.observer && b.support.observer && b.initObservers(), b.params.preloadImages && !b.params.lazyLoading && b.preloadImages(), b.params.zoom && b.zoom && b.zoom.init(), b.params.autoplay && b.startAutoplay(), b.params.keyboardControl && b.enableKeyboardControl && b.enableKeyboardControl(), b.params.mousewheelControl && b.enableMousewheelControl && b.enableMousewheelControl(), b.params.hashnavReplaceState && (b.params.replaceState = b.params.hashnavReplaceState), b.params.history && b.history && b.history.init(), b.params.hashnav && b.hashnav && b.hashnav.init(), b.params.a11y && b.a11y && b.a11y.init(), b.emit("onInit", b)
			}, b.cleanupStyles = function() {
				b.container.removeClass(b.classNames.join(" ")).removeAttr("style"), b.wrapper.removeAttr("style"), b.slides && b.slides.length && b.slides.removeClass([b.params.slideVisibleClass, b.params.slideActiveClass, b.params.slideNextClass, b.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), b.paginationContainer && b.paginationContainer.length && b.paginationContainer.removeClass(b.params.paginationHiddenClass), b.bullets && b.bullets.length && b.bullets.removeClass(b.params.bulletActiveClass), b.params.prevButton && e(b.params.prevButton).removeClass(b.params.buttonDisabledClass), b.params.nextButton && e(b.params.nextButton).removeClass(b.params.buttonDisabledClass), b.params.scrollbar && b.scrollbar && (b.scrollbar.track && b.scrollbar.track.length && b.scrollbar.track.removeAttr("style"),
					b.scrollbar.drag && b.scrollbar.drag.length && b.scrollbar.drag.removeAttr("style"))
			}, b.destroy = function(e, t) {
				b.detachEvents(), b.stopAutoplay(), b.params.scrollbar && b.scrollbar && b.params.scrollbarDraggable && b.scrollbar.disableDraggable(), b.params.loop && b.destroyLoop(), t && b.cleanupStyles(), b.disconnectObservers(), b.params.zoom && b.zoom && b.zoom.destroy(), b.params.keyboardControl && b.disableKeyboardControl && b.disableKeyboardControl(), b.params.mousewheelControl && b.disableMousewheelControl && b.disableMousewheelControl(), b.params.a11y && b.a11y && b.a11y.destroy(), b.params.history && !b.params.replaceState && window.removeEventListener("popstate", b.history.setHistoryPopState), b.params.hashnav && b.hashnav && b.hashnav.destroy(), b.emit("onDestroy"), !1 !== e && (b = null)
			}, b.init(), b
		}
	};
	t.prototype = {
		isSafari: function() {
			var e = window.navigator.userAgent.toLowerCase();
			return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
		}(),
		isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
		isArray: function(e) {
			return "[object Array]" === Object.prototype.toString.apply(e)
		},
		browser: {
			ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
			ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
			lteIE9: function() {
				var e = document.createElement("div");
				return e.innerHTML = "\x3c!--[if lte IE 9]><i></i><![endif]--\x3e", 1 === e.getElementsByTagName("i").length
			}()
		},
		device: function() {
			var e = window.navigator.userAgent,
				t = e.match(/(Android);?[\s\/]+([\d.]+)?/),
				n = e.match(/(iPad).*OS\s([\d_]+)/),
				i = e.match(/(iPod)(.*OS\s([\d_]+))?/),
				a = !n && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
			return {
				ios: n || a || i,
				android: t
			}
		}(),
		support: {
			touch: window.Modernizr && !0 === Modernizr.touch || function() {
				return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
			}(),
			transforms3d: window.Modernizr && !0 === Modernizr.csstransforms3d || function() {
				var e = document.createElement("div").style;
				return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
			}(),
			flexbox: function() {
				for(var e = document.createElement("div").style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), n = 0; n < t.length; n++)
					if(t[n] in e) return !0
			}(),
			observer: function() {
				return "MutationObserver" in window || "WebkitMutationObserver" in window
			}(),
			passiveListener: function() {
				var e = !1;
				try {
					var t = Object.defineProperty({}, "passive", {
						get: function() {
							e = !0
						}
					});
					window.addEventListener("testPassiveListener", null, t)
				} catch(e) {}
				return e
			}(),
			gestures: function() {
				return "ongesturestart" in window
			}()
		},
		plugins: {}
	};
	for(var n = (function() {
			var e = function(e) {
					var t = this,
						n = 0;
					for(n = 0; n < e.length; n++) t[n] = e[n];
					return t.length = e.length, this
				},
				t = function(t, n) {
					var i = [],
						a = 0;
					if(t && !n && t instanceof e) return t;
					if(t)
						if("string" == typeof t) {
							var r, o, s = t.trim();
							if(s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
								var l = "div";
								for(0 === s.indexOf("<li") && (l = "ul"), 0 === s.indexOf("<tr") && (l = "tbody"), 0 !== s.indexOf("<td") && 0 !== s.indexOf("<th") || (l = "tr"), 0 === s.indexOf("<tbody") && (l = "table"), 0 === s.indexOf("<option") && (l = "select"), o = document.createElement(l), o.innerHTML = t, a = 0; a < o.childNodes.length; a++) i.push(o.childNodes[a])
							} else
								for(r = n || "#" !== t[0] || t.match(/[ .<>:~]/) ? (n || document).querySelectorAll(t) : [document.getElementById(t.split("#")[1])], a = 0; a < r.length; a++) r[a] && i.push(r[a])
						} else if(t.nodeType || t === window || t === document) i.push(t);
					else if(t.length > 0 && t[0].nodeType)
						for(a = 0; a < t.length; a++) i.push(t[a]);
					return new e(i)
				};
			return e.prototype = {
				addClass: function(e) {
					if(void 0 === e) return this;
					for(var t = e.split(" "), n = 0; n < t.length; n++)
						for(var i = 0; i < this.length; i++) this[i].classList.add(t[n]);
					return this
				},
				removeClass: function(e) {
					for(var t = e.split(" "), n = 0; n < t.length; n++)
						for(var i = 0; i < this.length; i++) this[i].classList.remove(t[n]);
					return this
				},
				hasClass: function(e) {
					return !!this[0] && this[0].classList.contains(e)
				},
				toggleClass: function(e) {
					for(var t = e.split(" "), n = 0; n < t.length; n++)
						for(var i = 0; i < this.length; i++) this[i].classList.toggle(t[n]);
					return this
				},
				attr: function(e, t) {
					if(1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
					for(var n = 0; n < this.length; n++)
						if(2 === arguments.length) this[n].setAttribute(e, t);
						else
							for(var i in e) this[n][i] = e[i], this[n].setAttribute(i, e[i]);
					return this
				},
				removeAttr: function(e) {
					for(var t = 0; t < this.length; t++) this[t].removeAttribute(e);
					return this
				},
				data: function(e, t) {
					if(void 0 !== t) {
						for(var n = 0; n < this.length; n++) {
							var i = this[n];
							i.dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = t
						}
						return this
					}
					if(this[0]) {
						var a = this[0].getAttribute("data-" + e);
						return a || (this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0)
					}
				},
				transform: function(e) {
					for(var t = 0; t < this.length; t++) {
						var n = this[t].style;
						n.webkitTransform = n.MsTransform = n.msTransform = n.MozTransform = n.OTransform = n.transform = e
					}
					return this
				},
				transition: function(e) {
					"string" != typeof e && (e += "ms");
					for(var t = 0; t < this.length; t++) {
						var n = this[t].style;
						n.webkitTransitionDuration = n.MsTransitionDuration = n.msTransitionDuration = n.MozTransitionDuration = n.OTransitionDuration = n.transitionDuration = e
					}
					return this
				},
				on: function(e, n, i, a) {
					function r(e) {
						var a = e.target;
						if(t(a).is(n)) i.call(a, e);
						else
							for(var r = t(a).parents(), o = 0; o < r.length; o++) t(r[o]).is(n) && i.call(r[o], e)
					}
					var o, s, l = e.split(" ");
					for(o = 0; o < this.length; o++)
						if("function" == typeof n || !1 === n)
							for("function" == typeof n && (i = arguments[1], a = arguments[2] || !1), s = 0; s < l.length; s++) this[o].addEventListener(l[s], i, a);
						else
							for(s = 0; s < l.length; s++) this[o].dom7LiveListeners || (this[o].dom7LiveListeners = []), this[o].dom7LiveListeners.push({
								listener: i,
								liveListener: r
							}), this[o].addEventListener(l[s], r, a);
					return this
				},
				off: function(e, t, n, i) {
					for(var a = e.split(" "), r = 0; r < a.length; r++)
						for(var o = 0; o < this.length; o++)
							if("function" == typeof t || !1 === t) "function" == typeof t && (n = arguments[1], i = arguments[2] || !1), this[o].removeEventListener(a[r], n, i);
							else if(this[o].dom7LiveListeners)
						for(var s = 0; s < this[o].dom7LiveListeners.length; s++) this[o].dom7LiveListeners[s].listener === n && this[o].removeEventListener(a[r], this[o].dom7LiveListeners[s].liveListener, i);
					return this
				},
				once: function(e, t, n, i) {
					function a(o) {
						n(o), r.off(e, t, a, i)
					}
					var r = this;
					"function" == typeof t && (t = !1, n = arguments[1], i = arguments[2]), r.on(e, t, a, i)
				},
				trigger: function(e, t) {
					for(var n = 0; n < this.length; n++) {
						var i;
						try {
							i = new window.CustomEvent(e, {
								detail: t,
								bubbles: !0,
								cancelable: !0
							})
						} catch(n) {
							i = document.createEvent("Event"), i.initEvent(e, !0, !0), i.detail = t
						}
						this[n].dispatchEvent(i)
					}
					return this
				},
				transitionEnd: function(e) {
					function t(r) {
						if(r.target === this)
							for(e.call(this, r), n = 0; n < i.length; n++) a.off(i[n], t)
					}
					var n, i = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
						a = this;
					if(e)
						for(n = 0; n < i.length; n++) a.on(i[n], t);
					return this
				},
				width: function() {
					return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
				},
				outerWidth: function(e) {
					return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
				},
				height: function() {
					return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
				},
				outerHeight: function(e) {
					return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
				},
				offset: function() {
					if(this.length > 0) {
						var e = this[0],
							t = e.getBoundingClientRect(),
							n = document.body,
							i = e.clientTop || n.clientTop || 0,
							a = e.clientLeft || n.clientLeft || 0,
							r = window.pageYOffset || e.scrollTop,
							o = window.pageXOffset || e.scrollLeft;
						return {
							top: t.top + r - i,
							left: t.left + o - a
						}
					}
					return null
				},
				css: function(e, t) {
					var n;
					if(1 === arguments.length) {
						if("string" != typeof e) {
							for(n = 0; n < this.length; n++)
								for(var i in e) this[n].style[i] = e[i];
							return this
						}
						if(this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e)
					}
					if(2 === arguments.length && "string" == typeof e) {
						for(n = 0; n < this.length; n++) this[n].style[e] = t;
						return this
					}
					return this
				},
				each: function(e) {
					for(var t = 0; t < this.length; t++) e.call(this[t], t, this[t]);
					return this
				},
				html: function(e) {
					if(void 0 === e) return this[0] ? this[0].innerHTML : void 0;
					for(var t = 0; t < this.length; t++) this[t].innerHTML = e;
					return this
				},
				text: function(e) {
					if(void 0 === e) return this[0] ? this[0].textContent.trim() : null;
					for(var t = 0; t < this.length; t++) this[t].textContent = e;
					return this
				},
				is: function(n) {
					if(!this[0]) return !1;
					var i, a;
					if("string" == typeof n) {
						var r = this[0];
						if(r === document) return n === document;
						if(r === window) return n === window;
						if(r.matches) return r.matches(n);
						if(r.webkitMatchesSelector) return r.webkitMatchesSelector(n);
						if(r.mozMatchesSelector) return r.mozMatchesSelector(n);
						if(r.msMatchesSelector) return r.msMatchesSelector(n);
						for(i = t(n), a = 0; a < i.length; a++)
							if(i[a] === this[0]) return !0;
						return !1
					}
					if(n === document) return this[0] === document;
					if(n === window) return this[0] === window;
					if(n.nodeType || n instanceof e) {
						for(i = n.nodeType ? [n] : n, a = 0; a < i.length; a++)
							if(i[a] === this[0]) return !0;
						return !1
					}
					return !1
				},
				index: function() {
					if(this[0]) {
						for(var e = this[0], t = 0; null !== (e = e.previousSibling);) 1 === e.nodeType && t++;
						return t
					}
				},
				eq: function(t) {
					if(void 0 === t) return this;
					var n, i = this.length;
					return t > i - 1 ? new e([]) : t < 0 ? (n = i + t, new e(n < 0 ? [] : [this[n]])) : new e([this[t]])
				},
				append: function(t) {
					var n, i;
					for(n = 0; n < this.length; n++)
						if("string" == typeof t) {
							var a = document.createElement("div");
							for(a.innerHTML = t; a.firstChild;) this[n].appendChild(a.firstChild)
						} else if(t instanceof e)
						for(i = 0; i < t.length; i++) this[n].appendChild(t[i]);
					else this[n].appendChild(t);
					return this
				},
				prepend: function(t) {
					var n, i;
					for(n = 0; n < this.length; n++)
						if("string" == typeof t) {
							var a = document.createElement("div");
							for(a.innerHTML = t, i = a.childNodes.length - 1; i >= 0; i--) this[n].insertBefore(a.childNodes[i], this[n].childNodes[0])
						} else if(t instanceof e)
						for(i = 0; i < t.length; i++) this[n].insertBefore(t[i], this[n].childNodes[0]);
					else this[n].insertBefore(t, this[n].childNodes[0]);
					return this
				},
				insertBefore: function(e) {
					for(var n = t(e), i = 0; i < this.length; i++)
						if(1 === n.length) n[0].parentNode.insertBefore(this[i], n[0]);
						else if(n.length > 1)
						for(var a = 0; a < n.length; a++) n[a].parentNode.insertBefore(this[i].cloneNode(!0), n[a])
				},
				insertAfter: function(e) {
					for(var n = t(e), i = 0; i < this.length; i++)
						if(1 === n.length) n[0].parentNode.insertBefore(this[i], n[0].nextSibling);
						else if(n.length > 1)
						for(var a = 0; a < n.length; a++) n[a].parentNode.insertBefore(this[i].cloneNode(!0), n[a].nextSibling)
				},
				next: function(n) {
					return new e(this.length > 0 ? n ? this[0].nextElementSibling && t(this[0].nextElementSibling).is(n) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
				},
				nextAll: function(n) {
					var i = [],
						a = this[0];
					if(!a) return new e([]);
					for(; a.nextElementSibling;) {
						var r = a.nextElementSibling;
						n ? t(r).is(n) && i.push(r) : i.push(r), a = r
					}
					return new e(i)
				},
				prev: function(n) {
					return new e(this.length > 0 ? n ? this[0].previousElementSibling && t(this[0].previousElementSibling).is(n) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
				},
				prevAll: function(n) {
					var i = [],
						a = this[0];
					if(!a) return new e([]);
					for(; a.previousElementSibling;) {
						var r = a.previousElementSibling;
						n ? t(r).is(n) && i.push(r) : i.push(r), a = r
					}
					return new e(i)
				},
				parent: function(e) {
					for(var n = [], i = 0; i < this.length; i++) e ? t(this[i].parentNode).is(e) && n.push(this[i].parentNode) : n.push(this[i].parentNode);
					return t(t.unique(n))
				},
				parents: function(e) {
					for(var n = [], i = 0; i < this.length; i++)
						for(var a = this[i].parentNode; a;) e ? t(a).is(e) && n.push(a) : n.push(a), a = a.parentNode;
					return t(t.unique(n))
				},
				find: function(t) {
					for(var n = [], i = 0; i < this.length; i++)
						for(var a = this[i].querySelectorAll(t), r = 0; r < a.length; r++) n.push(a[r]);
					return new e(n)
				},
				children: function(n) {
					for(var i = [], a = 0; a < this.length; a++)
						for(var r = this[a].childNodes, o = 0; o < r.length; o++) n ? 1 === r[o].nodeType && t(r[o]).is(n) && i.push(r[o]) : 1 === r[o].nodeType && i.push(r[o]);
					return new e(t.unique(i))
				},
				remove: function() {
					for(var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
					return this
				},
				add: function() {
					var e, n, i = this;
					for(e = 0; e < arguments.length; e++) {
						var a = t(arguments[e]);
						for(n = 0; n < a.length; n++) i[i.length] = a[n], i.length++
					}
					return i
				}
			}, t.fn = e.prototype, t.unique = function(e) {
				for(var t = [], n = 0; n < e.length; n++) - 1 === t.indexOf(e[n]) && t.push(e[n]);
				return t
			}, t
		}()), i = ["jQuery", "Zepto", "Dom7"], a = 0; a < i.length; a++) window[i[a]] && function(e) {
		e.fn.swiper = function(n) {
			var i;
			return e(this).each(function() {
				var e = new t(this, n);
				i || (i = e)
			}), i
		}
	}(window[i[a]]);
	var r;
	r = void 0 === n ? window.Dom7 || window.Zepto || window.jQuery : n, r && ("transitionEnd" in r.fn || (r.fn.transitionEnd = function(e) {
		function t(r) {
			if(r.target === this)
				for(e.call(this, r), n = 0; n < i.length; n++) a.off(i[n], t)
		}
		var n, i = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
			a = this;
		if(e)
			for(n = 0; n < i.length; n++) a.on(i[n], t);
		return this
	}), "transform" in r.fn || (r.fn.transform = function(e) {
		for(var t = 0; t < this.length; t++) {
			var n = this[t].style;
			n.webkitTransform = n.MsTransform = n.msTransform = n.MozTransform = n.OTransform = n.transform = e
		}
		return this
	}), "transition" in r.fn || (r.fn.transition = function(e) {
		"string" != typeof e && (e += "ms");
		for(var t = 0; t < this.length; t++) {
			var n = this[t].style;
			n.webkitTransitionDuration = n.MsTransitionDuration = n.msTransitionDuration = n.MozTransitionDuration = n.OTransitionDuration = n.transitionDuration = e
		}
		return this
	}), "outerWidth" in r.fn || (r.fn.outerWidth = function(e) {
		return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
	})), window.Swiper = t
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
	"use strict";
	return window.Swiper
});
var Canvas2Image = function() {
	var e = !1,
		t = document.createElement("canvas");
	if(t.getContext("2d") && (e = !0), !e) return {
		saveAsBMP: function() {},
		saveAsPNG: function() {},
		saveAsJPEG: function() {}
	};
	var n = !!t.getContext("2d").getImageData,
		i = !!t.toDataURL,
		a = !!window.btoa,
		r = function(e) {
			var t = parseInt(e.width),
				n = parseInt(e.height);
			return e.getContext("2d").getImageData(0, 0, t, n)
		},
		o = function(e) {
			var t = "";
			if("string" == typeof e) t = e;
			else
				for(var n = e, i = 0; i < n.length; i++) t += String.fromCharCode(n[i]);
			return btoa(t)
		},
		s = function(e) {
			var t = [],
				n = e.width,
				i = e.height;
			t.push(66), t.push(77);
			var a = n * i * 3 + 54;
			t.push(a % 256), a = Math.floor(a / 256), t.push(a % 256), a = Math.floor(a / 256), t.push(a % 256), a = Math.floor(a / 256), t.push(a % 256), t.push(0), t.push(0), t.push(0), t.push(0), t.push(54), t.push(0), t.push(0), t.push(0);
			var r = [];
			r.push(40), r.push(0), r.push(0), r.push(0);
			var s = n;
			r.push(s % 256), s = Math.floor(s / 256), r.push(s % 256), s = Math.floor(s / 256), r.push(s % 256), s = Math.floor(s / 256), r.push(s % 256);
			var l = i;
			r.push(l % 256), l = Math.floor(l / 256), r.push(l % 256), l = Math.floor(l / 256), r.push(l % 256), l = Math.floor(l / 256), r.push(l % 256), r.push(1), r.push(0), r.push(24), r.push(0), r.push(0), r.push(0), r.push(0), r.push(0);
			var d = n * i * 3;
			r.push(d % 256), d = Math.floor(d / 256), r.push(d % 256), d = Math.floor(d / 256), r.push(d % 256), d = Math.floor(d / 256), r.push(d % 256);
			for(var c = 0; c < 16; c++) r.push(0);
			var u = (4 - 3 * n % 4) % 4,
				p = e.data,
				h = "",
				m = i;
			do {
				for(var f = n * (m - 1) * 4, g = "", v = 0; v < n; v++) {
					var w = 4 * v;
					g += String.fromCharCode(p[f + w + 2]), g += String.fromCharCode(p[f + w + 1]), g += String.fromCharCode(p[f + w])
				}
				for(var y = 0; y < u; y++) g += String.fromCharCode(0);
				h += g
			} while (--m);
			return o(t.concat(r)) + o(h)
		},
		l = function(e) {
			document.location.href = e
		},
		d = function(e, t) {
			return "data:" + t + ";base64," + e
		},
		c = function(e) {
			var t = document.createElement("img");
			return t.src = e, t
		},
		u = function(e, t, n) {
			if(t && n) {
				var i = document.createElement("canvas");
				i.width = t, i.height = n, i.style.width = t + "px", i.style.height = n + "px";
				return i.getContext("2d").drawImage(e, 0, 0, e.width, e.height, 0, 0, t, n), i
			}
			return e
		};
	return {
		saveAsPNG: function(e, t, n, a) {
			if(!i) return !1;
			var r = u(e, n, a),
				o = r.toDataURL("image/png");
			return t ? c(o) : (l(o.replace("image/png", "image/octet-stream")), !0)
		},
		saveAsJPEG: function(e, t, n, a) {
			if(!i) return !1;
			var r = u(e, n, a),
				o = r.toDataURL("image/jpeg");
			return 5 == o.indexOf("image/jpeg") && (t ? c(o) : (l(o.replace("image/jpeg", "image/octet-stream")), !0))
		},
		saveAsBMP: function(e, t, i, o) {
			if(!n || !a) return !1;
			var p = u(e, i, o),
				h = r(p),
				m = s(h);
			return t ? c(d(m, "image/bmp")) : (l(d(m, "image/octet-stream")), !0)
		}
	}
}();
(function() {
	function e(e) {
		return !!e.exifdata
	}

	function t(e, t) {
		t = t || e.match(/^data\:([^\;]+)\;base64,/im)[1] || "", e = e.replace(/^data\:([^\;]+)\;base64,/gim, "");
		for(var n = atob(e), i = n.length, a = new ArrayBuffer(i), r = new Uint8Array(a), o = 0; o < i; o++) r[o] = n.charCodeAt(o);
		return a
	}

	function i(e, t) {
		var n = new XMLHttpRequest;
		n.open("GET", e, !0), n.responseType = "blob", n.onload = function(e) {
			200 != this.status && 0 !== this.status || t(this.response)
		}, n.send()
	}

	function a(e, n) {
		function a(t) {
			var i = r(t),
				a = o(t);
			e.exifdata = i || {}, e.iptcdata = a || {}, n && n.call(e)
		}
		if(e.src)
			if(/^data\:/i.test(e.src)) {
				var s = t(e.src);
				a(s)
			} else if(/^blob\:/i.test(e.src)) {
			var l = new FileReader;
			l.onload = function(e) {
				a(e.target.result)
			}, i(e.src, function(e) {
				l.readAsArrayBuffer(e)
			})
		} else {
			var d = new XMLHttpRequest;
			d.onload = function() {
				if(200 != this.status && 0 !== this.status) throw "Could not load image";
				a(d.response), d = null
			}, d.open("GET", e.src, !0), d.responseType = "arraybuffer", d.send(null)
		} else if(window.FileReader && (e instanceof window.Blob || e instanceof window.File)) {
			var l = new FileReader;
			l.onload = function(e) {
				p && console.log("Got file of length " + e.target.result.byteLength), a(e.target.result)
			}, l.readAsArrayBuffer(e)
		}
	}

	function r(e) {
		var t = new DataView(e);
		if(p && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1)) return p && console.log("Not a valid JPEG"), !1;
		for(var n, i = 2, a = e.byteLength; i < a;) {
			if(255 != t.getUint8(i)) return p && console.log("Not a valid marker at offset " + i + ", found: " + t.getUint8(i)), !1;
			if(n = t.getUint8(i + 1), p && console.log(n), 225 == n) return p && console.log("Found 0xFFE1 marker"), u(t, i + 4, t.getUint16(i + 2));
			i += 2 + t.getUint16(i + 2)
		}
	}

	function o(e) {
		var t = new DataView(e);
		if(p && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1)) return p && console.log("Not a valid JPEG"), !1;
		for(var n = 2, i = e.byteLength; n < i;) {
			if(function(e, t) {
					return 56 === e.getUint8(t) && 66 === e.getUint8(t + 1) && 73 === e.getUint8(t + 2) && 77 === e.getUint8(t + 3) && 4 === e.getUint8(t + 4) && 4 === e.getUint8(t + 5)
				}(t, n)) {
				var a = t.getUint8(n + 7);
				a % 2 != 0 && (a += 1), 0 === a && (a = 4);
				return s(e, n + 8 + a, t.getUint16(n + 6 + a))
			}
			n++
		}
	}

	function s(e, t, n) {
		for(var i, a, r, o, s = new DataView(e), l = {}, d = t; d < t + n;) 28 === s.getUint8(d) && 2 === s.getUint8(d + 1) && (o = s.getUint8(d + 2)) in y && (r = s.getInt16(d + 3), r + 5, a = y[o], i = c(s, d + 5, r), l.hasOwnProperty(a) ? l[a] instanceof Array ? l[a].push(i) : l[a] = [l[a], i] : l[a] = i), d++;
		return l
	}

	function l(e, t, n, i, a) {
		var r, o, s, l = e.getUint16(n, !a),
			c = {};
		for(s = 0; s < l; s++) r = n + 12 * s + 2, o = i[e.getUint16(r, !a)], !o && p && console.log("Unknown tag: " + e.getUint16(r, !a)), c[o] = d(e, r, t, n, a);
		return c
	}

	function d(e, t, n, i, a) {
		var r, o, s, l, d, u, p = e.getUint16(t + 2, !a),
			h = e.getUint32(t + 4, !a),
			m = e.getUint32(t + 8, !a) + n;
		switch(p) {
			case 1:
			case 7:
				if(1 == h) return e.getUint8(t + 8, !a);
				for(r = h > 4 ? m : t + 8, o = [], l = 0; l < h; l++) o[l] = e.getUint8(r + l);
				return o;
			case 2:
				return r = h > 4 ? m : t + 8, c(e, r, h - 1);
			case 3:
				if(1 == h) return e.getUint16(t + 8, !a);
				for(r = h > 2 ? m : t + 8, o = [], l = 0; l < h; l++) o[l] = e.getUint16(r + 2 * l, !a);
				return o;
			case 4:
				if(1 == h) return e.getUint32(t + 8, !a);
				for(o = [], l = 0; l < h; l++) o[l] = e.getUint32(m + 4 * l, !a);
				return o;
			case 5:
				if(1 == h) return d = e.getUint32(m, !a), u = e.getUint32(m + 4, !a), s = new Number(d / u), s.numerator = d, s.denominator = u, s;
				for(o = [], l = 0; l < h; l++) d = e.getUint32(m + 8 * l, !a), u = e.getUint32(m + 4 + 8 * l, !a), o[l] = new Number(d / u), o[l].numerator = d, o[l].denominator = u;
				return o;
			case 9:
				if(1 == h) return e.getInt32(t + 8, !a);
				for(o = [], l = 0; l < h; l++) o[l] = e.getInt32(m + 4 * l, !a);
				return o;
			case 10:
				if(1 == h) return e.getInt32(m, !a) / e.getInt32(m + 4, !a);
				for(o = [], l = 0; l < h; l++) o[l] = e.getInt32(m + 8 * l, !a) / e.getInt32(m + 4 + 8 * l, !a);
				return o
		}
	}

	function c(e, t, i) {
		var a = "";
		for(n = t; n < t + i; n++) a += String.fromCharCode(e.getUint8(n));
		return a
	}

	function u(e, t) {
		if("Exif" != c(e, t, 4)) return p && console.log("Not valid EXIF data! " + c(e, t, 4)), !1;
		var n, i, a, r, o, s = t + 6;
		if(18761 == e.getUint16(s)) n = !1;
		else {
			if(19789 != e.getUint16(s)) return p && console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"), !1;
			n = !0
		}
		if(42 != e.getUint16(s + 2, !n)) return p && console.log("Not valid TIFF data! (no 0x002A)"), !1;
		var d = e.getUint32(s + 4, !n);
		if(d < 8) return p && console.log("Not valid TIFF data! (First offset less than 8)", e.getUint32(s + 4, !n)), !1;
		if(i = l(e, s, s + d, g, n), i.ExifIFDPointer) {
			r = l(e, s, s + i.ExifIFDPointer, f, n);
			for(a in r) {
				switch(a) {
					case "LightSource":
					case "Flash":
					case "MeteringMode":
					case "ExposureProgram":
					case "SensingMethod":
					case "SceneCaptureType":
					case "SceneType":
					case "CustomRendered":
					case "WhiteBalance":
					case "GainControl":
					case "Contrast":
					case "Saturation":
					case "Sharpness":
					case "SubjectDistanceRange":
					case "FileSource":
						r[a] = w[a][r[a]];
						break;
					case "ExifVersion":
					case "FlashpixVersion":
						r[a] = String.fromCharCode(r[a][0], r[a][1], r[a][2], r[a][3]);
						break;
					case "ComponentsConfiguration":
						r[a] = w.Components[r[a][0]] + w.Components[r[a][1]] + w.Components[r[a][2]] + w.Components[r[a][3]]
				}
				i[a] = r[a]
			}
		}
		if(i.GPSInfoIFDPointer) {
			o = l(e, s, s + i.GPSInfoIFDPointer, v, n);
			for(a in o) {
				switch(a) {
					case "GPSVersionID":
						o[a] = o[a][0] + "." + o[a][1] + "." + o[a][2] + "." + o[a][3]
				}
				i[a] = o[a]
			}
		}
		return i
	}
	var p = !1,
		h = this,
		m = function(e) {
			return e instanceof m ? e : this instanceof m ? void(this.EXIFwrapped = e) : new m(e)
		};
	"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = m), exports.EXIF = m) : h.EXIF = m;
	var f = m.Tags = {
			36864: "ExifVersion",
			40960: "FlashpixVersion",
			40961: "ColorSpace",
			40962: "PixelXDimension",
			40963: "PixelYDimension",
			37121: "ComponentsConfiguration",
			37122: "CompressedBitsPerPixel",
			37500: "MakerNote",
			37510: "UserComment",
			40964: "RelatedSoundFile",
			36867: "DateTimeOriginal",
			36868: "DateTimeDigitized",
			37520: "SubsecTime",
			37521: "SubsecTimeOriginal",
			37522: "SubsecTimeDigitized",
			33434: "ExposureTime",
			33437: "FNumber",
			34850: "ExposureProgram",
			34852: "SpectralSensitivity",
			34855: "ISOSpeedRatings",
			34856: "OECF",
			37377: "ShutterSpeedValue",
			37378: "ApertureValue",
			37379: "BrightnessValue",
			37380: "ExposureBias",
			37381: "MaxApertureValue",
			37382: "SubjectDistance",
			37383: "MeteringMode",
			37384: "LightSource",
			37385: "Flash",
			37396: "SubjectArea",
			37386: "FocalLength",
			41483: "FlashEnergy",
			41484: "SpatialFrequencyResponse",
			41486: "FocalPlaneXResolution",
			41487: "FocalPlaneYResolution",
			41488: "FocalPlaneResolutionUnit",
			41492: "SubjectLocation",
			41493: "ExposureIndex",
			41495: "SensingMethod",
			41728: "FileSource",
			41729: "SceneType",
			41730: "CFAPattern",
			41985: "CustomRendered",
			41986: "ExposureMode",
			41987: "WhiteBalance",
			41988: "DigitalZoomRation",
			41989: "FocalLengthIn35mmFilm",
			41990: "SceneCaptureType",
			41991: "GainControl",
			41992: "Contrast",
			41993: "Saturation",
			41994: "Sharpness",
			41995: "DeviceSettingDescription",
			41996: "SubjectDistanceRange",
			40965: "InteroperabilityIFDPointer",
			42016: "ImageUniqueID"
		},
		g = m.TiffTags = {
			256: "ImageWidth",
			257: "ImageHeight",
			34665: "ExifIFDPointer",
			34853: "GPSInfoIFDPointer",
			40965: "InteroperabilityIFDPointer",
			258: "BitsPerSample",
			259: "Compression",
			262: "PhotometricInterpretation",
			274: "Orientation",
			277: "SamplesPerPixel",
			284: "PlanarConfiguration",
			530: "YCbCrSubSampling",
			531: "YCbCrPositioning",
			282: "XResolution",
			283: "YResolution",
			296: "ResolutionUnit",
			273: "StripOffsets",
			278: "RowsPerStrip",
			279: "StripByteCounts",
			513: "JPEGInterchangeFormat",
			514: "JPEGInterchangeFormatLength",
			301: "TransferFunction",
			318: "WhitePoint",
			319: "PrimaryChromaticities",
			529: "YCbCrCoefficients",
			532: "ReferenceBlackWhite",
			306: "DateTime",
			270: "ImageDescription",
			271: "Make",
			272: "Model",
			305: "Software",
			315: "Artist",
			33432: "Copyright"
		},
		v = m.GPSTags = {
			0: "GPSVersionID",
			1: "GPSLatitudeRef",
			2: "GPSLatitude",
			3: "GPSLongitudeRef",
			4: "GPSLongitude",
			5: "GPSAltitudeRef",
			6: "GPSAltitude",
			7: "GPSTimeStamp",
			8: "GPSSatellites",
			9: "GPSStatus",
			10: "GPSMeasureMode",
			11: "GPSDOP",
			12: "GPSSpeedRef",
			13: "GPSSpeed",
			14: "GPSTrackRef",
			15: "GPSTrack",
			16: "GPSImgDirectionRef",
			17: "GPSImgDirection",
			18: "GPSMapDatum",
			19: "GPSDestLatitudeRef",
			20: "GPSDestLatitude",
			21: "GPSDestLongitudeRef",
			22: "GPSDestLongitude",
			23: "GPSDestBearingRef",
			24: "GPSDestBearing",
			25: "GPSDestDistanceRef",
			26: "GPSDestDistance",
			27: "GPSProcessingMethod",
			28: "GPSAreaInformation",
			29: "GPSDateStamp",
			30: "GPSDifferential"
		},
		w = m.StringValues = {
			ExposureProgram: {
				0: "Not defined",
				1: "Manual",
				2: "Normal program",
				3: "Aperture priority",
				4: "Shutter priority",
				5: "Creative program",
				6: "Action program",
				7: "Portrait mode",
				8: "Landscape mode"
			},
			MeteringMode: {
				0: "Unknown",
				1: "Average",
				2: "CenterWeightedAverage",
				3: "Spot",
				4: "MultiSpot",
				5: "Pattern",
				6: "Partial",
				255: "Other"
			},
			LightSource: {
				0: "Unknown",
				1: "Daylight",
				2: "Fluorescent",
				3: "Tungsten (incandescent light)",
				4: "Flash",
				9: "Fine weather",
				10: "Cloudy weather",
				11: "Shade",
				12: "Daylight fluorescent (D 5700 - 7100K)",
				13: "Day white fluorescent (N 4600 - 5400K)",
				14: "Cool white fluorescent (W 3900 - 4500K)",
				15: "White fluorescent (WW 3200 - 3700K)",
				17: "Standard light A",
				18: "Standard light B",
				19: "Standard light C",
				20: "D55",
				21: "D65",
				22: "D75",
				23: "D50",
				24: "ISO studio tungsten",
				255: "Other"
			},
			Flash: {
				0: "Flash did not fire",
				1: "Flash fired",
				5: "Strobe return light not detected",
				7: "Strobe return light detected",
				9: "Flash fired, compulsory flash mode",
				13: "Flash fired, compulsory flash mode, return light not detected",
				15: "Flash fired, compulsory flash mode, return light detected",
				16: "Flash did not fire, compulsory flash mode",
				24: "Flash did not fire, auto mode",
				25: "Flash fired, auto mode",
				29: "Flash fired, auto mode, return light not detected",
				31: "Flash fired, auto mode, return light detected",
				32: "No flash function",
				65: "Flash fired, red-eye reduction mode",
				69: "Flash fired, red-eye reduction mode, return light not detected",
				71: "Flash fired, red-eye reduction mode, return light detected",
				73: "Flash fired, compulsory flash mode, red-eye reduction mode",
				77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
				79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
				89: "Flash fired, auto mode, red-eye reduction mode",
				93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
				95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
			},
			SensingMethod: {
				1: "Not defined",
				2: "One-chip color area sensor",
				3: "Two-chip color area sensor",
				4: "Three-chip color area sensor",
				5: "Color sequential area sensor",
				7: "Trilinear sensor",
				8: "Color sequential linear sensor"
			},
			SceneCaptureType: {
				0: "Standard",
				1: "Landscape",
				2: "Portrait",
				3: "Night scene"
			},
			SceneType: {
				1: "Directly photographed"
			},
			CustomRendered: {
				0: "Normal process",
				1: "Custom process"
			},
			WhiteBalance: {
				0: "Auto white balance",
				1: "Manual white balance"
			},
			GainControl: {
				0: "None",
				1: "Low gain up",
				2: "High gain up",
				3: "Low gain down",
				4: "High gain down"
			},
			Contrast: {
				0: "Normal",
				1: "Soft",
				2: "Hard"
			},
			Saturation: {
				0: "Normal",
				1: "Low saturation",
				2: "High saturation"
			},
			Sharpness: {
				0: "Normal",
				1: "Soft",
				2: "Hard"
			},
			SubjectDistanceRange: {
				0: "Unknown",
				1: "Macro",
				2: "Close view",
				3: "Distant view"
			},
			FileSource: {
				3: "DSC"
			},
			Components: {
				0: "",
				1: "Y",
				2: "Cb",
				3: "Cr",
				4: "R",
				5: "G",
				6: "B"
			}
		},
		y = {
			120: "caption",
			110: "credit",
			25: "keywords",
			55: "dateCreated",
			80: "byline",
			85: "bylineTitle",
			122: "captionWriter",
			105: "headline",
			116: "copyright",
			15: "category"
		};
	m.getData = function(t, n) {
		return !((t instanceof Image || t instanceof HTMLImageElement) && !t.complete) && (e(t) ? n && n.call(t) : a(t, n), !0)
	}, m.getTag = function(t, n) {
		if(e(t)) return t.exifdata[n]
	}, m.getAllTags = function(t) {
		if(!e(t)) return {};
		var n, i = t.exifdata,
			a = {};
		for(n in i) i.hasOwnProperty(n) && (a[n] = i[n]);
		return a
	}, m.pretty = function(t) {
		if(!e(t)) return "";
		var n, i = t.exifdata,
			a = "";
		for(n in i) i.hasOwnProperty(n) && ("object" == typeof i[n] ? i[n] instanceof Number ? a += n + " : " + i[n] + " [" + i[n].numerator + "/" + i[n].denominator + "]\r\n" : a += n + " : [" + i[n].length + " values]\r\n" : a += n + " : " + i[n] + "\r\n");
		return a
	}, m.readFromBinaryFile = function(e) {
		return r(e)
	}, "function" == typeof define && define.amd && define("exif-js", [], function() {
		return m
	})
}).call(this);
var Matrix3D = function(e, t, n, i, a, r, o, s, l, d, c, u, p, h, m, f) {
	this.elements = window.Float32Array ? new Float32Array(16) : [];
	var g = this.elements;
	g[0] = void 0 !== e ? e : 1, g[4] = t || 0, g[8] = n || 0, g[12] = i || 0, g[1] = a || 0, g[5] = void 0 !== r ? r : 1, g[9] = o || 0, g[13] = s || 0, g[2] = l || 0, g[6] = d || 0, g[10] = void 0 !== c ? c : 1, g[14] = u || 0, g[3] = p || 0, g[7] = h || 0, g[11] = m || 0, g[15] = void 0 !== f ? f : 1
};
Matrix3D.DEG_TO_RAD = Math.PI / 180, Matrix3D.prototype = {
		set: function(e, t, n, i, a, r, o, s, l, d, c, u, p, h, m, f) {
			var g = this.elements;
			return g[0] = e, g[4] = t, g[8] = n, g[12] = i, g[1] = a, g[5] = r, g[9] = o, g[13] = s, g[2] = l, g[6] = d, g[10] = c, g[14] = u, g[3] = p, g[7] = h, g[11] = m, g[15] = f, this
		},
		identity: function() {
			return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
		},
		multiplyMatrices: function(e, t) {
			var n = e.elements,
				i = this.elements,
				a = n[0],
				r = n[4],
				o = n[8],
				s = n[12],
				l = n[1],
				d = n[5],
				c = n[9],
				u = n[13],
				p = n[2],
				h = n[6],
				m = n[10],
				f = n[14],
				g = n[3],
				v = n[7],
				w = n[11],
				y = n[15],
				x = t[0],
				b = t[1],
				T = t[2],
				S = t[3],
				C = t[4],
				E = t[5],
				M = t[6],
				P = t[7],
				I = t[8],
				k = t[9],
				D = t[10],
				L = t[11],
				z = t[12],
				A = t[13],
				R = t[14],
				O = t[15];
			return i[0] = a * x + r * C + o * I + s * z, i[4] = a * b + r * E + o * k + s * A, i[8] = a * T + r * M + o * D + s * R, i[12] = a * S + r * P + o * L + s * O, i[1] = l * x + d * C + c * I + u * z, i[5] = l * b + d * E + c * k + u * A, i[9] = l * T + d * M + c * D + u * R, i[13] = l * S + d * P + c * L + u * O, i[2] = p * x + h * C + m * I + f * z, i[6] = p * b + h * E + m * k + f * A, i[10] = p * T + h * M + m * D + f * R, i[14] = p * S + h * P + m * L + f * O, i[3] = g * x + v * C + w * I + y * z, i[7] = g * b + v * E + w * k + y * A, i[11] = g * T + v * M + w * D + y * R, i[15] = g * S + v * P + w * L + y * O, this
		},
		_rounded: function(e, t) {
			return t = Math.pow(10, t || 15), Math.round(e * t) / t
		},
		appendTransform: function(e, t, n, i, a, r, o, s, l, d, c, u, p, h) {
			var m = o * Matrix3D.DEG_TO_RAD,
				f = this._rounded(Math.cos(m)),
				g = this._rounded(Math.sin(m)),
				v = s * Matrix3D.DEG_TO_RAD,
				w = this._rounded(Math.cos(v)),
				y = this._rounded(Math.sin(v)),
				x = l * Matrix3D.DEG_TO_RAD,
				b = this._rounded(Math.cos(-1 * x)),
				T = this._rounded(Math.sin(-1 * x));
			return this.multiplyMatrices(this, [1, 0, 0, e, 0, f, g, t, 0, -g, f, n, 0, 0, 0, 1]), this.multiplyMatrices(this, [w, 0, y, 0, 0, 1, 0, 0, -y, 0, w, 0, 0, 0, 0, 1]), this.multiplyMatrices(this, [b * i, T * a, 0, 0, -T * i, b * a, 0, 0, 0, 0, 1 * r, 0, 0, 0, 0, 1]), (d || c) && this.multiplyMatrices(this, [this._rounded(Math.cos(d * Matrix3D.DEG_TO_RAD)), this._rounded(Math.sin(d * Matrix3D.DEG_TO_RAD)), 0, 0, -1 * this._rounded(Math.sin(c * Matrix3D.DEG_TO_RAD)), this._rounded(Math.cos(c * Matrix3D.DEG_TO_RAD)), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]), (u || p || h) && (this.elements[12] -= u * this.elements[0] + p * this.elements[4] + h * this.elements[8], this.elements[13] -= u * this.elements[1] + p * this.elements[5] + h * this.elements[9], this.elements[14] -= u * this.elements[2] + p * this.elements[6] + h * this.elements[10]), this
		}
	}, window.Transform = function(e) {
		observe(e, ["translateX", "translateY", "translateZ", "scaleX", "scaleY", "scaleZ", "rotateX", "rotateY", "rotateZ", "skewX", "skewY", "originX", "originY", "originZ"], function() {
			var t = e.matrix3D.identity().appendTransform(e.translateX, e.translateY, e.translateZ, e.scaleX, e.scaleY, e.scaleZ, e.rotateX, e.rotateY, e.rotateZ, e.skewX, e.skewY, e.originX, e.originY, e.originZ);
			e.style.transform = e.style.msTransform = e.style.OTransform = e.style.MozTransform = e.style.webkitTransform = "perspective(" + e.perspective + "px) matrix3d(" + Array.prototype.slice.call(t.elements).join(",") + ")"
		}), observe(e, ["perspective"], function() {
			e.style.transform = e.style.msTransform = e.style.OTransform = e.style.MozTransform = e.style.webkitTransform = "perspective(" + e.perspective + "px) matrix3d(" + Array.prototype.slice.call(e.matrix3D.elements).join(",") + ")"
		}), e.matrix3D = new Matrix3D, e.perspective = 500, e.scaleX = e.scaleY = e.scaleZ = 1, e.translateX = e.translateY = e.translateZ = e.rotateX = e.rotateY = e.rotateZ = e.skewX = e.skewY = e.originX = e.originY = e.originZ = 0
	},
	function(e, t) {
		if("object" == typeof exports && "object" == typeof module) module.exports = t();
		else if("function" == typeof define && define.amd) define([], t);
		else {
			var n = t();
			for(var i in n)("object" == typeof exports ? exports : e)[i] = n[i]
		}
	}(this, function() {
		return function(e) {
			function t(i) {
				if(n[i]) return n[i].exports;
				var a = n[i] = {
					exports: {},
					id: i,
					loaded: !1
				};
				return e[i].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports
			}
			var n = {};
			return t.m = e, t.c = n, t.p = "", t(0)
		}([function(e, t, n) {
			n(6), n(7), e.exports = n(8)
		}, function(e, t, n) {
			(function(t) {
				! function(n) {
					function i(e, t) {
						return function() {
							e.apply(t, arguments)
						}
					}

					function a(e) {
						if("object" != typeof this) throw new TypeError("Promises must be constructed via new");
						if("function" != typeof e) throw new TypeError("not a function");
						this._state = null, this._value = null, this._deferreds = [], c(e, i(o, this), i(s, this))
					}

					function r(e) {
						var t = this;
						return null === this._state ? void this._deferreds.push(e) : void u(function() {
							var n = t._state ? e.onFulfilled : e.onRejected;
							if(null === n) return void(t._state ? e.resolve : e.reject)(t._value);
							var i;
							try {
								i = n(t._value)
							} catch(t) {
								return void e.reject(t)
							}
							e.resolve(i)
						})
					}

					function o(e) {
						try {
							if(e === this) throw new TypeError("A promise cannot be resolved with itself.");
							if(e && ("object" == typeof e || "function" == typeof e)) {
								var t = e.then;
								if("function" == typeof t) return void c(i(t, e), i(o, this), i(s, this))
							}
							this._state = !0, this._value = e, l.call(this)
						} catch(e) {
							s.call(this, e)
						}
					}

					function s(e) {
						this._state = !1, this._value = e, l.call(this)
					}

					function l() {
						for(var e = 0, t = this._deferreds.length; t > e; e++) r.call(this, this._deferreds[e]);
						this._deferreds = null
					}

					function d(e, t, n, i) {
						this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.resolve = n, this.reject = i
					}

					function c(e, t, n) {
						var i = !1;
						try {
							e(function(e) {
								i || (i = !0, t(e))
							}, function(e) {
								i || (i = !0, n(e))
							})
						} catch(e) {
							if(i) return;
							i = !0, n(e)
						}
					}
					var u = "function" == typeof t && t || function(e) {
							setTimeout(e, 1)
						},
						p = Array.isArray || function(e) {
							return "[object Array]" === Object.prototype.toString.call(e)
						};
					a.prototype.catch = function(e) {
						return this.then(null, e)
					}, a.prototype.then = function(e, t) {
						var n = this;
						return new a(function(i, a) {
							r.call(n, new d(e, t, i, a))
						})
					}, a.all = function() {
						var e = Array.prototype.slice.call(1 === arguments.length && p(arguments[0]) ? arguments[0] : arguments);
						return new a(function(t, n) {
							function i(r, o) {
								try {
									if(o && ("object" == typeof o || "function" == typeof o)) {
										var s = o.then;
										if("function" == typeof s) return void s.call(o, function(e) {
											i(r, e)
										}, n)
									}
									e[r] = o, 0 == --a && t(e)
								} catch(e) {
									n(e)
								}
							}
							if(0 === e.length) return t([]);
							for(var a = e.length, r = 0; r < e.length; r++) i(r, e[r])
						})
					}, a.resolve = function(e) {
						return e && "object" == typeof e && e.constructor === a ? e : new a(function(t) {
							t(e)
						})
					}, a.reject = function(e) {
						return new a(function(t, n) {
							n(e)
						})
					}, a.race = function(e) {
						return new a(function(t, n) {
							for(var i = 0, a = e.length; a > i; i++) e[i].then(t, n)
						})
					}, a._setImmediateFn = function(e) {
						u = e
					}, a.prototype.always = function(e) {
						var t = this.constructor;
						return this.then(function(n) {
							return t.resolve(e()).then(function() {
								return n
							})
						}, function(n) {
							return t.resolve(e()).then(function() {
								throw n
							})
						})
					}, void 0 !== e && e.exports ? e.exports = a : n.Promise || (n.Promise = a)
				}(this)
			}).call(t, n(2).setImmediate)
		}, function(e, t, n) {
			(function(e, i) {
				function a(e, t) {
					this._id = e, this._clearFn = t
				}
				var r = n(3).nextTick,
					o = Function.prototype.apply,
					s = Array.prototype.slice,
					l = {},
					d = 0;
				t.setTimeout = function() {
					return new a(o.call(setTimeout, window, arguments), clearTimeout)
				}, t.setInterval = function() {
					return new a(o.call(setInterval, window, arguments), clearInterval)
				}, t.clearTimeout = t.clearInterval = function(e) {
					e.close()
				}, a.prototype.unref = a.prototype.ref = function() {}, a.prototype.close = function() {
					this._clearFn.call(window, this._id)
				}, t.enroll = function(e, t) {
					clearTimeout(e._idleTimeoutId), e._idleTimeout = t
				}, t.unenroll = function(e) {
					clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
				}, t._unrefActive = t.active = function(e) {
					clearTimeout(e._idleTimeoutId);
					var t = e._idleTimeout;
					t >= 0 && (e._idleTimeoutId = setTimeout(function() {
						e._onTimeout && e._onTimeout()
					}, t))
				}, t.setImmediate = "function" == typeof e ? e : function(e) {
					var n = d++,
						i = !(arguments.length < 2) && s.call(arguments, 1);
					return l[n] = !0, r(function() {
						l[n] && (i ? e.apply(null, i) : e.call(null), t.clearImmediate(n))
					}), n
				}, t.clearImmediate = "function" == typeof i ? i : function(e) {
					delete l[e]
				}
			}).call(t, n(2).setImmediate, n(2).clearImmediate)
		}, function(e, t) {
			function n() {
				d = !1, o.length ? l = o.concat(l) : c = -1, l.length && i()
			}

			function i() {
				if(!d) {
					var e = setTimeout(n);
					d = !0;
					for(var t = l.length; t;) {
						for(o = l, l = []; ++c < t;) o && o[c].run();
						c = -1, t = l.length
					}
					o = null, d = !1, clearTimeout(e)
				}
			}

			function a(e, t) {
				this.fun = e, this.array = t
			}

			function r() {}
			var o, s = e.exports = {},
				l = [],
				d = !1,
				c = -1;
			s.nextTick = function(e) {
				var t = new Array(arguments.length - 1);
				if(arguments.length > 1)
					for(var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
				l.push(new a(e, t)), 1 !== l.length || d || setTimeout(i, 0)
			}, a.prototype.run = function() {
				this.fun.apply(null, this.array)
			}, s.title = "browser", s.browser = !0, s.env = {}, s.argv = [], s.version = "", s.versions = {}, s.on = r, s.addListener = r, s.once = r, s.off = r, s.removeListener = r, s.removeAllListeners = r, s.emit = r, s.binding = function(e) {
				throw new Error("process.binding is not supported")
			}, s.cwd = function() {
				return "/"
			}, s.chdir = function(e) {
				throw new Error("process.chdir is not supported")
			}, s.umask = function() {
				return 0
			}
		}, function(e, t) {
			function n() {
				var e = this,
					t = [],
					n = Array(21).join("-") + (+new Date * (1e16 * Math.random())).toString(36),
					a = XMLHttpRequest.prototype.send;
				this.getParts = function() {
					return t.toString()
				}, this.append = function(e, i, a) {
					t.push("--" + n + '\r\nContent-Disposition: form-data; name="' + e + '"'), i instanceof Blob ? (t.push('; filename="' + (a || "blob") + '"\r\nContent-Type: ' + i.type + "\r\n\r\n"), t.push(i)) : t.push("\r\n\r\n" + i), t.push("\r\n")
				}, XMLHttpRequest.prototype.send = function(r) {
					var o, s, l = this;
					r === e ? (t.push("--" + n + "--\r\n"), s = new i(t), o = new FileReader, o.onload = function() {
						a.call(l, o.result)
					}, o.onerror = function(e) {
						throw e
					}, o.readAsArrayBuffer(s), this.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + n), XMLHttpRequest.prototype.send = a) : a.call(this, r)
				}
			}
			var i = function() {
				try {
					return new Blob, !0
				} catch(e) {
					return !1
				}
			}() ? window.Blob : function(e, t) {
				var n = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder || window.MozBlobBuilder);
				return e.forEach(function(e) {
					n.append(e)
				}), n.getBlob(t ? t.type : void 0)
			};
			e.exports = {
				Blob: i,
				FormData: function() {
					return ~navigator.userAgent.indexOf("Android") && ~navigator.vendor.indexOf("Google") && !~navigator.userAgent.indexOf("Chrome") && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534 || /MQQBrowser/g.test(navigator.userAgent)
				}() ? n : FormData
			}
		}, function(e, t, n) {
			var i, a;
			(function() {
				function n(e) {
					return !!e.exifdata
				}

				function r(e, t) {
					t = t || e.match(/^data\:([^\;]+)\;base64,/im)[1] || "", e = e.replace(/^data\:([^\;]+)\;base64,/gim, "");
					for(var n = atob(e), i = n.length, a = new ArrayBuffer(i), r = new Uint8Array(a), o = 0; i > o; o++) r[o] = n.charCodeAt(o);
					return a
				}

				function o(e, t) {
					var n = new XMLHttpRequest;
					n.open("GET", e, !0), n.responseType = "blob", n.onload = function(e) {
						(200 == this.status || 0 === this.status) && t(this.response)
					}, n.send()
				}

				function s(e, t) {
					function n(n) {
						var i = l(n),
							a = d(n);
						e.exifdata = i || {}, e.iptcdata = a || {}, t && t.call(e)
					}
					if(e.src)
						if(/^data\:/i.test(e.src)) {
							var i = r(e.src);
							n(i)
						} else if(/^blob\:/i.test(e.src)) {
						var a = new FileReader;
						a.onload = function(e) {
							n(e.target.result)
						}, o(e.src, function(e) {
							a.readAsArrayBuffer(e)
						})
					} else {
						var s = new XMLHttpRequest;
						s.onload = function() {
							200 == this.status || 0 === this.status ? n(s.response) : t(new Error("Could not load image")), s = null
						}, s.open("GET", e.src, !0), s.responseType = "arraybuffer", s.send(null)
					} else if(window.FileReader && (e instanceof window.Blob || e instanceof window.File)) {
						var a = new FileReader;
						a.onload = function(e) {
							f && console.log("Got file of length " + e.target.result.byteLength), n(e.target.result)
						}, a.readAsArrayBuffer(e)
					}
				}

				function l(e) {
					var t = new DataView(e);
					if(f && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1)) return f && console.log("Not a valid JPEG"), !1;
					for(var n, i = 2, a = e.byteLength; a > i;) {
						if(255 != t.getUint8(i)) return f && console.log("Not a valid marker at offset " + i + ", found: " + t.getUint8(i)), !1;
						if(n = t.getUint8(i + 1), f && console.log(n), 225 == n) return f && console.log("Found 0xFFE1 marker"), m(t, i + 4, t.getUint16(i + 2));
						i += 2 + t.getUint16(i + 2)
					}
				}

				function d(e) {
					var t = new DataView(e);
					if(f && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1)) return f && console.log("Not a valid JPEG"), !1;
					for(var n = 2, i = e.byteLength; i > n;) {
						if(function(e, t) {
								return 56 === e.getUint8(t) && 66 === e.getUint8(t + 1) && 73 === e.getUint8(t + 2) && 77 === e.getUint8(t + 3) && 4 === e.getUint8(t + 4) && 4 === e.getUint8(t + 5)
							}(t, n)) {
							var a = t.getUint8(n + 7);
							a % 2 != 0 && (a += 1), 0 === a && (a = 4);
							return c(e, n + 8 + a, t.getUint16(n + 6 + a))
						}
						n++
					}
				}

				function c(e, t, n) {
					for(var i, a, r, o, s = new DataView(e), l = {}, d = t; t + n > d;) 28 === s.getUint8(d) && 2 === s.getUint8(d + 1) && (o = s.getUint8(d + 2)) in b && (r = s.getInt16(d + 3), r + 5, a = b[o], i = h(s, d + 5, r), l.hasOwnProperty(a) ? l[a] instanceof Array ? l[a].push(i) : l[a] = [l[a], i] : l[a] = i), d++;
					return l
				}

				function u(e, t, n, i, a) {
					var r, o, s, l = e.getUint16(n, !a),
						d = {};
					for(s = 0; l > s; s++) r = n + 12 * s + 2, o = i[e.getUint16(r, !a)], !o && f && console.log("Unknown tag: " + e.getUint16(r, !a)), d[o] = p(e, r, t, n, a);
					return d
				}

				function p(e, t, n, i, a) {
					var r, o, s, l, d, c, u = e.getUint16(t + 2, !a),
						p = e.getUint32(t + 4, !a),
						m = e.getUint32(t + 8, !a) + n;
					switch(u) {
						case 1:
						case 7:
							if(1 == p) return e.getUint8(t + 8, !a);
							for(r = p > 4 ? m : t + 8, o = [], l = 0; p > l; l++) o[l] = e.getUint8(r + l);
							return o;
						case 2:
							return r = p > 4 ? m : t + 8, h(e, r, p - 1);
						case 3:
							if(1 == p) return e.getUint16(t + 8, !a);
							for(r = p > 2 ? m : t + 8, o = [], l = 0; p > l; l++) o[l] = e.getUint16(r + 2 * l, !a);
							return o;
						case 4:
							if(1 == p) return e.getUint32(t + 8, !a);
							for(o = [], l = 0; p > l; l++) o[l] = e.getUint32(m + 4 * l, !a);
							return o;
						case 5:
							if(1 == p) return d = e.getUint32(m, !a), c = e.getUint32(m + 4, !a), s = new Number(d / c), s.numerator = d, s.denominator = c, s;
							for(o = [], l = 0; p > l; l++) d = e.getUint32(m + 8 * l, !a), c = e.getUint32(m + 4 + 8 * l, !a), o[l] = new Number(d / c), o[l].numerator = d, o[l].denominator = c;
							return o;
						case 9:
							if(1 == p) return e.getInt32(t + 8, !a);
							for(o = [], l = 0; p > l; l++) o[l] = e.getInt32(m + 4 * l, !a);
							return o;
						case 10:
							if(1 == p) return e.getInt32(m, !a) / e.getInt32(m + 4, !a);
							for(o = [], l = 0; p > l; l++) o[l] = e.getInt32(m + 8 * l, !a) / e.getInt32(m + 4 + 8 * l, !a);
							return o
					}
				}

				function h(e, t, n) {
					var i, a = "";
					for(i = t; t + n > i; i++) a += String.fromCharCode(e.getUint8(i));
					return a
				}

				function m(e, t) {
					if("Exif" != h(e, t, 4)) return f && console.log("Not valid EXIF data! " + h(e, t, 4)), !1;
					var n, i, a, r, o, s = t + 6;
					if(18761 == e.getUint16(s)) n = !1;
					else {
						if(19789 != e.getUint16(s)) return f && console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"), !1;
						n = !0
					}
					if(42 != e.getUint16(s + 2, !n)) return f && console.log("Not valid TIFF data! (no 0x002A)"), !1;
					var l = e.getUint32(s + 4, !n);
					if(8 > l) return f && console.log("Not valid TIFF data! (First offset less than 8)", e.getUint32(s + 4, !n)), !1;
					if(i = u(e, s, s + l, w, n), i.ExifIFDPointer) {
						r = u(e, s, s + i.ExifIFDPointer, v, n);
						for(a in r) {
							switch(a) {
								case "LightSource":
								case "Flash":
								case "MeteringMode":
								case "ExposureProgram":
								case "SensingMethod":
								case "SceneCaptureType":
								case "SceneType":
								case "CustomRendered":
								case "WhiteBalance":
								case "GainControl":
								case "Contrast":
								case "Saturation":
								case "Sharpness":
								case "SubjectDistanceRange":
								case "FileSource":
									r[a] = x[a][r[a]];
									break;
								case "ExifVersion":
								case "FlashpixVersion":
									r[a] = String.fromCharCode(r[a][0], r[a][1], r[a][2], r[a][3]);
									break;
								case "ComponentsConfiguration":
									r[a] = x.Components[r[a][0]] + x.Components[r[a][1]] + x.Components[r[a][2]] + x.Components[r[a][3]]
							}
							i[a] = r[a]
						}
					}
					if(i.GPSInfoIFDPointer) {
						o = u(e, s, s + i.GPSInfoIFDPointer, y, n);
						for(a in o) {
							switch(a) {
								case "GPSVersionID":
									o[a] = o[a][0] + "." + o[a][1] + "." + o[a][2] + "." + o[a][3]
							}
							i[a] = o[a]
						}
					}
					return i
				}
				var f = !1,
					g = function(e) {
						return e instanceof g ? e : this instanceof g ? void(this.EXIFwrapped = e) : new g(e)
					};
				void 0 !== e && e.exports && (t = e.exports = g), t.EXIF = g;
				var v = g.Tags = {
						36864: "ExifVersion",
						40960: "FlashpixVersion",
						40961: "ColorSpace",
						40962: "PixelXDimension",
						40963: "PixelYDimension",
						37121: "ComponentsConfiguration",
						37122: "CompressedBitsPerPixel",
						37500: "MakerNote",
						37510: "UserComment",
						40964: "RelatedSoundFile",
						36867: "DateTimeOriginal",
						36868: "DateTimeDigitized",
						37520: "SubsecTime",
						37521: "SubsecTimeOriginal",
						37522: "SubsecTimeDigitized",
						33434: "ExposureTime",
						33437: "FNumber",
						34850: "ExposureProgram",
						34852: "SpectralSensitivity",
						34855: "ISOSpeedRatings",
						34856: "OECF",
						37377: "ShutterSpeedValue",
						37378: "ApertureValue",
						37379: "BrightnessValue",
						37380: "ExposureBias",
						37381: "MaxApertureValue",
						37382: "SubjectDistance",
						37383: "MeteringMode",
						37384: "LightSource",
						37385: "Flash",
						37396: "SubjectArea",
						37386: "FocalLength",
						41483: "FlashEnergy",
						41484: "SpatialFrequencyResponse",
						41486: "FocalPlaneXResolution",
						41487: "FocalPlaneYResolution",
						41488: "FocalPlaneResolutionUnit",
						41492: "SubjectLocation",
						41493: "ExposureIndex",
						41495: "SensingMethod",
						41728: "FileSource",
						41729: "SceneType",
						41730: "CFAPattern",
						41985: "CustomRendered",
						41986: "ExposureMode",
						41987: "WhiteBalance",
						41988: "DigitalZoomRation",
						41989: "FocalLengthIn35mmFilm",
						41990: "SceneCaptureType",
						41991: "GainControl",
						41992: "Contrast",
						41993: "Saturation",
						41994: "Sharpness",
						41995: "DeviceSettingDescription",
						41996: "SubjectDistanceRange",
						40965: "InteroperabilityIFDPointer",
						42016: "ImageUniqueID"
					},
					w = g.TiffTags = {
						256: "ImageWidth",
						257: "ImageHeight",
						34665: "ExifIFDPointer",
						34853: "GPSInfoIFDPointer",
						40965: "InteroperabilityIFDPointer",
						258: "BitsPerSample",
						259: "Compression",
						262: "PhotometricInterpretation",
						274: "Orientation",
						277: "SamplesPerPixel",
						284: "PlanarConfiguration",
						530: "YCbCrSubSampling",
						531: "YCbCrPositioning",
						282: "XResolution",
						283: "YResolution",
						296: "ResolutionUnit",
						273: "StripOffsets",
						278: "RowsPerStrip",
						279: "StripByteCounts",
						513: "JPEGInterchangeFormat",
						514: "JPEGInterchangeFormatLength",
						301: "TransferFunction",
						318: "WhitePoint",
						319: "PrimaryChromaticities",
						529: "YCbCrCoefficients",
						532: "ReferenceBlackWhite",
						306: "DateTime",
						270: "ImageDescription",
						271: "Make",
						272: "Model",
						305: "Software",
						315: "Artist",
						33432: "Copyright"
					},
					y = g.GPSTags = {
						0: "GPSVersionID",
						1: "GPSLatitudeRef",
						2: "GPSLatitude",
						3: "GPSLongitudeRef",
						4: "GPSLongitude",
						5: "GPSAltitudeRef",
						6: "GPSAltitude",
						7: "GPSTimeStamp",
						8: "GPSSatellites",
						9: "GPSStatus",
						10: "GPSMeasureMode",
						11: "GPSDOP",
						12: "GPSSpeedRef",
						13: "GPSSpeed",
						14: "GPSTrackRef",
						15: "GPSTrack",
						16: "GPSImgDirectionRef",
						17: "GPSImgDirection",
						18: "GPSMapDatum",
						19: "GPSDestLatitudeRef",
						20: "GPSDestLatitude",
						21: "GPSDestLongitudeRef",
						22: "GPSDestLongitude",
						23: "GPSDestBearingRef",
						24: "GPSDestBearing",
						25: "GPSDestDistanceRef",
						26: "GPSDestDistance",
						27: "GPSProcessingMethod",
						28: "GPSAreaInformation",
						29: "GPSDateStamp",
						30: "GPSDifferential"
					},
					x = g.StringValues = {
						ExposureProgram: {
							0: "Not defined",
							1: "Manual",
							2: "Normal program",
							3: "Aperture priority",
							4: "Shutter priority",
							5: "Creative program",
							6: "Action program",
							7: "Portrait mode",
							8: "Landscape mode"
						},
						MeteringMode: {
							0: "Unknown",
							1: "Average",
							2: "CenterWeightedAverage",
							3: "Spot",
							4: "MultiSpot",
							5: "Pattern",
							6: "Partial",
							255: "Other"
						},
						LightSource: {
							0: "Unknown",
							1: "Daylight",
							2: "Fluorescent",
							3: "Tungsten (incandescent light)",
							4: "Flash",
							9: "Fine weather",
							10: "Cloudy weather",
							11: "Shade",
							12: "Daylight fluorescent (D 5700 - 7100K)",
							13: "Day white fluorescent (N 4600 - 5400K)",
							14: "Cool white fluorescent (W 3900 - 4500K)",
							15: "White fluorescent (WW 3200 - 3700K)",
							17: "Standard light A",
							18: "Standard light B",
							19: "Standard light C",
							20: "D55",
							21: "D65",
							22: "D75",
							23: "D50",
							24: "ISO studio tungsten",
							255: "Other"
						},
						Flash: {
							0: "Flash did not fire",
							1: "Flash fired",
							5: "Strobe return light not detected",
							7: "Strobe return light detected",
							9: "Flash fired, compulsory flash mode",
							13: "Flash fired, compulsory flash mode, return light not detected",
							15: "Flash fired, compulsory flash mode, return light detected",
							16: "Flash did not fire, compulsory flash mode",
							24: "Flash did not fire, auto mode",
							25: "Flash fired, auto mode",
							29: "Flash fired, auto mode, return light not detected",
							31: "Flash fired, auto mode, return light detected",
							32: "No flash function",
							65: "Flash fired, red-eye reduction mode",
							69: "Flash fired, red-eye reduction mode, return light not detected",
							71: "Flash fired, red-eye reduction mode, return light detected",
							73: "Flash fired, compulsory flash mode, red-eye reduction mode",
							77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
							79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
							89: "Flash fired, auto mode, red-eye reduction mode",
							93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
							95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
						},
						SensingMethod: {
							1: "Not defined",
							2: "One-chip color area sensor",
							3: "Two-chip color area sensor",
							4: "Three-chip color area sensor",
							5: "Color sequential area sensor",
							7: "Trilinear sensor",
							8: "Color sequential linear sensor"
						},
						SceneCaptureType: {
							0: "Standard",
							1: "Landscape",
							2: "Portrait",
							3: "Night scene"
						},
						SceneType: {
							1: "Directly photographed"
						},
						CustomRendered: {
							0: "Normal process",
							1: "Custom process"
						},
						WhiteBalance: {
							0: "Auto white balance",
							1: "Manual white balance"
						},
						GainControl: {
							0: "None",
							1: "Low gain up",
							2: "High gain up",
							3: "Low gain down",
							4: "High gain down"
						},
						Contrast: {
							0: "Normal",
							1: "Soft",
							2: "Hard"
						},
						Saturation: {
							0: "Normal",
							1: "Low saturation",
							2: "High saturation"
						},
						Sharpness: {
							0: "Normal",
							1: "Soft",
							2: "Hard"
						},
						SubjectDistanceRange: {
							0: "Unknown",
							1: "Macro",
							2: "Close view",
							3: "Distant view"
						},
						FileSource: {
							3: "DSC"
						},
						Components: {
							0: "",
							1: "Y",
							2: "Cb",
							3: "Cr",
							4: "R",
							5: "G",
							6: "B"
						}
					},
					b = {
						120: "caption",
						110: "credit",
						25: "keywords",
						55: "dateCreated",
						80: "byline",
						85: "bylineTitle",
						122: "captionWriter",
						105: "headline",
						116: "copyright",
						15: "category"
					};
				g.getData = function(e, t) {
					return !((e instanceof Image || e instanceof HTMLImageElement) && !e.complete) && (n(e) ? t && t.call(e) : s(e, t), !0)
				}, g.getTag = function(e, t) {
					return n(e) ? e.exifdata[t] : void 0
				}, g.getAllTags = function(e) {
					if(!n(e)) return {};
					var t, i = e.exifdata,
						a = {};
					for(t in i) i.hasOwnProperty(t) && (a[t] = i[t]);
					return a
				}, g.pretty = function(e) {
					if(!n(e)) return "";
					var t, i = e.exifdata,
						a = "";
					for(t in i) i.hasOwnProperty(t) && (a += "object" == typeof i[t] ? i[t] instanceof Number ? t + " : " + i[t] + " [" + i[t].numerator + "/" + i[t].denominator + "]\r\n" : t + " : [" + i[t].length + " values]\r\n" : t + " : " + i[t] + "\r\n");
					return a
				}, g.readFromBinaryFile = function(e) {
					return l(e)
				}, i = [], void 0 !== (a = function() {
					return g
				}.apply(t, i)) && (e.exports = a)
			}).call(this)
		}, function(e, t, n) {
			var i, a;
			! function() {
				function n(e) {
					var t = e.naturalWidth;
					if(t * e.naturalHeight > 1048576) {
						var n = document.createElement("canvas");
						n.width = n.height = 1;
						var i = n.getContext("2d");
						return i.drawImage(e, 1 - t, 0), 0 === i.getImageData(0, 0, 1, 1).data[3]
					}
					return !1
				}

				function r(e, t, n) {
					var i = document.createElement("canvas");
					i.width = 1, i.height = n;
					var a = i.getContext("2d");
					a.drawImage(e, 0, 0);
					for(var r = a.getImageData(0, 0, 1, n).data, o = 0, s = n, l = n; l > o;) {
						0 === r[4 * (l - 1) + 3] ? s = l : o = l, l = s + o >> 1
					}
					var d = l / n;
					return 0 === d ? 1 : d
				}

				function o(e, t, n) {
					var i = document.createElement("canvas");
					return s(e, i, t, n), i.toDataURL("image/jpeg", t.quality || .8)
				}

				function s(e, t, i, a) {
					var o = e.naturalWidth,
						s = e.naturalHeight,
						d = i.width,
						c = i.height,
						u = t.getContext("2d");
					u.save(), l(t, u, d, c, i.orientation), n(e) && (o /= 2, s /= 2);
					var p = 1024,
						h = document.createElement("canvas");
					h.width = h.height = p;
					for(var m = h.getContext("2d"), f = a ? r(e, o, s) : 1, g = Math.ceil(p * d / o), v = Math.ceil(p * c / s / f), w = 0, y = 0; s > w;) {
						for(var x = 0, b = 0; o > x;) m.clearRect(0, 0, p, p), m.drawImage(e, -x, -w), u.drawImage(h, 0, 0, p, p, b, y, g, v), x += p, b += g;
						w += p, y += v
					}
					u.restore(), h = m = null
				}

				function l(e, t, n, i, a) {
					switch(a) {
						case 5:
						case 6:
						case 7:
						case 8:
							e.width = i, e.height = n;
							break;
						default:
							e.width = n, e.height = i
					}
					switch(a) {
						case 2:
							t.translate(n, 0), t.scale(-1, 1);
							break;
						case 3:
							t.translate(n, i), t.rotate(Math.PI);
							break;
						case 4:
							t.translate(0, i), t.scale(1, -1);
							break;
						case 5:
							t.rotate(.5 * Math.PI), t.scale(1, -1);
							break;
						case 6:
							t.rotate(.5 * Math.PI), t.translate(0, -i);
							break;
						case 7:
							t.rotate(.5 * Math.PI), t.translate(n, -i), t.scale(-1, 1);
							break;
						case 8:
							t.rotate(-.5 * Math.PI), t.translate(-n, 0)
					}
				}

				function d(e) {
					if(window.Blob && e instanceof Blob) {
						var t = new Image,
							n = window.URL && window.URL.createObjectURL ? window.URL : window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL : null;
						if(!n) throw Error("No createObjectURL function found to create blob url");
						t.src = n.createObjectURL(e), this.blob = e, e = t
					}
					if(!e.naturalWidth && !e.naturalHeight) {
						var i = this;
						e.onload = function() {
							var e = i.imageLoadListeners;
							if(e) {
								i.imageLoadListeners = null;
								for(var t = 0, n = e.length; n > t; t++) e[t]()
							}
						}, this.imageLoadListeners = []
					}
					this.srcImage = e
				}
				d.prototype.render = function(e, t, n) {
					if(this.imageLoadListeners) {
						var i = this;
						return void this.imageLoadListeners.push(function() {
							i.render(e, t, n)
						})
					}
					t = t || {};
					var a = this.srcImage,
						r = a.src,
						l = r.length,
						d = a.naturalWidth,
						c = a.naturalHeight,
						u = t.width,
						p = t.height,
						h = t.maxWidth,
						m = t.maxHeight,
						f = this.blob && "image/jpeg" === this.blob.type || 0 === r.indexOf("data:image/jpeg") || r.indexOf(".jpg") === l - 4 || r.indexOf(".jpeg") === l - 5;
					u && !p ? p = c * u / d << 0 : p && !u ? u = d * p / c << 0 : (u = d, p = c), h && u > h && (u = h, p = c * u / d << 0), m && p > m && (p = m, u = d * p / c << 0);
					var g = {
						width: u,
						height: p
					};
					for(var v in t) g[v] = t[v];
					var w = e.tagName.toLowerCase();
					"img" === w ? e.src = o(this.srcImage, g, f) : "canvas" === w && s(this.srcImage, e, g, f), "function" == typeof this.onrender && this.onrender(e), n && n()
				}, i = [], void 0 !== (a = function() {
					return d
				}.apply(t, i)) && (e.exports = a)
			}()
		}, function(e, t) {
			function n(e) {
				function t(e) {
					for(var t = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99], n = 0; 64 > n; n++) {
						var i = S((t[n] * e + 50) / 100);
						1 > i ? i = 1 : i > 255 && (i = 255), C[H[n]] = i
					}
					for(var a = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99], r = 0; 64 > r; r++) {
						var o = S((a[r] * e + 50) / 100);
						1 > o ? o = 1 : o > 255 && (o = 255), E[H[r]] = o
					}
					for(var s = [1, 1.387039845, 1.306562965, 1.175875602, 1, .785694958, .5411961, .275899379], l = 0, d = 0; 8 > d; d++)
						for(var c = 0; 8 > c; c++) M[l] = 1 / (C[H[l]] * s[d] * s[c] * 8), P[l] = 1 / (E[H[l]] * s[d] * s[c] * 8), l++
				}

				function n(e, t) {
					for(var n = 0, i = 0, a = new Array, r = 1; 16 >= r; r++) {
						for(var o = 1; o <= e[r]; o++) a[t[i]] = [], a[t[i]][0] = n, a[t[i]][1] = r, i++, n++;
						n *= 2
					}
					return a
				}

				function i() {
					w = n(X, _), y = n(W, V), x = n(Y, U), b = n(j, q)
				}

				function a() {
					for(var e = 1, t = 2, n = 1; 15 >= n; n++) {
						for(var i = e; t > i; i++) k[32767 + i] = n, I[32767 + i] = [], I[32767 + i][1] = n, I[32767 + i][0] = i;
						for(var a = -(t - 1); - e >= a; a++) k[32767 + a] = n, I[32767 + a] = [], I[32767 + a][1] = n, I[32767 + a][0] = t - 1 + a;
						e <<= 1, t <<= 1
					}
				}

				function r() {
					for(var e = 0; 256 > e; e++) G[e] = 19595 * e, G[e + 256 >> 0] = 38470 * e, G[e + 512 >> 0] = 7471 * e + 32768, G[e + 768 >> 0] = -11059 * e, G[e + 1024 >> 0] = -21709 * e, G[e + 1280 >> 0] = 32768 * e + 8421375, G[e + 1536 >> 0] = -27439 * e, G[e + 1792 >> 0] = -5329 * e
				}

				function o(e) {
					for(var t = e[0], n = e[1] - 1; n >= 0;) t & 1 << n && (A |= 1 << R), n--, 0 > --R && (255 == A ? (s(255), s(0)) : s(A), R = 7, A = 0)
				}

				function s(e) {
					z.push(F[e])
				}

				function l(e) {
					s(e >> 8 & 255), s(255 & e)
				}

				function d(e, t) {
					var n, i, a, r, o, s, l, d, c, u = 0;
					for(c = 0; 8 > c; ++c) {
						n = e[u], i = e[u + 1], a = e[u + 2], r = e[u + 3], o = e[u + 4], s = e[u + 5], l = e[u + 6], d = e[u + 7];
						var p = n + d,
							h = n - d,
							m = i + l,
							f = i - l,
							g = a + s,
							v = a - s,
							w = r + o,
							y = r - o,
							x = p + w,
							b = p - w,
							T = m + g,
							S = m - g;
						e[u] = x + T, e[u + 4] = x - T;
						var C = .707106781 * (S + b);
						e[u + 2] = b + C, e[u + 6] = b - C, x = y + v, T = v + f, S = f + h;
						var E = .382683433 * (x - S),
							M = .5411961 * x + E,
							P = 1.306562965 * S + E,
							I = .707106781 * T,
							k = h + I,
							L = h - I;
						e[u + 5] = L + M, e[u + 3] = L - M, e[u + 1] = k + P, e[u + 7] = k - P, u += 8
					}
					for(u = 0, c = 0; 8 > c; ++c) {
						n = e[u], i = e[u + 8], a = e[u + 16], r = e[u + 24], o = e[u + 32], s = e[u + 40], l = e[u + 48], d = e[u + 56];
						var z = n + d,
							A = n - d,
							R = i + l,
							O = i - l,
							B = a + s,
							N = a - s,
							F = r + o,
							G = r - o,
							H = z + F,
							X = z - F,
							_ = R + B,
							Y = R - B;
						e[u] = H + _, e[u + 32] = H - _;
						var U = .707106781 * (Y + X);
						e[u + 16] = X + U, e[u + 48] = X - U, H = G + N, _ = N + O, Y = O + A;
						var W = .382683433 * (H - Y),
							V = .5411961 * H + W,
							j = 1.306562965 * Y + W,
							q = .707106781 * _,
							K = A + q,
							Q = A - q;
						e[u + 40] = Q + V, e[u + 24] = Q - V, e[u + 8] = K + j, e[u + 56] = K - j, u++
					}
					var Z;
					for(c = 0; 64 > c; ++c) Z = e[c] * t[c], D[c] = Z > 0 ? Z + .5 | 0 : Z - .5 | 0;
					return D
				}

				function c() {
					l(65504), l(16), s(74), s(70), s(73), s(70), s(0), s(1), s(1), s(0), l(1), l(1), s(0), s(0)
				}

				function u(e, t) {
					l(65472), l(17), s(8), l(t), l(e), s(3), s(1), s(17), s(0), s(2), s(17), s(1), s(3), s(17), s(1)
				}

				function p() {
					l(65499), l(132), s(0);
					for(var e = 0; 64 > e; e++) s(C[e]);
					s(1);
					for(var t = 0; 64 > t; t++) s(E[t])
				}

				function h() {
					l(65476), l(418), s(0);
					for(var e = 0; 16 > e; e++) s(X[e + 1]);
					for(var t = 0; 11 >= t; t++) s(_[t]);
					s(16);
					for(var n = 0; 16 > n; n++) s(Y[n + 1]);
					for(var i = 0; 161 >= i; i++) s(U[i]);
					s(1);
					for(var a = 0; 16 > a; a++) s(W[a + 1]);
					for(var r = 0; 11 >= r; r++) s(V[r]);
					s(17);
					for(var o = 0; 16 > o; o++) s(j[o + 1]);
					for(var d = 0; 161 >= d; d++) s(q[d])
				}

				function m() {
					l(65498), l(12), s(3), s(1), s(0), s(2), s(17), s(3), s(17), s(0), s(63), s(0)
				}

				function f(e, t, n, i, a) {
					var r, s = a[0],
						l = a[240];
					for(var c = d(e, t), u = 0; 64 > u; ++u) L[H[u]] = c[u];
					var p = L[0] - n;
					n = L[0], 0 == p ? o(i[0]) : (r = 32767 + p, o(i[k[r]]), o(I[r]));
					for(var h = 63; h > 0 && 0 == L[h]; h--);
					if(0 == h) return o(s), n;
					for(var m, f = 1; h >= f;) {
						for(var g = f; 0 == L[f] && h >= f; ++f);
						var v = f - g;
						if(v >= 16) {
							m = v >> 4;
							for(var w = 1; m >= w; ++w) o(l);
							v &= 15
						}
						r = 32767 + L[f], o(a[(v << 4) + k[r]]), o(I[r]), f++
					}
					return 63 != h && o(s), n
				}

				function g() {
					for(var e = String.fromCharCode, t = 0; 256 > t; t++) F[t] = e(t)
				}

				function v(e) {
					if(0 >= e && (e = 1), e > 100 && (e = 100), T != e) {
						var n = 0;
						n = 50 > e ? Math.floor(5e3 / e) : Math.floor(200 - 2 * e), t(n), T = e
					}
				}
				var w, y, x, b, T, S = (Math.round, Math.floor),
					C = new Array(64),
					E = new Array(64),
					M = new Array(64),
					P = new Array(64),
					I = new Array(65535),
					k = new Array(65535),
					D = new Array(64),
					L = new Array(64),
					z = [],
					A = 0,
					R = 7,
					O = new Array(64),
					B = new Array(64),
					N = new Array(64),
					F = new Array(256),
					G = new Array(2048),
					H = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63],
					X = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
					_ = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
					Y = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125],
					U = [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250],
					W = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
					V = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
					j = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119],
					q = [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250];
				this.encode = function(e, t, n) {
						(new Date).getTime();
						t && v(t), z = new Array, A = 0, R = 7, l(65496), c(), p(), u(e.width, e.height), h(), m();
						var i = 0,
							a = 0,
							r = 0;
						A = 0, R = 7, this.encode.displayName = "_encode_";
						for(var s, d, g, T, S, C, E, I, k, D = e.data, L = e.width, F = e.height, H = 4 * L, X = 0; F > X;) {
							for(s = 0; H > s;) {
								for(S = H * X + s, C = S, E = -1, I = 0, k = 0; 64 > k; k++) I = k >> 3, E = 4 * (7 & k), C = S + I * H + E, X + I >= F && (C -= H * (X + 1 + I - F)), s + E >= H && (C -= s + E - H + 4), d = D[C++], g = D[C++], T = D[C++], O[k] = (G[d] + G[g + 256 >> 0] + G[T + 512 >> 0] >> 16) - 128, B[k] = (G[d + 768 >> 0] + G[g + 1024 >> 0] + G[T + 1280 >> 0] >> 16) - 128, N[k] = (G[d + 1280 >> 0] + G[g + 1536 >> 0] + G[T + 1792 >> 0] >> 16) - 128;
								i = f(O, M, i, w, x), a = f(B, P, a, y, b), r = f(N, P, r, y, b), s += 32
							}
							X += 8
						}
						if(R >= 0) {
							var _ = [];
							_[1] = R + 1, _[0] = (1 << R + 1) - 1, o(_)
						}
						if(l(65497), n) {
							for(var Y = z.length, U = new Uint8Array(Y), W = 0; Y > W; W++) U[W] = z[W].charCodeAt();
							return z = [], (new Date).getTime(), U
						}
						var V = "data:image/jpeg;base64," + btoa(z.join(""));
						return z = [], (new Date).getTime(), V
					},
					function() {
						(new Date).getTime();
						e || (e = 50), g(), i(), a(), r(), v(e), (new Date).getTime()
					}()
			}
			e.exports = n
		}, function(e, t, n) {
			function i(e, t) {
				var n = this;
				if(!e) throw new Error("没有收到图片，可能的解决方案：https://github.com/think2011/localResizeIMG/issues/7");
				t = t || {}, n.defaults = {
					width: null,
					height: null,
					fieldName: "file",
					quality: .7
				}, n.file = e;
				for(var i in t) t.hasOwnProperty(i) && (n.defaults[i] = t[i]);
				return this.init()
			}

			function a(e) {
				var t;
				t = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : unescape(e.split(",")[1]);
				for(var n = e.split(",")[0].split(":")[1].split(";")[0], i = new Uint8Array(t.length), a = 0; a < t.length; a++) i[a] = t.charCodeAt(a);
				return new o.Blob([i.buffer], {
					type: n
				})
			}
			n.p = function(e) {
				var t = null;
				return t = e ? [].filter.call(document.scripts, function(t) {
					return -1 !== t.src.indexOf(e)
				})[0] : document.scripts[document.scripts.length - 1], t ? t.src.substr(0, t.src.lastIndexOf("/")) : null
			}("lrz") + "/", window.URL = window.URL || window.webkitURL;
			var r = n(1),
				o = n(4),
				s = n(5),
				l = function(e) {
					var t = /OS (\d)_.* like Mac OS X/g.exec(e),
						n = /Android (\d.*?);/g.exec(e) || /Android\/(\d.*?) /g.exec(e);
					return {
						oldIOS: !!t && +t.pop() < 8,
						oldAndroid: !!n && +n.pop().substr(0, 3) < 4.5,
						iOS: /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(e),
						android: /Android/g.test(e),
						mQQBrowser: /MQQBrowser/g.test(e)
					}
				}(navigator.userAgent);
			i.prototype.init = function() {
				var e = this,
					t = e.file,
					n = "string" == typeof t,
					i = /^data:/.test(t),
					s = new Image,
					l = document.createElement("canvas"),
					d = n ? t : URL.createObjectURL(t);
				if(e.img = s, e.blob = d, e.canvas = l, e.fileName = n ? i ? "base64.jpg" : t.split("/").pop() : t.name, !document.createElement("canvas").getContext) throw new Error("浏览器不支持canvas");
				return new r(function(n, r) {
					s.onerror = function() {
						throw new Error("加载图片文件失败")
					}, s.onload = function() {
						e._getBase64().then(function(e) {
							return e.length < 10 && r("生成base64失败"), e
						}).then(function(i) {
							var r = null;
							"object" == typeof e.file && i.length > e.file.size ? (r = new FormData, t = e.file) : (r = new o.FormData, t = a(i)), r.append(e.defaults.fieldName, t, e.fileName.replace(/\..+/g, ".jpg")), n({
								formData: r,
								fileLen: +t.size,
								base64: i,
								base64Len: i.length,
								origin: e.file
							});
							for(var s in e) e.hasOwnProperty(s) && (e[s] = null);
							URL.revokeObjectURL(e.blob)
						})
					}, !i && (s.crossOrigin = "*"), s.src = d
				})
			}, i.prototype._getBase64 = function() {
				var e = this,
					t = e.img,
					n = e.file,
					i = e.canvas;
				return new r(function(a) {
					try {
						s.getData("object" == typeof n ? n : t, function() {
							e.orientation = s.getTag(this, "Orientation"), e.resize = e._getResize(), e.ctx = i.getContext("2d"), i.width = e.resize.width, i.height = e.resize.height, e.ctx.fillStyle = "#fff", e.ctx.fillRect(0, 0, i.width, i.height), l.oldIOS ? e._createBase64ForOldIOS().then(a) : e._createBase64().then(a)
						})
					} catch(e) {
						throw new Error(e)
					}
				})
			}, i.prototype._createBase64ForOldIOS = function() {
				var e = this,
					t = e.img,
					i = e.canvas,
					a = e.defaults,
					o = e.orientation;
				return new r(function(e) {
					! function() {
						var r = [n(6)];
						(function(n) {
							var r = new n(t);
							"5678".indexOf(o) > -1 ? r.render(i, {
								width: i.height,
								height: i.width,
								orientation: o
							}) : r.render(i, {
								width: i.width,
								height: i.height,
								orientation: o
							}), e(i.toDataURL("image/jpeg", a.quality))
						}).apply(null, r)
					}()
				})
			}, i.prototype._createBase64 = function() {
				var e = this,
					t = e.resize,
					i = e.img,
					a = e.canvas,
					o = e.ctx,
					s = e.defaults;
				switch(e.orientation) {
					case 3:
						o.rotate(180 * Math.PI / 180), o.drawImage(i, -t.width, -t.height, t.width, t.height);
						break;
					case 6:
						o.rotate(90 * Math.PI / 180), o.drawImage(i, 0, -t.width, t.height, t.width);
						break;
					case 8:
						o.rotate(270 * Math.PI / 180), o.drawImage(i, -t.height, 0, t.height, t.width);
						break;
					case 2:
						o.translate(t.width, 0), o.scale(-1, 1), o.drawImage(i, 0, 0, t.width, t.height);
						break;
					case 4:
						o.translate(t.width, 0), o.scale(-1, 1), o.rotate(180 * Math.PI / 180), o.drawImage(i, -t.width, -t.height, t.width, t.height);
						break;
					case 5:
						o.translate(t.width, 0), o.scale(-1, 1), o.rotate(90 * Math.PI / 180), o.drawImage(i, 0, -t.width, t.height, t.width);
						break;
					case 7:
						o.translate(t.width, 0), o.scale(-1, 1), o.rotate(270 * Math.PI / 180), o.drawImage(i, -t.height, 0, t.height, t.width);
						break;
					default:
						o.drawImage(i, 0, 0, t.width, t.height)
				}
				return new r(function(e) {
					l.oldAndroid || l.mQQBrowser || !navigator.userAgent ? function() {
						var t = [n(7)];
						(function(t) {
							var n = new t,
								i = o.getImageData(0, 0, a.width, a.height);
							e(n.encode(i, 100 * s.quality))
						}).apply(null, t)
					}() : e(a.toDataURL("image/jpeg", s.quality))
				})
			}, i.prototype._getResize = function() {
				var e = this,
					t = e.img,
					n = e.defaults,
					i = n.width,
					a = n.height,
					r = e.orientation,
					o = {
						width: t.width,
						height: t.height
					};
				if("5678".indexOf(r) > -1 && (o.width = t.height, o.height = t.width), o.width < i || o.height < a) return o;
				var s = o.width / o.height;
				for(i && a ? s >= i / a ? o.width > i && (o.width = i, o.height = Math.ceil(i / s)) : o.height > a && (o.height = a, o.width = Math.ceil(a * s)) : i ? i < o.width && (o.width = i, o.height = Math.ceil(i / s)) : a && a < o.height && (o.width = Math.ceil(a * s), o.height = a); o.width >= 3264 || o.height >= 2448;) o.width *= .8, o.height *= .8;
				return o
			}, window.lrz = function(e, t) {
				return new i(e, t)
			}, window.lrz.version = "4.8.35", e.exports = window.lrz
		}])
	});