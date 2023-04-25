/*
bgtChange.jsx
(c)2018 Shock tm
バックグラウンドタスクを切り替える
*/
bgtChange()
function bgtChange(){
    var now
    var after
    var txtPath=""
    if($.os[0]=="W"){//win
        txtPath=app.filePath+"/DisableAsyncExports.txt"
    }else{//mac
        txtPath=decodeURI(Folder.appPackage)+"/Contents/MacOS/DisableAsyncExports.txt"
    }
    var taskFile=new File(txtPath)
    if(taskFile.exists){
        now="OFF"
        after="ON"
    }else{
        now="ON"
        after="OFF"
    }
    if(confirm ("バッググラウンドタスク機能は【"+now+"】になっています。\n\n【"+after+"】に切り替えますか？")){
        if(after=="ON"){
            taskFile.remove()
        }else{
           var a= taskFile.open("w");
            taskFile.write("");
            return taskFile.close();
        }
    }
}