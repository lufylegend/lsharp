function PeopleController(){
	base(this,MyController,[]);
}
PeopleController.prototype.construct=function(){
	var self = this;
	self.imagesLoad();
};
PeopleController.prototype.imagesLoad = function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.libraryLoad);
};
PeopleController.prototype.libraryLoad=function(){
	var self = this;
	self.load.library(["props/PropsIcon","window/WindowBackground","button/ButtonSelect","character/CharacterProperty","character/MemberData"],self.helperLoad);
};
PeopleController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["GetButton"],self.helperComplete);
};
PeopleController.prototype.helperComplete=function(){
	var self = this;
	LMvc.keepLoading(false);
	self.view.init();
};
PeopleController.prototype.closeBackpack=function(){
	var self = this;
	if(LGlobal.canTouch){
		self.baseView.visible = true;
	}
	self.view.remove();
};
PeopleController.prototype.previous=function(){
	var self = this;
	if(self.model.dataIndex <= 0)return;
	self.model.dataIndex -= self.model.dataMax;
	self.view.showMemberList();
};
PeopleController.prototype.next=function(){
	var self = this;
	if(self.model.dataIndex >= LRPGObject.memberList.length - 1)return;
	self.model.dataIndex += self.model.dataMax;
	self.view.showMemberList();
};