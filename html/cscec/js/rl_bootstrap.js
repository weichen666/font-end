var bootstrap = function(a, c) {
	var b = ["2e99d4", "fe8977 ", "9dd6d7  ", "b5adab", "8ebdd4", "edd46e", "64cfa7", "FFA300", "708FE3", "D972E3", "56BD4E", "1ABC9C", "2e99d4"];
	var d = {
		init: function() {
			var e = a(".lr-frame-menu");
			e.append('<em></em><div class="lr-second-menu-wrap" id="lr_second_menu_wrap"></div><div class="lr-frame-menu-overlay" id="lr_frame_menu_overlay"></div>');
			this.load();
			this.bind()
		},
		load: function() {
			var w = c.clientdata.get(["modulesTree"]);
			var x = "0";
			var v = w[x] || [];
			var g = a('<ul class="lr-first-menu-list"></ul>');
			for(var p = 0, s = v.length; p < s; p++) {
				var q = v[p];
				if(q.F_IsMenu == 1) {
					var e = a("<ul></ul>");
					if(q.F_Target != "expand") {
						e.append(d.getAppItem(q))
					}
					var f = a("<li></li>");
					if(!!q.F_Description) {
						f.attr("title", q.F_Description)
					}
					var u = '<a id="' + q.F_ModuleId + '" href="javascript:void(0);" class="lr-menu-item">';
					u += '<i class="' + q.F_Icon + ' lr-menu-item-icon"></i>';
					u += '<span class="lr-menu-item-text">' + q.F_FullName + "</span>";
					u += '<span class="lr-menu-item-arrow"></span></a>';
					f.append(u);
					var B = w[q.F_ModuleId] || [];
					var k = a('<ul class="lr-second-menu-list"></ul>');
					var A = false;
					for(var r = 0, C = B.length; r < C; r++) {
						var y = B[r];
						if(y.F_IsMenu == 1) {
							if(y.F_Target != "expand") {
								e.append(d.getAppItem(y))
							}
							A = true;
							var h = a("<li></li>");
							if(!!y.F_Description) {
								h.attr("title", y.F_Description)
							}
							var z = '<a id="' + y.F_ModuleId + '" href="javascript:void(0);" class="lr-menu-item" >';
							z += '<i class="' + y.F_Icon + ' lr-menu-item-icon"></i>';
							z += '<span class="lr-menu-item-text">' + y.F_FullName + "</span>";
							z += "</a>";
							h.append(z);
							var G = w[y.F_ModuleId] || [];
							var o = a('<ul class="lr-three-menu-list"></ul>');
							var F = false;
							for(var t = 0, H = G.length; t < H; t++) {
								var D = G[t];
								if(D.F_IsMenu == 1) {
									if(D.F_Target != "expand") {
										e.append(d.getAppItem(D))
									}
									F = true;
									var n = a("<li></li>");
									n.attr("title", D.F_FullName);
									var E = '<a id="' + D.F_ModuleId + '" href="javascript:void(0);" class="lr-menu-item" >';
									E += '<i class="' + D.F_Icon + ' lr-menu-item-icon"></i>';
									E += '<span class="lr-menu-item-text">' + D.F_FullName + "</span>";
									E += "</a>";
									n.append(E);
									o.append(n)
								}
							}
							if(F) {
								h.addClass("lr-meun-had");
								h.find("a").append('<span class="lr-menu-item-arrow"><i class="fa fa-angle-left"></i></span>');
								h.append(o)
							}
							k.append(h)
						}
					}
					if(A) {
						k.attr("data-value", q.F_ModuleId);
						a("#lr_second_menu_wrap").append(k)
					}
					g.append(f);
					if(e.find("li").length > 0) {
						a("#lr_applist_slidebox").append(e);
						a(".lr-applist-slidebox-slider-content").append('<li><i class="fa fa-circle"></i></li>')
					}
				}
			}
			a("#lr_frame_menu").html(g)
		},
		bind: function() {
			a("#lr_frame_menu").mCustomScrollbar({
				theme: "minimal-dark"
			});
			a("#lr_second_menu_wrap").mCustomScrollbar({
				theme: "minimal-dark"
			});
			a("#lr_frame_menu_overlay").on("click", d.startMenuClick);
			a("#lr_frame_menu a").on("click", function() {
				var f = a(this);
				var h = f.attr("id");
				var g = c.clientdata.get(["modulesMap", h]);
				switch(g.F_Target) {
					case "iframe":
						d.startMenuClick();
						setTimeout(function() {
							if(c.validator.isNotNull(g.F_UrlAddress).code) {
								c.frameTab.open(g)
							} else {}
						}, 250);
						break;
					case "expand":
						var e = f.parent();
						if(!e.hasClass("active")) {
							a("#lr_frame_menu li.active").removeClass("active");
							e.addClass("active");
							a("#lr_second_menu_wrap .lr-second-menu-list").hide();
							a('#lr_second_menu_wrap .lr-second-menu-list[data-value="' + g.F_ModuleId + '"]').show()
						}
						break
				}
			});
			a("#lr_second_menu_wrap a").on("click", function() {
				var e = a(this);
				var h = e.attr("id");
				var g = c.clientdata.get(["modulesMap", h]);
				switch(g.F_Target) {
					case "iframe":
						d.startMenuClick();
						setTimeout(function() {
							if(c.validator.isNotNull(g.F_UrlAddress).code) {
								c.frameTab.open(g)
							} else {}
						}, 250);
						break;
					case "expand":
						var f = e.next();
						if(f.is(":visible")) {
							f.slideUp(500, function() {
								e.removeClass("open")
							})
						} else {
							f.parents(".lr-second-menu-list").find(".lr-three-menu-list").slideUp(300, function() {
								a(this).prev().removeClass("open")
							});
							f.slideDown(300, function() {
								e.addClass("open")
							})
						}
						break
				}
			});
			a(".lr-first-menu-list>li").eq(0).find("a").trigger("click");
			a(".lr-applist-slidebox-slider-content li").click(function() {
				var f = a(this);
				if(!f.hasClass("active")) {
					var e = a(".lr-applist-slidebox-slider-content li.active");
					e.removeClass("active");
					f.addClass("active");
					var h = e.index();
					var g = a(this).index();
					a("#lr_applist_slidebox ul").eq(h).hide();
					a("#lr_applist_slidebox ul").eq(g).fadeIn("slow")
				}
			});
			a("#lr_applist_btn").on("click", function() {
				d.openApplist()
			});
			a("#lr_applist_slidebox .appItem").on("click", function() {
				var e = a(this);
				var g = e.attr("data-id");
				var f = c.clientdata.get(["modulesMap", g]);
				if(c.validator.isNotNull(f.F_UrlAddress).code) {
					c.frameTab.open(f)
				}
			});
			a(".lr-applist-slidebox-slider-content li").eq(0).trigger("click");
			c.frameTab.leaveFocus()
		},
		startMenuClick: function() {
			var e = a(".lr-frame-menu");
			if(e.is(":visible")) {
				e.slideUp(300)
			} else {
				e.show()
			}
		},
		getAppItem: function(g) {
			var f = Math.round(Math.random() * 9 + 1);
			var e = "";
			e += '<li class="appItem" data-id="' + g.F_ModuleId + '" href="' + g.F_UrlAddress + '">';
			e += '    <div class="icon" style="background: #' + b[f] + ';">';
			e += '        <i class="fa ' + g.F_Icon + '"></i>';
			e += "     </div>";
			e += '     <div class="icon-text">';
			e += g.F_FullName;
			e += "     </div>";
			e += "</li>";
			return e
		},
		closeApplist: function() {
			var e = a("#lr_applist_btn");
			if(!e.hasClass("off")) {
				a("#lr_applist_btn").addClass("off");
				a("#lr_applist_content").hide()
			}
		},
		openApplist: function() {
			var e = a("#lr_applist_btn");
			if(e.hasClass("off")) {
				c.frameTab.leaveFocus();
				a("#lr_applist_btn").removeClass("off");
				a("#lr_applist_content").show()
			}
		}
	};
	c.frameTab.opencallback = function() {
		d.closeApplist()
	};
	c.frameTab.closecallback = function() {
		if(c.frameTab.iframeId == "") {
			d.openApplist()
		}
	};
	d.init()
};