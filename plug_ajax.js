function plug_ajax(){
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
plug_ajax.prototype={
	//把字符串转换为一个json格式
	//a1<=>1<,>a2<=>2 转换为 {a1:"1",a2:"2"}
	STR_JSON:function(strings,mode_json){
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
			json[a_str[0]]=a_str[1];
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
	,get_files:function(ele_file_2arr){
		var file_arr=[],j=0;
		if (ele_file_2arr && typeof ele_file_2arr==="object") {
			for(var i=0,len=ele_file_2arr.length;i<len;i++){
				if (ele_file_2arr[i] && typeof ele_file_2arr[i]==="object" && ele_file_2arr[i].length>0) {
					for(var k=0,leng=ele_file_2arr[i].length;k<leng;k++){
						file_arr[j]=ele_file_2arr[i][k];
						j++;
					}
				}
				else{
					if (ele_file_2arr[i] && typeof ele_file_2arr[i]==="object") {
						file_arr[j]=ele_file_2arr[i];
						j++;
					}	
				}
			}
			return file_arr;//一维数组
		}

	}
	,upload_files:function(file_obj_arr,fixed_keyname,url,fun){
		(!fixed_keyname) && (fixed_keyname="file");
		var form_data=new FormData();
		if (file_obj_arr && typeof file_obj_arr==="object" && typeof fixed_keyname!=="number") {
			var len=file_obj_arr.length;
			for(var i=0;i<len;i++){
				form_data.append(fixed_keyname+i,file_obj_arr[i]);
			}
			var xhr=new XMLHttpRequest();
			xhr.open("post",url,true);
			xhr.onreadystatechange=function(e){
				if (this.readyState==4&&this.status>=200) {
					var texts=this.responseText;
					fun && fun.call(this,texts);
				}
			}
			xhr.send(form_data);
		}
	}
	//异步请求
	,ajax:function(json,fun){
		//json.method-->post,get   json.action:处理地址 json.data:处理数据（get）
		if(!is_object(json)){
			json={
				 action:""
				,method:"post"
				,get:{}
				,post:{}
			};
		}
		(!json.method)&&(json.method="post");
		var get="?";
		get+=this.en_str_json(json.get,{key:"=",json:"&"});
		var xhr=new XMLHttpRequest();
		xhr.open(json.method,json.action+get,true);
		if (json.method==="post"||json.method==="POST") {
			//设置请求头部信息
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			//发送数据（字符串）格式为：xx1=yy1&xx2=yy2 这样的字符串格式
			xhr.send(this.en_str_json(json.post,{key:"=",json:"&"}));
		}
		else{
			xhr.send();
		}
		console.log(this.en_str_json(json.post,{key:"=",json:"&"}));
		xhr.onreadystatechange=function(e){
			if(this.readyState==4&&this.status>=200){
				var texts=this.responseText;
				(typeof fun==="function")&&(fun.call(this,texts));
			}
		}

	}
	,GET:function(config){
		if (!is_object(config)) {
			config={
				key:"="
				,json:"&"
			};
		}
		var urlStr=decodeURIComponent(location.href);
		if (/\?/i.test(urlStr)) {
			//取右边部分
			var urlStr=urlStr.split("?")[1];
			return this.de_str_json(urlStr,{key:config.key,json:config.json});
		}
		else{
			return false;
		}

	}
};