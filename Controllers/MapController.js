function MapController(){
	base(this,MyController,[]);
}
MapController.prototype.construct=function(){
	var self = this;
	LMvc.keepLoading(true);
	self.model.setMapFiles();
	self.imagesLoad();
};
MapController.prototype.imagesLoad = function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.libraryLoad);
};
MapController.prototype.libraryLoad=function(){
	var self = this;
	self.load.library(["Action","Character","LStarQuery"],self.init);
};
MapController.prototype.init = function(){
	var self = this;
	LMvc.keepLoading(false);
	self.view.init();
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
	var coordinate = self.view.hero.getTo();
	var fx = coordinate[0] , fy = coordinate[1];
	var cx = event.selfX/self.view.baseLayer.scaleX/self.stepWidth >>> 0 , cy = event.selfY/self.view.baseLayer.scaleY/self.stepHeight >>> 0;
	var returnList = self.query.queryPath(new LPoint(fx,fy),new LPoint(cx,cy));
	if(returnList.length > 0){
		self.view.hero.setRoad(returnList);
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