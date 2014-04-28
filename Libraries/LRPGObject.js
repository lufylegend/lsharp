var LRPGObject = {};
LRPGObject.battleIndex = 1;
LRPGObject.gameReading = false;
LRPGObject.propsList = [];
LRPGObject.saveGame = function(){
	//利用window.localStorage实现进度保存，IE或者手机浏览器可能需要服务器支持，chrome，firefox，safari等可以直接运行
	var list,i,j;
	//LRPGObject.propsList保存
	//应该保存Props的所有信息，暂时只保存ID和数量
	list = [];
	for(i=0,l=LRPGObject.propsList.length;i<l;i++){
		props = LRPGObject.propsList[i];
		for(j=0;j<props.count;j++){
			list.push(props.index);
		}
	}
	window.localStorage.setItem("LRPG.propsList", JSON.stringify(list));
	//LRPGObject.memberList保存
	//应该保存人物的所有信息，暂时只保存人物ID
	list = [];
	for(i=0,l=LRPGObject.memberList.length;i<l;i++){
		chara = LRPGObject.memberList[i];
		list.push(chara.index());
	}
	window.localStorage.setItem("LRPG.memberList", JSON.stringify(list));
	//变量保存
	window.localStorage.setItem("LRPG.varList", JSON.stringify(LGlobal.script.scriptArray.varList));
	//保存主角当前坐标，动作，面向信息，主角所在地图
	window.localStorage.setItem("LRPG.Character.x", LRPGObject.RPGMap.view.hero.x);
	window.localStorage.setItem("LRPG.Character.y", LRPGObject.RPGMap.view.hero.y);
	window.localStorage.setItem("LRPG.Character.action", LRPGObject.RPGMap.view.hero.action);
	window.localStorage.setItem("LRPG.Character.direction", LRPGObject.RPGMap.view.hero.direction);
	window.localStorage.setItem("LRPG.scriptData", ScriptLoad.scriptData);
};
LRPGObject.readGame = function(){
	console.log("LRPGObject.readGame run");
	var list,i;
	//LRPGObject.propsList读取
	list = JSON.parse(window.localStorage.getItem("LRPG.propsList"));
	for(i=0,l=list.length;i<l;i++){
		LRPGObject.addProps(list[i]);
	}
	//LRPGObject.memberList读取
	list = JSON.parse(window.localStorage.getItem("LRPG.memberList"));
	for(i=0,l=list.length;i<l;i++){
		LRPGObject.addMember(list[i]);
	}
	//变量读取
	LGlobal.script.scriptArray.varList = JSON.parse(window.localStorage.getItem("LRPG.varList"));
	//主角所在地图
	var scriptData = window.localStorage.getItem("LRPG.scriptData");
	//主角当前坐标，动作，面向信息，需要等地图加载完成显示之后才可以复原
	LRPGObject.gameReading = true;
	
	LGlobal.script.lineList.unshift("Load.script("+scriptData+");");
	LGlobal.script.lineList.unshift("Layer.clear(-);");
	LGlobal.script.analysis();
};
LRPGObject.addProps = function(index){
	var propsData = LMvc.datalist["props"]["props"+index],i,l,props;
	if(!propsData)return;
	for(i=0,l=LRPGObject.propsList.length;i<l;i++){
		props = LRPGObject.propsList[i];
		if(props.index == propsData.Index){
			if(props.count < props.max){
				props.count = props.count + 1;
				return;
			}
		}
	}
	switch(propsData.Type){
		case "Recovery":
			LRPGObject.propsList.push(new PropsRecovery(propsData));
			break;
		case "Special":
			LRPGObject.propsList.push(new PropsSpecial(propsData));
			break;
		case "Weaponry":
			LRPGObject.propsList.push(new PropsWeaponry(propsData));
			break;
	}
};
LRPGObject.removeProps = function(index){
	var propsData = LMvc.datalist["props"]["props"+index],i,l,props;
	if(!propsData)return;
	for(i=LRPGObject.propsList.length - 1;i>=0;i--){
		props = LRPGObject.propsList[i];
		if(props.index == propsData.Index){
			props.count--;
			if(props.count <= 0){
				LRPGObject.propsList.splice(i,1);
				break;
			}
		}
	}
};
LRPGObject.memberList = [];
LRPGObject.addMember = function(index){
	var characterData = LMvc.datalist["chara"]["peo"+index],i,l,chara;
	if(!characterData)return;
	for(i=0,l=LRPGObject.memberList.length;i<l;i++){
		chara = LRPGObject.memberList[i];
		if(chara.index() == characterData.Index){
			return;
		}
	}
	LRPGObject.memberList.push(new MemberData(characterData));
};
LRPGObject.removeMember = function(index){
	var characterData = LMvc.datalist["chara"]["peo"+index],i,l,chara;
	if(!characterData)return;
	for(i=LRPGObject.memberList.length - 1;i>=0;i--){
		chara = LRPGObject.memberList[i];
		if(chara.index() == characterData.Index){
			LRPGObject.memberList.splice(i,1);
			break;
		}
	}
};