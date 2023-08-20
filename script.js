'use strict';

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const currentScore0Element = document.getElementById('current--0');
const currentScore1Element = document.getElementById('current--1');

// Selecting buttons
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, scores, playing;

// Starting conditions
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];

  // State variable to indicate players are playing
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore0Element.textContent = 0;
  currentScore1Element.textContent = 0;
  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

init();

// Rolling dice functionality
buttonRoll.addEventListener('click', function () {
  // only execute if active playing is going on.
  if (playing) {
    // 1. Generate a random dice roll
    const rolledDiceNumber = Math.ceil(Math.random() * 6);

    // 2. Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${rolledDiceNumber}.png`;

    // 3. Check for rolled 1
    if (rolledDiceNumber !== 1) {
      // Add dice roll to current score and display the score
      currentScore += rolledDiceNumber;

      // Identify the active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // currentScore0Element.textContent = currentScore; //CHANGE LATER
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// Holding the score
buttonHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;

    // activePlayer === 0 ? score0Element.textContent = scores[activePlayer] : score1Element.textContent = scores[activePlayer];
    // fetching dynamically
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. If score > 100, finish the game.
    //    if not, switch to the next player

    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceElement.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

buttonNew.addEventListener('click', init);
