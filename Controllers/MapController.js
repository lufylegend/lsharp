function MapController(){
	base(this,MyController,[]);
}
MapController.prototype.construct=function(){
	var self = this;
	self.initOver = false;
	LMvc.keepLoading(true);
	self.libraryLoad();
};
MapController.prototype.imagesLoad = function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.init);
};
MapController.prototype.libraryLoad=function(){
	var self = this;
	self.load.library(["character/Action","character/Character","character/Face","LStarQuery","Items/Entrance","BitmapSprite"],self.helperLoad);
};
MapController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["GetButton","Talk"],self.libraryComplete);
};
MapController.prototype.libraryComplete=function(){
	var self = this;
	LRPGMapScript.analysis();
};
MapController.prototype.addMap=function(mapPath){
	var self = this;
	self.model.loadMapFile(mapPath,self.loadMapFileOver);
};
MapController.prototype.addCoordinateCheck=function(index,startX,startY,endX,endY,funName){
	this.model.addCoordinateCheck(index,startX,startY,endX,endY,funName);
};
MapController.prototype.loadMapFileOver=function(){
	var self = this;
	self.imagesLoad();
};
MapController.prototype.addCharacter=function(index,action,direction,x,y,ishero){
	var self = this;
	self.view.addCharaLayer(index,action,direction,x,y,ishero);
	LRPGMapScript.initialization();
};
MapController.prototype.init = function(){
	var self = this;
	LMvc.keepLoading(false);
	self.view.init();
	LRPGMapScript.initialization();
};
MapController.prototype.mapMove=function(){
	var self = this;
	var map = self.model.map;
	//根据地图缩放比例，重新计算缩放后的地图大小
	var w = map.width*self.view.baseLayer.scaleX;
	var h = map.height*self.view.baseLayer.scaleY;
	//根据地图缩放比例，重新计算地图的实际显示范围
	var showW = LGlobal.width/self.view.baseLayer.scaleX;
	var showH = LGlobal.height/self.view.baseLayer.scaleY;
	if(w > LGlobal.width){
		//移动人物层，保持角色的x始终处在地图中央
		self.view.charaLayer.x  = showW*0.5 - self.view.hero.x;
		if(self.view.charaLayer.x > 0){
			self.view.charaLayer.x = 0;
		}else if(self.view.charaLayer.x < showW - map.width){
			self.view.charaLayer.x = showW - map.width;
		}
	}else{
		self.view.charaLayer.x = 0;
	}
	if(h > LGlobal.height){
		//移动人物层，保持角色的y始终处在地图中央
		self.view.charaLayer.y  = showH*0.5 - self.view.hero.y;
		if(self.view.charaLayer.y > 0){
			self.view.charaLayer.y = 0;
		}else if(self.view.charaLayer.y < showH - map.height){
			self.view.charaLayer.y = showH - map.height;
		}
	}else{
		self.view.charaLayer.y = 0;
	}
	//保持其他层的坐标和人物层一致
	self.view.mapLayer.x = self.view.gridLayer.x = self.view.buildLayer.x = self.view.charaLayer.x;
	self.view.mapLayer.y = self.view.gridLayer.y = self.view.buildLayer.y = self.view.charaLayer.y;
	//排序
    self.view.charaLayer.childList =  self.view.charaLayer.childList.sort(function(a,b){return a.y > b.y;});
};
MapController.prototype.queryInit=function(){
	var self = this;
	var map = self.model.map.data;
	//初始化寻路类
	var query = new LStarQuery();
	query._map = [];
	query._w = map[0].length;
	query._h = map.length;
	//初始化寻路类的地图
	for (var y=0; y<query._h; y++) {
		query._map.push([]);
		for (var x=0; x<query._w; x++) {
			query._map[y].push(new LNode(x,y,map[y][x]));
		}
	}
	self.query = query;
};
MapController.prototype.mapClick = function(event){
	var self = event.clickTarget.parent.parent.controller;
	if(!self.initOver)return;
	if(LRPGObject.talkLayer){
		if(LRPGObject.talkOver){
			TalkRemove();
		}
		return;
	}
	self.characterClick(event.selfX,event.selfY);
	var coordinate = self.view.hero.getTo();
	var fx = coordinate[0] , fy = coordinate[1];
	var cx = event.selfX/self.view.baseLayer.scaleX/self.stepWidth >>> 0 , cy = event.selfY/self.view.baseLayer.scaleY/self.stepHeight >>> 0;
	cx = event.selfX/self.stepWidth >>> 0 , cy = event.selfY/self.stepHeight >>> 0;
	var returnList = self.query.queryPath(new LPoint(fx,fy),new LPoint(cx,cy));
	if(returnList.length > 0){
		self.view.hero.setRoad(returnList);
	}
};
MapController.prototype.characterClick = function(cx,cy){
	var self = this;
	var childList = self.view.charaLayer.childList,child;
	for(var i=0,l=childList.length;i<l;i++){
		child = childList[i];
		if(self.view.hero && self.view.hero.index == child.index)continue;
		if(child.histTestOn(cx - child.x,cy - child.y)){
			ScriptFunction.analysis("Call.characterclick"+child.index + "();");
			return;
		}
	}
};
MapController.prototype.testMinus = function(event){
	var self = event.clickTarget.parent.parent.controller;
	if(self.view.baseLayer.scaleX <= 0.5)return;
	self.viewBaseLayerScale(-0.1);
	self.mapMove();
};
MapController.prototype.testPlus = function(event){
	var self = event.clickTarget.parent.parent.controller;
	if(self.view.baseLayer.scaleX >= 1)return;
	self.viewBaseLayerScale(0.1);
	self.mapMove();
};
MapController.prototype.viewBaseLayerScale = function(num){
	var self = this;
	self.view.baseLayer.scaleX += num;
	self.view.baseLayer.scaleY = self.view.baseLayer.scaleX = (self.view.baseLayer.scaleX*10 >>> 0)*0.1;
	self.view.textScale.text = (self.view.baseLayer.scaleX*100 >>> 0)+"%";
	
	var map = self.model.map;
	var w = map.width*self.view.baseLayer.scaleX;
	var h = map.height*self.view.baseLayer.scaleY;
	if(w > LGlobal.width){
		self.view.baseLayer.x = 0;
	}else{
		self.view.baseLayer.x = (LGlobal.width - w)*0.5;
	}
	if(h > LGlobal.height){
		self.view.baseLayer.y = 0;
	}else{
		self.view.baseLayer.y = (LGlobal.height - h)*0.5;
	}
};
MapController.prototype.testGridShow = function(event){
	var self = event.clickTarget.parent.parent.controller;
	self.view.gridLayer.visible = !self.view.gridLayer.visible;
};
MapController.prototype.addItem = function(name,x,y){
	this.view.addItem(name,parseInt(x),parseInt(y));	
};
MapController.prototype.openmenuClick = function(){
	var self = this;
	self.loadMvc("Menu",self.openmenuComplete);	
};
MapController.prototype.openmenuComplete = function(){
	var self = this;
	var menu = new MenuController();
	menu.baseView = self.view;
	self.view.parent.addChild(menu.view);
	//移动端的时候，为了提高效率，将地图隐藏
	if(LGlobal.canTouch){
		self.view.visible = false;
	}
};
MapController.prototype.showBattle = function(battleIndex){
	var self = this;
	LRPGObject.battleIndex = battleIndex;
	self.loadMvc("Battlemap",self.showBattleComplete);	
};
MapController.prototype.showBattleComplete = function(){
	var self = this;
	var battlemap = new BattlemapController();
	battlemap.baseView = self.view;
	self.view.parent.addChild(battlemap.view);
	self.view.visible = false;
};