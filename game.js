let deck = [];
dealerMoney = 1000000;
playerMoney = 100;
let remains = 0;
let firstMove = false;
let dealerScore = 0;
let playerScore = 0;
let playerHand = [];
let dealerHand = [];
let playerChoice = 1;
let state = "end";
let statistics = {
    dealerWon: 0,
    playerWon: 0,
}

function deckInit() {    
    dealerScore = 0;
    playerScore = 0;  
    deck.length = 0;
    playerHand = [];
    dealerHand = [];  
    for (let i = 2; i <= 10; i++) {
        for (let j = 0; j < 4; j++) {
            deck.push(i);
        }
    }
    let arr = ["A", "Q", "K", "J"];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < 4; j++) {
            deck.push(i);
        }
    }
    document.getElementById("score").innerHTML = "score";
    document.getElementById("statistics").innerHTML = "Statistics";
    remains = deck.length
}

function getCard() {
    return deck[Math.floor(Math.random() * remains--)];
}

function deal(str) {
    switch(str) {
    case "p": playerHand.push(getCard());      
    break;          
    case "d": dealerHand.push(getCard());
    break;
    }
  }

function cardValue(hand) {
    switch (hand) {
        case "A":
            return playerChoice;
            break;
        case "K":
        case "Q":
        case "J":
            return 10;
            break;
        default:
            return hand;
            break;
    }
}

function showOff() {
for (let i = 0; i < playerHand.length; i++) {
  playerScore += cardValue(playerHand[i]);
}
dealerScore += cardValue(dealerHand[0]);
dealerScore += cardValue(dealerHand[1]);
scoreCheck();
changeState();
showScore();
getStat();
}

function changeState() {
    if (state === "end") {
        state = "Playing";
        document.querySelector("#start").value = "Playing";
        document.querySelector("#start").value = "Start";
        document.getElementById("Hit!").value = "Hit!";
        document.getElementById("stand").value = "stand";
        document.getElementById("double").value = "double";
        document.getElementById("split").value = "split";
        document.getElementById("surrender").value = "surrender";        
    } else {
        state = "end";
        document.querySelector("#start").value = "Start";
        document.getElementById("Hit!").value = "";
        document.getElementById("stand").value = "";
        document.getElementById("double").value = "";
        document.getElementById("split").value = "";
        document.getElementById("surrender").value = "";        
    }
}

function updateStat(winner) {
    ++statistics[winner];
    alert(winner);
}
function getStat() {
    document.getElementById("statistics").innerHTML = `Dealer Won  ${statistics.dealerWon}  Player Won  ${statistics.playerWon}`;
}
function showScore() {
    document.getElementById("score").innerHTML = `GameOver:  dealerScore ${dealerScore}  playerScore ${playerScore}  State ${state}`;
}

function scoreCheck() {
    if (dealerScore == 21) {        
        updateStat("dealerWon");               
    }
    if (playerScore == 21) {        
        updateStat("playerWon");                
    }
    if (dealerScore > 21 && playerScore < 21) {        
        updateStat("playerWon");                
    }
    if (playerScore > 21 && dealerScore < 21) {        
        updateStat("dealerWon");               
    }
    if (playerScore == dealerScore){      
       document.getElementById("statistics").innerHTML = "Push";       
    }
    if (playerScore < 21 && dealerScore < 21) {
      if (playerScore > dealerScore){        
        updateStat("playerWon");               
      }
      if (dealerScore > playerScore) {
        updateStat("dealerWon");                        
      }
    }
}

function makeAHeart() {
    let base = document.createElement("DIV");
    base.className= "base";
    document.body.appendChild(base);
    base.innerHTML = '<div class="heart1"><div class="heart2"><div class="heart3"><div class="heartrang1">K</div><div class="heartrang2">K</div></div></div></div>';
     /*
    let heart1 = document.createElement("DIV");
    heart1.className = "heart1";
    base.appendChild(heart1);
    let heart2 = document.createElement("DIV");
    heart2.className = "heart2";
    heart1.appendChild(heart2);
    let heart3 = document.createElement("DIV");
    heart3.className = "heart3";
    heart2.appendChild(heart3);
    let heartrang1 = document.createElement("DIV");
    heartrang1.className = "heartrang1";
    heart3.appendChild(heartrang1);
    let heartrang2 = document.createElement("DIV");
    heartrang2.className = "heartrang2";
    heart3.appendChild(heartrang2);*/
}

function start() {
    firstMove = true;
    deckInit(); 
    changeState();
    deal("p");
    deal("p");
    deal("d");
    deal("d");
    makeAHeart();
}

function hit() {
    firstMove = true;
    deal("p");
}

function stand(){
  firstMove = true;  
  showOff();
}

function double() {
  firstMove = true;
 hit();
 showOff();
}

function split() {
  firstMove = true;
}

function surrender() {
 if (!firstMove) {
 showOff();
 } 
}