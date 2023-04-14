/*
nearPlacePlus.jsx
(c)2016 Shock tm
アクティブドキュメントがある階層で配置ダイアログが開くscript
（Shiftで連続選択・Ctrl押しながらで読み込みオプション表示）
画像選択時は選択画像のパスが開きます
*/
nearMain();
//メーンルーチン
function nearMain(){
    app.doScript("doNearMain()",ScriptLanguage.JAVASCRIPT,[],UndoModes.fastEntireScript);
}
function doNearMain(){
    try{
        if(app.documents.length!=0){
            var doc=app.activeDocument
            var fileObj=app.activeDocument.fullName
            var fileName=app.activeDocument.name
            var kaku=("*."+(app.placeableFileExtensions).join(";*.")+";").toLowerCase()
            if(app.selection.length==1){
                var obj=app.selection[0]
                switch(obj.constructor.name){
                    case"Image":case"PDF":case"ImportedPage":case"EPS":case"PICT":case"WMF":
                        fileObj=new File(obj.itemLink.filePath)
                        break;
                    case"Rectangle":case"Polygon":case"Oval":
                        if(obj.images.length+obj.pdfs.length+obj.importedPages.length+obj.importedPages.length+obj.epss.length==1){
                            fileObj=new File(obj.images[0].itemLink.filePath)
                        }
                        break;
                    default:
                        break;
                }
            }
            var TF=false;
            do{
                var result=fileObj.openDlg("配置（Shift押しながらで連続選択・Ctrl押しながらで読み込みオプション表示）",kaku);
                var opt=ScriptUI.environment.keyboardState.ctrlKey
                var shift=ScriptUI.environment.keyboardState.shiftKey
                if(result){
                    if(decodeURI(result)!=decodeURI(fileObj)){
                        result=decodeURI(result).replace(/^\/(.)\//,"$1:/")
                        doc.place((decodeURI(result)),opt)
                        if(shift){
                            fileObj=(new File(result)).parent
                            TF=false
                        }else{
                            TF=true
                        }
                    }else{
                        alert(fileName+" を "+fileName+" に配置できません。","Adobe InDesign")
                    }
                }else{
                    TF=true;
                }
            }while(TF!=true);
        }
    }catch(e){
    }
}