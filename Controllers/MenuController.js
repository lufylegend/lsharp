function MenuController(){
	base(this,MyController,[]);
}
MenuController.prototype.construct=function(){
	var self = this;
	self.imagesLoad();
};
MenuController.prototype.imagesLoad = function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.libraryLoad);
};
MenuController.prototype.libraryLoad=function(){
	var self = this;
	self.load.library(["props/PropsIcon","window/WindowBackground","button/ButtonText","button/ButtonSelect"],self.helperLoad);
};
MenuController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["GetButton"],self.helperComplete);
};
MenuController.prototype.helperComplete=function(){
	var self = this;
	LMvc.keepLoading(false);
	self.view.init();
};
MenuController.prototype.closeBackpack=function(){
	var self = this;
	if(LGlobal.canTouch){
		self.baseView.visible = true;
	}
	self.view.remove();
};
MenuController.prototype.showBackpack = function(){
	var self = this;
	self.loadMvc("Backpack",self.backpackComplete);	
};
MenuController.prototype.backpackComplete = function(){
	var self = this;
	var backpack = new BackpackController();
	backpack.baseView = self.baseView;
	self.view.parent.addChild(backpack.view);
	self.view.remove();
};