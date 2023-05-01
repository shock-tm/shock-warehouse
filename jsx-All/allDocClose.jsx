﻿/*
allDocClose.jsx
対応アプリケーション：ID・AI・PS
(c)2020 Shock tm
全てのドキュメントを閉じるスクリプト
変更があったドキュメントが存在する場合は問い合わせるダイアログ表示
2020-01-14 ver1.0
*/
var idReg=new RegExp("indesign","i");
if(idReg.test(app.name)){
    allDocClose(true);
}else{
    allDocClose(false);
};
function allDocClose(ID){
    if(app.documents.length!=0){
        var bool=false;
        var docNames="";
        for(var d=0;d<app.documents.length;d++){
            if(ID){
                if(app.documents[d].modified){
                    bool=true;
                    docNames+="・ "+app.documents[d].name+"\n";
                };
            }else{
                if(app.documents[d].saved==false){
                    bool=true;
                    docNames+="・ "+app.documents[d].name+"\n";
                };
            };
        };
        var cf=false;
        if(bool){
            cf=confirm ("閉じる前に保存しますか？\n\n※保存対象ドキュメント：\n"+docNames);
        };
        if(cf){
            while(app.documents.length!=0){
                if(ID){
                    app.documents[0].close(SaveOptions.yes);
                }else{
                    app.documents[0].close(SaveOptions.SAVECHANGES);
                };
            };
        }else{
            while(app.documents.length!=0){
                if(ID){
                    app.documents[0].close(SaveOptions.no);
                }else{
                    app.documents[0].close(SaveOptions.DONOTSAVECHANGES);
                };
            };
        };
    }else{
        alert("ドキュメントが開かれていません！","allDocClose.jsx");
    };
};
