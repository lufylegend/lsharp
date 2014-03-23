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
	
	var buttonMap1 = new LButtonSample1("地图测试",25,"宋体");
	buttonMap1.x = 50;
	buttonMap1.y = 50;
	self.backLayer.addChild(buttonMap1);
	buttonMap1.addEventListener(LMouseEvent.MOUSE_UP, function(event){
		var button = event.clickTarget;
		button.parent.parent.controller.showMap1();
	});
	
};