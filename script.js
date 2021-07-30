'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const points0El = document.querySelector('#points--0');
const points1El = document.querySelector('#points--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnFinish = document.querySelector('.btn--finish');

const dicesEl = document.querySelectorAll('.dice');
const lossEl = document.querySelector('.loss');

// Starting conditions
let currentScore = 0;
let activePlayer = 0;
let score = 0;
let playing = true;

points0El.textContent = 0;
points1El.textContent = 0;

score0El.textContent = 0;
score1El.textContent = 0;

current0El.textContent = 0;
current1El.textContent = 0;

for (let i = 0; i < dicesEl.length; i++) {
  dicesEl[i].classList.add('hidden');
  console.log(dicesEl[i]);
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = [
      Math.trunc(Math.random() * 6) + 1,
      Math.trunc(Math.random() * 6) + 1,
    ];

    dicesEl.forEach((item, index) => {
      item.classList.remove('hidden');
      const src = dice[index];
      item.src = `images/dice-${src}.png`;
    });

    currentScore += dice[0] + dice[1];
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
    // current0El.textContent = currentScore;

    if (currentScore === 31) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document.querySelector(`.player--${activePlayer} .name`).textContent =
        'Winner!';
      playing = false;
    } else if (currentScore > 31) {
      // current0El.textContent = currentScore;
      lossEl.classList.remove('hidden');
      currentScore = 0;

      activePlayer = activePlayer === 0 ? 1 : 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    } else if (currentScore >= 16) {
      dicesEl[0].classList.add('hidden');
    }
  }
});

btnFinish.addEventListener('click', function () {
  if (currentScore >= 16) {
    playing = false;
    score = currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = score;
    currentScore = 0;
    current0El.textContent = currentScore;

    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    playing = true;

    if (score0El.textContent != 0 && score1El.textContent != 0) {
      if (score0El.textContent > score1El.textContent) {
        console.log('1 :winner');
        player0El.classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');

        playing = false;
      } else if (score1El.textContent > score0El.textContent) {
        console.log('2 :winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');

        player1El.classList.add('player--winner');

        playing = false;
      }
    }
  }
});

console.log(typeof score0El.textContent);
console.log(score1El.textContent);

// WAŻNE
// var n = [1, 2, 3, 5, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 20, 21, 22];
// var m = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

// n.forEach((num1, index) => {
//   const num2 = m[index];
//   console.log(num1, num2);
// });
