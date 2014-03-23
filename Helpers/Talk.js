function Talk(){
	if(arguments.length == 6){
		TalkRun.apply(this,arguments);
	}else if(arguments.length == 4){
		TalkRun.call(this,LMvc.layer,150,arguments[0],arguments[1],arguments[2],arguments[3]);
	}else{
		TalkRun.call(this,arguments[0],150,arguments[1],arguments[2],arguments[3],arguments[4]);
	}
}
function TalkRun(layer,y,index,faceindex,msg,callback){
	if(LGlobal.talkLayer && LGlobal.talkLayer.parent){
		LGlobal.talkLayer.parent.removeChild(LGlobal.talkLayer);
	}
	var talkLayer = new LSprite();
	talkLayer.y = y;
	talkLayer.x = 50;
	var charaLayer = new Face(LMvc.datalist["chara"]["peo"+index]["Face"],faceindex);
	charaLayer.x = 200;
	talkLayer.addChild(charaLayer);
	
	var back = new LBitmap(new LBitmapData(LMvc.datalist["talkbox"]));
	back.y = 130;
	back.alpha = 0.7;
	talkLayer.addChild(back);
	var nameText = new LTextField();
	nameText.size = 18;
	nameText.color = "#FFFFFF";
	nameText.text = LMvc.datalist["chara"]["peo"+index]["Name"];
	nameText.x = 30+(90 - nameText.getWidth())*0.5;
	nameText.y = back.y + 22;
	talkLayer.addChild(nameText);
	
	var msgText = new LTextField();
	msgText.x = 25;
	msgText.y = 225;
	msgText.text = msg;
	msgText.size = 12;
	msgText.color = "#FFFFFF";
	msgText.width = 430;
	msgText.setWordWrap(true,23);
	msgText.wind(callback);
	talkLayer.addChild(msgText);
	layer.addChild(talkLayer);
	LRPGObject.talkOver = false;
	LRPGObject.talkLayer = talkLayer;
}
function TalkRemove(){
	LRPGObject.talkLayer.remove();
	LRPGObject.talkOver = false;
	LRPGObject.talkLayer = null;
	LGlobal.script.analysis();
}
