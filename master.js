console.log("Loading master.js");
// Load additional JS files
function loadScript(url) {
    let script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript";
    document.head.appendChild(script);
}

// Load additional JS files
loadScript("game.js");
console.log("master.js sent a loadScript request for game.js");
loadScript("player.js");
console.log("master.js sent a loadScript request for player.js");
loadScript("biome.js");
console.log("master.js sent a loadScript request for biome.js");
loadScript("items.js");
console.log("master.js sent a loadScript request for items.js");
loadScript("event.js");
console.log("master.js sent a loadScript request for event.js");
// Load additional JS files