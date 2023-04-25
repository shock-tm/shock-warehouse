/*
a-gChanger.jsx
(c)2020 shock tm
選択した文字列の前後アキ量・字形幅・文字種を変更するスクリプト

2020-08-04 ver1.0 公開バージョン
*/
han2zenMain();
//スクリプトメイン処理
function han2zenMain(){
    if(app.documents.length!=0){
        if(app.selection.length!=0){
            var tag=app.selection[0];
            if(textSel(tag)){
                var flag=true;
                if (app.selection[0].parentStory.storyPreferences.storyOrientation==StoryHorizontalOrVertical.VERTICAL){
                    flag=false;
                };
                app.doScript("han2zen(tag,flag)",ScriptLanguage.JAVASCRIPT,[],UndoModes.fastEntireScript);
            };
        };
    };
};
//文字前後アキ・字形・文字種変更
function han2zen(tag,flag){
    try{
        var firstNumber=["",AlternateGlyphForms.NONE];
        var firstAlphabet="";
        var firstBrackets=99999;
        var firstMB=99999;
        var firstHifun=[false,AlternateGlyphForms.NONE];
        for(var ci=0;ci<tag.characters.length;ci++){
            var pointX=placeGet(tag.characters[ci],flag);
            var NONE=AlternateGlyphForms.NONE;
            var HALF=AlternateGlyphForms.MONOSPACED_HALF_WIDTH_FORM;
            var FULL=AlternateGlyphForms.FULL_WIDTH_FORM;
            with(tag.characters[ci]){
                var nowtrailingAki=trailingAki;
                var nowleadingAki=leadingAki;
                if((firstNumber[0]!="")&(RegFind(contents,"[0-9０-９]"))){
                    if(firstNumber[0]=="changeFull"){
                        TransliterateChenge(FindChangeTransliterateCharacterTypes.HALF_WIDTH_ROMAN_SYMBOLS,FindChangeTransliterateCharacterTypes.FULL_WIDTH_ROMAN_SYMBOLS,tag.characters[ci]);
                    }else{
                        TransliterateChenge(FindChangeTransliterateCharacterTypes.FULL_WIDTH_ROMAN_SYMBOLS,FindChangeTransliterateCharacterTypes.HALF_WIDTH_ROMAN_SYMBOLS,tag.characters[ci]);
                    };
                    glyphForm=firstNumber[1];
                }else if(RegFind(contents,"[0-9]")){
                    TransliterateChenge(FindChangeTransliterateCharacterTypes.HALF_WIDTH_ROMAN_SYMBOLS,FindChangeTransliterateCharacterTypes.FULL_WIDTH_ROMAN_SYMBOLS,tag.characters[ci]);
                    firstNumber[0]="changeFull";
                    firstNumber[1]=NONE;
                }else  if(RegFind(contents,"[０-９]")){
                    if((glyphForm==NONE)|(glyphForm==FULL)){
                        glyphForm=HALF;
                        firstNumber[0]="changeFull";
                        firstNumber[1]=HALF;
                    }else if(glyphForm==HALF){
                        glyphForm=NONE;
                        TransliterateChenge(FindChangeTransliterateCharacterTypes.FULL_WIDTH_ROMAN_SYMBOLS,FindChangeTransliterateCharacterTypes.HALF_WIDTH_ROMAN_SYMBOLS,tag.characters[ci]);
                        firstNumber[0]="changeRoman";
                        firstNumber[1]=NONE;
                    }else{
                        glyphForm=NONE;
                        firstNumber[0]="changeFull";
                        firstNumber[1]=NONE;
                    };
                }else  if((firstAlphabet=="changeFull")&(RegFind(contents,"[A-Za-zＡ-Ｚａ-ｚ]"))){
                    TransliterateChenge(FindChangeTransliterateCharacterTypes.HALF_WIDTH_ROMAN_SYMBOLS,FindChangeTransliterateCharacterTypes.FULL_WIDTH_ROMAN_SYMBOLS,tag.characters[ci]);
                }else  if((firstAlphabet=="changeRoman")&(RegFind(contents,"[A-Za-zＡ-Ｚａ-ｚ]"))){
                    TransliterateChenge(FindChangeTransliterateCharacterTypes.FULL_WIDTH_ROMAN_SYMBOLS,FindChangeTransliterateCharacterTypes.HALF_WIDTH_ROMAN_SYMBOLS,tag.characters[ci]);
                }else  if(RegFind(contents,"[A-Za-z]")){
                    TransliterateChenge(FindChangeTransliterateCharacterTypes.HALF_WIDTH_ROMAN_SYMBOLS,FindChangeTransliterateCharacterTypes.FULL_WIDTH_ROMAN_SYMBOLS,tag.characters[ci]);
                    firstAlphabet="changeFull";
                }else  if(RegFind(contents,"[Ａ-Ｚａ-ｚ]")){
                    TransliterateChenge(FindChangeTransliterateCharacterTypes.FULL_WIDTH_ROMAN_SYMBOLS,FindChangeTransliterateCharacterTypes.HALF_WIDTH_ROMAN_SYMBOLS,tag.characters[ci]);
                    firstAlphabet="changeRoman";
                }else if((firstBrackets!=99999)&(RegFind(contents,"[「『［（【〈〔｛]"))){
                    glyphForm=NONE;
                    leadingAki=firstBrackets;
                }else if(RegFind(contents,"[「『［（【〈〔｛]")){
                    if(glyphForm==NONE){
                        if(leadingAki==-1){
                            leadingAki=0;
                            if(pointX==placeGet(tag.characters[ci],flag)){
                                leadingAki=0.5;
                            };
                        }else{
                            leadingAki=-1;
                        };
                    }else{
                        glyphForm=NONE;
                        leadingAki=-1;
                    };
                    firstBrackets=leadingAki;
                }else if((firstBrackets!=99999)&(RegFind(contents,"[、。」』］）】〉〕｝]"))){
                    glyphForm=NONE;
                    trailingAki=firstBrackets;
                }else if(RegFind(contents,"[、。」』］）】〉〕｝]")){
                    if(glyphForm==NONE){
                        if(trailingAki==-1){
                            trailingAki=0;
                            if(pointX==placeGet(tag.characters[ci],flag)){
                                trailingAki=0.5;
                            };
                        }else{
                            trailingAki=-1;
                        };
                    }else{
                        glyphForm=NONE;
                        trailingAki=-1;
                    };
                    firstBrackets=trailingAki;
                }else if((firstMB!=99999)&(RegFind(contents,"[・：；]"))){
                    glyphForm=NONE;
                    leadingAki=firstMB;
                    trailingAki=firstMB;
                }else if(RegFind(contents,"[・：；]")){
                    if(glyphForm==NONE){
                        if((trailingAki==-1)&(leadingAki==-1)){
                            trailingAki=0;
                            leadingAki=0;
                            if(pointX==placeGet(tag.characters[ci],flag)){
                                trailingAki=0.25;
                                leadingAki=0.25;
                             };
                        }else{
                            trailingAki=-1;
                            leadingAki=-1;
                        };
                    }else{
                        glyphForm=NONE;
                        trailingAki=-1;
                        leadingAki=-1;
                    };
                    firstMB=trailingAki;
                }else if((firstHifun[0])&(RegFind(contents,"[　―－／]"))){
                    glyphForm=firstHifun[1];
                }else if(RegFind(contents,"[　―－／]")){
                    if(glyphForm==NONE){
                        glyphForm=HALF;
                    }else{
                        glyphForm=NONE;
                    };
                    firstHifun[0]=true;
                    firstHifun[1]=glyphForm
                }else if(RegFind(contents,"[([｢｣)\\]\\/:;]")){
                        if(contents=="("){contents="（";};
                        if(contents=="["){contents="［";};
                        if(contents=="｢"){contents="「";};
                        if(contents=="｣"){contents="」";};
                        if(contents==")"){contents="）";};
                        if(contents=="]"){contents="］";};
                        if(contents=="/"){contents="／";};
                        if(contents==":"){contents="：";};
                        if(contents==";"){contents="；";};
                };
            };
        };
    }catch(e){}
};
//文字位置の取得
function placeGet(tag,flag){
    if(flag){
        return(tag.endHorizontalOffset);
    }else{
        return(tag.endBaseline);
    };
};
//テキスト選択可否
function textSel(sel){
	if((sel=="[object Text]")|(sel=="[object TextStyleRange]")|(sel=="[object Word]")|(sel=="[object Paragraph]")|(sel=="[object Character]")|(sel=="[object Line]")|(sel=="[object TextColumn]")){
		return true;
	}else{
		return false;
	};
};
//文字種変更置換
function TransliterateChenge(ff,cc,taget){
    app.findTransliteratePreferences=NothingEnum.nothing;
    app.changeTransliteratePreferences=NothingEnum.nothing;
    app.findTransliteratePreferences.findCharacterType=ff;
    app.changeTransliteratePreferences.changeCharacterType=cc;
    taget.changeTransliterate();
};
//正規表現検索
function RegFind(str,match){
    try{
        if(str.search(new RegExp(match,"g"))!=-1){
            return true;
        }else{
            return false;
        };
    }catch(e){
        return false;
    };
};
