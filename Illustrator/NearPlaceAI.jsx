/*
NearPlaceAI-v101.jsx
(c)2021 Shock tm
アクティブドキュメントがある階層で配置ダイアログが開くscript
Shiftで連続選択できます。
Ctrlで読み込みオプションを表示

画像選択時は選択画像のパスが開きます

v1.0.0 公開
v1.0.1 自作読み込みオプション対応
*/
var ve=app.version;
try{
    if(ve.split(".").length>1){
        ve=eval(ve.split(".")[0]);
    }else{
        ve=eval(ve);
    };
}catch(e){
    ve=17;
};
if(ve>16){
    var iniFile=decodeURI(Folder.temp+"/rePlace.log");
    var reSize="1";
    if(new File(iniFile).exists){
        ReadNumb();
    }else{
        WriteNumb();
    };
    NearPlaceAI(false);
}else{
    NearPlaceAI(true);
};
//メーンルーチン
function NearPlaceAI(CS){
    try{
        if(app.documents.length!=0){
            var firstPlace=true;
            var doc=app.activeDocument;
            var actObj=doc.fullName;
            var fileObj=actObj;
            var fileName=doc.name;
            var kaku="*.ai;*.ait;*.eps;*.pdf;*.bmp;*.rle;*.dib;*.cgm;*.emf;*.epsf;*.ps;*.gif;*.jpg;*.jpe;*.jpeg;*.jpf;*.jpx;*.jp2;*.j2k;*.j2c;*.jpc;*.pic;*.pict;*.psd;*.pdd;*.png;*.pns;*.tif;*.tiff";
            var obj=undefined;
            var msg="配置（Shift押しながらで連続配置・Ctrl押しながらで読み込みオプション表示）";
            if(CS){msg="配置（Shift押しながらで連続配置）"};
            if(app.selection.length==1){
                obj=app.selection[0];
                switch(obj.constructor.name){
                    case"PlacedItem":
                        fileObj=new File(obj.file);
                        firstPlace=false;
                        msg="配置（Ctrl押しながらで読み込みオプション表示）";
                        if(CS){msg=""};
                        break;
                    default:
                        break;
                };
            };
            var TF=false;
            do{
                var result=fileObj.openDlg(msg,kaku);
                var ctrl=ScriptUI.environment.keyboardState.ctrlKey;
                var shift=ScriptUI.environment.keyboardState.shiftKey;
                if(result){
                    if(CS){ctrl=false;};
                    if(decodeURI(result)!=decodeURI(actObj)){
                        var placeItem=new File(decodeURI(result));
                        if((ctrl)&(firstPlace)){
                            if(placeOptionDialog(decodeURI(placeItem.name),false)==false){
                                return;
                            };
                        }else if((ctrl)&(firstPlace==false)){
                            placeChange(obj,result);
                        };
                        if(obj==undefined){
                            obj=activeDocument.placedItems.add();
                        };
                        obj.file=placeItem;
                        if(shift){
                            fileObj=(new File(result)).parent;
                            obj=undefined;
                            TF=false;
                        }else{
                            TF=true;
                        };
                    }else{
                        alert(fileName+" を "+fileName+" に配置できません。","Adobe Illustrator");
                    };
                }else{
                    TF=true;
                };
            }while(TF!=true);
        };
    }catch(e){
    };
};
//画像を配置オプションを表示し入れ替える
function placeChange(placeObj,filePath){
    var fileObj=new File(filePath);
    var cn=placeObj.parent.constructor.name;
    if(cn=="Layer"){
        var settings=placeOptionDialog(decodeURI(fileObj.name),true);
        if(settings){
            var newObj=placeObj.layer.placedItems.add();
            newObj.file=fileObj;
            imgSetCopy(newObj,placeObj);
            do{
                newObj.zOrder(ZOrderMethod.SENDBACKWARD);
            }while(newObj.zOrderPosition>placeObj.zOrderPosition);
            placeObj.remove();
        };
    }else if(cn=="GroupItem"){
        var gi=placeObj.parent;
        if(gi.clipped){
            try{
                gi.clipped=false;
                gi.clipped=true;
            }catch(e){
                alert(e);
                return;
            };
        };
        var settings=placeOptionDialog(decodeURI(fileObj.name),true);
        if(settings){
            if((gi.placedItems.length==1)&(gi.clipped)){
                var newGi=gi.duplicate();
                var oldObj=newGi.placedItems[0];
                newGi.clipped=false;
                var newObj=newGi.placedItems.add();
                newObj.file=fileObj;
                imgSetCopy(newObj,oldObj);
                oldObj.remove();
                newObj.zOrder(ZOrderMethod.SENDBACKWARD);
                newGi.clipped=true;
                gi.remove();
            }else{
                var newObj=gi.placedItems.add();
                newObj.file=fileObj;
                imgSetCopy(newObj,placeObj);
                do{
                    newObj.zOrder(ZOrderMethod.SENDBACKWARD);
                }while(newObj.zOrderPosition>placeObj.zOrderPosition);
                placeObj.remove();
            };
        };
    };
};
//画像プロパティのコピー
function imgSetCopy(newObj,oldObj){
    var NW=newObj.width;
    var NH=newObj.height;
    var OW=oldObj.width;
    var OH=oldObj.height;
    newObj.top=oldObj.top;
    newObj.left=oldObj.left;
    newObj.height=oldObj.height;
    newObj.width=oldObj.width;
    newObj.opacity=oldObj.opacity;
    var scaleX100=NW/newObj.width*100;
    var scaleY100=NH/newObj.height*100;
    var scaleX=newObj.width/NW*100;
    var scaleY=newObj.height/NH*100;
    try{
        newObj.wrapInside=oldObj.wrapInside;
        newObj.wrapOffset=oldObj.wrapOffset;
        newObj.wrapped=oldObj.wrapped;
    }catch(e){};
    switch(reSize){
        case"2":
            newObj.resize(scaleX100,scaleY100);
            break;
        case"3":
            newObj.resize(scaleX100,scaleY100);
            newObj.resize(scaleY,scaleY);
            break;
        case"4":
            newObj.resize(scaleX100,scaleY100);
            newObj.resize(scaleX,scaleX);
            break;
        default:
            break;
    };
};
//画像配置オプションを変更
function placeOptionDialog(fileName,reFlag){
    var ws=[0,0,0+410,0+210];
    var placeOptionWindow=new Window("dialog",fileName,ws);
    var flag=false;
    with(placeOptionWindow){;center();
        add("statictext",       [ 10, 10, 10+ 70, 10 +20],"トリミング：",{multiline:false});
        var box=add("edittext", [ 90, 10, 90+ 50, 10 +20],"1",{multiline:false});
        var hj=add("statictext",[220, 10,220+ 50, 10+ 16],"保持：",{multiline:false});hj.enabled=reFlag;
        var siz=add("edittext", [270, 10,270+ 50, 10 +20],reSize, {multiline:false});siz.enabled=reFlag;
        add("statictext",       [220,130,220+ 70,130+ 20],"配置ページ：",{multiline:false});
        var numb=add("edittext",[300,130,300+ 50,130+ 20],app.preferences.PDFFileOptions.pageToOpen,{multiline:false});
        var ok=add("button",    [300,170,300+ 80,170+ 25],"OK",{name: "ok"});
        var grpObj1=placeOptionWindow.add("group",[10,35,10+260,35+140]);
        var o1=grpObj1.add("radiobutton",[5,  5,5+200,  5+20],"1：バウンディングボックス");
        var o2=grpObj1.add("radiobutton",[5, 25,5+200, 25+20],"2：アート");
        var o3=grpObj1.add("radiobutton",[5, 45,5+200, 45+20],"3：トリミング");
        var o4=grpObj1.add("radiobutton",[5, 65,5+200, 65+20],"4：仕上がり");
        var o5=grpObj1.add("radiobutton",[5, 85,5+200, 85+20],"5：裁ち落とし");
        var o6=grpObj1.add("radiobutton",[5,105,5+200,105+20],"6：メディア");
        var grpObj2=placeOptionWindow.add("group",[215,35,215+260,35+140]);grpObj2.enabled=reFlag;
        var s1=grpObj2.add("radiobutton",[5,  5,5+200,  5+20],"1：配置済みサイズを保持");
        var s2=grpObj2.add("radiobutton",[5, 25,5+200, 25+20],"2：１００％を保持");
        var s3=grpObj2.add("radiobutton",[5, 45,5+200, 45+20],"3：縦優先で縦横比を保持");
        var s4=grpObj2.add("radiobutton",[5, 65,5+200, 65+20],"4：横優先で縦横比を保持");
        switch(app.preferences.PDFFileOptions.pDFCropToBox){
            case PDFBoxType.PDFBOUNDINGBOX:case"1":
                box.text="1";o1.value=true;break;
            case PDFBoxType.PDFARTBOX:case"2":
                box.text="2";o2.value=true;break;
            case PDFBoxType.PDFCROPBOX:case"3":
                box.text="3";o3.value=true;break;
            case PDFBoxType.PDFTRIMBOX:case"4":
                box.text="4";o4.value=true;break;
            case PDFBoxType.PDFBLEEDBOX:case"5":
                box.text="5";o5.value=true;break;
            case PDFBoxType.PDFMEDIABOX:case"6":
                box.text="6";o6.value=true;break;
            default:
                box.text="1";o1.value=true;break;
        };
        switch(reSize){
            case"1":
                s1.value=true;break;
            case"2":
                s2.value=true;break;
            case"3":
                s3.value=true;break;
            case"4":
                s4.value=true;break;
            default:
                s1.value=true;break;
        };
        ok.onClick=function(){
            placeOptionWindow.close();
            flag=true;
        };
        box.onChanging=function(){
            switch(box.text){
                case PDFBoxType.PDFBOUNDINGBOX:case"1":
                    o1.value=true;break;
                case PDFBoxType.PDFARTBOX:case"2":
                    o2.value=true;break;
                case PDFBoxType.PDFCROPBOX:case"3":
                    o3.value=true;break;
                case PDFBoxType.PDFTRIMBOX:case"4":
                    o4.value=true;break;
                case PDFBoxType.PDFBLEEDBOX:case"5":
                    o5.value=true;break;
                case PDFBoxType.PDFMEDIABOX:case"6":
                    o6.value=true;break;
                default:
                    o1.value=true;break;
            };
        };
        o1.onClick=function(){box.text="1"};
        o2.onClick=function(){box.text="2"};
        o3.onClick=function(){box.text="3"};
        o4.onClick=function(){box.text="4"};
        o5.onClick=function(){box.text="5"};
        o6.onClick=function(){box.text="6"};
        siz.onChanging=function(){
            switch(siz.text){
                case"1":
                    s1.value=true;break;
                case"2":
                    s2.value=true;break;
                case"3":
                    s3.value=true;break;
                case"4":
                    s4.value=true;break;
                default:
                    s1.value=true;break;
            };
        };
        s1.onClick=function(){siz.text="1"};
        s2.onClick=function(){siz.text="2"};
        s3.onClick=function(){siz.text="3"};
        s4.onClick=function(){siz.text="4"};
    };
    box.active=true;
    placeOptionWindow.show();
    if(flag){
        placeSet(box.text,numb.text);
        if(reSize!=siz.text){
            reSize=siz.text
            WriteNumb();
        };
        return true;
    };
    return false;
};
function placeSet(box,numb){
    switch(box){
        case"bound":case"1":
            app.preferences.PDFFileOptions.pDFCropToBox=PDFBoxType.PDFBOUNDINGBOX;
            break;
        case"art":case"2":
            app.preferences.PDFFileOptions.pDFCropToBox=PDFBoxType.PDFARTBOX;
            break;
        case"crop":case"3":
            app.preferences.PDFFileOptions.pDFCropToBox=PDFBoxType.PDFCROPBOX;
            break;
        case"trim":case"4":
            app.preferences.PDFFileOptions.pDFCropToBox=PDFBoxType.PDFTRIMBOX;
            break;
        case"bleed":case"5":
            app.preferences.PDFFileOptions.pDFCropToBox=PDFBoxType.PDFBLEEDBOX;
            break;
        case"media":case"6":
            app.preferences.PDFFileOptions.pDFCropToBox=PDFBoxType.PDFMEDIABOX;
            break;
        default:
            break;
    };
    app.preferences.PDFFileOptions.pageToOpen=eval(numb);
};
function placeSetRetNumb(iSend){
    var pdfType=PDFBoxType.PDFBOUNDINGBOX;
    switch(iSend){
        case PDFBoxType.PDFBOUNDINGBOX:case"1":
            numb=1;
            pdfType=PDFBoxType.PDFBOUNDINGBOX;
            break;
        case PDFBoxType.PDFARTBOX:case"2":
            numb=2;
            pdfType=PDFBoxType.PDFARTBOX;
            break;
        case PDFBoxType.PDFCROPBOX:case"3":
            numb=3;
            pdfType=PDFBoxType.PDFCROPBOX;
            break;
        case PDFBoxType.PDFTRIMBOX:case"4":
            numb=4;
            pdfType=PDFBoxType.PDFTRIMBOX;
            break;
        case PDFBoxType.PDFBLEEDBOX:case"5":
            numb=5;
            pdfType=PDFBoxType.PDFBLEEDBOX;
            break;
        case PDFBoxType.PDFMEDIABOX:case"6":
            numb=6;
            pdfType=PDFBoxType.PDFMEDIABOX;
            break;
        default:
            break;
    };
    return [numb,pdfType];
};
function WriteNumb(){
    var fileObj=new File(iniFile);
    var flag = fileObj.open("W");
    if(!flag){
        return(false);
    };
    fileObj.encoding="UTF8";
    fileObj.write(reSize);
    fileObj.close();
    return(true);
};
function ReadNumb(){
	var lineAll="";
	var fileObj=new File(iniFile);
	var flag=fileObj.open("r");
	if(flag){
		lineAll=fileObj.read();
	}else{
        reSize="1";
    };
	fileObj.close();
	reSize=lineAll;
};
