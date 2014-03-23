function MessageBox(){
}
MessageBox.show = function(message){
	if(LRPGObject.messageLayer && LRPGObject.messageLayer.parent){
		LRPGObject.messageLayer.remove();
	}
	var messageLayer = new LSprite();
	var background = new WindowBackground(1,LGlobal.width+100,LGlobal.height+100);
	background.x = background.y = -50;
	background.addEventListener(LMouseEvent.MOUSE_UP, function(){});
	messageLayer.addChild(background);
	
	var backWidth = 500,backHeight=300;
	var background1 = new WindowBackground(1,backWidth,backHeight);
	background1.x = (LGlobal.width - backWidth)*0.5;
	background1.y = (LGlobal.height - backHeight)*0.5;
	messageLayer.addChild(background1);
	
	var msg = new LTextField();
	msg.text = message;
	msg.size = 16;
	msg.width = 400;
	msg.color = "#FFFFFF";
	msg.weight = "bolder";
	msg.setWordWrap(true,30);
	msg.x = background1.x + 50;
	msg.y = background1.y + 50;
	messageLayer.addChild(msg);
	
	var closeButton = new ButtonSelect("BtnSelect01",{label:"关闭",width:180,height:48},1);
	closeButton.x = (LGlobal.width - 180)*0.5;
	closeButton.y = background1.y + 220;
	messageLayer.addChild(closeButton);
	
	LMvc.layer.addChild(messageLayer);
	LRPGObject.messageLayer = messageLayer;
	closeButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		LRPGObject.messageLayer.remove();
		LRPGObject.messageLayer = null;
		LGlobal.script.analysis();
	});
};