'use strict';
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnRollDiceEl = document.querySelector('.btn--roll');
const imgDice = document.querySelector('.dice');
const btnHOld = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
let scores, activePlayer, currentScore, playing;
//starting conditions
const init = function () {
  activePlayer = 0;
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  imgDice.classList.add('hidden'); //returns to the initial state
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
//switching players
const switchPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
btnRollDiceEl.addEventListener('click', function () {
  if (playing) {
    //1.generating a random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    console.log(diceRoll);
    //2.display dice
    imgDice.classList.remove('hidden');
    imgDice.src = `dice-${diceRoll}.png`;
    //3. check if diceRoll is not equal to 1
    if (diceRoll !== 1) {
      currentScore = currentScore + diceRoll;
      //currentScore0El.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayers();
    }
  }
});

btnHOld.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active player
    scores[activePlayer] += currentScore; //or scores[activePlayer] = score[activePlayer] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      //FINISH THE GAME
      playing = false;
      imgDice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch player
      switchPlayers();
    }
  }
});

btnNew.addEventListener('click', init);
