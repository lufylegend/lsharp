function BackpackView(){
	base(this,LView,[]);
}
BackpackView.prototype.construct=function(){};
BackpackView.prototype.init=function(){
	var self = this;
	self.backgroundInit();
	self.titleInit();
	self.propsLayer = new LSprite();
	self.addChild(self.propsLayer);
	self.menuInit();
	self.controller.recoveryPropsSelect();
};
BackpackView.prototype.menuInit=function(){
	var self = this;
	var closeButton = GetButton(LMvc.datalist["BtnClose01"],null,0);
	closeButton.x = 710;
	closeButton.y = 25;
	self.addChild(closeButton);
	closeButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.controller.closeBackpack();
	});
	
	var recoveryButton = new ButtonSelect("BtnSelect01",{label:"恢复用品",width:180,height:48},1);
	recoveryButton.x = 550;
	recoveryButton.y = 110;
	self.addChild(recoveryButton);
	self.recoveryButton = recoveryButton;
	recoveryButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.controller.recoveryPropsSelect();
	});
	
	var weaponryButton = new ButtonSelect("BtnSelect01",{label:"武器装备",width:180,height:48},1);
	weaponryButton.x = 550;
	weaponryButton.y = 170;
	self.addChild(weaponryButton);
	self.weaponryButton = weaponryButton;
	weaponryButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.controller.weaponryPropsSelect();
	});
	
	var specialButton = new ButtonSelect("BtnSelect01",{label:"特殊物品",width:180,height:48},1);
	specialButton.x = 550;
	specialButton.y = 230;
	self.addChild(specialButton);
	self.specialButton = specialButton;
	specialButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.controller.specialPropsSelect();
	});
	
	var previousButton = GetButton(LMvc.datalist["BtnSelect02"],{label:"上一页",width:83,height:32},0);
	previousButton.x = 200;
	previousButton.y = 375;
	self.addChild(previousButton);
	previousButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.controller.previous();
	});
	
	var nextButton = GetButton(LMvc.datalist["BtnSelect02"],{label:"下一页",width:83,height:32},0);
	nextButton.x = 320;
	nextButton.y = 375;
	self.addChild(nextButton);
	nextButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.controller.next();
	});
};
BackpackView.prototype.showProps=function(){
	var self = this,num,l,icon,props;
	var list = self.model.getProps();
	num = 0;
	l = list.length;
	self.propsLayer.die();
	self.propsLayer.removeAllChild();
	for(var i=0;i<3 && num<l;i++){
		for(var j=0;j<2 && num<l;j++){
			props = list[num];
			icon = new PropsIcon(props);
			icon.x = self.propsStartX + 120*i;
			icon.y = self.propsStartY + 135*j;
			self.propsLayer.addChild(icon);
			num++;
		}
	}
};
BackpackView.prototype.titleInit=function(){
	var self = this;
	var titleBitmap = new LBitmap(new LBitmapData(LMvc.datalist["title01"]));
	titleBitmap.x = (LGlobal.width - titleBitmap.getWidth())*0.5;
	titleBitmap.y = 20;
	self.addChild(titleBitmap);
	var title = new LTextField();
	title.text = "背包";
	title.weight = "bolder";
	title.size = 25;
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = 27;
	self.addChild(title);
};
BackpackView.prototype.backgroundInit=function(){
	var self = this;
	var background = new WindowBackground(1,LGlobal.width+100,LGlobal.height+100);
	background.x = background.y = -50;
	background.addEventListener(LMouseEvent.MOUSE_UP, function(){});
	self.addChild(background);
	
	var backWidth = 700,backHeight=400;
	var background1 = new WindowBackground(1,backWidth,backHeight);
	background1.x = (LGlobal.width - backWidth)*0.5;
	background1.y = (LGlobal.height - backHeight)*0.5;
	self.addChild(background1);
	
	var background2 = new WindowBackground(2,470,340);
	background2.x = background1.x + 20;
	background2.y = background1.y + 40;
	self.addChild(background2);
	
	var background3;
	self.propsStartX = background2.x + 65;
	self.propsStartY = background2.y + 20;
	for(var i=0;i<3;i++){
		for(var j=0;j<2;j++){
			background3 = new WindowBackground(3,100,100);
			background3.x = self.propsStartX + 120*i;
			background3.y = self.propsStartY + 135*j;
			self.addChild(background3);
		}
	}
};
