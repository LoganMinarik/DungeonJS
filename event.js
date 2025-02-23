console.log('event.js loaded');
//Event System is loaded

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
    if (enemy.name === 'Mimic' && Math.random() < .5) { // 50% chance to drop a rare item
      player.inventory.push("PP Up");
      displayMessage("You obtained PP Up!");
    }
    if (enemy.name === 'Mimic' && Math.random() < 0.5) { // 50% chance to drop a mythical item
      for (let i = 0; i < 500; i++) {
        player.inventory.push("Doge Coin");
      }
      displayMessage("You obtained 500 Doge Coins!");
    }
    if (enemy.name === 'Treasure Guardian' && Math.random() < .5) { // 50% chance to drop a legendary item
      player.inventory.push("Elixir");
      displayMessage("You obtained Elixir!");
    }
    if (enemy.name === 'Dragon' && Math.random() < .5) { // 50% chance to drop a mythical item
      player.inventory.push("bomb-ba");
      displayMessage("You obtained Bomb-ba!");
    }
    if (enemy.name === 'Werewolf' && Math.random() < .5) { // 50% chance to drop a mythical item
      player.inventory.push("Potion+");
      displayMessage("You obtained Potion+!");
    }
    if (enemy.name === 'DeathClaw' && Math.random() < .9) { // 90% chance to drop DeathClaw Milk
      player.inventory.push("DeathClaw Milk");
      displayMessage("You some how obtained DeathClaw Milk!");
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
  let xpNeeded = Math.pow(player.level + 1, 3) * 50; // Exponential XP requirement
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
    displayMessage(`You perform a power attack and dealt ${damage.toFixed(2)} damage!`);
  } else {
    displayMessage("Not enough stamina to perform a power attack!");
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
  } else if (event.key === "7") {
    aButton();
  } else if (event.key === "8") {
    bButton();
  } else if (event.key === "9") {
    xButton();
  } else if (event.key === "0") {
    yButton();
  }
});