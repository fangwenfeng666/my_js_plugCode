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
					iCur[att]=document.documentElement.scrollTop||document.body.scrollTop;
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

}
plug_move.prototype={
	set_obj_att:function(obj,json_att){
		if (obj && json_att && (typeof obj=="object" && typeof json_att=="object")) {
			for(var att in json_att){
				typeof json_att[att]=="object" ? this.set_obj_att(obj[att],json_att[att]) : obj[att]=json_att[att];		
			}
		}
		else{
			return false;
		}
	}
	,getElements:function(range,attribute_name,attribute_value,is_myAtt,element_name){
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
}
/*函数里面的函数 里面的this默认指向window对象*/