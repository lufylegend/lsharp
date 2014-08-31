function WindowBackground(index,w,h){
	var self = this;
	base(self,LSprite,[]);
	if(!index)index=1;
	self.index = index;
	loader = new LLoader();
	loader.parent = self;
	loader.addEventListener(LEvent.COMPLETE,self.loadOver);
	self.w = w;
	self.h = h;
	self.size = 25;
	var src;
	switch(index){
		case 1:
			src = "wb01.png";
			break;
		case 2:
			src = "wb02.png";
			break;
		case 3:
			src = "wb03.png";
			self.size = 6;
			break;
	}
	loader.load(LMvc.IMG_PATH+"window/"+src,"bitmapData");
}
WindowBackground.prototype.loadOver = function(event){
	var self = event.currentTarget.parent,data = event.target,
	w = self.w,h = self.h,size = self.size,bitmapData,bitmap;
	self.data = data;
	//left up
	bitmapData = new LBitmapData(data,0,0,size,size);  
	bitmap = new LBitmap(bitmapData);
	self.addChild(bitmap);
	//up
	bitmapData = new LBitmapData(data,size,0,size,size);  
	bitmap = new LBitmap(bitmapData);
	bitmap.x = size;
	bitmap.scaleX = (w - size*2)/size;
	self.addChild(bitmap);
	//right up
	bitmapData = new LBitmapData(data,0,0,size,size);  
	bitmap = new LBitmap(bitmapData);
	bitmap.x = w;
	bitmap.scaleX = -1;
	self.addChild(bitmap);
	//left
	bitmapData = new LBitmapData(data,size,0,size,size);  
	bitmap = new LBitmap(bitmapData);
	bitmap.x = size*1.5 - h*0.5;
	bitmap.y = -size*0.5 + h*0.5;
	bitmap.scaleX = (h - size*2)/size;
	bitmap.rotate = -90;
	self.addChild(bitmap);
	//right
	bitmapData = new LBitmapData(data,size,0,size,size);  
	bitmap = new LBitmap(bitmapData);
	bitmap.x = size*0.5 - h*0.5 + w;
	bitmap.y = -size*0.5 + h*0.5;
	bitmap.scaleX = (h - size*2)/size;
	bitmap.rotate = 90;
	self.addChild(bitmap);
	//down
	bitmapData = new LBitmapData(data,size,0,size,size);  
	bitmap = new LBitmap(bitmapData);
	bitmap.x = size;
	bitmap.y = h;
	bitmap.scaleX = (w - size*2)/size;
	bitmap.scaleY = -1;
	self.addChild(bitmap);
	//left down
	bitmapData = new LBitmapData(data,0,0,size,size);  
	bitmap = new LBitmap(bitmapData);
	bitmap.y = h;
	bitmap.scaleY = -1;
	self.addChild(bitmap);
	//right down
	bitmapData = new LBitmapData(data,0,0,size,size);  
	bitmap = new LBitmap(bitmapData);
	bitmap.x = w;
	bitmap.y = h;
	bitmap.scaleX = -1;
	bitmap.scaleY = -1;
	self.addChild(bitmap);
	//middle
	bitmapData = new LBitmapData(data,size,size,size,size);  
	bitmap = new LBitmap(bitmapData);
	bitmap.x = bitmap.y = size;
	bitmap.scaleX = (w - size*2)/size;
	bitmap.scaleY = (h - size*2)/size;
	self.addChild(bitmap);
};