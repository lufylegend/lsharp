function Baihu(controllerClass){
	var self = this;
	base(self,LSprite,[]);
	self.controllerClass = controllerClass;
	self.index = 1;
	self.length = 32;
	self.speed = 2;
	self.speedIndex = 0;
	self.init();
}
Baihu.COMPLETE = "complete";
Baihu.prototype.init=function(){
	var self = this;
	self.bitmap = new LBitmap(new LBitmapData(LMvc.datalist["baihu-1"]));
	self.addChild(self.bitmap);
};
Baihu.prototype.run=function(){
	var self = this;
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
};
Baihu.prototype.onframe=function(event){
	var self = event.target;
	if(self.speedIndex++<self.speed)return;
	self.speedIndex = 0;
	self.bitmap.bitmapData = new LBitmapData(LMvc.datalist["baihu-"+self.index]);
	self.index++;
	if(self.index > self.length){
		self.removeEventListener(LEvent.ENTER_FRAME, self.onframe);
		self.dispatchEvent(Baihu.COMPLETE);
	}
};
Baihu.prototype.attackFrame=function(event){
	var self = event.target;
	if(self.speedIndex++ <self.speed)return;
	self.speedIndex = 0;
	self.effect.onframe();
};
Baihu.prototype.onEffectComplete=function(event){
	var self = event.target.parent;
	var obj = self.effectList[self.index];
	self.index++;
	if(self.index > self.length){
		self.removeEventListener(LEvent.ENTER_FRAME, self.attackFrame);
		self.dispatchEvent(Baihu.COMPLETE);
		return;
	}
	self.effect.x = obj.x;
	self.effect.y = obj.y;
};
