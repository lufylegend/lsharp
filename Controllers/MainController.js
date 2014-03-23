function MainController(){
	base(this,MyController,[]);
}
MainController.prototype.construct=function(){
	var self = this;
	self.view.showMenu();
};
MainController.prototype.showMap1=function(){
	var self = this;
	self.model.setMap1();
	self.loadMvc("Map",self.mapLoad);
};
MainController.prototype.showMap2=function(){
	var self = this;
	self.model.setMap2();
	self.loadMvc("Map",self.mapLoad);
};
MainController.prototype.mapLoad=function(){
	var self = this;
	self.view.removeAllChild();
	self.view.die();
	var map = new MapController();
	self.view.addChild(map.view);
};