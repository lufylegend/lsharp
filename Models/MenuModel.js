function MenuModel(){
	base(this,MyModel,[]);
}
MenuModel.prototype.construct=function(){
	var self = this;
	self.dataIndex = 0;
	self.dataMax = 6;
	self.data = [];
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
MenuModel.prototype.propsSelect=function(propsType){
	var self = this,i,l,props;
	self.data.length = 0;
	self.dataIndex = 0;
	for(i=0,l=LRPGObject.propsList.length;i<l;i++){
		props = LRPGObject.propsList[i];
		if(props.type == propsType){
			self.data.push(props);
		}
	}
};
MenuModel.prototype.getProps=function(){
	var self = this,i,l,props,list=[];
	if(self.dataIndex < 0 || self.dataIndex >= self.data.length){
		return [];
	}
	for(i=self.dataIndex,l=self.data.length>i+self.dataMax?i+self.dataMax:self.data.length;i<l;i++){
		props = self.data[i];
		list.push(props);
	}
	return list;
};