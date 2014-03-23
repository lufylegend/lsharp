function MainView(){
	base(this,LView,[]);
}
MainView.prototype.construct=function(){
};
MainView.prototype.showMenu=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	
	var bg = new LBitmap(new LBitmapData(LMvc.datalist["logo"]));
	self.backLayer.addChild(bg);
	
	var buttonMap1 = new LButtonSample1("地图测试1",25,"宋体");
	buttonMap1.x = 50;
	buttonMap1.y = 50;
	self.backLayer.addChild(buttonMap1);
	buttonMap1.addEventListener(LMouseEvent.MOUSE_UP, function(event){
		var button = event.clickTarget;
		button.parent.parent.controller.showMap1();
	});
	
	var buttonMap2 = new LButtonSample1("地图测试2",25,"宋体");
	buttonMap2.x = 50;
	buttonMap2.y = 150;
	self.backLayer.addChild(buttonMap2);
	buttonMap2.addEventListener(LMouseEvent.MOUSE_UP, function(event){
		var button = event.clickTarget;
		button.parent.parent.controller.showMap2();
	});
	
};