function plug_date(){
	this.time=new Date();
}
plug_date.prototype={
	//time:new Date()
	getYear:function(mode){
		return mode ? this.time.getYear() : this.time.getFullYear();
	}
	,getMonth:function(){
		return this.time.getMonth()+1;
	}
	,getDate:function(){
		return this.time.getDate();
	}
	,getDay:function(){
		return this.time.getDay();//星期几 0为星期日，1为星期一...
	}
	,getHours:function(mode){//时
		return (mode&&this.time.getHours>12) ? this.time.getHours()-12 : this.time.getHours();//默认24小时制
	}
	,getMinutes:function(){//分
		return this.time.getMinutes()<10 ? "0"+this.time.getMinutes() : this.time.getMinutes();
	}
	,getSeconds:function(){//秒
		return this.time.getSeconds()<10 ? "0"+this.time.getSeconds() : this.time.getSeconds();
	}
	,format:function(format,language){
		var day_ch=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
		var day_en=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		if (format) {
			format=format.replace(/Y/i,this.getYear());
			format=format.replace(/y/i,this.getYear(true));
			format=this.getMonth()>9 ? format.replace(/(M|m)/i,this.getMonth()) : format.replace(/(M|m)/i,"0"+this.getMonth());
			//format=this.getMonth()>9 ? format.replace(/m/i,this.getMonth()) : format.replace(/m/i,"0"+this.getMonth());
			format=this.getDate()>9  ? format.replace(/D/i,this.getDate())  : format.replace(/D/i,"0"+this.getDate());
			format=this.getHours()>9 ? format.replace(/H/i,this.getHours()) : format.replace(/H/i,"0"+this.getHours());
			format=format.replace(/h/i,this.getHours(true));
			format= format.replace(/(I|i)/i,this.getMinutes());
			//format= format.replace(/i/i,this.getMinutes());
			format= format.replace(/(S|s)/i,this.getSeconds());
			//format= format.replace(/s/i,this.getSeconds());
			format= language ? format.replace(/d/i,day_en[this.getDay()]) : format.replace(/d/i,day_ch[this.getDay()]) ;
			return format;
		}
		else{
			return false;
		}
	}
	,timer:function(time_str){
		if (time_str&&/\:/i.test(time_str)) {
			var arr=time_str.split(":");
			var h=parseInt(arr[0]),i=parseInt(arr[1]),s=parseInt(arr[2]);
			s++;
			(s>59)&&(i++)&&(s=0);
			(i>59)&&(h++)&&(i=0);
			(h>23)&&(location.reload());
			h= h<10 ? "0"+h : h;
			i= i<10 ? "0"+i : i;
			s= s<10 ? "0"+s : s;
			return h+":"+i+":"+s;
		}
		else{
			return false;
		}
	}
};