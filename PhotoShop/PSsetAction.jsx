/*
フォトショップ用スクリプト
PSsetAction.jsx
(c)2017 Shock tm
指定フォルダの.atnファイルを読み込み「アクション」を更新するscript
*/
var actionPath="F:/●PSsetAction/"//.atnファイルのあるフォルダを指定
actionLoad(actionPath)
//アクションファイル読み込み
function actionLoad(filePath){
    var files=GetFile(filePath,"*.atn")
    for(var i=0;i<files.length;i++){
        var obj=new File(files[i])
        actionDelete((decodeURI(obj.name)).replace(/.atn/,""))
        try{
            app.load(obj)
        }catch(e){
        }
    }
}
//アクションファイル削除
function actionDelete(actionName){
    try{
        var idDlt=charIDToTypeID("Dlt ");
        var desc23=new ActionDescriptor();
        var idnull=charIDToTypeID("null");
        var ref4=new ActionReference();
        var idASet=charIDToTypeID("ASet");
        ref4.putName(idASet,actionName);
        desc23.putReference(idnull,ref4);
        executeAction(idDlt,desc23,DialogModes.NO);
    }catch(e){
    }
}
//指定したフォルダパスのファイルを取得
function GetFile(path,reg){
	var folderObj=new Folder(path)
	var fileList=folderObj.getFiles(reg)
	folderObj.close
	return fileList
}
