function SetupController(){
	base(this,MyController,[]);
}
SetupController.prototype.construct=function(){
	var self = this;
	self.imagesLoad();
};
SetupController.prototype.imagesLoad = function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.libraryLoad);
};
SetupController.prototype.libraryLoad=function(){
	var self = this;
	self.load.library(["props/PropsIcon","window/WindowBackground","button/ButtonText","button/ButtonSelect"],self.helperLoad);
};
SetupController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["GetButton"],self.helperComplete);
};
SetupController.prototype.helperComplete=function(){
	var self = this;
	LMvc.keepLoading(false);
	self.view.init();
};
SetupController.prototype.close=function(){
	var self = this;
	if(LGlobal.canTouch){
		self.baseView.visible = true;
	}
	self.view.remove();
};