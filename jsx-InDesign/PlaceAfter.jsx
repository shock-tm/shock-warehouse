/*
PlaceAfter.jsx
(c)2016 Shock tm
画像配置後に配置ボックスの塗りをチェックする
*/
#target "InDesign"
#targetengine "session"
#targetengine "check_color"
(function(){
    app.addEventListener("afterPlace",check_place,false)//画像配置後
})();
function check_place(my_event){
    try{
    if(app.selection.length==1){
        if(app.selection[0].graphics.count()!=0){
            switch(app.selection[0].fillColor.name){
                case "None":break;
                default:
                if(confirm("配置ボックスの塗りを「なし」にしますか？")==true){
                    app.selection[0].fillColor=app.activeDocument.swatches.item("None")
                    return
                }
            }
        }
    }
    }catch(e){
    }
}