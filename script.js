'use strict';
// Score Elements
const score0El = document.querySelector('#score--0'); // Player1's score element
const score1El = document.querySelector('#score--1'); // Player2's score element
// Dice Elements
const diceEl = document.querySelector('.dice');
// Button Elements
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
// Player Elements
const players = document.querySelectorAll('.player');
// Variable for players and scores
let activePlayer;  // 0 is player1, 1 is player2
let currentScore;
let playerScore;
// Game status
let playing;

// Starting conditions
function init() {
  playerScore = [0, 0];
  playing = true;
  currentScore = 0;
  activePlayer = 0; 
  score0El.textContent = 0;
  score1El.textContent = 0;
  for (let i in playerScore) {
    document.querySelector(`.player--${i}`).classList.remove('player--active');
  }
  document.querySelector('.player--0').classList.add('player--active');
  diceEl.classList.add('hidden');
}
// Switching player function
function switchPlayer() {
  // Reset currentScore
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // Toggle players's class 
  for (let player of players) {
    player.classList.toggle('player--active');
  }
  // Change activePlayer
  activePlayer = activePlayer === 0 ? 1 : 0;
}
// START THE GAME
init();

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice 1-6
    let randomDice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomDice}.png`;
    // 3. Check if dice === 1 => switch player & reset current score, if dice !== 1 add dice roll to current score
    // When dice === 1
    if (randomDice === 1) {
      // Switch player
      switchPlayer();

      // When dice !===1
    } else {
      currentScore += randomDice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

//Holding Functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add currentScore to Active Player's Score
    playerScore[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      playerScore[activePlayer];

    // 2. Check if Active Player's Score >= 100 => win
    if (playerScore[activePlayer] >= 100) {
      document.querySelector('.player--active').classList.add('player--winner');
      document.querySelector(`#name--${activePlayer}`).textContent =
        'WINNER 🥳';
      document.querySelector(`#current--${activePlayer}`).textContent = 0;

      playing = false;
      // else continue the game
    } else {
      // Switch player
      switchPlayer();
      // Hide dice
      diceEl.classList.add('hidden');
    }
  }
});
// Reset functionality
btnNew.addEventListener('click', function () {
  document.querySelector(`#name--${activePlayer}`).textContent = `PLAYER ${
    activePlayer + 1
  }`;
  document.querySelector('.player--active').classList.remove('player--winner');
  init();
});
