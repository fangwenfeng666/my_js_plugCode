function plug_banner(){
	this.config={
		unit:"px"			//单位 px,em,rem等
		,width:1000			//图片宽度 默认单位px
		,heigth:500			//图片高度 默认单位px
		,banner:{}			//轮播总容器（元素标签）
		,image_box:{}		//图片容器（元素标签,长容器）
		,images:[]			//图片集合 （img元素标签集合）
		,switch_ico:[]		//左右切换图标（元素标签集合）
		,icons:[]			//指示图标（小圆点等，元素标签）
		,time:5000			//自动切换时间
		,v_time:500			//动画时间
		,num:0				//自动切换计数
		,json:{
			banner:"banner1"//id
			,image_box:"image_box"//class
			,images:"img"//class or tagName
			,switch_ico:"switch_ico"//class
			,icons:"icons"// class 图标类名
			,icons_color:"icons icons_color"//class 图标颜色类名
			,ID:"xxx" //记录计时器id			
		}
	}
	this.get_config=function(attribute){
		return attribute ? this.config[attribute] : false;
	}
	this.set_config=function(attr_name,attr_value){
		return (attr_name&&attr_value) ? this.config[attr_name]=attr_value : false ;
	}
	this.begin=function(ID,fun){
		var len=arguments.length,obj=this;
		this.set_config(ID,setInterval(function(){
			fun(obj);
		},this.config.time));
	}
	this.end_setIntervalID=function(ID){
		clearInterval(this.get_config(ID));
	}
	this.end_setTimeoutID=function(ID){
		clearTimeout(this.get_config(ID));
	}
	if (arguments.length>0) {
		for(var i=0,len=arguments.length;i<len;i++){
			if(typeof arguments[i]=="function"){
				arguments[i](this);
			} 
			else{
				if(typeof arguments[i]=="object"){
					for(var attribute in arguments[i]){
						this["config"][attribute]=arguments[i][attribute];
					}
				}
			}
		}
	}
}
function go_banner(att){

window[att]={
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
	,set_obj_att:function(obj,json_att){
		if (obj && (typeof json_att=="object")) {
			for(var att in json_att){
				//obj[att]={};
				if (typeof json_att[att]=="object") {
					this.set_obj_att(obj[att],json_att[att]);
				}
				else{
					obj[att]=json_att[att];
				}
			}
		}
	}
};
/*
参数：json格式，用来配置 ,类名还是标签名json（json[att]=="class"||json[att]==treu 选择类名 默认选择标签名）
*/
window[att].gogo=function(json,class_or_tag){//初始化
	(!json)&&(json={
		banner:"banner1"//id
		,image_box:"image_box"//class
		,images:"img"//class or tagName
		,switch_ico:"switch_ico"//class
		,icons:"icons"//class
		,transition:"transition2"
		,width:1000
		,unit:"px"
		,ID:"xxx"
		,icons_color:"icons icons_color" //class
	});
	this.config_bannaer=json;
	var banner=document.getElementById(json.banner);
	var image_box=this.getElements(banner,"className",json.image_box)[0];
	this.banner= new plug_banner({
		banner:banner //id="banner1"
		,image_box:image_box
		,images:(class_or_tag)&&(class_or_tag.images=="class"||class_or_tag.images==true) ? this.set_obj_att(image_box,"className",json.images) : image_box.getElementsByTagName(json.images)
		,switch_ico:this.getElements(banner,"className",json.switch_ico)
		,icons:this.getElements(banner,"className",json.icons)
		,width:json.width
		,unit:json.unit
		,json:json
	});

	//*****************************
	this._s=function(n){ /*配合this.$banner()函数方法 图标圆点*/
		var obj=this.banner,config_bannaer=json;
		var len=obj.config.icons.length;
		if(len>0){
			for(var i=0;i<len;i++){
				obj.config.icons[i].style={};
				obj.config.icons[i].className=config_bannaer.icons;
			}
				//console.log(obj.config.num,obj.config.icons[n],n);
				obj.config.icons[n].className=config_bannaer.icons_color;					
		}
		else{
			return false;
		}
	}
	//******************************
	/*
	参数：模式（l,r）,数字（用来手动跳转）,配置属性
	*/
	this.$banner=function(mode,num,config_json){	//轮播切换函数
		var json=this.config_bannaer;
		var obj=this.banner,_obj=this;
		(mode=="l")&&(obj.config.num--);
		(mode=="r")&&(obj.config.num++);
		(typeof num=="number")&&(obj.config.num=num);
		if (config_json && (typeof config_json=="object")) {
			for(var att in config_json){
				obj.config[att]=config_json[att]; //配置属性
			}
		}
		var len=obj.config.images.length;
		var leng=obj.config.icons.length>0 ? obj.config.icons.length : false ;
		var W=obj.config.width;
		var unit=obj.config.unit;
		//(obj.config.num<0)&&(this._s(leng-1));//console.log(_obj);
		switch (true){
			case obj.config.num<0: 		//页面刚加载完就向后退操作的时候
				obj.config.num=len-1;
				this.set_obj_att(obj.config.image_box,{
					style:{
						width:(W*(len+1))+unit
						,left:-(obj.config.num*W)+unit
					}
					,className:json.image_box
				});
				setTimeout(function(){
					obj.config.image_box.className=json.image_box+" "+json.transition;
					obj.config.num=len-2;
					obj.config.image_box.style.left=-(obj.config.num*W)+unit;
					_obj._s(obj.config.num);
				},100);
			break;
			case obj.config.num<1: 		//向后退操作临界判断 显示到第一张图片的时候
				obj.config.num=len-1;
				obj.config.image_box.className=json.image_box+" "+json.transition;
				obj.config.image_box.style.left=0+unit;
				setTimeout(function(){
					obj.config.image_box.className=json.image_box;
					obj.config.image_box.style.left=-(obj.config.num*W)+unit;
				},obj.config.v_time+50);
				this._s(0);
			break;						
			default: 					//默认前进操作
				this.set_obj_att(obj.config.image_box,{
					style:{
						width:(W*(len+1))+unit
						,left:-(obj.config.num*W)+unit
					}
					,className:json.image_box+" "+json.transition
				});
				if(obj.config.num>=len-1){
					obj.config.num=0;
					setTimeout(function(){
						obj.config.image_box.className=json.image_box;
						obj.config.image_box.style.left=0+unit;
					},obj.config.v_time+50);
					this._s(0);
				}

				this._s(obj.config.num);
			break;
		}
	}
	/*
	*图片左右切换  参数：模式,ID名（调用begin方法时候的ID值）,数字（手动跳转）,配置属性(json格式，可以不填)
	*/
	this.img_switch=function(mode,ID,num,config_json){
		var obj=this.banner,_obj=this;
		obj.end_setIntervalID(ID);
		clearTimeout(obj.idd);
		(!config_json)&&(config_json=false);
		if (mode=="l"||mode=="left") {
			this.$banner("l",false,config_json);
		}
		else if (mode=="r"||mode=="right") {
			this.$banner("r",false,config_json);
		}
		else{
			var len=obj.config.icons.length;
			if(typeof num=="number" && len>0){
				this.$banner(0,num,config_json) ;
				//this._s(num);
			}
		}
		obj.idd=setTimeout(function(){
			obj.begin(ID,function(o){
				_obj.$banner("r");
			});
		},obj.config.time);
	}
}

}