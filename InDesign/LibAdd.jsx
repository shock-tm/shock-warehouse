/*
LibAdd.jsx
(c)2016 Shock tm
選択アイテムを指定ライブラリに一括登録するscript
2016-08-11 ver1.0
2019-07-22 ver1.1　ライブラリが無い場合、フォルダ指定でidmsファイルを書き出す。
*/
libAddMain()
function libAddMain(){
    try{
        if(app.documents.length==0){  
            alert("開いているドキュメントがありません");
            return
        }
        if(app.selection.length==0){
            alert("オブジェクトを選択して下さい。","")
            return
        }
        var LibFile = new Array();var Y = 0
        for (z=0;z<app.libraries.length;z++){
            if(new File(app.libraries[z].fullName).readonly==false){
                LibFile[Y] = app.libraries[z].name
                Y = Y + 1
            }
        }
        var tempLibName=LibFile[Y]
        if(LibFile.length==0){  
            var fileObj=new File(app.activeDocument.fullName)
            var fRef = new Folder(fileObj.parent);
            var writeFolder=fRef.selectDlg("idmsを書き出すフォルダを指定して下さい。",decodeURI(fRef.fsName));
            if(writeFolder){
                LibFile[0]=decodeURI(writeFolder)
                tempLibName="idms"
            }else{
                return("")
            }
        }
        var myObjectList = new Array;
        var maetuika = "",MC = "", atotuika = "",AC = "";var LibName=tempLibName
        var sss = ediDiaEx(LibFile,LibName,MC,maetuika,AC,atotuika)
        if(sss==""){
            return
        }
        var selects=app.selection;
        for(var myCounter=0;myCounter<selects.length;myCounter++){
            myObjectList.push(selects[myCounter]);
            var myObject = myObjectList[myCounter];
            app.select(NothingEnum.NOTHING)
            with(myObject){
                var i = myCounter+1
                var Name = ""
                if(myObject.label!=""){
                    Name = myObject.label
                }else{
                    Name = ""+i+""
                }
                if(sss[1]){Name=sss[2] + Name}
                if(sss[3]){Name=Name + sss[4]}
                if(tempLibName=="idms"){
                    exportFile(ExportFormat.INDESIGN_SNIPPET,new File(LibFile[0]+"/"+Name+".idms"))
                }else{
                    store(app.libraries.item(sss[0]),{name:Name});
                }
                MC=sss[1];maetuika = sss[2];AC=sss[3];atotuika = sss[4];LibName=sss[0]
            }
        }
    }catch(e){
        alert(e,"ライブラリ追加えら～")
    }
}
//入力ダイアログ
function ediDiaEx(list,libName,MC,maetuika,AC,atotuika){
    var libTitle="登録するライブラリ："
    if(libName=="idms"){
        libTitle="idms書出し先："
    }
	var PWin = new Window ('dialog', "ライブラリ登録",[0,0,190,170]); //ダイアログ作成
	with(PWin){
		center()
		var mae =     add('checkbox' , [ 10, 18, 10+100, 18+ 14],"前に文字追加");mae.value = MC
		var maemoji =  add('edittext', [120, 15,120+ 50, 15+ 20],maetuika, {multiline : false});if(MC!=true){maemoji.enabled = false}
		var ato =     add('checkbox' , [ 10, 48, 10+100, 48+ 14],"後に文字追加");ato.value = AC
		var atomoji =  add('edittext', [120, 45,120+ 50, 45+ 20],atotuika, {multiline : false});if(AC!=true){atomoji.enabled = false}
		var Line =    add('statictext',[ 10, 70, 10+170, 70+ 13],"―――――――――――――――");Line.enabled=false
		var sta2 =    add('statictext',[ 10, 88, 10+170, 88+ 20],libTitle); 
		var Lib = add('dropdownlist' , [ 10,110, 10+170,110+ 20],list);Lib.selection=0
		var can =         add('button',[ 70,140, 70+ 50,140+ 20],'cancel');
		var okB =         add('button',[130,140,130+ 50,140+ 20],'OK');
		var OK = false;var Q = false
		mae.onClick=function(){
			if(mae.value){maemoji.enabled = true}else{maemoji.enabled = false}			
		}
		ato.onClick=function(){
			if(ato.value){atomoji.enabled = true}else{atomoji.enabled = false}			
		}
		okB.onClick=function(){
            OK=true;PWin.close();
		};
	}
	PWin.show();
	if (OK){
		return([Lib.selection.text,mae.value,maemoji.text,ato.value,atomoji.text])
	} else {
		return("")//キャンセルの場合、初期値を返す
	}
}
