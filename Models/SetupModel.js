function SetupModel(){
	base(this,MyModel,[]);
}
SetupModel.prototype.construct=function(){
	var self = this;
};
SetupModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"BtnClose01",path:LMvc.IMG_PATH+"common/BtnClose01.png"});
	list.push({name:"setup",path:LMvc.IMG_PATH+"menu/setup.png"});
	return list;
};