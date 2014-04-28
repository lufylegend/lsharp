//添加显示层back
Layer.add(-,back,0,0);
//添加显示层chara
Layer.add(-,chara,0,0);
//添加显示层talk
Layer.add(-,talk,0,0);
//显示文字，读取中
Text.label(-,loading,图片读取中...,120,200,15,#000000);
//读取图片
Load.img(backdata,./images/back01.png);
Load.img(backdata01,./images/back02.png);
Load.img(selectbox,./images/selectbox.png);
Load.img(selectbtnup,./images/selectbtnup.png);
Load.img(selectbtnover,./images/selectbtnover.png);
Load.img(girldata,./images/girl01.png);
Load.img(boydata,./images/boy.png);
//删除文字，读取中
Text.remove(loading);
//显示背景
Img.add(back,backimg,backdata,0,0,700,500,0);
//背景由透明逐渐显示
Img.transition(backimg,{alpha:1},1,Strong.easeOut);
//在屏幕外显示吕布的人物图片
Img.add(chara,boyimg,boydata,-202,50,202,353,1);
//让吕布图片从屏幕外滑动到屏幕内
Img.transition(boyimg,{x:240},1,Strong.easeOut);
//添加对话框
Img.add(talk,selectbox,selectbox,100,270,405,125,1);
//显示对话人物名称
Text.label(talk,name01,[ 吕布 ],120,290,15,#ffffff);
//显示对话
Text.wind(talk,talk, 你好！欢迎来到「L#游戏世界」！我是吕布。吕布与貂蝉中的吕布，现在开始我来向大家做一个简单的L#脚本演示。（点击屏幕继续）,120,310,360,13,null,#ffffff);
//暂停，等待点击屏幕
Wait.click();
//改变对话
Text.windChange(talk,首先，来试一下选择分支的使用。);
//暂停20毫秒
Wait.time(20);
//改变对话
Text.windChange(talk,告诉我你是男生还是女生？);
//在talk层上添加显示层select
Layer.add(talk,select,120,320);
//在select层上添加两个按钮，作为选项
Button.add(select,btn01,男生,0,10,selectbtnup,selectbtnover,selectbtnover,#ffffff);
Button.add(select,btn02,女生,0,40,selectbtnup,selectbtnover,selectbtnover,#ffffff);
function btn01click();
	//男生按钮被点击之后，移除select层
	Layer.remove(select);
	//将变量gender的值赋值为帅哥
	Var.set(gender,帅哥); 
	//对话，显示选择结果
	Text.windChange(talk,原来是@gender啊！);
endfunction;
function btn02click();
	//女生按钮被点击之后，移除select层
	Layer.remove(select);
	//将变量gender的值赋值为美女
	Var.set(gender,美女); 
	//对话，显示选择结果
	Text.windChange(talk,原来是@gender啊！);
endfunction;
//为按钮添加点击事件
Button.mousedown(btn01,btn01click);
Button.mousedown(btn02,btn02click);
//暂停
Wait.ctrl(0);
//暂停50毫秒
Wait.time(50);
//改变对话
Text.windChange(talk,你是30岁以上的@gender吗？);
//在talk层上添加显示层select
Layer.add(talk,select,120,320);
//在select层上添加两个按钮，作为选项
Button.add(select,btn01,30岁以上,0,10,selectbtnup,selectbtnover,selectbtnover,#ff0000);
Button.add(select,btn02,30岁以下,0,40,selectbtnup,selectbtnover,selectbtnover,#ff0000);
function btn01click();
	Layer.remove(select);
	Var.set(age,30岁以上); 
	Text.windChange(talk,原来是@age的@gender！);
endfunction;
function btn02click();
	Layer.remove(select);
	Var.set(age,30岁以下); 
	Text.windChange(talk,原来是@age的@gender！);
endfunction;
//为按钮添加点击事件
Button.mousedown(btn01,btn01click);
Button.mousedown(btn02,btn02click);
//暂停
Wait.ctrl(0);
//暂停50毫秒
Wait.time(50);
//改变对话
Text.windChange(talk,那么，接下来......);
//暂停30毫秒
Wait.time(30);
//改变对话人物名称
Text.labelChange(name01,[ ??? ],15,#ff0000);
//改变对话
Text.windChange(talk,奉先～～～！);
//暂停30毫秒
Wait.time(30);
//改变对话人物名称
Text.labelChange(name01,[ 吕布 ],15,#ffffff);
//改变对话
Text.windChange(talk,......咦，是谁呢？);
//在屏幕外显示神秘女郎的人物图片
Img.add(chara,girlimg,girldata,800,70,248,338,1);
//让神秘女郎图片从屏幕外滑动到屏幕内
Img.transition(girlimg,{x:450},1,Strong.easeOut);
//改变对话人物名称
Text.labelChange(name01,[ 神秘女郎 ],15,#ff0000);
//改变对话
Text.windChange(talk,你不用管我是谁，我带你去一个地方!);
Wait.time(50);
//改变对话人物名称
Text.labelChange(name01,[ 吕布 ],15,#ffffff);
//改变对话
Text.windChange(talk,我不认识你，为什么要跟你去？而且我现在正在介绍游戏...);
Wait.time(50);
//改变对话人物名称
Text.labelChange(name01,[ 神秘女郎 ],15,#ff0000);
//改变对话
Text.windChange(talk,我就是来帮你一起介绍的啊，快点过来!);
//神秘女郎移出屏幕
Img.transition(girlimg,{x:800},1,Strong.easeOut);
Img.moveTo(gril,700,150,10);
Wait.time(50);
//改变对话人物名称
Text.labelChange(name01,[ 吕布 ],15,#ffffff);
//改变对话
Text.windChange(talk,稍等，稍等...);
Wait.time(20);
//改变对话
Text.windChange(talk,...);
Wait.time(50);
//神秘女郎变透明
Img.transition(girlimg,{alpha:0},0,Strong.easeOut);
//神秘女郎移入屏幕
Img.transition(girlimg,{x:450},0,Strong.easeOut);
//背景变透明
Img.transition(backimg,{alpha:0},1,Strong.easeOut,1);
//吕布变透明
Img.transition(boyimg,{alpha:0},1,Strong.easeOut);
//背景替换
Img.changeData(backimg,backdata01);
//吕布显示
Img.transition(boyimg,{alpha:1},1,Strong.easeOut,1);
//神秘女郎显示
Img.transition(girlimg,{alpha:1},1,Strong.easeOut,1);
//背景显示
Img.transition(backimg,{alpha:1},1,Strong.easeOut);
Img.moveTo(gril,400,150,10);
//改变对话人物名称
Text.labelChange(name01,[ 神秘女郎 ],15,#ff0000);
//改变对话
Text.windChange(talk,奉先，你看这里是不是很漂亮？);
Wait.time(50);
//改变对话人物名称
Text.labelChange(name01,[ 吕布 ],15,#ffffff);
//改变对话
Text.windChange(talk,你拉我来这里干什么，被貂蝉看到了可就说不清了！);
Wait.time(50);
//改变对话人物名称
Text.labelChange(name01,[ 神秘女郎 ],15,#ff0000);
//改变对话
Text.windChange(talk,我这不是帮你一起介绍一下场景切换嘛！);
Wait.time(50);
//改变对话人物名称
Text.labelChange(name01,[ 吕布 ],15,#ffffff);
//改变对话
Text.windChange(talk,原来是这样啊。);
Wait.time(50);
//改变对话人物名称
Text.labelChange(name01,[ 神秘女郎 ],15,#ff0000);
//改变对话
Text.windChange(talk,好了，本次的介绍就到这里了！);
Wait.time(50);
//改变对话人物名称
Text.labelChange(name01,[ 吕布 ],15,#ffffff);
//改变对话
Text.windChange(talk,......);
Wait.time(50);
//改变对话
Text.windChange(talk,......好吧。);
Wait.time(50);
//改变对话人物名称
Text.labelChange(name01,[ 吕布 & 神秘女郎 ],15,#ffffff);
//改变对话
Text.windChange(talk,再见了！);
//游戏变透明
Layer.transition(-,{alpha:0},1,Strong.easeOut);
//清空画面
Layer.clear(-);
//添加文字
Text.label(-,byebye,多谢观看！,120,260,30,#ff0000);
//渐显
Layer.transition(-,{alpha:1},1,Strong.easeOut);