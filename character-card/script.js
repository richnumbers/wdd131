// Character data
const character = {
  name: "Shiva",
  class: "Icon",
  level: 5,
  health: 100,
  image: "https://lds-img.finalfantasyxiv.com/promo/h/7/GrVme8_LKkl_L_ixcnJZRR0nK0.png",
  attacked() {
    if (this.health >= 20) {
      this.health -= 20;
    } else {
      alert("Character Died");
    }
  },
  levelUp() {
    this.level += 1;
    this.health += 20;
  }
};

// DOM Elements
const nameEl = document.querySelector(".name");
const classEl = document.getElementById("class");
const levelEl = document.getElementById("level");
const healthEl = document.getElementById("health");
const imageEl = document.querySelector(".image");
const attackBtn = document.getElementById("attacked");
const levelUpBtn = document.getElementById("levelup");

// Update display
function updateCharacterDisplay() {
  nameEl.textContent = character.name;
  classEl.textContent = character.class;
  levelEl.textContent = character.level;
  healthEl.textContent = character.health;
  imageEl.src = character.image;
  imageEl.alt = character.name;
}

// Button event listeners
attackBtn.addEventListener("click", () => {
  character.attacked();
  updateCharacterDisplay();
});

levelUpBtn.addEventListener("click", () => {
  character.levelUp();
  updateCharacterDisplay();
});

// Initial load
updateCharacterDisplay();
