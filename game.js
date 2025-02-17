let player = {
    name: '',
    health: 100,
    magic: 100,
    reviveCrystals: 5,
    level: 0,
    xp: 0
  };
  
  let enemy = {
    name: '',
    health: 50,
    attack: 10,
    xpReward: 0,
    dropChance: 0.5
  };
  
  function startGame() {
    player.name = document.getElementById("player-name").value;
    if (!player.name) {
      alert("Please enter a name.");
      return;
    }
  
    document.getElementById("start-game").style.display = 'none';
    document.getElementById("game").style.display = 'block';
    
    generateEnemy();
    updateStats();
  }
  
  function generateEnemy() {
    const enemyTypes = ['Goblin', 'Orc', 'Dragon', 'Troll', 'Skeleton', 'DeathClaw', 'Imp', 'Werewolf'];
    const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
  
    enemy.name = randomType;
    switch (randomType) {
        case 'Goblin':
        enemy.health = 30 + Math.floor(Math.random() * 20);
        enemy.attack = 5 + Math.floor(Math.random() * 5);
        enemy.xpReward = 10;
        break;
        case 'Imp':
        enemy.health = 20 + Math.floor(Math.random() * 10);
        enemy.attack = 5 + Math.floor(Math.random() * 5);
        enemy.xpReward = 8;
        break;
        case 'Orc':
        enemy.health = 60 + Math.floor(Math.random() * 30);
        enemy.attack = 10 + Math.floor(Math.random() * 10);
        enemy.xpReward = 20;
        break;
        case 'Dragon':
        enemy.health = 120 + Math.floor(Math.random() * 80);
        enemy.attack = 20 + Math.floor(Math.random() * 20);
        enemy.xpReward = 50;
        break;
        case 'Troll':
        enemy.health = 90 + Math.floor(Math.random() * 40);
        enemy.attack = 15 + Math.floor(Math.random() * 10);
        enemy.xpReward = 30;
        break;
        case 'Skeleton':
        enemy.health = 40 + Math.floor(Math.random() * 20);
        enemy.attack = 10 + Math.floor(Math.random() * 10);
        enemy.xpReward = 15;
        break;
        case 'DeathClaw':
        enemy.health = 150 + Math.floor(Math.random() * 100);
        enemy.attack = 30 + Math.floor(Math.random() * 30);
        enemy.xpReward = 70;
        break;
        case 'Werewolf':
        enemy.health = 110 + Math.floor(Math.random() * 40);
        enemy.attack = 20 + Math.floor(Math.random() * 10);
        enemy.xpReward = 40;
        break;
    }
  }
  
  function updateStats() {
    document.getElementById("player-stats").innerHTML = `
      <strong>${player.name}'s Stats:</strong><br>
      Health: ${player.health} | Magic: ${player.magic} | Revive Crystals: ${player.reviveCrystals} | Level: ${player.level} | XP: ${player.xp}
    `;
    document.getElementById("enemy-stats").innerHTML = `
      <strong>${enemy.name} Stats:</strong><br>
      Health: ${enemy.health} | Attack: ${enemy.attack}
    `;
  }
  
  function fireball() {
    if (player.magic >= 5) {
      player.magic -= 5;
      enemy.health -= 15;
      updateStats();
      checkCombatStatus();
    } else {
      alert("Not enough magic!");
    }
  }
  
  function heal() {
    if (player.magic >= 5) {
      player.magic -= 5;
      player.health += 15;
      if (player.health > 100) player.health = 100;
      updateStats();
    } else {
      alert("Not enough magic!");
    }
  }
  
  function swordAttack() {
    enemy.health -= 10;
    updateStats();
    checkCombatStatus();
  }
  
  function block() {
    alert("You block the next incoming attack!");
  }
   
  function UseReviveCrystal() {
    if (player.reviveCrystals > 0) {
      player.reviveCrystals -= 1;
      player.health = 100;
      player.magic = 100;
      updateStats();
    } else {
      alert("You have no revive crystals left!");
    }
  }
  /// is this code very cash money :3?
  function checkCombatStatus() {
    if (enemy.health <= 0) {
      player.xp += enemy.xpReward * (1 + Math.random());
      levelUpCheck();
      if (Math.random() < enemy.dropChance) {
        player.reviveCrystals += 1;
        alert("You found a Revive Crystal!");
      }
      generateEnemy();
      updateStats();
      return;
    }
  
    if (Math.random() < 0.5) {
      if (player.health > 0) {
        player.health -= enemy.attack;
        alert(`${enemy.name} attacks you for ${enemy.attack} damage!`);
        updateStats();
      }
    }
  
    if (player.health <= 0) {
      if (player.reviveCrystals > 0) {
        alert("You have died! Using a revive crystal...");
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
      player.health = 100;
      player.magic = 100;
      alert(`Level up! You are now level ${player.level}.`);
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
    }
    });