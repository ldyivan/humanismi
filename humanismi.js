function addEvent(ele,type,callback){
	if(ele.addEventListener){
		ele.addEventListener(type,callback,false);
	}else if(ele.attachEvent){
		ele.attachEvent('on'+type,callback);
	}else{
		ele['on'+type]=callback;
	}
}
window.onload=function () {
	var gethi;
	var body = document.querySelector('body');
	var updatehi = document.querySelector('.sub');
	var time_progress = document.querySelector('.progress-time');
	var humanismi = document.querySelector('.humanismi');
	var from = document.querySelector('.from');
	var queue = [];
	var times = new Date().getTime();
	update();
	setcolor();
	time_update()
	function update() {
		gethi = new XMLHttpRequest();
		gethi.open("GET","https://sslapi.hitokoto.cn/?c=a");
		// gethi.responseType="json";
		//{
		//  "id": 1405,
		//  "humanismi": "男人就应该保持冷静，沸腾的水只会被蒸发掉。",
		//  "type": "a",
		//  "from": "假面骑士kabuto",
		//  "creator": "魅影陌客",
		//  "created_at": "1319248277000"
		//}
		gethi.send();
		gethi.onreadystatechange = function () {
			if (gethi.readyState===4 && gethi.status===200) {
				var Hi = JSON.parse(gethi.responseText);
				humanismi.innerHTML = Hi.hitokoto;
				from.innerHTML = "- "+ Hi.from;
				console.log(Hi.hitokoto);
			}
		}
	}
	function setcolor() {
		body.style.background=body.style.color=updatehi.style.background=time_progress.style.background=color();
	}
	function color() {
		return "rgb("+random()+","+random()+","+random()+")";
	}
	function random() {
		return Math.floor(Math.random()*(81)+60)
	}
	function time_update(){
		console.log(queue);
		queue[queue.length] = setInterval(function(){
			time_progress.style.left=time_progress.style.left=="0%"?"100%":"0%";
			update();
			setcolor();
			console.log((new Date().getTime()-times)/1000);
			times = new Date().getTime();
			},15000);
	}
	addEvent(updatehi,'click',function(){
		for (var i = 0; i < queue.length; i++) {
			clearInterval(queue[i]);
		}
		queue=[];
		console.log(queue);
		update();
		time_update();
	})
	setTimeout(function(){
		time_progress.style.left = ""||"100%";
	},200)
}