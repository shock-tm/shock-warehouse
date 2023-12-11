/*
linkedText.jsx
(c)2023 Shock tm
インデザインドキュメント内の全ページに指定サイズの連結テキストフレームを作成するスクリプト
This script creates and connects specified text frames to all pages in an InDesign document.
*/
app.doScript(linkedText,ScriptLanguage.JAVASCRIPT,[],UndoModes.fastEntireScript);
// テキストフレームを作成する関数
function createTextFrame(page,x,y,width,height){
  var textFrame=page.textFrames.add();
  textFrame.geometricBounds=[y,x,y+height,x+width];
  return textFrame;
};
// ページをまたいでテキストフレームを連結する関数
function linkTextFramesAcrossPages(textFrames){
  for(var i=0;i<textFrames.length-1;i++){
    textFrames[i].nextTextFrame=textFrames[i+1];
  };
};
function linkedText(){
    try{
        var pushTextFrames=new Array();
        var myDoc=app.activeDocument;
        var pageCount=myDoc.pages.length;
        var tempInput=prompt("X,Y,W,H?\n(ex.20,30,200,20)","");
        tempInput=tempInput.replace(/ /g,"");
        var XYWH=tempInput.split(",");
        if(XYWH.length==4){
            for(var p=0;p<pageCount;p++) {
              pushTextFrames.push(createTextFrame(myDoc.pages[p],eval(XYWH[0]),eval(XYWH[1]),eval(XYWH[2]),eval(XYWH[3])));
            };
            linkTextFramesAcrossPages(pushTextFrames);
        }else{
            alert("Error: 数値入力が不正です。\nInvalid numerical value input.");
        };
    }catch(e){
        alert(e);
    };
};
