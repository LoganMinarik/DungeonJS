console.log('player.js loaded');
//Player System is loaded

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
  reviveCrystals: 5,
  inventory: Array(20).fill("Potion").concat(["DeathClaw Milk", "DeathClaw Milk", "DeathClaw Milk"]),
};

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