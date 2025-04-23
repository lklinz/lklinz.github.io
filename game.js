let xp=0;
let health=100;
let gold=50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

/*JavaScript interacts with the HTML using the Document Object Model, or DOM. 
The DOM is a tree of objects that represents the HTML. 
You can access the HTML using the DOCUMENT OBJECT, which represents your entire HTML document.*/

/*querySelector method is used to find specific HTML element and take CSS selector as input (i.e normal type selector/id selector with #/class selector with .)*/ 
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

const text= document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector('#monsterHealth');
const weapons = [
  {name: "stick",
    power: 5},
  {name: "dagger",
    power: 30},
  {name: "claw hammer",
    power:50},
  {name: "sword",
    power: 100}
];
const monsters = [
  {name: 'slime',level:2,health:15},
  {name:'fanged beast',level:8,health:60},
  {name:'dragon',level:20,health:300}
];
const locations = [
  {name: "town square",
    "button text": ["Go to store","Go to cave","Fight dragon"],
    "button functions": [goStore,goCave,fightDragon],
    text : "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)","Buy weapon (30 gold)","Go to town square"],
    "button functions": [buyHealth,buyWeapon,goTown],
    text: "You enter the store."
  },
  {
    name: 'cave',
    'button text': ['Fight slime','Fight fanged beast','Go to town square'],
    'button functions': [fightSlime,fightBeast,goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack","Dodge","Run"],
    "button functions": [attack,dodge,goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square","Go to town square","Go to town square"],
    "button functions": [goTown,goTown,easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name:"lose",
    "button text": ["REPLAY?","REPLAY?","REPLAY?"],
    "button functions": [restart,restart,restart],
    text:"You die. &#x2620;"
  },
  {
    name:"win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
  },
  {
    name: "easter egg",
    "button text": ["2","8","Go to town square?"],
    "button functions": [pickTwo,pickEight,goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
//Q2: EMOTICON??? What does innerHTML relate to this?
];
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0]; //access the first element of the value associated with button text key/properties: an array 
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text; //The innerHTML property allows you to access or modify the content inside an HTML element using JavaScript.Q1???
}
//innerText properties is used to update the text corresponded to the element in the html file
function goTown() {
  update(locations[0]);//access the first element of the array: the object with property name: town square
  }
function goStore(){
  update(locations[1]);
}
function goCave(){
    update(locations[2]);
}

function buyHealth(){
  if (gold>=10){
    gold -=10;
    health +=10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}
function buyWeapon(){
  if (currentWeaponIndex<weapons.length-1) {
    if (gold>=30){
      gold -= 30;
      currentWeaponIndex++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeaponIndex].name;
      text.innerText = "You now have a "+newWeapon+".";
      inventory.push(newWeapon);
      text.innertext += " In your inventory you have: "+inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length >1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
      text.innerText = "Don't sell your only weapon!"
    }  
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = 'block';
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function fightSlime(){
  fighting = 0;
  goFight()
}
function fightBeast() {
  fighting = 1;
  goFight();
}
function fightDragon() {
  fighting = 2;
  goFight();
}

//Math.random(), which generates a random number from 0 (inclusive) to 1 (exclusive)
//Math.floor(), which rounds a given number down to the nearest integer.
//this generates a random number between 1 and 5: Math.floor(Math.random() * 5) + 1;: (0/1 * 5) + 1 = (1,6)
//Q1: Does the random give decimals?
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeaponIndex].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;
  }else {text.innerText += " You miss."}
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {winGame();} else{defeatMonster();}
  }
  if (Math.random() <= .1 && inventory.length!==1) {
    text.innerText += " Your " + inventory.pop()+ " breaks.";
    currentWeaponIndex--;
  }
} 

function getMonsterAttackValue(level) {
  const hit = (level *5) - (Math.floor(Math.random()*xp));
  console.log(hit);
  return hit >0 ? hit:0;//The ternary operator is a conditional operator and can be used as a one-line if-else statement. The syntax is: condition ? expressionIfTrue : expressionIfFalse.

}
//Q3: No order in function???
function isMonsterHit() {
  return Math.random() > .2 || health <20;
}

function dodge() {
  text.innerText = "You dodge the attack from the "+monsters[fighting].name;
}

function defeatMonster () {
  gold+=Math.floor(monsters[fighting].level*6.7);
  xp+=monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}
function lose () {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp=0;
  health = 100;
  gold = 50;
  currentWeaponIndex = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}
// initialize buttons
//the variable name assgined with the element.onclick = the function you want to call. onclick property execute the function when clicked on

//Similar to dictionary in, Objects are non primitive data types that store key-value pairs.
//Non primitive data types are mutable data types that are: not undefined, null, boolean, number, string, or symbol. 
//Mutable means that the data can be changed after it is created.

function easterEgg (){update(locations[7])}
function pick(guess) {
  const numbers = [];
  while (numbers.length<10) {
  numbers.push(Math.floor(Math.random()*11));
  }
  text.innerText = "You picked "+guess+". Here are the random numbers:\n";
  for (let i = 0;i<10;i++){text.innerText += numbers[i]+"\n";}
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold+=20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!"
    health -= 10;
    healthText.innerText = health;
    if (health<=0) {lose()}
  }

}
function pickTwo () {pick(2)};
function pickEight () {pick(8)}