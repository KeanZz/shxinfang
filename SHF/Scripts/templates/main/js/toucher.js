/**
 * @author 鍓т腑浜�
 * @github https://github.com/bh-lay/toucher
 * @modified 2016-5-25 23:27
 * 
 */

 
(function(global,doc,factoryFn){
	//鍒濆鍖杢oucher涓绘柟娉�
	var factory = factoryFn(global,doc);
	
	//鎻愪緵window.util.toucher()鎺ュ彛
	global.util = global.util || {};
	global.util.toucher = global.util.toucher || factory;
	
	//鎻愪緵CommonJS瑙勮寖鐨勬帴鍙�
	global.define && define(function(require,exports,module){
		return factory;
	});
})(this,document,function(window,document){

	/**
	* class 鎿嶄綔
	*/
	var supports_classList = !!document.createElement('div').classList,
		// 鏄惁鍚湁鏌愪釜 class
		hasClass = supports_classList ? function( node, classSingle ){
			return node && node.classList && node.classList.contains( classSingle );
		} : function ( node, classSingle ){
			if( !node || typeof( node.className ) !== 'string'  ){
				return false;
			}
			return !! node.className.match(new RegExp('(\\s|^)' + classSingle + '(\\s|$)'));
		};
	var supportTouch = "ontouchend" in document ? true : false;
	/**
	 * @method 浜嬩欢瑙﹀彂鍣�
	 * @description 鏍规嵁浜嬩欢鏈€鍘熷琚Е鍙戠殑target锛岄€愮骇鍚戜笂杩芥函浜嬩欢缁戝畾
	 * 
	 * @param string 浜嬩欢鍚�
	 * @param object 鍘熺敓浜嬩欢瀵硅薄
	 */
	function EMIT(eventName,e){
		this._events = this._events || {};
		//浜嬩欢鍫嗘棤璇ヤ簨浠讹紝缁撴潫瑙﹀彂
		if(!this._events[eventName]){
			return;
		}
		//璁板綍灏氭湭琚墽琛屾帀鐨勪簨浠剁粦瀹�
		var rest_events = this._events[eventName];
		
		//浠庝簨浠舵簮锛歵arget寮€濮嬪悜涓婂啋娉�
		var target = e.target;
		while (1) {
			//鑻ユ病鏈夐渶瑕佹墽琛岀殑浜嬩欢锛岀粨鏉熷啋娉�
			if(rest_events.length ==0){
				return;
			}
			//鑻ュ凡缁忓啋娉¤嚦椤讹紝妫€娴嬮《绾х粦瀹氾紝缁撴潫鍐掓场
			if(target == this.dom || !target){
				//閬嶅巻鍓╀綑鎵€鏈変簨浠剁粦瀹�
				for(var i=0,total=rest_events.length;i<total;i++){
					var classStr = rest_events[i]['className'];
					var callback = rest_events[i]['fn'];
					//鏈寚瀹氫簨浠跺鎵橈紝鐩存帴鎵ц
					if(classStr == null){
						event_callback(eventName,callback,target,e);
					}
				}
				return;
			}
			
			//褰撳墠闇€瑕佹牎楠岀殑浜嬩欢闆�
			var eventsList = rest_events;
			//缃┖灏氭湭鎵ц鎺夌殑浜嬩欢闆�
			rest_events = [];

			//閬嶅巻浜嬩欢鎵€鏈夌粦瀹�
			for(var i=0,total=eventsList.length;i<total;i++){
				var classStr = eventsList[i]['className'];
				var callback = eventsList[i]['fn'];
				//绗﹀悎浜嬩欢濮旀墭锛屾墽琛�
				if(hasClass(target,classStr)){
					//杩斿洖false鍋滄浜嬩欢鍐掓场鍙婂悗缁簨浠讹紝鍏朵綑缁х画鎵ц
					if(event_callback(eventName,callback,target,e) == false){
						return;
					}
				}else{
					//涓嶇鍚堟墽琛屾潯浠讹紝鍘嬪洖鍒板皻鏈墽琛屾帀鐨勫垪琛ㄤ腑
					rest_events.push(eventsList[i]);
				}
			}
			//鍚戜笂鍐掓场
			target = target.parentNode;
		}
	}
	
	/**
	 * 鎵ц缁戝畾鐨勫洖璋冨嚱鏁帮紝骞跺垱寤轰竴涓簨浠跺璞�
	 * @param[string]浜嬩欢鍚�
	 * @param[function]琚墽琛屾帀鐨勫嚱鏁�
	 * @param[object]鎸囧悜鐨刣om
	 * @param[object]鍘熺敓event瀵硅薄
	 */
	function event_callback(name,fn,dom,e){
		//浼樺厛浣跨敤鑷畾涔夌殑touches锛堢洰鍓嶆槸涓轰簡瑙ｅ喅touchEnd鏃爐ouches鐨勯棶棰橈級
		var touches = e.plugTouches || e.touches,
			touch = touches.length ? touches[0] : {},
			newE = {
				type : name,
				target : e.target,
				pageX : touch.pageX,
				pageY : touch.pageY,
				clientX : touch.clientX || 0,
				clientY : touch.clientY || 0
			};
		//涓簊wipe浜嬩欢澧炲姞浜や簰鍒濆浣嶇疆鍙婄Щ鍔ㄨ窛绂�
		if(name.match(/^swipe/) && e.plugStartPosition){
			newE.startX = e.plugStartPosition.pageX;
			newE.startY = e.plugStartPosition.pageY;
			newE.moveX = newE.pageX - newE.startX;
			newE.moveY = newE.pageY - newE.startY;
		}
		//鎵ц缁戝畾浜嬩欢鐨勫洖璋冿紝骞惰褰曡繑鍥炲€�
		var call_result = fn.call(dom,newE);
		//鑻ヨ繑鍥瀎alse锛岄樆姝㈡祻瑙堝櫒榛樿浜嬩欢
		if(call_result == false){
			e.preventDefault();
			e.stopPropagation();
		}
		
		return call_result;
	}
	/**
	 * 鍒ゆ柇swipe鏂瑰悜
	 */
	function swipeDirection(x1, x2, y1, y2) {
		return Math.abs(x1 - x2) >=	Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
	}

	/**
	 * 鐩戝惉鍘熺敓鐨勪簨浠讹紝涓诲姩瑙﹀彂妯℃嫙浜嬩欢
	 * 
	 */
	function eventListener(DOM){
		var this_touch = this;

		//杞诲嚮寮€濮嬫椂闂�
		var touchStartTime = 0;
		
		//璁板綍涓婁竴娆＄偣鍑绘椂闂�
		var lastTouchTime = 0;
		
		//璁板綍鍒濆杞诲嚮鐨勪綅缃�
		var x1,y1,x2,y2;
		
		//杞诲嚮浜嬩欢鐨勫欢鏃跺櫒
		var touchDelay;
		
		//娴嬭瘯闀挎寜浜嬩欢鐨勫欢鏃跺櫒
		var longTap;
		
		//璁板綍褰撳墠浜嬩欢鏄惁宸蹭负绛夊緟缁撴潫鐨勭姸鎬�
		var isActive = false;
		//璁板綍鏈夊潗鏍囦俊鎭殑浜嬩欢
		var eventMark = null;
		//鍗曟鐢ㄦ埛鎿嶄綔缁撴潫
		function actionOver(e){
			isActive = false;
			clearTimeout(longTap);
			clearTimeout(touchDelay);
		}
		
		//鏂畾姝ゆ浜嬩欢涓鸿交鍑讳簨浠�
		function isSingleTap(){
			actionOver();
			EMIT.call(this_touch,'singleTap',eventMark);
		}
		//瑙﹀睆寮€濮�
		function touchStart(e){
			//缂撳瓨浜嬩欢
			eventMark = e;
			x1 = e.touches[0].pageX;
			y1 = e.touches[0].pageY;
			x2 = 0;
			y2 = 0;
			isActive = true;
			touchStartTime = new Date();
			EMIT.call(this_touch,'swipeStart',e);
			//妫€娴嬫槸鍚︿负闀挎寜
			clearTimeout(longTap);
			longTap = setTimeout(function(){
				actionOver(e);
				//鏂畾姝ゆ浜嬩欢涓洪暱鎸変簨浠�
				EMIT.call(this_touch,'longTap',e);
			},500);
		}
		//瑙﹀睆缁撴潫
		function touchend(e){
			//touchend涓紝鎷夸笉鍒板潗鏍囦綅缃俊鎭紝鏁呬娇鐢ㄥ叏灞€淇濆瓨涓嬫暟鎹�
			e.plugStartPosition = eventMark.plugStartPosition;
			e.plugTouches = eventMark.touches;
			
			EMIT.call(this_touch,'swipeEnd',e);
			if(!isActive){
				return;
			}
			var now = new Date();
			//鑻ユ湭鐩戝惉doubleTap锛岀洿鎺ュ搷搴�
			if(!this_touch._events.doubleTap || this_touch._events.doubleTap.length == 0){
				isSingleTap();
			}else if(now - lastTouchTime > 200){
				//寤惰繜鍝嶅簲
				touchDelay = setTimeout(isSingleTap,190);
			}else{
				clearTimeout(touchDelay);
				actionOver(e);
				//鏂畾姝ゆ浜嬩欢涓鸿繛缁袱娆¤交鍑讳簨浠�
				EMIT.call(this_touch,'doubleTap',eventMark);
			}
			lastTouchTime = now;
		}
		
		//鎵嬫寚绉诲姩
		function touchmove(e){
			//缂撳瓨浜嬩欢
			eventMark = e;
			//鍦ㄥ師鐢熶簨浠跺熀纭€涓婅褰曞垵濮嬩綅缃紙涓簊wipe浜嬩欢澧炲姞鍙傛暟浼犻€掞級
			e.plugStartPosition = {
				pageX : x1,
				pageY : y1
			};
			//鏂畾姝ゆ浜嬩欢涓虹Щ鍔ㄤ簨浠�
			EMIT.call(this_touch,'swipe',e);

			if(!isActive){
				return;
			}
			x2 = e.touches[0].pageX;
			y2 = e.touches[0].pageY;
			if(Math.abs(x1-x2)>2 || Math.abs(y1-y2)>2){
				//鏂畾姝ゆ浜嬩欢涓虹Щ鍔ㄦ墜鍔�
				var direction = swipeDirection(x1, x2, y1, y2);
				EMIT.call(this_touch,'swipe' + direction,e);
			}else{
				//鏂畾姝ゆ浜嬩欢涓鸿交鍑讳簨浠�
				isSingleTap();
			}
			actionOver(e);
		}
		if (supportTouch) {
			DOM.addEventListener('touchstart',touchStart);
			DOM.addEventListener('touchend',touchend);
			DOM.addEventListener('touchmove',touchmove);
			DOM.addEventListener('touchcancel',actionOver);
		} else {
			DOM.addEventListener('MSPointerDown',touchStart);
			DOM.addEventListener('pointerdown',touchStart);

			DOM.addEventListener('MSPointerUp',touchend);
			DOM.addEventListener('pointerup',touchend);

			DOM.addEventListener('MSPointerMove',touchmove);
			DOM.addEventListener('pointermove',touchmove);

			DOM.addEventListener('MSPointerCancel',actionOver);
			DOM.addEventListener('pointercancel',actionOver);
		}
	}
	
	/**
	 * touch绫�
	 * 
	 */
	function Touch(DOM,param){
		var param = param || {};

		this.dom = DOM;
		//瀛樺偍鐩戝惉浜嬩欢鐨勫洖璋�
		this._events = {};
		//鐩戝惉DOM鍘熺敓浜嬩欢
		eventListener.call(this,this.dom);
	}
	/**
	 * @method 澧炲姞浜嬩欢鐩戝惉
	 * @description 鏀寔閾惧紡璋冪敤
	 * 
	 * @param string 浜嬩欢鍚�
	 * @param [string] 浜嬩欢濮旀墭鑷虫煇涓猚lass锛堝彲閫夛級
	 * @param function 绗﹀悎鏉′欢鐨勪簨浠惰瑙﹀彂鏃堕渶瑕佹墽琛岀殑鍥炶皟鍑芥暟 
	 * 
	 **/
	Touch.prototype.on = function ON(eventStr,a,b){
		var className,fn;
		if(typeof(a) == 'string'){
			className = a.replace(/^\./,'');
			fn = b;
		}else{
			className = null;
			fn = a;
		}
		//妫€娴媍allback鏄惁鍚堟硶,浜嬩欢鍚嶅弬鏁版槸鍚﹀瓨鍦�
		if(typeof(fn) == 'function' && eventStr && eventStr.length){
			var eventNames = eventStr.split(/\s+/);
			for(var i=0,total=eventNames.length;i<total;i++){
			
				var eventName = eventNames[i];
				//浜嬩欢鍫嗘棤璇ヤ簨浠讹紝鍒涘缓涓€涓簨浠跺爢
				if(!this._events[eventName]){
					this._events[eventName] = [];
				}
				this._events[eventName].push({
					className : className,
					fn : fn
				});
			}
		}
		
		//鎻愪緵閾惧紡璋冪敤鐨勬敮鎸�
		return this;
	};
	
	//瀵瑰鎻愪緵鎺ュ彛
	return function (dom){
		return new Touch(dom);
	};
});