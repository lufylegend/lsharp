function Action(index,action,direction){
	var self = this;
	base(self,LSprite,[]);
	
	var list = LGlobal.divideCoordinate(5120,240,1,16);
	var data = new LBitmapData(LMvc.datalist["chara-default"],0,0,320,240);
	self.anime = new LAnimationTimeline(data,list);
	self.anime.speed = 1;
	self.addChild(self.anime);
	loader = new LLoader();
	loader.parent = self;
	loader.addEventListener(LEvent.COMPLETE,self.loadOver);
	loader.load(LMvc.IMG_PATH+"character/"+index+"/"+action+"-"+direction+".png","bitmapData");
}
Action.prototype.loadOver = function(event){
	var self = event.target.parent;
	self.anime.bitmap.bitmapData = new LBitmapData(event.currentTarget,0,0,320,240);
};