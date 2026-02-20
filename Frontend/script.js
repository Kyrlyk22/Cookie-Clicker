let clicks = 0;
let clickPower = 1;
let totalClicks = 0;
let autoClicksPerSecond = 0;
let abilityActive = false;
let abilityMultiplier = 1;
let purchasedUpgradeIds = [];
let purchasedAutoUpgradeIds = [];
let bakeryLevel = 1;
let levelMultiplier = 1;

const displayClick = document.getElementById("clicks");
const clickPowerDisplay = document.getElementById("click-power");
const totalClicksDisplay = document.getElementById("total-clicks");
const autoClicksDisplay = document.getElementById("auto-clicks");
const bakeryLevelDisplay = document.getElementById("bakery-level");
const multiplierDisplay = document.getElementById("global-multiplier");
const clickBtn = document.getElementById("cookie");
const upgradesContainer = document.getElementById("upgrades-container");
const abilitiesContainer = document.getElementById("abilities-container");
const byImprovements = document.getElementById("byeImprovements");
const Improvements = document.getElementById("Improvements");

const upgrades = [
  { id: 1, power: 2, cost: 15, text: "Деревянная ложка +2" },
  { id: 2, power: 3, cost: 35, text: "Печная лопатка +3" },
  { id: 3, power: 5, cost: 100, text: "Пакет шоколада +5" },
  { id: 4, power: 10, cost: 220, text: "Миксер +10" },
  { id: 5, power: 20, cost: 500, text: "Секретный рецепт +20" },
  { id: 6, power: 35, cost: 1000, text: "Фабрика теста +35" },
  { id: 7, power: 55, cost: 1800, text: "Карамельный бустер +55" },
  { id: 8, power: 90, cost: 3200, text: "Кондитерский дрон +90" },
  { id: 9, power: 140, cost: 5500, text: "Лазерная печь +140" },
  { id: 10, power: 220, cost: 9000, text: "Галактическая мука +220" },
  { id: 11, power: 350, cost: 14000, text: "Квантовые орехи +350" },
  { id: 12, power: 550, cost: 22000, text: "Ядро пекарни +550" },
];

const autoUpgrades = [
  { id: 1, power: 1, cost: 150, text: "Стажёр-пекарь +1/с" },
  { id: 2, power: 2, cost: 500, text: "Малая линия +2/с" },
  { id: 3, power: 5, cost: 1600, text: "Бригада +5/с" },
  { id: 4, power: 10, cost: 3600, text: "Печь-автомат +10/с" },
  { id: 5, power: 20, cost: 7000, text: "Роборука +20/с" },
  { id: 6, power: 40, cost: 14000, text: "Ночной цех +40/с" },
  { id: 7, power: 70, cost: 24000, text: "Орбитальная линия +70/с" },
  { id: 8, power: 120, cost: 40000, text: "Нейро-фабрика +120/с" },
];

const abilities = [
  { id: 1, cost: 5000, text: "Сиропный шторм x2 (12с)", duration: 12000, multiplier: 2 },
  { id: 2, cost: 12000, text: "Золотая партия x4 (8с)", duration: 8000, multiplier: 4 },
  { id: 3, cost: 30000, text: "Лихорадка выпечки x7 (5с)", duration: 5000, multiplier: 7 },
  { id: 4, cost: 65000, text: "Супернова печенья x12 (3с)", duration: 3000, multiplier: 12 },
];

function getEffectiveClickPower() {
  return Math.max(1, Math.floor(clickPower * abilityMultiplier * levelMultiplier));
}

function calculateBakeryLevel() {
  bakeryLevel = Math.floor(totalClicks / 500) + 1;
  levelMultiplier = Number((1 + (bakeryLevel - 1) * 0.05).toFixed(2));
}

function updateDisplay() {
  displayClick.textContent = clicks;
  clickPowerDisplay.textContent = getEffectiveClickPower();
  totalClicksDisplay.textContent = totalClicks;
  autoClicksDisplay.textContent = autoClicksPerSecond;
  bakeryLevelDisplay.textContent = bakeryLevel;
  multiplierDisplay.textContent = `x${levelMultiplier}`;
}

function saveGame() {
  const save = {
    clicks,
    clickPower,
    totalClicks,
    autoClicksPerSecond,
    purchasedUpgradeIds,
    purchasedAutoUpgradeIds,
    Improvements: Improvements.innerHTML,
  };
  localStorage.setItem("cookieClickerSave", JSON.stringify(save));
}

function lockPurchasedButtons() {
  purchasedUpgradeIds.forEach((id) => {
    const button = document.getElementById(`upgrade${id}`);
    if (button) {
      button.disabled = true;
      button.classList.add("purchased");
    }
  });

  purchasedAutoUpgradeIds.forEach((id) => {
    const button = document.getElementById(`auto${id}`);
    if (button) {
      button.disabled = true;
      button.classList.add("purchased");
    }
  });
}

function parseSave() {
  const rawSave = localStorage.getItem("cookieClickerSave");
  if (!rawSave) {
    return null;
  }

  try {
    return JSON.parse(rawSave);
  } catch (error) {
    localStorage.removeItem("cookieClickerSave");
    return null;
  }
}

function loadGame() {
  const save = parseSave();

  if (save) {
    clicks = save.clicks || 0;
    clickPower = save.clickPower || 1;
    totalClicks = save.totalClicks || 0;
    autoClicksPerSecond = save.autoClicksPerSecond || 0;
    purchasedUpgradeIds = Array.isArray(save.purchasedUpgradeIds) ? save.purchasedUpgradeIds : [];
    purchasedAutoUpgradeIds = Array.isArray(save.purchasedAutoUpgradeIds) ? save.purchasedAutoUpgradeIds : [];
    Improvements.innerHTML = save.Improvements || "";
    byImprovements.style.display = Improvements.innerHTML ? "block" : "none";
    lockPurchasedButtons();
  }

  calculateBakeryLevel();
  updateDisplay();
}

function addPurchasedItem(text) {
  Improvements.innerHTML += `<div>${text}</div>`;
  byImprovements.style.display = "block";
}

function createUpgradeButton(upgrade, type) {
  const button = document.createElement("button");
  button.className = `upgrade ${type === "auto" ? "auto-upgrade" : ""} animate__animated animate__pulse`;
  button.id = `${type}${upgrade.id}`;
  button.innerHTML = `${upgrade.text}<br><span>(${upgrade.cost} кликов)</span>`;

  button.addEventListener("click", () => {
    if (clicks < upgrade.cost) {
      return;
    }

    clicks -= upgrade.cost;
    if (type === "upgrade") {
      clickPower += upgrade.power;
      purchasedUpgradeIds.push(upgrade.id);
    } else {
      autoClicksPerSecond += upgrade.power;
      purchasedAutoUpgradeIds.push(upgrade.id);
    }

    button.disabled = true;
    button.classList.add("purchased");
    addPurchasedItem(upgrade.text);
    calculateBakeryLevel();
    updateDisplay();
    saveGame();
  });

  upgradesContainer.appendChild(button);
}

upgrades.forEach((upgrade) => createUpgradeButton(upgrade, "upgrade"));
autoUpgrades.forEach((auto) => createUpgradeButton(auto, "auto"));

abilities.forEach((ability) => {
  const button = document.createElement("button");
  button.className = "ability animate__animated animate__pulse";
  button.id = `ability${ability.id}`;
  button.innerHTML = `${ability.text}<br><span>(${ability.cost} кликов)</span>`;

  button.addEventListener("click", () => {
    if (clicks < ability.cost || abilityActive) {
      return;
    }

    clicks -= ability.cost;
    abilityActive = true;
    abilityMultiplier = ability.multiplier;
    button.disabled = true;
    button.classList.add("active-ability");

    updateDisplay();
    saveGame();

    setTimeout(() => {
      abilityMultiplier = 1;
      abilityActive = false;
      button.disabled = false;
      button.classList.remove("active-ability");
      updateDisplay();
      saveGame();
    }, ability.duration);
  });

  abilitiesContainer.appendChild(button);
});

clickBtn.addEventListener("click", () => {
  clicks += getEffectiveClickPower();
  totalClicks += 1;

  calculateBakeryLevel();
  updateDisplay();
  saveGame();

  clickBtn.classList.add("cookie-click", "animate__pulse");
  setTimeout(() => clickBtn.classList.remove("cookie-click", "animate__pulse"), 200);
});

setInterval(() => {
  const autoValue = Math.max(0, Math.floor(autoClicksPerSecond * levelMultiplier));
  clicks += autoValue;
  calculateBakeryLevel();
  updateDisplay();
  saveGame();
}, 1000);

setInterval(() => {
  upgrades.forEach((upgrade) => {
    const button = document.getElementById(`upgrade${upgrade.id}`);
    if (button) {
      button.disabled = clicks < upgrade.cost || button.classList.contains("purchased");
    }
  });

  autoUpgrades.forEach((auto) => {
    const button = document.getElementById(`auto${auto.id}`);
    if (button) {
      button.disabled = clicks < auto.cost || button.classList.contains("purchased");
    }
  });

  abilities.forEach((ability) => {
    const button = document.getElementById(`ability${ability.id}`);
    if (button) {
      button.disabled = clicks < ability.cost || abilityActive;
    }
  });
}, 100);

loadGame();
