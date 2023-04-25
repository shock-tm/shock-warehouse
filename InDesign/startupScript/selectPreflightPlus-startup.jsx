/*
selectPreflightPlus-startup.jsx
(c)2016 Shock tm
プリント前・保存前にプリフライトさせるイベントリスナースクリプト。
指定のメニュー動作前にも対応。メニュー「書き出し...」と「ブックレットをプリント...」前にもプリフライトする。
初回起動用にスタートアップに入れておく。とりあえず、初期プリフライトプロファイルは【[基本]】にしています。
*/
#target "InDesign"
#targetengine "session"
#targetengine "selectPreflight"
var preflightName
var menuList
(function(){
    menuList=new Array();
    menuList=["$ID/書き出し...","$ID/ブックレットをプリント..."]//ここにメニュー名を追加する ,"$ID/●メニュー名●"
    preflightName="[基本]"
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
