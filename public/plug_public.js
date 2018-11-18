function plug_public(){
	/*检测是否是数组*/
	window.is_array=function(argument){
		return argument && (typeof argument==="object") && ("length" in argument) && (typeof argument.length==="number") ?true : false ;
		/*return ("isArray" in Array) && (Array.isArray(argument))*/
		/*return Object.prototype.toString.call(argument)==="[object Array]"*/
	}
	/*检测是否是对象*/ 
	window.is_object=function(argument){
		if (argument && (typeof argument==="object") && ("length" in argument)) {
			return Object.prototype.toString.call(argument)==="[object Object]";
		}
		return argument && (typeof argument==="object") && !("length" in argument) ? true : false ;
	}
	/*检测是否是函数*/
	window.is_function=function(argument){
		return argument && typeof argument==="function" ? true : false ;
	}
	/*检测是否是字符串*/
	window.is_string=function(argument){
		return argument && typeof argument==="string" ? true : false ;
	}
	/*检测是否是布尔值*/
	window.is_boolean=function(argument){
		return typeof argument==="boolean" ? true : false ;
	}
	/*检测是否是数字（数值）*/
	window.is_number=function(argument){
		return typeof argument==="number" ? true : false ;
	}
	/*检测是否是未定义*/
	window.is_undefined=function(argument){
		return typeof argument==="undefined" ? true : false;
	}
	/*检测是否是为空*/
	window.is_null=function(argument){
		return argument===null || argument==="" ? true : false;
	}
	var _this=this;
	/*
	**@array_or_json array|object 数组或对象 @fun function 回调函数
	**@fun回调函数要三个参数表示： 数组（或对象）,下标（key），value
	*/
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
	/*
	**随机数	@begin_number number 最小数字 @end_number nunber 最大数字
	*/
	window.random=function(begin_number,end_number){
		(begin_number) 	|| 	(begin_number=0);
		(end_number)	||	(end_number=10);
		return  (end_number>=begin_number) ? ~~(Math.random()*(end_number-begin_number+1)) + ~~(begin_number) : false ;
	}
	/*随机字符串*/
	window.randomString=function(l,mode,C){
		(l) 	|| (l=5);
		(mode) 	|| (mode="n");
		var value={
			/*数字*/
			n: 		"0123456789"
			/*小写字母*/
			,s: 	"abcdefghijklmnopqrstuvwxyz"
			/*大写字母*/
			,S: 	"ABCDEFGHIJKLMNOPQRSTUVWXYZ"
			/*数字和小写字母*/
			,ns: 	"0123456789abcdefghijklmnopqrstuvwxyz"
			/*数字和大写字母*/
			,nS: 	"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
			/*小写字母和大写字母*/
			,sS: 	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
			/*数字和小写字母和大写字母*/
			,nsS: 	"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
			/*其他字符包括数字小写和大写*/
			,all: 	"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_+-*=^~,#$@|!"
		};
		if (is_object(C)) {
			foreach(C,function(c,k,v){
				value[k]=v;
			});
		}
		(value[mode]) || (mode="n");
		var str="";
		for(var i=0,str_len=value[mode].length;i<l;i++){
			str+=value[mode][~~(Math.random()*str_len)];
		}
		return str;
	}
	/*
	**给对象添加属性（也可以给标签元素【DOM】对象属性）
	**@obj object 对象或者json格式 @json_attribute  object 对象或者json格式
	*/
	window.set_obj_att=function(obj,json_attribute){
		if( is_object(obj) && is_object(json_attribute)){
			for(var att in json_attribute){
				is_object(json_attribute[att]) ? this.set_obj_att(obj[att]={},json_attribute[att]) : obj[att]=json_attribute[att];
			}
		}
	}
	/*
	**获取元素DOM节点
	**@attributeValue string 属性值  @parentE object 元素对象（先取范围） @attributeName string 属性名  @C object 对象或json格式(配置先取模式)
	*/
	window.getElements=function(attributeValue,attributeName,parentE,C){
		(is_object(parentE)) || (parentE=document);
		(C) || (C={mode:"0"});
		var fun={
			"0":function(){
				preg=[/^(#)(_|[A-z])[A-z0-9_\-\W]*/i,/^(\.)[A-z_][A-z0-9_\-\W]*/i,/^[A-z_][A-z0-9_\-]*/i,/>/i];
				/*子代选择器*/
				if (preg[3].test(attributeValue)) {
					var sE=[],j=0,arr=attributeValue.split(">");
					/*元素筛选功能*/
					function childE(arr_tag,str,json){
						/*var se=[],j=0;*/
						foreach(is_object(arr_tag)? [arr_tag] : arr_tag ,function(arr_tag,i,v){
							if (v.tagName.toLowerCase()===str||v.className===str.replace(".","")) {
								json.arr[json.i]=v;	json.i++;
							}								
						});
						return json.arr;
						
					}
/*					if (arr.length===2) {
						var ssE=getElements( arr[0] );
						foreach(ssE,function(ssE,i,v){
							var sssE=v.children;
							foreach(sssE,function(sssE,i,v){

								if (v.tagName.toLowerCase()===arr[1]||v.className===arr[1].replace(".","")) {
									sE[j]=v;	j++;
								}							
							});
						});
					}*/

					if (arr.length>1) {
						var arrE=[getElements( arr[0] )],c={i:0,arr:[]};
						/*arrE[0]存的是arrE[1]的父元素（节点）集合 后面同理（arrE[1]是arrE[2]的爸爸）arrE是二维数组*/
						for(var i=1,n=0,len=arr.length;i<len;i++,n++){
							/*childE()*/
							var str=arr[i];
							(function(i,n){
								foreach(is_object(arrE[n])?[arrE[n]] : arrE[n] ,function(arr,ii,v){
									/*console.log(n,arrE[n]);*/
									arrE[i]=childE(v.children,str,c);
									/*console.log(i,arrE);*/
								});
								c.i=0;c.arr=[];
							})(i,n);

						}
						return sE=arrE[i-1];
					}
					return sE;
					
				}
				/*id选择器*/
				if (preg[0].test(attributeValue)) {
					return document.getElementById(attributeValue.replace("#",""));
				}
				var E=parentE.getElementsByTagName('*');
				/*类选择器class*/
				if (preg[1].test(attributeValue)) {
					var sE=[],j=0;
					foreach(E,function(E,k,v){
						if (v.className===attributeValue.replace(/\./i,"")) {
							sE[j]=v;
							j++;
						}
					});
					return sE;
				}
				/*标签（元素）选择器*/
				if (preg[2].test(attributeValue)) {
					var sE=[],j=0;
					foreach(E,function(E,i,v){
						if (v.tagName.toLowerCase()===attributeValue) {
							sE[j]=v;	j++;
						}
					});
					return sE;
				}
			}
			/*以特定的属性名和属性值获取元素标签*/
			,"1":function(){
				var E=parentE.getElementsByTagName('*');
				var sE=[],j=0;
				foreach(E,function(E,i,v){
					if (v[attributeName]===attributeValue) {
						sE[j]=v;
						j++;
					}
				});
				return sE;
			}
			/*获取自定义属性的标签元素*/
			,"2":function(){
				var E=parentE.getElementsByTagName('*');
				var sE=[],j=0;
				foreach(E,function(E,i,v){
					if (v.getAttribute(attributeName)===attributeValue) {
						sE[j]=v;j++;
					}
				});	
				return sE;		
			}
			/*获取含有某个属性名称的标签元素*/
			,"3":function(){
				var E=parentE.getElementsByTagName('*');
				var sE=[],j=0;
				foreach(E,function(E,i,v){
					if (is_string(v[attributeName])&&v[attributeName].length>0 ) {
						sE[j]=v;	j++;
					}
					else{
						var s=v.getAttribute(attributeName);
						if (is_string(s)&&s.length>0) {
							sE[j]=v;	j++;
						}
					}
				});	
				return sE;	
			}
			,"attribute":function(){
				return this["1"]();
			}
			,"myAttribute":function(){
				return this["2"]();
			}
			,"is_attribute":function(){
				return this["3"]();
			}
		};
		return (fun[C.mode])&&(fun[C.mode]());
	}
	this.getElements=window.getElements;
	/*
	*插入元素
	*@parentElement object 父元素 @element_name string 要创建的元素名称 @ele_att object(json格式) 设置创建元素的属性
	*@refer_node object 兄弟元素(是否把新建的元素节点插入兄弟元素节点的前面,值可以为空) @fun function 回调函数（传入两个参数,值可以为空）
	*/
	window.insertElement=function(parentElement,element_name,ele_att,refer_node,fun){
		if (parentElement&&element_name) {
			var E=document.createElement(element_name);
			this.set_obj_att(E,ele_att);
			if (is_object(ele_att["myAttribute"])) {
				foreach(ele_att["myAttribute"],function(json,key,value){
					E.setAttribute(key,value);
				});
			}
			(fun&&typeof fun=="function")&&(fun(E,this));
			refer_node ? parentElement.insertBefore(E,refer_node) : parentElement.appendChild(E);
			return true;
		}
		else{
			return false;
		}
	}
	this.insertElement=window.insertElement;
	window.ajax=function(json,fun){
		if (!is_object(json)) {
			return false;
		}
		(json.methon)||(json.methon="post");
		(json.action)||(json.action="");
		/*josn.jsonp 是否跨域请求*/
		(json.jsonp)||(json.jsonp=false);
		/*json.url 跨域请求的地址*/
		(json.url)	||(json.url="");
		/*设置回调函数名称 看后台接口而定,既设置函数名称的参数，百度的为cb(?cb=functionName)*/
		(json.functionName)||(json.functionName="jsonpData");
		(is_object(json.get))||(json.get={});
		(is_object(json.post))||(json.post={});
		if (json.jsonp===true) {
			insertElement(document.body,"script",{
				type:"text/javascript"
				,className:"jsonp"
				,src:json.url+"?functionName="+json.functionName+"&"+_this.en_str_json(json.get,{key:"=",k_v:"&"})
			})
			return;
		}
		var xhr=new XMLHttpRequest();
		xhr.open(json.methon,json.action+"?"+_this.en_str_json(json.get,{key:"=",k_v:"&"}),true);
		/*console.log(_this.en_str_json(json.get,{key:"=",k_v:"&"}));*/
		/*设置请求头部*/
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(_this.en_str_json(json.post,{key:"=",k_v:"&"}));
		xhr.onreadystatechange=function(e){
			if(this.readyState==4&&this.status>=200){
				var texts=this.responseText;
				(typeof fun==="function")&&(fun.call(this,texts));
			}
		}
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

	/*不刷新页面改变地址栏地址（不能跨域）*/
	window.setURL=this.setURL;
	/*
	*加密：md5 @string string 字符串
	*/
	function md5(string) {
	    function md5_RotateLeft(lValue, iShiftBits) {
	        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
	    }
	    function md5_AddUnsigned(lX, lY) {
	        var lX4, lY4, lX8, lY8, lResult;
	        lX8 = (lX & 0x80000000);
	        lY8 = (lY & 0x80000000);
	        lX4 = (lX & 0x40000000);
	        lY4 = (lY & 0x40000000);
	        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
	        if (lX4 & lY4) {
	            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
	        }
	        if (lX4 | lY4) {
	            if (lResult & 0x40000000) {
	                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
	            } else {
	                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
	            }
	        } else {
	            return (lResult ^ lX8 ^ lY8);
	        }
	    }
	    function md5_F(x, y, z) {
	        return (x & y) | ((~x) & z);
	    }
	    function md5_G(x, y, z) {
	        return (x & z) | (y & (~z));
	    }
	    function md5_H(x, y, z) {
	        return (x ^ y ^ z);
	    }
	    function md5_I(x, y, z) {
	        return (y ^ (x | (~z)));
	    }
	    function md5_FF(a, b, c, d, x, s, ac) {
	        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
	        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
	    };
	    function md5_GG(a, b, c, d, x, s, ac) {
	        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
	        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
	    };
	    function md5_HH(a, b, c, d, x, s, ac) {
	        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
	        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
	    };
	    function md5_II(a, b, c, d, x, s, ac) {
	        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
	        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
	    };
	    function md5_ConvertToWordArray(string) {
	        var lWordCount;
	        var lMessageLength = string.length;
	        var lNumberOfWords_temp1 = lMessageLength + 8;
	        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
	        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
	        var lWordArray = Array(lNumberOfWords - 1);
	        var lBytePosition = 0;
	        var lByteCount = 0;
	        while (lByteCount < lMessageLength) {
	            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
	            lBytePosition = (lByteCount % 4) * 8;
	            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
	            lByteCount++;
	        }
	        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
	        lBytePosition = (lByteCount % 4) * 8;
	        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
	        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
	        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
	        return lWordArray;
	    };
	    function md5_WordToHex(lValue) {
	        var WordToHexValue = "",
	        WordToHexValue_temp = "",
	        lByte, lCount;
	        for (lCount = 0; lCount <= 3; lCount++) {
	            lByte = (lValue >>> (lCount * 8)) & 255;
	            WordToHexValue_temp = "0" + lByte.toString(16);
	            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
	        }
	        return WordToHexValue;
	    };
	    function md5_Utf8Encode(string) {
	        string = string.replace(/\r\n/g, "\n");
	        var utftext = "";
	        for (var n = 0; n < string.length; n++) {
	            var c = string.charCodeAt(n);
	            if (c < 128) {
	                utftext += String.fromCharCode(c);
	            } else if ((c > 127) && (c < 2048)) {
	                utftext += String.fromCharCode((c >> 6) | 192);
	                utftext += String.fromCharCode((c & 63) | 128);
	            } else {
	                utftext += String.fromCharCode((c >> 12) | 224);
	                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	                utftext += String.fromCharCode((c & 63) | 128);
	            }
	        }
	        return utftext;
	    };
	    var x = Array();
	    var k, AA, BB, CC, DD, a, b, c, d;
	    var S11 = 7,
	    S12 = 12,
	    S13 = 17,
	    S14 = 22;
	    var S21 = 5,
	    S22 = 9,
	    S23 = 14,
	    S24 = 20;
	    var S31 = 4,
	    S32 = 11,
	    S33 = 16,
	    S34 = 23;
	    var S41 = 6,
	    S42 = 10,
	    S43 = 15,
	    S44 = 21;
	    string = md5_Utf8Encode(string);
	    x = md5_ConvertToWordArray(string);
	    a = 0x67452301;
	    b = 0xEFCDAB89;
	    c = 0x98BADCFE;
	    d = 0x10325476;
	    for (k = 0; k < x.length; k += 16) 
	    {
	        AA = a;
	        BB = b;
	        CC = c;
	        DD = d;
	        a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
	        d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
	        c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
	        b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
	        a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
	        d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
	        c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
	        b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
	        a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
	        d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
	        c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
	        b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
	        a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
	        d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
	        c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
	        b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
	        a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
	        d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
	        c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
	        b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
	        a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
	        d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
	        c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
	        b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
	        a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
	        d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
	        c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
	        b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
	        a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
	        d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
	        c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
	        b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
	        a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
	        d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
	        c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
	        b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
	        a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
	        d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
	        c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
	        b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
	        a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
	        d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
	        c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
	        b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
	        a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
	        d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
	        c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
	        b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
	        a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
	        d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
	        c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
	        b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
	        a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
	        d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
	        c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
	        b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
	        a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
	        d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
	        c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
	        b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
	        a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
	        d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
	        c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
	        b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
	        a = md5_AddUnsigned(a, AA);
	        b = md5_AddUnsigned(b, BB);
	        c = md5_AddUnsigned(c, CC);
	        d = md5_AddUnsigned(d, DD);
	    }
	    return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
	}
	window.md5=md5;
	/*
	*加密 sha1 @strings string 字符串
	*/
	function sha1(strings) {

		var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase */
		var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode */
		/*
		 *
		 * The main function to calculate message digest
		 *
		 */
		function hex_sha1(s){
		 	//调用该函数返回加密字符
		    return binb2hex(core_sha1(AlignSHA1(s)));
		     
		}
		 
		/*
		 *
		 * Perform a simple self-test to see if the VM is working
		 *
		 */
		function sha1_vm_test(){
		 
		    return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
		     
		}
		 
		/*
		 *
		 * Calculate the SHA-1 of an array of big-endian words, and a bit length
		 *
		 */
		function core_sha1(blockArray){
		 
		    var x = blockArray; // append padding
		    var w = Array(80);
		     
		    var a = 1732584193;
		     
		    var b = -271733879;
		     
		    var c = -1732584194;
		     
		    var d = 271733878;
		     
		    var e = -1009589776;
		     
		    for (var i = 0; i < x.length; i += 16) // 每次处理512位 16*32
		    {
		     
		        var olda = a;
		         
		        var oldb = b;
		         
		        var oldc = c;
		         
		        var oldd = d;
		         
		        var olde = e;
		         
		        for (var j = 0; j < 80; j++) // 对每个512位进行80步操作
		        {
		         
		            if (j < 16) 
		                w[j] = x[i + j];
		             
		            else
		                w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
		             
		            var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
		             
		            e = d;
		             
		            d = c;
		             
		            c = rol(b, 30);
		             
		            b = a;
		             
		            a = t;
		             
		        }
		         
		        a = safe_add(a, olda);
		         
		        b = safe_add(b, oldb);
		         
		        c = safe_add(c, oldc);
		         
		        d = safe_add(d, oldd);
		         
		        e = safe_add(e, olde);
		         
		    }
		     
		    return new Array(a, b, c, d, e);
		     
		}
		 
		/*
		 *
		 * Perform the appropriate triplet combination function for the current
		 * iteration
		 *
		 * 返回对应F函数的值
		 *
		 */
		function sha1_ft(t, b, c, d){
		 
		    if (t < 20) 
		        return (b & c) | ((~ b) & d);
		     
		    if (t < 40) 
		        return b ^ c ^ d;
		     
		    if (t < 60) 
		        return (b & c) | (b & d) | (c & d);
		     
		    return b ^ c ^ d; // t<80
		}
		 
		/*
		 *
		 * Determine the appropriate additive constant for the current iteration
		 *
		 * 返回对应的Kt值
		 *
		 */
		function sha1_kt(t){
		 
		    return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
		     
		}
		 
		/*
		 *
		 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
		 *
		 * to work around bugs in some JS interpreters.
		 *
		 * 将32位数拆成高16位和低16位分别进行相加，从而实现 MOD 2^32 的加法
		 *
		 */
		function safe_add(x, y){
		 
		    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		     
		    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		     
		    return (msw << 16) | (lsw & 0xFFFF);
		     
		}
		 
		/*
		 *
		 * Bitwise rotate a 32-bit number to the left.
		 *
		 * 32位二进制数循环左移
		 *
		 */
		function rol(num, cnt){
		 
		    return (num << cnt) | (num >>> (32 - cnt));
		     
		}
		 
		/*
		 *
		 * The standard SHA1 needs the input string to fit into a block
		 *
		 * This function align the input string to meet the requirement
		 *
		 */
		function AlignSHA1(str){
		 
		    var nblk = ((str.length + 8) >> 6) + 1, blks = new Array(nblk * 16);
		     
		    for (var i = 0; i < nblk * 16; i++) 
		        blks[i] = 0;
		     
		    for (i = 0; i < str.length; i++) 
		     
		        blks[i >> 2] |= str.charCodeAt(i) << (24 - (i & 3) * 8);
		     
		    blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);
		     
		    blks[nblk * 16 - 1] = str.length * 8;
		     
		    return blks;
		     
		}
		 
		/*
		 *
		 * Convert an array of big-endian words to a hex string.
		 *
		 */
		function binb2hex(binarray){
		 
		    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		     
		    var str = "";
		     
		    for (var i = 0; i < binarray.length * 4; i++) {
		     
		        str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
		         
		        hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
		         
		    }
		     
		    return str;
		     
		}
		 
		/*
		 *
		 * calculate MessageDigest accord to source message that inputted
		 *
		 */
		function calcDigest(){
		 
		    var digestM = hex_sha1(document.SHAForm.SourceMessage.value);
		     
		    document.SHAForm.MessageDigest.value = digestM;
		     
		}
		if (!strings) {
			return false;
		}
		return hex_sha1(strings);
	}
	window.sha1=sha1;

	/*
	*sha256 加密 @s string 字符串
	*/

	function SHA256(s){
	  var chrsz = 8;
	  var hexcase = 0;
	  function safe_add (x, y) {
	    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	    return (msw << 16) | (lsw & 0xFFFF);
	  }
	  function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
	  function R (X, n) { return ( X >>> n ); }
	  function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
	  function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
	  function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
	  function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
	  function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
	  function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
	  function core_sha256 (m, l) {
	    var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
	    var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
	    var W = new Array(64);
	    var a, b, c, d, e, f, g, h, i, j;
	    var T1, T2;
	    m[l >> 5] |= 0x80 << (24 - l % 32);
	    m[((l + 64 >> 9) << 4) + 15] = l;
	    for ( var i = 0; i<m.length; i+=16 ) {
	      a = HASH[0];
	      b = HASH[1];
	      c = HASH[2];
	      d = HASH[3];
	      e = HASH[4];
	      f = HASH[5];
	      g = HASH[6];
	      h = HASH[7];
	      for ( var j = 0; j<64; j++) {
	        if (j < 16) W[j] = m[j + i];
	        else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
	        T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
	        T2 = safe_add(Sigma0256(a), Maj(a, b, c));
	        h = g;
	        g = f;
	        f = e;
	        e = safe_add(d, T1);
	        d = c;
	        c = b;
	        b = a;
	        a = safe_add(T1, T2);
	      }
	      HASH[0] = safe_add(a, HASH[0]);
	      HASH[1] = safe_add(b, HASH[1]);
	      HASH[2] = safe_add(c, HASH[2]);
	      HASH[3] = safe_add(d, HASH[3]);
	      HASH[4] = safe_add(e, HASH[4]);
	      HASH[5] = safe_add(f, HASH[5]);
	      HASH[6] = safe_add(g, HASH[6]);
	      HASH[7] = safe_add(h, HASH[7]);
	    }
	    return HASH;
	  }
	  function str2binb (str) {
	    var bin = Array();
	    var mask = (1 << chrsz) - 1;
	    for(var i = 0; i < str.length * chrsz; i += chrsz) {
	      bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
	    }
	    return bin;
	  }
	  function Utf8Encode(string) {
	    string = string.replace(/\r\n/g,"\n");
	    var utftext = "";
	    for (var n = 0; n < string.length; n++) {
	      var c = string.charCodeAt(n);
	      if (c < 128) {
	        utftext += String.fromCharCode(c);
	      }
	      else if((c > 127) && (c < 2048)) {
	        utftext += String.fromCharCode((c >> 6) | 192);
	        utftext += String.fromCharCode((c & 63) | 128);
	      }
	      else {
	        utftext += String.fromCharCode((c >> 12) | 224);
	        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	        utftext += String.fromCharCode((c & 63) | 128);
	      }
	    }
	    return utftext;
	  }
	  function binb2hex (binarray) {
	    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
	    var str = "";
	    for(var i = 0; i < binarray.length * 4; i++) {
	      str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
	      hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8 )) & 0xF);
	    }
	    return str;
	  }
	  s = Utf8Encode(s);
	  return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
	}
	window.sha256=function(string){
		return string ? SHA256(string) : false ;
	}
	/*
	*动画
	*/
	function plug_move(){
	/*
	*t  当前时间 (time) 初始时间
	*b  初始位置 (beginning position)		(固定)
	*c  距离 (change position) 运动的距离	(固定)
	*d  持续时间 (duration)运动多少时间		(固定)
	*p  最终位置 (position)
	*/	
		var _obj=this;
		this.getCSS=function(obj,style_attr){
			return window.getComputedStyle ? getComputedStyle(obj)[style_attr] : obj.currentStyle[style_attr] ;
		}
		this.move_time={
			/*
			*tween算法 (基于时间的动画)
			*/
			linear:function(t,b,c,d){ 			//匀速
				return c*t/d + b; //kx+b
			}
		    ,easeIn: function(t, b, c, d){  	//加速曲线 ease前进的意思
		        return c*(t/=d)*t + b;
		    }
		    ,easeOut: function(t, b, c, d){  	//减速曲线
		        return -c *(t/=d)*(t-2) + b;
		    }
		    ,easeBoth: function(t, b, c, d){  	//加速减速曲线
		        if ((t/=d/2) < 1) {
		            return c/2*t*t + b;
		        }
		        return -c/2 * ((--t)*(t-2) - 1) + b;
		    }
		    ,easeInStrong: function(t, b, c, d){  //加加速曲线
		        return c*(t/=d)*t*t*t + b;
		    }
		    ,easeOutStrong: function(t, b, c, d){  //减减速曲线
		        return -c * ((t=t/d-1)*t*t*t - 1) + b;
		    }
		    ,easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		        if ((t/=d/2) < 1) {
		            return c/2*t*t*t*t + b;
		        }
		        return -c/2 * ((t-=2)*t*t*t - 2) + b;
		    }
		    ,elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		        if (t === 0) { 
		            return b; 
		        }
		        if ( (t /= d) == 1 ) {
		            return b+c; 
		        }
		        if (!p) {
		            p=d*0.3; 
		        }
		        if (!a || a < Math.abs(c)) {
		            a = c; 
		            var s = p/4;
		        } else {
		            var s = p/(2*Math.PI) * Math.asin (c/a);
		        }
		        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		    }
		    ,elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
		        if (t === 0) {
		            return b;
		        }
		        if ( (t /= d) == 1 ) {
		            return b+c;
		        }
		        if (!p) {
		            p=d*0.3;
		        }
		        if (!a || a < Math.abs(c)) {
		            a = c;
		            var s = p / 4;
		        } else {
		            var s = p/(2*Math.PI) * Math.asin (c/a);
		        }
		        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		    }
		    ,elasticBoth: function(t, b, c, d, a, p){
		        if (t === 0) {
		            return b;
		        }
		        if ( (t /= d/2) == 2 ) {
		            return b+c;
		        }
		        if (!p) {
		            p = d*(0.3*1.5);
		        }
		        if ( !a || a < Math.abs(c) ) {
		            a = c; 
		            var s = p/4;
		        }
		        else {
		            var s = p/(2*Math.PI) * Math.asin (c/a);
		        }
		        if (t < 1) {
		            return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
		                    Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		        }
		        return a*Math.pow(2,-10*(t-=1)) * 
		                Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
		    }
		    ,backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		        if (typeof s == 'undefined') {
		           s = 1.70158;
		        }
		        return c*(t/=d)*t*((s+1)*t - s) + b;
		    }
		    ,backOut: function(t, b, c, d, s){
		        if (typeof s == 'undefined') {
		            s = 3.70158;  //回缩的距离
		        }
		        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		    }
		    ,backBoth: function(t, b, c, d, s){
		        if (typeof s == 'undefined') {
		            s = 1.70158; 
		        }
		        if ((t /= d/2 ) < 1) {
		            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		        }
		        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		    }
		    ,bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		        return c - this['bounceOut'](d-t, 0, c, d) + b;
		    }       
		    ,bounceOut: function(t, b, c, d){
		        if ((t/=d) < (1/2.75)) {
		            return c*(7.5625*t*t) + b;
		        } else if (t < (2/2.75)) {
		            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		        } else if (t < (2.5/2.75)) {
		            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		        }
		        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
		    }      
		    ,bounceBoth: function(t, b, c, d){
		        if (t < d/2) {
		            return this['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		        }
		        return this['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
		    }
		    /*调用该函数 方法（move）执行动画*/
			,move:function(obj,json_att,times,mode,is_scroll,fun){
				(!times)&&(times=500);
				(!mode)&&(mode="easeOut");
				if ((!obj && !json_att) && typeof obj!="object" && typeof json_att!="object") {return false;}
				//var previous=new Date();//以前的时间
				var current=new Date();//现在的时间
				/*获取初始值*/
				var iCur={};
				for(var att in json_att){
					if (is_scroll) {/*滚动条*/
						iCur[att]=obj[att];
					}
					else{
						att==="opacity" ? iCur[att] = Math.round(_obj.getCSS(obj,att)*100) : iCur[att] = parseInt(_obj.getCSS(obj,att));
					}
				}
				/*先清除上一个定时器*/
				//clearTimeout(this.Timeout);
				clearInterval(obj.Timeout);
				this.m=function(){
					/*获取t、d参数*/
					var d=times;
					var t=d-Math.max(0,current-(+new Date())+d);
					for(var attr in json_att){
						/*获取b、c、p这三个参数*/
						var b=iCur[attr];
						var c=json_att[attr]-iCur[attr];
						var p=_obj.move_time[mode](t,b,c,d);
						/*赋值操作*/
						if (is_scroll) {
							obj[attr]=p;
						}
						else{
							if (attr=="opacity") {
								obj.style.opacity = p / 100;
								 obj.style.filter = 'alpha(opacity=' + p + ')';
							}
							else{
								 obj.style[attr] = p + 'px';
							}
						}

					}
					//obj.Timeout=setInterval(this.m,1000/60);
					//console.log(times,t,d);
					if (t==d) {
						/*清除定时器*/
						clearInterval(obj.Timeout);
						fun && fun.call(obj);
					}			
				}
				//this.Timeout=setTimeout(this.m,1000/60);
				obj.Timeout=setInterval(this.m,1000/60);
				//this.m.call(this);
			}
		};
		this.move=function(obj,json_att,times,mode,is_scroll,fun){
			this.move_time.move(obj,json_att,times,mode,is_scroll,fun);
		}
		/*函数里面的函数 里面的this默认指向window对象*/
	}
	window.plug_move=plug_move;
	/*unicode字符编码*/
	window.enUnicode=function(strings){
		var unicode_str="";
		if (strings) {
			for(var i=0,len=strings.length;i<len;i++){
				var s="00"+strings.charCodeAt(i).toString(16);
					/*截取后面4个字符串*/
					s=s.slice(-4);
				unicode_str+="\\u"+s;
			}
			return unicode_str;
		}
		else{
			return false;
		}
	}
	/*解码unicode编码字符串*/
	window.deUnicode=function(strings){
		strings = strings.replace(/\\/g, "%");
		//console.log(strings);
		return unescape(strings);
		/*return decodeURIComponent(strings);*/
	}
	/*监听对象属性值的变化和属性的获取
	*@obj object 要监听的对象 @key string 对象的属性（键名）
	*@getfun function 获取对象属性值要执行的回调函数(可以不填) @setfun function 改变对象属性值时要执行的回调函数（方法，可以不填）
	*/
	window.attributeListener=function(obj,key,getfun,setfun){
		var o={
				/*value:""*/
				/*,writable : true*/
				/*,configurable : true*/
				/*,enumerable : true*/

				/*监听对象属性被获取时 get属性是自带的*/
				get: function(){
					is_function(getfun)&&getfun.call(obj,obj["_"+key]);
					return obj["_"+key];
				}
				/*监听对象属性值改变 set属性是自带的，是一个回调函数，传入一个值（即有一个参数）*/
				,set: function(newValue){
					/*data=newValue;*/
					console.log("set:"+newValue+"--"+arguments[0]+"--"+arguments[1]);
					is_function(setfun)&&setfun.call(obj);
					obj["_"+key]=newValue;
					/*alert("更新的数据："+newValue);*/
				}
			}
		Object.defineProperty(obj,key,o);
		/*Object.defineProperty.call(obj,obj,key,o);*/
	}
	window.number16=function(str,n){
		(n)||(n=10);
		return (parseInt("0x"+str)).toString(n);
	}
	/*
	*@time number 时间戳 @formate string 时间格式
	*/
	window.dateFormat=function(time,format){
		var T=new Date();
		(time) || (time=T.getTime());
		(format)||(format="Y-M-D H:I:S");
		/*time=parseInt(time);*//*parseInt(time,10);*/
		T.setTime(time);
		var day=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
		var month={
			name:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
			,number:[1,2,3,4,5,6,7,8,9,10,11,12]
		}
		var data={
			/*四位数年份*/
			year:T.getFullYear()
			,Y:T.getFullYear()
			/*月数 月份*/
			,M:("0"+month.number[T.getMonth()]).slice(-2)
			,m:month.number[T.getMonth()]
			,month_name:month.name[T.getMonth()]
			/*星期几*/
			,day:day[T.getDay()]
			/*天（日）*/
			,D:("0"+T.getDate()).slice(-2)
			,d:T.getDate()
			/*时*/
			,H:("0"+T.getHours()).slice(-2)
			,h:T.getHours()
			/*分*/
			,I:("0"+T.getMinutes()).slice(-2)
			,i:T.getMinutes()
			/*秒*/
			,S:("0"+T.getSeconds()).slice(-2)
			,s:T.getSeconds()
		};
		var replace_mode=data;
		foreach(replace_mode,function(obj,key,value){
			var preg=new RegExp(key,"g");
			/* key=key.replace(/\"/g,"\\\"");key=key.replace(/\//g,"\\\/");var preg=eval("/"+key+"/g");*/
			format=format.replace(preg,value);
		});
		return format;
	}
	/*
	*@obj object 表单输入元素标签【input,textarea】 @text string 复制的内容(可以为空)
	*【注意：input或者textarea的样式不能为 "display:none;" ,主要原理是复制表单元素里面的值（value属性的值）】
	*/
	window.copyText=function(obj,text){
		if (is_object(obj)) {
			(text)&&(obj.value=text);
			//obj.select();
			currentFocus= document.activeElement;
			obj.focus();
			/*全选对象里面的内容，跟 obj.select()一样*/
			obj.setSelectionRange(0, obj.value.length);
			/*复制选中的文字到剪贴板*/
			document.execCommand('copy', true);
			obj.focus();
			/*currentFocus.focus();*/
			alert("复制成功");
		}
		else{
			return false;
		}
	}

	/*本地缓存(localStorage或sessionStorage)操作 【构造函数】
	*@name string 值为(localStorage|sessionStorage),默认localStorage
	*/
	this.storage=function(name){
		(name)||(name="localStorage");
		this._Storage=window[name]; /* this._Storage=localStorage; 或 this._Storage=sessionStorage;*/
		/*添加或修改localStorage对象或者sessionStorage的属性(键名)内容
		*@key string 键名(对象属性) @value string|object|array 添加或修改的数据 @is_encode boolean 是否给字符串编码(true|false) 
		*/
		this.set=function(key,value,is_encode){
			/*默认给字符串编码*/
			(is_encode)||(is_encode=false);
			if (!key) {return;}
			if (is_object(value)||is_array(value)) {
				this._Storage.setItem(key, is_encode ? JSON.stringify(value) : encodeURIComponent(JSON.stringify(value)) );
				/*或者这样写: this._Storage[key]= is_encode ? JSON.stringify(value) : encodeURIComponent(JSON.stringify(value)); */
			}
			else{
				this._Storage.setItem(key, is_encode ? value : encodeURIComponent(value) );
			}
		}
		/*获取localStorage对象或者sessionStorage对象的属性(键名)内容
		*@key string 键名(对象属性) @decode 是否给字符串解码(true|false)
		*/
		this.get=function(key,decode){
			/*默认给字符串解码*/
			(decode)||(decode=false);
			if(!key) {return;}
			var copy="",data="";
			copy=data= decode ? this._Storage.getItem(key) : decodeURIComponent(this._Storage.getItem(key));
			/*或者这样写: var data= decode ? this._Storage[key] : decodeURIComponent(this._Storage[key]); */
			try{
				data=JSON.parse(data);
			}
			catch(error){
				console.log("错误！"+error.message);	
			}	
			return is_object(data)||is_array(data) ? data : copy ;
		}
		/*移除localStorage对象或者sessionStorage对象的属性(键名)内容
		*@key stirng 键名(对象属性) @mode boolean 移除全部属性
		*/
		this.remove=function(key,mode){
			/*默认移除指定的localStorage或sessionStorage内容*/
			(key)||(mode=true);
			mode ? this._Storage.clear() : this._Storage.removeItem(key) ;
		}
		/*遍历localStorage对象或者sessionStorage对象的属性(键名)内容
		*@fun function 回调函数，传入2个参数【@key (键名),@value (键值)】
		*/
		this.foreach=function(fun){
			for(var i=0,len=this._Storage.length;i<len;i++){
				var key=this._Storage.key(i);
				var value=this.get(key);
				is_function(fun)&&fun.call(this,key,value);
			}
		}
	}


}
plug_public.prototype={
	/*简单给特定的json数据编码为特定的字符串
	*@json object 对象，格式为 如：{key:"value",key1:"value1"},键值（属性值）只能为字符串格式
	*@C object json格式，配置，设置分割标记字符串 @encode是否编码（encodeURIComponent），默认选择编码（值：true|"false"）
	*/
	en_str_json:function(json,C,encode){
		if (is_object(json)) {
			(encode)||(encode=true);
			(is_object(C))||(C={});
			/*键名和键值的分割标记*/
			(C.key)||(C.key="<=>");
			/*键名与键值跟键名与键值之间的分割标记*/
			(C.k_v)||(C.k_v="<,>");
			var str="";
			var keyL=C.key.length, k_vL=C.k_v.length;
			if (encode===true) {
				foreach(json,function(JSON,key,value){
					str+=key+C.key+encodeURIComponent(value)+C.k_v;
					//str+=key+C.key+(value)+C.k_v;
				});
				return str.substr(0,str.length-k_vL);
			}
			if (encode==="false") {
				foreach(json,function(JSON,key,value){
					str+=key+C.key+value+C.k_v;
				});	
				return str.substr(0,str.length-k_vL);		
			}
		}
		else{
			return false;
		}
	}
	/*设置单个cookie*/
	,setCookie:function(c_key,value,time,dir){
		var t=new Date();
		var Day= time && typeof time ==="number" ? time : 7 ;
		t.setTime(t.getTime()+Day*24*60*60*1000);
		document.cookie= 	dir ? c_key+"="+value+";expires="+t.toGMTString()+";path="+dir : 
							c_key+"="+value+";expires="+t.toGMTString()+"path=/";
	}
	/*删除单个cookie*/
	,delCookie:function(c_key,dir){
		dir= dir? dir : "/" ;
		this.setCookie(c_key,"",0,dir);
		this.setCookie(c_key,"",-2,dir);
		return this.getCookie(c_key)? "删除cookie失败！"+this.getCookie(c_key) : "删除cookie成功";
	}
	/*获取单个cookie*/
	,getCookie:function(c_key){
		var arr=document.cookie.split("; ");
		/*console.log(arr)*/
		var c_str="";
		foreach(arr,function(arr,key,value){
			var a=value.split("=");
			/*console.log(a[0],a[1])*/
			if (a[0]===c_key) {
				c_str=a[1];
			}
		});
		console.log(c_str)
		return c_str;
	}
	/*批量设置cookie*/
	,setCookies:function(arr_json){	
		/*参数如：[{key:"xxx",value:"xxx",time:x},{}]*/
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
	/*批量删除cookie*/
	,delCookies:function(arr_json,all){
		/*参数如：arr_json=>[{key:"xxx",value:"xxx",time:x},{}]*/
		(!all)&&(all=true);/*//默认删除全部cookie*/
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
	/*批量获取cookie*/
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
	/*
	*不刷新页面改变浏览器地址栏
	*@url string 输入要改变的url地址 @json object json格式数据，可以为空 @title string 网页标题,可以不填 @mode string 模式值：(pushState|0|replaceState|1)
	*/
	,setURL:function(url,json,title,mode){
		(json) || (json={id:this.randomString(5,"n")});
		(title)|| (title="");
		(mode)	||	(mode="replaceState");
		var o={
			pushState:function(){
				if ( "pushState" in history) {
					history.pushState(json,title,url);
				}				
			}
			,"0":function(){
				this.pushState();
			}
			,"replaceState":function(){
				("replaceState" in history) && (history.replaceState(json,title,url));
			}
			,"1":function(){
				this.replaceState();
			}
		};
		o[mode]();

	}


};
var public = new plug_public();

/*小模板引擎*/
function tmpl(){
	this.html={};
	this.tmpl={};
	this.data={};

	this.init();
}
tmpl.prototype={
	/*模板匹配*/
	preg:/{{.+?}}/g
	/*
	*处理并返回匹配部分的数据（json）
	*@tagNameIDValue string 自定义属性的值(值要设为唯一) @myTagName string 标记名称
	*/
	,getTMPL:function(tagNameIDValue,myTagName){
		(myTagName)||(myTagName="fwf");
		var htmlString=this.html[myTagName][tagNameIDValue];
		if(is_string(htmlString) && htmlString.length>0){
			var gTag=htmlString.match(this.preg);
			var iTag=[];
			foreach(gTag,function(arr,i,value){
				iTag[i]=value.replace(/({{|}})/g,"");
			});
			return {
				iTag:iTag
				,gTag:gTag
				,"0":iTag
				,"1":gTag
				,i:iTag
				,g:gTag
			};
		}
	}
	/*获取匹配部分的数据*/
	,toTMPL:function(tagNameIDValue,myTagName){
		(myTagName)||(myTagName="fwf");
		return  (tagNameIDValue) && (this.tmpl[myTagName][tagNameIDValue]);
	}
	/*
	*@name string 模板变量名称 @data string|array|object|number 给模板变量名赋值
	*/
	,assign:function(name,data,myTagName){
		if (!data) {return false;}
		(name)||(name="list");
		(myTagName)||(myTagName="fwf");
		is_object(this.data[myTagName])||(this.data[myTagName]={});
		this.data[myTagName][name]=data;

	}
	/*
	*模板渲染
	*/
	,display:function(name,tagNameIDValue,tagNameID,myTagName){
		(name)||(name="list");
		(tagNameID)||(tagNameID="fwfID");
		(myTagName)||(myTagName="fwf");
		var ele=getElements(tagNameIDValue,tagNameID,0,{mode:"myAttribute"})[0];
		var _this=this;
		var TMPL=this.tmpl[myTagName][tagNameIDValue];
		var tmpl_var=this.data[myTagName][name];

		var htmlString=this.html[myTagName][tagNameIDValue];
		var htmlCode=this.html[myTagName][tagNameIDValue];
		/*模板字符串替换*/
		function retrunHTML(){
			htmlString=htmlCode;
			foreach(TMPL["gTag"],function(arr,i,v){
				var iTag=TMPL["iTag"][i].replace(name,"");
				(/(\.[A-z_]|\[\"[A-z_0-9]+\"\]|\[\'[A-z_0-9]+\'\])/i.test(iTag))||(iTag="['"+iTag+"']");
				/*console.log(i,iTag,htmlString);*/
				/*var A=v.split(/[\.]/g);*/
				if(is_object(tmpl_var)){
					/*把值（json数据）存在全局变量里，用来扩展*/
					window[tagNameIDValue+"_"+name]=tmpl_var;
					htmlString=htmlString.replace(v,eval("tmpl_var"+iTag));
				}
				else{
					htmlString = (TMPL["iTag"][i]===name||TMPL["iTag"][i]==="."+name) ? htmlString.replace(v,tmpl_var) : "";
					/*(TMPL["iTag"][i]===name||TMPL["iTag"][i]==="."+name)&&(htmlString=htmlString.replace(v,tmpl_var));*/
				}
				
			});
			return htmlString;
		}
		if(is_object(ele)&&("innerHTML" in ele)&&ele.getAttribute("name")===name){
			var htmlString=this.html[myTagName][tagNameIDValue];
			var htmlCode=this.html[myTagName][tagNameIDValue];
			if(is_object(tmpl_var)){
				ele.innerHTML=retrunHTML();
				return;
			}
			if (is_array(tmpl_var)) {
				var HTML="";
				var Arr=tmpl_var;
				/*tmpl_var=null;*/
				foreach(Arr,function(arr,i,value){
					/*如果value的值是一个对象(json格式),添加`jsonString`属性存放编码过的json字符串数据，扩展而已*/
					value.jsonString= is_object(value) ? encodeURIComponent(JSON.stringify(value)) : encodeURIComponent(value) ;
					tmpl_var=value;
					/*console.log("obj?"+tmpl_var);*/
					/*if(is_object(tmpl_var)){
						HTML+=retrunHTML();
					}*/
					HTML+=retrunHTML();

				});
				ele.innerHTML=HTML;
				return;
			}
		}
	}
	/*
	*把特定标记的元素标签的innerHTML属性值保存起来
	*@myTagName string 自定义(属性)标记名称(元素的初步获取,属性值为“true”的才获取)
	*@tagNameID string 自定义属性（用与元素标签的再次确认获取，属性值要设为唯一的）
	*/
	,init:function(myTagName,tagNameID){
		(myTagName)||(myTagName="fwf");
		(tagNameID)||(tagNameID="fwfID");
		is_object(this.html[myTagName])||(this.html[myTagName]={});
		is_object(this.tmpl[myTagName])||(this.tmpl[myTagName]={});
		var _this=this;
		var sE=getElements("true",myTagName,0,{mode:"myAttribute"});
		foreach(sE,function(arr,i,value){
			var tagNameIDValue=value.getAttribute(tagNameID);
			if(tagNameIDValue!=null){
				_this.html[myTagName][tagNameIDValue]=value.innerHTML;
				_this.tmpl[myTagName][tagNameIDValue]=_this.getTMPL(tagNameIDValue,myTagName);
			}
		});
	}
};
var $T=new tmpl();
/* "&&"跟"||"的区分
*“&&”是前面的值为真（true）才跳转到下一步直到遇到值为假（false）才停止返回【一假既假，全真为真】
*“||”与“&&”的性质相反【一真为真，全假为假】
*正则表达式的"i"标记是不区分大小写的意思，"g"标志是全局匹配，"gi"表示全局匹配并且不区分大小写(多次匹配)。局部匹配(只匹配一次)
*区分大小写局部匹配:/正则表达式/。不区分大小写局部匹配:/正则表达式/i。区分大小写全部匹配:/正则表达式/g。不区分大小写全部匹配:/正则表达式/gi
*
*/