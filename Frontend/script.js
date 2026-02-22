// ── STATE ──
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
let prestigeCount = 0;
let prestigeMultiplier = 1;
let unlockedSkinIds = [1];
let activeSkinId = 1;
let unlockedAchievementIds = [];
let purchasedSkinIds = [1];

// ── DOM ──
const headerClicksDisplay = document.getElementById("header-clicks");
const headerAutoDisplay   = document.getElementById("header-auto");
const clickPowerBtnDisplay = document.getElementById("click-power-btn");
const totalClicksDisplay  = document.getElementById("total-clicks");
const clickCountStat      = document.getElementById("click-count-stat");
const autoClicksDisplay   = document.getElementById("auto-clicks");
const cookieEmoji         = document.getElementById("cookie");
const clickBtn            = document.getElementById("click-btn");
const upgradesContainer   = document.getElementById("upgrades-container");
const autoContainer       = document.getElementById("auto-container");
const abilitiesContainer  = document.getElementById("abilities-container");
const byImprovements      = document.getElementById("byeImprovements");
const Improvements        = document.getElementById("Improvements");
const shopBadge           = document.getElementById("shop-badge");
const skinsGrid           = document.getElementById("skins-grid");
const achievementsGrid    = document.getElementById("achievements-grid");
const skinsBadge          = document.getElementById("skins-badge");
const achievementsBadge   = document.getElementById("achievements-badge");
const bakeryLevelDisplay  = document.getElementById("bakery-level-display");
const bakeryNameDisplay   = document.getElementById("bakery-name-display");
const levelProgressBar    = document.getElementById("level-progress-bar");
const prestigeBtn         = document.getElementById("prestige-btn");
const prestigeOverlay     = document.getElementById("prestige-overlay");
const prestigeCancel      = document.getElementById("prestige-cancel");
const prestigeConfirm     = document.getElementById("prestige-confirm");
const currentPrestigeBonus = document.getElementById("current-prestige-bonus");
const newPrestigeBonus    = document.getElementById("new-prestige-bonus");
const floatContainer      = document.getElementById("float-container");
const prestigeDisplay     = document.getElementById("prestige-display");
const prestigeStarsDisplay = document.getElementById("prestige-stars-display");
const prestigeBonusText   = document.getElementById("prestige-bonus-text");
const headerCookieIcon    = document.getElementById("header-cookie-icon");

const TOTAL_UPGRADES = 12 + 8;

// ── DATA ──
const upgrades = [
  { id:1,  power:2,   cost:15,    text:"Деревянная ложка",    desc:"Простой инструмент пекаря",           icon:"🥄" },
  { id:2,  power:3,   cost:35,    text:"Печная лопатка",      desc:"Удобнее доставать печенье",           icon:"🍳" },
  { id:3,  power:5,   cost:100,   text:"Пакет шоколада",      desc:"Вкуснее — значит эффективнее",        icon:"🍫" },
  { id:4,  power:10,  cost:220,   text:"Миксер",              desc:"Тесто готовится вдвое быстрее",       icon:"🌀" },
  { id:5,  power:20,  cost:500,   text:"Секретный рецепт",    desc:"Передан из поколения в поколение",    icon:"📜" },
  { id:6,  power:35,  cost:1000,  text:"Фабрика теста",       desc:"Промышленные масштабы",               icon:"🏭" },
  { id:7,  power:55,  cost:1800,  text:"Карамельный бустер",  desc:"Карамель = энергия",                  icon:"🍬" },
  { id:8,  power:90,  cost:3200,  text:"Кондитерский дрон",   desc:"Летает, печёт, удивляет",             icon:"🚁" },
  { id:9,  power:140, cost:5500,  text:"Лазерная печь",       desc:"Точность до микрона",                 icon:"🔬" },
  { id:10, power:220, cost:9000,  text:"Галактическая мука",  desc:"Из созвездия Пекаря",                 icon:"🌌" },
  { id:11, power:350, cost:14000, text:"Квантовые орехи",     desc:"Существуют в нескольких состояниях",  icon:"⚛️" },
  { id:12, power:550, cost:22000, text:"Ядро пекарни",        desc:"Источник безграничной силы",          icon:"💎" },
];

const autoUpgrades = [
  { id:1, power:1,   cost:150,   text:"Стажёр-пекарь",    desc:"Старательный, но медленный", icon:"👨‍🍳" },
  { id:2, power:2,   cost:500,   text:"Малая линия",       desc:"Небольшой конвейер",         icon:"🏗️" },
  { id:3, power:5,   cost:1600,  text:"Бригада",           desc:"Команда профессионалов",     icon:"👥" },
  { id:4, power:10,  cost:3600,  text:"Печь-автомат",      desc:"Работает без остановок",     icon:"🔥" },
  { id:5, power:20,  cost:7000,  text:"Роборука",          desc:"Никогда не устаёт",          icon:"🤖" },
  { id:6, power:40,  cost:14000, text:"Ночной цех",        desc:"Производство 24/7",          icon:"🌙" },
  { id:7, power:70,  cost:24000, text:"Орбитальная линия", desc:"На орбите нет простоев",     icon:"🛸" },
  { id:8, power:120, cost:40000, text:"Нейро-фабрика",     desc:"ИИ оптимизирует выпечку",   icon:"🧠" },
];

const abilities = [
  { id:1, cost:5000,  text:"Сиропный шторм",    desc:"x2 на 12 секунд", duration:12000, multiplier:2,  icon:"🌪️" },
  { id:2, cost:12000, text:"Золотая партия",     desc:"x4 на 8 секунд",  duration:8000,  multiplier:4,  icon:"✨" },
  { id:3, cost:30000, text:"Лихорадка выпечки",  desc:"x7 на 5 секунд",  duration:5000,  multiplier:7,  icon:"🔥" },
  { id:4, cost:65000, text:"Супернова печенья",  desc:"x12 на 3 секунды",duration:3000,  multiplier:12, icon:"💥" },
];

// ── SKINS ──
const SKINS = [
  { id:1, emoji:"🍪", name:"Классик",       cost:0,      unlockAt:0 },
  { id:2, emoji:"🍩", name:"Пончик",        cost:500,    unlockAt:100 },
  { id:3, emoji:"🎂", name:"Торт",          cost:2000,   unlockAt:500 },
  { id:4, emoji:"🧁", name:"Капкейк",       cost:5000,   unlockAt:1000 },
  { id:5, emoji:"🍰", name:"Кусочек",       cost:12000,  unlockAt:3000 },
  { id:6, emoji:"🥐", name:"Круассан",      cost:25000,  unlockAt:8000 },
  { id:7, emoji:"🌟", name:"Звёздный",      cost:60000,  unlockAt:20000 },
  { id:8, emoji:"💎", name:"Кристалл",      cost:150000, unlockAt:50000 },
];

// ── BAKERY LEVELS ──
const BAKERY_LEVELS = [
  { level:1,  name:"Пекарня Новичка",    theme:"1", minClicks:0 },
  { level:2,  name:"Зелёная Пекарня",    theme:"2", minClicks:500 },
  { level:3,  name:"Магическая Пекарня", theme:"3", minClicks:2000 },
  { level:4,  name:"Огненная Пекарня",   theme:"4", minClicks:6000 },
  { level:5,  name:"Небесная Пекарня",   theme:"5", minClicks:15000 },
];

// ── ACHIEVEMENTS ──
const ACHIEVEMENTS = [
  { id:1,  icon:"🍪", title:"Первый кусочек",    desc:"Сделай 1 клик",           check: () => totalClicks >= 1 },
  { id:2,  icon:"👆", title:"Пальцы в тесте",    desc:"Сделай 50 кликов",        check: () => totalClicks >= 50 },
  { id:3,  icon:"💪", title:"Рука Мастера",       desc:"Сделай 500 кликов",       check: () => totalClicks >= 500 },
  { id:4,  icon:"🔥", title:"Одержимый",          desc:"Сделай 5000 кликов",      check: () => totalClicks >= 5000 },
  { id:5,  icon:"💰", title:"Первая тысяча",      desc:"Накопи 1000 куков",       check: () => clicks >= 1000 },
  { id:6,  icon:"💎", title:"Богач-пекарь",       desc:"Накопи 100 000 куков",    check: () => clicks >= 100000 },
  { id:7,  icon:"🛒", title:"Шопоголик",          desc:"Купи 5 улучшений",        check: () => purchasedUpgradeIds.length + purchasedAutoUpgradeIds.length >= 5 },
  { id:8,  icon:"🏪", title:"Оптовый закуп",      desc:"Купи 15 улучшений",       check: () => purchasedUpgradeIds.length + purchasedAutoUpgradeIds.length >= 15 },
  { id:9,  icon:"🤖", title:"Автоматизация",      desc:"Купи 3 автоклика",        check: () => purchasedAutoUpgradeIds.length >= 3 },
  { id:10, icon:"⭐", title:"Растёшь!",           desc:"Достигни 5 уровня",       check: () => bakeryLevel >= 5 },
  { id:11, icon:"✨", title:"Ветеран",            desc:"Сделай первый престиж",   check: () => prestigeCount >= 1 },
  { id:12, icon:"👑", title:"Легенда пекарни",    desc:"Сделай 3 престижа",       check: () => prestigeCount >= 3 },
];

// ── HELPERS ──
function formatNum(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(2) + "K";
  return Math.floor(n).toString();
}

function getEffectiveClickPower() {
  return Math.max(1, Math.floor(clickPower * abilityMultiplier * levelMultiplier * prestigeMultiplier));
}

function calcPrestigeMultiplier(count) {
  return Number((1 + count * 0.25).toFixed(2));
}

function calculateBakeryLevel() {
  const prev = bakeryLevel;
  for (let i = BAKERY_LEVELS.length - 1; i >= 0; i--) {
    if (totalClicks >= BAKERY_LEVELS[i].minClicks) {
      bakeryLevel = BAKERY_LEVELS[i].level;
      break;
    }
  }
  levelMultiplier = Number((1 + (bakeryLevel - 1) * 0.08).toFixed(2));
  if (bakeryLevel !== prev) applyTheme();
}

function applyTheme() {
  const lvlData = BAKERY_LEVELS.find(l => l.level === bakeryLevel) || BAKERY_LEVELS[0];
  const theme = prestigeCount > 0 ? "prestige" : lvlData.theme;
  document.body.dataset.theme = theme;
  bakeryNameDisplay.textContent = prestigeCount > 0
    ? `✨ Легендарная Пекарня (П${prestigeCount})`
    : lvlData.name;
}

// ── FLOAT NUMBERS ──
function spawnFloat(amount) {
  const wrap = cookieEmoji.parentElement;
  const el = document.createElement("div");
  el.className = "float-num";
  el.textContent = "+" + formatNum(amount);
  const x = 60 + Math.random() * 80;
  const y = 80 + Math.random() * 40;
  el.style.left = x + "px";
  el.style.top  = y + "px";
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 950);
}

// ── ACHIEVEMENTS ──
let toastTimeout = null;
function showToast(achievement) {
  const toast = document.getElementById("achievement-toast");
  document.getElementById("toast-icon").textContent = achievement.icon;
  document.getElementById("toast-name").textContent = achievement.title;
  toast.classList.remove("hidden", "hiding");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add("hiding");
    setTimeout(() => toast.classList.add("hidden"), 350);
  }, 3000);
}

function checkAchievements() {
  ACHIEVEMENTS.forEach(ach => {
    if (!unlockedAchievementIds.includes(ach.id) && ach.check()) {
      unlockedAchievementIds.push(ach.id);
      renderAchievements();
      showToast(ach);
      saveGame();
    }
  });
}

function renderAchievements() {
  achievementsGrid.innerHTML = "";
  ACHIEVEMENTS.forEach(ach => {
    const unlocked = unlockedAchievementIds.includes(ach.id);
    const el = document.createElement("div");
    el.className = "achievement-item" + (unlocked ? " unlocked" : "");
    el.innerHTML = `
      <div class="achievement-icon">${ach.icon}</div>
      <div class="achievement-title">${ach.title}</div>
      <div class="achievement-desc">${ach.desc}</div>
    `;
    achievementsGrid.appendChild(el);
  });
  achievementsBadge.textContent = `${unlockedAchievementIds.length}/${ACHIEVEMENTS.length}`;
}

// ── SKINS ──
function getCurrentSkin() {
  return SKINS.find(s => s.id === activeSkinId) || SKINS[0];
}

function applyActiveSkin(animate = false) {
  const skin = getCurrentSkin();
  if (animate) {
    applySkinWithAnimation(skin.emoji);
  } else {
    cookieEmoji.textContent = skin.emoji;
    headerCookieIcon.textContent = skin.emoji;
  }
}

function renderSkins() {
  skinsGrid.innerHTML = "";
  SKINS.forEach(skin => {
    const owned  = purchasedSkinIds.includes(skin.id);
    const active = skin.id === activeSkinId;
    const affordable = clicks >= skin.cost;

    const btn = document.createElement("button");
    btn.className = "skin-btn" + (active ? " active" : "") + (!owned ? " locked" : "");
    btn.disabled = !owned && !affordable;
    btn.title = owned ? skin.name : `${skin.name} — 🍪 ${formatNum(skin.cost)} (${formatNum(skin.unlockAt)} кликов всего)`;

    btn.innerHTML = `
      <span style="font-size:1.9rem">${skin.emoji}</span>
      <span class="skin-name">${skin.name}</span>
      ${!owned ? `<span class="skin-cost">🍪${formatNum(skin.cost)}</span>` : ""}
    `;

    btn.addEventListener("click", () => {
      if (!owned) {
        if (clicks < skin.cost) return;
        clicks -= skin.cost;
        purchasedSkinIds.push(skin.id);
        updateDisplay();
        saveGame();
      }
      activeSkinId = skin.id;
      applyActiveSkin(true);
      renderSkins();
      saveGame();
    });

    skinsGrid.appendChild(btn);
  });
  const owned = purchasedSkinIds.length;
  skinsBadge.textContent = `${owned}/${SKINS.length}`;
}

// ── PRESTIGE ──
function getPrestigeGain() {
  return Math.floor(totalClicks / 5000);
}

function openPrestigeModal() {
  const gain = getPrestigeGain();
  const newCount = prestigeCount + gain;
  const newMult = calcPrestigeMultiplier(newCount);
  currentPrestigeBonus.textContent = `x${calcPrestigeMultiplier(prestigeCount).toFixed(2)}`;
  newPrestigeBonus.textContent      = `x${newMult.toFixed(2)}`;
  prestigeOverlay.classList.remove("hidden");
}

function doPrestige() {
  const gain = getPrestigeGain();
  if (gain <= 0) { prestigeOverlay.classList.add("hidden"); return; }
  prestigeCount += gain;
  prestigeMultiplier = calcPrestigeMultiplier(prestigeCount);

  // Reset progress
  clicks = 0; clickPower = 1; totalClicks = 0; autoClicksPerSecond = 0;
  purchasedUpgradeIds = []; purchasedAutoUpgradeIds = [];
  Improvements.innerHTML = "";
  byImprovements.style.display = "none";
  bakeryLevel = 1; levelMultiplier = 1;

  // Rebuild buttons
  upgradesContainer.innerHTML = "";
  autoContainer.innerHTML     = "";
  upgrades.forEach(u => upgradesContainer.appendChild(createShopItem(u, "upgrade")));
  autoUpgrades.forEach(a => autoContainer.appendChild(createShopItem(a, "auto")));

  applyTheme();
  updatePrestigeUI();
  renderSkins();
  checkAchievements();
  updateDisplay();
  saveGame();
  prestigeOverlay.classList.add("hidden");
}

function updatePrestigeUI() {
  if (prestigeCount > 0) {
    prestigeDisplay.style.display = "flex";
    prestigeStarsDisplay.textContent = "✨".repeat(Math.min(prestigeCount, 5));
    prestigeBonusText.textContent = `Бонус: +${Math.round((prestigeMultiplier - 1) * 100)}%`;
  } else {
    prestigeDisplay.style.display = "none";
  }
}

// ── DISPLAY ──
function updateDisplay() {
  const effAuto = Math.max(0, Math.floor(autoClicksPerSecond * levelMultiplier * prestigeMultiplier));
  headerClicksDisplay.textContent = formatNum(clicks);
  headerAutoDisplay.textContent   = formatNum(effAuto);
  clickPowerBtnDisplay.textContent = getEffectiveClickPower();
  totalClicksDisplay.textContent  = formatNum(totalClicks);
  clickCountStat.textContent      = formatNum(getEffectiveClickPower());
  autoClicksDisplay.textContent   = formatNum(effAuto);
  shopBadge.textContent           = `${purchasedUpgradeIds.length + purchasedAutoUpgradeIds.length}/${TOTAL_UPGRADES}`;
  bakeryLevelDisplay.textContent  = bakeryLevel;

  // level badge name
  const lvlData = BAKERY_LEVELS.find(l => l.level === bakeryLevel) || BAKERY_LEVELS[0];
  const nextLvl = BAKERY_LEVELS.find(l => l.level === bakeryLevel + 1);
  if (nextLvl) {
    const pct = Math.min(100, ((totalClicks - lvlData.minClicks) / (nextLvl.minClicks - lvlData.minClicks)) * 100);
    levelProgressBar.style.width = pct + "%";
  } else {
    levelProgressBar.style.width = "100%";
  }

  // prestige btn availability
  prestigeBtn.disabled = getPrestigeGain() <= 0;

  // skin affordability update
  SKINS.forEach(skin => {
    const btn = skinsGrid.querySelector(`button:nth-child(${skin.id})`);
    if (btn && !purchasedSkinIds.includes(skin.id)) {
      btn.disabled = clicks < skin.cost;
    }
  });
}

// ── SAVE / LOAD ──
function saveGame() {
  localStorage.setItem("cookieClickerSave", JSON.stringify({
    clicks, clickPower, totalClicks, autoClicksPerSecond,
    purchasedUpgradeIds, purchasedAutoUpgradeIds,
    Improvements: Improvements.innerHTML,
    prestigeCount, prestigeMultiplier,
    purchasedSkinIds, activeSkinId,
    unlockedAchievementIds,
  }));
}

function loadGame() {
  const raw = localStorage.getItem("cookieClickerSave");
  if (!raw) { init(); return; }
  try {
    const s = JSON.parse(raw);
    clicks               = s.clicks || 0;
    clickPower           = s.clickPower || 1;
    totalClicks          = s.totalClicks || 0;
    autoClicksPerSecond  = s.autoClicksPerSecond || 0;
    purchasedUpgradeIds  = Array.isArray(s.purchasedUpgradeIds)  ? s.purchasedUpgradeIds  : [];
    purchasedAutoUpgradeIds = Array.isArray(s.purchasedAutoUpgradeIds) ? s.purchasedAutoUpgradeIds : [];
    Improvements.innerHTML = s.Improvements || "";
    byImprovements.style.display = Improvements.innerHTML ? "block" : "none";
    prestigeCount        = s.prestigeCount || 0;
    prestigeMultiplier   = s.prestigeMultiplier || 1;
    purchasedSkinIds     = Array.isArray(s.purchasedSkinIds) ? s.purchasedSkinIds : [1];
    activeSkinId         = s.activeSkinId || 1;
    unlockedAchievementIds = Array.isArray(s.unlockedAchievementIds) ? s.unlockedAchievementIds : [];

    // lock purchased shop items
    purchasedUpgradeIds.forEach(id => {
      const b = document.getElementById(`upgrade${id}`);
      if (b) { b.disabled = true; b.classList.add("purchased"); }
    });
    purchasedAutoUpgradeIds.forEach(id => {
      const b = document.getElementById(`auto${id}`);
      if (b) { b.disabled = true; b.classList.add("purchased"); }
    });
  } catch { localStorage.removeItem("cookieClickerSave"); }
  init();
}

function init() {
  calculateBakeryLevel();
  applyTheme();
  applyActiveSkin();
  renderSkins();
  renderAchievements();
  updatePrestigeUI();
  updateDisplay();
}

// ── SHOP ITEMS ──
function addPurchasedItem(text) {
  Improvements.innerHTML += `<div>${text}</div>`;
  byImprovements.style.display = "block";
}

function createShopItem(item, type) {
  const btn = document.createElement("button");
  btn.className = "shop-item";
  btn.id = `${type}${item.id}`;
  const bonus = type === "upgrade" ? `+${item.power} к клику` : `+${item.power}/сек`;
  btn.innerHTML = `
    <div class="item-icon">${item.icon}</div>
    <div class="item-info">
      <div class="item-name">${item.text}</div>
      <div class="item-desc">${item.desc}</div>
    </div>
    <div class="item-right">
      <div class="item-cost">🍪 ${formatNum(item.cost)}</div>
      <div class="item-bonus">${bonus}</div>
    </div>
  `;
  btn.addEventListener("click", () => {
    if (clicks < item.cost || btn.classList.contains("purchased")) return;
    clicks -= item.cost;
    if (type === "upgrade") {
      clickPower += item.power;
      purchasedUpgradeIds.push(item.id);
    } else {
      autoClicksPerSecond += item.power;
      purchasedAutoUpgradeIds.push(item.id);
    }
    btn.disabled = true;
    btn.classList.add("purchased");
    addPurchasedItem(`${item.icon} ${item.text}`);
    calculateBakeryLevel();
    checkAchievements();
    updateDisplay();
    saveGame();
  });
  return btn;
}

upgrades.forEach(u => upgradesContainer.appendChild(createShopItem(u, "upgrade")));
autoUpgrades.forEach(a => autoContainer.appendChild(createShopItem(a, "auto")));

// ── TABS ──
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const which = tab.dataset.tab;
    upgradesContainer.style.display = which === "upgrades" ? "flex" : "none";
    autoContainer.style.display     = which === "auto"     ? "flex" : "none";
  });
});

// ── ABILITIES ──
abilities.forEach(ability => {
  const btn = document.createElement("button");
  btn.className = "ability-btn";
  btn.id = `ability${ability.id}`;
  btn.innerHTML = `
    <span>${ability.icon} ${ability.text}</span>
    <span class="ability-cost">🍪 ${formatNum(ability.cost)} · ${ability.desc}</span>
  `;
  btn.addEventListener("click", () => {
    if (clicks < ability.cost || abilityActive) return;
    clicks -= ability.cost;
    abilityActive = true;
    abilityMultiplier = ability.multiplier;
    btn.disabled = true;
    btn.classList.add("active-ability");
    updateDisplay();
    saveGame();
    setTimeout(() => {
      abilityMultiplier = 1;
      abilityActive = false;
      btn.disabled = false;
      btn.classList.remove("active-ability");
      updateDisplay();
      saveGame();
    }, ability.duration);
  });
  abilitiesContainer.appendChild(btn);
});

// ── COOKIE CLICK ──
function doClick() {
  const power = getEffectiveClickPower();
  clicks     += power;
  totalClicks += 1;
  calculateBakeryLevel();
  checkAchievements();
  updateDisplay();
  saveGame();
  spawnFloat(power);
  cookieEmoji.classList.remove("pop");
  void cookieEmoji.offsetWidth;
  cookieEmoji.classList.add("pop");
  setTimeout(() => cookieEmoji.classList.remove("pop"), 150);
}

cookieEmoji.addEventListener("click", doClick);
clickBtn.addEventListener("click", doClick);

// ── PRESTIGE MODAL ──
prestigeBtn.addEventListener("click", openPrestigeModal);
prestigeCancel.addEventListener("click", () => prestigeOverlay.classList.add("hidden"));
prestigeConfirm.addEventListener("click", doPrestige);
prestigeOverlay.addEventListener("click", e => { if (e.target === prestigeOverlay) prestigeOverlay.classList.add("hidden"); });

// ── AUTO CLICKS ──
setInterval(() => {
  const autoVal = Math.max(0, Math.floor(autoClicksPerSecond * levelMultiplier * prestigeMultiplier));
  if (autoVal > 0) {
    clicks += autoVal;
    totalClicks += autoVal;
    calculateBakeryLevel();
    checkAchievements();
    updateDisplay();
    saveGame();
  }
}, 1000);

// ── BUTTON STATE ──
setInterval(() => {
  upgrades.forEach(u => {
    const b = document.getElementById(`upgrade${u.id}`);
    if (b && !b.classList.contains("purchased")) b.disabled = clicks < u.cost;
  });
  autoUpgrades.forEach(a => {
    const b = document.getElementById(`auto${a.id}`);
    if (b && !b.classList.contains("purchased")) b.disabled = clicks < a.cost;
  });
  abilities.forEach(ab => {
    const b = document.getElementById(`ability${ab.id}`);
    if (b) b.disabled = clicks < ab.cost || abilityActive;
  });
  renderSkins();
}, 300);

// ── DARK MODE ──
const darkToggle = document.getElementById("dark-toggle");
function applyDarkMode(isDark) {
  document.body.classList.toggle("dark", isDark);
  darkToggle.checked = isDark;
}
darkToggle.addEventListener("change", () => {
  const isDark = darkToggle.checked;
  applyDarkMode(isDark);
  localStorage.setItem("darkMode", isDark ? "1" : "0");
});
// load saved preference
const savedDark = localStorage.getItem("darkMode");
if (savedDark === "1") applyDarkMode(true);

// ── SKIN SWAP ANIMATION ──
function applySkinWithAnimation(newEmoji) {
  // Phase 1: spin out
  cookieEmoji.classList.remove("skin-swap-in", "skin-swap-out", "pop");
  cookieEmoji.classList.add("skin-swap-out");
  setTimeout(() => {
    cookieEmoji.textContent = newEmoji;
    headerCookieIcon.textContent = newEmoji;
    cookieEmoji.classList.remove("skin-swap-out");
    cookieEmoji.classList.add("skin-swap-in");
    setTimeout(() => cookieEmoji.classList.remove("skin-swap-in"), 280);
  }, 200);
}

// ── BOOT ──
loadGame();
