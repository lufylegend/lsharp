function IndexController(){
	base(this,MyController,[]);
}
IndexController.prototype.construct=function(){
	var self = this;
	self.libraryLoad(); 
};
IndexController.prototype.libraryLoad=function(){
	var self = this;
	self.load.library(["LRPGObject"],self.libraryComplete);
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