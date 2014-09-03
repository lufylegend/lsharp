function LSouSouSMapBackground(){
	var self = this;
	LExtends(self,LSprite,[]);
}
LSouSouSMapBackground.prototype.setSmall = function(data){
	var self = this;
	
	var bitmapData = new LBitmapData(LMvc.datalist["img-small"]);
	var scale = data["width"]/bitmapData.width;
	
	self.map = new LBitmap(bitmapData);
	self.map.scaleX = self.map.scaleY = scale;
	self.addChild(self.map);
	
	var loader = new LLoader();
	loader.addEventListener(LEvent.COMPLETE,self.setBig.bind(this));
	loader.load(LMvc.IMG_PATH+"sousou/smap/" + data["img-big"]+(LGlobal.traceDebug?("?"+(new Date()).getTime()):""));
};
LSouSouSMapBackground.prototype.setBig = function(event){
	var self = this;
	self.map.bitmapData = new LBitmapData(event.target);
	self.map.scaleX = self.map.scaleY = 1;
};