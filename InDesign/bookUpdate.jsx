/*
book更新.jsx
(c)2016 Shock tm
ブックファイルの工事現場マークを解消するscript

2016-06-01 ver0.1
*/
Main()
function Main(){
	if (app.documents.length+app.books.length==0){
		var filename = File.openDialog("更新するブックを指定して下さい。","*.indb");
		if (filename) {
			app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;//ダイアログ非表示設定
			app.open(filename);var logNam = ""
                var myBook = app.activeBook.bookContents
                for(b=0;b<myBook.count();b++){//ブック内のドキュメント数だけ処理する
                    if(myBook[b].status==BookContentStatus.DOCUMENT_OUT_OF_DATE){
                        app.open(myBook[b].fullName);//ドキュメントを開く
                        app.activeDocument.close(SaveOptions.no);//保存しないで閉じる
                    }else{
                    }
                }
                logNam = app.activeBook.name
                app.activeBook.close(SaveOptions.yes);//保存してブックを閉じる
                alert("ブック更新処理が終了しました。")
                app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL//ダイアログ表示設定
		}else{
			alert("キャンセルしました。")
		}
	} else {
        alert("ドキュメントとブックを全て閉じて下さい。")
	}
}