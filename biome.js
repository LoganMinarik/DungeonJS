console.log('biome.js loaded');
//Biome System is loaded

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
