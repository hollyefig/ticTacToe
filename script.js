const boardWrapper = document.querySelector(".boardWrapper"),
  winner = document.querySelector(".winner"),
  p1Select = document.getElementById("p1Select"),
  p1Color = document.getElementById("p1Color"),
  p2Select = document.getElementById("p2Select"),
  p2Color = document.getElementById("p2Color");

let firstPlayerTurn = true,
  gameboardObj = {},
  gameOver = false,
  playerx = [],
  playero = [],
  p1Score = Number(document.querySelector(".p1Score").textContent),
  p2Score = Number(document.querySelector(".p2Score").textContent);

const winKeys = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// clear board
const clearBoard = () => {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((e) => (e.textContent = ""));
  playerx = [];
  playero = [];
  winner.textContent = "";
  gameOver = false;
  firstPlayerTurn = true;
};

// score tracker
const scoreboard = () => {
  const checker = (arr, target) => target.every((v) => arr.includes(v));

  winKeys.forEach((w) => {
    if (checker(playerx, w)) {
      gameOver = true;
      winner.textContent = "Player 1 wins!";
      p1Score = p1Score + 1;
      document.querySelector(".p1Score").textContent = p1Score;
    }
    if (checker(playero, w)) {
      gameOver = true;
      winner.textContent = "Player 2 wins!";
      p2Score = p2Score + 1;
      document.querySelector(".p2Score").textContent = p2Score;
    }
  });

  console.log(p1Score);
};

// create the game
const createGameboard = (() => {
  let gameboardArray = [];
  for (let i = 0; i < 9; i++) {
    let box = document.createElement("div");
    box.setAttribute("onclick", "marked(this)");
    box.setAttribute("class", "box material-symbols-outlined");
    box.setAttribute("data-index", i);
    boardWrapper.appendChild(box);
    gameboardArray[i] = { i };
  }
  gameboardObj = { gameboardArray };
})();

// when a square is clicked
const marked = (e) => {
  if (gameOver === true) {
    return null;
  } else {
    if (e.textContent !== "") {
      null;
    } else {
      firstPlayerTurn === true
        ? ((e.textContent = p1Select.value),
          e.setAttribute("style", `color: ${p1Color.value}`),
          (firstPlayerTurn = false),
          playerx.push(Number(e.getAttribute("data-index"))))
        : ((e.textContent = p2Select.value),
          e.setAttribute("style", `color: ${p2Color.value}`),
          (firstPlayerTurn = true),
          playero.push(Number(e.getAttribute("data-index"))));
    }
  }

  //  enter to scoreboard
  scoreboard();
};
