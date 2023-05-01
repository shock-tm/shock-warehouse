/*
画像配置オプション.jsx
(c)2016 Shock tm
既に配置されているイメージの配置オプションを再表示するscript

前回配置時ではなく、選択した画像の設定を反映する
ページ数やレイヤー表示などは反映されない
epsのオプションはすべて反映されない

2016-05-19 ver.0.1	
*/
//
main()
function main(){
    try{
        if(app.documents.count!=0){//１つ以上ドキュメントを開いている
            if(app.selection.length==1){
                var path
                var obj=app.selection[0]
                switch(obj.constructor.name){
                    case"Image":
                        path=IMGget(obj)
                        break;
                    case"PDF":
                        path=PDFget(obj)
                        break;
                    case"ImportedPage":
                        path=INDDget(obj)
                        break;
                    case"EPS":
                        path=obj.itemLink.filePath
                        break;
                    case"Rectangle":case"Polygon":case"Oval":
                        if(obj.images.length==1){
                            path=IMGget(obj.images[0])
                        }else if(obj.pdfs.length==1){
                            path=PDFget(obj.pdfs[0])
                        }else if(obj.importedPages.length==1){
                            path=INDDget(obj.importedPages[0])
                        }else if(obj.epss.length==1){
                            path=obj.epss[0].itemLink.filePath
                        }
                        break;
                    default:
                        break;
                }
                try{
                    app.activeDocument.place(path,true)
                }catch(e){
                    //配置オプションでキャンセルした
                }
            }else{
                alert("画像もしくは画像を含むオブジェクトを選択して下さい。","選択ミス")
            }
        }
    }catch(e){
        alert(e,"error")
    }
}
//psd,tiff,jpeg,bmpの配置オプション
function IMGget(obj){
    var option=obj.imageIOPreferences//配置オプション
    app.imageIOPreferences.allowAutoEmbedding=option.allowAutoEmbedding//If true, allows auto embedding.
    app.imageIOPreferences.alphaChannelName=option.alphaChannelName//アルファチャンネル名
    app.imageIOPreferences.applyPhotoshopClippingPath=option.applyPhotoshopClippingPath//Photoshopクリッピングパスを適用
    return obj.itemLink.filePath
}
//pdfの配置オプション
function PDFget(obj){
    var option=obj.pdfAttributes//配置オプション
    var Page=option.pageNumber//配置ページ
    app.pdfPlacePreferences.pdfCrop=option.pdfCrop//トリミングの設定
    app.pdfPlacePreferences.transparentBackground=option.transparentBackground//背景を透明に
    if(Page!=1){
        alert("現在の配置ページは「"+Page+"」です。","選択画像の配置ページ")
    }
    return obj.itemLink.filePath
}
//inddの配置オプション
function INDDget(obj){
    var Page=obj.pageNumber//配置ページ
    app.importedPageAttributes.importedPageCrop=obj.importedPageCrop//トリミングの設定
    if(Page!=1){
        alert("現在の配置ページは「"+Page+"」です。","選択画像の配置ページ")
    }
    return obj.itemLink.filePath
}