/*
マス目生成.jsx
(c)2016 Shock tm
選択されたフレームグリッドにゴマを振るscript

2016-06-10 ver0.1
2023-04-13 ver0.2 文字スタイルを「なし」に
*/
gomaMain();
//メーンルーチン
function gomaMain(){
    app.doScript("doGomaMain()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
}
function doGomaMain(){
    if(app.documents.length!=0){//ドキュメントが開かれている
        if(app.selection.length==1){//選択は１つだけ
            if(app.selection[0]=="[object TextFrame]"){
                app.activeDocument.textDefaults.appliedCharacterStyle=app.activeDocument.characterStyles[0];
                var actDoc=app.activeDocument
                var mototani=TaniChage([MeasurementUnits.POINTS,MeasurementUnits.POINTS,MeasurementUnits.POINTS,MeasurementUnits.POINTS,MeasurementUnits.POINTS],actDoc)//単位を全てポイントにする
                if (app.selection[0].parentStory.storyPreferences.frameType == FrameTypes.frameGridType){//フレームグリッドで間違いない
                    var info=infoFrameGridGet(app.selection[0])
                    var GM=mojikeisan(info)
                    with(app.selection[0]){
                        var masume=""
                        for(g=0;g<GM[1];g++){
                            switch(g){
                                case 0:case 4:case 9:case 14:case 19:case 24:case 29:case 34:case 39:case 44:case 49:case 54:case 59:case 64:case 69:case 74:case 79:case 84:case 89:case 94:case 99:
                                    for(m=0;m<GM[0];m++){
                                        switch (m){
                                            case 0:
                                                if((g==0)|(g==4)){
                                                    masume=masume+(g+1);
                                                }else{
                                                    masume=masume+(g+1);
                                                };break;
                                            case 9:case 19:case 29:case 39:case 49:case 59:case 69:case 79:case 89:case 99:
                                                masume=masume+(m+1);break;
                                            default:masume=masume+"□";
                                        }
                                    }
                                    if (g!=GM[1]-1){//最後の行以外は改行挿入
                                        masume=masume+String.fromCharCode(13);
                                    }
                                    break;
                                default:
                                for(m=0;m<GM[0];m++){
                                    masume=masume+"□"
                                }
                                if(g==GM[1]-1){
                                }else{
                                    masume = masume+String.fromCharCode(13);
                                }
                            }
                        }
                        contents=masume
                        with(parentStory){
                            appliedParagraphStyle=app.activeDocument.paragraphStyles.item("[基本段落]")
                            appliedCharacterStyle=app.activeDocument.characterStyles.item("[なし]")
                            pointSize=info[3]
                            leading=info[3]
                            verticalScale=info[4]
                            horizontalScale=info[5]
                            characterAki=info[9]
                            gridAlignment=GridAlignment.ALIGN_EM_CENTER
                            fillColor=actDoc.swatches.item("Black")
                            fillTint=50
                        }
                        if(info[0]=="横"){
                            GrepChenge({findWhat:"(\\d)"},{changeTo:"\$1",glyphForm:AlternateGlyphForms.FULL_WIDTH_FORM},parentStory)
                            GrepChenge({findWhat:"(\\d\\d)"},{changeTo:"\$1",glyphForm:AlternateGlyphForms.MONOSPACED_HALF_WIDTH_FORM},parentStory)
                            GrepChenge({findWhat:"(\\d\\d\\d)"},{changeTo:"\$1",glyphForm:AlternateGlyphForms.THIRD_WIDTH_FORM},parentStory)
                        }else{
                            GrepChenge({findWhat:"(\\d)"},{changeTo:"\$1",glyphForm:AlternateGlyphForms.FULL_WIDTH_FORM,characterRotation:90},parentStory)
                            GrepChenge({findWhat:"(\\d\\d)"},{changeTo:"\$1",tatechuyoko:true,glyphForm:AlternateGlyphForms.MONOSPACED_HALF_WIDTH_FORM,characterRotation:0},parentStory)
                            GrepChenge({findWhat:"(\\d\\d\\d)"},{changeTo:"\$1",tatechuyoko:true,glyphForm:AlternateGlyphForms.THIRD_WIDTH_FORM,characterRotation:0},parentStory)
                        }
                    }
                    TaniChage(mototani,actDoc)//単位を全て戻す
                }
            }else{
                alert("グリッドフレームを選択して下さい。")			
            }
        }
    }
}
//正規表現置換 ex.GrepChenge({findWhat:"０"},{changeTo:"0"},app.selection[0])
function GrepChenge(ff,cc,taget){
    app.findGrepPreferences = NothingEnum.nothing;//検索の初期化
    app.changeGrepPreferences = NothingEnum.nothing;//置換の初期化
    app.findGrepPreferences.properties = ff;//検索の設定
    app.changeGrepPreferences.properties = cc;//置換の設定
    taget.changeGrep();//検索と置換の実行
}

//infoから文字数と行数を計算する
function mojikeisan(info){
	var moji , gyo
	if(info[0]=="横"){
		var haba = Rou(info[1] - info[12][1] - info[12][3] - info[13] - info[13],3)
		if(info[11]!=1){
			haba = (haba - (info[10] * (info[11] - 1))) / info[11]		
		}
		var takasa = Rou(info[2] - info[12][0] - info[12][2] - info[13] - info[13],3)
		moji = Rou(haba / (info[7] + info[9]) ,0)
		gyo = Rou(takasa / (info[6] + info[8]) ,0)
	}else{
		var haba = Rou(info[1] - info[12][1] - info[12][3] - info[13] - info[13],3)
		var takasa = Rou(info[2] - info[12][0] - info[12][2] - info[13] - info[13],3)
		if(info[11]!=1){
			takasa = (takasa - (info[10] * (info[11] - 1))) / info[11]			
		}
		moji = Rou(takasa / (info[6] + info[9]) ,0)
		gyo = Rou(haba / (info[7] + info[8]) ,0)
		
	}
	return([moji,gyo])
}
//選択したフレームグリッドの基本情報を取得
function infoFrameGridGet(taget){
	var info = new Array();
	with(taget){
		if(parentStory.storyPreferences.storyOrientation==HorizontalOrVertical.horizontal){info[0]="横"}else{info[0]="縦"}//組み方向
		var size = visibleBounds
		info[1] = size[3] - size[1]//幅
		info[2] = size[2] - size[0]//高さ
		with(parentStory.gridData){
			info[3] = pointSize//文字の大きさをミリで表す
			info[4] = verticalScale//平体
			info[5] = horizontalScale//長体
			info[6] = info[3] * info[4] /100//実際の文字の縦幅	
			info[7] = info[3] * info[5] /100//実際の文字の横幅			
			info[8] = lineAki//行間
			info[9] = characterAki//文字間
		}
	var XX = taget
		with(textFramePreferences){
				info[10] = textColumnGutter//段間
				info[11] = textColumnCount//段数
				info[12] = insetSpacing//上下左右のアキ
				info[12][0] = info[12][0]
				info[12][1] = info[12][1]
				info[12][2] = info[12][2]
				info[12][3] = info[12][3]
			}
		info[14] = strokeColor.name;
		if(info[14]=="None"){info[13]=0}else{info[13] = strokeWeight}//罫の太さ
		if(info[14]=="None"){info[14]="Black"}
		if(info[14]==""){info[15]=strokeColor.colorValue}else{info[15]=""}
	}
	return info
}
//単位の変更と戻し
function TaniChage(vp,doc){
	var bk_lin  = doc.viewPreferences.strokeMeasurementUnits;   
	var bk_typo = doc.viewPreferences.typographicMeasurementUnits;   
	var bk_txt  = doc.viewPreferences.textSizeMeasurementUnits;   
	var bk_hori = doc.viewPreferences.horizontalMeasurementUnits;   
	var bk_vert = doc.viewPreferences.verticalMeasurementUnits;     
	with (doc.viewPreferences){
		strokeMeasurementUnits = vp[0]
		typographicMeasurementUnits = vp[1]
		textSizeMeasurementUnits = vp[2]
		horizontalMeasurementUnits = vp[3]
		verticalMeasurementUnits = vp[4]
	} 
	return ([bk_lin,bk_typo,bk_txt,bk_hori,bk_vert])
}
//四捨五入メソッド
function Rou(Si,j){
	var XX = 1
	switch(j){
		case 0:XX=1;break;
		case 1:XX=10;break;
		case 2:XX=100;break;
		case 3:XX=1000;break;
		case 4:XX=10000;break;
		case 5:XX=100000;break;
		case 6:XX=1000000;break;
		case 7:XX=10000000;break;
		case 8:XX=100000000;break;
		case 9:XX=1000000000;break;
		default:break;
	}
	Si = Math.round(Si * XX)
	Si = Si / XX
	return Si
}
