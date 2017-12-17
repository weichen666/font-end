top.learun = (function($) {
	var learun = {
		isDebug: true,
		log: function() {
			if(learun.isDebug) {
				console.log("=====>" + new Date().getTime() + "<=====");
				var len = arguments.length;
				for(var i = 0; i < len; i++) {
					console.log(arguments[i])
				}
			}
		},
		newGuid: function() {
			var guid = "";
			for(var i = 1; i <= 32; i++) {
				var n = Math.floor(Math.random() * 16).toString(16);
				guid += n;
				if((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
					guid += "-"
				}
			}
			return guid
		},
		loading: function(isShow, text) {
			var $loading = top.$("#lr_loading_bar");
			if(!!text) {
				top.$("#lr_loading_bar_message").html(text)
			} else {
				top.$("#lr_loading_bar_message").html("正在拼了命为您加载…")
			}
			if(isShow) {
				$loading.show()
			} else {
				$loading.hide()
			}
		},
		loadStyles: function(url) {
			var link = document.createElement("link");
			link.type = "text/css";
			link.rel = "stylesheet";
			link.href = url;
			document.getElementsByTagName("head")[0].appendChild(link)
		},
		iframe: function(Id, _frames) {
			if(_frames[Id] != undefined) {
				if(_frames[Id].contentWindow != undefined) {
					return _frames[Id].contentWindow
				} else {
					return _frames[Id]
				}
			} else {
				return null
			}
		},
		changeUrlParam: function(url, key, value) {
			var newUrl = "";
			var reg = new RegExp("(^|)" + key + "=([^&]*)(|$)");
			var tmp = key + "=" + value;
			if(url.match(reg) != null) {
				newUrl = url.replace(eval(reg), tmp)
			} else {
				if(url.match("[?]")) {
					newUrl = url + "&" + tmp
				} else {
					newUrl = url + "?" + tmp
				}
			}
			return newUrl
		},
		toDecimal: function(num) {
			if(num == null) {
				num = "0"
			}
			num = num.toString().replace(/\$|\,/g, "");
			if(isNaN(num)) {
				num = "0"
			}
			var sign = (num == (num = Math.abs(num)));
			num = Math.floor(num * 100 + 0.50000000001);
			var cents = num % 100;
			num = Math.floor(num / 100).toString();
			if(cents < 10) {
				cents = "0" + cents
			}
			for(var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
				num = num.substring(0, num.length - (4 * i + 3)) + "" + num.substring(num.length - (4 * i + 3))
			}
			return(((sign) ? "" : "-") + num + "." + cents)
		},
		countFileSize: function(size) {
			if(size < 1024) {
				return learun.toDecimal(size) + " 字节"
			} else {
				if(size >= 1024 && size < 1048576) {
					return learun.toDecimal(size / 1024) + " KB"
				} else {
					if(size >= 1048576 && size < 1073741824) {
						return learun.toDecimal(size / 1024 / 1024) + " MB"
					} else {
						if(size >= 1073741824) {
							return learun.toDecimal(size / 1024 / 1024 / 1024) + " GB"
						}
					}
				}
			}
		},
		arrayCopy: function(data) {
			return $.map(data, function(obj) {
				return $.extend(true, {}, obj)
			})
		},
		checkrow: function(id) {
			var isOK = true;
			if(id == undefined || id == "" || id == "null" || id == "undefined") {
				isOK = false;
				learun.alert.warning("您没有选中任何数据项,请选中后再操作！")
			}
			return isOK
		},
		alert: {
			success: function(msg) {
				toastr.success(msg)
			},
			info: function(msg) {
				toastr.info(msg)
			},
			warning: function(msg) {
				toastr.warning(msg)
			},
			error: function(msg) {
				toastr.error(msg)
			}
		},
		download: function(options) {
			var defaults = {
				method: "GET",
				url: "",
				param: []
			};
			var options = $.extend(defaults, options);
			if(options.url && options.param) {
				var $form = $('<form action="' + options.url + '" method="' + (options.method || "post") + '"></form>');
				for(var key in options.param) {
					var $input = $('<input type="hidden" />').attr("name", key).val(options.param[key]);
					$form.append($input)
				}
				$form.appendTo("body").submit().remove()
			}
		},
		commafy: function(num) {
			if(num == null) {
				num = "0"
			}
			if(isNaN(num)) {
				return "0"
			}
			num = num + "";
			if(/^.*\..*$/.test(num)) {
				varpointIndex = num.lastIndexOf(".");
				varintPart = num.substring(0, pointIndex);
				varpointPart = num.substring(pointIndex + 1, num.length);
				intPart = intPart + "";
				var re = /(-?\d+)(\d{3})/;
				while(re.test(intPart)) {
					intPart = intPart.replace(re, "$1,$2")
				}
				num = intPart + "." + pointPart
			} else {
				num = num + "";
				var re = /(-?\d+)(\d{3})/;
				while(re.test(num)) {
					num = num.replace(re, "$1,$2")
				}
			}
			return num
		},
		isExistImg: function(pathImg) {
			if(!!pathImg) {
				var ImgObj = new Image();
				ImgObj.src = pathImg;
				if(ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
					return true
				} else {
					return false
				}
			} else {
				return false
			}
		}
	};
	return learun
})(window.jQuery);
(function(a, c) {
	var b = {};
	c.frameTab = {
		iframeId: "",
		init: function() {
			c.frameTab.bind()
		},
		bind: function() {
			a(".lr-frame-tabs-wrap").mCustomScrollbar({
				axis: "x",
				theme: "minimal-dark"
			})
		},
		setCurrentIframeId: function(d) {
			c.iframeId = d
		},
		open: function(h, i) {
			var g = a("#lr_frame_tabs_ul");
			var d = a("#lr_frame_main");
			if(b[h.F_ModuleId] == undefined || b[h.F_ModuleId] == null) {
				if(c.frameTab.iframeId != "") {
					g.find("#lr_tab_" + c.frameTab.iframeId).removeClass("active");
					d.find("#lr_iframe_" + c.frameTab.iframeId).removeClass("active");
					b[c.frameTab.iframeId] = 0
				}
				var j = c.frameTab.iframeId;
				c.frameTab.iframeId = h.F_ModuleId;
				b[c.frameTab.iframeId] = 1;
				var f = a('<li class="lr-frame-tabItem active" id="lr_tab_' + h.F_ModuleId + '" parent-id="' + j + '"  ><span><i class="' + h.F_Icon + '"></i>&nbsp;' + h.F_FullName + "</span></li>");
				if(!i) {
					f.append('<span class="reomve" title="关闭窗口"></span>')
				}
				var e = a('<iframe class="lr-frame-iframe active" id="lr_iframe_' + h.F_ModuleId + '" frameborder="0" src="' + a.rootUrl + h.F_UrlAddress + '"></iframe>');
				g.append(f);
				d.append(e);
				a(".lr-frame-tabs-wrap").mCustomScrollbar("update");
				a(".lr-frame-tabs-wrap").mCustomScrollbar("scrollTo", f);
				f.on("click", function() {
					var k = a(this).attr("id").replace("lr_tab_", "");
					c.frameTab.focus(k)
				});
				f.find(".reomve").on("click", function() {
					var k = a(this).parent().attr("id").replace("lr_tab_", "");
					c.frameTab.close(k);
					return false
				});
				if(!!c.frameTab.opencallback) {
					c.frameTab.opencallback()
				}
				if(!i) {
					a.ajax({
						url: top.$.rootUrl + "/Home/VisitModule",
						data: {
							moduleName: h.F_FullName,
							moduleUrl: h.F_UrlAddress
						},
						type: "post",
						dataType: "text"
					})
				}
			} else {
				c.frameTab.focus(h.F_ModuleId)
			}
		},
		focus: function(d) {
			if(b[d] == 0) {
				a("#lr_tab_" + c.frameTab.iframeId).removeClass("active");
				a("#lr_iframe_" + c.frameTab.iframeId).removeClass("active");
				b[c.frameTab.iframeId] = 0;
				a("#lr_tab_" + d).addClass("active");
				a("#lr_iframe_" + d).addClass("active");
				c.frameTab.iframeId = d;
				b[d] = 1;
				a(".lr-frame-tabs-wrap").mCustomScrollbar("scrollTo", a("#lr_tab_" + d));
				if(!!c.frameTab.opencallback) {
					c.frameTab.opencallback()
				}
			}
		},
		leaveFocus: function() {
			a("#lr_tab_" + c.frameTab.iframeId).removeClass("active");
			a("#lr_iframe_" + c.frameTab.iframeId).removeClass("active");
			b[c.frameTab.iframeId] = 0;
			c.frameTab.iframeId = ""
		},
		close: function(f) {
			delete b[f];
			var e = a("#lr_tab_" + f);
			var d = e.prev();
			if(d.length < 1) {
				d = e.next()
			}
			e.remove();
			a("#lr_iframe_" + f).remove();
			if(f == c.frameTab.iframeId && d.length > 0) {
				var g = d.attr("id").replace("lr_tab_", "");
				d.addClass("active");
				a("#lr_iframe_" + g).addClass("active");
				c.frameTab.iframeId = g;
				b[g] = 1;
				a(".lr-frame-tabs").css("width", "10000px");
				a(".lr-frame-tabs-wrap").mCustomScrollbar("update");
				a(".lr-frame-tabs").css("width", "100%");
				a(".lr-frame-tabs-wrap").mCustomScrollbar("scrollTo", d)
			} else {
				if(d.length < 1) {
					c.frameTab.iframeId = ""
				}
				a(".lr-frame-tabs").css("width", "10000px");
				a(".lr-frame-tabs-wrap").mCustomScrollbar("update");
				a(".lr-frame-tabs").css("width", "100%")
			}
			if(!!c.frameTab.closecallback) {
				c.frameTab.closecallback()
			}
		},
		currentIframe: function() {
			var d = "lr_iframe_" + c.frameTab.iframeId;
			if(top.frames[d].contentWindow != undefined) {
				return top.frames[d].contentWindow
			} else {
				return top.frames[d]
			}
		},
		parentIframe: function() {
			var d = "lr_iframe_" + top.$("#lr_tab_" + c.frameTab.iframeId).attr("parent-id");
			if(top.frames[d].contentWindow != undefined) {
				return top.frames[d].contentWindow
			} else {
				return top.frames[d]
			}
		},
		opencallback: false,
		closecallback: false
	};
	c.frameTab.init()
})(window.jQuery, top.learun);
(function(a, b) {
	a.extend(b, {
		parseDate: function(d) {
			var c;
			if(d.indexOf("/Date(") > -1) {
				c = new Date(parseInt(d.replace("/Date(", "").replace(")/", ""), 10))
			} else {
				c = new Date(Date.parse(d.replace(/-/g, "/").replace("T", " ").split(".")[0]))
			}
			return c
		},
		formatDate: function(h, e) {
			if(!h) {
				return ""
			}
			var c = h;
			if(typeof h === "string") {
				if(h.indexOf("/Date(") > -1) {
					c = new Date(parseInt(h.replace("/Date(", "").replace(")/", ""), 10))
				} else {
					c = new Date(Date.parse(h.replace(/-/g, "/").replace("T", " ").split(".")[0]))
				}
			}
			var g = {
				"M+": c.getMonth() + 1,
				"d+": c.getDate(),
				"h+": c.getHours(),
				"m+": c.getMinutes(),
				"s+": c.getSeconds(),
				"q+": Math.floor((c.getMonth() + 3) / 3),
				S: c.getMilliseconds()
			};
			if(/(y+)/.test(e)) {
				e = e.replace(RegExp.$1, (c.getFullYear() + "").substr(4 - RegExp.$1.length))
			}
			for(var f in g) {
				if(new RegExp("(" + f + ")").test(e)) {
					e = e.replace(RegExp.$1, RegExp.$1.length == 1 ? g[f] : ("00" + g[f]).substr(("" + g[f]).length))
				}
			}
			return e
		},
		getDate: function(c, g, e) {
			var d = new Date();
			if(!!g) {
				d = d.DateAdd(g, e)
			}
			var f = b.formatDate(d, c);
			return f
		},
		getMonth: function() {
			var e = {
				begin: "",
				end: ""
			};
			var c = b.parseDate(b.formatDate(new Date(), "yyyy-MM-01"));
			var d = c.DateAdd("m", 1).DateAdd("d", -1);
			e.begin = b.formatDate(c, "yyyy-MM-dd 00:00:00");
			e.end = b.formatDate(d, "yyyy-MM-dd 23:59:59");
			return e
		},
		getPreMonth: function() {
			var e = {
				begin: "",
				end: ""
			};
			var c = b.parseDate(b.formatDate(new Date(), "yyyy-MM-01"));
			var d = c.DateAdd("d", -1);
			e.begin = b.formatDate(d, "yyyy-MM-01 00:00:00");
			e.end = b.formatDate(d, "yyyy-MM-dd 23:59:59");
			return e
		},
		getCurrentQuarter: function() {
			var c = new Date();
			return b.getQuarter(c.getFullYear(), c.getMonth())
		},
		getPreQuarter: function() {
			var c = new Date().DateAdd("q", -1);
			return b.getQuarter(c.getFullYear(), c.getMonth())
		},
		getQuarter: function(e, c) {
			var d = {
				begin: "",
				end: ""
			};
			switch(c) {
				case 0:
				case 1:
				case 2:
					d.begin = e + "-01-01 00:00:00";
					d.end = e + "-03-31 23:59:59";
					break;
				case 3:
				case 4:
				case 5:
					d.begin = e + "-04-01 00:00:00";
					d.end = e + "-06-30 23:59:59";
					break;
				case 6:
				case 7:
				case 8:
					d.begin = e + "-07-01 00:00:00";
					d.end = e + "-09-30 23:59:59";
					break;
				case 9:
				case 10:
				case 11:
					d.begin = e + "-10-01 00:00:00";
					d.end = e + "-12-31 23:59:59";
					break
			}
			return d
		},
		getYear: function() {
			var c = new Date();
			var d = {
				begin: "",
				end: ""
			};
			var e = c.getFullYear();
			d.begin = e + "-01-01 00:00:00";
			d.end = e + "-12-31 23:59:59";
			return d
		},
		getPreYear: function() {
			var c = new Date();
			var d = {
				begin: "",
				end: ""
			};
			var e = c.getFullYear() - 1;
			d.begin = e + "-01-01 00:00:00";
			d.end = e + "-12-31 23:59:59";
			return d
		},
		getFirstHalfYear: function() {
			var c = new Date();
			var d = {
				begin: "",
				end: ""
			};
			var e = c.getFullYear();
			d.begin = e + "-01-01 00:00:00";
			d.end = e + "-06-30 23:59:59";
			return d
		},
		getSecondHalfYear: function() {
			var c = new Date();
			var d = {
				begin: "",
				end: ""
			};
			var e = c.getFullYear();
			d.begin = e + "-07-01 00:00:00";
			d.end = e + "-12-31 23:59:59";
			return d
		}
	});
	Date.prototype.DateAdd = function(e, d) {
		var c = this;
		switch(e) {
			case "s":
				return new Date(Date.parse(c) + (1000 * d));
			case "n":
				return new Date(Date.parse(c) + (60000 * d));
			case "h":
				return new Date(Date.parse(c) + (3600000 * d));
			case "d":
				return new Date(Date.parse(c) + (86400000 * d));
			case "w":
				return new Date(Date.parse(c) + ((86400000 * 7) * d));
			case "q":
				return new Date(c.getFullYear(), (c.getMonth()) + d * 3, c.getDate(), c.getHours(), c.getMinutes(), c.getSeconds());
			case "m":
				return new Date(c.getFullYear(), (c.getMonth()) + d, c.getDate(), c.getHours(), c.getMinutes(), c.getSeconds());
			case "y":
				return new Date((c.getFullYear() + d), c.getMonth(), c.getDate(), c.getHours(), c.getMinutes(), c.getSeconds())
		}
	};
	Date.prototype.DateDiff = function(e, c) {
		var d = this;
		if(typeof c == "string") {
			c = b.parseDate(c)
		}
		switch(e) {
			case "s":
				return parseInt((c - d) / 1000);
			case "n":
				return parseInt((c - d) / 60000);
			case "h":
				return parseInt((c - d) / 3600000);
			case "d":
				return parseInt((c - d) / 86400000);
			case "w":
				return parseInt((c - d) / (86400000 * 7));
			case "m":
				return(c.getMonth() + 1) + ((c.getFullYear() - d.getFullYear()) * 12) - (d.getMonth() + 1);
			case "y":
				return c.getFullYear() - d.getFullYear()
		}
	};
	Date.prototype.MaxDayOfDate = function() {
		var f = this;
		var c = f.toArray();
		var d = (new Date(c[0], c[1] + 1, 1));
		var e = d.DateAdd("m", 1);
		var g = dateDiff(d.Format("yyyy-MM-dd"), e.Format("yyyy-MM-dd"));
		return g
	};
	Date.prototype.isLeapYear = function() {
		return(0 == this.getYear() % 4 && ((this.getYear() % 100 != 0) || (this.getYear() % 400 == 0)))
	}
})(jQuery, top.learun);
(function(a, b) {
	b.validator = {
		validReg: function(d, e, c) {
			var f = {
				code: true,
				msg: ""
			};
			if(!e.test(d)) {
				f.code = false;
				f.msg = c
			}
			return f
		},
		validRegOrNull: function(d, e, c) {
			var f = {
				code: true,
				msg: ""
			};
			if(d == null || d == undefined || d.length == 0) {
				return f
			}
			if(!e.test(d)) {
				f.code = false;
				f.msg = c
			}
			return f
		},
		isNotNull: function(c) {
			var d = {
				code: true,
				msg: ""
			};
			c = a.trim(c);
			if(c == null || c == undefined || c.length == 0) {
				d.code = false;
				d.msg = "不能为空"
			}
			return d
		},
		isNum: function(c) {
			return b.validator.validReg(c, /^[-+]?\d+$/, "必须为数字")
		},
		isNumOrNull: function(c) {
			return b.validator.validRegOrNull(c, /^[-+]?\d+$/, "数字或空")
		},
		isEmail: function(c) {
			return b.validator.validReg(c, /^\w{3,}@\w+(\.\w+)+$/, "必须为E-mail格式")
		},
		isEmailOrNull: function(c) {
			return b.validator.validRegOrNull(c, /^\w{3,}@\w+(\.\w+)+$/, "必须为E-mail格式或空")
		},
		isEnglishStr: function(c) {
			return b.validator.validReg(c, /^[a-z,A-Z]+$/, "必须为英文字符串")
		},
		isEnglishStrOrNull: function(c) {
			return b.validator.validRegOrNull(c, /^[a-z,A-Z]+$/, "必须为英文字符串或空")
		},
		isTelephone: function(c) {
			return b.validator.validReg(c, /^(\d{3,4}\-)?[1-9]\d{6,7}$/, "必须为电话格式")
		},
		isTelephoneOrNull: function(c) {
			return b.validator.validRegOrNull(c, /^(\d{3,4}\-)?[1-9]\d{6,7}$/, "必须为电话格式或空")
		},
		isMobile: function(c) {
			return b.validator.validReg(c, /^(\+\d{2,3}\-)?\d{11}$/, "必须为手机格式")
		},
		isMobileOrnull: function(c) {
			return b.validator.validRegOrNull(c, /^(\+\d{2,3}\-)?\d{11}$/, "必须为手机格式或空")
		},
		isMobileOrPhone: function(c) {
			var d = {
				code: true,
				msg: ""
			};
			if(!b.validator.isTelephone(c).code && !b.validator.isMobile(c).code) {
				d.code = false;
				d.msg = "为电话格式或手机格式"
			}
			return d
		},
		isMobileOrPhoneOrNull: function(c) {
			var d = {
				code: true,
				msg: ""
			};
			if(b.validator.isNotNull(c).code && !b.validator.isTelephone(c).code && !b.validator.isMobile(c).code) {
				d.code = false;
				d.msg = "为电话格式或手机格式或空"
			}
			return d
		},
		isUri: function(c) {
			return b.validator.validReg(c, /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/, "必须为网址格式")
		},
		isUriOrNull: function(c) {
			return b.validator.validRegOrNull(c, /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/, "必须为网址格式或空")
		},
		isDate: function(c) {
			return b.validator.validReg(c, /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/, "必须为日期格式")
		},
		isDateOrNull: function(c) {
			return b.validator.validRegOrNull(c, /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/, "必须为日期格式或空")
		},
		isDateTime: function(c) {
			return b.validator.validReg(c, /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/, "必须为日期时间格式")
		},
		isDateTimeOrNull: function(c) {
			return b.validator.validRegOrNull(c, /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/, "必须为日期时间格式")
		},
		isTime: function(c) {
			return b.validator.validReg(c, /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/, "必须为时间格式")
		},
		isTimeOrNull: function(c) {
			return b.validator.validRegOrNull(c, /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/, "必须为时间格式或空")
		},
		isChinese: function(c) {
			return b.validator.validReg(c, /^[\u0391-\uFFE5]+$/, "必须为中文")
		},
		isChineseOrNull: function(c) {
			return b.validator.validRegOrNull(c, /^[\u0391-\uFFE5]+$/, "必须为中文或空")
		},
		isZip: function(c) {
			return b.validator.validReg(c, /^\d{6}$/, "必须为邮编格式")
		},
		isZipOrNull: function(c) {
			return b.validator.validRegOrNull(c, /^\d{6}$/, "必须为邮编格式或空")
		},
		isDouble: function(c) {
			return b.validator.validReg(c, /^[-\+]?\d+(\.\d+)?$/, "必须为小数")
		},
		isDoubleOrNull: function(c) {
			return b.validator.validRegOrNull(c, /^[-\+]?\d+(\.\d+)?$/, "必须为小数或空")
		},
		isIDCard: function(c) {
			return b.validator.validReg(c, /^\d{15}(\d{2}[A-Za-z0-9;])?$/, "必须为身份证格式")
		},
		isIDCardOrNull: function(c) {
			return b.validator.validRegOrNull(c, /^\d{15}(\d{2}[A-Za-z0-9;])?$/, "必须为身份证格式或空")
		},
		isIP: function(d) {
			var f = {
				code: true,
				msg: ""
			};
			var e = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g;
			var c = false;
			if(e.test(d)) {
				if(RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
					c = true
				}
			}
			if(!c) {
				f.code = false;
				f.msg = "必须为IP格式"
			}
			return f
		},
		isIPOrNull: function(c) {
			var d = {
				code: true,
				msg: ""
			};
			if(b.validator.isNotNull(c) && !b.validator.isIP(c).code) {
				d.code = false;
				d.msg = "必须为IP格式或空"
			}
			return d
		},
		isLenNum: function(d, c) {
			var f = {
				code: true,
				msg: ""
			};
			var e = /^[0-9]+$/;
			d = a.trim(d);
			if(d.length > c || !e.test(d)) {
				f.code = false;
				f.msg = "必须为" + c + "位数字"
			}
			return f
		},
		isLenNumOrNull: function(d, c) {
			var e = {
				code: true,
				msg: ""
			};
			if(b.validator.isNotNull(d).code && !b.validator.isLenNum(d)) {
				e.code = false;
				e.msg = "必须为" + c + "位数字或空"
			}
			return e
		},
		isLenStr: function(d, c) {
			var e = {
				code: true,
				msg: ""
			};
			d = a.trim(d);
			if(!b.validator.isNotNull(d).code || d.length > c) {
				e.code = false;
				e.msg = "必须小于等于" + c + "位字符"
			}
			return e
		},
		isLenStrOrNull: function(d, c) {
			var e = {
				code: true,
				msg: ""
			};
			d = a.trim(d);
			if(b.validator.isNotNull(d).code && d.length > c) {
				e.code = false;
				e.msg = "必须小于等于" + c + "位字符或空"
			}
			return e
		}
	}
})(window.jQuery, top.learun);
(function(a, b) {
	a.extend(b, {
		layerConfirm: function(d, c) {
			top.layer.confirm(d, {
				btn: ["确认", "取消"],
				title: "力软提示",
				icon: 0,
				skin: "lr-layer",
			}, function(e) {
				c(true, e)
			}, function(e) {
				c(false, e);
				top.layer.close(e)
			})
		},
		layerForm: function(d) {
			var c = {
				id: null,
				title: "系统窗口",
				width: 550,
				height: 400,
				url: "error",
				btn: ["确认", "关闭"],
				callBack: false,
				maxmin: false,
				end: false,
			};
			a.extend(c, d || {});
			c.width = c.width > a(window).width() ? a(window).width() - 10 : c.width;
			c.height = c.height > a(window).height() ? a(window).height() - 10 : c.height;
			var e = top.layer.open({
				id: c.id,
				maxmin: c.maxmin,
				type: 2,
				title: c.title,
				area: [c.width + "px", c.height + "px"],
				btn: c.btn,
				content: d.url,
				skin: c.btn == null ? "lr-layer-nobtn" : "lr-layer",
				success: function(g, f) {
					top["layer_" + c.id] = b.iframe(a(g).find("iframe").attr("id"), top.frames);
					g[0].learun_layerid = "layer_" + c.id;
					if(!!c.btn && g.find(".lr-layer-btn-cb").length == 0) {
						g.find(".layui-layer-btn").append('<div class="checkbox lr-layer-btn-cb" myIframeId="layer_' + c.id + '" ><label><input checked="checked" type="checkbox" >确认并关闭窗口</label></div>')
					}
				},
				yes: function(g) {
					var f = true;
					if(!!c.callBack) {
						f = c.callBack("layer_" + c.id)
					}
					if(!!f) {
						b.layerClose("", g)
					}
				},
				end: function() {
					top["layer_" + c.id] = null;
					if(!!c.end) {
						c.end()
					}
				}
			})
		},
		layerClose: function(h, e) {
			var d;
			if(!!e) {
				d = e
			} else {
				d = top.layer.getFrameIndex(h)
			}
			var g = top.$("#layui-layer" + d);
			var c = g.find(".layui-layer-btn").find(".lr-layer-btn-cb input");
			var f = c.is(":checked");
			if(c.length == 0) {
				f = true
			}
			if(f) {
				top.layer.close(d)
			} else {
				top[g[0].learun_layerid].location.reload()
			}
		}
	})
})(window.jQuery, top.learun);
(function(a, d) {
	var c = {
		success: 200,
		fail: 400,
		exception: 500
	};
	var b = {
		code: c.exception,
		info: "通信异常，请联系管理员！"
	};
	a.extend(d, {
		httpErrorLog: function(e) {
			d.log(e)
		},
		httpCode: c,
		httpAsyncGet: function(f, e) {
			a.ajax({
				url: f,
				type: "GET",
				dataType: "json",
				async: true,
				cache: false,
				success: function(g) {
					if(g.code == d.httpCode.exception) {
						d.httpErrorLog(g.info);
						g.info = "系统异常，请联系管理员！"
					}
					e(g)
				},
				error: function(i, h, g) {
					d.httpErrorLog(h);
					e(b)
				},
				beforeSend: function() {},
				complete: function() {}
			})
		},
		httpGet: function(g, e) {
			var f = {};
			a.ajax({
				url: g,
				data: e,
				type: "GET",
				dataType: "json",
				async: false,
				cache: false,
				success: function(h) {
					if(h.code == d.httpCode.exception) {
						d.httpErrorLog(h.info);
						h.info = "系统异常，请联系管理员！"
					}
					f = h
				},
				error: function(j, i, h) {
					d.httpErrorLog(i)
				},
				beforeSend: function() {},
				complete: function() {}
			});
			return f
		},
		httpAsyncPost: function(g, f, e) {
			a.ajax({
				url: g,
				data: f,
				type: "POST",
				dataType: "json",
				async: true,
				cache: false,
				success: function(h) {
					if(h.code == d.httpCode.exception) {
						d.httpErrorLog(h.info);
						h.info = "系统异常，请联系管理员！"
					}
					e(h)
				},
				error: function(j, i, h) {
					d.httpErrorLog(i);
					e(b)
				},
				beforeSend: function() {},
				complete: function() {}
			})
		},
		httpPost: function(g, f, e) {
			a.ajax({
				url: g,
				data: f,
				type: "POST",
				dataType: "json",
				async: false,
				cache: false,
				success: function(h) {
					if(h.code == d.httpCode.exception) {
						d.httpErrorLog(h.info);
						h.info = "系统异常，请联系管理员！"
					}
					e(h)
				},
				error: function(j, i, h) {
					d.httpErrorLog(i);
					e(b)
				},
				beforeSend: function() {},
				complete: function() {}
			})
		},
		httpAsync: function(g, h, f, e) {
			a.ajax({
				url: h,
				data: f,
				type: g,
				dataType: "json",
				async: true,
				cache: false,
				success: function(i) {
					if(i.code == d.httpCode.success) {
						e(i.data)
					} else {
						d.httpErrorLog(i.info);
						e(null)
					}
				},
				error: function(k, j, i) {
					d.httpErrorLog(j);
					e(null)
				},
				beforeSend: function() {},
				complete: function() {}
			})
		},
		deleteForm: function(g, f, e) {
			d.loading(true, "正在删除数据");
			d.httpAsyncPost(g, f, function(h) {
				d.loading(false);
				if(h.code == d.httpCode.success) {
					if(!!e) {
						e(h)
					}
					d.alert.success(h.info)
				} else {
					d.alert.error(h.info);
					d.httpErrorLog(h.info)
				}
				layer.close(layer.index)
			})
		},
		postForm: function(g, f, e) {
			d.loading(true, "正在提交数据");
			d.httpAsyncPost(g, f, function(h) {
				d.loading(false);
				if(h.code == d.httpCode.success) {
					if(!!e) {
						e(h)
					}
					d.alert.success(h.info)
				} else {
					d.alert.error(h.info);
					d.httpErrorLog(h.info)
				}
				layer.close(layer.index)
			})
		}
	})
})(window.jQuery, top.learun);
(function(a, i) {
	var b = null;
	var e = {};
	var c = {};
	var d = {};
	var j = {
		no: -1,
		yes: 1,
		ing: 0,
		fail: 2
	};

	function f() {
		a.each(d.excelImportTemplate, function(k, l) {
			d.excelImportTemplate[k] = {
				keys: l
			}
		})
	}

	function g(m, k) {
		var o = "";
		var n = k.length;
		if(n == undefined) {
			o = k[m]
		} else {
			for(var l = 0; l < n; l++) {
				if(m(k[l])) {
					o = k[l];
					break
				}
			}
		}
		return o
	}

	function h() {
		var m = j.yes;
		for(var l in e) {
			var k = e[l];
			if(k.state == j.fail) {
				m = j.fail;
				break
			} else {
				if(k.state == j.no) {
					m = j.ing;
					k.init()
				} else {
					if(k.state == j.ing) {
						m = j.ing
					}
				}
			}
		}
		return m
	}
	i.clientdata = {
		init: function(k) {
			if(b == null) {
				b = k
			}
			var l = h();
			if(l == j.yes) {
				b(true)
			} else {
				if(l == j.ing) {
					setTimeout(i.clientdata.init, 100)
				} else {
					b(false)
				}
			}
		},
		get: function(n) {
			var o = "";
			if(!n) {
				return o
			}
			var m = n.length;
			var k = d;
			for(var l = 0; l < m; l++) {
				o = g(n[l], k);
				if(o != "" && o != undefined) {
					k = o
				} else {
					break
				}
			}
			o = o || "";
			return o
		},
		getAsync: function(k, l) {
			return c[k].get(l)
		}
	};
	e.modules = {
		state: j.no,
		init: function() {
			e.modules.state = j.ing;
			
			d.modules = [{"F_ModuleId":"698f872c-407b-471b-a28b-eee69a4e64ba","F_ParentId":"0","F_EnCode":"AgileDevelopment","F_FullName":"敏捷开发","F_Icon":"fa fa-send-o","F_UrlAddress":"","F_Target":"expand","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":0,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2017-04-12 14:42:47","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-04-24 09:50:27","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"1","F_ParentId":"0","F_EnCode":"SysManage","F_FullName":"系统管理","F_Icon":"fa fa-desktop","F_UrlAddress":"","F_Target":"expand","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":1,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":null,"F_CreateUserId":null,"F_CreateUserName":null,"F_ModifyDate":"2017-04-12 14:31:46","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"2","F_ParentId":"0","F_EnCode":"BaseManage","F_FullName":"单位组织","F_Icon":"fa fa-coffee","F_UrlAddress":"","F_Target":"expand","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":2,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":null,"F_CreateUserId":null,"F_CreateUserName":null,"F_ModifyDate":"2017-08-30 14:29:38","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"dc5701b6-989b-48ff-a333-b04d10ebba00","F_ParentId":"0","F_EnCode":"FormManager","F_FullName":"表单中心","F_Icon":"fa fa-table","F_UrlAddress":"","F_Target":"expand","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":3,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"快速开发功能","F_CreateDate":"2016-11-16 10:13:48","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-04-12 15:14:07","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"5","F_ParentId":"0","F_EnCode":"FlowManage","F_FullName":"流程中心","F_Icon":"fa fa-share-alt","F_UrlAddress":"","F_Target":"expand","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":4,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":null,"F_CreateUserId":null,"F_CreateUserName":null,"F_ModifyDate":"2017-04-12 14:35:51","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"6","F_ParentId":"0","F_EnCode":"ReportManage","F_FullName":"报表中心","F_Icon":"fa fa-area-chart","F_UrlAddress":"","F_Target":"expand","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":5,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":null,"F_CreateUserId":null,"F_CreateUserName":null,"F_ModifyDate":"2017-04-12 14:34:08","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"4","F_ParentId":"0","F_EnCode":"CommonInfo","F_FullName":"公共信息","F_Icon":"fa fa-globe","F_UrlAddress":"","F_Target":"expand","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":6,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":null,"F_CreateUserId":null,"F_CreateUserName":null,"F_ModifyDate":"2017-04-12 14:21:54","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"d0971af6-66a3-4875-a200-321e9afb9e0e","F_ParentId":"0","F_EnCode":"AppManager","F_FullName":"移动管理","F_Icon":"fa fa-android","F_UrlAddress":"","F_Target":"expand","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":9,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2017-09-05 11:25:04","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":null,"F_ModifyUserId":null,"F_ModifyUserName":null},{"F_ModuleId":"7ae94059-9aa5-48eb-8330-4e2a6565b193","F_ParentId":"1","F_EnCode":"AreaManage","F_FullName":"行政区域","F_Icon":"fa fa-leaf","F_UrlAddress":"/LR_SystemModule/Area/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":1,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"行政区域管理","F_CreateDate":"2015-11-12 14:38:20","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-31 14:49:19","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"4efd37bf-e3ef-4ced-8248-58eba046d78b","F_ParentId":"1","F_EnCode":"DataItemManage","F_FullName":"数据字典","F_Icon":"fa fa-book","F_UrlAddress":"/LR_SystemModule/DataItem/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":2,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"通用数据字典","F_CreateDate":"2015-11-12 14:37:04","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-06-13 17:06:08","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"7adc5a16-54a4-408e-a101-2ddab8117d67","F_ParentId":"1","F_EnCode":"CodeRule","F_FullName":"单据编码","F_Icon":"fa fa-barcode","F_UrlAddress":"/LR_SystemModule/CodeRule/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":3,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"自动产生号码","F_CreateDate":"2015-11-12 14:47:51","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-06-13 17:21:35","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"91736eda-da51-4ff0-8c6d-fae446440d7d","F_ParentId":"1","F_EnCode":"DataItemClassify","F_FullName":"字典分类","F_Icon":"","F_UrlAddress":"/LR_SystemModule/DataItem/ClassifyIndex","F_Target":"iframe","F_IsMenu":0,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":3,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2017-06-13 17:15:12","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-31 15:00:24","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"21","F_ParentId":"1","F_EnCode":"SystemModule","F_FullName":"系统功能","F_Icon":"fa fa-navicon","F_UrlAddress":"/LR_SystemModule/Module/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":4,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"系统导航功能","F_CreateDate":null,"F_CreateUserId":null,"F_CreateUserName":null,"F_ModifyDate":"2017-07-07 10:03:40","F_ModifyUserId":"24a055d6-5924-44c5-be52-3715cdd68011","F_ModifyUserName":"陈彬彬"},{"F_ModuleId":"71fdd51a-72d6-48a7-ac81-76817a54cbac","F_ParentId":"1","F_EnCode":"excelManage","F_FullName":"Excel配置","F_Icon":"fa fa-file-excel-o","F_UrlAddress":"","F_Target":"expand","F_IsMenu":1,"F_AllowExpand":1,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":98,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"配置excel的导入导出","F_CreateDate":"2016-12-04 13:56:07","F_CreateUserId":"632cab6e-a691-495a-acf4-ebe37ba901af","F_CreateUserName":"陈小二","F_ModifyDate":"2017-09-04 10:57:52","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"7cec0a0f-7204-4240-b009-312fa0c11cbf","F_ParentId":"1","F_EnCode":"DatabaseManage","F_FullName":"数据管理","F_Icon":"fa fa-database","F_UrlAddress":"","F_Target":"expand","F_IsMenu":1,"F_AllowExpand":1,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":99,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2015-11-12 15:03:09","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-04-24 09:43:51","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"f21fa3a0-c523-4d02-99ca-fd8dd3ae3d59","F_ParentId":"1","F_EnCode":"SystemLog","F_FullName":"系统日志","F_Icon":"fa fa-warning","F_UrlAddress":"/LR_SystemModule/Log/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":100,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"登录日志、操作日志。异常日志","F_CreateDate":"2015-11-12 15:04:58","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-09-04 10:59:18","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"00b8c220-8fb5-47e8-b2eb-fbcaf56d9e5a","F_ParentId":"1","F_EnCode":"DataAuthorizeManage","F_FullName":"数据权限管理","F_Icon":"fa fa-briefcase","F_UrlAddress":"/LR_AuthorizeModule/DataAuthorize/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":100,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"数据权限管理","F_CreateDate":"2017-06-21 16:30:44","F_CreateUserId":"65b8ade1-c8df-4485-a018-5e9764331e74","F_CreateUserName":"力软框架开发组","F_ModifyDate":"2017-07-04 10:06:14","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"90c1d32d-be34-4e23-919f-2b25e33fafa2","F_ParentId":"1","F_EnCode":"Interface","F_FullName":"接口管理","F_Icon":"fa fa-address-book","F_UrlAddress":"/LR_SystemModule/Interface/Index","F_Target":"iframe","F_IsMenu":0,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":100,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"对接口进行维护，用于数据接口管理","F_CreateDate":"2017-07-03 17:53:22","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-04 10:44:28","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"8","F_ParentId":"2","F_EnCode":"CompanyManage","F_FullName":"公司管理","F_Icon":"fa fa-sitemap","F_UrlAddress":"/LR_OrganizationModule/Company/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":1,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":1,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":null,"F_CreateUserId":null,"F_CreateUserName":null,"F_ModifyDate":"2017-06-13 22:05:44","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"9","F_ParentId":"2","F_EnCode":"DepartmentManage","F_FullName":"部门管理","F_Icon":"fa fa-th-list","F_UrlAddress":"/LR_OrganizationModule/Department/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":1,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":2,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":null,"F_CreateUserId":null,"F_CreateUserName":null,"F_ModifyDate":"2017-06-13 22:10:02","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"0c941dbb-1e11-4f2a-b706-052d7324ee52","F_ParentId":"2","F_EnCode":"PostManage","F_FullName":"岗位管理","F_Icon":"fa fa-graduation-cap","F_UrlAddress":"/LR_OrganizationModule/Post/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":3,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"管理员工上下级关系","F_CreateDate":"2017-05-03 11:45:16","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-06-13 22:23:49","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"11","F_ParentId":"2","F_EnCode":"RoleManage","F_FullName":"角色管理","F_Icon":"fa fa-paw","F_UrlAddress":"/LR_OrganizationModule/Role/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":1,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":4,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":null,"F_CreateDate":null,"F_CreateUserId":null,"F_CreateUserName":null,"F_ModifyDate":"2017-09-11 11:16:35","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"10","F_ParentId":"2","F_EnCode":"UserManage","F_FullName":"用户管理","F_Icon":"fa fa-user","F_UrlAddress":"/LR_OrganizationModule/User/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":1,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":5,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":null,"F_CreateUserId":null,"F_CreateUserName":null,"F_ModifyDate":"2017-07-04 15:50:37","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"e35d24ce-8a6a-46b9-8b3f-6dc864a8f342","F_ParentId":"4","F_EnCode":"NewManage","F_FullName":"新闻中心","F_Icon":"fa fa-feed","F_UrlAddress":"/LR_OAModule/News/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":1,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":1,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2015-11-27 09:47:16","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-11 09:56:07","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"6252983c-52f5-402c-991b-ad19a9cb1f94","F_ParentId":"4","F_EnCode":"NoticeManage","F_FullName":"通知公告","F_Icon":"fa fa-volume-up","F_UrlAddress":"/LR_OAModule/Notice/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":1,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":2,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2015-11-27 09:47:33","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-11 14:14:28","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"04b88c96-8d99-45ec-956c-444efa630020","F_ParentId":"4","F_EnCode":"ResourceFileManage","F_FullName":"文件资料","F_Icon":"fa fa-jsfiddle","F_UrlAddress":null,"F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":3,"F_DeleteMark":0,"F_EnabledMark":0,"F_Description":"文件管理","F_CreateDate":"2015-11-27 09:47:48","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-11-02 14:23:42","F_ModifyUserId":"24a055d6-5924-44c5-be52-3715cdd68011","F_ModifyUserName":"陈彬彬"},{"F_ModuleId":"23713d3a-810f-422d-acd5-39bec28ce47e","F_ParentId":"4","F_EnCode":"ScheduleManage","F_FullName":"日程管理","F_Icon":"fa fa-calendar","F_UrlAddress":"/LR_OAModule/Schedule/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":6,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"日程管理","F_CreateDate":"2016-04-21 14:15:30","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-11 15:08:58","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"c6b80ed5-b0cb-4844-ba1a-725d2cb4f935","F_ParentId":"4","F_EnCode":"EmailManage","F_FullName":"邮件中心","F_Icon":"fa fa-send","F_UrlAddress":null,"F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":6,"F_DeleteMark":0,"F_EnabledMark":0,"F_Description":"邮件管理","F_CreateDate":"2015-11-27 09:48:38","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-11-02 14:23:49","F_ModifyUserId":"24a055d6-5924-44c5-be52-3715cdd68011","F_ModifyUserName":"陈彬彬"},{"F_ModuleId":"91dfe7f6-36ae-4fd8-a91f-c0a0b1a198d6","F_ParentId":"4","F_EnCode":"Signet","F_FullName":"电子签章","F_Icon":"fa fa-registered","F_UrlAddress":"/LR_OAModule/Signet/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":1,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":6,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"公文签章","F_CreateDate":"2016-10-20 10:50:42","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-11 14:15:04","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"f63a252b-975f-4832-a5be-1ce733bc8ece","F_ParentId":"5","F_EnCode":"SchemeManage","F_FullName":"模板管理","F_Icon":"fa fa-share-alt","F_UrlAddress":"/LR_WorkFlowModule/WfScheme/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":0,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2015-11-23 14:42:43","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-08-03 16:38:10","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"021a59b0-2589-4f9e-8140-6052177a967c","F_ParentId":"5","F_EnCode":"WfMyTask","F_FullName":"我的任务","F_Icon":"fa fa-file-word-o","F_UrlAddress":"/LR_WorkFlowModule/WfMyTask/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":2,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2016-03-19 13:32:54","F_CreateUserId":"24a055d6-5924-44c5-be52-3715cdd68011","F_CreateUserName":"陈彬彬","F_ModifyDate":"2017-08-07 09:34:45","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"6a67a67f-ef07-41e7-baa5-00bc5f662a76","F_ParentId":"5","F_EnCode":"WrokEntrust","F_FullName":"工作委托","F_Icon":"fa fa-coffee","F_UrlAddress":"/LR_WorkFlowModule/WfDelegateRule/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":3,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2015-11-23 22:14:20","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-08-08 16:50:58","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"27b6c487-a2d9-4a3a-a40d-dbba27a53d26","F_ParentId":"5","F_EnCode":"WfMonitor","F_FullName":"流程监控","F_Icon":"fa fa-eye","F_UrlAddress":"/LR_WorkFlowModule/WfMonitor/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":3,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2015-11-23 21:58:17","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-08-14 05:51:54","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"f0dc171b-939c-4f94-b57a-b8db1da084b2","F_ParentId":"5","F_EnCode":"SystemWorkflowDemo","F_FullName":"系统流程案例","F_Icon":"fa fa-industry","F_UrlAddress":"","F_Target":"expand","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":5,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2017-08-03 09:50:08","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":null,"F_ModifyUserId":null,"F_ModifyUserName":null},{"F_ModuleId":"92a535c9-4d4b-4500-968d-a142e671c09b","F_ParentId":"6","F_EnCode":"ReportCustmer","F_FullName":"报表管理","F_Icon":"fa fa-cogs","F_UrlAddress":"/LR_ReportModule/ReportManage/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":1,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"可自定义报表","F_CreateDate":"2016-01-13 17:21:17","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-12 11:18:46","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"fcd05f77-20f3-4e0c-8f8b-afb2daf25e28","F_ParentId":"6","F_EnCode":"ReportCustmer","F_FullName":"报表实例","F_Icon":"fa fa-file-powerpoint-o","F_UrlAddress":"","F_Target":"expand","F_IsMenu":1,"F_AllowExpand":1,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":2,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"自定义报表的一些实例","F_CreateDate":"2017-06-09 09:41:08","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-12 11:19:47","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"c2da2f51-f9b2-4a0b-a8fe-1ab65caee7cb","F_ParentId":"6","F_EnCode":"ReportTemp","F_FullName":"报表模板","F_Icon":"fa fa-wpforms","F_UrlAddress":"","F_Target":"expand","F_IsMenu":1,"F_AllowExpand":1,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":3,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2017-06-08 17:42:44","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-06-09 09:41:14","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"1f98c46c-72f1-4abb-b750-af1620d33c79","F_ParentId":"698f872c-407b-471b-a28b-eee69a4e64ba","F_EnCode":"CodeGenerator","F_FullName":"代码生成器","F_Icon":"fa fa-desktop","F_UrlAddress":"/LR_CodeGeneratorModule/TemplatePC/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":1,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":1,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"代码模板生成器","F_CreateDate":"2017-06-08 16:55:37","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-08-13 21:17:56","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"dcad6b11-1c43-4170-a45d-59b48a27bd4e","F_ParentId":"698f872c-407b-471b-a28b-eee69a4e64ba","F_EnCode":"Icon","F_FullName":"图标查看","F_Icon":"fa fa-search","F_UrlAddress":"/LR_CodeGeneratorModule/Icon/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":1,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":97,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"对字体图标的查看","F_CreateDate":"2017-05-03 11:00:50","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-05-04 10:44:37","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"9f70b427-9c46-4d70-8f5c-4e7e7c48571c","F_ParentId":"698f872c-407b-471b-a28b-eee69a4e64ba","F_EnCode":"JsDemo","F_FullName":"插件演示","F_Icon":"fa fa-send-o","F_UrlAddress":"/LR_CodeGeneratorModule/PluginDemo/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":1,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":98,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"演示JS插件页面","F_CreateDate":"2016-11-02 10:29:53","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-05-03 10:58:43","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"958bbcee-fb1d-4e71-b9fc-fefb65f1ac8a","F_ParentId":"698f872c-407b-471b-a28b-eee69a4e64ba","F_EnCode":"DemoManage","F_FullName":"开发示例","F_Icon":"fa fa-window-restore","F_UrlAddress":"","F_Target":"expand","F_IsMenu":1,"F_AllowExpand":1,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":99,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"一些页面模板和示例功能展示","F_CreateDate":"2017-05-03 10:55:57","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":null,"F_ModifyUserId":null,"F_ModifyUserName":null},{"F_ModuleId":"23801918-10c6-4fe3-9f1c-554548834f16","F_ParentId":"71fdd51a-72d6-48a7-ac81-76817a54cbac","F_EnCode":"excelImport","F_FullName":"导入配置","F_Icon":"fa fa-sign-in","F_UrlAddress":"/LR_SystemModule/ExcelImport/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":0,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"导入excel文件配置","F_CreateDate":"2016-12-04 14:00:20","F_CreateUserId":"632cab6e-a691-495a-acf4-ebe37ba901af","F_CreateUserName":"陈小二","F_ModifyDate":"2017-09-07 10:38:19","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"b5762428-c123-4072-92c8-8a382af6a4ee","F_ParentId":"71fdd51a-72d6-48a7-ac81-76817a54cbac","F_EnCode":"excelExport","F_FullName":"导出配置","F_Icon":"fa fa-sign-out","F_UrlAddress":"/LR_SystemModule/ExcelExport/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":1,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"配置快速导出按钮","F_CreateDate":"2016-12-07 16:11:45","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-09-08 09:13:47","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"34e362f4-c220-4fb7-b3f0-288c83417cb3","F_ParentId":"7cec0a0f-7204-4240-b009-312fa0c11cbf","F_EnCode":"DataBaseLink","F_FullName":"数据库连接","F_Icon":"fa fa-plug","F_UrlAddress":"/LR_SystemModule/DatabaseLink/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":1,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"动态链接数据库","F_CreateDate":"2015-11-24 09:50:22","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-17 14:16:52","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"2f820f6e-ae2e-472f-82cc-0129a2a57597","F_ParentId":"7cec0a0f-7204-4240-b009-312fa0c11cbf","F_EnCode":"DataBaseTable","F_FullName":"数据表管理","F_Icon":"fa fa-table","F_UrlAddress":"/LR_SystemModule/DatabaseTable/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":2,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"数据库表结构","F_CreateDate":"2015-11-24 09:53:42","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-17 14:18:36","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"d967ce5c-1bdf-4bbf-967b-876abc3ea245","F_ParentId":"7cec0a0f-7204-4240-b009-312fa0c11cbf","F_EnCode":"DataSource","F_FullName":"数据源管理","F_Icon":"fa fa-bullseye","F_UrlAddress":"/LR_SystemModule/DataSource/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":3,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"将数据以api形式对外开放","F_CreateDate":"2016-09-06 16:18:44","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-17 14:14:10","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"cf8ec28f-f58a-4190-ac73-e625f9498a93","F_ParentId":"958bbcee-fb1d-4e71-b9fc-fefb65f1ac8a","F_EnCode":"ChanceManage","F_FullName":"商机管理","F_Icon":"fa fa-assistive-listening-systems","F_UrlAddress":"/LR_CRMModule/Chance/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":1,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2017-07-12 19:28:53","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-17 14:38:27","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"27ee2f18-9722-4d11-9dd6-6b9d9706a343","F_ParentId":"958bbcee-fb1d-4e71-b9fc-fefb65f1ac8a","F_EnCode":"CustomerManage","F_FullName":"客户管理","F_Icon":"fa fa-vcard","F_UrlAddress":"/LR_CRMModule/Customer/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":2,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2017-07-13 10:00:56","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-17 14:39:12","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"cb94e955-8ad2-4835-9abc-462b950e0eff","F_ParentId":"958bbcee-fb1d-4e71-b9fc-fefb65f1ac8a","F_EnCode":"InvoiceManage","F_FullName":"开票信息","F_Icon":"fa fa-file-excel-o","F_UrlAddress":"/LR_CRMModule/Invoice/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":3,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2017-07-13 11:55:05","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-17 14:39:21","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"b352f049-4331-4b19-ac22-e379cb30bd55","F_ParentId":"958bbcee-fb1d-4e71-b9fc-fefb65f1ac8a","F_EnCode":"ClientOrder","F_FullName":"客户订单","F_Icon":"fa fa-modx","F_UrlAddress":"/LR_CRMModule/CrmOrder/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":5,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"客户订单管理","F_CreateDate":"2016-03-11 12:01:30","F_CreateUserId":"0f36148c-719f-41e0-8c8c-16ffbc40d0e0","F_CreateUserName":"佘赐雄","F_ModifyDate":"2017-07-10 19:46:13","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"24f141da-6ad3-4a1f-8f0f-ec0dc25885d2","F_ParentId":"96e74799-8fa9-4d51-b776-f1c7517681de","F_EnCode":"R-0803","F_FullName":"会员档案","F_Icon":"fa fa-address-card-o","F_UrlAddress":"/LR_FormModule/FormRelation/PreviewIndex?id=be3a1b41-7d10-487a-8085-a45d22d1a247","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":null,"F_IsPublic":null,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":1,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":null,"F_CreateDate":"2017-08-03 14:44:25","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-09-19 14:09:46","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"858d233e-b85b-4004-a60d-fe1de2645d87","F_ParentId":"96e74799-8fa9-4d51-b776-f1c7517681de","F_EnCode":"orderManage","F_FullName":"订单功能","F_Icon":"fa fa-address-book","F_UrlAddress":"/LR_FormModule/FormRelation/PreviewIndex?id=51747fd4-b68b-4e93-bcdc-8ef9d30b1af7","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":null,"F_IsPublic":null,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":1,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"测试数据","F_CreateDate":"2017-07-20 15:00:42","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-10-09 14:48:09","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"dce55819-e10e-484d-ba62-ae27a5bf3c4a","F_ParentId":"96e74799-8fa9-4d51-b776-f1c7517681de","F_EnCode":"LeaveManage","F_FullName":"请假管理","F_Icon":"fa fa-user-circle","F_UrlAddress":"/LR_FormModule/FormRelation/PreviewIndex?id=8e5b53bf-c07a-4015-a270-8f918e951b6e","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":null,"F_IsPublic":null,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":2,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"测试数据","F_CreateDate":"2017-07-26 16:11:23","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-09-19 14:08:49","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"385987ec-0041-4e1a-8db4-511b09602516","F_ParentId":"96e74799-8fa9-4d51-b776-f1c7517681de","F_EnCode":"testCustmer","F_FullName":"测试表单","F_Icon":"fa fa-bandcamp","F_UrlAddress":"/LR_FormModule/FormRelation/PreviewIndex?id=5e9d5512-de02-41f8-979c-c072796cae0d","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":null,"F_IsPublic":null,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":3,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"测试数据","F_CreateDate":"2017-08-02 16:49:22","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-09-19 14:09:26","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"a977d91e-77b7-4d60-a7ad-dfbc138f7c0a","F_ParentId":"b9f9df92-8ac5-46e2-90ac-68c5c2e034c3","F_EnCode":"企业号设置","F_FullName":"企业号设置","F_Icon":"fa fa-plug","F_UrlAddress":"/LR_WebChatModule/Token/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":1,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2015-12-22 17:20:21","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-05-03 11:20:16","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"5cc9d2d9-e097-4b51-9b9e-84ca9f1a0ab5","F_ParentId":"b9f9df92-8ac5-46e2-90ac-68c5c2e034c3","F_EnCode":"企业号部门","F_FullName":"企业号部门","F_Icon":"fa fa-sitemap","F_UrlAddress":"","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":2,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2015-12-22 17:20:38","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-09-05 11:13:11","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"4d0f2e44-f68f-41fd-a55c-40ac67453ef4","F_ParentId":"b9f9df92-8ac5-46e2-90ac-68c5c2e034c3","F_EnCode":"企业号成员","F_FullName":"企业号成员","F_Icon":"fa fa-users","F_UrlAddress":"","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":3,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2015-12-22 17:20:53","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-09-05 11:25:45","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"affacee1-41a3-4c7b-8804-f1c1926babbd","F_ParentId":"c2da2f51-f9b2-4a0b-a8fe-1ab65caee7cb","F_EnCode":"PurchaseReport","F_FullName":"采购报表","F_Icon":"fa fa-bar-chart","F_UrlAddress":"/LR_ReportModule/ReportTemplate/PurchaseReport","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":1,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":2,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2016-01-04 16:29:07","F_CreateUserId":"0f36148c-719f-41e0-8c8c-16ffbc40d0e0","F_CreateUserName":"佘赐雄","F_ModifyDate":"2017-07-10 10:56:57","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"ff1823b5-a966-4e6c-83de-807854f4f0fb","F_ParentId":"c2da2f51-f9b2-4a0b-a8fe-1ab65caee7cb","F_EnCode":"SalesReport","F_FullName":"销售报表","F_Icon":"fa fa-line-chart","F_UrlAddress":"/LR_ReportModule/ReportTemplate/SalesReport","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":1,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":3,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2016-01-04 16:29:46","F_CreateUserId":"0f36148c-719f-41e0-8c8c-16ffbc40d0e0","F_CreateUserName":"佘赐雄","F_ModifyDate":"2017-07-10 10:57:08","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"901e6122-985d-4c84-8d8c-56560520f6ed","F_ParentId":"c2da2f51-f9b2-4a0b-a8fe-1ab65caee7cb","F_EnCode":"StockReport","F_FullName":"仓存报表","F_Icon":"fa fa-area-chart","F_UrlAddress":"/LR_ReportModule/ReportTemplate/StockReport","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":1,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":4,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2016-01-04 16:30:25","F_CreateUserId":"0f36148c-719f-41e0-8c8c-16ffbc40d0e0","F_CreateUserName":"佘赐雄","F_ModifyDate":"2017-07-10 10:57:15","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"9db71a92-2ecb-496c-839f-7a82bc22905d","F_ParentId":"c2da2f51-f9b2-4a0b-a8fe-1ab65caee7cb","F_EnCode":"FinanceReport","F_FullName":"收支报表","F_Icon":"fa fa-pie-chart","F_UrlAddress":"/LR_ReportModule/ReportTemplate/FinanceReport","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":1,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":5,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"现金银行报表","F_CreateDate":"2016-01-04 16:31:03","F_CreateUserId":"0f36148c-719f-41e0-8c8c-16ffbc40d0e0","F_CreateUserName":"佘赐雄","F_ModifyDate":"2017-07-10 10:57:22","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"c32c15a2-8c69-4b96-8462-675a84f25acb","F_ParentId":"d0971af6-66a3-4875-a200-321e9afb9e0e","F_EnCode":"AppModuleManager","F_FullName":"移动功能","F_Icon":"fa fa-cubes","F_UrlAddress":null,"F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":0,"F_DeleteMark":0,"F_EnabledMark":0,"F_Description":null,"F_CreateDate":"2017-09-05 11:32:06","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-11-02 14:23:30","F_ModifyUserId":"24a055d6-5924-44c5-be52-3715cdd68011","F_ModifyUserName":"陈彬彬"},{"F_ModuleId":"b9f9df92-8ac5-46e2-90ac-68c5c2e034c3","F_ParentId":"d0971af6-66a3-4875-a200-321e9afb9e0e","F_EnCode":"WeChatManage","F_FullName":"微信管理","F_Icon":"fa fa-weixin","F_UrlAddress":"","F_Target":"expand","F_IsMenu":1,"F_AllowExpand":1,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":7,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2015-12-22 16:42:12","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-09-05 11:25:13","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"a57993fa-5a94-44a8-a330-89196515c1d9","F_ParentId":"dc5701b6-989b-48ff-a333-b04d10ebba00","F_EnCode":"FormDesign","F_FullName":"自定义表单","F_Icon":"fa fa-puzzle-piece","F_UrlAddress":"/LR_FormModule/Custmerform/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":1,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"用于设计普通类型的表单","F_CreateDate":"2015-11-27 10:29:53","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-07 14:15:37","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"8a6ed6e1-e3ba-4c4e-b3fe-e4d8dd8e2618","F_ParentId":"dc5701b6-989b-48ff-a333-b04d10ebba00","F_EnCode":"FormManager","F_FullName":"发布表单功能","F_Icon":"fa fa-list-alt","F_UrlAddress":"/LR_FormModule/FormRelation/Index","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":3,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"管理表单和各个功能模块之前的关系","F_CreateDate":"2016-12-01 09:38:20","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-18 20:50:49","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"96e74799-8fa9-4d51-b776-f1c7517681de","F_ParentId":"dc5701b6-989b-48ff-a333-b04d10ebba00","F_EnCode":"FormDemo","F_FullName":"表单发布实例","F_Icon":"fa fa-window-restore","F_UrlAddress":"","F_Target":"expand","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":4,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2017-07-18 21:46:16","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":null,"F_ModifyUserId":null,"F_ModifyUserName":null},{"F_ModuleId":"6c3dad04-6e48-47d9-b090-9d48ea9a802f","F_ParentId":"f0dc171b-939c-4f94-b57a-b8db1da084b2","F_EnCode":"DemoLeave","F_FullName":"请假管理","F_Icon":"fa fa-user-circle-o","F_UrlAddress":"/LR_WorkFlowModule/WfSystemDemo/DemoLeaveIndex","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":0,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2017-10-12 10:06:46","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":null,"F_ModifyUserId":null,"F_ModifyUserName":null},{"F_ModuleId":"90954e0e-0b1a-41aa-9862-55721de192fb","F_ParentId":"fcd05f77-20f3-4e0c-8f8b-afb2daf25e28","F_EnCode":"SalesReport003","F_FullName":"销售图表","F_Icon":"fa fa-area-chart","F_UrlAddress":"/LR_ReportModule/ReportManage/Preview?reportId=a62d27b5-6b81-4ec6-868a-0a1973e52b4c","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":1,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2017-07-18 09:56:08","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-18 10:07:11","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"1018eaba-421a-4fc7-897e-51809d3ea9a7","F_ParentId":"fcd05f77-20f3-4e0c-8f8b-afb2daf25e28","F_EnCode":"SalesReport002","F_FullName":"销售列表","F_Icon":"fa fa-area-chart","F_UrlAddress":"/LR_ReportModule/ReportManage/Preview?reportId=d930cfb3-1f24-4945-927a-fd2c51ea375e","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":2,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2017-07-18 09:57:22","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-18 10:07:23","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"},{"F_ModuleId":"5ba1bb15-748c-4896-afc7-2ae1c1dd1c53","F_ParentId":"fcd05f77-20f3-4e0c-8f8b-afb2daf25e28","F_EnCode":"SalesReport001","F_FullName":"销售混合","F_Icon":"fa fa-area-chart","F_UrlAddress":"/LR_ReportModule/ReportManage/Preview?reportId=a9762855-cd45-4815-a8e1-c8b818f79ad5","F_Target":"iframe","F_IsMenu":1,"F_AllowExpand":0,"F_IsPublic":0,"F_AllowEdit":null,"F_AllowDelete":null,"F_SortCode":3,"F_DeleteMark":0,"F_EnabledMark":1,"F_Description":"","F_CreateDate":"2017-07-18 09:58:08","F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_ModifyDate":"2017-07-18 10:07:31","F_ModifyUserId":"System","F_ModifyUserName":"超级管理员"}];
			e.modules.toMap();
			e.modules.state = j.yes
		},
		toMap: function() {
			var o = {};
			var n = {};
			var l = d.modules.length;
			for(var m = 0; m < l; m++) {
				var k = d.modules[m];
				if(k.F_EnabledMark == 1) {
					o[k.F_ParentId] = o[k.F_ParentId] || [];
					o[k.F_ParentId].push(k);
					n[k.F_ModuleId] = k
				}
			}
			d.modulesTree = o;
			d.modulesMap = n
		}
	};
	e.userinfo = {
		state: j.no,
		init: function() {
			e.userinfo.state = j.ing;
			d.userinfo = {"userId":"System","enCode":"System","account":"System","password":null,"secretkey":null,"realName":"超级管理员","nickName":null,"headIcon":"/images/System.jpg","gender":1,"mobile":null,"telephone":null,"email":null,"oICQ":null,"weChat":null,"companyId":"","departmentId":"","openId":null,"roleIds":"","postIds":"","isSystem":true,"appId":"Learun_ADMS_6.1_PC","logTime":"2017-12-11 18:45:13","iPAddress":"114.94.93.100","browser":"Chrome 62.0","loginMark":"81efdc8a-b5a0-494d-8fb6-45fd1737e5f3","token":"bad268c0-d2a3-4612-99ed-35fad61e28a2","imUrl":"http://localhost:8012/signalr"};
			e.userinfo.state = j.yes
		}
	};
	c.company = {
		timeout: 300000,
		states: j.no,
		get: function(l) {
			if(c.company.states == j.no) {
				c.company.states = j.ing;
				c.company.load()
			}
			if(c.company.states == j.ing) {
				var m = l;
				setTimeout(function() {
					c.company.get(m)
				}, 100)
			} else {
				var k = d.company;
				if(!!k) {
					l.callback(c.company.find(l.key, k), l)
				} else {
					l.callback({}, l)
				}
			}
		},
		load: function() {
			i.httpAsync("GET", top.$.rootUrl + "/LR_OrganizationModule/Company/GetList", null, function(k) {
				if(!!k) {
					d.company = k
				}
				c.company.states = j.yes;
				setTimeout(function() {
					c.company.states = j.no
				}, c.company.timeout)
			})
		},
		find: function(n, k) {
			var p = {};
			for(var m = 0, o = k.length; m < o; m++) {
				if(k[m].F_CompanyId == n) {
					p = k[m];
					break
				}
			}
			return p
		}
	};
	c.department = {
		timeout: 300000,
		states: {},
		get: function(l) {
			if(c.department.states[l.companyId] == undefined || c.department.states[l.companyId] == j.no) {
				c.department.states[l.companyId] = j.ing;
				c.department.load(l.companyId)
			}
			if(c.department.states[l.companyId] == j.ing) {
				var m = l;
				setTimeout(function() {
					c.department.get(m)
				}, 100)
			} else {
				var k = d[l.companyId];
				if(!!k) {
					l.callback(c.department.find(l.key, k))
				} else {
					l.callback({})
				}
			}
		},
		load: function(k) {
			i.httpAsync("GET", top.$.rootUrl + "/LR_OrganizationModule/Department/GetList", {
				companyId: k
			}, function(l) {
				if(!!l) {
					d[k] = l
				}
				c.department.states[k] = j.yes;
				setTimeout(function() {
					c.department.states[k] = j.no
				}, c.department.timeout)
			})
		},
		find: function(n, k) {
			var p = {};
			for(var m = 0, o = k.length; m < o; m++) {
				if(k[m].F_DepartmentId == n) {
					p = k[m];
					break
				}
			}
			return p
		}
	};
	c.departmentone = {
		states: {},
		get: function(l) {
			d.departmentone = d.departmentone || {};
			if(c.departmentone.states[l.departmentId] == undefined || c.departmentone.states[l.departmentId] == j.no) {
				c.departmentone.states[l.departmentId] = j.ing;
				c.departmentone.load(l.departmentId)
			}
			if(c.departmentone.states[l.departmentId] == j.ing) {
				var m = l;
				setTimeout(function() {
					c.departmentone.get(m)
				}, 100)
			} else {
				var k = d.departmentone[l.departmentId];
				if(!!k) {
					l.callback(k, l)
				} else {
					l.callback({}, l)
				}
			}
		},
		load: function(k) {
			i.httpAsync("GET", top.$.rootUrl + "/LR_OrganizationModule/Department/GetEntity", {
				departmentId: k
			}, function(l) {
				if(!!l) {
					d.departmentone[k] = l
				}
				c.departmentone.states[k] = j.yes
			})
		}
	};
	c.user = {
		states: {},
		get: function(l) {
			d.user = d.user || {};
			if(c.user.states[l.userId] == undefined || c.user.states[l.userId] == j.no) {
				c.user.states[l.userId] = j.ing;
				c.user.load(l.userId)
			}
			if(c.user.states[l.userId] == j.ing) {
				var m = l;
				setTimeout(function() {
					c.user.get(m)
				}, 100)
			} else {
				var k = d.user[l.userId];
				if(!!k) {
					l.callback(k, l)
				} else {
					l.callback({}, l)
				}
			}
		},
		load: function(k) {
			i.httpAsync("GET", top.$.rootUrl + "/LR_OrganizationModule/User/GetUserEntity", {
				userId: k
			}, function(l) {
				if(!!l) {
					d.user[k] = l
				}
				c.user.states[k] = j.yes
			})
		}
	};
	c.db = {
		timeout: 600000,
		states: j.no,
		get: function(l) {
			if(c.db.states == j.no) {
				c.db.states = j.ing;
				c.db.load()
			}
			if(c.db.states == j.ing) {
				var m = l;
				setTimeout(function() {
					c.db.get(m)
				}, 100)
			} else {
				var k = d.db;
				if(!!k) {
					l.callback(c.db.find(l.key, k))
				} else {
					l.callback({})
				}
			}
		},
		load: function() {
			i.httpAsync("GET", top.$.rootUrl + "/LR_SystemModule/DatabaseLink/GetList", null, function(k) {
				if(!!k) {
					d.db = k
				}
				c.db.states = j.yes;
				setTimeout(function() {
					c.db.states = j.no
				}, c.db.timeout)
			})
		},
		find: function(n, k) {
			var p = {};
			for(var m = 0, o = k.length; m < o; m++) {
				if(k[m].F_DatabaseLinkId == n) {
					p = k[m];
					break
				}
			}
			return p
		}
	};
	c.dataItem = {
		states: {},
		get: function(l) {
			d.dataItem = d.dataItem || {};
			if(c.dataItem.states[l.itemCode] == undefined || c.dataItem.states[l.itemCode] == j.no) {
				c.dataItem.states[l.itemCode] = j.ing;
				c.dataItem.load(l.itemCode)
			}
			if(c.dataItem.states[l.itemCode] == j.ing) {
				var m = l;
				setTimeout(function() {
					c.dataItem.get(m)
				}, 100)
			} else {
				var k = d.dataItem[l.itemCode];
				if(!!k) {
					l.callback(c.dataItem.find(l.key, k))
				} else {
					l.callback({})
				}
			}
		},
		load: function(k) {
			i.httpAsync("GET", top.$.rootUrl + "/LR_SystemModule/DataItem/GetDetailList", {
				itemCode: k
			}, function(l) {
				if(!!l) {
					d.dataItem[k] = l
				}
				c.dataItem.states[k] = j.yes
			})
		},
		find: function(n, k) {
			var p = {};
			for(var m = 0, o = k.length; m < o; m++) {
				if(k[m].F_ItemValue == n) {
					p = k[m];
					break
				}
			}
			return p
		}
	};
	c.custmerData = {
		timeout: 300000,
		states: {},
		get: function(l) {
			if(c.custmerData.states[l.url] == undefined || c.custmerData.states[l.url] == j.no) {
				c.custmerData.states[l.url] = j.ing;
				c.custmerData.load(l.url)
			}
			if(c.custmerData.states[l.url] == j.ing) {
				var m = l;
				setTimeout(function() {
					c.custmerData.get(m)
				}, 100)
			} else {
				var k = d[l.url];
				if(!!k) {
					l.callback(c.custmerData.find(l.key, l.valueId, k))
				} else {
					l.callback({})
				}
			}
		},
		load: function(k) {
			i.httpAsync("GET", top.$.rootUrl + k, {}, function(l) {
				if(!!l) {
					d[k] = l
				}
				c.custmerData.states[k] = j.yes;
				setTimeout(function() {
					c.custmerData.states[k] = j.no
				}, c.custmerData.timeout)
			})
		},
		find: function(n, q, k) {
			var p = {};
			for(var m = 0, o = k.length; m < o; m++) {
				if(k[m][q] == n) {
					p = k[m];
					break
				}
			}
			return p
		}
	}
})(window.jQuery, top.learun);
(function(a, b) {
	a.lrtree = {
		getItem: function(f, d) {
			var c = f.split(".");
			var g = d.data;
			for(var e = 0; e < c.length; e++) {
				if(e == 0) {
					g = g[c[e]]
				} else {
					g = g.ChildNodes[c[e]]
				}
			}
			return g
		},
		render: function(d) {
			var g = d[0]._lrtree.dfop;
			var e = a('<ul class="lr-tree-root" ></ul>');
			var f = g.data.length;
			for(var h = 0; h < f; h++) {
				var c = a.lrtree.renderNode(g.data[h], 0, h, g);
				e.append(c)
			}
			d.append(e);
			d.mCustomScrollbar({
				theme: "minimal-dark"
			});
			g = null
		},
		renderNode: function(v, p, w, q) {
			if(v.shide) {
				return ""
			}
			v._deep = p;
			v._path = w;
			var u = v.id.replace(/[^\w]/gi, "_");
			var x = v.title || v.text;
			var g = a('<li class="lr-tree-node"></li>');
			var h = a('<div id="' + q.id + "_" + u + '" tpath="' + w + '" title="' + x + '"  dataId="' + q.id + '"  class="lr-tree-node-el" ></div>');
			if(v.hasChildren) {
				var o = (v.isexpand || q.isAllExpand) ? "lr-tree-node-expanded" : "lr-tree-node-collapsed";
				h.addClass(o)
			} else {
				h.addClass("lr-tree-node-leaf")
			}
			var i = a('<span class="lr-tree-node-indent"></span>');
			if(p == 1) {
				i.append('<img class="lr-tree-icon" src="' + q.cbiconpath + 's.gif"/>')
			} else {
				if(p > 1) {
					i.append('<img class="lr-tree-icon" src="' + q.cbiconpath + 's.gif"/>');
					for(var r = 1; r < p; r++) {
						i.append('<img class="lr-tree-icon" src="' + q.cbiconpath + 's.gif"/>')
					}
				}
			}
			h.append(i);
			var f = a('<img class="lr-tree-ec-icon" src="' + q.cbiconpath + 's.gif"/>');
			h.append(f);
			if(v.showcheck) {
				if(v.checkstate == null || v.checkstate == undefined) {
					v.checkstate = 0
				}
				var d = a('<img  id="' + q.id + "_" + u + '_cb" + class="lr-tree-node-cb" src="' + q.cbiconpath + q.icons[v.checkstate] + '" />');
				h.append(d)
			}
			if(v.icon != -1) {
				if(!!v.icon) {
					h.append('<i class="' + v.icon + '"></i>&nbsp;')
				} else {
					if(v.hasChildren) {
						if(v.isexpand || q.isAllExpand) {
							h.append('<i class="fa fa-folder-open" style="width:15px">&nbsp;</i>')
						} else {
							h.append('<i class="fa fa-folder" style="width:15px">&nbsp;</i>')
						}
					} else {
						h.append('<i class="fa fa-file-o"></i>&nbsp;')
					}
				}
			}
			var n = '<a class="lr-tree-node-anchor" href="javascript:void(0);">';
			n += '<span data-value="' + v.id + '" class="lr-tree-node-text" >' + v.text + "</span>";
			n += "</a>";
			h.append(n);
			h.on("click", a.lrtree.nodeClick);
			if(!v.complete) {
				h.append('<div class="lr-tree-loading"><img class="lr-tree-ec-icon" src="' + q.cbiconpath + 'loading.gif"/></div>')
			}
			g.append(h);
			if(v.hasChildren) {
				var m = a('<ul  class="lr-tree-node-ct" >');
				if(!v.isexpand && !q.isAllExpand) {
					m.css("display", "none")
				}
				if(v.ChildNodes) {
					var t = v.ChildNodes.length;
					for(var s = 0; s < t; s++) {
						v.ChildNodes[s].parent = v;
						var e = a.lrtree.renderNode(v.ChildNodes[s], p + 1, w + "." + s, q);
						m.append(e)
					}
					g.append(m)
				}
			}
			v.render = true;
			q = null;
			return g
		},
		renderNodeAsync: function(d, i, f) {
			var e = a('<ul  class="lr-tree-node-ct" >');
			if(!i.isexpand && !f.isAllExpand) {
				e.css("display", "none")
			}
			if(i.ChildNodes) {
				var h = i.ChildNodes.length;
				for(var g = 0; g < h; g++) {
					i.ChildNodes[g].parent = i;
					var c = a.lrtree.renderNode(i.ChildNodes[g], i._deep + 1, i._path + "." + g, f);
					e.append(c)
				}
				d.parent().append(e)
			}
			return e
		},
		renderToo: function(d) {
			var g = d[0]._lrtree.dfop;
			var e = d.find(".lr-tree-root");
			e.html("");
			var f = g.data.length;
			for(var h = 0; h < f; h++) {
				var c = a.lrtree.renderNode(g.data[h], 0, h, g);
				e.append(c)
			}
			g = null
		},
		nodeClick: function(i) {
			var j = i.target || i.srcElement;
			var f = a(this);
			var d = a("#" + f.attr("dataId"));
			var h = d[0]._lrtree.dfop;
			if(j.tagName == "IMG") {
				var c = a(j);
				var g = f.next(".lr-tree-node-ct");
				if(c.hasClass("lr-tree-ec-icon")) {
					if(f.hasClass("lr-tree-node-expanded")) {
						g.slideUp(200, function() {
							f.removeClass("lr-tree-node-expanded");
							f.addClass("lr-tree-node-collapsed")
						})
					} else {
						if(f.hasClass("lr-tree-node-collapsed")) {
							var l = f.attr("tpath");
							var k = a.lrtree.getItem(l, h);
							if(!k.complete) {
								if(!k._loading) {
									k._loading = true;
									f.find(".lr-tree-loading").show();
									b.httpAsync("GET", h.url, {
										parentId: k.id
									}, function(e) {
										if(!!e) {
											k.ChildNodes = e;
											g = a.lrtree.renderNodeAsync(f, k, h);
											g.slideDown(200, function() {
												f.removeClass("lr-tree-node-collapsed");
												f.addClass("lr-tree-node-expanded")
											});
											k.complete = true;
											f.find(".lr-tree-loading").hide()
										}
										k._loading = false
									})
								}
							} else {
								g.slideDown(200, function() {
									f.removeClass("lr-tree-node-collapsed");
									f.addClass("lr-tree-node-expanded")
								})
							}
						}
					}
				} else {
					if(c.hasClass("lr-tree-node-cb")) {
						var l = f.attr("tpath");
						var k = a.lrtree.getItem(l, h);
						if(k.checkstate == 1) {
							k.checkstate = 0
						} else {
							k.checkstate = 1
						}
						c.attr("src", h.cbiconpath + h.icons[k.checkstate]);
						a.lrtree.checkChild(a.lrtree.check, k, k.checkstate, h);
						a.lrtree.checkParent(a.lrtree.check, k, k.checkstate, h);
						if(!!h.nodeCheck) {
							h.nodeCheck(k, f)
						}
					}
				}
			} else {
				var l = f.attr("tpath");
				var k = a.lrtree.getItem(l, h);
				h.currentItem = k;
				a("#" + h.id).find(".lr-tree-selected").removeClass("lr-tree-selected");
				f.addClass("lr-tree-selected");
				if(!!h.nodeClick) {
					h.nodeClick(k, f)
				}
			}
			return false
		},
		check: function(h, n, o, e) {
			var m = h.checkstate;
			if(o == 1) {
				h.checkstate = n
			} else {
				var d = h.ChildNodes;
				var j = d.length;
				var c = true;
				for(var g = 0; g < j; g++) {
					d[g].checkstate = d[g].checkstate || 0;
					if((n == 1 && d[g].checkstate != 1) || n == 0 && d[g].checkstate != 0) {
						c = false;
						break
					}
				}
				if(c) {
					h.checkstate = n
				} else {
					h.checkstate = 2
				}
			}
			if(h.render && m != h.checkstate) {
				var k = h.id.replace(/[^\w]/gi, "_");
				var f = a("#" + e.id + "_" + k + "_cb");
				if(f.length == 1) {
					f.attr("src", e.cbiconpath + e.icons[h.checkstate])
				}
			}
		},
		checkParent: function(d, e, h, c) {
			var f = e.parent;
			while(f) {
				var g = d(f, h, 0, c);
				if(g === false) {
					break
				}
				f = f.parent
			}
		},
		checkChild: function(e, h, j, d) {
			if(e(h, j, 1, d) != false) {
				if(h.ChildNodes != null && h.ChildNodes.length > 0) {
					var c = h.ChildNodes;
					for(var f = 0, g = c.length; f < g; f++) {
						a.lrtree.checkChild(e, c[f], j, d)
					}
				}
			}
		},
		search: function(d, c) {
			var e = false;
			a.each(c, function(g, h) {
				var f = false;
				if(!b.validator.isNotNull(d).code || h.text.indexOf(d) != -1) {
					f = true
				}
				if(h.hasChildren) {
					if(a.lrtree.search(d, h.ChildNodes)) {
						f = true
					}
				}
				if(f) {
					e = true;
					h.isexpand = true;
					h.shide = false
				} else {
					h.shide = true
				}
			});
			return e
		},
		findItem: function(e, f, g) {
			var d = null;
			c(e, f, g);

			function c(h, j, k) {
				for(var m = 0, n = h.length; m < n; m++) {
					if(h[m][f] == g) {
						d = h[m];
						return true
					}
					if(h[m].hasChildren && h[m].ChildNodes.length > 0) {
						if(c(h[m].ChildNodes, j, k)) {
							return true
						}
					}
				}
				return false
			}
			return d
		},
		listTotree: function(e, m, g, o, p, d) {
			var n = [];
			var k = {};
			for(var f = 0, j = e.length; f < j; f++) {
				var h = e[f];
				k[h[m]] = k[h[m]] || [];
				k[h[m]].push(h)
			}
			c(n, "0");

			function c(i, v) {
				var u = k[v] || [];
				for(var s = 0, t = u.length; s < t; s++) {
					var q = u[s];
					var r = {
						id: q[g],
						text: q[o],
						value: q[p],
						showcheck: d,
						checkstate: false,
						hasChildren: false,
						isexpand: false,
						complete: true,
						ChildNodes: []
					};
					if(c(r.ChildNodes, q[g])) {
						r.hasChildren = true;
						r.isexpand = true
					}
					i.push(r)
				}
				return i.length > 0
			}
			return n
		},
		treeTotree: function(f, g, i, j, d, e) {
			var h = [];
			c(h, f);

			function c(q, n) {
				for(var o = 0, p = n.length; o < p; o++) {
					var k = n[o];
					var m = {
						id: k[g],
						text: k[i],
						value: k[j],
						showcheck: d,
						checkstate: false,
						hasChildren: false,
						isexpand: true,
						complete: true,
						ChildNodes: []
					};
					if(k[e].length > 0) {
						m.hasChildren = true;
						c(m.ChildNodes, k[e])
					}
					q.push(m)
				}
			}
			return h
		},
		addNode: function(e, i, g, h) {
			var f = e[0]._lrtree.dfop;
			if(!!g) {
				f.data.splice(h, 0, i);
				var c = a.lrtree.renderNode(i, 0, h, f);
				if(e.find(".lr-tree-root>li").length == 0) {
					e.find(".lr-tree-root>li").append(c)
				} else {
					e.find(".lr-tree-root>li").eq(h).before(c)
				}
			} else {
				var d = e.find("#" + f.id + "_" + g);
				var j = d.attr("tpath");
				var c = a.lrtree.renderNode(i, 0, j + "." + h, f);
				if(d.next().children().length == 0) {
					d.next().children().append(c)
				} else {
					d.next().children().eq(h).before(c)
				}
			}
		},
		setValue: function(c) {
			var d = c[0]._lrtree.dfop;
			if(d.data.length == 0) {
				setTimeout(function() {
					a.lrtree.setValue(c)
				}, 100)
			} else {
				c.find('span[data-value="' + d._value + '"]').trigger("click")
			}
		}
	};
	a.fn.lrtree = function(g) {
		var d = {
			icons: ["checkbox_0.png", "checkbox_1.png", "checkbox_2.png"],
			method: "GET",
			url: false,
			param: null,
			data: [],
			isAllExpand: false,
			cbiconpath: "/images/learuntree/",
			nodeClick: false,
			nodeCheck: false
		};
		a.extend(d, g);
		var c = a(this);
		d.id = c.attr("id");
		if(d.id == null || d.id == "") {
			d.id = "learuntree" + new Date().getTime();
			c.attr("id", d.id)
		}
		c.html("");
		c.addClass("lr-tree");
		c[0]._lrtree = {
			dfop: d
		};
		c[0]._lrtree.dfop.backupData = d.data;
		if(d.url) {
			b.httpAsync(d.method, d.url, d.param, function(h) {
				c[0]._lrtree.dfop.data = h || [];
				c[0]._lrtree.dfop.backupData = c[0]._lrtree.dfop.data;
				a.lrtree.render(c)
			})
		} else {
			a.lrtree.render(c)
		}
		if(d.showcheck) {
			for(var e = 0; e < 3; e++) {
				var f = new Image();
				f.src = d.cbiconpath + d.icons[e]
			}
		}
		d = null;
		return c
	};
	a.fn.lrtreeSet = function(i, j) {
		var c = a(this);
		var e = c[0]._lrtree.dfop;
		var f = function(p, m, n) {
			for(var o = 0, q = p.length; o < q; o++) {
				if(c.find("#" + e.id + "_" + p[o].id.replace(/-/g, "_")).parent().css("display") != "none") {
					(p[o].showcheck == true && (p[o].checkstate == 1 || p[o].checkstate == 2)) && m.push(n(p[o]));
					if(!p[o].showcheck || (p[o].showcheck == true && (p[o].checkstate == 1 || p[o].checkstate == 2))) {
						if(p[o].ChildNodes != null && p[o].ChildNodes.length > 0) {
							f(p[o].ChildNodes, m, n)
						}
					}
				}
			}
		};
		var g = function(p, m, n) {
			for(var o = 0, q = p.length; o < q; o++) {
				(p[o].showcheck == true && (p[o].checkstate == 1 || p[o].checkstate == 2) && !p[o].hasChildren) && m.push(n(p[o]));
				if(!p[o].showcheck || (p[o].showcheck == true && (p[o].checkstate == 1 || p[o].checkstate == 2))) {
					if(p[o].ChildNodes != null && p[o].ChildNodes.length > 0) {
						g(p[o].ChildNodes, m, n)
					}
				}
			}
		};
		var l = function(p, m, n) {
			for(var o = 0, q = p.length; o < q; o++) {
				if(p[o].showcheck) {
					p[o].checkstate = 0
				}
				if(p[o].ChildNodes != null && p[o].ChildNodes.length > 0) {
					l(p[o].ChildNodes)
				}
			}
		};
		switch(i) {
			case "allNoCheck":
				c.find(".lr-tree-node-cb").attr("src", e.cbiconpath + "checkbox_0.png");
				l(e.data);
				break;
			case "allCheck":
				c.find('.lr-tree-node-cb[src$="checkbox_0.png"]').trigger("click");
				break;
			case "setCheck":
				var h = j;
				a.each(h, function(n, o) {
					var m = c.find("#" + e.id + "_" + o.replace(/-/g, "_"));
					if(m.next().length == 0) {
						m.find(".lr-tree-node-cb").trigger("click")
					}
				});
				break;
			case "setValue":
				e._value = j;
				a.lrtree.setValue(c);
				break;
			case "currentItem":
				return e.currentItem;
				break;
			case "getCheckNodesEx":
				var d = [];
				g(e.data, d, function(m) {
					return m
				});
				return d;
				break;
			case "getCheckNodes":
				var d = [];
				f(e.data, d, function(m) {
					return m
				});
				return d;
				break;
			case "getCheckNodeIds":
				var d = [];
				f(e.data, d, function(m) {
					return m.id
				});
				return d;
				break;
			case "getCheckNodeIdsByPath":
				var d = [];
				var k;
				f(e.data, d, function(m) {
					return m.id
				});
				return d;
				break;
			case "search":
				a.lrtree.search(j.keyword, e.data);
				if(b.validator.isNotNull(j.keyword).code) {
					e._isSearch = true
				} else {
					if(e._isSearch) {
						e._isSearch = false
					}
				}
				a.lrtree.renderToo(c);
				break;
			case "refresh":
				a.extend(e, j || {});
				if(!!e.url) {
					b.httpAsync(e.method, e.url, e.param, function(m) {
						c[0]._lrtree.dfop.data = m || [];
						c[0]._lrtree.dfop.backupData = c[0]._lrtree.dfop.data;
						a.lrtree.renderToo(c);
						e._isSearch = false
					})
				} else {
					c[0]._lrtree.dfop.backupData = c[0]._lrtree.dfop.data;
					a.lrtree.renderToo(c);
					e._isSearch = false
				}
				break;
			case "addNode":
				break;
			case "updateNode":
				break
		}
	}
})(jQuery, top.learun);
(function(a, b) {
	a.lrselect = {
		htmlToData: function(c) {
			var e = c[0]._lrselect.dfop;
			var d = c.find("ul");
			e.data = [];
			d.find("li").each(function() {
				var f = a(this);
				var g = {
					id: f.attr("data-value"),
					text: f.html()
				};
				e.data.push(g)
			});
			d.remove();
			d = null;
			e = null
		},
		initRender: function(h, f) {
			var c = a('<div class="lr-select-option" id="learun_select_option_' + h.id + '"></div>');
			var d = a('<div class="lr-select-option-content"></div>');
			var g = a('<ul id="learun_select_option_content' + h.id + '"></ul>');
			d.css("max-height", h.maxHeight + "px");
			c.hide();
			d.html(g);
			c.prepend(d);
			if(h.allowSearch) {
				var e = a('<div class="lr-select-option-search"><input type="text" placeholder="搜索关键字"><span class="input-query" title="查询"><i class="fa fa-search"></i></span></div>');
				c.append(e);
				c.css("padding-bottom", "25px");
				e.on("click", function() {
					return false
				});
				e.find("input").on("keypress", function(p) {
					if(event.keyCode == "13") {
						var m = a(this);
						var r = m.val();
						var k = m.parents(".lr-select");
						var o = k[0]._lrselect.dfop;
						if(o.type == "tree" || o.type == "treemultiple") {
							var j = m.parent().prev();
							j.lrtreeSet("search", {
								keyword: r
							})
						} else {
							if(o.type == "default" || o.type == "multiple") {
								console.log(r);
								for(var q = 0, s = o.data.length; q < s; q++) {
									var n = o.data[q];
									if(!r || n[o.text].indexOf(r) != -1) {
										n._lrhide = false
									} else {
										n._lrhide = true
									}
								}
								a.lrselect.render(o)
							}
						}
					}
				})
			}
			f.append(c);
			f.append('<div class="lr-select-placeholder" >==' + h.placeholder + "==</div>");
			f.attr("type", "lrselect").addClass("lr-select");
			if(h.type != "tree") {
				d.mCustomScrollbar({
					theme: "minimal-dark"
				})
			}
		},
		render: function(c) {
			switch(c.type) {
				case "default":
					a.lrselect.defaultRender(c);
					break;
				case "tree":
				case "treemultiple":
					a.lrselect.treeRender(c);
					break;
				case "gird":
					break;
				case "multiple":
					a.lrselect.multipleRender(c);
					break;
				default:
					break
			}
			c.isrender = true
		},
		defaultRender: function(e) {
			var d = a("#learun_select_option_content" + e.id);
			d.html("");
			if(!!e.placeholder) {
				d.append('<li data-value="-1" class="lr-selectitem-li" >==' + e.placeholder + "==</li>")
			}
			for(var f = 0, h = e.data.length; f < h; f++) {
				var g = e.data[f];
				if(!g._lrhide) {
					var c = a('<li data-value="' + f + '" class="lr-selectitem-li" >' + g[e.text] + "</li>");
					d.append(c)
				}
			}
		},
		multipleRender: function(e) {
			var d = a("#learun_select_option_content" + e.id);
			d.html("");
			if(!!e.placeholder) {
				d.append('<li data-value="-1" class="lr-selectitem-li" >==' + e.placeholder + "==</li>")
			}
			for(var f = 0, h = e.data.length; f < h; f++) {
				var g = e.data[f];
				if(!g._lrhide) {
					if(!!e.multipleMapValue && e.multipleMapValue[f] != undefined) {
						var c = a('<li data-value="' + f + '" class="lr-selectitem-li" ><img class="lr-select-node-cb" src="/images/learuntree/checkbox_1.png">' + g[e.text] + "</li>");
						d.append(c)
					} else {
						var c = a('<li data-value="' + f + '" class="lr-selectitem-li" ><img class="lr-select-node-cb" src="/images/learuntree/checkbox_0.png">' + g[e.text] + "</li>");
						d.append(c)
					}
				}
			}
		},
		treeRender: function(e) {
			var c = a("#learun_select_option_" + e.id);
			c.find(".lr-select-option-content").remove();
			var d = a('<div class="lr-select-option-content"></div>');
			c.prepend(d);
			d.css("max-height", e.maxHeight + "px");
			e.data.unshift({
				id: "-1",
				text: "==" + e.placeholder + "==",
				value: "-1",
				icon: "-1",
				parentnodes: "0",
				showcheck: false,
				isexpand: false,
				complete: true,
				hasChildren: false,
				ChildNodes: []
			});
			var f = {
				data: e.data,
				nodeClick: a.lrselect.treeNodeClick
			};
			if(e.type == "treemultiple") {
				f.nodeClick = a.lrselect.treeNodeClick2;
				f.nodeCheck = a.lrselect.treeNodeCheck
			}
			d.lrtree(f)
		},
		bindEvent: function(c) {
			c.unbind("click");
			c.on("click", a.lrselect.click);
			a(document).click(function(d) {
				a(".lr-select-option").slideUp(150);
				a(".lr-select").removeClass("lr-select-focus")
			})
		},
		click: function(k) {
			var h = a(this);
			if(h.attr("readonly") == "readonly" || h.attr("disabled") == "disabled") {
				return false
			}
			var j = h[0]._lrselect.dfop;
			if(!j.isload) {
				return false
			}
			if(!j.isrender) {
				a.lrselect.render(j)
			}
			var l = k.target || k.srcElement;
			var d = a(l);
			var g = a("#learun_select_option_" + j.id);
			if(g.is(":hidden")) {
				a(".lr-select-option").slideUp(150);
				a(".lr-select").removeClass("lr-select-focus");
				h.addClass("lr-select-focus");
				var n = j.width || h.parent().width();
				g.css("width", n).show();
				g.find(".lr-select-option-search").find("input").select()
			} else {
				if(j.type != "multiple") {
					g.slideUp(150);
					h.removeClass("lr-select-focus")
				}
			}
			if(j.type != "multiple") {
				if(d.hasClass("lr-selectitem-li")) {
					var i = d.attr("data-value");
					if(j._index != i) {
						var f = h.find(".lr-select-placeholder");
						if(i == -1) {
							f.css("color", "#999");
							f.html("==" + j.placeholder + "==")
						} else {
							f.css("color", "#000");
							f.html(j.data[i][j.text])
						}
						d.addClass("selected");
						if(j._index != undefined && j._index != null) {
							g.find('.lr-selectitem-li[data-value="' + j._index + '"]').removeClass("selected")
						}
						j._index = i;
						h.trigger("change");
						if(!!j.select) {
							j.select(j.data[i])
						}
					}
				}
			} else {
				if(d.hasClass("lr-selectitem-li") || d.hasClass("lr-select-node-cb")) {
					var f = h.find(".lr-select-placeholder");
					var c = d.find(".lr-select-node-cb");
					var i = d.attr("data-value");
					if(d.hasClass("lr-select-node-cb")) {
						c = d;
						i = d.parent().attr("data-value")
					}
					j.multipleMapValue = j.multipleMapValue || {};
					j.multipleValue = j.multipleValue || [];
					j.multipleText = j.multipleText || [];
					if(j._index != undefined && j._index != null) {
						g.find('.lr-selectitem-li[data-value="' + j._index + '"]').removeClass("selected")
					}
					if(i == -1) {
						f.css("color", "#999");
						f.html("==" + j.placeholder + "==");
						j.multipleMapValue = {};
						j.multipleValue = [];
						j.multipleText = [];
						g.find('.lr-select-node-cb[src$="checkbox_1.png"]').attr("src", "/images/learuntree/checkbox_0.png");
						g.slideUp(150);
						h.removeClass("lr-select-focus")
					} else {
						var m = true;
						if(j.multipleMapValue[i] == undefined) {
							f.css("color", "#000");
							j.multipleValue.push(j.data[i][j.value]);
							j.multipleText.push(j.data[i][j.text]);
							j.multipleMapValue[i] = j.multipleText.length - 1;
							f.html(String(j.multipleText));
							c.attr("src", "/images/learuntree/checkbox_1.png")
						} else {
							j.multipleText.splice(j.multipleMapValue[i], 1);
							j.multipleValue.splice(j.multipleMapValue[i], 1);
							delete j.multipleMapValue[i];
							if(j.multipleText.length == 0) {
								f.css("color", "#999");
								f.html("==" + j.placeholder + "==")
							} else {
								f.html(String(j.multipleText))
							}
							m = false;
							c.attr("src", "/images/learuntree/checkbox_0.png")
						}
						h.trigger("change");
						if(!!j.select) {
							j.select(j.data[i], m, h)
						}
					}
				}
			}
			j = null;
			k.stopPropagation()
		},
		treeNodeClick: function(g, d) {
			d.parents(".lr-select-option").slideUp(150);
			var e = d.parents(".lr-select");
			var f = e[0]._lrselect.dfop;
			e.removeClass("lr-select-focus");
			f.currtentItem = g;
			var c = e.find(".lr-select-placeholder");
			c.html(f.currtentItem.text);
			if(g.value == "-1") {
				c.css("color", "#999")
			} else {
				c.css("color", "#000")
			}
			e.trigger("change");
			if(!!f.select) {
				f.select(f.currtentItem)
			}
		},
		treeNodeClick2: function(g, d) {
			$tree = d.parents(".lr-select-option-content");
			var e = d.parents(".lr-select");
			var f = e[0]._lrselect.dfop;
			e.removeClass("lr-select-focus");
			f.currtentItems = [];
			if(g.value == "-1") {
				d.parents(".lr-select-option").slideUp(150);
				$tree.lrtreeSet("allNoCheck");
				var c = e.find(".lr-select-placeholder");
				c.html(g.text);
				c.css("color", "#999");
				e.trigger("change");
				if(!!f.select) {
					f.select([])
				}
			}
		},
		treeNodeCheck: function(j, d) {
			$tree = d.parents(".lr-select-option-content");
			var e = d.parents(".lr-select");
			var c = e.find(".lr-select-placeholder");
			e.removeClass("lr-select-focus");
			var g = e[0]._lrselect.dfop;
			var f = $tree.lrtreeSet("getCheckNodesEx");
			g.currtentItems = f;
			var n = "";
			for(var h = 0, k = f.length; h < k; h++) {
				var m = f[h];
				if(n != "") {
					n += ","
				}
				n += m.text
			}
			if(n == "") {
				c.html("==" + g.placeholder + "==");
				c.css("color", "#999")
			} else {
				c.text(n);
				c.css("color", "#000")
			}
			e.trigger("change");
			if(!!g.select) {
				g.select(g.currtentItems)
			}
		},
		defaultValue: function(d) {
			var e = d[0]._lrselect.dfop;
			e.currtentItem = null;
			e._index = -1;
			var c = d.find(".lr-select-placeholder");
			c.css("color", "#999");
			c.html("==" + e.placeholder + "==");
			d.trigger("change")
		}
	};
	a.fn.lrselect = function(e) {
		var d = {
			placeholder: "请选择",
			type: "default",
			value: "id",
			text: "text",
			title: "title",
			maxHeight: 200,
			width: false,
			allowSearch: false,
			url: false,
			data: false,
			param: null,
			method: "GET",
			select: false,
			isload: false,
			isrender: false
		};
		a.extend(d, e || {});
		var c = a(this);
		if(c.length == 0) {
			return c
		}
		d.id = c.attr("id");
		if(!d.id) {
			return false
		}
		if(!!c[0]._lrselect) {
			return c
		}
		c[0]._lrselect = {
			dfop: d
		};
		a.lrselect.bindEvent(c);
		if(!!d.url) {
			b.httpAsync(d.method, d.url, d.param, function(f) {
				c[0]._lrselect.dfop.data = f || [];
				c[0]._lrselect.dfop.backdata = f || [];
				d.isload = true
			})
		} else {
			if(!!d.data) {
				d.isload = true;
				d.backdata = d.data
			} else {
				a.lrselect.htmlToData(c);
				d.isload = true;
				d.backdata = d.data
			}
		}
		a.lrselect.initRender(d, c);
		return c
	};
	a.fn.lrselectRefresh = function(e) {
		var c = a(this);
		if(c.length == 0) {
			return c
		}
		if(!c[0]._lrselect) {
			return false
		}
		var d = c[0]._lrselect.dfop;
		if(!d) {
			return false
		}
		a.extend(d, e || {});
		d.isload = false;
		d.isrender = false;
		if(!!d.url) {
			b.httpAsync(d.method, d.url, d.param, function(f) {
				c[0]._lrselect.dfop.data = f || [];
				c[0]._lrselect.dfop.backdata = f || [];
				d.isload = true
			})
		} else {
			if(!!d.data) {
				d.isload = true;
				d.backdata = d.data
			}
		}
		a.lrselect.defaultValue(c);
		if(d._setValue != null && d._setValue != undefined) {
			c.lrselectSet(d._setValue)
		}
	};
	a.fn.lrselectGet = function() {
		var c = a(this);
		if(c.length == 0) {
			return c
		}
		var d = c[0]._lrselect.dfop;
		var g = "";
		switch(d.type) {
			case "default":
				if(!!d.data[d._index]) {
					g = d.data[d._index][d.value]
				}
				break;
			case "tree":
				if(!!d.currtentItem) {
					g = d.currtentItem[d.value]
				}
				break;
			case "treemultiple":
				if(!!d.currtentItems) {
					for(var e = 0, f = d.currtentItems.length; e < f; e++) {
						if(g != "") {
							g += ","
						}
						g += d.currtentItems[e][d.value]
					}
				}
				break;
			case "gird":
				break;
			case "multiple":
				d.multipleValue = d.multipleValue || [];
				return String(d.multipleValue);
				break;
			default:
				break
		}
		return g
	};
	a.fn.lrselectSet = function(f) {
		var c = a(this);
		if(c.length == 0) {
			return c
		}
		f = f + "";
		if(f == "" || f == undefined || f == null) {
			a.lrselect.defaultValue(c);
			return c
		}
		var e = c[0]._lrselect.dfop;
		e._setValue = null;
		if(!e) {
			return c
		}

		function d(m) {
			if(m.isload == false) {
				setTimeout(function() {
					d(m)
				}, 100)
			} else {
				if(m.isload == true) {
					var j;
					switch(m.type) {
						case "default":
							for(var n = 0, o = m.data.length; n < o; n++) {
								if(m.data[n][m.value] == f) {
									m._index = n;
									j = m.data[n];
									break
								}
							}
							break;
						case "tree":
							j = a.lrtree.findItem(m.data, m.value, f);
							m.currtentItem = j;
							break;
						case "treemultiple":
							a.lrselect.render(m);
							c.find(".lr-select-option-content").lrtreeSet("setCheck", f.split(","));
							return false;
							break;
						case "gird":
							break;
						case "multiple":
							m.multipleMapValue = {};
							m.multipleValue = [];
							m.multipleText = [];
							if(m.isrender) {
								c.find('.lr-select-node-cb[src$="checkbox_1.png"]').attr("src", "/images/learuntree/checkbox_0.png")
							}
							var k = f.split(",");
							for(var n = 0, o = m.data.length; n < o; n++) {
								var h = a.inArray(m.data[n][m.value], k);
								if(h != -1) {
									m.multipleMapValue[n] = h;
									m.multipleValue.push(m.data[n][m.value]);
									m.multipleText.push(m.data[n][m.text]);
									if(m.isrender) {
										c.find('[data-value="' + n + '"] .lr-select-node-cb').attr("src", "/images/learuntree/checkbox_1.png")
									}
									if(!!m.select) {
										m.select(m.data[n], true, c)
									}
								}
							}
							j = m.multipleText;
							break;
						default:
							break
					}
					if(!!j) {
						if(m.type == "multiple") {
							var g = c.find(".lr-select-placeholder");
							if(m.multipleText.length > 0) {
								g.css("color", "#000")
							} else {
								g.css("color", "#999")
							}
							g.html(String(m.multipleText));
							c.trigger("change")
						} else {
							var g = c.find(".lr-select-placeholder");
							g.html(j[m.text]);
							g.css("color", "#000");
							c.trigger("change");
							if(!!m.select) {
								m.select(j)
							}
						}
					} else {
						m._setValue = f
					}
				}
			}
		}
		d(e);
		return c
	}
})(jQuery, top.learun);
(function(a, f) {
	var b = {
		bootstraper: top.$.workflowapi + "/workflow/bootstraper",
		taskinfo: top.$.workflowapi + "/workflow/taskinfo",
		processinfo: top.$.workflowapi + "/workflow/processinfo",
		create: top.$.workflowapi + "/workflow/create",
		audit: top.$.workflowapi + "/workflow/audit"
	};
	var d = function(j, i, g, h) {
		f.loading(true, h || "正在获取数据");
		f.httpAsync("GET", j, i, function(k) {
			f.loading(false);
			g(k)
		})
	};
	var e = function(j, i, g, h) {
		f.loading(true, h || "正在获取数据");
		f.httpAsync("Post", j, i, function(k) {
			f.loading(false);
			g(k)
		})
	};

	function c() {
		var g = {
			token: top.$.cookie("Learun_ADMS_V6.1_Token"),
			loginMark: top.$.cookie("Learun_ADMS_V6.1_Mark"),
		};
		return g
	}
	f.workflowapi = {
		bootstraper: function(h) {
			var g = {
				isNew: true,
				processId: "",
				schemeCode: "",
			};
			a.extend(g, h);
			var i = c();
			i.data = JSON.stringify({
				isNew: g.isNew,
				processId: g.processId,
				schemeCode: g.schemeCode
			});
			e(b.bootstraper, i, function(j) {
				if(j != null) {
					if(j.status == 1) {
						h.callback(true, j.data)
					} else {
						f.alert.error(j.desc);
						h.callback(false)
					}
				} else {
					f.alert.error("获取流程信息失败!");
					h.callback(false)
				}
			}, "正在获取流程信息...")
		},
		create: function(h) {
			var g = {
				isNew: true,
				processId: "",
				schemeCode: "",
			};
			a.extend(g, h);
			var i = c();
			i.data = JSON.stringify({
				isNew: g.isNew,
				processId: g.processId,
				schemeCode: g.schemeCode,
				processName: g.processName,
				processLevel: g.processLevel,
				description: g.description,
				formData: h.formData
			});
			e(b.create, i, function(j) {
				if(j != null) {
					if(j.status == 1) {
						h.callback(true)
					} else {
						f.alert.error(j.desc);
						h.callback(false)
					}
				} else {
					f.alert.error("创建流程失败!");
					h.callback(false)
				}
			}, "正在创建流程实例...")
		},
		taskinfo: function(h) {
			var g = {
				isNew: false,
				processId: "",
				taskId: "",
			};
			a.extend(g, h);
			var i = c();
			i.data = JSON.stringify({
				isNew: g.isNew,
				processId: g.processId,
				taskId: g.taskId
			});
			e(b.taskinfo, i, function(j) {
				if(j != null) {
					if(j.status == 1) {
						h.callback(true, j.data)
					} else {
						f.alert.error(j.desc);
						h.callback(false)
					}
				} else {
					f.alert.error("获取流程信息失败!");
					h.callback(false)
				}
			}, "正在获取流程信息...")
		},
		audit: function(h) {
			var g = {
				verifyType: "",
				taskId: "",
			};
			a.extend(g, h);
			var i = c();
			i.data = JSON.stringify({
				taskId: g.taskId,
				verifyType: g.verifyType,
				description: g.description,
				auditorId: g.auditorId,
				auditorName: g.auditorName,
				formData: h.formData
			});
			e(b.audit, i, function(j) {
				if(j != null) {
					if(j.status == 1) {
						h.callback(true)
					} else {
						f.alert.error(j.desc);
						h.callback(false)
					}
				} else {
					f.alert.error("流程审核失败!");
					h.callback(false)
				}
			}, "正在审核流程实例...")
		},
		processinfo: function(h) {
			var g = {
				isNew: false,
				processId: "",
				taskId: "",
			};
			a.extend(g, h);
			var i = c();
			i.data = JSON.stringify({
				isNew: false,
				processId: g.processId,
				taskId: g.taskId
			});
			e(b.processinfo, i, function(j) {
				if(j != null) {
					if(j.status == 1) {
						h.callback(true, j.data)
					} else {
						f.alert.error(j.desc);
						h.callback(false)
					}
				} else {
					f.alert.error("获取流程信息失败!");
					h.callback(false)
				}
			}, "正在获取流程信息...")
		},
	}
})(jQuery, top.learun);
(function(a, b) {
	a.fn.lrcontextmenu = function(e) {
		var d = {
			menulist: [],
			before: false
		};
		a.extend(d, e || {});
		var c = a(this);
		d.id = c.attr("id");
		if(!d.id) {
			return false
		}
		if(!!c[0]._lrcontextmenu) {
			return false
		}
		c[0]._lrcontextmenu = {
			dfop: d
		};
		c.on("contextmenu", function(n) {
			n.preventDefault();
			var g = a(this);
			var m = g[0]._lrcontextmenu.dfop;
			var r = m.id + "_contextmenu_wrap";
			var j = a("#" + r);
			if(j.length > 0) {
				if(!!m.before) {
					m.before(n, j)
				}
				j.show()
			} else {
				j = a('<div class="lr-contextmenu-wrap" id="' + r + '" ><ul class="lr-contextmenu-ul"></ul></div>');
				var h = j.find(".lr-contextmenu-ul");
				for(var o = 0, q = m.menulist.length; o < q; o++) {
					var p = m.menulist[o];
					var f = a('<li data-value="' + p.id + '" ><a href="javascript:;"><span>' + p.text + "</span><a></li>");
					f.on("click", p.click);
					h.append(f)
				}
				a("body").append(j);
				j.show();
				if(!!m.before) {
					m.before(n, j)
				}
			}
			var k = a(window).scrollTop() + n.clientY,
				s = (j.width() + n.clientX < a(window).width()) ? n.clientX : n.clientX - j.width(),
				t = (j.height() + n.clientY < a(window).height()) ? k : k - j.height();
			j.css({
				left: s,
				top: t
			})
		});
		a(document).on("click", function() {
			var g = d.id + "_contextmenu_wrap";
			var f = a("#" + g);
			f.hide()
		})
	}
})(jQuery, top.learun);
(function($, learun) {
	var userinfo;
	var imChat;
	var isLoaded = 0;
	$.imServer = {
		init: function() {
			$.imServer.getUserInfo(function() {})
		},
		connect: function() {
			$.ajax({
				url: userinfo.imUrl + "/hubs",
				type: "get",
				dataType: "text",
				success: function(data) {
					eval(data);
					console.log(userinfo);
					$.connection.hub.url = userinfo.imUrl;
					$.connection.hub.qs = {
						userId: userinfo.userId
					};
					imChat = $.connection.ChatsHub;
					$.imServer.registerClient();
					$.connection.hub.start().done(function() {
						$.imServer.afterSuccess()
					});
					$.connection.hub.disconnected(function() {
						$.imServer.disconnected()
					})
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					isLoaded = -1
				},
			})
		},
		afterSuccess: function() {
			isLoaded = 1
		},
		disconnected: function() {},
		registerClient: function() {
			if(imChat) {
				imChat.client.revMsg = function(formUser, msg, dateTime) {}
			}
		},
		registerServer: function() {
			$.imServer.getUserList = function(departmentId, callback) {
				console.log(isLoaded);
				if(isLoaded == 1) {
					imChat.server.getUserList(departmentId).done(function(list) {
						if(!!callback) {
							callback(list)
						}
					})
				} else {
					if(isLoaded == 0) {
						setTimeout(function() {
							$.imServer.getUserList(departmentId, callback)
						}, 500)
					}
				}
			}
		},
		getUserInfo: function(callback) {
			userinfo = learun.clientdata.get(["userinfo"]);
			if(!!userinfo) {
				callback()
			} else {
				setTimeout(function() {
					$.imServer.getUserInfo(callback)
				}, 100)
			}
		}
	}
})(jQuery, top.learun);
(function(a, c) {
	var d;
	var b = false;
	a.lrIM = {
		init: function() {
			a._lrIM.render()
		},
		addMsgTolist: function(h, k, j, i) {
			var f = a("#learun_im_last_list");
			var e = f.find('[data-value="' + h + '"]');
			if(e.length > 0) {} else {
				var g = '<li data-value="' + h + '">';
				g += '<img src="' + top.$.rootUrl + "/images/learunim/" + i + '">';
				g += "";
				g += '<div class="lr-im-onemsg">';
				g += '<p class="lr-im-onemsg-title">' + k + "</p>";
				g += '<p class="lr-im-onemsg-content">' + j + "</p>";
				g += "</div></li>"
			}
		},
		updateMsgNum: function(e, f) {}
	};
	a._lrIM = {
		render: function() {
			var f = '<div class="lr-im-icon"  ><a href="javascript:;" id="lr_imicon_btn" title="企业内部通讯"><i class="fa fa-commenting"></i><span class="label label-success"></span></a></div>';
			f += '<div class="lr-im-wrap" >';
			f += '<div class="lr-im-user-list" style="display:none;" id="learun_im_list" >';
			f += '<div class="lr-im-header">企业内部通讯<div class="lr-im-close"><a id="learun_im_close" href="javascript:;">×</a></div></div>';
			f += '<div class="lr-im-search"><input type="text" placeholder="搜索：同事名称、讨论组名称"><i class="fa fa-search"></i></div>';
			f += '<div class="lr-im-body">';
			f += '<div class="lr-im-body-nav" id="learun_im_list_nav" ><ul>';
			f += '<li class="active nav_tab" data-value="last"><a title="最近回话"><i class="fa fa-comment"></i></a></li>';
			f += '<li class="nav_tab" data-value="user"><a title="联系人"><i class="fa fa-user"></i></a></li>';
			f += '<li class="nav_tab" data-value="group"><a title="讨论组"><i class="fa fa-users" style="font-size: 20px;"></i></a></li>';
			f += "</ul></div>";
			f += '<div class="lr-im-body-list" id="learun_im_body_list">';
			f += '<div id="learun_im_last_list" class="learun_im_body_ul active" ></div>';
			f += '<div id="learun_im_user_list" class="learun_im_body_user" style="display:none;" ><div class="lr-top-department" > <div id="im_department"></div> </div><div class="lr-userlist-content" id="lr_userlist_content" > <ul id="lr_userlist" class="lr-im-chatlist"></ul></div></div>';
			f += '<div id="learun_im_group_list" class="learun_im_body_ul" style="display:none;" ></div>';
			f += "</div>";
			f += "</div>";
			f += "</div>";
			f += '<div class="lr-im-window" style="display:none;" id="learun_im_window">';
			f += '<div class="lr-im-window-header"><span class="text"></span><div class="close"><a href="javascript:;">×</a></div></div>';
			f += '<div class="lr-im-window-chat">';
			f += '<div class="lr-im-window-content">';
			f += "</div></div>";
			f += '<div class="lr-im-window-tool"><a class="lr-im-window-tool-chatlogbtn "><i class="fa fa-clock-o"></i>沟通记录</a></div>';
			f += '<div class="lr-im-window-send"><textarea autofocus placeholder="按回车发送消息,shift+回车换行"></textarea></div>';
			f += "</div>";
			f += "</div>";
			a("body").append(f);
			a("#lr_imicon_btn").on("click", function() {
				var g = a("#learun_im_list");
				if(g.is(":hidden")) {
					g.show()
				}
			});
			a("#learun_im_close").on("click", function() {
				var g = a("#learun_im_list");
				var h = a("#learun_im_window");
				g.hide();
				h.hide()
			});
			a("#learun_im_list_nav li").on("click", function() {
				var i = a(this);
				if(!i.hasClass("active")) {
					var h = i.parent();
					h.find(".active").removeClass("active");
					i.addClass("active");
					var j = "#learun_im_" + i.attr("data-value") + "_list";
					var g = a(j);
					a("#learun_im_body_list>div.active").removeClass("active").hide();
					g.addClass("active").show()
				}
			});
			a("#learun_im_body_list").delegate(".lr-user-item", "click", function(h) {
				var g = a(this);
				var i = g.attr("data-value");
				var j = g.find("a").text();
				console.log(i);
				a._lrIM.openWindow(i, j)
			});
			var e = a("#learun_im_window .lr-im-window-send");
			e.delegate("textarea", "keypress", function(g) {
				var h = g.keyCode || g.which || g.charCode;
				var j = g.shiftKey || g.metaKey;
				if(j && h == "13") {} else {
					if(h == "13" && b) {
						var i = a(this).val();
						if(i) {
							a._lrIM.addRightMsg(d.realName, c.getDate("yyyy-MM-dd hh:mm"), a._lrIM.getUserImg(), i)
						}
						a("#learun_im_window .lr-im-window-send").html('<textarea autofocus placeholder="按回车发送消息,shift+回车换行"></textarea>');
						setTimeout(function() {
							a("#learun_im_window .lr-im-window-send>textarea").focus()
						}, 100);
						g.preventDefault();
						return false
					}
				}
			});
			a("#im_department").lrselect({
				type: "tree",
				maxHeight: 343,
				allowSearch: true,
				url: top.$.rootUrl + "/LR_OrganizationModule/Department/GetTree",
				param: {
					companyId: "",
					parentId: ""
				},
				placeholder: "请选择部门",
				select: function(h) {
					var g = a("#lr_userlist");
					g.html("");
					a.imServer.getUserList(h.value, function(i) {
						a.each(i, function(j, k) {
							g.append(a._lrIM.getUserHtml(k))
						})
					})
				}
			});
			d = c.clientdata.get(["userinfo"]);
			a("#im_department").lrselectSet(d.departmentId);
			a("#lr_userlist_content").mCustomScrollbar({
				theme: "minimal-dark"
			});
			a("#learun_im_window .lr-im-window-chat").mCustomScrollbar({
				theme: "minimal-dark"
			})
		},
		initData: function() {},
		getUserHtml: function(f) {
			if(f.F_UserId != d.userId) {
				var e = "";
				if(c.isExistImg(top.$.rootUrl + f.F_HeadIcon)) {
					headimg = top.$.rootUrl + f.F_HeadIcon
				} else {
					if(f.F_Gender != 0) {
						headimg = top.$.rootUrl + "/images/head/on-boy.jpg"
					} else {
						headimg = top.$.rootUrl + "/images/head/on-girl.jpg"
					}
				}
				e = '<li class="lr-user-item" data-value="' + f.F_UserId + '"  ><img class="headimg" src="' + headimg + '"><a>' + f.F_RealName + "</a></li>";
				return e
			}
		},
		getUserImg: function() {
			var e = "";
			if(c.isExistImg(top.$.rootUrl + d.headIcon)) {
				e = top.$.rootUrl + d.headIcon
			} else {
				if(d.gender != 0) {
					e = top.$.rootUrl + "/images/head/on-boy.jpg"
				} else {
					e = top.$.rootUrl + "/images/head/on-girl.jpg"
				}
			}
			return e
		},
		openWindow: function(f, g) {
			var e = a("#learun_im_window");
			e.attr("data-value", f);
			e.find(".lr-im-window-header>.text").text(g);
			a("#learun_im_window .lr-im-window-content").html("");
			e.show();
			b = true
		},
		addRightMsg: function(i, e, g, h) {
			var f = '<div class="right"><div class="author-name">';
			f += '<small class="chat-date">' + e + "</small>";
			f += '<small class="chat-text">' + i + "</small>";
			f += '<img src="' + g + '" />';
			f += "</div>";
			f += '<div class="chat-message"><em></em>' + h + "</div></div>";
			a("#learun_im_window .lr-im-window-content").append(f);
			a("#learun_im_window .lr-im-window-chat").mCustomScrollbar("scrollTo", "bottom")
		}
	}
})(jQuery, top.learun);
var loaddfimg;
(function(a, b) {
	var c = {
		init: function() {
			if(a("body").hasClass("IE") || a("body").hasClass("InternetExplorer")) {
				a("#lr_loadbg").append('<img src="' + top.$.rootUrl + '/images/ie-loader.gif" style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;vertical-align: middle;">');
				Pace.stop();
				a.imServer.init()
			} else {
				Pace.on("done", function() {
					a("#lr_loadbg").fadeOut();
					Pace.options.target = "#learunpacenone";
					a.imServer.init()
				})
			}
			toastr.options = {
				closeButton: true,
				debug: false,
				newestOnTop: true,
				progressBar: false,
				positionClass: "toast-bottom-right",
				preventDuplicates: false,
				onclick: null,
				showDuration: "300",
				hideDuration: "1000",
				timeOut: "3000",
				extendedTimeOut: "1000",
				showEasing: "swing",
				hideEasing: "linear",
				showMethod: "fadeIn",
				hideMethod: "fadeOut"
			};
			b.frameTab.open({
				F_ModuleId: "0",
				F_Icon: "fa fa-desktop",
				F_FullName: "首页模板",
				F_UrlAddress: "/home/AdminDesktopTemp.html"
			}, true);
			b.clientdata.init(function() {
				c.userInit();
				bootstrap(a, b);
				if(a("body").hasClass("IE") || a("body").hasClass("InternetExplorer")) {
					a("#lr_loadbg").fadeOut()
				}
			});
			c.loadbarInit();
			c.fullScreenInit();
			c.uitheme()
		},
		userInit: function() {
			var f = b.clientdata.get(["userinfo"]);
			var e;
			if(f.gender != 0) {
				e = top.$.rootUrl + "/images/head/on-boy.jpg"
			} else {
				e = top.$.rootUrl + "/images/head/on-girl.jpg"
			}
			loaddfimg = function() {
				document.getElementById("userhead").src = e
			};
			var d = '<div class="lr-frame-personCenter"><a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">';
			d += '<img id="userhead" src="' + top.$.rootUrl + f.headIcon + '" alt="用户头像" onerror="loaddfimg()" >';
			d += "<span>" + f.realName + "</span>";
			d += "</a>";
			d += '<ul class="dropdown-menu pull-right">';
			d += '<li><a href="javascript:void(0);" id="lr_userinfo_btn"><i class="fa fa-user"></i>个人信息</a></li>';
			d += '<li><a href="javascript:void(0);" id="lr_schedule_btn"><i class="fa fa-calendar"></i>我的日程</a></li>';
			d += '<li class="divider"></li>';
			if(f.isSystem) {
				d += '<li><a href="javascript:void(0);" id="lr_clearredis_btn"><i class="fa fa-refresh"></i>清空缓存</a></li>';
				d += '<li class="divider"></li>'
			}
			d += '<li><a href="javascript:void(0);" id="lr_loginout_btn"><i class="fa fa-power-off"></i>安全退出</a></li>';
			d += "</ul></div>";
			a("body").append(d);
			a("#lr_loginout_btn").on("click", c.loginout);
			a("#lr_userinfo_btn").on("click", c.openUserCenter);
			a("#lr_clearredis_btn").on("click", c.clearredis)
		},
		loginout: function() {
			b.layerConfirm("注：您确定要安全退出本次登录吗？", function(d) {
				if(d) {
					b.loading(true, "退出系统中...");
					b.httpAsyncPost(a.rootUrl + "/Login/OutLogin", {}, function(e) {
						window.location.href = a.rootUrl + "/Login/Index"
					})
				}
			})
		},
		clearredis: function() {
			b.layerConfirm("注：您确定要清空全部后台缓存数据吗？", function(d) {
				if(d) {
					b.loading(true, "清理缓存数据中...");
					b.httpAsyncPost(a.rootUrl + "/Home/ClearRedis", {}, function(e) {
						window.location.href = a.rootUrl + "/Login/Index"
					})
				}
			})
		},
		openUserCenter: function() {
			b.frameTab.open({
				F_ModuleId: "1",
				F_Icon: "fa fa-user",
				F_FullName: "个人中心",
				F_UrlAddress: "/UserCenter/Index"
			})
		},
		fullScreenInit: function() {
			var d = '<div class="lr_frame_fullscreen"><a href="javascript:void(0);" id="lr_fullscreen_btn" title="全屏"><i class="fa fa-arrows-alt"></i></a></div>';
			a("body").append(d);
			a("#lr_fullscreen_btn").on("click", function() {
				if(!a(this).attr("fullscreen")) {
					a(this).attr("fullscreen", "true");
					c.requestFullScreen()
				} else {
					a(this).removeAttr("fullscreen");
					c.exitFullscreen()
				}
			})
		},
		requestFullScreen: function() {
			var d = document.documentElement;
			if(d.requestFullscreen) {
				d.requestFullscreen()
			} else {
				if(d.mozRequestFullScreen) {
					d.mozRequestFullScreen()
				} else {
					if(d.webkitRequestFullScreen) {
						d.webkitRequestFullScreen()
					}
				}
			}
		},
		exitFullscreen: function() {
			var d = document;
			if(d.exitFullscreen) {
				d.exitFullscreen()
			} else {
				if(d.mozCancelFullScreen) {
					d.mozCancelFullScreen()
				} else {
					if(d.webkitCancelFullScreen) {
						d.webkitCancelFullScreen()
					}
				}
			}
		},
		loadbarInit: function() {
			var d = '<div class="lr-loading-bar" id="lr_loading_bar" >';
			d += '<div class="lr-loading-bar-bg"></div>';
			d += '<div class="lr-loading-bar-message" id="lr_loading_bar_message"></div>';
			d += "</div>";
			a("body").append(d)
		},
		uitheme: function() {
			var g = top.$.cookie("Learn_ADMS_V6.1_UItheme") || "1";
			var e = a('<div class="lr-theme-setting"></div>');
			var d = a('<button class="btn btn-default"><i class="fa fa-spin fa-gear"></i></button>');
			var f = '<div class="panel-heading">界面风格</div>';
			f += '<div class="panel-body">';
			f += '<div><label><input type="radio" name="ui_theme" value="1" ' + (g == "1" ? "checked" : "") + ">经典版</label></div>";
			f += '<div><label><input type="radio" name="ui_theme" value="2" ' + (g == "2" ? "checked" : "") + ">风尚版</label></div>";
			f += '<div><label><input type="radio" name="ui_theme" value="3" ' + (g == "3" ? "checked" : "") + ">炫动版</label></div>";
			f += '<div><label><input type="radio" name="ui_theme" value="4" ' + (g == "4" ? "checked" : "") + ">飞扬版</label></div>";
			f += "</div>";
			e.append(d);
			e.append(f);
			a("body").append(e);
			d.on("click", function() {
				var h = a(this).parent();
				if(h.hasClass("opened")) {
					h.removeClass("opened")
				} else {
					h.addClass("opened")
				}
			});
			e.find("input").click(function() {
				var h = a(this).val();
				top.$.cookie("Learn_ADMS_V6.1_UItheme", h, {
					path: "/"
				});
				window.location.href = a.rootUrl + "/Home/Index"
			})
		},
	};
	a(function() {
		c.init()
	})
})(window.jQuery, top.learun);