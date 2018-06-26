function plug_cookie(){

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
}
plug_cookie.prototype={
	//设置单个cookie
	setCookie:function(c_key,value,time,dir){
		var t=new Date();
		var Day= time && typeof time ==="number" ? time : 7 ;
		t.setTime(t.getTime()+Day*24*60*60*1000);
		value=encodeURIComponent(value);
		document.cookie= 	dir ? c_key+"="+value+";expires="+t.toGMTString()+";path="+dir : 
							c_key+"="+value+";expires="+t.toGMTString()+"path=/";
	}
	//删除单个cookie
	,delCookie:function(c_key,dir){
		dir= dir? dir : "/" ;
		this.setCookie(c_key,"",0,dir);
		this.setCookie(c_key,"",-2,dir);
		return this.getCookie(c_key)? "删除cookie失败！"+this.getCookie(c_key) : "删除cookie成功";
	}
	//获取单个cookie
	,getCookie:function(c_key){
		var arr=document.cookie.split("; ");
		//console.log(arr)
		var c_str="";
		foreach(arr,function(arr,key,value){
			var a=value.split("=");
			//console.log(a[0],a[1])
			if (a[0]===c_key) {
				c_str=a[1];
			}
		});
		console.log(c_str)
		return decodeURIComponent(c_str);
	}
	//批量设置cookie
	,setCookies:function(arr_json){	
		//参数如：[{key:"xxx",value:"xxx",time:x},{}]
		var _this=this;
		if (is_array(arr_json)) {
			foreach(arr_json,function(arr,key,value){
				if (is_object(value)) {
					(!value.time)&&(value.time=7);
					_this.setCookie(value.key,value.value,value.time,value.dir);
				}
			});
		}
	}
	//批量删除cookie
	,delCookies:function(arr_json,all){
		//参数如：arr_json=>[{key:"xxx",value:"xxx",time:x},{}]
		(!all)&&(all=true);//默认删除全部cookie
		if (all) {
			var arr=document.cookie.split("; ");
			for(var i=0,len=arr.length;i<len;i++){
				var k=arr[i].split("=");
				this.delCookie(k[0]);
			}
		}
		else{
			var _this=this;
			foreach(arr_json,function(arr,i,value){
				foreach(function(json,k,v){
					_this.delCookie(k);
				});
			});
		}
	}
	//批量获取cookie
	,getCookies:function(){
		var arr=document.cookie.split("; ");
		this.getCookieArr=function(){
			return arr;
		}
		var arr_json={};
		foreach(arr,function(arr,key,value){
			var json=value.split("=");
			foreach(json,function(obj,k,v){
				arr_json[json[0]]=v;
			});
		});
		return arr_json;
	}
};