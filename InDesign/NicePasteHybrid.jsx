/*
ナイスペースト-Hybrid.jsx
(c)2016 Shock tm
シーンに合わせてとってもナイスなペーストを実行するscript

①フレームを選択・フレーム内の全文字を選択のときは属性を引き継ぎつつ文字を入れ替える
②選択したグループ内の１つめのテキストフレームに①の処理
③フレームグリッド内にカーソルがあれば、グリッドフォーマットを無視してペーストを実行
④選択しているテキストがアンカーオブジェクトで尚且つ、テキストフレームが含まれているならばそのテキストフレームに①の処理
⑤セルを選択（一つ）・セル内のの全文字を選択のときは属性を引き継ぎつつ文字を入れ替える
⑥セルを複数選択、コピーされたテキストと区切りが一致するならば選択されたセル群に⑤の処理
⑦上記以外は通常のペーストを行う

2016-05-22 ver0.1
2017-01-16 ver0.2 Macのクリップボード取得に対応
2017-01-28 ver0.3 Macのクリップボード取得に今度こそ対応
2018-07-13 ver0.4 インラインオブジェクトとテキストを同時選択している場合にオブジェクトにテキストを入れ込む
2019-07-15 ver0.5 上記の処理の元の文字が残るバグ解消
2019-08-31 ver0.6 上記の処理の元の文字が残るバグ解消２
2019-09-06 ver0.7 ⑤⑥の処理のバグ解消
*/
niceMain()
function niceMain(){
    app.doScript("nice2Main()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);//一つの処理として実行
}
function nice2Main(){
    try{
        if (app.documents.length != 0){//ドキュメントが開かれている
            if(app.selection.length==1){
                var tag = app.selection[0]
                switch (tag.constructor.name){
                    case "Text":case "TextColumn":case "TextStyleRange":case "Paragraph":case "Line":case "Word":case "Character":
                        if ((tag.constructor.name=="Character")&(tag.characters[0].contents=="￼")){
                            with(tag.characters[0].allPageItems[0]){
                                if (constructor.name=="Group"){
                                    if(textFrames.length!=0){//フレーム内の文字を入れ替え
                                        textFrames[0].contents=ClipGet()
                                    }else{
                                        if (tag.parentTextFrames[0].parentStory.storyPreferences.frameType == FrameTypes.frameGridType){//フレームグリッドならばグリッドフォーマットを無視してペースト
                                            app.menuActions.item("$ID/Paste Without Grid Format").invoke();
                                        }else{
                                            app.paste()
                                        }
                                    }
                                }else if (constructor.name=="TextFrame"){
                                    contents=ClipGet()
                                }
                            }
                        }else if((tag.contents[0]=="￼")&(tag.contents[1]!="￼")){
                            with(tag.characters[0].allPageItems[0]){
                                var maxSelect=(tag.contents).length
                                tag.characters[1].select();
                                for(sel=2;sel<maxSelect;sel++){
                                    tag.characters[sel].select(SelectionOptions.ADD_TO)
                                }//該当文字列を選択
                                app.copy();
                                var cg=ClipGet();
                                if (constructor.name=="Group"){
                                    textFrames[0].contents=cg;
                                }else if (constructor.name=="TextFrame"){
                                    contents=cg;
                                }
                                tag.characters[1].select();
                                for(sel=2;sel<maxSelect;sel++){
                                    tag.characters[sel].select(SelectionOptions.ADD_TO)
                                }
                                app.selection[0].remove()
                                tag.characters[0].select();
                            }
                        }else if (tag.parentTextFrames[0].parentStory.storyPreferences.frameType == FrameTypes.frameGridType){//フレームグリッドならばグリッドフォーマットを無視してペースト
                            app.menuActions.item("$ID/Paste Without Grid Format").invoke();
                        }else{
                            if(tag.contents==tag.parentTextFrames[0].contents){//全て選択しているなら差し替え
                                tag.parentTextFrames[0].contents=ClipGet();
                            }else if(tag.parent.constructor.name=="Cell"){
                                if(tag.contents==tag.parent.contents){
                                    tag.parent.contents=ClipGet();
                                }else{
                                    app.paste()
                                }
                            }else{
                                app.paste()
                            };
                        };break;
                    case "Cell":
                        if(tag.cells.length==1){
                            app.menuActions.item("$ID/Switch From Cell Selection to Text Selection").invoke();
                            tag.contents=ClipGet();
                            tag.select()
                        }else{
                            app.menuActions.item("$ID/Switch From Cell Selection to Text Selection").invoke();
                            var str = ClipGet()
                            tag.select()
                            CellChage(str,tag)
                        };break;
                    case "Table":
                            app.menuActions.item("$ID/Switch From Cell Selection to Text Selection").invoke();
                            var str = ClipGet()
                            tag.select()
                            CellChage(str,tag)
                    case "InsertionPoint":
                        if (tag.parentTextFrames[0].parentStory.storyPreferences.frameType == FrameTypes.frameGridType){//フレームグリッドならばグリッドフォーマットを無視してペースト
                            app.menuActions.item("$ID/Paste Without Grid Format").invoke();
                        }else{
                            app.paste()
                        };break;
                    case "TextFrame"://フレーム内の文字を入れ替え
                        tag.contents=ClipGet();break;
                    case "Group":
                        if(tag.textFrames.length!=0){//フレーム内の文字を入れ替え
                            tag.textFrames[0].contents=ClipGet()
                        }else{
                            app.paste()
                        };break;
                    default:
                        app.paste()
                }
            }else{
                app.paste()
            }
        }
    }catch(e){
        return ""
    }
}
//クリップボードの内容を取得（VBscript）
function ClipGet(){
    try{
        if($.os[0]=="W"){
            var myscript=""
            myscript += "Dim cp\ncp = createobject(\"htmlfile\").parentwindow.clipboarddata.getdata(\"text\")\n"
            myscript += "if cp <> \"\" then\n"
            myscript += "app.scriptArgs.SetValue \"ClipGet\",cp\n"
            myscript += "else\napp.scriptArgs.SetValue \"ClipGet\",\"\"\nend if"
            app.scriptArgs.setValue("ClipGet","")
            app.doScript(myscript,ScriptLanguage.VISUAL_BASIC)
            var ans=app.scriptArgs.getValue("ClipGet")
            return ans
        }else{
            var myAppleScript="get the clipboard"//var myAppleScript="the clipboard as text"
            var ans=app.doScript(myAppleScript,ScriptLanguage.APPLESCRIPT_LANGUAGE)
            return ans
        }
    }catch(e){
        return ""
    }
}
//Cellに区切りテキストを差し替えるメソッド
function CellChage(str,po){
    try{
        var line,cel;
        line = str.split("\r\n");//「行／列区切り」で分割する
        var columnsSelect = po.columns.length;
        var rowSelect = po.rows.length;
        var temp=str;
        temp=temp.replace(/\r\n/g,"\t");
        temp=temp.replace(/\n\r/g,"\t");
        temp=temp.replace(/\r/g,"\t");
        temp=temp.replace(/\n/g,"\t");
        if (temp.split("\t").length != po.cells.length){
            alert("テキスト－セル数　不一致");
            return "";
        };
        for(i=0;i<line.length;i++){//改行分繰り返し
            cel = line[i].split("\t");//さらに「セル区切り」で分割する
            for(j=0;j<cel.length;j++){//「セル区切り」分繰り返し
                if (cel[j] != ""){//文字列が空なら何もしない
                    cel[j] = cel[j].replace(/\*/g,"\r");;//「セル中改行文字」を改行に変換
                    with(po.rows[i].cells[j]){//標的のセル
                        if (str[0] != ""){
                            texts[0].contents = cel[j]//ヘッダがないのでそのままセルにテキストを収める
                        };
                    };
                };
            };
        };
    }catch(e){
        return "";
    };
}
