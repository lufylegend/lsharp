function MemberData(data,lv){
	var self = this;
	self.data = data;
	if(lv)self.data.Lv = lv;
	self.data.Attack = self.data.Force/2 + self.upValue(self.data.Force)*self.data.Lv;
	self.data.Defense = self.data.Command/2 + self.upValue(self.data.Command)*self.data.Lv;
	self.data.Morale = self.data.Luck/2 + self.upValue(self.data.Luck)*self.data.Lv;
}
MemberData.prototype.upValue = function(value){
	if(value < 50)return 1;
	if(value < 70)return 2;
	if(value < 90)return 3;
	return 4;
};
MemberData.prototype.face = function(){
	return this.data.Face;
};
MemberData.prototype.index = function(){
	return this.data.Index;
};
MemberData.prototype.name = function(){
	return this.data.Name;
};
MemberData.prototype.lv = function(){
	return parseInt(this.data.Lv.toString());
};
MemberData.prototype.exp = function(){
	return this.data.Exp;
};
MemberData.prototype.hp = function(value){
	if(typeof value != UNDEFINED){
		this.data.HP = value;
		if(this.data.HP < 0)this.data.HP = 0;
		if(this.data.HP > self.maxHp())this.data.HP = self.maxHp();
	}
	return this.data.HP;
};
MemberData.prototype.maxHp = function(){
	return this.data.MaxHP;
};
MemberData.prototype.mp = function(){
	return this.data.MP;
};
MemberData.prototype.maxMp = function(){
	return this.data.MaxMP;
};
MemberData.prototype.introduction = function(){
	return this.data.Introduction;
};
MemberData.prototype.force = function(){
	return this.data.Force;
};
MemberData.prototype.intelligence = function(){
	return this.data.Intelligence;
};
MemberData.prototype.command = function(){
	return this.data.Command;
};
MemberData.prototype.agile = function(){
	return this.data.Agile;
};
MemberData.prototype.luck = function(){
	return this.data.Luck;
};
MemberData.prototype.skill = function(){
	return this.data.Skill;
};
MemberData.prototype.attack = function(){
	return this.data.Attack;
};
MemberData.prototype.defense = function(){
	return this.data.Defense;
};
MemberData.prototype.morale = function(){
	return this.data.Morale;
};