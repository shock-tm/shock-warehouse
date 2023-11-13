/*
docUpdate.jsx
(c)2022 Shock tm
フォルダ内のインデザインドキュメントを起動しているバージョンで新規保存する
*/
var xml='<IDSN>\n'+
xml+='<version CCCS="CS4" major="6">6 (CS4)</version>\n';
xml+='<version CCCS="CS5" major="7">7 (CS5)</version>\n';
xml+='<version CCCS="CS5.5" major="7.5">7.5 (CS5.5)</version>\n';
xml+='<version CCCS="CS6" major="8">8 (CS6)</version>\n';
xml+='<version CCCS="CC" major="9">9 (CC)</version>\n';
xml+='<version CCCS="CC2014" major="10">10 (CC2014)</version>\n';
xml+='<version CCCS="CC2015" major="11">11 (CC2015)</version>\n';
xml+='<version CCCS="CC2017" major="12">12 (CC2017)</version>\n';
xml+='<version CCCS="CC2018" major="13">13 (CC2018)</version>\n';
xml+='<version CCCS="CC2019" major="14">14 (CC2019)</version>\n';
xml+='<version CCCS="CC2020" major="15">15 (CC2020)</version>\n';
xml+='<version CCCS="CC2021" major="16">16 (CC2021)</version>\n';
xml+='<version CCCS="CC2022" major="17">17 (CC2022)</version>\n';
xml+='<version CCCS="CC2023" major="18">18 (CC2023)</version>\n';
xml+='<version CCCS="CC2024" major="19">19 (CC2024)</version>\n';
xml+='</IDSN>';
documentsUpdate(xml,"");
//フォルダ内のインデザインドキュメントを起動しているバージョンで新規保存する
function documentsUpdate(xml,path){
    try{
        var xd=new XML(xml);
        var version=eval(verGet(app.version),xd);
        var documentsFolder;
        if(path==""){
            documentsFolder=Folder.myDocuments.selectDlg("インデザインファイルが格納されたフォルダを選択してください。 ）");
        }else{
            documentsFolder=new Folder(path);
        };
        var docList=new Array();
        docList=docGet(docList,documentsFolder);
        if(docList.length>0){
            var filesName="";
            for(var l=0;l<docList.length;l++){
                filesName+=decodeURI(docList[l].name)+"\n";
            };
            var yetInt=0;
            var yetfilesName="";
            var nonfilesName="";
            if(confirm(docList.length+"ファイルをバージョン「"+version+"」で新規保存しますか?\n\n"+filesName)){
                for(var l=0;l<docList.length;l++){
                    var myDoc;
                    try{
                        myDoc=app.open(docList[l]);
                    }catch(e){
                        nonfilesName+="・"+decodeURI(docList[l].name)+" - "+e.toString()+"\n";
                        continue;
                    };
                    var docVersion=eval(verGet(myDoc.metadataPreferences.creator,xd));
                    var CC="ver"+docVersion+"_"+xd.version.(@major==docVersion).@CCCS.toString();
                    if(docVersion<version){
                        var oldFile=new File(docList[l]);
                        var newName=(decodeURI(oldFile)).replace(/.indd/g," - "+CC+".indd");
                        var flag=oldFile.rename(newName);
                        if(flag){
                            myDoc.close(SaveOptions.YES,docList[l]);
                            yetfilesName+="- "+decodeURI(docList[l].name)+" <- "+CC+"\n";
                            yetInt+=1;
                        }else{
                            myDoc.close(SaveOptionsNO);
                            nonfilesName+="- "+decodeURI(docList[l].name)+" <- "+CC+m4+"\n";
                        };
                    }else{
                        myDoc.close(SaveOptions.NO);
                        nonfilesName+="- "+decodeURI(docList[l].name)+" <- "+CC+"\n";
                    };
                };
            };
            alert(yetInt+"ファイルをバージョン「"+"ver"+version+"_"+xd.version.(@major==version).@CCCS.toString()+"」で新規保存しました。\n\n処理ファイル：\n"+yetfilesName+"\n\n非処理ファイル：\n"+nonfilesName);
        };
        return xd;
    }catch(e){
        alert("Error!");
    };
};
//指定したフォルダ内のinddファイルを取得、フォルダは回帰処理
function docGet(docList,documentsFolder){
    var docFiles=GetFile(documentsFolder,"*.indd");
    for(var d=0;d<docFiles.length;d++){
        var obj=new File(decodeURI(docFiles[d]));
        docList.push(obj);
    };
    var folderFiles=GetFile(documentsFolder,"*");
    for(var f=0;f<folderFiles.length;f++){
        if(folderFiles[f].constructor.name=="Folder"){
            docList=docGet(docList,folderFiles[f]);
        };
    };
    return docList;
};
//指定したフォルダパスのファイルを取得
function GetFile(path,reg){
	var folderObj=new Folder(path);
	var fileList=folderObj.getFiles(reg);
	folderObj.close;
	return fileList;
};
//文字列からバージョンを取得する関数
function verGet(v,xd){
    if(v.indexOf("CS")!=-1){//CSバージョン表記
        v=v.split("CS")[1];
        if(v[1]=="."){
            v="CS"+v[0]+v[1]+v[2];
        }else{
            v="CS"+v[0];
        };
        v=xd.version.(@CCCS==v).@major.toString();
    }else if(v.indexOf("CC")!=-1){//CCバージョン表記
        v=v.split("CC ")[1];
        if(v.indexOf(".")!=-1){//やっぱりメジャーバージョン表記
            v=v.split(".")[0];
        }else{
            v="CC"+v[0]+v[1]+v[2]+v[3];
        };
        v=xd.version.(@major==v).@major.toString();
    }else{//メジャーバージョン表記
        v=v.replace(/Adobe ?InDesign ?/g,"");
        if(v.split(".")[0]+v.split(".")[1]=="75"){
            v="7.5";
        }else{
            v=v.split(".")[0];
        };
    };
    return v;
};
