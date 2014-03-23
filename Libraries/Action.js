function Action(index,action,direction){
	var self = this;
	base(self,LSprite,[]);
	
	var list = LGlobal.divideCoordinate(320,240,1,1);
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
	var bitmapData = new LBitmapData(event.currentTarget);
	var list = LGlobal.divideCoordinate(bitmapData.width,240,1,bitmapData.width/320 >>> 0);
	bitmapData.setProperties(0,0,320,240);
	self.anime.bitmap.bitmapData = bitmapData;
	self.anime.imageArray = list;
};