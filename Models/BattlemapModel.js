function BattlemapModel(){
	base(this,MyModel,[]);
}
BattlemapModel.prototype.construct=function(){
	var self = this;
	self.actionIndex = 0;
};
BattlemapModel.prototype.dataLoad=function(callback){
	var self = this;
	//开始读取战场地图文件
	var urlloader = new LURLLoader();
	urlloader.parent = self;
	urlloader.addEventListener(LEvent.COMPLETE,function(event){
		self.data = JSON.parse(event.currentTarget.data);
		callback.apply(self.controller,[]);
	});
	urlloader.load("./script/battles/S"+LRPGObject.battleIndex+".ls"+(LGlobal.traceDebug?("?"+(new Date()).getTime()):""),"text");
};
BattlemapModel.prototype.outcomeLoad=function(callback){
	var self = this,i,self_arms,enemy_arms,characterData,member,obj;
	self.load_effect = [];
	self.arms = [];
	self.actions = [];
	self.self_arms = [];
	self.enemy_arms = [];
	var self_arms_coordinate = [{"x":200,"y":240},{"x":100,"y":140},{"x":100,"y":340},{"x":300,"y":140},{"x":300,"y":340}];
	for(i=0;i<LRPGObject.memberList.length;i++){
		obj = {"chara":LRPGObject.memberList[i],"action":"stand","direction":"right","coordinate":self_arms_coordinate[i],"hert":0,"self":true};
		self.arms.push(obj);
		self.self_arms.push(obj);
	}
	self_arms_coordinate = [{"x":600,"y":240},{"x":500,"y":140},{"x":500,"y":340},{"x":700,"y":140},{"x":700,"y":340}];
	for(i=0;i<self.data.enemys.length;i++){
		characterData = LMvc.datalist["chara"]["peo"+self.data.enemys[i]["index"]];
		member = new MemberData(characterData,self.data.enemys[i]["lv"]);
		obj = {"chara":member,"action":"stand","direction":"left","coordinate":self_arms_coordinate[i],"hert":0,"self":false};
		self.arms.push(obj);
		self.enemy_arms.push(obj);
	}
	self.arms.sort(function(a,b){return b.chara.morale() - a.chara.morale();});  
	var result = false;
	i=0;
	while(!result){
		result = self._battleLoop();
		i++;
	}
	self.actions.push({"type":"over","result":LGlobal.script.scriptArray.varList["OutcomeBattle"]});
	callback.apply(self.controller,[]);
};
BattlemapModel.prototype._battleLoop=function(){
	var self = this,i,j;
	for(i=0;i<self.arms.length;i++){
		var data = self.arms[i];
		var chara = data.chara;
		if(data.hert > chara.hp())continue;
		var skill = chara.skill();
		var count = 1;
		var targets = [];
		var addition = 1;
		if(skill){
			var skillData = LMvc.datalist["skill"]["skill"+chara.skill()];
			if(skillData && Math.random() < (skillData.Probability/100)){
				var isAddEffect = false;
				for(j=0;j<self.load_effect.length;j++){
					if(self.load_effect[j] == skillData.Effect){
						isAddEffect = true;
						break;
					}
				}
				if(!isAddEffect)self.load_effect.push(skillData.Effect);
				self.actions.push({"type":"effect","effect":skillData.Effect,"charaIndex":chara.index()});
				if(skillData.Type == 1){
					var mytargets = self._getTargets(data.self,skillData.Count);
					self.actions.push({"type":"addHp","chara":[]});
					for(j=0;j<mytargets.length;j++){
						mytargets[j].hert -= skillData.HP;
						if(mytargets[j].hert < 0)mytargets[j].hert = 0;
						self.actions[self.actions.length - 1].chara.push({"index":mytargets[j].chara.index(),"num":skillData.HP});
					}
					/*
					self.actions.push({"type":"action","chara":[]});
					for(j=0;j>mytargets.length;j++){
						self.actions[self.actions.length - 1].chara.push({"index":mytargets[j].chara.index(),"action":"stand"});
					}*/
				}else if(skillData.Type == 0){
					addition = skillData.Addition/100;
					count = skillData.Count;
				}
			}
		}
		self.actions.push({"type":"action","chara":[{"index":chara.index(),"action":"attack"}]});
		var dielist = [];
		var hertlist = [];
		var standlist = [];
		targets = self._getTargets(!data.self,count);
		for(j=0;j<targets.length;j++){
			var num = self._getHertValue(chara,targets[j].chara)*addition >>> 0;
			hertlist.push({"index":targets[j].chara.index(),"action":"hert","num":num});
			standlist.push({"index":targets[j].chara.index(),"action":"stand","num":num});
			//self.actions[self.actions.length - 1].chara.push({"index":targets[j].chara.index(),"action":"hert","num":num});
			targets[j].hert += num;
			if(targets[j].hert >= targets[j].chara.hp()){
				dielist.push({"index":targets[j].chara.index()});
			}
		}
		self.actions.push({"type":"action","chara":hertlist});
		self.actions.push({"type":"action","chara":[{"index":chara.index(),"action":"stand"}]});
		self.actions.push({"type":"action","chara":standlist});
		if(dielist.length > 0){
			self.actions.push({"type":"die","chara":dielist});
		}
		if(self._getOutcome(data.self)){
			return true;
		}
	}
	return false;
};
/*攻击伤害值计算*/
BattlemapModel.prototype._getHertValue=function(attChara,hertChara){
	var r;
	//得到攻击方的攻击力和等级
	var attLv =  attChara.lv();
	var attAttack = attChara.attack();
	//得到防御方的防御力
	var hertDefense = hertChara.defense();
	//攻击的伤害值计算
	if(attAttack > hertDefense){
		r = attLv + 25 + (attAttack - hertDefense)/2;
	}else{
		r = attLv + 25 - (hertDefense - attAttack)/2;
	}
	if(r < 1)r=1;
	r = ((110-Math.random()*20)*r/100) >>> 0;
	if(r < 1)r=1;
	return r;
};
BattlemapModel.prototype._getTargets=function(value,count){
	var self = this,arms,i,result = [];
	if(value){
		arms = self.self_arms;
	}else{
		arms = self.enemy_arms;
	}
	for(i=0;i<arms.length;i++){
		if(arms[i].hert > arms[i].chara.hp())continue;
		result.push(arms[i]);
	}
	result.sort(function(a,b){return Math.random()>0.5;});
	return result.slice(0,count);
};
BattlemapModel.prototype._getOutcome=function(value){
	var self = this,arms,i,result = [];
	if(value){
		arms = self.enemy_arms;
	}else{
		arms = self.self_arms;
	}
	for(i=0;i<arms.length;i++){
		if(arms[i].hert > arms[i].chara.hp())continue;
		return false;
	}
	if(value){
		LGlobal.script.scriptArray.varList["OutcomeBattle"] = 1;
	}else{
		LGlobal.script.scriptArray.varList["OutcomeBattle"] = 0;
	}
	return true;
};
BattlemapModel.prototype.getImages=function(){
	var self = this;
	var list = [],i,j;
	list.push({name:"attack_background",path:LMvc.IMG_PATH+"map/attack_background.png"});
	list.push({name:"effect01",path:LMvc.IMG_PATH+"effect/effect01.png"});
	list.push({name:"effect02",path:LMvc.IMG_PATH+"effect/effect02.png"});
	var default_list = ["attack","block","hert","move","stand"];
	for(i=0;i<default_list.length;i++){
		list.push({name:"chara-default-"+default_list[i]+"-right",path:LMvc.IMG_PATH+"character/default/s/"+default_list[i]+"-right.png"});
	}
	for(j=0;j<self.load_effect.length;j++){
		switch(self.load_effect[j]){
			case "Qinglong":
				for(i=1;i<=21;i++){
					list.push({name:"qinglong-"+i,path:LMvc.IMG_PATH+"effect/qinglong/"+i+"-1.png"});
				}
				break;
			case "Baihu":
				for(i=1;i<=32;i++){
					list.push({name:"baihu-"+i,path:LMvc.IMG_PATH+"effect/baihu/"+i+"-1.png"});
				}
				break;
		}
	}
	return list;
};
BattlemapModel.prototype.getAction=function(){
	var self = this;
	if(self.actionIndex > self.actions.length){
		return null;
	}
	
	var action = self.actions[self.actionIndex];
	self.actionIndex++;
	return action;
};