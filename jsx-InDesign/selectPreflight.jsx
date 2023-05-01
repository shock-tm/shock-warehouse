/*
selectPreflightPlus.jsx
(c)2016 Shock tm
プリント前・保存前にプリフライトさせるイベントリスナースクリプト。
指定のメニュー動作前にも対応。メニュー「書き出し...」と「ブックレットをプリント...」前にもプリフライトする。
起動ごとにプリフライトが選択できる。
*/
#target "InDesign"
#targetengine "session"
#targetengine "selectPreflight"
var preflightName
var menuList
(function(){
    menuList=new Array();
    menuList=["$ID/書き出し...","$ID/ブックレットをプリント..."]//ここにメニュー名を追加する ,"$ID/●メニュー名●"
    Main()
    //メニューイベントリスナーを登録
    for(var ma=0;ma<menuList.length;ma++){
        app.menuActions.item(menuList[ma]).addEventListener("beforeInvoke", selectPreflight, false);
    }
    app.addEventListener("beforePrint", selectPreflight, false);//プリント前
    app.addEventListener("beforeSave", selectPreflight, false);//保存前
    //app.addEventListener("afterOpen", selectPreflight, false);//ドキュメントを開いた後
    //app.addEventListener("☆ここにイベント名☆", selectPreflight, false);//この行をコピーする
})();
//プリフライト実行
function selectPreflight(my_event){
    try{
        if(app.documents.length==0){return;}
        var Doc=app.activeDocument
        var my_profile = app.preflightProfiles[0];//[基本]プロファイルは名前参照できないみたい
        if ((/^\[?(基本|Basic)\]?$/i).test(preflightName)) {
        }else{////入力されたpreflightNameの名前が存在しているかどうか
            var tmp_str = "[";//すべてのプロファイルを繋げた文字列
            for(var i=0;i<app.preflightProfiles.length;i++) {
                tmp_str=tmp_str+app.preflightProfiles[i].name+"][";
            }
            if(tmp_str.indexOf(preflightName)==-1) {
                alert("プリフライトプロファイル「"+preflightName+"」は存在しません。"); 
                return;
            }
            my_profile=app.preflightProfiles.itemByName(preflightName);
        }
        var my_process=app.preflightProcesses.add(Doc, my_profile);
        my_process.waitForProcess();
        var my_results=my_process.processResults;//返事
        var preF=my_process.aggregatedResults
        my_process.remove();//プロセスをクリーンアップする
        if(preF[2]==""){
        }else{
            if(confirm("プリフライトエラーが発生しています\n処理を続行しますか？\n\nプロファイル名："+preflightName+"\n"+
                        "プリフライトメッセージ：\n"+preF)==false){
                app.panels.item("プリフライト").visible=true//プリフライトパネルの表示
                my_event.preventDefault();//中止
            }
        }
    }catch(e){
    }
}
//プリフライトをリストから選択する
function Main(){
    try{
        ELdelete("selectPreflight")
        var pList=new Array();
        for(var p=0;p<app.preflightProfiles.length;p++){
            pList.push(app.preflightProfiles[p].name)
        }
        var newWindow =  new Window ('dialog', "selectPreflight writen by shock tm", [0, 0,0 + 220, 0 + 130])
        var flag = false;
        with(newWindow){;center();
            add('statictext' , [10, 13, 10 + 200, 10 + 14] , '実行するプロファイル名：' , {multiline : false});
            var preDown=add('dropdownlist' , [20, 40, 20 + 190, 40 + 20] ,pList);preDown.selection=0;
            add('statictext' , [10, 73, 10 + 200, 70 + 14] , "現プロファイル："+preflightName , {multiline : false});
            var ok = add('button' , [150, 100, 150 + 60, 100 + 20] , 'OK' , {name: 'ok'});
            ok.onClick=function(){newWindow.close();flag=true;}
        };
        newWindow.show();
        if(flag){
            preflightName=preDown.selection.text//使用するプリフライトのプロファイル名
            alert("プロファイル「"+preDown.selection.text+"」で\nイベントリスナーにプリフライトチェックを登録しました。\n（前回、登録したプロファイルは削除されています。）","イベントリスナー登録")
        }
    }catch(e){
    }
}
//イベントリスナーの削除
function ELdelete(NAM){
    try{
        //メニューイベントリスナーを削除
        for(var ma=0;ma<menuList.length;ma++){
            var mel=app.menuActions.item(menuList[ma]).eventListeners
            var m=0
            while((mel.length!=0)|(mel.length<m)){
                if(mel[m].handler.name==NAM){
                    mel[m].remove()
                }else{
                    m=m+1
                }
            }
        }
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
