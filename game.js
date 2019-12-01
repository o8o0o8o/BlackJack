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
      deck.push(`diamond_${i}`);
      deck.push(`spade_${i}`);
      deck.push(`heart_${i}`);
      deck.push(`klub_${i}`);
   }
   let arr = ["A", "Q", "K", "J"];
   for (let i = 0; i < arr.length; i++) {
      deck.push(`diamond_${arr[i]}`);
      deck.push(`spade_${arr[i]}`);
      deck.push(`heart_${arr[i]}`);
      deck.push(`klub_${arr[i]}`);
   }
   document.getElementById("score").innerHTML = "score";
   document.getElementById("statistics").innerHTML = "Statistics";
   remains = deck.length
}

function getCard() {
   return deck[Math.floor(Math.random() * remains--)];
}

function deal(str) {
   switch (str) {
      case "p":
         playerHand.push(getCard());
         getSuit(playerHand[playerHand.length - 1])(cardRang(playerHand[playerHand.length - 1]), "playerhand");
         break;
      case "d":
         dealerHand.push(getCard());
         getSuit(dealerHand[dealerHand.length - 1])(cardRang(dealerHand[dealerHand.length - 1]), "dealerhand");
         break;
   }
}

function cardRang(hand) {
   let regexp = /(?<=_).+/gm;
   return regexp.exec(hand);
}

function cardValue(hand) {
   let regexp = /(?<=_).+/gm;
   hand = regexp.exec(hand);
   if (hand == "A") {
      return playerChoice;
   }
   if (hand == "Q" | hand == "K" | hand == "J") {
      return 10;
   }
   return +hand;
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
      document.getElementById("dealerhand").parentNode.removeChild(document.getElementById("dealerhand"));
      document.getElementById("playerhand").parentNode.removeChild(document.getElementById("playerhand"));
   }
}

function updateStat(winner) {
   ++statistics[winner];
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
   if (playerScore == dealerScore) {
      document.getElementById("statistics").innerHTML = "Push";
   }
   if (playerScore < 21 && dealerScore < 21) {
      if (playerScore > dealerScore) {
         updateStat("playerWon");
      }
      if (dealerScore > playerScore) {
         updateStat("dealerWon");
      }
   }
}

function getSuit(hand) {
   if (hand.includes("diamond")) {
      return makeDiamond;
   }
   if (hand.includes("heart")) {
      return makeHeart;
   }
   if (hand.includes("klub")) {
      return makeKlub;
   }
   if (hand.includes("spade")) {
      return makeSpade;
   }
}

function makeHeart(card, stack) {
   let base = document.createElement("DIV");
   base.className = "base";
   document.getElementById(`${stack}`).appendChild(base);
   base.innerHTML = `<div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><div id="base1"><div id="base2"><div id="gradient"></div></div></div></div><div class="flip-card-back"><div class="base"><div class="heart1"><div class="heart2"><div class="heart3"><div class="heart4"><div class="heart5"><div class="heartrang1">${card}</div><div class="heartrang2">${card}</div></div></div></div></div></div></div></div></div></div></div>`;
}

function makeDiamond(card, stack) {
   let base = document.createElement("DIV");
   base.className = "base";
   document.getElementById(`${stack}`).appendChild(base);
   base.innerHTML = `<div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><div id="base1"><div id="base2"><div id="gradient"></div></div></div></div><div class="flip-card-back"><div class="base"><div class="diamond1"><div class="diamond2"><div class="diamondrang1">${card}</div><div class="diamondrang2">${card}</div></div></div></div></div></div></div>`;
}

function makeSpade(card, stack) {
   let base = document.createElement("DIV");
   base.className = "base";
   document.getElementById(`${stack}`).appendChild(base);
   base.innerHTML = `<div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><div id="base1"><div id="base2"><div id="gradient"></div></div></div></div><div class="flip-card-back"><div class="base"><div class="spade1"><div class="spade2"><div class="spade3"><div class="spade4"><div class="spade5"><div class="spade6"><div class="spaderang1">${card}</div><div class="spaderang2">${card}</div></div></div></div></div></div></div></div></div></div></div>`;
}

function makeKlub(card, stack) {
   let base = document.createElement("DIV");
   base.className = "base";
   document.getElementById(`${stack}`).appendChild(base);
   base.innerHTML = `<div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><div id="base1"><div id="base2"><div id="gradient"></div></div></div></div><div class="flip-card-back"><div class="base"><div class="klub1"><div class="klub2"><div class="klub3"><div class="klub4"><div class="klub5"><div class="klub6"><div class="klubrang1">${card}</div><div class="klubrang2">${card}</div></div></div></div></div></div></div></div></div></div></div>`;
}

function start() {
   if (state === "end") {
      let dealerhand = document.createElement("DIV");
      dealerhand.id = "dealerhand";
      document.body.appendChild(dealerhand);
      let playerhand = document.createElement("DIV");
      playerhand.id = "playerhand";
      document.body.appendChild(playerhand);
      deckInit();
      changeState();
      deal("p");
      deal("p");
      deal("d");
      deal("d");
   }
}

function hit() {
   firstMove = true;
   deal("p");
}

function stand() {
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