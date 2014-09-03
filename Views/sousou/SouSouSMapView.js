function SouSouSMapView(){
	LExtends(this,LView,[]);
}
SouSouSMapView.prototype.construct=function(){
};
SouSouSMapView.prototype.init=function(){
	var self = this;
	//self.graphics.drawRect(0,"#000000",[0, 0, LGlobal.width, LGlobal.height],true,"#000000");
	self.layerInit();
	self.mapLayerInit();
	//self.buildLayerInit();
	
	self.controller.queryInit();
	
	//地图点击事件
	self.baseLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.controller.mapMouseDown);
	self.baseLayer.addEventListener(LMouseEvent.MOUSE_UP, self.controller.mapMouseUp);
	self.addEventListener(LEvent.ENTER_FRAME, self.controller.onframe);
};
/**
 * 地图层实现
 * */
SouSouSMapView.prototype.mapLayerInit=function(){
	var self = this;
	//获取地图定义
	var map = self.model.map;
	self.mapLayer.setSmall(map);
};
SouSouSMapView.prototype.menuLayerInit=function(){
	var self = this;
	
	var openmenuButton = GetButton(LMvc.datalist["openmenu"],null,0);
	openmenuButton.x = LGlobal.width - openmenuButton.getWidth();
	openmenuButton.y = 0;
	self.addChild(openmenuButton);
	openmenuButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.controller.openmenuClick();
	});
};
/**
 * 建筑层实现
 * */
SouSouSMapView.prototype.buildLayerInit=function(){
	var self = this;
	//获取地图定义
	var map = self.model.map;
	for(var i=0;map.builds && i<map.builds.length;i++){
		for(var j=0;j<map.imgs[i].length;j++){
			var imgObj = map.builds[i][j];
			var bitmap = new LBitmap(new LBitmapData(LMvc.datalist[imgObj.img],imgObj.rect[0],imgObj.rect[1],map.pieceWidth,map.pieceHeight));
			bitmap.x = j*map.pieceWidth;
			bitmap.y = i*map.pieceHeight;
			self.buildLayer.addChild(bitmap);
		}
	}
};
/**
 * 添加人物
 * */
SouSouSMapView.prototype.addCharaLayer=function(index,action,direction,x,y,ishero){
	var self = this;
	var map = self.model.map;
	var grids = map.data;
	var stepWidth = map.width/grids[0].length;
	var stepHeight = map.height/grids.length;
	
	var chara = new Character(index,stepWidth,stepHeight,action,direction);
	//chara.setActionDirection(action,direction);
	chara.setCoordinate(parseInt(x)*stepWidth,parseInt(y)*stepHeight);
	self.charaLayer.addChild(chara);
	if(JSON.parse(ishero))self.hero = chara;
};
/**
 * 移除人物
 * */
SouSouSMapView.prototype.removeCharaLayer=function(index){
	var self = this;
	var childList = self.charaLayer.childList,child;
	for(var i=0,l=childList.length;i<l;i++){
		child = childList[i];
		if(index == child.index){
			self.charaLayer.removeChildAt(i);
			break;
		}
	}
};
/**
 * 游戏层的分离和加载
 * */
SouSouSMapView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	//地图层
	self.mapLayer = new LSouSouSMapBackground();
	self.baseLayer.addChild(self.mapLayer);
	//人物层
	self.charaLayer = new LSprite();
	self.baseLayer.addChild(self.charaLayer);
	//遮挡层
	self.buildLayer = new LSprite();
	self.baseLayer.addChild(self.buildLayer);
	
	var f = new FPS();
	self.addChild(f);
	
};
