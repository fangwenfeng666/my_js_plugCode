function plug_dom(){
	window.is_array=function(argument){
		return argument && (typeof argument==="object") && ("length" in argument) ? true : false ;//检测是否是数组
	}
	window.is_object=function(argument){
		return argument && (typeof argument==="object") && !("length" in argument) ? true : false ;//检测是否是对象
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
plug_dom.prototype={
	/*获取元素
	*参数：获取元素的范围(默认document),对象属性名,对象属性值,是否自定义属性,元素名称(标签名)
	*/
	getElements:function(range,attribute_name,attribute_value,is_myAtt,element_name){
		var arr_ele=[];
		(!range)&&(range=document);
		if (element_name) {
			return range.getElementsByTagName(element_name);
		}
		else{
			var elements=range.getElementsByTagName('*');
			if (is_myAtt==true||is_myAtt==1) {
				for(var i=0,len=elements.length,j=0;i<len;i++){
					if (elements[i]["dataset"][attribute_name]==attribute_value) {
						arr_ele[j]=elements[i];
						j++;
					}
				}
			}
			else{
				for(var i=0,j=0,len=elements.length;i<len;i++){
					if (elements[i][attribute_name]==attribute_value) {
						arr_ele[j]=elements[i];
						j++;
					}
				}
			}
		}
		return arr_ele;
	}
	/*设置对象属性名和属性值
	*参数：对象,json格式(如{xx:{},xxx:"xxx"})
	*/
	,set_obj_att:function(obj,json_att){
		if (obj && (typeof json_att=="object")) {
			for(var att in json_att){
				if (typeof json_att[att]=="object") {
					//obj[att]={};
					this.set_obj_att(obj[att],json_att[att]);
				}
				else{
					obj[att]=json_att[att];
				}
			}
		}
	}
	/*插入元素
	*参数：父元素对象,元素名,设置元素属性和属性值,插入的参照位置(值可以为空),回调函数(值可以为空)
	*/
	,insertElement:function(parentElement,element_name,ele_att,refer_node,fun){
		if (parentElement&&element_name) {
			var E=document.createElement(element_name);
			this.set_obj_att(E,ele_att);
			(fun&&typeof fun=="function")&&(fun(E,this));
			refer_node ? parentElement.insertBefore(E,refer_node) : parentElement.appendChild(E);
			return true;
		}
		else{
			return false;
		}
	}
	,EventListener:{
		add:function(listener_obj,event_type,fun){
			if (listener_obj.addEventListener) {
				listener_obj.addEventListener(event_type,fun,false);
			}
			else if (listener_obj.attachEvent) {
				listener_obj.attachEvent("on"+event_type,fun);
			}
			else{
				listener_obj["on"+event_type]=fun; //阻止默认事件在fun函数里直接返回false: return false;
			}
		}
		,remove:function(listener_obj,event_type,fun){
			if(listener_obj.removeEventListener){
				listener_obj.removeEventListener(event_type,fun,false);
			}
			else if (listener_obj.detachEvent) {
				listener_obj.detachEvent("on"+event_type,fun);
			}
			else{
				listener_obj["on"+event_type]=null;
			}	
		}
		,getEvent:function(e){
			if (e) {
				return e||window.event;
			}
			else{
				return false;
			}
		}
		,getTarget:function(e){
			if (e) {
				return e.target||e.srcElement;
			}
			else{
				return false;
			}
		}
		,preventDefault:function(e){
			if (e.preventDefault) {
				e.preventDefault();
			}
			else{
				e.returnValue=false;
			}
		}
	}
	,ajax:function(json,fun,form_ele,fn){
		//json.method-->post,get   json.action:处理地址 json.data:处理数据（get）
		if (!is_object(json)) {
			return false;
		}
		var data="?";
		
		if (is_object(json.data)) {
			//console.log(json.data)
			foreach(json.data,function(obj,key,value){
				data+=key+"="+value+"&";

			});
			data=data.substr(0,data.length-1);
		}
		//console.log(data)
		var xhr=new XMLHttpRequest();
		xhr.open(json.method,json.action+data,true);
		xhr.onreadystatechange=function(e){
			if(this.readyState==4&&this.status>=200){
				var texts=this.responseText;
				(typeof fun==="function")&&(fun(texts));
			}
		}
		if (is_object(form_ele)) {
			xhr.send(new FormData(form_ele));
			return;
		}
		if (typeof fn==="function") {
			var form_data=new FormData();
			fn.call(this,form_data);
			xhr.send(form_data);
			return;
		}
		//form_ele ? xhr.send(new FormData(form_ele)) : xhr.send();
		xhr.send(new FormData(form_ele));
	}
	//异步post
	,ajax_post:function(json,fun){
		//json.method-->post,get   json.action:处理地址 json.data:处理数据（get）
		if(!is_object(json)){
			json={
				 action:""
				,get:{}
				,post:{}
			};
		}
		json.method="post";
		var get="?";
		get+=this.en_str_json(json.get,{key:"=",json:"&"});
		var xhr=new XMLHttpRequest();
		xhr.open(json.method,json.action+get,true);
		//设置请求头部
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		//发送数据（字符串）格式为：xx1=yy1&xx2=yy2 这样的字符串格式
		xhr.send(this.en_str_json(json.post,{key:"=",json:"&"}));
		console.log(this.en_str_json(json.post,{key:"=",json:"&"}));
		xhr.onreadystatechange=function(e){
			if(this.readyState==4&&this.status>=200){
				var texts=this.responseText;
				(typeof fun==="function")&&(fun.call(this,texts));
			}
		}

	}
	//regular 正则表达式或字符
	,GET:function(regular){
		var urlStr=location.href,arr=[];
		if (/\?/i.test(urlStr)) {
			urlStr=urlStr.split("?")[1];
			if (is_object(regular)||(typeof regular==="string")) {
				arr=urlStr.split(regular);
			}
			else{
				arr=urlStr.split("&");
			}
			var json={};
			for(var i=0,len=arr.length;i<len;i++){
				var a_st=arr[i].split("=");
				json[a_st[0]]=a_st[1];
			}
			return json;
		}
		else{
			return false;
		}
	}
	//把字符串转换为一个json格式
	//a1<=>1<,>a2<=>2 转换为 {a1:"1",a2:"2"}
	,STR_JSON:function(strings,mode_json){
		if (!strings) {return;}
		(!mode_json)&&(mode_json={
			//"<=>"左边为键名，右边为键值
			key:"<=>"
			//"<,>"把多个键名和键值字符串分割开
			,json:"<,>"
		});
		var keyName_keyValue=mode_json.key,
			_json=mode_json.json;
		var json={};
		var arrStr=strings.split(_json);
		foreach(arrStr,function(arr,key,value){
			var a_str=value.split(keyName_keyValue);

			var l=a_str.length;
			if (l>2) {
				var _str="";
				for(var i=2;i<l;i++){
					_str+=mode_json.key+a_str[i];
				}
				json[a_str[0]]=a_str[1]+_str;
			}
			else{
				json[a_str[0]]=a_str[1];
			}
				
		});
		return json;
	}
	//把字符串转换为一个数组json格式
	//a1<=>1<,>a2<=>2<#>a01<=>01<,>a02<=>02 转化为 [{a1:"1",a2:"2"},{a01:"01",a02:"02"}]
	,STR_ARR_JSON:function(strings,mode_json){
		var _this=this;
		if (!strings) {return;}
		//strings=strings.replace(/(\r\n|\r|\n)/g," ");
		(!mode_json)&&(mode_json={
			//"<=>"左边为键名，右边为键值
			key:"<=>"
			//"<,>"把多个键名和键值字符串分割开
			,json:"<,>"
			//"<#>"把多个json字符串分割开（数组）
			,arr:"<#>"
		});
		var kName_kValue=mode_json.key,
			json=mode_json.json,
			arr=mode_json.arr;
		var arr_json=[];
		var arr_json_str=strings.split(arr);
		foreach(arr_json_str,function(arr,key,value){
			arr_json[key]=_this.STR_JSON(value,mode_json);
		});
		return arr_json;
	}
	//解码json数据 跟 STR_JSON方法（函数）一样
	,de_str_json:function(strings,mode_json){
		(!mode_json)&&(mode_json={
			//"<=>"左边为键名，右边为键值
			key:"<=>"
			//"<,>"把多个键名和键值字符串分割开
			,json:"<,>"
		});
		return this.STR_JSON(strings,mode_json);
	}
	//解码数组json数据 跟 STR_ARR_JSON（函数）方法一样
	,de_str_arr_json:function(strings,mode_json){
		(!mode_json)&&(mode_json={
			//"<=>"左边为键名，右边为键值
			key:"<=>"
			//"<,>"把多个键名和键值字符串分割开
			,json:"<,>"
			//"<#>"把多个json字符串分割开（数组）
			,arr:"<#>"
		});
		return this.STR_ARR_JSON(strings,mode_json);
	}
	//编码json数据
	,en_str_json:function(json,config){
		if (!is_object(json)) {
			return false;
		}
		(!is_object(config))&&(config={
			key:"<=>"
			,json:"<,>"
		});
		var str_json="";
		foreach(json,function(json,k,v){
			str_json += k + config.key + v + config.json;
		})
		var str_json_len=str_json.length,
			c_json_len=config.json.length;
		return str_json.substr(0,str_json_len-c_json_len);

	}
	//编码数组json数据
	,en_str_arr_json:function(arr2_json,config){
		var _this=this;
		if (!is_array(arr2_json)) {
			return ;
		}
		(!is_object(config))&&(config={
			key:"<=>"
			,json:"<,>"
			,arr:"<#>"
		});
		var str_arr_json="";
		foreach(arr2_json,function(arr,key,value){
			str_arr_json+=_this.en_str_json(value,config)+config.arr;
		});
		var str_arr_json_len=str_arr_json.length,
			c_arr_len=config.arr.length;
		return str_arr_json.substr(0,str_arr_json_len - c_arr_len);
	}
	//解码二维json数据字符串 如：ab2<==>ab1<=>ab<,,>ab2<==>cd1<=>ab<,,>ab3<==>cd1<=>abc转换为 {ab2:[{ab1:"ab"},{cd1:"ab"}],ab3:{cd1:"abc"}}
	,de_str_json2:function(strings,config){
		if (!strings) {return;}
		(!config)&&(config={
			//"<=>"左边为键名，右边为键值
			key:"<=>"
			//"<,>"把多个键名和键值字符串分割开
			,json:"<,>"
			,arr:"<#>"
			//"<==>"左边为键名，右边为键值
			,key2:"<==>"
			//"<,,>"把多个键名和键值字符串分割开
			,json2:"<,,>"
		});
		var json2={},_this=this;
		var m=eval("/"+config.arr+"/g");
		var arr=strings.split(config.json2);
		foreach(arr,function(arr,key,value){
			var ar=value.split(config.key2);
			//属性重复的时候值为数组(二维)
			if (ar[0] in json2) {
				if (is_array(json2[ar[0]])) {
					json2[ar[0]].push(m.test(ar[1])? _this.de_str_arr_json(ar[1],config) :_this.de_str_json(ar[1],config));
				}
				else{
					if (is_object(json2[ar[0]])) {
						var init_value=json2[ar[0]];
					}
					json2[ar[0]]=[
									init_value
									,m.test(ar[1])? _this.de_str_arr_json(ar[1],config) :_this.de_str_json(ar[1],config)
								];
				}
			}
			else{
				json2[ar[0]]= m.test(ar[1])? _this.de_str_arr_json(ar[1],config) :_this.de_str_json(ar[1],config) ;
			}
			

		});
		return json2;
	}
	//编码二维json数据字符串
	,en_str_json2:function(obj,config){
		if (!is_object(obj)) {return;}
		(!config)&&(config={
			//"<=>"左边为键名，右边为键值
			key:"<=>"
			//"<,>"把多个键名和键值字符串分割开
			,json:"<,>"
			,arr:"<#>"
			//"<==>"左边为键名，右边为键值
			,key2:"<==>"
			//"<,,>"把多个键名和键值字符串分割开
			,json2:"<,,>"
		});
		var json2str="";
		_this=this;
		foreach(obj,function(obj,key,value){
			var strs=is_array(value)? _this.en_str_arr_json(value,config) : _this.en_str_json(value,config);
			json2str+=key+config.key2+strs+config.json2;
		});
		c_json2_len=config.json2.length;
		json2str_len=json2str.length;
		return json2str.substr(0,json2str_len - c_json2_len);
	}
};
/*
obj=dom.de_str_json2("ab2<==>ab1<=>ab<,,>ab2<==>cd1<=>ab<,>cdd1<=>abdds<,,>ab2<==>cd23<=>ab<,,>fang<==>fangwenfeng<=>fangjsojdfoiwj")
*/