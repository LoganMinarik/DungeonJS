console.log("Game script loaded.");
// Game script

//import { enemy, biomes, currentBiome, generateEnemy, updateStats } from './biome.js';
//import { displayMessage, displayEnemyAction } from './event.js';
// Game script
let enemy = {
  name: '',
  health: 50,
  attack: 10,
  xpReward: 0,
  dropChance: 0.5,
  level: 1
};
let biomes = ['Moss Forest', 'Runes', 'Cave', 'Chest Room'];
let currentBiome = biomes[0];
function displayMessage(message) {
  document.getElementById("message-box").innerHTML = message;
}
function displayEnemyAction(message) {
  document.getElementById("enemy-action-box").innerHTML = message;
}

function updateInventory() {
  const inventoryDiv = document.getElementById("inventory");
  inventoryDiv.innerHTML = '';

  const itemCounts = player.inventory.reduce((counts, item) => {
    counts[item] = (counts[item] || 0) + 1;
    return counts;
  }, {});

  const rarityColors = {
    "Common": "white",
    "Uncommon": "green",
    "Rare": "blue",
    "Epic": "purple",
    "Legendary": "orange",
    "Mythical": "yellow",
    "Void": "#00c3e3" // Hatsune Miku teal
  };

  const itemRarities = {
    "Potion": "Common",
    "DeathClaw Juice": "Void",
    "Potion+": "Uncommon",
    "Ether": "Uncommon",
    "PP Up": "Rare",
    "Bomb-ba": "Rare",
    "Elixir": "Epic",
    "Nyan Cat": "Mythical",
    "Doge Coin": "Mythical",
  };

  for (const [item, count] of Object.entries(itemCounts)) {
    const itemDiv = document.createElement("div");
    const rarity = itemRarities[item] || "Common";
    itemDiv.innerHTML = `${count}x ${item}`;
    itemDiv.style.color = rarityColors[rarity];
    itemDiv.onclick = () => selectItem(item);
    inventoryDiv.appendChild(itemDiv);
  }
}

function selectItem(itemName) {
  player.selectedItem = itemName;
  displayMessage(`Selected item: ${itemName}`);
}


