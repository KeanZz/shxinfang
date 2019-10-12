/***********************************
* 基本操作 WoBase.js
* Author wcfan
* LastUpdatedDate 2014-08-31
**********************************/

var WoBase = {
    showCitys: function () { //显示城市列表
        var cityList = $("#cityList");
        cityList.slideDown();
    },
    closeCitys: function () { //关闭城市列表
        var cityList = $("#cityList");
        cityList.slideUp();
    },
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return "";
    },
    setCity: function (name) {
        var paramStr = [];
        paramStr.push("type=redirect");
        if (name && name != "") {
            paramStr.push("city=" + name);
        }
        paramStr.push("u=" + window.location.href);
        paramStr.push("a=" + new Date().getTime());
        var url = "/handler/Global.aspx?" + paramStr.join('&');
        window.location.href = url;
    },
    getCity: function () {
        var params = "{}";
        var paramStr = [];
        paramStr.push("type=getcity");
        paramStr.push("a=" + new Date().getTime());
        var url = "/handler/Global.aspx?" + paramStr.join('&');
        AjaxForPost(url, params, function (data) {
            $("#thisCity").html(data[0].data);
            $(".currentCity").replaceWith(data[0].data);
            $("#thisCity").attr("city", data[1].data);
        });
    },
    showCurCity: function () {
        var city = $("#hidCity").val();
        if (city) {
            $(".logoArea #thisCity").text(city);
        }
    },
    getPageHtml: function () {
        $.ajax({
            url: "/handler/Global.aspx?a=" + new Date().getTime(),
            type: "get",
            data: { type: "getpagehtml" },
            beforeSend: function () {
                $.WoBox.loading("正在获取网页内容");
            },
            success: function (data) {
                if (data) {
                    $("#hidePageView").val(data);
                    $.WoBox.close();
                } else {
                    $.WoBox.close();
                    $.WoBox.tip("error", "获取内容失败");
                }
            }
        });
    },
    savePageHtml: function () {
        if ($("#hidePageView").val()) {
            $.ajax({
                url: "/handler/Global.aspx?a=" + new Date().getTime(),
                type: "post",
                data: { type: "savepagehtml", data: $("#hidePageView").val() },
                beforeSend: function () {
                    $.WoBox.loading("正在保存");
                },
                success: function (data) {
                    if (data == "ok") {
                        $.WoBox.close();
                        $.WoBox.tip("success", "保存成功", function () {
                            location.reload();
                        })
                    }
                    else {
                        $.WoBox.close();
                        $.WoBox.tip("error", "保存失败：" + data, function () {
                            //location.reload();
                        });
                    }
                },
                error: function (err) {
                    $.WoBox.close();
                    $.WoBox.tip("error", "保存失败,Error:" + err, function () {
                        //location.reload();
                    });
                }
            });
        } else {
            $.WoBox.tip("error", "内容为空,请重试");
        }
    },
    /**************
    * 设置select 选择   setSelect(id,1900)
    * 第三个参数可不填写
    * ***********/
    setSelect: function (id, val, isFill) { //设置<select>选择
        var stype = "text", oSelect = document.getElementById(id);
        var isAutoFill = false;
        if (oSelect) {
            if (arguments.length == 3) {
                if (typeof arguments[2] == 'boolean') {
                    isAutoFill = isFill;
                }
            }
            if (isFill) {
                var option = new Option(val, val);
                option.setAttribute("selected", "selected");
                oSelect.options.add(option);
            } else {
                for (var i = 0; i < oSelect.options.length; i++) {
                    svalue = (stype == "value") ? oSelect.options.value : oSelect.options[i].text;
                    if (svalue == val) {
                        oSelect.options[i].setAttribute("selected", "selected");
                        break;
                    }
                }
            }
        }
    },
    /*******************************
    * 设置radio选择 
    * setRadioSelect("gender",1);
    ******************************/
    setRadioSelect: function (name, val) {
        var radioList = document.getElementsByName(name);
        if (radioList.length > 0) {
            for (var i = 0; i < radioList.length; i++) {
                if (radioList[i].value == val) {
                    radioList[i].setAttribute("checked", "checked");
                    break;
                }
            }
        }
    },
    /**********************************
    * 设置checkbox选择
    * setChecked('ckb',1) 单选
    * setChecked('ckb',"1,2,3") 多选(逗号隔开)
    **********************************/
    setChecked: function (name, val) {
        var checkList = document.getElementsByName(name);
        if (checkList.length > 0) {
            for (var i = 0; i < checkList.length; i++) {
                if (val.split(',').length == 1) { //单选
                    if (checkList[i].value == val) {
                        checkList[i].setAttribute("checked", "checked");
                        break;
                    }
                } else {
                    var arrVal = val.split(',');
                    for (var j = 0; j < arrVal.length; j++) {
                        if (checkList[i].value == arrVal[j]) {
                            checkList[i].setAttribute("checked", "checked");
                            break;
                        }
                    }
                }
            }
        }
    },
    /*全选*/
    setCheckAll: function (name, obj) {
        var checkList = document.getElementsByName(name);
        if (checkList.length > 0) {
            if (!obj.isCheck) {
                for (var j = 0; j < checkList.length; j++) {
                    checkList[j].setAttribute("checked", "checked");
                }
                obj.isCheck = true;
            } else {
                for (var j = 0; j < checkList.length; j++) {
                    checkList[j].removeAttribute("checked");
                }
                obj.isCheck = false;
            }
        }
    },
    formateHTML: function (formateContent) {
        var okText = formateContent.replace(/<(\/?)(\w+)([^>]*)>/g, function (match, $1, $2, $3) {
            if ($1) {
                return "</" + $2.toLowerCase() + ">";
            }
            return ("<" + $2.toLowerCase() + $3 + ">").replace(/=(("[^"]*?")|('[^']*?')|([^\s]+))([\s>])/g, function (match2, $1, $2, $3, $4, $5, position, all) {
                if ($4) {
                    return '="' + $4 + '"' + $5;
                }
                return match2;
            });
        });
        return okText.replace(/<\/?([^>]+)(?=\=)>/g, function (lele) { return lele.toLowerCase(); });
    }
}

function AjaxForGetString(requestUrl, requestData, SuccessCallback, callBackParm, errorCallback) {
    jQuery.ajax({
        type: "GET",
        data: requestData,
        url: requestUrl,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        beforeSend: function (xhr) {

        },
        success: function (data) {
            msg = SuccessCallback(data, callBackParm);
        },
        error: function (err) {
            if (errorCallback)
                errorCallback();
        },
        complete: function () {

        }
    });
}

var setHiddenHtmlAndPath = function () {
    htmlObj = $("#hiddenNewHtml");
    htmlObj2 = $("#hiddenNewHtml2");
    htmlObj3 = $("#hiddenNewHtml3");
    pathObj = $("#hiddenFilePath");

    var divObjs = $("div[useredit='true']");
    var index = 0;
    divObjs.each(function () {
        index++;
        var strHtml =WoBase.formateHTML($(this).html());
        //strHtml = strHtml.replace(/ sab=['"]{1}[\d]['"]{1}/g, "");
        if (index == 1) {
            htmlObj.val("<div useredit=\"true\">" + strHtml + "</div>");
        }
        else if (index == 2) {
            htmlObj2.val("<div useredit=\"true\">" + strHtml + "</div>");
        }
        else if (index == 3) {
            htmlObj3.val("<div useredit=\"true\">" + strHtml + "</div>");
        }
    })

    pathObj.val(window.location.pathname);
}

var setHiddenViewHtmlAndPath = function () {
    htmlObj = $("#hiddenViewHtml");
    htmlObj2 = $("#hiddenViewHtml2");
    htmlObj3 = $("#hiddenViewHtml3");
    pathObj = $("#hiddenViewFilePath");

    var divObjs = $("div[useredit='true']");
    var index = 0;
    divObjs.each(function () {
        index++;
        var strHtml = $(this).html();
        strHtml = strHtml.replace(/ sab=['"]{1}[\d]['"]{1}/g, "");
        if (index == 1) {
            htmlObj.val("<div useredit=\"true\">" + strHtml + "</div>");
        }
        else if (index == 2) {
            htmlObj2.val("<div useredit=\"true\">" + strHtml + "</div>");
        }
        else if (index == 3) {
            htmlObj3.val("<div useredit=\"true\">" + strHtml + "</div>");
        }
    })
    pathObj.val(window.location.pathname);
}

var sumbitNewHtml = function (data) {
    if (data.data == "True") {
        $.WoBox.close();
        $.WoBox.tip("success", "保存成功", function () {
            location.reload();
        });
    }
    else {
        $.WoBox.close();
        $.WoBox.tip("error", "保存失败", function () {
            location.reload();
        });
    }
}

var sumbitViewHtml = function (data) {
    if (data.data == "True") {
        $.WoBox.close();
        window.open("viewTemple.shtml", "_blank");
    }
}

// 为各个页面排头设置切换城市选项的默认值
// city属性表示简写（若session无值则显示ip所属城市简写，若有值则显示session的所属城市简写）
// value属性表示城市名称（同上）
var setDefaultCity = function () {
    var params = "{}";
    var paramStr = [];
    paramStr.push("type=getcity");
    paramStr.push("a=" + new Date().getTime());
    var url = "/handler/Global.aspx?" + paramStr.join('&');
    AjaxForPost(url, params, function (data) {
        $("#thisCity").html(data.data);
        var params2 = "{}";
        var paramStr2 = [];
        paramStr2.push("type=getshortcity");
        paramStr2.push("a=" + new Date().getTime());
        var url2 = "/handler/Global.aspx?" + paramStr2.join('&');
        AjaxForPost(url2, params2, function (data) {
            $("#thisCity").attr("city", data.data);
        });
    });
}

// 在空白的主页获取默认城市简写（若session无值则显示ip所属城市简写，若有值则显示session的所属城市简写）
var getDefaultShortCity = function () {
    var params = "{}";
    var paramStr = [];
    paramStr.push("type=getshortcity");
    paramStr.push("a=" + new Date().getTime());
    var url = "/handler/Global.aspx?" + paramStr.join('&');
    AjaxForPost(url, params, function (data) {
        var short = data.data;
        jumpToIndex(short);
    });
}

var setDefaultShortCity = function () {
    var params = "{}";
    var paramStr = [];
    paramStr.push("type=getshortcity");
    paramStr.push("a=" + new Date().getTime());
    var url = "/handler/Global.aspx?" + paramStr.join('&');
    AjaxForPost(url, params, function (data) {
        var short = data.data;
                
    });
}

// 空白主页根据城市简写跳转
var jumpToIndex = function (shortcity) {
    window.location.href = "/" + shortcity + "/index.shtml";
}

// 若直接输入城市站点的url，则需要把该城市的简写存入session
var saveSessionForIndex = function (callback) {
    var str = window.location.pathname;
    if (str.indexOf("/") == 0) {
        str = str.substring(1, str.length);
    }
    var num = str.indexOf("/");
    var short = str.substring(0, num);
    var params = "{}";
    var paramStr = [];
    paramStr.push("type=setSession");
    paramStr.push("short=" + short);
    paramStr.push("a=" + new Date().getTime());
    var url = "/handler/Global.aspx?" + paramStr.join('&');
    AjaxForPost(url, params, function (data) {
        setDefaultCity();
        if (callback != null) {
            callback();
        }
    });
}

/*初始化提示文本*/
var initTip = function () {
    $(".ui-tip").each(function () {
        var that = $(this),
			$input = that.find(".ui-input"),
			height = that.height();
        if ($.trim($input.attr("wo-tip")) != "") {
            var next = $input.next();
            if (!next.hasClass("ui-input")) {
                var top = 0;
                if ($input.hasClass("ui-tip-textarea"))
                    top = 5;
                var $span = $("<span>").addClass("ui-a-tip").css({
                    "position": "absolute",
                    "display": "block",
                    "top": top + "px",
                    "left": "5px",
                    "color": "#666",
                    "font-size": "12px",
                    "height": height + "px",
                    "line-height": height + "px"
                }).html($input.attr("wo-tip"));
                if ($input.hasClass("ui-tip-textarea"))
                    $span.css({ "width": "", "height": "", "line-height": "" });
                $span.appendTo(that);
            }
        }
        $input.keyup(function () {
            if ($(this).val() != "") {
                $(this).next().css("opacity", "0");
            } else {
                $(this).next().css("opacity", "1");
            }
        });
    })
}

var getControl = function (obj) {
    return $("#" + obj);
}
Array.prototype.indexOf = function(val) {              
    for (var i = 0; i < this.length; i++) {  
        if (this[i] == val) return i;  
    }  
    return -1;  
};  
Array.prototype.del=function(val) {
	var n = this.indexOf(val);
	if(n<0) return this;
	else return this.slice(0,n).concat(this.slice(n+1,this.length));
}
Array.prototype.contains = function(obj) { 
  var i = this.length; 
  while (i--) { 
    if (this[i] === obj) { 
      return true; 
    } 
  } 
  return false; 
} 

window.onload = function(){
	setTimeout(function(){
		$(".topAd").slideUp();
	},8000);
	initTip();
	WoBase.showCurCity();
}

$(document).ready(function(){
	$("#keywordCommerical").keydown(function(e){
		var keycode = (e.keyCode) || (e.which) || (e.charCode),that = $(this);
		if(keycode == 13){
			var keyword = $.trim(that.val());
			if(keyword){
				window.open("http://www.ehome580.com/commercial/store.aspx?key="+escape(keyword),"_blank");
			}
		}
	});
	$("#modSearch2Input .iconSearch").click(function(){
		var keyword = $.trim($("#keywordCommerical").val());
		if(keyword){
			window.open("http://www.ehome580.com/commercial/store.aspx?key="+escape(keyword),"_blank");
		}
	});
});
