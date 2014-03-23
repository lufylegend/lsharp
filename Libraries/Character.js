function Character(img,w,h){
	var self = this;
	base(self,LSprite,[]);
	var list = LGlobal.divideCoordinate(560,736,8,8);
	var data = new LBitmapData(img,0,0,70,92);
	hero = new LAnimationTimeline(data,list);
	hero.speed = 2;
	hero.setLabel("down",0,0);
	hero.setLabel("left",1,0);
	hero.setLabel("right",2,0);
	hero.setLabel("up",3,0);
	hero.setLabel("left_down",4,0);
	hero.setLabel("right_down",5,0);
	hero.setLabel("left_up",6,0);
	hero.setLabel("right_up",7,0);
	hero.x = (w - 70)*0.5;
	hero.y = h - 92;
	self.w = w;
	self.h = h;
	self.to = new LPoint(self.x,self.y);
	self.addChild(hero);
	self.chara = hero;
	self.roads = [];
	self.stepIndex = 0;
	self.stepCount = 4;
	self.stepx = w/self.stepCount;
	self.stepy = h/self.stepCount;
	self.directionList = {
		"-1,-1":Character.LEFT_UP,
		"-1,0":Character.LEFT,
		"-1,1":Character.LEFT_DOWN,
		"0,-1":Character.UP,
		"0,1":Character.DOWN,
		"1,-1":Character.RIGHT_UP,
		"1,0":Character.RIGHT,
		"1,1":Character.RIGHT_DOWN
	};
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
}
Character.DOWN = "down";
Character.LEFT = "left";
Character.RIGHT = "right";
Character.UP = "up";
Character.LEFT_DOWN = "left_down";
Character.RIGHT_DOWN = "right_down";
Character.LEFT_UP = "left_up";
Character.RIGHT_UP = "right_up";
Character.prototype.changeAction = function(action){
	var self = this;
	hero.gotoAndPlay(action);
};
Character.prototype.setCoordinate = function(x,y){
	var self = this;
	self.x = self.to.x = x;
	self.y = self.to.y = y;
};
Character.prototype.getTo = function(){
	var self = this;
	return [self.to.x/self.w >>> 0,self.to.y/self.h >>> 0];
};
Character.prototype.setTo = function(){
	var self = this;
	var road = self.roads.shift();
	self.to.x = road.x*self.w;
	self.to.y = road.y*self.h;	
};
Character.prototype.setDirection = function(x,y){
	var self = this;
	var direction = self.directionList[x+","+y];
	if(direction == self.direction)return;
	self.direction = direction;
	self.changeAction(self.direction);
};
Character.prototype.move = function(){
	var self = this;
	var x=0,y=0;
	if(self.x > self.to.x){
		self.x -= self.stepx;
		x = -1;
	}else if(self.x < self.to.x){
		self.x += self.stepx;
		x = 1;
	}
	if(self.y > self.to.y){
		self.y -= self.stepy;
		y = -1;
	}else if(self.y < self.to.y){
		self.y += self.stepy;
		y = 1;
	}
	if(x != 0 || y != 0){
		self.setDirection(x,y);
		self.parent.parent.parent.controller.mapMove();
	}
	self.stepIndex++;
	if(self.stepIndex >= self.stepCount){
		self.stepIndex = 0;
		self.to.x = self.x;
		self.to.y = self.y;
	}
};
Character.prototype.onframe = function(event){
	var self = event.target;
	if(self.to.x == self.x && self.to.y == self.y){
		if(self.roads.length == 0)return;
		self.setTo();	
	}else{
		self.move();
	}
};
Character.prototype.setRoad = function(list){
	var self = this;
	self.roads = list;
};

