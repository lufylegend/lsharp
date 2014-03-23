function Entrance(){
	var self = this;
	base(self,LSprite,[]);
	loader = new LLoader();
	loader.parent = self;
	loader.addEventListener(LEvent.COMPLETE,self.loadOver);
	loader.load(LMvc.IMG_PATH+"items/entrance.png","bitmapData");
}
Entrance.prototype.loadOver = function(event){
	var self = event.target.parent;
	var bitmapData = new LBitmapData(event.currentTarget,0,0,148,142);
	var list = LGlobal.divideCoordinate(444,142,1,3);
	self.anime = new LAnimationTimeline(bitmapData,list);
	self.anime.speed = 4;
	self.anime.x = -70;
	self.anime.y = -70;
	self.addChild(self.anime);
};