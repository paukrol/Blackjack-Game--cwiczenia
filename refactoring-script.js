'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const points0El = document.querySelector('#points--0');
const points1El = document.querySelector('#points--1');

const winPoints0El = document.querySelector('#win--0');
const winPoints1El = document.querySelector('#win--1');

const dicesEl = document.querySelectorAll('.dice');
const winEl = document.querySelectorAll('.win');
const lossEl = document.querySelectorAll('.loss');

const btnRoll = document.querySelector('.btn--roll');
const btnFinish = document.querySelector('.btn--finish');
const btnNew = document.querySelector('.btn--new');

// Reset basic elements
current0El.textContent = 0;
current1El.textContent = 0;
score0El.textContent = 0;
score1El.textContent = 0;
points0El.textContent = 0;
points1El.textContent = 0;

dicesEl.forEach((dice) => {
  dice.classList.add('hidden');
});

winEl.forEach((winItem) => {
  winItem.classList.add('hidden');
});

lossEl.forEach((lossItem) => {
  lossItem.classList.add('hidden');
});

// starting conditions
let activePlayer = 0;
let currentScore = 0;
let scores = [0, 0]; //
let totalPoints = [0, 0];
let playing = true;

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dices roll
    playing = false;
    const dices = [
      Math.trunc(Math.random() * 6) + 1,
      Math.trunc(Math.random() * 6) + 1,
    ];

    // 2. Display dices
    dicesEl.forEach((diceItem, index) => {
      diceItem.classList.add('hidden');

      setTimeout(function () {
        diceItem.classList.remove('hidden');
        const src = dices[index];
        diceItem.src = `images/dice-${src}.png`;
        playing = true;
      }, 100);
    });

    currentScore += dices[0] + dices[1];

    setTimeout(function () {
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;

      if (currentScore >= 16) {
        dicesEl[0].classList.add('hidden');
        btnFinish.classList.add('btn-active');

        if (currentScore === 31) {
          playing = false;
          document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winPoint');
          document
            .querySelector(`#win--${activePlayer}`)
            .classList.remove('hidden');

          totalPoints[activePlayer] += 2;
          document.querySelector(`#points--${activePlayer}`).textContent =
            totalPoints[activePlayer];

          scores[activePlayer] = currentScore;
          currentScore = 0;

          setTimeout(() => {
            playing = true;

            document.querySelector(`#current--${activePlayer}`).textContent = 0;

            player0El.classList.remove('player--winPoint');
            player1El.classList.remove('player--winPoint');
            winPoints0El.classList.add('hidden');
            winPoints1El.classList.add('hidden');

            activePlayer = activePlayer === 0 ? 1 : 0;
            player0El.classList.toggle('player--active');
            player1El.classList.toggle('player--active');
          }, 1000);
        } else if (currentScore > 31) {
          playing = false;

          document
            .querySelector(`#loss--${activePlayer}`)
            .classList.remove('hidden');

          document.querySelector(`#current--${activePlayer}`).textContent =
            currentScore;

          btnFinish.classList.remove('btn-active');
          scores[activePlayer] = 0;
          currentScore = 0;

          setTimeout(() => {
            playing = true;

            document.querySelector(`#current--${activePlayer}`).textContent = 0;

            lossEl.forEach((lossItem) => {
              lossItem.classList.add('hidden');
            });
            activePlayer = activePlayer === 0 ? 1 : 0;
            player0El.classList.toggle('player--active');
            player1El.classList.toggle('player--active');
          }, 1000);
        }
      }
    }, 100);
  }
});
