/*
textFramefitPlus.jsx
(c)2016 Shock tm
複数行でもビタッとフレームをテキスト内容に合わせてくれるscript
線とマージンと拡大・縮小に対応！
*/
Main()
function Main(){
    app.doScript("toMain()",ScriptLanguage.JAVASCRIPT,[],UndoModes.fastEntireScript);//一つの処理として実行
}
//メーンルーチン
function toMain(){
    try{
        if(app.documents.length!=0){
            var obj=app.selection
            if(obj.length>0){
                try{
                    var mototani=TaniChage([MeasurementUnits.POINTS,MeasurementUnits.POINTS,MeasurementUnits.POINTS,MeasurementUnits.POINTS,MeasurementUnits.POINTS])//単位を全てポイントにする
                    for(var i=0;i<obj.length;i++){
                        if(obj[i]=="[object TextFrame]"){
                            if(obj[i].parentStory.storyPreferences.frameType==FrameTypes.TEXT_FRAME_TYPE){
                                var flag=false
                                with(obj[i]){
                                    if(parentStory.storyPreferences.storyOrientation==HorizontalOrVertical.HORIZONTAL){flag=true}
                                    var hs=horizontalScale
                                    horizontalScale=100
                                    var vs=verticalScale
                                    verticalScale=100
                                    var ARA=absoluteRotationAngle
                                    absoluteRotationAngle=0
                                    var ASA=absoluteShearAngle
                                    absoluteShearAngle=0
                                    var margin=textFramePreferences.insetSpacing//[top, left, bottom, right]
                                    var st=strokeWeight
                                }
                                LastDel(obj[i])
                                var line=obj[i].lines
                                if((line.length==1)&(obj[i].previousTextFrame==null)&(obj[i].nextTextFrame==null)){
                                    obj[i].fit(FitOptions.FRAME_TO_CONTENT)
                                }else{
                                    var max=0
                                    for(var l=0;l<line.length;l++){
                                        var temp=0
                                        var jus=line[l].justification
                                        line[l].justification=Justification.LEFT_ALIGN
                                        switch(line[l].characters[line[l].characters.length-1].contents){
                                            case"\r":case SpecialCharacters.DISCRETIONARY_LINE_BREAK:case SpecialCharacters.COLUMN_BREAK:
                                            case SpecialCharacters.EVEN_PAGE_BREAK:case SpecialCharacters.FORCED_LINE_BREAK:
                                            case SpecialCharacters.FORCED_LINE_BREAK:case SpecialCharacters.FRAME_BREAK:
                                            case SpecialCharacters.ODD_PAGE_BREAK:case SpecialCharacters.PAGE_BREAK:
                                            case SpecialCharacters.PARAGRAPH_SYMBOL:
                                                line[l].insertionPoints[line[l].characters.length-1].select()
                                                temp=iti(app.selection[0],flag)
                                                break;
                                            default:
                                                if(flag){
                                                    line[l].characters[line[l].characters.length-1].select()
                                                    temp=iti(app.selection[0],flag)
                                                    temp=temp-margin[1]
                                                }else{
                                                    if(l==line.length-1){
                                                        line[l].characters[line[l].characters.length-1].select()
                                                        temp=iti(app.selection[0],flag)
                                                        temp=temp-margin[2]-st
                                                    }else{
                                                        line[l].insertionPoints[0].select()
                                                        var a=temp=iti(app.selection[0],flag)
                                                        line[l].characters[line[l].characters.length-1].select()
                                                        var b=iti(app.selection[0],flag)
                                                        temp=obj[i].visibleBounds[0]+b-a
                                                    }
                                                }
                                                break;
                                        }　
                                        if(max<temp){
                                            max=temp
                                        }
                                        line[l].justification=jus
                                    }
                                    if(max!=0){
                                        if(flag){
                                            obj[i].visibleBounds=[obj[i].visibleBounds[0],obj[i].visibleBounds[1],obj[i].visibleBounds[2],max+margin[1]+margin[3]+st]
                                        }else{
                                            obj[i].visibleBounds=[obj[i].visibleBounds[0],obj[i].visibleBounds[1],max+margin[0]+margin[2]+st+st,obj[i].visibleBounds[3]]
                                        }
                                    }
                                }
                                obj[i].absoluteRotationAngle=ARA
                                obj[i].absoluteShearAngle=ASA
                                obj[i].horizontalScale=hs
                                obj[i].verticalScale=vs
                                obj[i].fit(FitOptions.FRAME_TO_CONTENT)
                            }
                        }
                    }
                    app.toolBoxTools.currentTool=UITools.SELECTION_TOOL
                    for(var a=0;a<obj.length;a++){
                        obj[a].select(SelectionOptions.ADD_TO)
                    }
                    TaniChage(mototani)//単位を全て戻す
                }catch(e){
                    alert(e.toString(),"script Error")
                    TaniChage(mototani)//単位を全て戻す
                }
            }
        }
    }catch(e){
        alert(e.toString(),"script Error")
    }
}
//文字位置の取得
function iti(taget,flag){
    try{
        if(flag){
            return(taget.endHorizontalOffset)//横組み
        }else{
            var a=taget
            return(taget.endBaseline)//縦組み
        }
    }catch(e){
        return 0
    }
}
//最後の改行の削除
function LastDel(taget){
    try{
        if(taget.overflows){
        }else{
            if((taget.previousTextFrame==null)&(taget.nextTextFrame==null)){
                if(taget.characters[taget.characters.length-1].contents=="\r"){
                    taget.characters[taget.characters.length-1].remove()
                }//最後の改行を削除する
            }
        }
    }catch(e){
    }
}
//単位の変更と戻し
function TaniChage(vp){
	var doc=app.activeDocument;
	var bk_lin=doc.viewPreferences.strokeMeasurementUnits;   
	var bk_typo=doc.viewPreferences.typographicMeasurementUnits;   
	var bk_txt=doc.viewPreferences.textSizeMeasurementUnits;   
	var bk_hori=doc.viewPreferences.horizontalMeasurementUnits;   
	var bk_vert=doc.viewPreferences.verticalMeasurementUnits;     
	with(doc.viewPreferences){
		strokeMeasurementUnits=vp[0]
		typographicMeasurementUnits=vp[1]
		textSizeMeasurementUnits=vp[2]
		horizontalMeasurementUnits=vp[3]
		verticalMeasurementUnits=vp[4]
	} 
	return([bk_lin,bk_typo,bk_txt,bk_hori,bk_vert])
}
