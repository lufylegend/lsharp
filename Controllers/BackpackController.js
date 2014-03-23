function BackpackController(){
	base(this,MyController,[]);
}
BackpackController.prototype.construct=function(){
	var self = this;
	/*
	//test
	var propsRecovery = new PropsRecovery(LMvc.datalist["props"]["props1"]);
	LRPGObject.propsList.push(propsRecovery);
	var propsSpecial = new PropsSpecial(LMvc.datalist["props"]["props2"]);
	LRPGObject.propsList.push(propsSpecial);
	var propsWeaponry = new PropsWeaponry(LMvc.datalist["props"]["props3"]);
	LRPGObject.propsList.push(propsWeaponry);
	console.log(LRPGObject.propsList);
	//test
	*/
	self.imagesLoad();
};
BackpackController.prototype.imagesLoad = function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.libraryLoad);
};
BackpackController.prototype.libraryLoad=function(){
	var self = this;
	self.load.library(["props/PropsIcon","window/WindowBackground","button/ButtonSelect"],self.helperLoad);
};
BackpackController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["GetButton"],self.helperComplete);
};
BackpackController.prototype.helperComplete=function(){
	var self = this;
	LMvc.keepLoading(false);
	self.view.init();
};
BackpackController.prototype.closeBackpack=function(){
	var self = this;
	if(LGlobal.canTouch){
		self.baseView.visible = true;
	}
	self.view.remove();
};
BackpackController.prototype.recoveryPropsSelect=function(){
	var self = this;
	if(self.view.recoveryButton.selected)return;
	self.view.recoveryButton.setSelected(true);
	self.view.weaponryButton.setSelected(false);
	self.view.specialButton.setSelected(false);
	self.model.propsSelect("Recovery");
	self.view.showProps();
};
BackpackController.prototype.weaponryPropsSelect=function(){
	var self = this;
	if(self.view.weaponryButton.selected)return;
	self.view.recoveryButton.setSelected(false);
	self.view.weaponryButton.setSelected(true);
	self.view.specialButton.setSelected(false);
	self.model.propsSelect("Weaponry");
	self.view.showProps();
};
BackpackController.prototype.specialPropsSelect=function(){
	var self = this;
	if(self.view.specialButton.selected)return;
	self.view.recoveryButton.setSelected(false);
	self.view.weaponryButton.setSelected(false);
	self.view.specialButton.setSelected(true);
	self.model.propsSelect("Special");
	self.view.showProps();
};
BackpackController.prototype.previous=function(){
	var self = this;
	if(self.model.dataIndex <= 0)return;
	self.model.dataIndex -= self.model.dataMax;
	self.view.showProps();
};
BackpackController.prototype.next=function(){
	var self = this;
	if(self.model.dataIndex >= self.model.data.length - 1)return;
	self.model.dataIndex += self.model.dataMax;
	self.view.showProps();
};