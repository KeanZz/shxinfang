/*********************************
 * Common jQuery plugin
 * Author wcfan
 * LastUpdatedDate 2014-09-10
 ********************************/

(function($){
	$.fn.extend({
		/*********************************
		 * Remind(文本框获取焦点自动隐藏提示文字)
		 * Author wcfan
		 * LastUpdatedDate 2014-09-13
		 * *******************************/
		Remind:function(fun){
			var $this=$(this),$label=$this.find("~label");
			$label.click(function(){
				$this.focus();
			});
			$this.focus(function(){
				$this.addClass("current");
			}).blur(function(){
				$this.removeClass("current");
				if($(this).val().length<=0){
					$label.show();
				}
			}).keydown(function(e){ //键盘事件
				var key = (e.keyCode) || (e.which) || (e.charCode);
				if($(this).val().length>=0){
					$label.hide();
				}
				if(key==13){
					if(typeof(fun) == 'function'){
						fun(); //回调方法
					}
				}
			});
		},
		/**************************************
		 * Slide 左右图片滑动
		 * Author wcfan
		 * LastUpdatedDate 2014-09-13 
		 **************************************/
		Slide:function(speed){
			var delay=(speed==undefined)?500:speed;
			var $this=$(this);
			var o={
				$left:$this.find("a.sleft"),
				$right:$this.find("a.sright"),
				$list:$this.find(".picList"),
				$index:$this.find("span.index"),
				$pic:$this.find(">.picSlide"),
				$count:$this.find("span.count"),
				count:$this.find(".picList li").size(),
			}
			var width=o.$pic.width(),index=parseInt(o.$index.text());
			$this.find("ul").width(o.count*width);
			var switchPic=function(i,dir){
				if(dir=="left"){
					o.$list.animate({left:"-="+width},delay,function(){
						o.$index.text(i);
					});
				}else if(dir=="right"){
					o.$list.animate({left:"+="+width},delay,function(){
						o.$index.text(i);
					});
				}
			}
			o.$left.click(function(){
				if(index>1)
					switchPic(--index,"right");
			});
			o.$right.click(function(){
				if(index<o.count)
					switchPic(++index,"left");
			});
		},
		/*********************************
		 * 项目详情页图片轮播
		 * Author wcfan
		 * LastUpdatedDate 2014-08-04
		 ********************************/
		SlideSmall:function(options){
			var defaults = {
				delay:120,
				picClass:"pic-slider",
				event:"click"
			}
			var $this = $(this),$li=$this.find("li"),
				opts = $.extend({},defaults, options),
				picLi = $("."+opts.picClass).find("li");
			picLi.hide().eq(0).show();
			$li.eq(0).find("a").addClass("cur");
			$li.bind(opts.event,function(){
				var index=$li.index($(this)[0]);
				$li.find("a").removeClass("cur");
				$(this).find("a").addClass("cur");
				picLi.hide().eq(index).fadeIn(opts.delay);
			});
		},
		/************************************
		 * Tab(选项卡)
		 * Author wcfan
		 * LastUpdatedDate 2014-09-13
		 * clickObj 点击的对象
		 * showObj 需要切换的对象
		 * method 触发动作(click,hover,mouseenter...)
		 ***********************************/
		Tab:function(options){
			var defaults = {
				className:"cur",
				clickObj:undefined,
				showObj:undefined,
				method:"click",
				method2:null,
				spec:undefined,
				callback:null,
				callback2:null,
				callbackIn:null,
				callbackOut:null
			}
			var $this = $(this),
				opts=$.extend({},defaults,options);
			$this.find(opts.clickObj).bind(opts.method,function(){
			var index = $this.find(opts.clickObj).index(this);
			if(typeof opts.callback == 'function'){
				opts.callback(index);
			}
			if(opts.spec!=undefined){
				if(index == opts.spec)
					opts.callbackIn();
				else
					opts.callbackOut();
			}
			$this.find(opts.clickObj).removeClass(opts.className);
			$(this).addClass(opts.className);
			if(opts.showObj && opts.showObj[0]){ //对象存在
				opts.showObj.addClass("hidden").eq(index).removeClass("hidden");
				
			}
			return index;
		});
			if(opts.method2){
				$this.find(opts.clickObj).bind(opts.method2,function(){
					var index = $this.find(opts.clickObj).index(this);
					if(typeof opts.callback2 == 'function'){
						opts.callback2(index);
					}
				});
			}
		},
		/*********************************
		 * CheckAll(全选及反选)
		 * Author wcfan
		 * LastUpdatedDate 2014-08-22
		 ********************************/
		CheckAll:function(obj,name){
			var $this = $(this);
			if(obj){
				$this.click(function(){
					var cklist = (name)?obj.find("input[name='"+name+"']"):obj.find("input[type='checkbox']")
					if($this.attr("checked"))
						cklist.attr("checked","checked");
					else
						cklist.removeAttr("checked");
				});
			}
		},
		/*************************
		 * 下拉框
		 ************************/
		WoSel:function(options){
			var defaults = {
				iconClass:"wosel-icon",
				width:140,
				color:null,
				borderColor:null,
				hasHeight:false,
				callback:null
			}
			var $this=$(this),len=$this.find("option").length;
			var opts=$.extend({},defaults,options);
			var $select = $("<span />").addClass("wosel").css("width",opts.width+"px"),
				$selText = $("<span />").addClass("wosel-txt "+opts.iconClass),
				defaultVal = $this.find("option[selected='selected']").val(),
				defaultText = $this.find("option[selected='selected']").text()
				$selList = $("<span />").addClass("wosel-list");
			if(opts.hasHeight)
				$selList.addClass("ohide");
			if(opts.color)
				$select.css("color",opts.color);
			if(opts.borderColor)
				$select.css("border-color",opts.borderColor);
			if($this.attr("width"))
				$select.width($this.attr("width"));
			$selText.append("<b>"+defaultText+"</b>");
			$selText.appendTo($select);
			$this.find("option").each(function(){
				var that = $(this);
				var em = $("<em />");
				if(that.attr("value"))
					em.val(that.attr("value")).text(that.text()).appendTo($selList);
				else
					em.text(that.text()).appendTo($selList);
			});
			$selList.appendTo($select);
			$select.insertAfter($this);
			var $hideInput=$("<input />").attr("type","hidden").attr("name",$this.attr("name")).attr("id",$this.attr("id")).val(defaultVal).insertAfter($this);
			$this.remove();
			$selText.click(function(){
				$selList.slideToggle();
			});
			$(document).click(function(event){
				var node = event.target.parentNode;
				if(node.className.indexOf("wosel-txt") <= -1 && node.className.indexOf("wosel-list") <= -1){
					$selList.slideUp();
				}
			})
			$selList.find("em").mouseenter(function(){
				$(this).addClass("hover");
			}).mouseleave(function(){
				$(this).removeClass("hover");
			});
			$selList.find("em").click(function(){
				var that = $(this);
				$selText.find("b").text(that.text());
				$selList.slideUp();
				$hideInput.val(that.val())
				if(typeof(opts.callback) == 'function')
					opts.callback();
			});
		},
		/******************************
		 * 下拉框美化
		 * Author wcfan
		 * LastUpdatedDate 2014-08-13
		 *****************************/
		WoSelect:function(options){
			var defaults = {
				iconClass:"icon-default"
			}
			var $this=$(this),len=$this.find("option").length;
			var opts=$.extend({},defaults,options);
			var $select=$("<div />").addClass("wo-select");
			var $selectData=$("<div />").addClass("wo-select-data");
			var $selectVal=$("<div />").addClass("wo-select-value").appendTo($selectData).text($this.val());
			var $ul=$("<ul>");
			for(var i=0;i<len;i++){
				$ul.append("<li>"+$this.find("option").eq(i).val()+"</li>");
			}
			$ul.appendTo($selectData).addClass("hidden");
			var $selectIcon=$("<div />").addClass("wo-select-arrow "+opts.iconClass).appendTo($select);
			var $hideInput=$("<input />").attr("type","hidden").attr("name",$this.attr("name")).insertAfter($this);
			$selectData.appendTo($select);
			$select.insertAfter($this);
			$this.remove();
			
			$selectIcon.click(function(){
				if($ul.hasClass("hidden")){
					$ul.removeClass("hidden");
					$ul.find("li").click(function(){
						var curVal=$(this).text();
						$selectVal.text(curVal);
						$hideInput.val(curVal);
						$ul.addClass("hidden");
					});
				}else{
					$ul.addClass("hidden");
				}
			});
		},
		/*****************************
		 * WoSlideMulite(点击图片切换)
		 * Author wcfan
		 * LastUpdatedDate 2014-09-14
		 *****************************/
		WoSlideMulite:function(options){
			var defaults = {
				interval:5,
				method:"click"
			}
			var $this = $(this) , ul = $this.find("ul");
			var _currentIndex = 0;
			var opts = $.extend({}, defaults, options);
			ul.find("li").hide().eq(0).show();
			var showImage = function(index){
				var objImg = ul.find("li img");
				if(objImg.hasClass("lazyload")){
					objImg.attr("src",objImg.attr("original"));
					objImg.load(function(){
						$(this).removeClass("lazyload");
					});
				}
			}
			showImage(0);
			$this.find(".woSlidePic a").bind(opts.method,function(){
				$this.find(".woSlidePic a").removeClass("cur");
				var index = $this.find(".woSlidePic a").index(this);
				_currentIndex = index;
				ul.find("li").hide().eq(index).fadeIn();
				$(this).addClass("cur");
				showImage(index);
			});
			var autoGo = function(){
				$this.find(".woSlidePic a").eq(_currentIndex).removeClass("cur");
				ul.find("li").eq(_currentIndex).hide();
				_currentIndex = (_currentIndex == 3)?0:(_currentIndex+1);
				$this.find(".woSlidePic a").eq(_currentIndex).addClass("cur");
				ul.find("li").eq(_currentIndex).fadeIn();
				showImage(_currentIndex);
			}
			var sAuto = setInterval(function(){
				autoGo();
			},opts.interval*1000);
			ul.mouseenter(function(){
				clearInterval(sAuto);
				sAuto = null;
			}).mouseleave(function(){
				sAuto = setInterval(function(){
					autoGo();
				},opts.interval*1000);
			});
		},
		/**************************************
		 * 多屏图片轮播
		 * Author wcfan
		 * LastupdateDate 2014-08-31
		 */
		WoSlildeMiddle:function(options){
			var defaults = {
				nextClass:"iconNext",
				prevClass:"iconPrev",
				picBottom:"bottom",
				width:672,
				interval:5,
				delay:0.5,
				showArrow:false
			}
			var that = $(this),opts = $.extend({}, defaults, options),
				btnNext = that.find("."+opts.nextClass),
				btnPrev = that.find("."+opts.prevClass),
				woArrow = that.find(".arrow"),
				woNum = that.find(".num"),
				ul = that.find("ul"),
				lis = that.find("li");
			that.index = 0;
			var width = lis.width();
			lis.find("li").removeAttr("style");
			if(woNum[0])
				woNum.find("a").removeClass("cur").first().addClass("cur");
			if(!opts.showArrow){ //显示箭头
				woArrow.hide();
				that.hover(function(){
					woArrow.show();
				},function(){
					woArrow.hide();
				});
			}
			var removeCur = function(index,num){
				woNum.find("a:eq("+index+")").removeClass("cur");
				woNum.find("a:eq("+num+")").addClass("cur");
				that.index = num;
			}
			var startSwitch = function(num,dir){
				//var index = woNum.find("a").index(woNum.find("a.cur"));
				var count = ul.find("li").size();
				if(typeof num == 'number'){
					removeCur(that.index,num);
					ul.animate({"left":-num*width+"px"},opts.delay*1000,"swing");
				}else{
					that.curIndex = 0,dir = arguments[0];
					if(dir == "left" || dir == "aleft"){ //向左
						that.curIndex = (that.index < count - 1) ? (that.index + 1) : 0;
					}else if(dir == "right"){ //向右
						that.curIndex = (that.index > 0)?(that.index - 1):(count - 1);
					}
					if(dir == "aleft"){
						ul.stop().delay(opts.interval*1000).animate({"left":-(that.curIndex*width)+"px"},opts.delay*1000,"swing",function(){
							removeCur(that.index,that.curIndex);
						});
					}else{
						removeCur(that.index,that.curIndex);
						ul.stop().animate({"left":-(that.curIndex*width)+"px"},opts.delay*1000,"swing");
					}
					if(!that.data("timerid")){
						that.data("timerid",window.setInterval(function(){
							startSwitch("left");
						},opts.interval*1000));
					}
				}
			}
			startSwitch("aleft");
			woNum.find("a").click(function(){
				var index = woNum.find("a").index($(this));
				startSwitch(that.index);
			});
			that.find(".arrow").click(function(){
				if($(this).hasClass(opts.nextClass)){
					startSwitch("left");
				}else if($(this).hasClass(opts.prevClass)){
					startSwitch("right");
				}
			});
			that.hover(function(){
				clearInterval(that.data("timerid"));
			},function(){
				that.data("timerid",window.setInterval(function(){
					startSwitch("left");
				},opts.interval*1000));
			});
		},
		/***************************
		 * 整屏图片切换
		 * Author wcfan
		 * LastUpdatedDate 2014-09-11
		 *****************************/
		WoSlideSmall:function(options){
			var defaults = {
				nextClass:"rightArrow",
				prevClass:"leftArrow",
				maxSmall:8,
				width:118
			}
			var $this = $(this),
				opts = $.extend({}, defaults, options),
				ul = $this.find("ul");
			$this.page = 1;
			var switchPic = function(dir){
				var count = $this.find("li").size();
				var maxWidth = opts.maxSmall*opts.width;
				var currentMargin = parseInt(ul.css("margin-left").replace("px",""));
				if(dir == 'next'){
					if(count > $this.page*opts.maxSmall){
						$this.page = $this.page + 1;
						ul.animate({"marginLeft":(currentMargin - maxWidth)+"px"});
					}
				}else if(dir == 'prev'){
					if($this.page > 1){
						$this.page = $this.page - 1;
						ul.animate({"marginLeft":(currentMargin + maxWidth)+"px"});
					}
				}
			}
			$this.find("."+opts.nextClass).click(function(){
				switchPic("next");
			});
			$this.find("."+opts.prevClass).click(function(){
				switchPic("prev");
			});
		}
	});
})(jQuery);

/*返回顶部*/
(function($){
	$.ToTop=$.fn.ToTop=function(options){
		var $this=(typeof(this)=="function")?null:$(this);
		var opts = $.extend({}, $.ToTop.defaults, options);
		$mainWrap=$("<div />").addClass("backTop").css({"right":opts.right+"px","bottom":opts.bottom+"px"});
		if(!opts.multiline){
			$mainWrap.appendTo("body").click(function(){
				$("html,body").animate({scrollTop:0},opts.delay);
			});
		}else{
			$this.click(function(){
				$("html,body").animate({scrollTop:0},opts.delay);
			});
		}
		var backToTop=function(){
			var st=$(document).scrollTop();
			if(!opts.multiline){
				(st>0)?$mainWrap.show():$mainWrap.hide();
			}else{
				(st>0)?$this.css("visibility","inherit"):$this.css("visibility","hidden");
			}
			if(!window.XMLHttpRequest){}
		}
		$(window).bind("scroll",backToTop);
		$(function(){backToTop()});
	}
	$.ToTop.defaults={
		delay:120,
		right:40,
		bottom:40,
		multiline:false
	};
})(jQuery);

/*****************************
 * 搜索建议
 * LastUpdatedDate 2014-09-01
 ****************************/
(function(){
	$.fn.WoSuggest = function(options){
		var $this = $(this);
		var opts = $.extend({}, $.fn.WoSuggest.defaults, options);
		var oTxt = $this.find("input"),
			suggest = $this.find("."+opts.suggestClass),
			ul = suggest.find("ul");
		suggest.hide().find("ul").empty();
		oTxt.keyup(function(event){
			if($(this).val() != ''){
				if(typeof opts.callback == 'function'){
					opts.callback();
				}
				if(suggest.find("li").size() > 0){
					suggest.show().find(".empty").remove();
					var key = event.keyCode || event.charCode || event.which;
					if(key == 38){ //向上
						
					}else if(key == 40){ //向下
						
					}
				}else{
					suggest.show();
					if(!suggest.find(".empty")[0]){
						suggest.append("<div class=\"empty\">"+opts.empty+"</div>");
					}
				}
			}else{
				suggest.hide().find(".empty").remove();
				ul.empty();
			}
		});
		suggest.find("li").click(function(){
			oTxt.val($(this).text());
			suggest.hide().find("ul").empty();
			if(typeof opts.clickEvent == 'function'){
				opts.clickEvent();
			}
		});
	}
	$.fn.WoSuggest.defaults = {
		suggestClass:"suggest",
		curClass:"cur",
		callback:null,
		clickEvent:null,
		empty:"没有查询到数据"
	};
})(jQuery);

/*加载*/
(function(){
	$.fn.WoLoad = function(options){
		var $this = $(this) , loading = $(".loading");
		var opts = $.extend({}, $.WoLoad.defaults, options);
		$this.loadComplete = false;
		var loadData = function(){ //加载函数
			if(typeof opts.loadFun == 'function'){
				loading.removeClass("hidden");
				opts.loadFun();
				$this.loadComplete = true;
			}
		}
		$(window).scroll(function(){
			var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()); 
		    if ($(document).height() <= totalheight) {
		        loadData();
		    } 
		});
	}
	$.fn.WoLoad.defaults={
		loadingClass:"loading",
		loadFun:null
	};
})(jQuery);


/***************************
 * 图片轮播 点击小图切换
 * author:wcfan
 * date:2014-01-05 14:52
 ***************************/
(function(){
	$.fn.WoSlideB = function(options){
		var $this = $(this) ,opts = $.extend({}, $.fn.WoSlideB.defaults, options);
		var $ul = $this.find("ul"),$num = $this.find(".num"),size = $ul.find("li").size();
		$this.index = 0;
		var init = function(index){
			index = (typeof index == 'undefined')?0:index;
			$ul.find("li:eq("+index+")").addClass("cur").siblings("li").removeClass("cur");
			$num.find("a:eq("+index+")").addClass("cur").siblings("a").removeClass("cur");
			$num.find("a").each(function(){
				var that = $(this);
				var $span = $("<span />").appendTo(that);
			})
		}
		var showPic = function(index){
			$num.find("a:eq("+index+")").addClass("cur").siblings("a").removeClass("cur");
			$ul.find("li:eq("+index+")").fadeIn(800,function(){
				$(this).addClass("cur").siblings("li").hide().removeClass("cur");
			});
			$this.index = index;
		}
		$num.find("a").bind(opts.method,function(){
			var that = $(this),index = $num.find("a").index(this);
			showPic(index);
		});
		init();
		var timer = setInterval(function(){
			var index = ($this.index == size - 1)?0:($this.index + 1);
			showPic(index);
		},opts.interval);
		$ul.bind("mouseenter",function(){
			clearInterval(timer);
		});
		$ul.bind("mouseleave",function(){
			timer = setInterval(function(){
				var index = ($this.index == size - 1)?0:($this.index + 1);
				showPic(index);
			},opts.interval);
		});
	};
	$.fn.WoSlideB.defaults = {
		method:"click",
		interval:3000
	}
})(jQuery);

/*************************
 * WoSlide.js
 * 图解看房大图轮换
 ***********************/
(function(){
	var sAuto = null;
	$.fn.WoSlide = function(options){
		var $this = $(this),a = $this.find(".slidePic").find("a.arrow");
		var opts = $.extend({}, $.fn.WoSlide.defaults, options);
		var btnNext = $this.find("."+opts.nextClass);
		var btnPrev = $this.find("."+opts.prevClass);
		var bottomPic = $("."+opts.picBottom);
		var bottomUl = bottomPic.find("ul");
		var curIndex = $("#"+opts.curIndex);
		a.hide();
		$this.find("li").hide().eq(0).show();
		$this.find(".slidePic").mouseenter(function(){
			a.show();
		}).mouseleave(function(){
			a.hide();
		});
		var _currentIndex = 0;
		var showImage = function(index){
			var currentImage =  $this.find(".slidePic").find("li").eq(index).find("img");
			if(currentImage.hasClass("lazyload")){ //是否已经加载完成
				currentImage.attr("src",currentImage.attr("original"));
				currentImage.load(function(){
					$(this).removeClass("lazyload");
				});
			}
		}
		showImage(0);
		var showBottom = function(index){
			var picLi = $this.find("li"),
				count = picLi.size();
			var marginLeft =parseInt(bottomUl.css("margin-left").replace("px",""),10);
			if(_currentIndex == 0){
				bottomUl.animate({"marginLeft":0});
			}
			if(_currentIndex > index && _currentIndex < count){ //向右
				if(_currentIndex > opts.maxSmall-1){
					bottomUl.animate({"marginLeft":(-opts.width+marginLeft)+"px"});
				}
			}else if(_currentIndex < index && _currentIndex >= opts.maxSmall-1){ //向左
				bottomUl.animate({"marginLeft":(marginLeft+opts.width)+"px"});
			}
		}
		var switchSmallPic = function(index){
			var oBottomPic = bottomPic.find("li");
			oBottomPic.removeClass("cur").eq(_currentIndex).addClass("cur");
		}
		var autoSwitch = function(){
			var picLi = $this.find("li"),
				count = picLi.size();
			
			picLi.eq(_currentIndex).hide();
			if(_currentIndex == count-1){
				_currentIndex = 0;
			}else{
				_currentIndex = _currentIndex+1;
			}
			showBottom(parseInt(curIndex.text())-1);
			curIndex.text(_currentIndex+1);
			picLi.eq(_currentIndex).fadeIn();
			showImage(_currentIndex);
			switchSmallPic(_currentIndex);
		}
		var switchPic = function(type,switchIndex){
			var picLi = $this.find("li"),
				count = picLi.size();
			if(typeof arguments[0] == 'string'){
				var index = parseInt(curIndex.text(),10);
				if(type == 'next'){
					if(index < count){
						picLi.eq(_currentIndex).hide();
						picLi.eq(index).fadeIn();
						showImage(index);
						_currentIndex = _currentIndex+1;
						showBottom(index-1);
						curIndex.text(index+1);
						switchSmallPic(_currentIndex);
					}
				}else if(type == 'prev'){
					if(index > 1){
						picLi.eq(_currentIndex).hide();
						_currentIndex = _currentIndex-1;
						picLi.eq(_currentIndex).fadeIn();
						showImage(_currentIndex);
						showBottom(index-1);
						curIndex.text(index-1);
						switchSmallPic(_currentIndex);
					}
				}
			}else if(typeof arguments[0] == 'number'){
				curIndex.text(_currentIndex+1);
				picLi.hide().eq(_currentIndex).fadeIn();
			}
		}
		bottomPic.find("li").mouseup(function(){
			bottomPic.find("li").removeClass("cur");
			$(this).addClass("cur");
			_currentIndex = bottomPic.find("li").index(this);
			switchPic(_currentIndex);
			showImage(_currentIndex);
			showBottom();
		});
		
		btnNext.click(function(){ //下一张
			switchPic("next");
		});
		btnPrev.click(function(){
			switchPic("prev");
		});
		bottomPic.find(".arrow").click(function(){
			var ba = $(this);
			if(ba.hasClass("leftArrow")){ //左
				switchPic("prev");
			}else if(ba.hasClass("rightArrow")){ //右
				switchPic("next");
			}
		});
		if(opts.auto){
			sAuto = setInterval(function(){
				autoSwitch();
			},opts.interval*1000)
		}
	}
	$.fn.WoSlide.stop = function(){
		if(sAuto){
			clearInterval(sAuto);
			sAuto = null;
		}
	}
	$.fn.WoSlide.defaults={
		nextClass:"iconNext",
		prevClass:"iconPrev",
		curIndex:"slideIndex",
		count:"slideCount",
		picBottom:"slideBottom",
		interval:10,
		auto:false,
		maxSmall:7,
		width:120
	};
})(jQuery);

