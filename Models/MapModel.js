function MapModel(){
	base(this,MyModel,[]);
}
MapModel.prototype.construct=function(){
	this.map = null;
};
MapModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"hero",path:LMvc.IMG_PATH+"character/hero.png"});
	for(var i=0;i<self.map.imgs.length;i++){
		for(var j=0;j<self.map.imgs[i].length;j++){
			var imgObj = self.map.imgs[i][j];
			list.push({name:imgObj.img,path:LMvc.IMG_PATH+"map/"+imgObj.path});
		}
	}
	return list;
};
MapModel.prototype.setMapFiles=function(){
	this.map = LMvc.mapdata;
	delete LMvc.mapdata;
};