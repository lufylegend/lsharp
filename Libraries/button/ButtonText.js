function ButtonText(dataName,label){
	var self = this;
	base(self,LSprite,[]);
	self.button = new LBitmap(new LBitmapData(LMvc.datalist[dataName]));
	self.addChild(self.button);

	self.label = new LTextField();
	self.label.text = label;
	self.label.size = 16;
	self.label.color = "#4B0082";
	self.label.weight = "bolder";
	self.label.x = (self.button.getWidth() - self.label.getWidth())*0.5;
	self.label.y = self.button.getHeight() - self.label.getHeight()*1.2;
	self.addChild(self.label);
}