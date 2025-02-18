let player = {
  name: '',
  health: 100,
  maxHealth: 100,
  magic: 100,
  maxMagic: 100,
  stamina: 50,
  maxStamina: 50,
  level: 0,
  xp: 0,
  inventory: Array(20).fill("Potion")
};
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
function startGame() {
  player.name = document.getElementById("player-name").value;
  if (!player.name) {
    displayMessage("Please enter a name.");
    return;
  }
  document.getElementById("start-game").style.display = 'none';
  document.getElementById("game").style.display = 'block';
  generateEnemy();
  updateStats();
  displayMessage(`Welcome, ${player.name}! Get ready to fight!`);
}
function generateEnemy() {
  const biomeEnemies = {
    'Moss Forest': ['Goblin', 'Orc', 'Werewolf'],
    'Runes': ['Skeleton', 'Imp', 'DeathClaw'],
    'Cave': ['Troll', 'Dragon'],
    'Chest Room': ['Mimic', 'Treasure Guardian']
  };
  const randomType = biomeEnemies[currentBiome][Math.floor(Math.random() * biomeEnemies[currentBiome].length)];
  enemy.name = randomType;
  enemy.level = Math.min(player.level + 1, Math.floor(Math.random() * player.level) + 1);
  switch (randomType) {
    case 'Goblin':
      enemy.health = (30 + Math.floor(Math.random() * 20)) * enemy.level;
      enemy.attack = Math.min((5 + Math.floor(Math.random() * 5)) * enemy.level, player.health / 2);
      enemy.xpReward = 10 * enemy.level;
      break;
    case 'Imp':
      enemy.health = (20 + Math.floor(Math.random() * 10)) * enemy.level;
      enemy.attack = Math.min((5 + Math.floor(Math.random() * 5)) * enemy.level, player.health / 2);
      enemy.xpReward = 8 * enemy.level;
      break;
    case 'Orc':
      enemy.health = (60 + Math.floor(Math.random() * 30)) * enemy.level;
      enemy.attack = Math.min((10 + Math.floor(Math.random() * 10)) * enemy.level, player.health / 2);
      enemy.xpReward = 20 * enemy.level;
      break;
    case 'Dragon':
      enemy.health = (120 + Math.floor(Math.random() * 80)) * enemy.level;
      enemy.attack = Math.min((20 + Math.floor(Math.random() * 20)) * enemy.level, player.health / 2);
      enemy.xpReward = 50 * enemy.level;
      break;
    case 'Troll':
      enemy.health = (90 + Math.floor(Math.random() * 40)) * enemy.level;
      enemy.attack = Math.min((15 + Math.floor(Math.random() * 10)) * enemy.level, player.health / 2);
      enemy.xpReward = 30 * enemy.level;
      break;
    case 'Skeleton':
      enemy.health = (40 + Math.floor(Math.random() * 20)) * enemy.level;
      enemy.attack = Math.min((10 + Math.floor(Math.random() * 10)) * enemy.level, player.health / 2);
      enemy.xpReward = 15 * enemy.level;
      break;
    case 'DeathClaw':
      enemy.health = (150 + Math.floor(Math.random() * 100)) * enemy.level;
      enemy.attack = Math.min((30 + Math.floor(Math.random() * 30)) * enemy.level, player.health / 2);
      enemy.xpReward = 70 * enemy.level;
      break;
    case 'Werewolf':
      enemy.health = (110 + Math.floor(Math.random() * 40)) * enemy.level;
      enemy.attack = Math.min((20 + Math.floor(Math.random() * 10)) * enemy.level, player.health / 2);
      enemy.xpReward = 40 * enemy.level;
      break;
    case 'Mimic':
      enemy.health = (80 + Math.floor(Math.random() * 40)) * enemy.level;
      enemy.attack = Math.min((15 + Math.floor(Math.random() * 10)) * enemy.level, player.health / 2);
      enemy.xpReward = 25 * enemy.level;
      break;
    case 'Treasure Guardian':
      enemy.health = (100 + Math.floor(Math.random() * 50)) * enemy.level;
      enemy.attack = Math.min((20 + Math.floor(Math.random() * 15)) * enemy.level, player.health / 2);
      enemy.xpReward = 35 * enemy.level;
      break;
  }
  displayMessage(`A wild ${enemy.name} (Level ${enemy.level}) appears!`);
}
function updateStats() {
  document.getElementById("player-stats").innerHTML = `
    <strong>${player.name}'s Stats:</strong><br>
    Health: ${player.health}/${player.maxHealth} | Magic: ${player.magic}/${player.maxMagic} | Stamina: ${player.stamina}/${player.maxStamina} | Revive Crystals: ${player.reviveCrystals} | Level: ${player.level} | XP: ${player.xp}
  `;
  document.getElementById("enemy-stats").innerHTML = `
    <strong>${enemy.name} Stats:</strong><br>
    Health: ${enemy.health} | Attack: ${enemy.attack} | Level: ${enemy.level}
  `;
  document.getElementById("biome").innerHTML = `
    <strong>Current Biome:</strong> ${currentBiome}
  `;
  updateInventory();
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
    "DeathClaw Milk": "Void"
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

function useItem() {
  if (player.selectedItem !== undefined) {
    const selectedItem = player.selectedItem;
    if (selectedItem === "Potion") {
      player.health = Math.min(player.health + 50, player.maxHealth);
      displayMessage(`You used a ${selectedItem} and restored 50 health!`);
      player.inventory.splice(player.inventory.indexOf(selectedItem), 1);
      player.selectedItem = undefined;
      updateStats();
    } else if (selectedItem === "DeathClaw Milk") {
      player.level += 5;
      player.maxHealth = 100 + player.level * 10;
      player.maxMagic = 100 + player.level * 10;
      player.health = player.maxHealth;
      player.magic = player.maxMagic;
      displayMessage(`You used ${selectedItem} and leveled up by 5 levels!`);
      player.inventory.splice(player.inventory.indexOf(selectedItem), 1);
      player.selectedItem = undefined;
      updateStats();
    }
  } else {
    displayMessage("No item selected.");
  }
}
function fireball() {
  if (player.magic >= 5) {
    player.magic -= 5;
    const damage = 15 * Math.pow(1.5, player.level);
    enemy.health -= damage;
    updateStats();
    checkCombatStatus();
    displayMessage(`You cast Fireball and dealt ${damage.toFixed(2)} damage!`);
  } else {
    displayMessage("Not enough magic!");
  }
}
function heal() {
  if (player.magic >= 5) {
    player.magic -= 5;
    const healing = 15 * Math.pow(1.5, player.level);
    player.health += healing;
    if (player.health > 100 + player.level * 10) player.health = 100 + player.level * 10;
    updateStats();
    displayMessage(`You cast Heal and restored ${healing.toFixed(2)} health!`);
  } else {
    displayMessage("Not enough magic!");
  }
}
function swordAttack() {
  const damage = 10 * Math.pow(1.5, player.level);
  enemy.health -= damage;
  updateStats();
  checkCombatStatus();
  displayMessage(`You attack with your sword and dealt ${damage.toFixed(2)} damage!`);
}
let blockDuration = 0;
function block() {
  if (player.stamina >= 10) {
    player.stamina -= 10;
    blockDuration = 3;
    displayMessage("You block the next incoming attacks for 3 turns!");
  } else {
    displayMessage("Not enough stamina to block!");
  }
}
function UseReviveCrystal() {
  if (player.reviveCrystals > 0) {
    player.reviveCrystals -= 1;
    player.health = 100 + player.level * 10;
    player.magic = 100 + player.level * 10;
    updateStats();
    displayMessage("You used a Revive Crystal!");
  } else {
    displayMessage("You have no revive crystals left!");
  }
}
function checkCombatStatus() {
  if (enemy.health <= 0) {
    player.xp += Math.floor(enemy.xpReward * (1 + Math.random()));
    levelUpCheck();
    if (Math.random() < enemy.dropChance) {
      player.reviveCrystals += 1;
      displayMessage("You found a Revive Crystal!");
    }
    if (enemy.name === 'DeathClaw' && Math.random() < 1) { // 50% chance to drop DeathClaw Milk
      player.inventory.push("DeathClaw Milk");
      displayMessage("You found DeathClaw Milk!");
    }
    if (Math.random() < 0.1) { // 10% chance to change biome
      currentBiome = biomes[Math.floor(Math.random() * biomes.length)];
      displayMessage(`You have entered a new biome: ${currentBiome}`);
    }
    generateEnemy();
    updateStats();
    return;
  }
  if (blockDuration > 0) {
    blockDuration--;
    displayEnemyAction(`${enemy.name} attacks but you block the damage!`);
  } else {
    if (Math.random() < 0.5) {
      if (player.health > 0) {
        player.health -= enemy.attack;
        displayMessage(`${enemy.name} attacks you for ${enemy.attack} damage!`);
        displayEnemyAction(`${enemy.name} attacks you for ${enemy.attack} damage!`);
        updateStats();
      } else {
        displayEnemyAction(`${enemy.name} does nothing.`);
      }
    }
  }
  if (enemy.name === 'DeathClaw' && Math.random() < 0.2) { // 20% chance for DeathClaw to regenerate
    enemy.health += enemy.health * 0.05;
    displayEnemyAction(`${enemy.name} regenerates 5% of its health!`);
    updateStats();
  }
  if (player.health <= 0) {
    if (player.reviveCrystals > 0) {
      displayMessage("You have died! Using a revive crystal...");
      UseReviveCrystal();
    } else {
      document.getElementById("game-result").innerHTML = `<h2>Game Over! Your final score: ${player.xp} XP.</h2>`;
    }
  }
}
function levelUpCheck() {
  let xpNeeded = player.level * 50 + 100;
  if (player.xp >= xpNeeded) {
    player.level++;
    player.maxHealth = 100 + player.level * 10; // Increase max health with each level
    player.maxMagic = 100 + player.level * 10; // Increase max magic with each level
    player.maxStamina = 50 + player.level * 10; // Increase max stamina with each level
    player.health = player.maxHealth; // Restore health to max
    player.magic = player.maxMagic; // Restore magic to max
    player.stamina = player.maxStamina; // Restore stamina to max
    displayMessage(`Level up! You are now level ${player.level}.`);
  }
}
function criticalHit() {
  if (player.stamina >= 5) {
    player.stamina -= 5;
    const damage = 20 * Math.pow(1.5, player.level); // 2x the base damage
    enemy.health -= damage;
    updateStats();
    checkCombatStatus();
    displayMessage(`You perform a critical hit and dealt ${damage.toFixed(2)} damage!`);
  } else {
    displayMessage("Not enough stamina to perform a critical hit!");
  }
}
document.addEventListener("keydown", function(event) {
  if (event.key === "1") {
    fireball();
  } else if (event.key === "2") {
    heal();
  } else if (event.key === "3") {
    swordAttack();
  } else if (event.key === "4") {
    block();
  } else if (event.key === "5") {
    UseReviveCrystal();
  } else if (event.key === "6") {
    criticalHit();
  }
});