LSystem.screen(LStage.FULL_SCREEN);
function doScroll() {
	if(window.pageYOffset === 0) {
		window.scrollTo(0, 1);
	}
}
window.onload = function() {
	setTimeout(doScroll, 100);
	init(50,"mylegend",700,400,main,LEvent.INIT);
}
window.onorientationchange = function() {
	setTimeout(doScroll, 100);
};
window.onresize = function() {
	setTimeout(doScroll, 100);
}
function main(){
	LGlobal.setDebug(true);
	var sc = "Load.script(script/Main.ls?"+(new Date()).getTime()+");";
	var sp = new LSprite();
	addChild(sp);
	var script = new LScript(sp,sc);
}