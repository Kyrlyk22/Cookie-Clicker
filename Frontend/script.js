let clicks = 0;
let clickPower = 1;
let totalClicks = 0;

const displayClick = document.getElementById("clicks");
const clickPowerDisplay = document.getElementById("click-power");
const totalClicksDisplay = document.getElementById("total-clicks");
const clickBtn = document.getElementById("cookie");
const upgradesContainer = document.getElementById("upgrades-container");
const byImprovements = document.getElementById("byeImprovements");
const Improvements = document.getElementById("Improvements");
const cookieCrumbs = document.querySelector(".cookie-crumbs");
const floatingCookies = document.querySelector(".floating-cookies");

function createFloatingCookies() {
  for (let i = 0; i < 15; i++) {
    const cookie = document.createElement("div");
    cookie.className = "floating-cookie";
    cookie.textContent = "🍪";
    cookie.style.left = `${Math.random() * 100}vw`;
    cookie.style.top = `${Math.random() * 100}vh`;
    cookie.style.animationDuration = `${15 + Math.random() * 20}s`;
    cookie.style.animationDelay = `${Math.random() * 5}s`;
    floatingCookies.appendChild(cookie);
  }
}

createFloatingCookies();

const upgrades = [
    { id: 1, power: 1, cost: 15, text: "+2 за клик" },
    { id: 2, power: 1, cost: 30, text: "+3 за клик" },
    { id: 3, power: 2, cost: 60, text: "+5 за клик" },
    { id: 4, power: 5, cost: 120, text: "+10 за клик" },
    { id: 5, power: 10, cost: 250, text: "+20 за клик" },
    { id: 6, power: 10, cost: 500, text: "+30 за клик" },
    { id: 7, power: 20, cost: 1000, text: "+50 за клик" },
    { id: 8, power: 50, cost: 2000, text: "+100 за клик" },
    { id: 9, power: 100, cost: 5000, text: "+200 за клик" },
    { id: 10, power: 300, cost: 10000, text: "+500 за клик" }
];

upgrades.forEach(upgrade => {
    const button = document.createElement("button");
    button.className = "upgrade";
    button.id = `upgrade${upgrade.id}`;
    button.innerHTML = `${upgrade.text}<br><span>(${upgrade.cost} кликов)</span>`;
    
    if (upgrade.id > 1) {
        button.style.display = "none";
    }
    
    button.addEventListener("click", () => {
        if (clicks >= upgrade.cost) {
            clicks -= upgrade.cost;
            clickPower += upgrade.power;
            displayClick.textContent = clicks;
            clickPowerDisplay.textContent = clickPower;

                button.style.display = "none";
                button.classList.remove("animate__animated", "animate__bounceOut");
                
                const nextUpgrade = upgrades.find(u => u.id === upgrade.id + 1);
                if (nextUpgrade) {
                    const nextButton = document.getElementById(`upgrade${nextUpgrade.id}`);
                    nextButton.style.display = "block";
                    nextButton.classList.add("animate__animated", "animate__bounceIn");
                    setTimeout(() => {
                        nextButton.classList.remove("animate__animated", "animate__bounceIn");
                    }, 1000);
                }
                
                if (upgrade.id === 10) {
                    Improvements.style.display = "block";
                    byImprovements.style.display = "block";
                    byImprovements.disabled = true;
                }

        } else {
            button.classList.add("animate__animated", "animate__headShake");
            setTimeout(() => {
                button.classList.remove("animate__animated", "animate__headShake");
            }, 1000);
        }
    });
    
    upgradesContainer.appendChild(button);
});

clickBtn.addEventListener("click", () => {
    clicks += clickPower;
    displayClick.textContent = clicks;
});

clickBtn.addEventListener("click", () => {
    displayClick.textContent = clicks;
    totalClicksDisplay.textContent = totalClicks;
});

Improvements.style.display = "none";
byImprovements.style.display = "none";
clickPowerDisplay.textContent = clickPower;
totalClicksDisplay.textContent = totalClicks;