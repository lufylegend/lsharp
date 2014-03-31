function CharacterProperty(){
	var self = this;
	base(self,LSprite,[]);
	self.menuLayer = new LSprite();
	self.addChild(self.menuLayer);
	
	self.menuList = {};
	var basicButton = new ButtonSelect("BtnSelect04",{label:"基本属性",width:100,height:50,textHeight:30},0);
	self.menuLayer.addChild(basicButton);
	basicButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.changeTab(CharacterProperty.BASIC);
	});
	var abilityButton = new ButtonSelect("BtnSelect04",{label:"能力属性",width:100,height:50,textHeight:30},0);
	abilityButton.x = 100;
	self.menuLayer.addChild(abilityButton);
	abilityButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.changeTab(CharacterProperty.ABILITY);
	});
	var armsButton = new ButtonSelect("BtnSelect04",{label:"兵种属性",width:100,height:50,textHeight:30},0);
	armsButton.x = 200;
	self.menuLayer.addChild(armsButton);
	armsButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.changeTab(CharacterProperty.ARMS);
	});
	var tacticsButton = new ButtonSelect("BtnSelect04",{label:"策略属性",width:100,height:50,textHeight:30},0);
	tacticsButton.x = 300;
	self.menuLayer.addChild(tacticsButton);
	tacticsButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.changeTab(CharacterProperty.TACTICS);
	});
	var equipmentButton = new ButtonSelect("BtnSelect04",{label:"装备属性",width:100,height:50,textHeight:30},0);
	equipmentButton.x = 400;
	self.menuLayer.addChild(equipmentButton);
	equipmentButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.changeTab(CharacterProperty.EQUIPMENT);
	});
	
	self.menuList[CharacterProperty.BASIC] = basicButton;
	self.menuList[CharacterProperty.ABILITY] = abilityButton;
	self.menuList[CharacterProperty.ARMS] = armsButton;
	self.menuList[CharacterProperty.TACTICS] = tacticsButton;
	self.menuList[CharacterProperty.EQUIPMENT] = equipmentButton;
	
	self.menuLayer.x = (500 - self.menuLayer.getWidth())*0.5;

	var background = new WindowBackground(3,500,320);
	background.y = 50;
	self.addChild(background);
	
	self.viewLayer = new LSprite();
	self.viewLayer.y = 50;
	self.addChild(self.viewLayer);
}
CharacterProperty.BASIC = "basic";
CharacterProperty.ABILITY = "ability";
CharacterProperty.ARMS = "arms";
CharacterProperty.TACTICS = "tactics";
CharacterProperty.EQUIPMENT = "equipment";
CharacterProperty.prototype.setData = function(data){
	var self = this;
	self.index = data.index();
	self.tabValue = null;
	self.data = data;
	self.viewLayer.die();
	self.viewLayer.removeAllChild();
	self.changeTab(CharacterProperty.BASIC);
};
CharacterProperty.prototype.changeTab = function(value){
	var self = this;
	if(self.tabValue == value && self.menuList[value].selected)return;
	self.menuList[CharacterProperty.BASIC].setSelected(false);
	self.menuList[CharacterProperty.ABILITY].setSelected(false);
	self.menuList[CharacterProperty.ARMS].setSelected(false);
	self.menuList[CharacterProperty.TACTICS].setSelected(false);
	self.menuList[CharacterProperty.EQUIPMENT].setSelected(false);
	self.tabValue = value;
	self.menuList[value].setSelected(true);
	self.viewLayer.removeAllChild();
	switch(value){
		case CharacterProperty.BASIC:
			self.basicShow();
			break;
		case CharacterProperty.ABILITY:
			self.abilityShow();
			break;
		case CharacterProperty.ARMS:
			self.armsShow();
			break;
		case CharacterProperty.TACTICS:
			self.tacticsShow();
			break;
		case CharacterProperty.EQUIPMENT:
			self.equipmentShow();
			break;
	}
};
CharacterProperty.prototype.basicShow = function(){
	var self = this;
	var face = new Face(self.data.face(),0);
	face.graphics.drawRect(1,"#000000",[0,0,face.getWidth(),face.getHeight()]);
	self.viewLayer.addChild(face);
	
	var nameLabel = self.getText("姓名：");
	nameLabel.x = 250;
	nameLabel.y = 10;
	self.viewLayer.addChild(nameLabel);
	var nameText = self.getText(self.data.name());
	nameText.x = nameLabel.x + 100;
	nameText.y = nameLabel.y;
	self.viewLayer.addChild(nameText);
	
	var lvLabel = self.getText("Lv：");
	lvLabel.x = 250;
	lvLabel.y = 35;
	self.viewLayer.addChild(lvLabel);
	var lvText = self.getText(self.data.lv());
	lvText.x = lvLabel.x + 100;
	lvText.y = lvLabel.y;
	self.viewLayer.addChild(lvText);
	
	var expLabel = self.getText("Exp：");
	expLabel.x = 250;
	expLabel.y = 60;
	self.viewLayer.addChild(expLabel);
	var expText = self.getText(self.data.exp()+"/100");
	expText.x = expLabel.x + 100;
	expText.y = expLabel.y;
	self.viewLayer.addChild(expText);
	
	var HPLabel = self.getText("HP：");
	HPLabel.x = 250;
	HPLabel.y = 85;
	self.viewLayer.addChild(HPLabel);
	var HPText = self.getText(self.data.hp()+"/"+self.data.maxHp());
	HPText.x = HPLabel.x + 100;
	HPText.y = HPLabel.y;
	self.viewLayer.addChild(HPText);
	
	var MPLabel = self.getText("MP：");
	MPLabel.x = 250;
	MPLabel.y = 110;
	self.viewLayer.addChild(MPLabel);
	var MPText = self.getText(self.data.mp()+"/"+self.data.maxMp());
	MPText.x = MPLabel.x + 100;
	MPText.y = MPLabel.y;
	self.viewLayer.addChild(MPText);
	
	var introductionLabel = self.getText("人物介绍：");
	introductionLabel.x = 250;
	introductionLabel.y = 140;
	self.viewLayer.addChild(introductionLabel);
	var background2 = new WindowBackground(3,230,135);
	background2.x = 250;
	background2.y = 165;
	self.viewLayer.addChild(background2);
	var introductionText = self.getText(self.data.introduction(),"#000000",12);
	introductionText.width = 200;
	introductionText.setWordWrap(true,16);
	introductionText.x = background2.x + 10;
	introductionText.y = background2.y + 10;
	self.viewLayer.addChild(introductionText);
};
CharacterProperty.prototype.abilityShow = function(){
	var self = this;
	var face = new Face(self.data.face(),0);
	face.graphics.drawRect(1,"#000000",[0,0,face.getWidth(),face.getHeight()]);
	self.viewLayer.addChild(face);
	
	var forceLabel = self.getText("武力：");
	forceLabel.x = 250;
	forceLabel.y = 10;
	self.viewLayer.addChild(forceLabel);
	var forceText = self.getText(self.data.force());
	forceText.x = forceLabel.x + 100;
	forceText.y = forceLabel.y;
	self.viewLayer.addChild(forceText);
	var intelligenceLabel = self.getText("智力：");
	intelligenceLabel.x = 250;
	intelligenceLabel.y = 35;
	self.viewLayer.addChild(intelligenceLabel);
	var intelligenceText = self.getText(self.data.intelligence());
	intelligenceText.x = intelligenceLabel.x + 100;
	intelligenceText.y = intelligenceLabel.y;
	self.viewLayer.addChild(intelligenceText);
	var commandLabel = self.getText("统帅：");
	commandLabel.x = 250;
	commandLabel.y = 60;
	self.viewLayer.addChild(commandLabel);
	var commandText = self.getText(self.data.command());
	commandText.x = commandLabel.x + 100;
	commandText.y = commandLabel.y;
	self.viewLayer.addChild(commandText);
	var agileLabel = self.getText("敏捷：");
	agileLabel.x = 250;
	agileLabel.y = 85;
	self.viewLayer.addChild(agileLabel);
	var agileText = self.getText(self.data.agile());
	agileText.x = agileLabel.x + 100;
	agileText.y = agileLabel.y;
	self.viewLayer.addChild(agileText);
	var luckLabel = self.getText("运气：");
	luckLabel.x = 250;
	luckLabel.y = 110;
	self.viewLayer.addChild(luckLabel);
	var luckText = self.getText(self.data.luck());
	luckText.x = luckLabel.x + 100;
	luckText.y = luckLabel.y;
	self.viewLayer.addChild(luckText);
};
CharacterProperty.prototype.armsShow = function(){
	var self = this;
};
CharacterProperty.prototype.tacticsShow = function(){
	var self = this;
};
CharacterProperty.prototype.equipmentShow = function(){
	var self = this;
};
CharacterProperty.prototype.getText = function(text,color,size){
	var label = new LTextField();
	label.text = text;
	label.size = size?size:16;
	label.color = color?color:"#000000";
	label.weight = "bolder";
	return label;
};
