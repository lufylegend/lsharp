var LRPGObject = {};
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