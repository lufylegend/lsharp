function MapModel(){
	base(this,MyModel,[]);
}
MapModel.prototype.construct=function(){
	var self = this;
	self.map = null;
	self.atRect = [];
};
MapModel.prototype.loadMapFile=function(mapPath){
	var self = this;
	//开始读取战场地图文件
	var urlloader = new LURLLoader();
	urlloader.parent = self;
	urlloader.addEventListener(LEvent.COMPLETE,self.loadMapFileOver);
	urlloader.load("./script/maps/"+mapPath+(LGlobal.traceDebug?("?"+(new Date()).getTime()):""),"text");
};
MapModel.prototype.loadMapFileOver=function(event){
	var self = event.currentTarget.parent;
	//保存战场地图文件内容
	self.map = JSON.parse(event.target);
	
	var grids = self.map.data;
	self.stepWidth = self.map.width/grids[0].length;
	self.stepHeight = self.map.height/grids.length;
	
	self.controller.loadMapFileOver();
};
MapModel.prototype.addCoordinateCheck=function(index,startX,startY,endX,endY,funName){
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
MapModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"talkbox",path:LMvc.IMG_PATH+"common/talkbox.png"});
	list.push({name:"openmenu",path:LMvc.IMG_PATH+"menu/openmenu.png"});
	list.push({name:"chara-default",path:LMvc.IMG_PATH+"character/chara-default.png"});
	for(var i=0;i<self.map.imgs.length;i++){
		for(var j=0;j<self.map.imgs[i].length;j++){
			var imgObj = self.map.imgs[i][j];
			list.push({name:imgObj.img,path:LMvc.IMG_PATH+"map/"+imgObj.path});
		}
	}
	
	for(var i=0;self.map.builds && i<self.map.builds.length;i++){
		for(var j=0;j<self.map.builds[i].length;j++){
			var imgObj = self.map.builds[i][j];
			list.push({name:imgObj.img,path:LMvc.IMG_PATH+"map/"+imgObj.path});
		}
	}
	return list;
};
MapModel.prototype.setMapFiles=function(){
	this.map = LMvc.mapdata;
	delete LMvc.mapdata;
};