function BackpackModel(){
	base(this,MyModel,[]);
}
BackpackModel.prototype.construct=function(){
	var self = this;
	self.dataIndex = 0;
	self.dataMax = 6;
	self.data = [];
};
BackpackModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"BtnClose01",path:LMvc.IMG_PATH+"common/BtnClose01.png"});
	list.push({name:"BtnSelect01",path:LMvc.IMG_PATH+"common/BtnSelect01.png"});
	list.push({name:"BtnSelect02",path:LMvc.IMG_PATH+"common/BtnSelect02.png"});
	list.push({name:"title01",path:LMvc.IMG_PATH+"common/title01.png"});
	return list;
};
BackpackModel.prototype.propsSelect=function(propsType){
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
BackpackModel.prototype.getProps=function(){
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