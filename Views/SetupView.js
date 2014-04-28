function SetupView(){
	base(this,LView,[]);
}
SetupView.prototype.construct=function(){};
SetupView.prototype.init=function(){
	var self = this;
	self.backgroundInit();
	self.menuInit();
	
	LTweenLite.to(self.menuLayer,1,{x:self.menuLayer.tx,ease:Bounce.easeOut});
};
SetupView.prototype.menuInit=function(){
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
	var startX = 120;
	var startY = 100;
	var xindex = 0;
	var yindex = 0;
	var step = 160;
	for(var i=0;i<3;i++){
		for(var j=0;j<1;j++){
			var background = new WindowBackground(3,120,120);
			background.x = startX + i*step;
			background.y = startY + j*step;
			self.menuLayer.addChild(background);
		}
	}
	var setup = new ButtonText("setup","储存",true);
	setup.x = startX + xindex*step;
	setup.y = startY + yindex*step;
	self.menuLayer.addChild(setup);
	setup.addEventListener(LMouseEvent.MOUSE_UP, function(event){
		self.controller.close();
		LRPGObject.saveGame();
	});
	xindex++;
	var setup = new ButtonText("setup","读取",true);
	setup.x = startX + xindex*step;
	setup.y = startY + yindex*step;
	self.menuLayer.addChild(setup);
	setup.addEventListener(LMouseEvent.MOUSE_UP, function(event){
		self.controller.close();
		LRPGObject.readGame();
	});
	xindex++;
	var setup = new ButtonText("setup","返回",true);
	setup.x = startX + xindex*step;
	setup.y = startY + yindex*step;
	self.menuLayer.addChild(setup);
	setup.addEventListener(LMouseEvent.MOUSE_UP, function(event){
		LGlobal.script.lineList.unshift("Load.script(script/Main.ls);");
		LGlobal.script.lineList.unshift("Layer.clear(-);");
		LGlobal.script.analysis();
	});
};
SetupView.prototype.backgroundInit=function(){
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
