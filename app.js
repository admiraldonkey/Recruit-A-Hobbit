// Get DOM Nodes
const hobbitButton = document.getElementById("hobbit-btn");
const hobbitDisplay = document.getElementById("hobbit-display");
const hpsDisplay = document.getElementById("hps-display");
const upgradeDisplay = document.getElementById("upgrade-display");

// GAME STATE
// Initialise / retreive data from local storage
let hobbits = parseInt(localStorage.getItem("hobbits")) || 0;
let hps = parseInt(localStorage.getItem("hps")) || 0;

// Initialise upgrade array
let upgradeList = [];
// Initialise arrays for upgrade buttons and values
// let upgradeButtons = [];
// let upgradeValues = [];

// Array to contain upgrade buttons and values
let upgradeNodes = [];
// Call function to add upgrades to DOM
setUpgrades();

// GAME LOGIC
// Increase value when button clicked
hobbitButton.addEventListener("click", generateHobbit);

function generateHobbit() {
  hobbits += 1;
  hobbitDisplay.textContent = hobbits;
  //   updateStorage();
}

// Increase value by hps
setInterval(hobbitsPerSecond, 1000);

function hobbitsPerSecond() {
  hobbits = hobbits + hps;
  hobbitDisplay.textContent = hobbits;
  //   updateStorage();
}

// Update local storage
function updateStorage() {
  localStorage.setItem("hobbits", hobbits);
  localStorage.setItem("hps", hps);
}

// UPGRADES

// Function to fetch upgrades from API
async function handleGetAPIUpgrades() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  return await response.json();
}

// Function to update upgrade names then add them to the DOM and local storage
async function setUpgrades() {
  upgradeList = await handleGetAPIUpgrades();
  // New upgrade names
  const newNames = [
    "Peace and Quiet",
    "Hobbit Hole",
    "Good Tilled Earth",
    "Old Toby",
    "A Pint",
    "test6",
    "test7",
    "test8",
    "test9",
    "test10",
  ];
  // Change names of the retreived API data and update the DOM to display upgrades
  for (let i = 0; i < upgradeList.length; i++) {
    upgradeList[i].name = newNames[i];
    const para = document.createElement("p");
    const button = document.createElement("button");
    const buttonId = `upgrade-button-${upgradeList[i].id}`;
    const span = document.createElement("span");
    const spanId = `upgrade-value-${upgradeList[i].id}`;
    span.textContent = "0";
    button.id = buttonId;
    span.id = spanId;
    // upgradeButtons[i] = buttonId;
    // upgradeValues[i] = spanId;
    // upgradeNodes[i] = { [buttonId]: spanId };
    button.textContent = `${upgradeList[i].name}`;
    para.appendChild(button);
    button.after(span);
    // Hide all but the first upgrade when first displaying
    if (i > 0) {
      para.classList.add("locked");
    }
    upgradeDisplay.appendChild(para);
    localStorage.setItem(upgradeList[i].name, 0);
    upgradeNodes[i] = {
      button: document.getElementById(buttonId),
      value: document.getElementById(spanId),
    };
  }
  //   console.log(upgradeNodes);
  upgradeListeners();
}

function upgradeListeners() {
  upgradeNodes.forEach(function (elem) {
    elem.button.addEventListener("click", (e) => {
      // let currentValue = parseInt(elem.value.textContent);
      // elem.value.textContent = currentValue += 1;
      buyNewUpgrade(elem);
    });
  });
}

function buyNewUpgrade(elem) {
  let currentValue = parseInt(elem.value.textContent);
  elem.value.textContent = currentValue += 1;
  console.log(elem);
}

// TODO Add some logic to get an array (or whatever) of dom nodes generated by api call (make sure they're scoped to be accessible to event listeners and such) - maybe you do the doc.getElById when putting them into the upgradenodes array?
