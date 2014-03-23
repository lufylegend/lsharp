function IndexModel(){
	base(this,MyModel,[]);
}
IndexModel.prototype.construct=function(){
};
IndexModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"BtnSelect01",path:LMvc.IMG_PATH+"common/BtnSelect01.png"});
	return list;
};
