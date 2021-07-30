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
const lossEl = document.querySelectorAll('.loss');
const winEl = document.querySelectorAll('.win');

// Starting conditions
let currentScore = 0;
let activePlayer = 0;
let score = 0;
let playing = true;
let totalPoints = [0, 0];

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

for (let i = 0; i < lossEl.length; i++) {
  lossEl[i].classList.add('hidden');
  console.log(lossEl[i]);
}

for (let i = 0; i < winEl.length; i++) {
  winEl[i].classList.add('hidden');
}

// btnFinish.classList.remove('btn-active');

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
      playing = false;
      if (activePlayer === 0) {
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winPoint');

        // document.querySelector(`.player--${activePlayer} .name`).textContent =
        //   'Winner!';
        document
          .querySelector(`#win--${activePlayer}`)
          .classList.remove('hidden');

        totalPoints[activePlayer]++;
        document.querySelector(`#points--${activePlayer}`).textContent =
          totalPoints[activePlayer];

        score = currentScore;

        document.querySelector(`#score--${activePlayer}`).textContent = score;
        currentScore = 0;
        document.querySelector(`#current--${activePlayer}`).textContent =
          currentScore;

        activePlayer = activePlayer === 0 ? 1 : 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');

        setTimeout(function () {
          playing = true;
          // score = 0;
          // score0El.textContent = score;
          // score1El.textContent = score; to powinno pojscdopiero po porownnaiu z graczem nr 2
          player1El.classList.remove('player--winPoint');
          player0El.classList.remove('player--winPoint');

          document.querySelector(`#win--0`).classList.add('hidden');
          document.querySelector(`#win--1`).classList.add('hidden');
        }, 800);
      } else if (activePlayer === 1) {
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winPoint');

        document
          .querySelector(`#win--${activePlayer}`)
          .classList.remove('hidden');

        totalPoints[activePlayer]++;
        document.querySelector(`#points--${activePlayer}`).textContent =
          totalPoints[activePlayer];

        score = currentScore;

        document.querySelector(`#score--${activePlayer}`).textContent = score;
        currentScore = 0;
        document.querySelector(`#current--${activePlayer}`).textContent =
          currentScore;

        activePlayer = activePlayer === 0 ? 1 : 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');

        setTimeout(function () {
          score = 0;
          score0El.textContent = score;
          score1El.textContent = score;
          player1El.classList.remove('player--winPoint');
          player0El.classList.remove('player--winPoint');

          document.querySelector(`#win--0`).classList.add('hidden');
          document.querySelector(`#win--1`).classList.add('hidden');

          playing = true;
        }, 800);
      }
      // playing = false;
    } else if (currentScore > 31) {
      document
        .querySelector(`#loss--${activePlayer}`)
        .classList.remove('hidden');
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      btnFinish.classList.remove('btn-active');
      currentScore = 0;
      playing = false;

      if (activePlayer === 1 && score0El.textContent > 0) {
        totalPoints[0]++;
        document.querySelector(`#points--0`).textContent = totalPoints[0];

        player0El.classList.add('player--winPoint');

        document.querySelector(`#win--0`).classList.remove('hidden');

        setTimeout(function () {
          score = 0;
          score0El.textContent = score;
          score1El.textContent = score;
          player0El.classList.remove('player--winPoint');

          document.querySelector(`#win--0`).classList.add('hidden');
        }, 800);
      }

      // zeruje current points dla aktywnego gracza po 1s
      setTimeout(function () {
        document.querySelector(`#current--${activePlayer}`).textContent =
          currentScore;

        for (let i = 0; i < lossEl.length; i++) {
          lossEl[i].classList.add('hidden');
          console.log(lossEl[i]);
        }

        // playing = false;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');

        playing = true;
      }, 1000);
    } else if (currentScore >= 16) {
      dicesEl[0].classList.add('hidden');
      btnFinish.classList.add('btn-active');
    }
  }
});

btnFinish.addEventListener('click', function () {
  btnFinish.classList.remove('btn-active');

  if (currentScore >= 16) {
    playing = false; //
    score = currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = score;
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;

    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    playing = true; //

    // Wydaje mi sie ze kod nizej nie powinien byc w srodku
    if (activePlayer === 0 && score0El.textContent === 31) {
      totalPoints[0]++;
      document.querySelector(`#points--0`).textContent = totalPoints[0];

      player0El.classList.add('player--winPoint');

      document.querySelector(`#win--0`).classList.remove('hidden');

      console.log('dziala');

      setTimeout(function () {
        score = 0;
        score0El.textContent = score;
        score1El.textContent = score;
        player0El.classList.remove('player--winPoint');

        document.querySelector(`#win--0`).classList.add('hidden');
      }, 800);
    } else if (activePlayer === 1 && score1El.textContent < 31) {
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
    }

    if (score0El.textContent == 0 && score1El.textContent != 0) {
      player1El.classList.add('player--winPoint');

      document.querySelector(`#win--1`).classList.remove('hidden');

      totalPoints[1]++;
      document.querySelector(`#points--1`).textContent = totalPoints[1];

      setTimeout(function () {
        score = 0;
        score0El.textContent = score;
        score1El.textContent = score;
        player1El.classList.remove('player--winPoint');

        document.querySelector(`#win--1`).classList.add('hidden');
      }, 800);
    }

    // trzeba dodac if (score0El.textContent ==31  && score1El.textContent != 0)
    if (score0El.textContent != 0 && score1El.textContent != 0) {
      if (score0El.textContent > score1El.textContent) {
        console.log('1 :winner');
        // player0El.classList.add('player--winner');
        //   .querySelector(`.player--${activePlayer}`)
        //   .classList.remove('player--active');
        player0El.classList.add('player--winPoint');

        document.querySelector(`#win--0`).classList.remove('hidden');

        totalPoints[0]++;
        document.querySelector(`#points--0`).textContent = totalPoints[0];

        setTimeout(function () {
          score = 0;
          score0El.textContent = score;
          score1El.textContent = score;
          player0El.classList.remove('player--winPoint');

          currentScore = 0;
          document.querySelector(`#current--0`).textContent = currentScore;
          document.querySelector(`#current--1`).textContent = currentScore;

          document.querySelector(`#win--0`).classList.add('hidden');
        }, 800);

        // playing = false;
      } else if (score1El.textContent > score0El.textContent) {
        console.log('2 :winner');
        console.log(activePlayer);
        // document.querySelector(`.player--${activePlayer}`);
        // .classList.remove('player--active');
        player1El.classList.add('player--winPoint');

        document.querySelector(`#win--1`).classList.remove('hidden');

        totalPoints[1]++;
        document.querySelector(`#points--1`).textContent = totalPoints[1];

        setTimeout(function () {
          score = 0;
          score0El.textContent = score;
          score1El.textContent = score;
          player1El.classList.remove('player--winPoint');

          document.querySelector(`#win--1`).classList.add('hidden');
        }, 800);
      } else if (score1El.textContent === score0El.textContent) {
        setTimeout(function () {
          score = 0;
          score0El.textContent = score;
          score1El.textContent = score;
          player0El.classList.remove('player--winPoint');

          document.querySelector(`#win--0`).classList.add('hidden');
        }, 800);
        // } else {
        //   playing = false;
        //   player0El.classList.remove('player--active');

        //   player1El.classList.remove('player--active');
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
