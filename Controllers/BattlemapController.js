function BattlemapController(){
	base(this,MyController,[]);
}
BattlemapController.prototype.construct=function(){
	var self = this;
	LMvc.keepLoading(true);
	self.dataLoad();
};
BattlemapController.prototype.dataLoad = function(){
	var self = this;
	self.model.dataLoad(self.outcomeLoad);
};
BattlemapController.prototype.outcomeLoad = function(){
	var self = this;
	self.model.outcomeLoad(self.imagesLoad);
};
BattlemapController.prototype.imagesLoad = function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.libraryLoad);
};
BattlemapController.prototype.libraryLoad=function(){
	var self = this;
	self.load.library(["character/Action","character/Character","character/Face","effects/Qinglong","effects/Baihu","effects/Effect02"],self.helperLoad);
};
BattlemapController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["GetButton","Talk"],self.helperComplete);
};
BattlemapController.prototype.helperComplete=function(){
	var self = this;
	LMvc.keepLoading(false);
	self.view.init();
	self.checkAction();
};
BattlemapController.prototype.checkAction=function(){
	var self = this;
	var action = self.model.getAction();
	if(action){
		switch(action.type){
			case "action":
				self.runAction(action);
				break;
			case "addHp":
				self.runAddHp(action);
				break;
			case "effect":
				self.runEffect(action);
				break;
			case "die":
				self.runDie(action);
				break;
			case "over":
				self.battleOver(action.result);
				break;
		}

	}
};
BattlemapController.prototype.battleOver=function(win){
	var self = this;
	//战斗结束，在这里进行经验获取等处理，暂略
	//显示战斗结果
	MessageBox.show(win?"战斗胜利":"战斗失败");
	self.baseView.visible = true;
	self.view.remove();
};
BattlemapController.prototype.runAction=function(action){
	var self = this;
	var charas = action.chara;
	for(var i=0;i<charas.length;i++){
		var child = charas[i];
		var arm = self.view.getArm(child.index);
		if(i==0)arm.main = true;
		arm.addEventListener(LEvent.COMPLETE, self.runActionOver);
		arm.changeAction(child.action);
		if(child.action == "hert"){
			self.addHert(arm,child.num);
		}
	}
};
BattlemapController.prototype.runActionOver=function(event){
	var arm = event.target;
	var self = arm.parent.parent.controller;
	arm.removeEventListener(LEvent.COMPLETE, self.runActionOver);
	//console.log("arm.removeEventListener(LEvent.COMPLETE, self.runActionOver);");
	if(arm.main){
		arm.main = false;
		self.checkAction();
	}
};
BattlemapController.prototype.runAddHp=function(action){
	var self = this;
	var charas = action.chara;
	for(var i=0;i<charas.length;i++){
		var arm = self.view.getArm(charas[i].index);
		var text = new LTextField();
		text.color = "#FFFFFF";
		text.text = "+"+charas[i].num;
		self.view.addChild(text);
		text.x = arm.x - text.getWidth()*0.5;
		text.y = arm.y - arm.getHeight();
		if(i==0){
			LTweenLite.to(text,2,{y:text.y - 20,alpha:0,onComplete:function(obj){
				obj.parent.removeChild(obj);
				self.checkAction();
			}});
		}else{
			LTweenLite.to(text,2,{y:text.y - 20,alpha:0,onComplete:function(obj){
				obj.parent.removeChild(obj);
			}});
		}
	}
};
BattlemapController.prototype.addHert=function(arm,num){
	var self = this;
	var text = new LTextField();
	text.color = "#FFFFFF";
	text.text = "-"+num;
	self.view.addChild(text);
	text.x = arm.x - text.getWidth()*0.5;
	text.y = arm.y - arm.getHeight();
	LTweenLite.to(text,2,{y:text.y - 20,alpha:0,onComplete:function(obj){
		obj.parent.removeChild(obj);
	}});
};
BattlemapController.prototype.runEffect=function(action){
	var self = this;
	var arm = self.view.getArm(action.charaIndex);
	var effect = eval("new "+action.effect+"();");
	effect.x = arm.x - 100;
	effect.y = arm.y - 100;
	self.view.addChild(effect);
	effect.addEventListener(LEvent.COMPLETE,self.runEffectOver);
	if(action.effect == "Qinglong" || action.effect == "Baihu"){
		if(action.effect == "Qinglong"){
			effect.x = LGlobal.width*0.5 + (LGlobal.width*0.5 - effect.getWidth())*0.5;
			effect.y = (LGlobal.height - effect.getHeight())*0.5;
		}else if(action.effect == "Baihu"){
			effect.x = (LGlobal.width*0.5 - effect.getWidth())*0.5;
			effect.y = (LGlobal.height - effect.getHeight())*0.5;
		}
		effect.run();
	}
};
BattlemapController.prototype.runEffectOver=function(event){
	var self = event.target.parent.controller;
	event.target.parent.removeChild(event.target);

	self.checkAction();
};
BattlemapController.prototype.runDie=function(action){
	var self = this;
	var charas = action.chara;
	for(var i=0;i<charas.length;i++){
		var child = charas[i];
		var arm = self.view.getArm(child.index);
		if(i==0){
			LTweenLite.to(arm,1,{alpha:0,onComplete:function(obj){
				self.checkAction();
			}});
		}else{
			LTweenLite.to(arm,1,{alpha:0});
		}
	}
};