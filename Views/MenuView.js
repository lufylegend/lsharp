function MenuView(){
	base(this,LView,[]);
}
MenuView.prototype.construct=function(){};
MenuView.prototype.init=function(){
	var self = this;
	self.backgroundInit();
	self.menuInit();
	
	LTweenLite.to(self.menuLayer,1,{x:self.menuLayer.tx,ease:Bounce.easeOut});
};
MenuView.prototype.menuInit=function(){
	var self = this;
	
	var closeButton = GetButton(LMvc.datalist["BtnClose01"],null,0);
	closeButton.x = 660;
	closeButton.y = -15;
	self.menuLayer.addChild(closeButton);
	closeButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		LTweenLite.to(self.menuLayer,0.3,{x:LGlobal.width,onComplete:function(){
			self.controller.closeBackpack();
		}});
	});
	var startX = 50;
	var startY = 50;
	var xindex = 0;
	var yindex = 0;
	var step = 160;
	for(var i=0;i<4;i++){
		for(var j=0;j<2;j++){
			var background = new WindowBackground(3,120,120);
			background.x = startX + i*step;
			background.y = startY + j*step;
			self.menuLayer.addChild(background);
		}
	}
	
	var backpack = new ButtonText("backpack","背包",true);
	backpack.x = startX + xindex*step;
	backpack.y = startY + yindex*step;
	self.menuLayer.addChild(backpack);
	backpack.addEventListener(LMouseEvent.MOUSE_UP, function(event){
		LTweenLite.to(self.menuLayer,0.3,{x:LGlobal.width,onComplete:function(){
			self.controller.showBackpack();
		}});
	});
	xindex++;
	var equipment = new ButtonText("equipment","装备",true);
	equipment.x = startX + xindex*step;
	equipment.y = startY + yindex*step;
	self.menuLayer.addChild(equipment);
	xindex++;
	var people = new ButtonText("people","武将",true);
	people.x = startX + xindex*step;
	people.y = startY + yindex*step;
	self.menuLayer.addChild(people);
	xindex++;
	var task = new ButtonText("task","任务",true);
	task.x = startX + xindex*step;
	task.y = startY + yindex*step;
	self.menuLayer.addChild(task);
	xindex = 0;
	yindex++;
	var setup = new ButtonText("setup","设置",true);
	setup.x = startX + xindex*step;
	setup.y = startY + yindex*step;
	self.menuLayer.addChild(setup);
};
MenuView.prototype.backgroundInit=function(){
	var self = this;
	var background = new WindowBackground(1,LGlobal.width+100,LGlobal.height+100);
	background.x = background.y = -50;
	background.addEventListener(LMouseEvent.MOUSE_UP, function(){});
	self.addChild(background);
	
	var backWidth = 700,backHeight=400;
	var background1 = new WindowBackground(1,backWidth,backHeight);
	self.menuLayer = new LSprite();
	self.menuLayer.tx = (LGlobal.width - backWidth)*0.5;
	self.menuLayer.ty = (LGlobal.height - backHeight)*0.5;
	self.menuLayer.x = LGlobal.width;
	self.menuLayer.y = self.menuLayer.ty;
	self.addChild(self.menuLayer);
	self.menuLayer.addChild(background1);
};
