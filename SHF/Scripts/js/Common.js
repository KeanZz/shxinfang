WebServiceUrl = "http://localhost:1047";
//WebServiceUrl = "http://61.50.119.70:7777";//服务器地址
CallbackName = "jsoncallback";//Ajax回调名称

/**日期转换成时间字符串**/
/** date日期  **/
/** format要转换的字符串格式，默认为 "yyyy-MM-dd"格式，若没有需要的格式可自己添加 **/
function DateTimeConvert(date, format) {
    if (date == null) {
        return "";
    }
    date = date.replace(/(^\s*)|(\s*$)/g, "");
    if (date == "") {
        return "";
    }
    if (date.indexOf("Date") != -1) {
        date = eval(date.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"));
    } else {
        date = new Date(Date.parse(date));
    }
    //date = eval(date.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"));
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString();
    var twoMonth = month.length == 1 ? "0" + month : month; //月份为1位数时，前面加0
    var day = (date.getDate()).toString();
    var twoDay = day.length == 1 ? "0" + day : day; //天数为1位数时，前面加0
    var hour = (date.getHours()).toString();
    var twoHour = hour.length == 1 ? "0" + hour : hour; //小时数为1位数时，前面加0
    var minute = (date.getMinutes()).toString();
    var twoMinute = minute.length == 1 ? "0" + minute : minute; //分钟数为1位数时，前面加0
    var second = (date.getSeconds()).toString();
    var twoSecond = second.length == 1 ? "0" + second : second; //秒数为1位数时，前面加0
    var dateTime;
    if (format == "yyyy-MM-dd HH:mm:ss") {
        dateTime = year + "-" + twoMonth + "-" + twoDay + " " + twoHour + ":" + twoMinute + ":" + twoSecond;
    } else if (format == "年月日") {
        dateTime = year + "年" + month + "月" + day + "日";
    }
    else {
        dateTime = year + "-" + twoMonth + "-" + twoDay
    }
    return dateTime;
}

/**根据IsDelete字段转换是否归档描述**/
/** int数字  **/
function DataState(IsDelete) {
    if (IsDelete == 0) {
        return "正常";
    } else if (IsDelete == 1) {
        return "删除";
    } else if (IsDelete == 2) {
        return "归档";
    }
}
//获取URL参数
//使用范例：var UrlDate = new GetUrlDate(); //实例化
//          var orderNo = UrlDate.orderNo;//直接.参数名
function GetUrlDate() {
    var name, value;
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("?")
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

    var arr = str.split("&"); //各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }
}

/**改变启用禁用状态**/
/**obj当前超链接对象，itemid 选中行的主键，status 启用禁用的值，tablename 表名**/
function ChangeUseStatus(obj, itemid, status, tablename) {
    if (itemid != null && itemid != "") {
        jQuery.ajax({
            url: WebServiceUrl + "/Common/CommonFunction.ashx",//random" + Math.random(),//方法所在页面和方法名
            type: "POST",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            data: { itemid: itemid, Status: status, tablename: tablename, action: "ChangeUseStatus" },
            success: function (json) {
                if (json.result != "0") {
                    //if (status == 0) {
                    //    $(obj).next().attr("class", "Disable");
                    //} else {
                    //    $(obj).prev().attr("class", "Disable");
                    //}
                    //$(obj).attr("class", "Enable");
                    getData(1);
                } else {
                    layer.msg("操作失败！");
                }
            },
            error: function (request) {
                layer.msg("操作失败");
            }
        });
    }
}
/*************************************IFrame弹框方法***********************************************************/
var curWinindex;
function OpenIFrameWindow(title,url, width, height) {
    //iframe层
    var index = layer.open({
        type: 2,
        title: title,
        shadeClose: false,
        shade: 0.2,
        area: [width, height],
        content: url, //iframe的url
        end: function (func) {           
            GetData(1);
        }
    });
    curWinindex = index;
}
function CloseIFrameWindow() {
    layer.close(curWinindex);
}
function layerMsg(title) { //msg信息框
    layer.msg(title, {
        time: 0 //不自动关闭
        , btn: ['确定']
        , yes: function (index) {
            layer.close(index);
        }
    });
}
/****************************************结束********************************************************/

/*************************************绑定下拉框方法***********************************************************/
/// <summary>绑定下拉框方法</summary>
/// <param name="controlid" type="String">下拉框控件的id</param>
/// <param name="url" type="String">路径</param>  
/// <param name="params" type="String">传递的参数,可为{}</param>
function BindSerDropDownList(controlid, url, params) {
    var isdis = arguments[3] ? arguments[3] : false;//是否显示未分配
    $.ajax({
        url: url,
        type: "post",
        async: false,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        data: params,
        success: function (data) {
            $("#" + controlid).empty().append("<option value=''>全部</option>");
            if (isdis) {
                var extoption = controlid == "sel_User" ? "<option value='-1'>无负责人</option>" : "<option value='0'>未分配</option>";
                $("#" + controlid).append(extoption);
            }
            if (data.result != null) {
                $("#" + controlid).append(data.result);
            }
        },
        error: function () {
            layer.msg("获取失败！");
        }
    });
}
/****************************************结束********************************************************/

/**********************************************ZTree相关方法**********************************************/
//绑定Ztree树
function treeBind(treeId, url, data, setting) {
    /// <summary>绑定Ztree树</summary>
    /// <param name="treeId" type="String">树控件ul的id</param>
    /// <param name="url" type="String">JSON数据源路径</param>  
    /// <param name="data" type="String">传递的参数,可为''</param>
    /// <param name="setting" type="String">Ztree树的配置信息,可为''</param>
    /// <returns>zTree 对象</returns>
    if (setting == "") {
        setting = {
            view: {
                selectedMulti: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            }
        };
    }
    $.ajax({
        type: "post",
        url: url,
        data: data,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        async: false,
        cache: false,
        success: function (json) {
            if (json.result.length > 0) {
                var zTreeNode = json.result;
                var zTreeObj = $.fn.zTree.init($("#" + treeId), setting, zTreeNode); //返回树对象
                zTreeObj.expandNode(zTreeObj.getNodeByParam("id", 0, null), true, false, false); //展开第一个顶级节点
            } else {
                layer.msg("您没有此权限!");
            }
        },
        error: function () {
            layer.msg("Ajax请求数据失败!");
        }
    });
    //return $.fn.zTree.init($("#" + treeId), setting, zTreeNode); //返回树对象
}
//获取选择节点集合(用于ztree插件,且依赖 jquery.ztree.excheck 扩展 js )  
function getChildNodes(ulZtreeId) {
    /// <summary>获取选择节点集合(用于ztree插件,且依赖 jquery.ztree.excheck 扩展 js )</summary>
    /// <param name="ulZtreeId" type="String">Ztree树Id</param>
    /// <param name="getEndChild" type="Bool">是否只获取最低级节点的值,默认获取全部的.</param>
    var getEndChild = arguments[1] || false;

    var treeObj = $.fn.zTree.getZTreeObj(ulZtreeId);
    var treeNode = treeObj.getCheckedNodes(true);
    var data = eval(treeNode);
    var str = "";
    $.each(data, function (n, value) {
        if (getEndChild) {
            if (value.check_Child_State == '-1')  //只获取最底级节点的值
                str += value.id + ',';
        }
        else
            str += value.id + ',';

    });
    return str = str.substr(0, str.length - 1);
}

//设置指定树的节点选中(用于ztree插件,且依赖 jquery.ztree.excheck 扩展 js )  
function setNodesCheck(treeId, nodesList) {
    /// <summary>设置指定树的节点选中(用于ztree插件,且依赖 jquery.ztree.excheck 扩展 js )</summary>
    /// <param name="nodesList" type="String">节点集合(例'1,2,3')</param>
    var treeObj = $.fn.zTree.getZTreeObj(treeId);
    var strArray = nodesList.split(',');
    var nodes = null;
    treeObj.checkAllNodes(false);
    $.each(strArray, function (i, n) {
        nodes = treeObj.getNodeByParam("id", n, null);
        treeObj.checkNode(nodes, true, false, false);
    });
}

//取消指定树的节点的选中状态(用于ztree插件,且依赖 jquery.ztree.excheck 扩展 js )
function setNodesNoCheck(treeId, nodesList) {
    /// <summary>取消指定树的节点的选中状态(用于ztree插件,且依赖 jquery.ztree.excheck 扩展 js )</summary>
    /// <param name="nodesList" type="String">节点集合(例'1,2,3')</param>

    var treeObj = $.fn.zTree.getZTreeObj(treeId);
    var strArray = nodesList.split(',');
    var nodes = null;
    $.each(strArray, function (i, n) {
        nodes = treeObj.getNodeByParam("id", n, null);
        treeObj.checkNode(nodes, false, false, false);
    });
}

/**根据Status字段转换是否生成订单描述**/
/** int数字  **/
function IsProduceOrder(Status) {
    if (Status == 0) {
        return "未生成订单";
    } else if (Status == 1) {
        return "已生成订单";
    } 
}

/**********************************************结束**********************************************/


//JS操作cookies****************************************
//获取
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}


//写cookies
function setCookie(name, value) {
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//删除
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
//JS操作cookies****************************************

//多产品状态
function PDStatusStr(type) {
    var strstu;
    debugger;
    switch (type) {
        case 1: strstu = "一线提交"; break;
        case 2: strstu = "已提交总部"; break;
        case 3: strstu = "业支驳回"; break;
        case 4: strstu = "待处理"; break;
        case 5: strstu = "流程终止"; break;
        case 6: strstu = "待提交总部"; break;
        case 7: strstu = "业支已答复"; break;
        default: strstu = ""; break;
    }
    return strstu;

}

//被拒环节
function ReStatusStr(type) {
    var strstu;    
    switch (type) {
        case 0: strstu = "仅保存"; break;
        case 1: strstu = "待业务处理"; break;
        case 2: strstu = "待业支处理"; break;
        case 3: strstu = "业支已提交(待总部审核)"; break;
        case 4: strstu = "已转结"; break;
        default: strstu = ""; break;
    }
    return strstu;

}
//轩辕
function StatusStrXY(type) {
    var strstu;
    switch (type) {
        case 0: strstu = "保存未提交"; break;
        case 1: strstu = "待经理审核"; break;
        case 2: strstu = "待业支审核"; break;
        case 3: strstu = "待总部审核"; break;
        case 4: strstu = "总部回复通过"; break;
        case 5: strstu = "总部回复驳回"; break;
        case 6: strstu = "驳回(重批)"; break;
        case 7: strstu = "驳回(修改)"; break;
        default: strstu = ""; break;
    }
    return strstu;
}
//转户
function StatusStrZH(type) {
    var strstu;
    switch (type) {
        case 0: strstu = "保存未提交"; break;
        case 1: strstu = "经理已发起"; break;
        case 2: strstu = "接收方经理已审核"; break;
        case 3: strstu = "发起方高经已审核"; break;
        case 4: strstu = "接收方高经已审核"; break;
        case 5: strstu = "发起方总监已审核"; break;
        case 6: strstu = "接收方总监已审核"; break;
        case 7: strstu = "驳回"; break;
        case 8: strstu = "驳回至接收方经理"; break;
        case 9: strstu = "数据组已审核"; break;
        case 10: strstu = "业支转户完成"; break;
        case 11: strstu = "销售已发起"; break;
        case 12: strstu = "发起方经理已审核"; break;
        default: strstu = ""; break;
    }
    return strstu;
}
//提交类型
function TypeStrZH(type) {
    switch (type) {
        case 11: case 1: return "小部门内"; break;
        case 22: case 2: return "大部内跨小部"; break;
        case 33: case 3: return "跨大部"; break;
        case 44: case 4: return "跨体系"; break;
        case 5: return "品专"; break;
        case 6: return "备案"; break;
        case 7: return "V部调户"; break;
        default: return ""; break;
    }
}

//inask
function StatusStr(type) {
    var strstu;
    switch (type) {
        case '0': strstu = "保存未提交"; break;
        case '1': strstu = "待经理审批"; break;
        case '2': strstu = "待高经审批"; break;
        case '3': strstu = "待总监审批"; break;
        case '4': strstu = "待接口人上传"; break;
        case '5': strstu = "待售前审核"; break;
        case '6': strstu = "审核通过"; break;
        case '7': strstu = "驳回"; break;
        case '8': strstu = "废弃"; break;
        case '9': strstu = "待LA分配人分配"; break;
        case '10': strstu = "撤销"; break;
        case '11': strstu = "待转移"; break;
        case '12': strstu = "待二次分配"; break;
        case '13': strstu = "待LA跟进"; break;
        case '14': strstu = "介绍失败"; break;
        case '15': strstu = "待TMI分配人分配"; break;
        case '16': strstu = "待TMI跟进"; break;
        case '17': strstu = "一线发起撤销"; break;
        case '18': strstu = "待售前撤销"; break;
        case '19': strstu = "已处理"; break;
        default : strstu = ""; break;
    }
    return strstu;

}



//订单状态 合同
function ContractStatus(type) {
    switch (type) {
        case '0': return "新增合同"; break;
        case '1': return "未返回"; break;
        case '2': return "已返回"; break;
        case '3': return "作废"; break;
        case '4': return "作废销毁"; break;
        case '5': return "合同已搁置"; break;
        case '6': return "客户丢失"; break;
        case '7': return "销售丢失"; break;
        case '8': return "登报作废"; break;
        case '9': return "快递丢失"; break;
        case '10': return "未返回（合同已延期）"; break;
        case '11': return "已扣款"; break;
        case '12': return "已退款"; break;
        case '13': return "单返资质被驳回"; break;
        case '14': return "退款合同回收"; break;
        case '15': return "退款合同丢失"; break;
        default: return ""; break;
    }
}
//操作类型

function OperationType(type) {
    switch (type) {
        case '0': return "暂存合同"; break;
        case '1': return "新增合同"; break;
        case '2': return "返回合同"; break;
        case '3': return "申请修改"; break;
        case '4': return "申请重返回"; break;
        case '5': return "审批申请修改"; break;
        case '6': return "审批申请重返回"; break;
        case '7': return "修改合同参数"; break;
        case '8': return "单反资质"; break;
        case '9': return "合同延期"; break;
        case '10': return "上传附件"; break;
        case '11': return "合同已搁置"; break;
        case '12': return "作废"; break;
        case '13': return "作废销毁"; break;
        case '14': return "客户丢失"; break;
        case '15': return "销售丢失"; break;
        case '16': return "登报作废"; break;
        case '17': return "快递丢失"; break;
        case '18': return "合同未返回（合同已延期）"; break;
        case '19': return "已扣款"; break;
        case '20': return "驳回"; break;
        case '21': return "添加备注"; break;
        case '22': return "修改合同"; break;
        case '23': return "退款合同回收"; break;
        case '24': return "退款合同作废"; break;
       
        default: return ""; break;
    }
}
//续费合同状态
function RenewalStatus(type) {
    if (type == 0) {
        return "暂存合同";
    } else if (type == 1) {
        return "待经理审批";
    } else if (type == 2) {
        return "待高经审批";
    } else if (type == 3) {
        return "待合同组审批";
    } else if (type == 4) {
        return "待打印";
    } else if (type == 5) {
        return "待返回";
    } else if (type == 6) {
        return "已返回";
    } else if (type == 7) {
        return "经理驳回";
    } else if (type == 8) {
        return "高经驳回";
    } else if (type == 9) {
        return "合同组驳回";
    } else if (type == 10) {
        return "待总监审批";
    } else if (type == 11) {
        return "总监驳回";
    } else if (type == 12) {
        return "待总经理审批";
    } else if (type == 13) {
        return "总经理驳回";
    }
    else {
        return "";
    }
}



//序号
var pageNum = 1;
function pageIndex() {
    return pageNum++;
}

//列表名称长度修正
function NameLengthUpdate(Name, Length) {
    if (Name.length > Length) {
        return Name.substr(0, Length) + "...";
    }
    return Name;
}

//是否耗材
function IsConsumeToStr(type) {
    if (type == 0) {
        return "非耗材";
    } else if (type == 1) {
        return "耗材";
    }
    return "";
}

//设备类别
function EquipTypeToStr(type) {
    if (type == 0) {
        return "教学设备";
    } else if (type == 1) {
        return "科研设备";
    } else if (type == 2) {
        return "办公设备";
    }
        return "";
}

//设备来源
function EquipSourceToStr(type) {
    if (type == 0) {
        return "本院资产";
    } else if (type == 1) {
        return "资产系统";
    }
    return "";
}

function CalculateNumForSplit(strText) {
    if (typeof (strText) == "undefined" || strText.length == 0) {
        return 0;
    } else {
        var count = strText.split('|').length;
        return count;
    }
}

//获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}