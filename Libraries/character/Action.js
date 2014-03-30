function Action(index,action,direction,sizeW,sizeH){
	var self = this;
	base(self,LSprite,[]);
	if(typeof sizeW == UNDEFINED){
		sizeW = 320;
	}
	if(typeof sizeH == UNDEFINED){
		sizeH = 240;
	}
	self.sizeW = sizeW;
	self.sizeH = sizeH;
	var data = new LBitmapData(LMvc.datalist["chara-default"]);
	var list = LGlobal.divideCoordinate(data.width,data.height,1,1);
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
	var list = LGlobal.divideCoordinate(bitmapData.width,self.sizeH,1,bitmapData.width/self.sizeW >>> 0);
	bitmapData.setProperties(0,0,self.sizeW,self.sizeH);
	self.anime.bitmap.bitmapData = bitmapData;
	self.anime.imageArray = list;
};