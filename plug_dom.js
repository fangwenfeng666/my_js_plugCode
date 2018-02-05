function plug_dom(){}
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
				listener_obj.addEventListener(envent_type,fun,false);
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
				listener_obj.removeEventListener(envent_type,fun,false);
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
	,ajax:function(json,fun,form_ele){
		//json.method-->post,get   json.action:处理地址
		if (!json.method || !json.action) {
			return false;
		}
		var xhr=new XMLHttpRequest();
		xhr.open(json.method,json.action,true);
		xhr.onreadystatechange=function(e){
			if(this.readyState==400&&this.status>=200){
				var texts=this.responseText;
				(fun)&&(fun(texts));
			}
		}
		form_ele ? xhr.send(new FormData(form_ele)) : xhr.send();	
	}
};
