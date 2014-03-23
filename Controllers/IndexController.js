function IndexController(){
	base(this,MyController,[]);
}
IndexController.prototype.construct=function(){
	var self = this;
	self.loadMvc("Main",self.mainLoad);
};
IndexController.prototype.mainLoad=function(){
	var self = this;
	var main = new MainController();
	self.view.addChild(main.view);
};
IndexController.prototype.gameLoad=function(){
	var self = this;
	self.loadMvc("Game",self.gameStart);
};
IndexController.prototype.gameStart=function(){
	var self = this;
	self.view.removeAllChild();
	var gameBody = new GameController();
	self.view.addChild(gameBody.view);
};