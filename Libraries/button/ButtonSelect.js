function ButtonSelect(dataName,properties,type){
	var self = this;
	base(self,LSprite,[]);
	self.button = GetButton(LMvc.datalist[dataName],properties,type);
	self.addChild(self.button);
	self.selectedButton = self.button.bitmap_over.clone();
	self.addChild(self.selectedButton);
	self.selectedButton.visible = false;
	self.selected = false;
}
ButtonSelect.prototype.setSelected = function(value){
	var self = this;
	self.button.visible = !value;
	self.selectedButton.visible = value;
	self.selected = value;
};
