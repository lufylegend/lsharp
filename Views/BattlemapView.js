function BattlemapView(){
	base(this,LView,[]);
}
BattlemapView.prototype.construct=function(){
};
BattlemapView.prototype.init=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	
	var bitmapBgBack = new LBitmap(new LBitmapData(LMvc.datalist["attack_background"]));
	self.backLayer.addChild(bitmapBgBack);
	self.addArms();
};
BattlemapView.prototype.addArms=function(){
	var self = this,i,l,arms = self.model.arms,arm,data;
	self.arms = [];
	for(i=0,l=arms.length;i<l;i++){
		data = arms[i];
		arm = new Character(data.chara.index(),1,1,data.action,data.direction,"S");
		arm.setCoordinate(data.coordinate.x,data.coordinate.y);
		self.backLayer.addChild(arm);
		self.arms.push(arm);
	}
	
};
BattlemapView.prototype.getArm=function(index){
	var self = this,arm;
	for(i=0,l=self.arms.length;i<l;i++){
		arm = self.arms[i];
		if(arm.index == index){
			return arm;
		}
	}
	return null;
};
BattlemapView.prototype.showResult=function(win){
	var self = this;
	MessageBox.show(win?"战斗胜利":"战斗失败");
};