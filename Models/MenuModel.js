function MenuModel(){
	base(this,MyModel,[]);
}
MenuModel.prototype.construct=function(){
	var self = this;
};
MenuModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"BtnClose01",path:LMvc.IMG_PATH+"common/BtnClose01.png"});
	list.push({name:"equipment",path:LMvc.IMG_PATH+"menu/equipment.png"});
	list.push({name:"backpack",path:LMvc.IMG_PATH+"menu/backpack.png"});
	list.push({name:"people",path:LMvc.IMG_PATH+"menu/people.png"});
	list.push({name:"setup",path:LMvc.IMG_PATH+"menu/setup.png"});
	list.push({name:"task",path:LMvc.IMG_PATH+"menu/task.png"});
	return list;
};