LSystem.screen(LStage.FULL_SCREEN);
init(50,"mylegend",800,400,main);
function main(){
	LGlobal.setDebug(true);
	var sc = "Load.script(script/Main01.ls?"+(new Date()).getTime()+");";
	var sp = new LSprite();
	addChild(sp);
	var script = new LScript(sp,sc);
}