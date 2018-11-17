function plug_canvas(){
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
plug_canvas.prototype={
	/*
	*创建画布环境(canvas标签)
	*@canvas object(canvas Element) canvas标签对象 @name string 给构造函数添加一个属性来保存画布环境
	*@fun function 回调函数
	*/
	createCanvas:function(canvas,name,fun){
		(name)||(name="ctx");
		(is_function(fun))&&(fun.call(this));
		return is_object(canvas)&&(this[name]=canvas.getContext('2d'));
	}
	/*获取画布环境对象*/
	,getCanvas:function(name,fun){
		(name)||(name="ctx");
		is_function(fun)&&fun.call(this);
		return is_object(this[name]) ? this[name] : false ;
	}
	/*清除整个画布内容或画布局部区域 矩形
	*@name string 一个属性名称（createCanvas函数参数的name对应）
	*@x number 相对与画布里的x坐标 @y number 想对于画布里的y坐标 @w number 清除的宽（长度）@h number 要清除的高
	*/
	,clearRect:function(name, x, y, w, h, fun){
		(x)||(x=0);
		(y)||(y=0);
		(w)||(w=10000);
		(h)||(h=10000);
		(name)||(name="ctx");
		is_function(fun)&&fun.call(this);
		return is_object(this[name]) ? this[name].clearRect(x,y,w,h) : false ;
	}
	/*
	*线性渐变(颜色填充) @C object json格式
	*C 参数说明
		C.position_color(二维数组，[[0,"#fff"],[1,#fff]..,["0到1的数值","颜色值"]])
		C.x1,C.y1,C.x2,C.y2 (颜色填充的范围【路径构成的图形,用于线性渐变和绘制放射性渐变】)
	*/
	,LinearGradient:function(name,C){
		(name)||(name="ctx");
		var LinearGradient =this[name].createLinearGradient(C.x1,C.y1,C.x2,C.y2);
		/*
		*LinearGradient.addColorStop(position, color)
		*addColorStop 方法接受 2 个参数，position 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。
		*例如，0.5 表示颜色会出现在正中间。color 参数必须是一个有效的 CSS 颜色值（如 #FFF， rgba(0,0,0,1)，等等）
		*/
		if (is_array(C.position_color)) {
			/*C.position_color必须是一个二维数组*/
			foreach(C.position_color,function(arr,i,value){
				LinearGradient.addColorStop(C.position_color[i][0],C.position_color[i][1]);
			});
		}
		else{
			LinearGradient.addColorStop(0,"rgba(0,0,0,1)");
			LinearGradient.addColorStop(1,"rgba(255,255,255,1");
		}	
		return 	LinearGradient;
	}
	/*绘制放射性渐变 圆(颜色填充)
	*C 参数说明
		C.position_color(二维数组，[[0,"#fff"],[1,#fff]..,["0到1的数值","颜色值"]])
		C.x1,C.y1,C.r1,C.x2,C.y2,C.r2 (颜色填充的范围【路径构成的图形,用于线性渐变和绘制放射性渐变】
	*/
	,RadialGradient:function(name,C){
		(name)||(name="ctx");
		/*前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆*/
		var RadialGradient=this[name].createRadialGradient(C.x1, C.y1, C.r1, C.x2, C.y2, C.r2);
		if (is_array(C.position_color)) {
			foreach(C.position_color,function(arr,i,value){
				RadialGradient.addColorStop(C.position_color[i][0], C.position_color[i][1]);
			});
		}
		else{
			RadialGradient.addColorStop(0, "rgba(0,0,0,1)");
			RadialGradient.addColorStop(1, "rgba(255,255,255,1");
		}
		return 	RadialGradient;
	}
	/*(颜色填充)*/
	,color:function(name,C){
		return 	is_object(C) ? C.position_color[0][1] : "rgba(0,0,0,1)";
	}
	/*绘制路径
	*@C object json格式
	*C参数说明
		C.type 			(绘制路径的类型，绘制直线还是圆弧还是二次贝塞尔曲线及三次贝塞尔曲线)
		C.colorFill 	(颜色填充方式:color|LinearGradient|RadialGradient)
		C.xy 			(二维数组，绘画路径坐标: [[0,0],..[x,y],["x坐标","y坐标"]])
		C.position_color(二维数组，[[0,"#fff"],[1,#fff]..,["0到1的数值","颜色值"]])
		C.x1,C.y1,C.r1,C.x2,C.y2,C,r2 (颜色填充的范围【路径构成的图形,用于线性渐变和绘制放射性渐变】)
	*/
	,drawPath:function(name,C){
		var _this=this;
		(name)||(name="ctx");
		var ctx=this[name];
		//console.log("p1:"+ctx);
		/*开始一条路径,或重置当前路径*/
		ctx.beginPath();
		/*绘制路径的线形类型分类*/
		var select={
			/*绘制直线*/
			"lineTo":function(){
				/*C.xy是二维数组*/
				ctx.moveTo(C.xy[0][0],C.xy[0][1]);
				for(var i=1,len=C.xy.length;i<len;i++){
					(function(i){
						ctx.lineTo(C.xy[i][0],C.xy[i][1]);
					})(i);
					
				}
				//console.log("p2:"+C.colorFill);
				if (C.is_fill===true) {
					ctx.fillStyle=_this[C.colorFill](name,C);
					ctx.fill();
				}
				else{
					(C.lineWidth)||(C.lineWidth=0.5);
					ctx.lineWidth=C.lineWidth;
					ctx.strokeStyle=_this[C.colorFill](name,C);
					ctx.stroke();
				}
			}
			/*绘制圆弧*/
			,"arc":function(){
				(C.anticlockwise)||(C.anticlockwise=false);
				(C.start)||(C.start=0);
				(C.stop)||(C.stop=2*Math.PI);
				(C.r)||(C.r=1);
				(C.is_beginPath)&&(ctx.beginPath());
				ctx.arc(C.x,C.y,C.r,C.start,C.stop,C.anticlockwise);
				if (C.is_fill===true) {
					ctx.fillStyle=_this[C.colorFill](name,C);
					ctx.fill();
				}
				else{
					(C.lineWidth)||(C.lineWidth=0.5);
					ctx.lineWidth=C.lineWidth;
					ctx.strokeStyle=_this[C.colorFill](name,C);
					ctx.stroke();
				}

			}
			/*绘制二次贝塞尔曲线*/




			/*绘制三次贝塞尔曲线*/


		};
		/*调用方法函数*/
		select[C.type]();
	}

};
Context=new plug_canvas();
/*ctx.fillStyle=pat;
ctx.fill();*/
 
