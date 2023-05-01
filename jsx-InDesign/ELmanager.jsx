/*
ELmanager.jsx
(c)2016 Shock tm
イベントリスナーを管理する
*/
var path=decodeURI(new Folder(app.scriptPreferences.scriptsFolder).parent+"/Startup Scripts")
var scrs=GetFile(path,"*.*")
for(f=0;f<scrs.length;f++){
    scrs[f]=decodeURI(new File(decodeURI(scrs[f])).name)
}
Main(scrs)
function Main(scrs){
    var xml=ELget()
    var hands=new Array()
    for(var h=0;h<xml.children().length();h++){
        var temp=xml.children()[h].HandlerName.toString()
        if(hands.join(",").indexOf(temp)==-1){
            hands.push(temp)
        }
    }
    var newWindow =  new Window ('dialog', "EventListener管理   writen by shock tm", [0,0,0+300,0+170])
    var flag=false;delFlag=false;playFlag=false;
    with(newWindow){;center();
        var idl=add('statictext',  [ 10, 13, 10+180, 10+ 14] , 'HandlerName:',{multiline : false});
        var ids=add('dropdownlist',[ 10, 30, 10+180, 30+ 20] , hands);ids.selection=0
        var L1=add('statictext' ,  [ 10, 63, 10+180, 60+ 14] , 'eventtype : ' , {multiline : false});
        var L2=add('statictext' ,  [ 15, 83, 15+175, 80+ 34] , '' , {multiline : true});
        var delBt = add('button' , [210, 60,210+ 80, 60+ 30] , 'Delete');
        var allDel =add('button' , [210, 10,210+ 80, 10+ 30] , 'All Delete');
        var scr=add('dropdownlist',[ 10,135, 10+180,135+ 20] , scrs);scr.selection=0
        var playBt=add('button' ,  [200,135,200+ 90,135+ 20] , 'スクリプト実行');
        allDel.onClick=function(){newWindow.close();flag=true;}
        delBt.onClick=function(){newWindow.close();delFlag=true;}
        playBt.onClick=function(){newWindow.close();playFlag=true;}
        ids.onChange=function(){//プリセットの操作
            var temp2=new Array()
            for(z=0;z<xml.children().length();z++){
                if(xml.children()[z].HandlerName.toString()==ids.selection.text){
                    temp2.push(xml.children()[z].EventType.toString())
                }
            }
            L2.text=temp2.join(" , ")
        }
        if(hands.length!=0){ids.notify("onChange")}
    };
    newWindow.show();
    if(flag){
        AllDel()
        Main(scrs)
    }
    if(delFlag){
        ELdelete(ids.selection.text)
        Main(scrs)
    }
    if(playFlag){
        var scrFile=new File(path+"/"+scr.selection.text)
        app.doScript(scrFile, ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
        Main(scrs)
    }
}
function ELget(){
    var el=app.eventListeners
    var xml="<xml>";
    for(i=0;i<el.length;i++){
        try{
            xml=xml+"\n"+"<item hn=\""+el[i].handler.name+"\" "+
            " el=\""+el[i].properties.eventType+"\">"+
            "<HandlerName>"+el[i].handler.name+"</HandlerName>"+
            "<EventType>"+el[i].properties.eventType+"</EventType>"+
            "</item>"
        }catch(e){
        }
    }
    xml=xml+"</xml>"
    return (new XML(xml))
}
function AllDel(){
    try{
        var el=app.eventListeners
        while(el.length!=0){
            el[0].remove()
        }
        alert("イベントリスナーは全て削除されました。")
    }catch(e){
    }
}
function ELdelete(NAM){
    try{
        var el=app.eventListeners
        var i=0
        while((el.length!=0)|(el.length<i)){
            if(el[i].handler.name==NAM){
                el[i].remove()
            }else{
                i=i+1
            }
        }
    }catch(e){
    }
}
function GetFile(path,reg){
	var folderObj = new Folder(path);
	var fileList = folderObj.getFiles(reg) ; //regファイルを配列化
	folderObj.close;
	return fileList
}
