function IndexController(){
	base(this,MyController,[]);
}
IndexController.prototype.construct=function(){
	var self = this;
	self.imagesLoad(); 
};
IndexController.prototype.imagesLoad = function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.helperLoad);
};
IndexController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["MessageBox"],self.libraryLoad);
};
IndexController.prototype.libraryLoad=function(){
	var self = this;
	self.load.library(["window/WindowBackground","props/PropsRecovery","props/PropsSpecial","props/PropsWeaponry","LRPGObject","button/ButtonSelect"],self.libraryComplete);
};
IndexController.prototype.libraryComplete=function(){
	var self = this;
    var sc = "Load.script(script/Main.ls);";  
    var script = new LScript(self.view,sc); 
};
IndexController.prototype.mapLoad=function(){
	var self = this;
	self.loadMvc("Map",self.mapComplete);
};
IndexController.prototype.mapComplete=function(){
	var self = this;
	self.view.die();
	self.view.removeAllChild();
	var map = new MapController();
	LRPGObject.RPGMap = map;
	self.view.addChild(map.view);
};