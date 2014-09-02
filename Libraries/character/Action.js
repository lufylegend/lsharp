function Action(index,action,direction,sizeW,sizeH,RS){
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
	if(!RS)RS="R";
	self.RS = RS;
	var data,list;
	if(self.RS == "R"){
		data = new LBitmapData(LMvc.datalist["chara-default"]);
		list = LGlobal.divideCoordinate(data.width,data.height,1,1);
	}else if(self.RS == "S"){
		data = new LBitmapData(LMvc.datalist["chara-default-"+action+"-"+CharacterDirection.RIGHT],0,0,self.sizeW,self.sizeH);
		list = LGlobal.divideCoordinate(data.width,self.sizeH,1,data.width/self.sizeW >>> 0);
	}
	self.anime = new LAnimationTimeline(data,list);
	self.anime.speed = 2;
	if(self.RS == "S"){
		self.anime.setAction(0,0,1,direction != CharacterDirection.RIGHT);
		self.anime.speed = 6;
	}
	self.anime.addEventListener(LEvent.COMPLETE,self.oncomplete);
	self.addChild(self.anime);
	loader = new LLoader();
	loader.parent = self;
	loader.addEventListener(LEvent.COMPLETE,self.loadOver);
	if(self.RS == "S"){
		loader.load(LMvc.IMG_PATH+"character/"+index+"/"+(self.RS == "R"?"":"s/")+action+"-right.png","bitmapData");
	}else{
		loader.load(LMvc.IMG_PATH+"character/"+index+"/"+(self.RS == "R"?"":"s/")+action+"-"+direction+".png","bitmapData");
	}
}
Action.prototype.loadOver = function(event){
	var self = event.currentTarget.parent;
	var bitmapData = new LBitmapData(event.target);
	var list = LGlobal.divideCoordinate(bitmapData.width,self.sizeH,1,bitmapData.width/self.sizeW >>> 0);
	bitmapData.setProperties(0,0,self.sizeW,self.sizeH);
	self.anime.bitmap.bitmapData = bitmapData;
	self.anime.imageArray = list;
};
Action.prototype.oncomplete = function(event){
	var self = event.currentTarget.parent;
	var charaLayer = self.parent;
	if(!charaLayer)return;
	var chara = charaLayer.parent;
	if(!chara)return;
	//console.log("chara.dispatchEvent(LEvent.COMPLETE);",chara);
	chara.dispatchEvent(LEvent.COMPLETE);
};