console.log('biome.js loaded');
//Biome System is loaded

function startGame() {
  player.name = document.getElementById("player-name").value;
  if (!player.name) {
    displayMessage("Please enter a name.");
    return;
  }
  document.getElementById("start-game").style.display = 'none';
  document.getElementById("race-selection").style.display = 'block';
}

function selectRace(race) {
  player.race = race;
  if (race === 'Kobold') {
    player.maxHealth = 75;
    player.health = 75;
    player.maxMagic = 125;
    player.magic = 125;
  }
  else if (race === 'Elf') {
    player.maxHealth = 100;
    player.health = 100;
    player.maxMagic = 200;
    player.magic = 200;
  }
  document.getElementById("race-selection").style.display = 'none';
  document.getElementById("game").style.display = 'block';
  generateEnemy();
  updateStats();
  displayMessage(`Welcome, ${player.name} the ${player.race}! Get ready to fight!`);
}

function generateEnemy() {
  const biomeEnemies = {
    'Moss Forest': [
      { name: 'Goblin', monsterDrops: ['Potion', 'Ether'] },
      { name: 'Orc', monsterDrops: ['Potion+', 'Bomb-ba'] },
      { name: 'Werewolf', monsterDrops: ['Potion+', 'Potion'] }
    ],
    'Runes': [
      { name: 'Skeleton', monsterDrops: ['Ether', 'Potion'] },
      { name: 'Imp', monsterDrops: ['Potion+', 'Ether'] },
      { name: 'DeathClaw', monsterDrops: ['DeathClaw Milk', 'Potion+'] }
    ],
    'Cave': [
      { name: 'Troll', monsterDrops: ['Potion+', 'Ether'] },
      { name: 'Dragon', monsterDrops: ['Bomb-ba', 'Elixir'] }
    ],
    'Chest Room': [
      { name: 'Mimic', monsterDrops: ['PP Up', 'Doge Coin'] },
      { name: 'Treasure Guardian', monsterDrops: ['Elixir', 'Ether'] }
    ],
    'GlowShroom Cavern': [
      { name: 'Glowing Slime', monsterDrops: ['Glowing Slime Gel', 'Potion'] },
      { name: 'Slime Egg Cluster', monsterDrops: ['Glowing Slime Gel', 'Potion'] },
      { name: 'Glowing Mimic Chest', monsterDrops: ['Etherium', 'Potion+', 'Glowing Slime Gel'] }
    ],
    'Lava Caverns': [
      { name: 'Lava Leach Cluster', monsterDrops: ['Magma Shard', 'Lava Leach'] },
      { name: 'Lava Elemental', monsterDrops: ['Lava Crystal', 'Lava Leach'] },
      { name: 'Lava Golem', monsterDrops: ['Lava Core', 'Lava Leach'] },
      { name: 'Lava Dragon', monsterDrops: ['Lava Essence', 'Lava Leach'] },
      { name: 'Red Succubus', monsterDrops: ['Lava Heart', 'Lava Leach', 'Lava Crystal', 'Magma Shard', 'Lava Core'] },
    ],
  };

  const randomEnemy = biomeEnemies[currentBiome][Math.floor(Math.random() * biomeEnemies[currentBiome].length)];
  enemy.name = randomEnemy.name;
  enemy.monsterDrops = randomEnemy.monsterDrops;
  enemy.level = Math.min(player.level + 1, Math.floor(Math.random() * player.level) + 1);
  enemy.health = 50 + enemy.level * 10;
  enemy.attack = 10 + enemy.level * 2;
  enemy.xpReward = 20 + enemy.level * 5;
  enemy.dropChance = 0.5; // Base drop chance
}

function determineDrop(monster) {
  const drops = [];
  monster.monsterDrops.forEach(item => {
    const rarity = itemRarities[item];
    const chance = rarityChances[rarity];
    if (Math.random() < chance) {
      drops.push(item);
    }
  });
  return drops;
}

// Example usage in checkCombatStatus function
function checkCombatStatus() {
  if (enemy.health <= 0) {
    player.xp += Math.floor(enemy.xpReward * (1 + Math.random()));
    levelUpCheck();
    const drops = determineDrop(enemy);
    drops.forEach(drop => {
      player.inventory.push(drop);
      displayMessage(`You obtained ${drop}!`);
    });
    generateEnemy();
    updateStats();
    return;
  }
}

function updateBiomeHue(biome) {
  const biomeHues = {
    'Moss Forest': '90deg', // Green hue
    'Runes': '180deg', // Blue hue
    'Cave': '270deg', // Purple hue
    'Chest Room': '45deg', // Yellow hue
    'GlowShroom Cavern': '300deg', // Pink hue
    'Lava Caverns': '0deg' // Red hue
  };

  const hue = biomeHues[biome] || '0deg';
  document.documentElement.style.setProperty('--hue-rotate', hue);
}

// Call updateBiomeHue whenever the biome changes
function changeBiome(newBiome) {
  currentBiome = newBiome;
  updateBiomeHue(newBiome);
  displayMessage(`You have entered a new biome: ${newBiome}`);
}