let monster = null;
let count = 0;


function selectCharacter(choice) {
  document.getElementById('character-select').style.display = 'none';
  document.getElementById('battle-screen').style.display = 'flex';

  const playerImg = document.getElementById('player-image');
  if (choice === 'female') {
    playerImg.src = 'Players/Female-player.png';
    playerImg.alt = 'Female Warrior';
  } else {
    playerImg.src = 'Players/Male-player.png';
    playerImg.alt = 'Male Warrior';
  }

  // ✅ Hook up the Attack button AFTER it's visible
  const buttons = document.querySelectorAll(".action-button");
  buttons.forEach((button) => {
    if (button.textContent.trim() === "Attack") {
      button.addEventListener("click", playerAttack);
    }
  });
}


let monsters = [];
let currentRound = 0;

async function loadMonsters() {
  const res = await fetch('monsters.json');
  monsters = await res.json();
  loadNextMonster();
}

function loadNextMonster() {
  if (currentRound >= monsters.length) {
    alert("You won the game!");
    return;
  }

  monster = monsters[currentRound]; // ✅ SET GLOBAL monster

  document.getElementById('enemy-image').src = monster.sprite;
  document.getElementById('enemy-image').alt = monster.name;
  document.getElementById('enemy-name').textContent = monster.name;

  monster.hp = parseInt(monster.hp, 10);          // make sure monster.hp exists
  monster.maxHp = monster.hp;       // set maxHp for bar

  updateEnemyHealth(monster.hp, monster.maxHp);
}


function endBattle() {
  currentRound++;
  loadNextMonster();
}

window.addEventListener('load', loadMonsters);


function startGame() {
  // Hide character preview
  document.querySelector('.character-preview').style.display = 'none';

  // Show battle screen
  document.getElementById('battle-screen').style.display = 'flex';
}

function updateEnemyHealth(current, max) {
  const percent = Math.max((current / max) * 100, 0);
  document.getElementById("enemy-health").style.width = percent + "%";
}

function updatePlayerHealth(current, max) {
  const percent = (current / max) * 100;
  document.getElementById("player-health").style.width = percent + "%";
  
}

let player = {};

async function loadPlayerData() {
  try {
    const response = await fetch('player.json');
    player = await response.json();

    // 🧪 Debug log
    console.log("Player loaded:", player);

    // ✅ Set currentHp if it's missing
    if (player.currentHp === undefined || player.currentHp === null) {
      player.currentHp = player.maxHp;
    }

    updatePlayerHealth(player.currentHp, player.maxHp);
  } catch (err) {
    console.error("Failed to load player.json", err);
  }
}


window.addEventListener("DOMContentLoaded", () => {
  loadPlayerData();
});

function getRandomDamage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function playerAttack() {
  const roll = getRandomDamage(player.minAttack, player.maxAttack);

  if (roll <= monster.defense) {
    console.log(`You missed! (Roll: ${roll} vs Def ${monster.defense})`);
    monsterAttack(); // 🧠 even if you miss, monster can still attack
    return;
  }

  const damage = roll - monster.defense;
  monster.hp -= damage;
  if (monster.hp < 0) monster.hp = 0;

  updateEnemyHealth(monster.hp, monster.maxHp);
  console.log(`You hit ${monster.name} for ${damage} damage!`);

  if (monster.hp <= 0) {
  console.log(`${monster.name} defeated!`);
  const roll = getRandomDamage(monster.mingold, monster.maxgold);
  player.gold += roll; // ✅ Add gold to player

  count++;
 

  if (count >= 3) {
  

    count = 0;
    loadShop();  // ✅ Shop appears after 3 fights
  } else {
    endBattle(); // ✅ Otherwise load next monster
  }

  return;
}


  // ✅ Now the monster attacks back
  monsterAttack();
}


function monsterAttack() {
  const roll = getRandomDamage(monster.attack - 2, monster.attack + 2); // small RNG range

  if (roll <= player.defense) {
    console.log(`${monster.name} missed! (Roll: ${roll} vs Def: ${player.defense})`);
    return;
  }

  const damage = roll - player.defense;
  player.currentHp -= damage;
  if (player.currentHp < 0) player.currentHp = 0;

  updatePlayerHealth(player.currentHp, player.maxHp);
  console.log(`${monster.name} hits you for ${damage} damage!`);

  if (player.currentHp <= 0) {
    console.log("💀 You have been defeated!");
    // TODO: trigger game over or restart
  }
}


async function loadShop() {


  try {
    const res = await fetch("shop.json");
    const items = await res.json();

    

    const shopContainer = document.getElementById("shop-items");
    shopContainer.innerHTML = "";

    items.forEach(item => {
    

      const div = document.createElement("div");
      div.classList.add("shop-item");

      div.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>Cost: ${item.cost}g</p>
        <button onclick='buyItem(${item.cost}, ${JSON.stringify(item.effect).replace(/"/g, "&quot;")})'>Buy</button>
      `;

      shopContainer.appendChild(div);
    });

    document.getElementById("player-gold").textContent = player.gold;
    document.getElementById("battle-screen").style.display = "none";
    document.getElementById("shop").style.display = "block";
  } catch (err) {
    alert("❌ ERROR: " + err.message);
    console.error(err);
  }
}

function buyItem(cost, effect) {
  if (player.gold < cost) {
    alert("Not enough gold!");
    return;
  }

  player.gold -= cost;

  if (effect.hpRestore) {
    player.currentHp += effect.hpRestore;
    if (player.currentHp > player.maxHp) player.currentHp = player.maxHp;
  }

  if (effect.attackBoost) {
    player.maxAttack += effect.attackBoost;
  }

  if (effect.hpBoost) {
    player.maxHp += effect.hpBoost;
    player.currentHp += effect.hpBoost;
  }

  if (effect.defenseBoost) {
    player.defense += effect.defenseBoost;
  }

  // ✅ Update gold display
 const span = document.getElementById("player-gold");
const full = document.getElementById("gold-display");

if (span) span.textContent = player.gold;
if (full) full.textContent = `Gold: ${player.gold}`;


  // ✅ (optional) Update player health bar
  updatePlayerHealth(player.currentHp, player.maxHp);
}

function exitShop() {
  document.getElementById("shop").style.display = "none";
  document.getElementById("battle-screen").style.display = "flex";
  endBattle(); // Or loadNextMonster() if that's what you're using
}







