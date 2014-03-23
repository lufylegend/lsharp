function MapModel(){
	base(this,MyModel,[]);
}
MapModel.prototype.construct=function(){
	this.map = null;
};
MapModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"chara-default",path:LMvc.IMG_PATH+"character/chara-default.png"});
	for(var i=0;i<self.map.imgs.length;i++){
		for(var j=0;j<self.map.imgs[i].length;j++){
			var imgObj = self.map.imgs[i][j];
			list.push({name:imgObj.img,path:LMvc.IMG_PATH+"map/"+imgObj.path});
		}
	}
	
	for(var i=0;i<self.map.builds.length;i++){
		for(var j=0;j<self.map.builds[i].length;j++){
			var imgObj = self.map.builds[i][j];
			list.push({name:imgObj.img,path:LMvc.IMG_PATH+"map/"+imgObj.path});
		}
	}
	//list.push({name:self.map.build.img,path:LMvc.IMG_PATH+"map/"+self.map.build.path});
	return list;
};
MapModel.prototype.setMapFiles=function(){
	this.map = LMvc.mapdata;
	delete LMvc.mapdata;
};