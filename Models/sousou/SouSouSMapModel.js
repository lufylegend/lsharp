function SouSouSMapModel(){
	LExtends(this,MyModel,[]);
}
SouSouSMapModel.prototype.construct=function(){
	var self = this;
	self.map = null;
	self.atRect = [];
};
SouSouSMapModel.prototype.loadMapFile=function(mapPath){
	var self = this;
	//开始读取战场地图文件
	var urlloader = new LURLLoader();
	urlloader.parent = self;
	urlloader.addEventListener(LEvent.COMPLETE,self.loadMapFileOver);
	urlloader.load("./script/maps/sousou/"+mapPath+(LGlobal.traceDebug?("?"+(new Date()).getTime()):""),"text");
};
SouSouSMapModel.prototype.loadMapFileOver=function(event){
	var self = event.currentTarget.parent;
	//保存战场地图文件内容
	self.map = JSON.parse(event.target);
	
	var grids = self.map.data;
	self.stepWidth = self.map.width/grids[0].length;
	self.stepHeight = self.map.height/grids.length;
	
	self.controller.loadMapFileOver();
};
SouSouSMapModel.prototype.addCoordinateCheck=function(index,startX,startY,endX,endY,funName){
	var self = this;
	var child = {
		"index":index,
		"rect":new LRectangle(
			parseInt(startX),
			parseInt(startY),
			parseInt(endX)-parseInt(startX),
			parseInt(endY)-parseInt(startY)
		),
		"fun":funName
	};
	self.atRect.push(child);
};
SouSouSMapModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"talkbox",path:LMvc.IMG_PATH+"common/talkbox.png"});
	list.push({name:"openmenu",path:LMvc.IMG_PATH+"menu/openmenu.png"});
	list.push({name:"img-small",path:LMvc.IMG_PATH+"sousou/smap/" + self.map["img-small"]});
	return list;
};
SouSouSMapModel.prototype.setMapFiles=function(){
	this.map = LMvc.mapdata;
	delete LMvc.mapdata;
};