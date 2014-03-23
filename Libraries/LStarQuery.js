function LStarQuery(){
	var self = this;
	self._map = [];//地图
	self._w = 0;//地图的宽
	self._h = 0;//地图的高
	self._open = [];//开放列表
	self._starPoint = null;//起点
	self._endPoint = null;//目标点
	self._path = [];//计算出的路径
	self.queryType = 0;//寻路方式[0：八方向，1：上下四方向，2：斜角四方向]
}
LStarQuery.prototype = {
	drawPath:function(node){
		var self = this;
		var pathNode = node;
		//倒过来得到路径
		while (pathNode != self._starPoint) {
			self._path.unshift(pathNode);
			pathNode = pathNode.nodeparent;
		}
	},
	setStart:function(){
		var self = this;
		for (var y=0; y<self._h; y++) {
			for (var x=0; x<self._w; x++) {
				self._map[y][x].init();
			}
		}
		self._open = [];
	},
	/*计算每个节点*/
	count:function(neighboringNode,centerNode,eight){
		var self = this;
		//是否已经检测过
		if (neighboringNode.isChecked)return;
		var g = eight ? centerNode.value_g + 14:centerNode.value_g + 10;
		//不在关闭列表里才开始判断
		if (neighboringNode.open) {
			//如果该节点已经在开放列表里
			if (neighboringNode.value_g >= g) {
				//如果新G值小于或者等于旧值，则表明该路更优，更新其值
	﻿			neighboringNode.value_g = g;
				self.ghf(neighboringNode);
				neighboringNode.nodeparent = centerNode;
				self.setOpen(neighboringNode);
			}
		} else {
			//如果该节点未在开放列表里
			//计算GHF值
			neighboringNode.value_g = g;
			self.ghf(neighboringNode);
			neighboringNode.nodeparent = centerNode;
			//添加至列表
			self.setOpen(neighboringNode,true);
		}
	},
	/*计算ghf各值*/
	ghf:function(node){
		var self = this;
		var dx = Math.abs(node.x - self._endPoint.x);
		var dy = Math.abs(node.y - self._endPoint.y);
		node.value_h = 10*(dx+dy);
		node.value_f = node.value_g + node.value_h;
	},
	/*加入开放列表*/
	setOpen:function(newNode,newFlg){
		var self = this;
		var new_index;
		if (newFlg) {
			newNode.open = true;
			var new_f = newNode.value_f;
			self._open.push(newNode);
			new_index = self._open.length - 1;
		} else {
			new_index = newNode.index;
		}
		while (true) {
			//找到父节点
			var f_note_index = new_index * 0.5 >>> 0;
			if (f_note_index <= 0) break;
			//如果父节点的F值较大，则与父节点交换
			if (self._open[new_index].value_f >= self._open[f_note_index].value_f) break;
			var obj_note = self._open[f_note_index];
			self._open[f_note_index] = self._open[new_index];
			self._open[new_index] = obj_note;
			self._open[f_note_index].index = f_note_index;
			self._open[new_index].index = new_index;
			new_index = f_note_index;
		}
	},
	/*取开放列表里的最小值*/
	getOpen:function(){
		var self = this;
		var change_note;
		//将第一个节点，即F值最小的节点取出，最后返回
		var obj_note = self._open[1];
		self._open[1] = self._open[self._open.length - 1];
		self._open[1].index = 1;
		self._open.pop();
		var this_index = 1;
		while (true) {
			var left_index = this_index * 2;
			var right_index = this_index * 2 + 1;
			if (left_index >= self._open.length) break;
			if (left_index == self._open.length - 1) {
				//当二叉树只存在左节点时，比较左节点和父节点的F值，若父节点较大，则交换
				if (self._open[this_index].value_f <= self._open[left_index].value_f) break;
				change_note = self._open[left_index];
				self._open[left_index] = self._open[this_index];
				self._open[this_index] = change_note;
				self._open[left_index].index = left_index;
				self._open[this_index].index = this_index;
				this_index = left_index;
			} else if (right_index < self._open.length) {
				//找到左节点和右节点中的较小者
				if (self._open[left_index].value_f <= self._open[right_index].value_f) {
					//比较左节点和父节点的F值，若父节点较大，则交换
					if (self._open[this_index].value_f <= self._open[left_index].value_f) break;
					change_note = self._open[left_index];
					self._open[left_index] = self._open[this_index];
					self._open[this_index] = change_note;
					self._open[left_index].index = left_index;
					self._open[this_index].index = this_index;
					this_index = left_index;
				} else {
					//比较右节点和父节点的F值，若父节点较大，则交换
					if (self._open[this_index].value_f <= self._open[right_index].value_f) break;
					change_note = self._open[right_index];
					self._open[right_index] = self._open[this_index];
					self._open[this_index] = change_note;
					self._open[right_index].index = right_index;
					self._open[this_index].index = this_index;
					this_index = right_index;
				}
			}
		}
		return obj_note;
	},
	/*开始寻路*/
	queryPath:function (star,end){
		var self = this;
		self._path = [];
		if(end.x >= self._map[0].length)end.x = self._map[0].length - 2;
		if(end.y >= self._map.length)end.y = self._map.length - 2;
		if (star.x == end.x && star.y == end.y) return self._path;
		self.setStart();
		self._starPoint = self._map[star.y][star.x];
		self._endPoint = self._map[end.y][end.x];
		self._open = [];
		self._open.push(null);
		var isOver = false;
		var thisPoint = self._starPoint;
		var firstCheck = true;
		while (!isOver) {
			thisPoint.isChecked = true;
			var checkList = [];
			if(self.queryType == 0 || self.queryType == 2){
				if (thisPoint.x > 0 && thisPoint.y > 0) {
					checkList.push(self._map[(thisPoint.y-1)][thisPoint.x - 1]);
				}
				if (thisPoint.x < self._w - 1 && thisPoint.y < self._h - 1) {
					checkList.push(self._map[thisPoint.y + 1][(thisPoint.x+1)]);
				}
				if (thisPoint.x > 0 && thisPoint.y < self._h - 1) {
					checkList.push(self._map[(thisPoint.y+1)][thisPoint.x - 1]);
				}
				if (thisPoint.x < self._w - 1 && thisPoint.y > 0) {
					checkList.push(self._map[(thisPoint.y-1)][thisPoint.x + 1]);
				}
			}
			if(self.queryType == 0 || self.queryType == 1){
                                if (thisPoint.y > 0) {
                                        checkList.push(self._map[(thisPoint.y-1)][thisPoint.x]);
                                }
                                if (thisPoint.x > 0) {
                                        checkList.push(self._map[thisPoint.y][(thisPoint.x-1)]);
                                }
                                if (thisPoint.x < self._w - 1) {
                                        checkList.push(self._map[thisPoint.y][(thisPoint.x+1)]);
                                }
                                if (thisPoint.y < self._h - 1) {
                                        checkList.push(self._map[(thisPoint.y+1)][thisPoint.x]);
                                }
			}
			//检测开始
			var startIndex = checkList.length;
			for (var i = 0; i<startIndex; i++) {
				//周围的每一个节点
				var checkPoint = checkList[i];
				if (self.isWay(checkPoint,thisPoint)) {
					//如果坐标可以通过，则首先检查是不是目标点
					if (checkPoint == self._endPoint) {
						//如果搜索到目标点，则结束搜索
						checkPoint.nodeparent = thisPoint;
						isOver = true;
						break;
					}
					self.count(checkPoint, thisPoint);
				} 
			}
			if (! isOver) {
				//如果未到达指定地点则取出f值最小的点作为循环点
				if (self._open.length > 1) {
					thisPoint = self.getOpen();
				} else {
					//开发列表为空，寻路失败
					return [];
				}
			}
		}
		//路径做成
		self.drawPath(self._endPoint);
		return self._path;
	
	},
	/*判断是否可通过*/
	isWay:function(checkPoint,thisPoint){
		var self = this;
		if(self.queryType == 0){
			if (self._map[checkPoint.y][thisPoint.x].value == 0 && self._map[thisPoint.y][checkPoint.x].value == 0 && self._map[checkPoint.y][checkPoint.x].value == 0) return true;
		}else if(self.queryType == 1){
			if (self._map[checkPoint.y][checkPoint.x].value == 0) return true;
		}else if(self.queryType == 2){
			if (self._map[checkPoint.y][checkPoint.x].value == 0) return true;
		}
		return false;
	}
};
function LNode(_x,_y,_v){
	var self = this;
	self.x = _x;
	self.y = _y;
	self.value = _v?_v:0;
	self.isChecked = false;
	self.value_g = 0;
	self.value_h = 0;
	self.value_f = 0;
	self.nodeparent = null;
	self.index = 0;
	self.open = false;

}
LNode.prototype = {
	init:function(){
		var self = this;
		self.open = false;
		self.isChecked = false;
		self.value_g = 0;
		self.value_h = 0;
		self.value_f = 0;
		self.nodeparent = null;
		self.index = -1;
	}
};