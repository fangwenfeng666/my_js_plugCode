//获取特定标记内的内容
function plug_temp(){
	(typeof window.is_array !="function")&&(window.is_array=function(argument){
		return argument && (typeof argument==="object") && ("length" in argument) ? true : false ;//检测是否是数组
	});
	(typeof window.is_object !="function")&&(window.is_object=function(argument){
		return argument && (typeof argument==="object") && !("length" in argument) ? true : false ;//检测是否是对象
	});
	(typeof window.foreach !="function")&&(window.foreach=function(array_or_json,fun){
		if (is_array(array_or_json)) {
			if (typeof fun==="function") {
				for(var i=0,len=array_or_json.length;i<len;i++){
					fun(array_or_json,i,array_or_json[i]);
				}				
			}
	
		}
		if (is_object(array_or_json)) {
			if (typeof fun==="function") {
				for(var att in array_or_json){
					fun(array_or_json,att,array_or_json[att]);
				}
			}
		}
	});
	if (arguments.length>0) {
		for(var i=0,len=arguments.length;i<len;i++){
			if (typeof arguments[i]==="function") {
				arguments[i].call(this);
			}
			if (typeof arguments[i]==="object" && !("length" in arguments[i])) {
				for(var att in arguments[i]){
					this[att]=arguments[i][att];
				}
			}
		}
	}
	//回调函数要三个参数表示： 数组（或对象）,下标（key），value
	window.foreach=function(array_or_json,fun){
		if (is_array(array_or_json)) {
			if (typeof fun==="function") {
				for(var i=0,len=array_or_json.length;i<len;i++){
					fun(array_or_json,i,array_or_json[i]);
				}				
			}
	
		}
		if (is_object(array_or_json)) {
			if (typeof fun==="function") {
				for(var att in array_or_json){
					fun(array_or_json,att,array_or_json[att]);
				}
			}
		}
	}

}
plug_temp.prototype={
	replaceStr:function(arr_str,mode){
		var getArr;
		foreach(arr_str,function(arr,key,value){
			arr[key]=value.replace(mode,"");
			getArr=arr;
		});
		return getArr;
	}
	//去标记部分
	,getContent:function(strings,tag,mytag_json){
		(!strings)&&(strings=document.getElementsByTagName('html')[0].innerHTML);
		if (is_object(mytag_json)) {
			var tags=eval("/"+mytag_json.l+".+?"+mytag_json.r+"/g");
			var arr=strings.match(tags);
			return [
				this.replaceStr(arr,eval("/("+mytag_json.l+"|"+mytag_json.r+")/g"))
			];
		}
		var tag1=/{{.+?}}/g;
		var tag2=/<<<.+?>>>/g;
		var tag3=/<#.+?#>/g;
		var tag4=/<temp>.+?<\/temp>/g;
		var tag5=/<get>.+?<\/get>/g;
		switch(true){
			case tag==="<<<|>>>":
				var arr=strings.match(tag2);
				return this.replaceStr(arr,/(<<<|>>>)/g);
			break;
			case tag==="<#|#>":
				var arr=strings.match(tag3);
				return this.replaceStr(arr,/(<#|#>)/g);
			break;
			case tag==="<temp>|</temp>":
				var arr=strings.match(tag4);
				return this.replaceStr(arr,/(<temp>|<\/temp>)/g);
			break;
			case tag==="<get>|</get>":
				var arr=strings.match(tag5);
				return this.replaceStr(arr,/(<get>|<\/get>)/g);
			break;
			default:
			//{{|}}
				var arr=strings.match(tag1);
				return this.replaceStr(arr,/({{|}})/g);
			break;
		}
	}
	//不去标记字符
	,getContentAll:function(strings,tag,mytag_json){
		(!strings)&&(strings=document.getElementsByTagName('html')[0].innerHTML);
		if (is_object(mytag_json)) {
			var tags=eval("/"+mytag_json.l+".+?"+mytag_json.r+"/g");
			var arr=strings.match(tags);
			return [
				arr
			];
		}
		var tag1=/{{.+?}}/g;
		var tag2=/<<<.+?>>>/g;
		var tag3=/<#.+?#>/g;
		var tag4=/<temp>.+?<\/temp>/g;
		var tag5=/<get>.+?<\/get>/g;
		switch(true){
			case tag==="<<<|>>>":
				var arr=strings.match(tag2);
				return this.replaceStr(arr,/(<<<|>>>)/g);
			break;
			case tag==="<#|#>":
				var arr=strings.match(tag3);
				return arr;
			break;
			case tag==="<temp>|</temp>":
				var arr=strings.match(tag4);
				return arr;
			break;
			case tag==="<get>|</get>":
				var arr=strings.match(tag5);
				return arr
			break;
			default:
			//{{|}}
				var arr=strings.match(tag1);
				//this.replaceStr(arr,/({{|}})/g);
				return arr;
			break;
		}
	}
};
/*
*如：获取字符串"<<<123456789>>>"里面的"<<<"与">>>"之间的内容
var st="<<<123456789>>>5454785";
var temp=new plug_temp();
temp.getContent(t,0,{l:"<<<",r:">>>"});
*/