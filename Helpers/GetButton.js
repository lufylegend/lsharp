function GetButton(data,properties,type){
	var width = data.width;
	var height = data.height;
	var up,down,upDisplay,downDisplay,w,h,upTxt,downTxt;
	if(type == 1){
		w = width;h=height/2;
		up = new LBitmap(new LBitmapData(data,0,h,w,h));
		down = new LBitmap(new LBitmapData(data,0,0,w,h));
	}else{
		w = width/2;h=height;
		up = new LBitmap(new LBitmapData(data,w,0,w,h));
		down = new LBitmap(new LBitmapData(data,0,0,w,h));
	}
	if(properties){
		upDisplay = new LSprite();
		upDisplay.addChild(up);
		upTxt = new LTextField();
		upTxt.text = properties.label;
		upTxt.color = "#FFFFFF";
		upTxt.size = h*0.5 >>> 0;
		upTxt.x = (properties.width - upTxt.getWidth())*0.5;
		upTxt.y = (properties.height - upTxt.getHeight())*0.5;
		upDisplay.addChild(upTxt);
		downDisplay = new LSprite();
		downDisplay.addChild(down);
		downTxt = new LTextField();
		downTxt.text = properties.label;
		downTxt.color = "#FFFFFF";
		downTxt.size = h*0.5 >>> 0;
		downTxt.x = (properties.width - downTxt.getWidth())*0.5;
		downTxt.y = (properties.height - downTxt.getHeight())*0.5;
		downDisplay.addChild(downTxt);
	}else{
		upDisplay = up;
		downDisplay = down;
	}
	var button = new LButton(upDisplay,downDisplay);
	return button;
}