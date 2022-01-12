let gameState = {};
const WINNING_COMBINATIONS = [
  ["0", "1", "2"],
  ["0", "3", "6"],
  ["3", "4", "5"],
  ["6", "7", "8"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["0", "4", "8"],
  ["2", "4", "6"],
];

(function () {
  init();
})();
const tdElements = document.querySelectorAll("td");
const winner_message = document.getElementById("winner");

tdElements.forEach(function (tdElement) {
  tdElement.addEventListener("click", function (event) {
    updateGameBoard(event.target.id);

    gameState.player1.selections.forEach(function (selection) {
      document.getElementById(selection).innerHTML = "X";
    });
    gameState.player2.selections.forEach(function (selection) {
      document.getElementById(selection).innerHTML = "O";
    });
  });
});

function init() {
  gameState = {
    player1: {
      selections: [],
      name: "",
      type: "X",
    },
    player2: {
      selections: [],
      name: "",
      type: "O",
    },
    player1Turn: true,
    winner: null,
  };
}

function updateGameBoard(cell) {
  if (alreadySelected(cell)) {
    return;
  }
  if (gameState.player1Turn) {
    gameState.player1.selections.push(cell);
    gameState.player1Turn = false;
  } else {
    gameState.player2.selections.push(cell);
    gameState.player1Turn = true;
  }
  check_no_moves();
  checkWinner();
}

function checkWinner() {
  const player1Won = isWinner(gameState.player1.selections);
  const player2Won = isWinner(gameState.player2.selections);

  if (player1Won) {
    winner_message.innerText = "Winner is player1!!";
    winner_message.classList.add("win");
  } else if (player2Won) {
    winner_message.innerText = "Winner is player2!!";
    winner_message.classList.add("win");
  }
}

function isWinner(selections) {
  console.log("isWinner");
  return WINNING_COMBINATIONS.some(function (winningCombo) {
    return winningCombo.every(function (value) {
      return selections.includes(value);
    });
  });
}

function alreadySelected(cell) {
  if (
    gameState.player1.selections.includes(cell) ||
    gameState.player2.selections.includes(cell)
  ) {
    return true;
  }
  return false;
}

const reset_board = () => {
  init();
  console.log("reset game");
  tdElements.forEach(function (cell) {
    cell.innerHTML = "";
  });
  winner_message.innerText = "";
};

check_no_moves = () => {
  let all_selections = gameState.player1.selections.concat(
    gameState.player2.selections
  );
  if (all_selections.length == 9) {
    winner_message.innerText = "No More Moves!!! It's a Tie";
    winner_message.classList.add("tie");
  }
};
