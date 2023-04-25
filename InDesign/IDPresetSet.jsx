/*
IDPrisetSet.jsx
(c)2016 Shock tm
指定フォルダから「PDF 書き出しプリセット」「プリントプリセット」「プリフライトプロファイル」を更新するscript
*/
var Question=true//falseにするとダイアログ出ないモード
if(Question){
    if(confirm("「PDF 書き出しプリセット」「プリントプリセット」「プリフライトプロファイル」が全て消去され、"+
                "指定フォルダから新たにプリセット・プロファイルが読み込みます。\n\n"+
                "よろしいですか？")){
        Question=true
    }else{
        Question=false
    }
}else{
    Question=true
}
if(Question){
    PDFPresetDefult("★PDF書き出しプリセットが収められたフォルダを指定★")//拡張子「.joboptions」
    PrintPresetDefult("★プリントプリセットが収められたフォルダを指定★")//拡張子「.prst」
    PriFrightDefult("★プリフライトプロファイルが収められたフォルダを指定★")//拡張子「.idpp」
}
//PDF書き出しプリセットを読み込む
function PDFPresetDefult(path){
    try{
        var fileList=GetFile(path,"*.joboptions");
        if(fileList==false){alert(path+"は存在しません","PDF書き出しプリセット 読込");return;};
        var PP=app.pdfExportPresets,x = 0
        if (PP.length!=0){
            while(PP[PP.length-1].name.slice(0,1)!="["){//"["になるまで削除
                PP[PP.length-1].remove()//大きい奴から消去
                if (PP.length==0){break;}
            }
        }
        for(i=0;i<fileList.length;i++){
            try{
                app.importFile(ExportPresetFormat.PDF_EXPORT_PRESETS_FORMAT,fileList[i])
            }catch(e){}
        }
    }catch(e){}
}
//プリントプリセットを読み込む
function PrintPresetDefult(path){
    try{
        var fileList=GetFile(path,"*.prst");
        if(fileList==false){alert(path+"は存在しません","プリントプリセット 読込");return;};
        var PP=app.printerPresets
        for(i=PP.length;i>1;i=PP.length){//0はデフォルト
            PP[1].remove()
        }
        for(i=0;i<fileList.length;i++){
            try{
                app.importFile(ExportPresetFormat.PRINTER_PRESETS_FORMAT,fileList[i])
            }catch(e){}
        }
    }catch(e){}
}
//プリフライトプロファイルを読み込む
function PriFrightDefult(path){
    try{
        var fileList=GetFile(path,"*.idpp");
        if(fileList==false){alert(path+"は存在しません","プリフライトプロファイル 読込");return;};
        var PF=app.preflightProfiles
        for(i=PF.length;i>1;i=PF.length){//0はデフォルト
            PF[1].remove();
        }
        for(i=0;i<fileList.length;i++){
            try{
                app.loadPreflightProfile(fileList[i]);
            }catch(e){}
        }
    }catch(e){}
}
//指定したフォルダパスのファイルを取得
function GetFile(path,reg,opmsg){
    var fileList=new Array();
    try{
        var folderObj=new Folder(path);
        if(folderObj.exists==false){
            return false
        }
        fileList=folderObj.getFiles(reg);
        folderObj.close;
    }catch(e){}
    return fileList;
}