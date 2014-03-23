function PropsIcon(props){
	var self = this;
	base(self,LSprite,[]);
	self.props = props;
	self.iconLayer = new LSprite();
	self.addChild(self.iconLayer);
	var name = new LTextField();
	name.text = props.name+"("+props.count+")";
	name.color = "#FFAD33";
	name.weight = "bolder";
	name.size = 14;
	name.x = (100 - name.getWidth())*0.5;
	name.y = 100;
	self.addChild(name);
	loader = new LLoader();
	loader.parent = self;
	loader.addEventListener(LEvent.COMPLETE,self.loadOver);
	loader.load(LMvc.IMG_PATH+"props/"+props.icon+".png","bitmapData");
}
PropsIcon.prototype.loadOver = function(event){
	var self = event.target.parent;
	var bitmapData = new LBitmapData(event.currentTarget);
	var bitmap = new LBitmap(bitmapData);
	bitmap.x = bitmap.y = 2;
	bitmap.scaleX = bitmap.scaleY = 96/bitmap.getWidth();
	self.iconLayer.addChild(bitmap);
};