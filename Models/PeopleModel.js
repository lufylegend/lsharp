function PeopleModel(){
	base(this,MyModel,[]);
}
PeopleModel.prototype.construct=function(){
	var self = this;
	self.dataIndex = 0;
	self.dataMax = 5;
	self.data = [];
};
PeopleModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"BtnClose01",path:LMvc.IMG_PATH+"common/BtnClose01.png"});
	list.push({name:"BtnSelect01",path:LMvc.IMG_PATH+"common/BtnSelect01.png"});
	list.push({name:"BtnSelect02",path:LMvc.IMG_PATH+"common/BtnSelect02.png"});
	list.push({name:"BtnSelect03",path:LMvc.IMG_PATH+"common/BtnSelect03.png"});
	list.push({name:"BtnSelect04",path:LMvc.IMG_PATH+"common/BtnSelect04.png"});
	list.push({name:"title01",path:LMvc.IMG_PATH+"common/title01.png"});
	return list;
};
PeopleModel.prototype.getMemberList=function(){
	var self = this,i,l,member,list=[];
	if(self.dataIndex < 0 || self.dataIndex >= LRPGObject.memberList.length){
		return [];
	}
	for(i=self.dataIndex,l=LRPGObject.memberList.length>i+self.dataMax?i+self.dataMax:LRPGObject.memberList.length;i<l;i++){
		member = LRPGObject.memberList[i];
		list.push(member);
	}
	return list;
};