function MemberData(data){
	var self = this;
	self.data = data;
}
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
	return this.data.Lv;
};
MemberData.prototype.exp = function(){
	return this.data.Exp;
};
MemberData.prototype.hp = function(){
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