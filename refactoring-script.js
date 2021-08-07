'use strict';

document.querySelector('.mark-open').addEventListener('click', () => {
  document.querySelector('.wrapper-game-rules').classList.add('active');
});

document.querySelector('.mark-close').addEventListener('click', () => {
  document.querySelector('.wrapper-game-rules').classList.remove('active');
});

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const points0El = document.querySelector('#points--0');
const points1El = document.querySelector('#points--1');

const win1Points0El = document.querySelector('#win1--0');
const win1Points1El = document.querySelector('#win1--1');
const win2Points0El = document.querySelector('#win2--0');
const win2Points1El = document.querySelector('#win2--1');

const dicesEl = document.querySelectorAll('.dice');
const win1El = document.querySelectorAll('.win1');
const win2El = document.querySelectorAll('.win2');
const lossEl = document.querySelectorAll('.loss');

const btnRoll = document.querySelector('.btn--roll');
const btnFinish = document.querySelector('.btn--finish');
const btnNew = document.querySelector('.btn--new');

// Reset basic elements
let activePlayer, currentScore, scores, totalPoints, playing;

const init = function () {
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  points0El.textContent = 0;
  points1El.textContent = 0;

  dicesEl.forEach((dice) => {
    dice.classList.add('hidden');
  });

  win1El.forEach((win1Item) => {
    win1Item.classList.add('hidden');
  });

  win2El.forEach((win2Item) => {
    win2Item.classList.add('hidden');
  });

  lossEl.forEach((lossItem) => {
    lossItem.classList.add('hidden');
  });

  // starting conditions
  activePlayer = 0;
  currentScore = [0, 0];
  scores = [0, 0];
  totalPoints = [0, 0];
  playing = true;
};

init();

const checkWinner = function () {
  playing = false;

  setTimeout(function () {
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    document.querySelector(`.player--0`).classList.remove('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');

    if (totalPoints[0] >= 10) {
      document.querySelector(`.player--0 .name`).textContent = 'Winner!';
      document.querySelector(`.player--0`).classList.add('player--winner');
    } else {
      document.querySelector(`.player--1 .name`).textContent = 'Winner!';
      document.querySelector(`.player--1`).classList.add('player--winner');
    }
  }, 500);
};

const switchPlayer = function () {
  player0El.classList.remove('player--winPoint');
  document.querySelector(`#win2--0`).classList.add('hidden');

  player1El.classList.remove('player--winPoint');
  document.querySelector(`#win2--1`).classList.add('hidden');

  player0El.classList.remove('player--winPoint');
  document.querySelector(`#win1--0`).classList.add('hidden');

  player1El.classList.remove('player--winPoint');
  document.querySelector(`#win1--1`).classList.add('hidden');

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  playing = true;
};

const resetPoints = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;

  currentScore = [0, 0];
  scores = [0, 0];
};

const overSixteen = function () {
  setTimeout(function () {
    dicesEl[0].classList.add('hidden');
    btnFinish.classList.add('btn-active');
  }, 500);

  if (currentScore[activePlayer] === 21) {
    playing = false;

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winPoint');
    document.querySelector(`#win2--${activePlayer}`).classList.remove('hidden');

    totalPoints[activePlayer] += 2;
    document.querySelector(`#points--${activePlayer}`).textContent =
      totalPoints[activePlayer];

    scores[activePlayer] = currentScore[activePlayer];
    currentScore[activePlayer] = 0;

    if (totalPoints[0] >= 10 || totalPoints[1] >= 10) {
      checkWinner();
    } else {
      if (activePlayer === 1) {
        setTimeout(function () {
          resetPoints();
        }, 500);
      }
      setTimeout(() => {
        document.querySelector(`#current--${activePlayer}`).textContent = 0;
        dicesEl[1].classList.add('hidden');
        btnFinish.classList.remove('btn-active');

        switchPlayer();
      }, 500);
    }
  } else if (currentScore[activePlayer] > 21) {
    playing = false;

    document.querySelector(`#loss--${activePlayer}`).classList.remove('hidden');

    btnFinish.classList.remove('btn-active');
    // scores[activePlayer] = 0;
    // currentScore[activePlayer] = 0;

    if (activePlayer === 1 && scores[0] !== 0 && scores[0] !== 21) {
      totalPoints[0]++;

      document.querySelector(`#points--0`).textContent = totalPoints[0];

      player0El.classList.add('player--winPoint');
      document.querySelector(`#win1--0`).classList.remove('hidden');

      setTimeout(() => {
        player0El.classList.remove('player--winPoint'); //
        document.querySelector(`#win1--0`).classList.add('hidden'); //
      }, 500);
    } else if (activePlayer === 1) {
      setTimeout(() => {
        resetPoints();
      }, 500);
    }

    if (totalPoints[0] >= 10 || totalPoints[1] >= 10) {
      checkWinner();
    } else {
      setTimeout(() => {
        resetPoints();

        document.querySelector(`#current--${activePlayer}`).textContent = 0;

        lossEl.forEach((lossItem) => {
          lossItem.classList.add('hidden');
        });

        switchPlayer();

        dicesEl[1].classList.add('hidden');
        btnFinish.classList.remove('btn-active');
      }, 500);
    }
  }
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dices roll
    const dices = [
      Math.trunc(Math.random() * 6) + 1,
      Math.trunc(Math.random() * 6) + 1,
    ];

    // 2. Display dices
    if (currentScore[activePlayer] >= 16) {
      dicesEl[1].classList.remove('hidden');
      const src = dices[1];
      dicesEl[1].src = `images/dice-${src}.png`;

      currentScore[activePlayer] += dices[1];
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore[activePlayer];
      overSixteen();
    } else {
      dicesEl.forEach((diceItem, index) => {
        diceItem.classList.remove('hidden');
        const src = dices[index];
        diceItem.src = `images/dice-${src}.png`;
      });

      currentScore[activePlayer] += dices[0] + dices[1];
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore[activePlayer];

      if (currentScore[activePlayer] >= 16) {
        overSixteen();
      }
    }
  }
});

btnFinish.addEventListener('click', function () {
  if (playing) {
    if (currentScore[activePlayer] >= 16) {
      playing = false;

      if (currentScore[activePlayer] <= 21) {
        scores[activePlayer] = currentScore[activePlayer];
      } else if (currentScore[activePlayer] > 21) {
        scores[activePlayer] = 0;
      }

      document.querySelector(`#score--${activePlayer}`).textContent =
        scores[activePlayer];
      document.querySelector(`#current--${activePlayer}`).textContent = 0;

      if (activePlayer === 0) {
        setTimeout(() => {
          btnFinish.classList.remove('btn-active');
          switchPlayer();
        }, 500);
      } else {
        if (scores[1] > scores[0] && scores[0] !== 21) {
          totalPoints[1]++;
          document.querySelector(`#points--1`).textContent = totalPoints[1];

          player1El.classList.add('player--winPoint');
          document.querySelector(`#win1--1`).classList.remove('hidden');

          if (totalPoints[0] >= 10 || totalPoints[1] >= 10) {
            checkWinner();
          } else {
            setTimeout(() => {
              btnFinish.classList.remove('btn-active');
              switchPlayer();
              resetPoints();
            }, 500);
          }
        } else if (scores[0] > scores[1] && scores[0] !== 21) {
          totalPoints[0]++;
          document.querySelector(`#points--0`).textContent = totalPoints[0];

          player0El.classList.add('player--winPoint');
          document.querySelector(`#win1--0`).classList.remove('hidden');

          if (totalPoints[0] >= 10 || totalPoints[1] >= 10) {
            checkWinner();
          } else {
            setTimeout(() => {
              btnFinish.classList.remove('btn-active');
              switchPlayer();
              resetPoints();
            }, 500);
          }
        } else if (scores[0] === scores[1] || scores[0] === 21) {
          setTimeout(() => {
            btnFinish.classList.remove('btn-active');
            switchPlayer();
            resetPoints();
          }, 500);
        }
      }
    }
  }
});

btnNew.addEventListener('click', function () {
  init();

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  document.querySelector(`.player--0 .name`).textContent = 'Player 1';
  document.querySelector(`.player--1 .name`).textContent = 'Player 2';

  btnFinish.classList.remove('btn-active');
});
