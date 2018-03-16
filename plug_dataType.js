function plug_dataType() {
	//检测是否是数组
	window.is_array=function(argument){
		return argument && (typeof argument==="object") && ("length" in argument) ? true : false ;
	}
	//检测是否是对象
	window.is_object=function(argument){
		return argument && (typeof argument==="object") && !("length" in argument) ? true : false ;
	}
	//检测是否是函数
	window.is_function=function(argument){
		return argument && typeof argument==="function" ? true : false ;
	}
	//检测是否是字符串
	window.is_string=function(argument){
		return argument && typeof argument==="string" ? true : false ;
	}
	//检测是否是布尔值
	window.is_boolean=function(argument){
		return typeof argument==="boolean" ? true : false ;
	}
	//检测是否是数字（数值）
	window.is_number=function(argument){
		return typeof argument==="number" ? true : false ;
	}
	//检测是否是未定义
	window.is_undefined=function(argument){
		return typeof argument==="undefined" ? true : false;
	}
	//检测是否是为空
	window.is_null=function(argument){
		return argument===null || argument==="" ? true : false;
	}
	if (arguments&&arguments.length>0) {
		for(var i=0,len=arguments.length;i<len;i++){
			(is_function(arguments[i]))&&(arguments[i].call(this));
			if (is_object(arguments[i])) {
				for(var att in arguments[i]){
					this[att]=arguments[i][att];
				}
			}
		}
	}
}
new plug_dataType();