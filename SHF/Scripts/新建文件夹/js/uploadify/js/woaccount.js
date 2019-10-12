/*********************************
 * 账户基本操作
 ********************************/
var woAccount = {
	isItemExit:function(oselect,itemVal){
		var isExit = false;
		for(var i = 0;i<oselect.options.length;i++){
			if(oselect.options[i].value == itemVal){
				isExit = true;
				break;
			}
		}
		return isExit;
	},
	addItem:function(oselect,itemText,itemVal,isExist){
		if(isExist){
			if(!this.isItemExit(oselect,itemVal)){
				var item = new Option(itemText, itemVal);      
    			oselect.options.add(item);
			}
		}else{
			oselect.options.add(new Option(itemText, itemVal));
		}
	},
	emptyItem:function(oselect){
		if(oselect){
			oselect.options.length = 0;
		}
	},
	bindBusiness:function(jsonStr,areaid,businessid,emptyAreaText,emptyBusinessText){
		var that = this;
		var oarea = document.getElementById(areaid),obusiness = document.getElementById(businessid);
		if(jsonStr && oarea && obusiness){
			that.addItem(oarea,emptyAreaText,"")
			for(var i = 0;i<jsonStr.area.length;i++){
				that.addItem(oarea,jsonStr.area[i].name,jsonStr.area[i].name);
			}
		}
		this.addItem(obusiness,emptyBusinessText,"")
		$("#"+areaid).change(function(){
			if($(this).val()!=""){
				var businessList = null;
				for(var i=0;i<jsonStr.area.length;i++){
					if(jsonStr.area[i].name == $(this).val()){
						businessList = jsonStr.area[i].business;
						break;
					}
				}
				if(businessList){
					obusiness.options.length = 0;
					for(var i=0;i<businessList.length;i++){
						that.addItem(obusiness,businessList[i],businessList[i])
					}
				}
			}else{
				that.emptyItem(obusiness);
				that.addItem(obusiness,emptyBusinessText,"")
			}
		});
	}
}
