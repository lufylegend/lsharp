function PeopleView(){
	base(this,LView,[]);
}
PeopleView.prototype.construct=function(){};
PeopleView.prototype.init=function(){
	var self = this;
	self.backgroundInit();
	
	self.titleInit();
	self.propsLayer = new LSprite();
	self.addChild(self.propsLayer);
	self.menuInit();
	//self.controller.recoveryPropsSelect();
};
PeopleView.prototype.menuInit=function(){
	var self = this;
	var closeButton = GetButton(LMvc.datalist["BtnClose01"],null,0);
	closeButton.x = 730;
	closeButton.y = 5;
	self.addChild(closeButton);
	closeButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.controller.closeBackpack();
	});
	
	var propertyLayer = new CharacterProperty();
	propertyLayer.x = 250;
	propertyLayer.y = 55;
	self.addChild(propertyLayer);
	self.propertyLayer = propertyLayer;
	
	var nameButton;
	//var namelist = ["刘备","关羽","张飞","诸葛亮","赵云"];
	self.nameLayer = new LSprite();
	self.nameLayer.x = 70;
	self.nameLayer.y = 80;
	self.addChild(self.nameLayer);
	self.showMemberList();
	/*
	var charalist = [1,2,3,4,5];
	for(var i=0;i<5;i++){
		charaData = LMvc.datalist["chara"]["peo"+charalist[i]];
		nameButton = new ButtonSelect("BtnSelect03",{label:charaData.Name,width:150,height:48,color:"#8B0000"},0);
		nameButton.data = charaData;
		nameButton.y = 50*i;
		self.nameLayer.addChild(nameButton);
		nameButton.addEventListener(LMouseEvent.MOUSE_UP, self.nameClick);
		if(i==0){
			self.nameClick({clickTarget:nameButton});
		}
	}*/
	var previousButton = GetButton(LMvc.datalist["BtnSelect02"],{label:"上一页",width:83,height:32},0);
	previousButton.x = 60;
	previousButton.y = 380;
	self.addChild(previousButton);
	previousButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.controller.previous();
	});
	
	var nextButton = GetButton(LMvc.datalist["BtnSelect02"],{label:"下一页",width:83,height:32},0);
	nextButton.x = 150;
	nextButton.y = 380;
	self.addChild(nextButton);
	nextButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.controller.next();
	});
};
PeopleView.prototype.nameClick=function(event){
	var self = event.clickTarget.parent.parent;
	for(var i=0;i<self.nameLayer.childList.length;i++){
		self.nameLayer.childList[i].setSelected(false);
	}
	var nameButton = event.clickTarget;
	nameButton.setSelected(true);
	self.propertyLayer.setData(nameButton.data);
};
PeopleView.prototype.showMemberList=function(){
	var self = this,num,l,icon,props;
	var list = self.model.getMemberList();
	self.nameLayer.removeAllChild();
	for(var i=0;i<list.length;i++){
		charaData = list[i];
		nameButton = new ButtonSelect("BtnSelect03",{label:charaData.name(),width:150,height:48,color:"#8B0000"},0);
		nameButton.data = charaData;
		nameButton.y = 50*i;
		self.nameLayer.addChild(nameButton);
		nameButton.addEventListener(LMouseEvent.MOUSE_UP, self.nameClick);
		if(i==0){
			self.nameClick({clickTarget:nameButton});
		}
	}
};
PeopleView.prototype.titleInit=function(){
	var self = this;
	var titleBitmap = new LBitmap(new LBitmapData(LMvc.datalist["title01"]));
	titleBitmap.x = (LGlobal.width - titleBitmap.getWidth())*0.5;
	//titleBitmap.y = 5;
	self.addChild(titleBitmap);
	var title = new LTextField();
	title.text = "武将";
	title.weight = "bolder";
	title.size = 25;
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = 9;
	self.addChild(title);
};
PeopleView.prototype.backgroundInit=function(){
	var self = this;
	var background = new WindowBackground(1,LGlobal.width+100,LGlobal.height+100);
	background.x = background.y = -50;
	background.addEventListener(LMouseEvent.MOUSE_UP, function(){});
	self.addChild(background);
	
	var backWidth = 740,backHeight=440;
	var background1 = new WindowBackground(1,backWidth,backHeight);
	background1.x = (LGlobal.width - backWidth)*0.5;
	background1.y = (LGlobal.height - backHeight)*0.5;
	self.addChild(background1);
	
	var background2 = new WindowBackground(2,190,365);
	background2.x = background1.x + 20;
	background2.y = background1.y + 40;
	self.addChild(background2);
};
