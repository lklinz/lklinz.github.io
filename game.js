let xp=0;
let health=100;
let gold=50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let invetory = ["stick"];

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
  }
];
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
  button1.innerText = location["button text"][0]; //access the first element of the value associated with button text key/properties: an array 
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
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
    text.innerText = "You do not have enough gold to buy health."
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
  if (invetory.length >1) {
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
  text.innerText = "The "+monsters[fighting].name+" attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeaponIndex].name+".";
  health -= monsters[fighting].level;
  monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random()*xp)+1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
} 
if (health<=0) {
  lose()

}else if (monsterHealth <= 0) {
  defeatMonster()
}
function dodge() {}

function defeatMonster () {}
function lose () {}
// initialize buttons
//the variable name assgined with the element.onclick = the function you want to call. onclick property execute the function when clicked on

//Similar to dictionary in, Objects are non primitive data types that store key-value pairs.
//Non primitive data types are mutable data types that are: not undefined, null, boolean, number, string, or symbol. 
//Mutable means that the data can be changed after it is created.