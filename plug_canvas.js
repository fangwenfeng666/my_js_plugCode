function plug_canvas(){
	var _this=this;
	var oC={
		//创建绘画环境（画布）
		context:function(ele_obj,key){
			(!key)&&(key="ct");
			var ct;
			if (_this.is_object(ele_obj)) {
				this[key]=ct=ele_obj.getContext("2d");		
			}
			//获取绘画环境对象（画布）
			this.getCt=function(){
				//console.log(ct);
				return ct;//模拟私有变量（获取函数内部变量）
			}
		}
		//画小圆点
		,draw_dot:function(x,y,R,color,fun){
			var ct=this.getCt();
			(!x)&&(x=100);
			(!y)&&(y=100);
			(!R)&&(R=1);
			(!color)&&(color="#fff");
			ct.arc(x,y,R,Math.PI*2,false);
			ct.fillStyle=color;
			ct.fill();
			(fun && typeof fun==="function")&&(fun.call(this));
		}
		//画线（两点连线）
		,draw_line:function(x0,y0,x1,y1,color,w){
			var ct=this.getCt();
			(!x0)&&(x0=0);(!y0)&&(y0=0);
			(!x1)&&(x1=100);(!y1)&&(y1=100);
			(!color)&&(color="#fff");
			(!w)&&(w=0.5);
			ct.lineWidth=w;//线条宽度
			ct.moveTo(x0,y0);
			ct.lineTo(x1,y1);
			ct.strokeStyle=color;
			ct.stroke();//给线条上色
		}
		//画线（多点连线）
		,draw_lines:function(xy_arr2,color,w){
			var ct=this.getCt();
			(!color)&&(color="#fff");
			(!w)&&(w=0.5);		
			if (xy_arr2&& typeof xy_arr2==="object") {}
			else{return ;}
			var xy_len=xy_arr2.length;
			var len=xy_len;
			ct.moveTo(xy_arr2[0][0],xy_arr2[0][1]);
			ct.lineWidth=w;
			for(var i=1;i<len;i++){
				ct.lineTo(xy_arr2[i][0],xy_arr2[i][1]);
			}
			ct.strokeStyle=color;
			ct.stroke();//给线条上色
		}
		//清除（擦除）画布
		,clear_canvas:function(){
			var ct=this.getCt();
			ct.clearRect(0,0,4000,4000);
		}
	}
	for(var att in oC){
		this[att]=oC[att];
	}
}
plug_canvas.prototype={
	//检测是否是数组
	is_array:function(argument){
		return argument && (typeof argument==="object") && ("length" in argument) ? true : false ;
	}
	//检测是否是对象
	,is_object:function(argument){
		return argument && (typeof argument==="object") && !("length" in argument) ? true : false ;
	}
	//检测是否是函数
	,is_function:function(argument){
		return argument && typeof argument==="function" ? true : false ;
	}
	//检测是否是字符串
	,is_string:function(argument){
		return argument && typeof argument==="string" ? true : false ;
	}
	//检测是否是布尔值
	,is_boolean:function(argument){
		return typeof argument==="boolean" ? true : false ;
	}
	//检测是否是数字（数值）
	,is_number:function(argument){
		return typeof argument==="number" ? true : false ;
	}
	//检测是否是未定义
	,is_undefined:function(argument){
		return typeof argument==="undefined" ? true : false;
	}
	//检测是否是为空
	,is_null:function(argument){
		return argument===null || argument==="" ? true : false;
	}
}