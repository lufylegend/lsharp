function MapView(){
	base(this,LView,[]);
}
MapView.prototype.construct=function(){
};
MapView.prototype.init=function(){
	var self = this;
	self.graphics.drawRect(0,"#000000",[0, 0, LGlobal.width, LGlobal.height],true,"#000000");
	self.layerInit();
	self.mapLayerInit();
	self.gridLayerInit();
	self.buildLayerInit();
	self.testCtrlLayerInit();
	
	self.controller.queryInit();
};
/**
 * 建筑层实现
 * */
MapView.prototype.buildLayerInit=function(){
	var self = this;
	//获取地图定义
	var map = self.model.map;
	for(var i=0;i<map.builds.length;i++){
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
MapView.prototype.addCharaLayer=function(index,action,direction,x,y,ishero){
	var self = this;
	var map = self.model.map;
	var grids = map.data;
	var stepWidth = map.width/grids[0].length;
	var stepHeight = map.height/grids.length;
	
	var chara = new Character(index,stepWidth,stepHeight);
	chara.setActionDirection(action,direction);
	chara.setCoordinate(parseInt(x)*stepWidth,parseInt(y)*stepHeight);
	self.charaLayer.addChild(chara);
	if(JSON.parse(ishero))self.hero = chara;
};
/**
 * 测试层实现
 * */
MapView.prototype.testCtrlLayerInit=function(){
	var self = this;
	var backLayer = new LSprite();
	backLayer.alpha = 0.7;
	backLayer.graphics.drawRect(0,"#000000",[0, 0, 160, 200],true,"#000000");
	self.testCtrlLayer.addChild(backLayer);
	var buttonMinus = new LButtonSample1("ー",15,"宋体");
	buttonMinus.x = 20;
	buttonMinus.y = 20;
	self.testCtrlLayer.addChild(buttonMinus);
	buttonMinus.addEventListener(LMouseEvent.MOUSE_UP, self.controller.testMinus);
	var buttonPlus = new LButtonSample1("＋",15,"宋体");
	buttonPlus.x = 100;
	buttonPlus.y = 20;
	self.testCtrlLayer.addChild(buttonPlus);
	buttonPlus.addEventListener(LMouseEvent.MOUSE_UP, self.controller.testPlus);
	var textScale = new LTextField();
	textScale.text = "100%";
	textScale.color = "#FFFFFF";
	textScale.x = 55;
	textScale.y = 30;
	self.testCtrlLayer.addChild(textScale);
	self.textScale = textScale;
	
	var buttonGrid = new LButtonSample1("网格显隐",15,"宋体");
	buttonGrid.x = 30;
	buttonGrid.y = 100;
	self.testCtrlLayer.addChild(buttonGrid);
	buttonGrid.addEventListener(LMouseEvent.MOUSE_UP, self.controller.testGridShow);
};
/**
 * 地图层实现
 * */
MapView.prototype.mapLayerInit=function(){
	var self = this;
	//获取地图定义
	var map = self.model.map;
	for(var i=0;i<map.imgs.length;i++){
		for(var j=0;j<map.imgs[i].length;j++){
			var imgObj = map.imgs[i][j];
			var bitmap = new LBitmap(new LBitmapData(LMvc.datalist[imgObj.img],imgObj.rect[0],imgObj.rect[1],map.pieceWidth,map.pieceHeight));
			bitmap.x = j*map.pieceWidth;
			bitmap.y = i*map.pieceHeight;
			self.mapLayer.addChild(bitmap);
		}
	}
	//地图点击事件
	self.mapLayer.addEventListener(LMouseEvent.MOUSE_UP, self.controller.mapClick);
};
/**
 * 网格层实现
 * */
MapView.prototype.gridLayerInit=function(){
	var self = this;
	var map = self.model.map;
	var grids = map.data;
	var stepWidth = map.width/grids[0].length;
	var stepHeight = map.height/grids.length;
	self.controller.stepWidth = stepWidth;
	self.controller.stepHeight = stepHeight;
    self.gridLayer.graphics.add(function (){
    	var c = LGlobal.canvas;
		c.beginPath();
		c.strokeStyle = "#000000";
		for(var i=1;i<grids.length;i++){
			c.moveTo(0,stepHeight*i);
			c.lineTo(map.width,stepHeight*i);
		}
		for(var i=1;i<grids[0].length;i++){
			c.moveTo(stepWidth*i,0);
			c.lineTo(stepWidth*i,map.height);
		}
		c.stroke();
		
		c.beginPath();
        c.fillStyle = "#FF0000";
		for(var i=0;i<grids.length;i++){
			for(var j=0;j<grids[i].length;j++){
				if(grids[i][j] == 0)continue;
                c.rect(stepWidth*j+stepWidth*0.25, stepHeight*i+stepHeight*0.25, stepWidth*0.5, stepHeight*0.5);
			}
		}
        c.fill();
	});
};
/**
 * 游戏层的分离和加载
 * */
MapView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	//地图层
	self.mapLayer = new LSprite();
	self.baseLayer.addChild(self.mapLayer);
	//网格层
	self.gridLayer = new LSprite();
	self.gridLayer.visible = false;
	self.baseLayer.addChild(self.gridLayer);
	//人物层
	self.charaLayer = new LSprite();
	self.baseLayer.addChild(self.charaLayer);
	//遮挡层
	self.buildLayer = new LSprite();
	self.baseLayer.addChild(self.buildLayer);
	
	self.testCtrlLayer = new LSprite();
	self.addChild(self.testCtrlLayer);
	var f = new FPS();
	self.addChild(f);
	
};