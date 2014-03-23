//清除画面
Layer.clear(-);
//RPG地图设定开始
RPGMap.start();
//RPG地图初始化开始
initialization.start;
//地图数据设定，包括地形和图片等
addMap(r02.rmap);
//加入人物角色，参数以此为 人物index,动作action,方向direction,坐标x,坐标y,是否可控ishero
RPGCharacter.add(1,stand,left_up,19,14,true);
RPGCharacter.add(6,stand,left_down,12,9,false);
RPGCharacter.add(7,zither,right_down,6,8,false);
//RPG地图初始化结束
initialization.end;
//RPG地图中各函数初始化开始
function.start;
//函数名称为“characterclick”+人物序号的函数，功能是当点击到某人物的时候，会调用相应的函数
function characterclick6();
	RPGTalk.set(6,0,欢迎光临小店，客官要点儿什么？);
	RPGTalk.set(1,0,我比较关心那边弹琴的美女是谁。);
	RPGTalk.set(6,0,她天下第一美女貂蝉啊。);
endfunction;
function characterclick7();
	RPGTalk.set(7,0,一点樱桃启绛唇，两行碎玉喷阳春。丁香舌吐衠钢剑，要斩奸邪乱国臣。);
	RPGTalk.set(1,0,好美啊，好美。。。);
endfunction;
function mapR01();
	//清空画面
	Layer.clear(-);
	//预先设置下一地图中，可控人物的坐标和动作
	Var.set(x,45);
	Var.set(y,29);
	Var.set(action,stand);
	Var.set(direction,right_down);
	//读取下一地图脚本
	Load.script(script/R01.ls);
endfunction;
//RPG地图中各函数初始化结束
function.end;
loop.start;
RPGCharacter.atCoordinate(1,19,14,20,16,mapR01);
loop.end;
//RPG地图设定结束
RPGMap.end();
RPGItem.add(entrance,20,14);