/*
keyAlign.jsx
(c)2026 Shock tm
キーオブジェクトをキャッシュできる整列スクリプト
仮想グループ機能（together）で複数オブジェクトもそのまま整列

v1.0.0 公開
*/
#targetengine "main";
var alignFun={};
(function (){
    var bt=new BridgeTalk;
    bt.target=BridgeTalk.appSpecifier;
    var winObj = new Window("palette","keyAlign - 整列",[0,0,240,255]);
    winObj.opacity=0.95;
    winObj.center();
    var lt_rb=winObj.add("button",[ 20, 20, 20+ 30, 20+ 30],"⇘");
    var lt_lb=winObj.add("button",[ 50, 20, 50+ 30, 20+ 30],"⇙");
    var ct_cb=winObj.add("button",[ 85, 20, 85+ 30, 20+ 30],"⇓");
    var rt_rb=winObj.add("button",[120, 20,120+ 30, 20+ 30],"⇘");
    var rt_lb=winObj.add("button",[150, 20,150+ 30, 20+ 30],"⇙");
    var lt_rt=winObj.add("button",[ 20, 50, 20+ 30, 50+ 30],"⇗");
    var lt_lt=winObj.add("button",[ 55, 55, 55+ 30, 55+ 30],"↖");
    var ct_ct=winObj.add("button",[ 85, 55, 85+ 30, 55+ 30],"↑");
    var rt_rt=winObj.add("button",[115, 55,115+ 30, 55+ 30],"↗");
    var rt_lt=winObj.add("button",[150, 50,150+ 30, 50+ 30],"⇖");
    var lc_rc=winObj.add("button",[ 20, 85, 20+ 30, 85+ 30],"⇒");
    var lc_lc=winObj.add("button",[ 55, 85, 55+ 30, 85+ 30],"←");
    var cc_cc=winObj.add("button",[ 85, 85, 85+ 30, 85+ 30],"➕");
    var rc_rc=winObj.add("button",[115, 85,115+ 30, 85+ 30],"→");
    var rc_lc=winObj.add("button",[150, 85,150+ 30, 85+ 30],"⇐");
    var lb_rb=winObj.add("button",[ 20,120, 20+ 30,120+ 30],"⇘");
    var lb_lb=winObj.add("button",[ 55,115, 55+ 30,115+ 30],"↙");
    var cb_cb=winObj.add("button",[ 85,115, 85+ 30,115+ 30],"↓");
    var rb_rb=winObj.add("button",[115,115,115+ 30,115+ 30],"↘");
    var rb_lb=winObj.add("button",[150,120,150+ 30,120+ 30],"⇙");
    var lb_rt=winObj.add("button",[ 20,150, 20+ 30,150+ 30],"⇗");
    var lb_lt=winObj.add("button",[ 50,150, 50+ 30,150+ 30],"⇖");
    var cb_ct=winObj.add("button",[ 85,150, 85+ 30,150+ 30],"⇑");
    var rb_rt=winObj.add("button",[120,150,120+ 30,150+ 30],"⇗");
    var rb_lt=winObj.add("button",[150,150,150+ 30,150+ 30],"⇖");
    var yy_mb=winObj.add("button",[190, 20,190+ 30, 20+ 30],"↡");
    var yy_ot=winObj.add("button",[190, 55,190+ 30, 55+ 30],"↥");
    var yy_oc=winObj.add("button",[190, 85,190+ 30, 85+ 30],"⿱");
    var yy_ob=winObj.add("button",[190,115,190+ 30,115+ 30],"↧");
    var yy_mt=winObj.add("button",[190,150,190+ 30,150+ 30],"↟");
    var xx_mr=winObj.add("button",[ 20,190, 20+ 30,190+ 30],"↠");
    var xx_ol=winObj.add("button",[ 55,190, 55+ 30,190+ 30],"↤");
    var xx_oc=winObj.add("button",[ 85,190, 85+ 30,190+ 30],"⿰");
    var xx_or=winObj.add("button",[115,190,115+ 30,190+ 30],"↦");
    var xx_ml=winObj.add("button",[150,190,150+ 30,190+ 30],"↞");
    var gc= winObj.add("checkbox",[  0,  0, 20+ 80,  0+ 20],"together");
    var keyButton=winObj.add("button",[190,190,190+ 30,190+ 30],"set");
    var logLabel=winObj.add("statictext",[20,220,20+200,220+30],"log");
    lt_rb.onClick=function() {bt.body="alignFun.keyMirr('right');alignFun.keyMirr('bottom');",bt.send();}
    lt_lb.onClick=function() {bt.body="alignFun.keyMove('left');alignFun.keyMirr('bottom');",bt.send();}
    ct_cb.onClick=function() {bt.body="alignFun.keyMove('xCenter');alignFun.keyMirr('bottom');",bt.send();}
    rt_rb.onClick=function() {bt.body="alignFun.keyMove('right');alignFun.keyMirr('bottom');",bt.send();}
    rt_lb.onClick=function() {bt.body="alignFun.keyMirr('left');alignFun.keyMirr('bottom');",bt.send();}
    rt_lt.onClick=function() {bt.body="alignFun.keyMirr('left');alignFun.keyMove('top');",bt.send();}
    lt_rt.onClick=function() {bt.body="alignFun.keyMirr('right');alignFun.keyMove('top');",bt.send();}
    lt_lt.onClick=function() {bt.body="alignFun.keyMove('left');alignFun.keyMove('top');",bt.send();}
    ct_ct.onClick=function() {bt.body="alignFun.keyMove('xCenter');alignFun.keyMove('top');",bt.send();}
    rt_rt.onClick=function() {bt.body="alignFun.keyMove('right');alignFun.keyMove('top');",bt.send();}
    lc_rc.onClick=function() {bt.body="alignFun.keyMirr('right');alignFun.keyMove('yCenter');",bt.send();}
    lc_lc.onClick=function() {bt.body="alignFun.keyMove('left');alignFun.keyMove('yCenter');",bt.send();}
    cc_cc.onClick=function() {bt.body="alignFun.keyMove('yCenter');alignFun.keyMove('xCenter');",bt.send();}
    rc_rc.onClick=function() {bt.body="alignFun.keyMove('right');alignFun.keyMove('yCenter');",bt.send();}
    rc_lc.onClick=function() {bt.body="alignFun.keyMirr('left');alignFun.keyMove('yCenter');",bt.send();}
    lb_rb.onClick=function() {bt.body="alignFun.keyMirr('right');alignFun.keyMove('bottom');",bt.send();}
    lb_lb.onClick=function() {bt.body="alignFun.keyMove('left');alignFun.keyMove('bottom');",bt.send();}
    cb_cb.onClick=function() {bt.body="alignFun.keyMove('xCenter');alignFun.keyMove('bottom');",bt.send();}
    rb_rb.onClick=function() {bt.body="alignFun.keyMove('right');alignFun.keyMove('bottom');",bt.send();}
    rb_lb.onClick=function() {bt.body="alignFun.keyMirr('left');alignFun.keyMove('bottom');",bt.send();}
    lb_rt.onClick=function() {bt.body="alignFun.keyMirr('right');alignFun.keyMirr('top');",bt.send();}
    lb_lt.onClick=function() {bt.body="alignFun.keyMove('left');alignFun.keyMirr('top');",bt.send();}
    cb_ct.onClick=function() {bt.body="alignFun.keyMove('xCenter');alignFun.keyMirr('top');",bt.send();}
    rb_rt.onClick=function() {bt.body="alignFun.keyMove('right');alignFun.keyMirr('top');",bt.send();}
    rb_lt.onClick=function() {bt.body="alignFun.keyMirr('left');alignFun.keyMirr('top');",bt.send();}
    rb_lt.onClick=function() {bt.body="alignFun.keyMirr('left');alignFun.keyMirr('top');",bt.send();}
    yy_mb.onClick=function() {bt.body="alignFun.keyMirr('bottom');",bt.send()}
    yy_ot.onClick=function() {bt.body="alignFun.keyMove('top');",bt.send()}
    yy_oc.onClick=function() {bt.body="alignFun.keyMove('yCenter');",bt.send()}
    yy_ob.onClick=function() {bt.body="alignFun.keyMove('bottom');",bt.send()}
    yy_mt.onClick=function() {bt.body="alignFun.keyMirr('top');",bt.send()}
    xx_mr.onClick=function() {bt.body="alignFun.keyMirr('right');",bt.send()}
    xx_ol.onClick=function() {bt.body="alignFun.keyMove('left');",bt.send()}
    xx_oc.onClick=function() {bt.body="alignFun.keyMove('xCenter');",bt.send()}
    xx_or.onClick=function() {bt.body="alignFun.keyMove('right');",bt.send()}
    xx_ml.onClick=function() {bt.body="alignFun.keyMirr('left');",bt.send()}
    keyButton.onClick=function() {bt.body="alignFun.keySet();",bt.send()}
    alignFun.keyMove=function(alignMode){logLabel.text=keyMove(alignMode,false,gc.value)}
    alignFun.keyMirr=function(alignMode){logLabel.text=keyMove(alignMode,true,gc.value)}
    alignFun.keySet=function(){logLabel.text=keySet()}
    winObj.show();
})();
//set key object
function keySet(){
    try{
        if (app.documents.length === 0) {
            return "Open document!";
        }
        var myDoc=app.activeDocument;
        var fileObj=new File(decodeURI(Folder.temp+"key.txt"));
        var b;
        if (myDoc.selection.length === 0) {
            var artboards = myDoc.artboards;
            var actInd=artboards.getActiveArtboardIndex();
            var actArt=artboards[actInd];
            b=actArt.artboardRect;
            fileObj.open("w");
            fileObj.write(b);
            fileObj.close();
            return "Set ["+actArt.name+"] to key!";
        }else{
            var objs=myDoc.selection;
            b=objs[0].visibleBounds; 
            for(var o=1;o<objs.length;o++){
                var temp=objs[o].visibleBounds; 
                if(b[0]>temp[0]){b[0]=temp[0]};
                if(b[1]<temp[1]){b[1]=temp[1]};
                if(b[2]<temp[2]){b[2]=temp[2]};
                if(b[3]>temp[3]){b[3]=temp[3]};
            }
            fileObj.open("w");
            fileObj.write(b);
            fileObj.close();
            if(objs.length==1){
                return "Key object setting complete!";
            }else{
                return "Set objects to key!";
            }
        }
    }catch(e){
        return e;
    }
}
//move object
function keyMove(alignMode,mirror,tFlag){
    try{
        if (app.documents.length === 0) {
            return "Open document!";
        }
        var myDoc=app.activeDocument;
        if (myDoc.selection.length === 0) {
            return "Select object!";
        }
        var fileObj=new File(decodeURI(Folder.temp+"key.txt")); 
        var vals;
        if (fileObj.exists) {
            fileObj.open("r");
            vals=(fileObj.readln()).split(",");
            fileObj.close();
        }else{
            return "Set key object!";
        }
        var objs=myDoc.selection;
        var t=[0,0,0,0];
        if(tFlag){
            t=objs[0].visibleBounds; 
            for(var o=1;o<objs.length;o++){
                var temp=objs[o].visibleBounds; 
                if(t[0]>temp[0]){t[0]=temp[0]};
                if(t[1]<temp[1]){t[1]=temp[1]};
                if(t[2]<temp[2]){t[2]=temp[2]};
                if(t[3]>temp[3]){t[3]=temp[3]};
            }
        }
        var cachedLeft = Number(vals[0]);
        var cachedTop  = Number(vals[1]);
        var cachedRight = Number(vals[2]);
        var cachedBottom  = Number(vals[3]);
        var cachedCenterX = (cachedLeft + cachedRight) / 2;
        var cachedCenterY = (cachedTop + cachedBottom) / 2;
        for(var o=0;o<objs.length;o++){
            var b=objs[o].visibleBounds;
            var tm=[0,0,0,0];
            if(tFlag){
                tm[0]=b[0]-t[0];
                tm[1]=b[1]-t[1];
                tm[2]=b[2]-t[2];
                tm[3]=b[3]-t[3];
            }
            switch(alignMode){
                case"left":
                    var dx = cachedLeft - b[0] + tm[0];
                    if(mirror){
                        dx = cachedRight - b[0] + tm[0];
                    }
                    objs[o].translate(dx,0);
                    break;
                case"top":
                    var dy = cachedTop - b[1] + tm[1];
                    if(mirror){
                        dy = cachedBottom - b[1] + tm[1];
                    }
                    objs[o].translate(0,dy);
                    break;
                case"right":
                    var dx = cachedRight - b[2] + tm[2];
                    if(mirror){
                        dx = cachedLeft - b[2] + tm[2];
                    }
                    objs[o].translate(dx,0);
                    break;
                case"bottom":
                    var dy = cachedBottom - b[3] + tm[3];
                    if(mirror){
                        dy = cachedTop - b[3] + tm[3];
                    }
                    objs[o].translate(0,dy);
                    break;
                case"xCenter":
                    var objCenterX = ((b[0] + b[2]) / 2) - ((tm[0] + tm[2]) / 2);
                    var dx = cachedCenterX - objCenterX;
                    objs[o].translate(dx,0);
                    break;
                case"yCenter":
                    var objCenterY = ((b[1] + b[3]) / 2) - ((tm[1] + tm[3]) / 2);
                    var dy = cachedCenterY - objCenterY;
                    objs[o].translate(0,dy);
                    break;
                default:
                    break;
            }
        }
        return "Align OK!";
    }catch(e){
        return e;
    }
}