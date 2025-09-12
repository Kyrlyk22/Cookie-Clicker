let clicks = 0;
let clickPower = 1;
let totalClicks = 0;
let autoClicksPerSecond = 0;
let abilityActive = false;

const displayClick = document.getElementById("clicks");
const clickPowerDisplay = document.getElementById("click-power");
const totalClicksDisplay = document.getElementById("total-clicks");
const autoClicksDisplay = document.getElementById("auto-clicks");
const clickBtn = document.getElementById("cookie");
const upgradesContainer = document.getElementById("upgrades-container");
const abilitiesContainer = document.getElementById("abilities-container");
const byImprovements = document.getElementById("byeImprovements");
const Improvements = document.getElementById("Improvements");
const cookieCrumbs = document.querySelector(".cookie-crumbs");
const floatingCookies = document.querySelector(".floating-cookies");

function loadGame() {
  const save = JSON.parse(localStorage.getItem("cookieClickerSave"));
  if (save) {
    clicks = save.clicks || 0;
    clickPower = save.clickPower || 1;
    totalClicks = save.totalClicks || 0;
    autoClicksPerSecond = save.autoClicksPerSecond || 0;
    Improvements.innerHTML = save.Improvements || "";
    byImprovements.style.display = Improvements.innerHTML ? "block" : "none";
  }
  updateDisplay();
}

function saveGame() {
  const save = {
    clicks,
    clickPower,
    totalClicks,
    autoClicksPerSecond,
    Improvements: Improvements.innerHTML,
  };
  localStorage.setItem("cookieClickerSave", JSON.stringify(save));
}

function updateDisplay() {
  displayClick.textContent = clicks;
  clickPowerDisplay.textContent = clickPower;
  totalClicksDisplay.textContent = totalClicks;
  autoClicksDisplay.textContent = autoClicksPerSecond;
}

const upgrades = [
  { id: 1, power: 2, cost: 15, text: "+2 за клик" },
  { id: 2, power: 3, cost: 30, text: "+3 за клик" },
  { id: 3, power: 5, cost: 100, text: "+5 за клик" },
  { id: 4, power: 10, cost: 200, text: "+10 за клик" },
  { id: 5, power: 20, cost: 350, text: "+20 за клик" },
  { id: 6, power: 30, cost: 600, text: "+30 за клик" },
  { id: 7, power: 50, cost: 1000, text: "+50 за клик" },
  { id: 8, power: 100, cost: 2000, text: "+100 за клик" },
  { id: 9, power: 200, cost: 5000, text: "+200 за клик" },
  { id: 10, power: 500, cost: 10000, text: "+500 за клик" },
];

// Автокликеры
const autoUpgrades = [
  { id: 1, power: 1, cost: 150, text: "+1 автоклик/с" },
  { id: 2, power: 2, cost: 500, text: "+2 автоклик/с" },
  { id: 3, power: 5, cost: 2000, text: "+5 автоклик/с" },
  { id: 4, power: 10, cost: 4000, text: "+10 автоклик/с" },
];

// Способности
const abilities = [
  { id: 1, cost: 5000, text: "x2 клики (10с)", duration: 10000, multiplier: 2 },
  { id: 2, cost: 10000, text: "x5 клики (5с)", duration: 5000, multiplier: 5 },
];


upgrades.forEach((upgrade) => {
  const button = document.createElement("button");
  button.className = "upgrade animate__animated animate__pulse";
  button.id = `upgrade${upgrade.id}`;
  button.innerHTML = `${upgrade.text}<br><span>(${upgrade.cost} кликов)</span>`;
  button.addEventListener("click", () => {
    if (clicks >= upgrade.cost) {
      clicks -= upgrade.cost;
      clickPower += upgrade.power;
      updateDisplay();
      button.disabled = true;
      button.classList.add("purchased");
      Improvements.innerHTML += `<div>${upgrade.text}</div>`;
      byImprovements.style.display = "block";
      saveGame();
    }
  });
  upgradesContainer.appendChild(button);
});

autoUpgrades.forEach((auto) => {
  const button = document.createElement("button");
  button.className = "upgrade auto-upgrade animate__animated animate__pulse";
  button.id = `auto${auto.id}`;
  button.innerHTML = `${auto.text}<br><span>(${auto.cost} кликов)</span>`;
  button.addEventListener("click", () => {
    if (clicks >= auto.cost) {
      clicks -= auto.cost;
      autoClicksPerSecond += auto.power;
      updateDisplay();
      button.disabled = true;
      button.classList.add("purchased");
      Improvements.innerHTML += `<div>${auto.text}</div>`;
      byImprovements.style.display = "block";
      saveGame();
    }
  });
  upgradesContainer.appendChild(button);
});

abilities.forEach((ability) => {
  const button = document.createElement("button");
  button.className = "ability animate__animated animate__pulse";
  button.id = `ability${ability.id}`;
  button.innerHTML = `${ability.text}<br><span>(${ability.cost} кликов)</span>`;
  button.addEventListener("click", () => {
    if (clicks >= ability.cost && !abilityActive) {
      clicks -= ability.cost;
      abilityActive = true;
      const originalPower = clickPower;
      clickPower *= ability.multiplier;
      updateDisplay();
      button.disabled = true;
      button.classList.add("active-ability");
      saveGame();
      setTimeout(() => {
        clickPower = originalPower;
        updateDisplay();
        abilityActive = false;
        button.disabled = false;
        button.classList.remove("active-ability");
      }, ability.duration);
    }
  });
  abilitiesContainer.appendChild(button);
});

clickBtn.addEventListener("click", (e) => {
  clicks += clickPower;
  totalClicks++;
  updateDisplay();
  saveGame();
  clickBtn.classList.add("cookie-click", "animate__pulse");
  setTimeout(() => clickBtn.classList.remove("cookie-click", "animate__pulse"), 200);
});

setInterval(() => {
  clicks += autoClicksPerSecond;
  updateDisplay();
  saveGame();
}, 1000);


setInterval(() => {
  upgrades.forEach((upgrade) => {
    const button = document.getElementById(`upgrade${upgrade.id}`);
    if (button) button.disabled = clicks < upgrade.cost || button.classList.contains("purchased");
  });
  autoUpgrades.forEach((auto) => {
    const button = document.getElementById(`auto${auto.id}`);
    if (button) button.disabled = clicks < auto.cost || button.classList.contains("purchased");
  });
  abilities.forEach((ability) => {
    const button = document.getElementById(`ability${ability.id}`);
    if (button) button.disabled = clicks < ability.cost || abilityActive;
  });
}, 100);


loadGame();