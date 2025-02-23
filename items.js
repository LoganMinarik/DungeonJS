console.log('items.js loaded');
//Item System is loaded

const rarityColors = {
  "Common": "white",
  "Uncommon": "green",
  "Rare": "blue",
  "Epic": "purple",
  "Legendary": "orange",
  "Mythical": "yellow",
  "Viod": "#00c3e3" // Hatsune Miku teal
};

const itemRarities = {
  "Potion": "Common",
  "DeathClaw Milk": "Void"
};

function updateInventory() {
  const inventoryDiv = document.getElementById("inventory");
  inventoryDiv.innerHTML = '';

  const itemCounts = player.inventory.reduce((counts, item) => {
    counts[item] = (counts[item] || 0) + 1;
    return counts;
  }, {});

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
      displayMessage(`You used ${selectedItem} and leveled up by 5 levels! You probably shouldn't have done that.`);
      player.inventory.splice(player.inventory.indexOf(selectedItem), 1);
      player.selectedItem = undefined;
      updateStats();
    }
    else if (selectedItem === "Potion+") {
      player.health = Math.min(player.health + 100, player.maxHealth);
      displayMessage(`You used a ${selectedItem} and restored 100 health!`);
      player.inventory.splice(player.inventory.indexOf(selectedItem), 1);
      player.selectedItem = undefined;
      updateStats();
    }
    else if (selectedItem === "Ether") {
      player.magic = Math.min(player.magic + 50, player.maxMagic);
      displayMessage(`You used a ${selectedItem} and restored 50 magic!`);
      player.inventory.splice(player.inventory.indexOf(selectedItem), 1);
      player.selectedItem = undefined;
      updateStats();
    }
    else if (selectedItem === "PP Up") {
      player.maxMagic += 10;
      displayMessage(`You used a ${selectedItem} and increased your max magic by 10! You feel more powerful and ready to take on the world!`);
      player.inventory.splice(player.inventory.indexOf(selectedItem), 1);
      player.selectedItem = undefined;
      updateStats();
    }
    else if (selectedItem === "Bomb-ba") {
      enemy.health -= 500;
      displayMessage(`You used a ${selectedItem} and dealt 500 damage to the enemy!`);
      player.inventory.splice(player.inventory.indexOf(selectedItem), 1);
      player.selectedItem = undefined;
      updateStats();
    }
    else if (selectedItem === "Elixir") {
      player.health = player.maxHealth;
      player.magic = player.maxMagic;
      player.stamina = player.maxStamina;
      displayMessage(`You used a ${selectedItem} and restored all health, magic, and stamina!`);
      player.inventory.splice(player.inventory.indexOf(selectedItem), 1);
      player.selectedItem = undefined;
      updateStats();
    }
    else if (selectedItem === "Nyan Cat") {
      player.health = Math.min(player.health + 100, player.maxHealth);
      player.magic = Math.min(player.magic + 100, player.maxMagic);
      displayMessage(`You used a ${selectedItem} and restored 100 health and magic!`);
      player.inventory.splice(player.inventory.indexOf(selectedItem), 1);
      player.selectedItem = undefined;
      updateStats();
    }
    else if (selectedItem === "Doge Coin") {
      displayMessage(`You used a ${selectedItem} and realized it's not a usable item!🤓👆"well achuly it's a valuable item but you have low IQ and don't understand how decentualized markets work" - Some Random Nerd 2025`);
      player.inventory.splice(player.inventory.indexOf(selectedItem), 1);
      player.selectedItem = undefined;
      updateStats();
    }
  } else {
    displayMessage("No item selected.");
  }
}