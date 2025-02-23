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
loadScript("player.js");
loadScript("biome.js");
loadScript("items.js");
loadScript("event.js");