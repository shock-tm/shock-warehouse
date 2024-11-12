const {entrypoints} = require("uxp");
const APID=require("uxp").host.name;
entrypoints.setup({
    panels: {
        vanilla: {
            show(node) {
            }
        }
    }
});
document.getElementById("layerIcon").addEventListener("click",async function(){
    let allLayerNames;
    if(APID=="InDesign"){
        const allLayers = require("indesign").app.activeDocument.layers;
        let al=[];
        for(let l=0;l<allLayers.length;l++){
            al.push(allLayers.item(l).name);
        }
        allLayerNames = al.map(layer => layer);
    }else{
        const allLayers = require("photoshop").app.activeDocument.layers;
        allLayerNames = allLayers.map(layer => layer.name);
    };
    const sortedNames = allLayerNames.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    document.getElementById("layers").innerHTML = `
      <ul>${
        sortedNames.map(name => `<li>${name}</li>`).join("")
      }</ul>`;
});
document.theme.onUpdated.addListener(async(theme)=>{
    console.log(theme);
});