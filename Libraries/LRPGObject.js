var LRPGObject = {};
LRPGObject.battleIndex = 1;
LRPGObject.propsList = [];
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