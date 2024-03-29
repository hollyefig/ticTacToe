const bottom = document.getElementById("bottom"),
  boardWrapper = document.querySelector(".boardWrapper"),
  winner = document.querySelector(".winsh4"),
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
  p2Score = Number(document.querySelector(".p2Score").textContent),
  p1Name = "Player 1",
  p2Name = "Player 2";

// name changer
const nameChange = (e) => {
  e.id === "p1Name" ? (p1Name = e.value) : (p2Name = e.value);
};

// click start game
const startGame = () => {
  document.getElementById("wrapper").classList.remove("wrapperStart");
  document.getElementById("topbar").classList.remove("topbarStart");
  setTimeout(() => {
    bottom.classList.add("bottomHeight");
  }, 300);
  setTimeout(() => {
    boardWrapper.classList.remove("boardWrapperTop");
  }, 600);

  document.getElementById("startButton").classList.add("opacityOff");
  setTimeout(() => {
    document.getElementById("startButton").classList.add("displayNone");
    document.getElementById("scoreBoard").classList.remove("displayNone");
  }, 200);

  setTimeout(() => {
    document.getElementById("scoreBoard").classList.remove("opacityOff");
  }, 400);
};

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
  document.querySelector(".winnerName").textContent = "";
  gameOver = false;
  firstPlayerTurn = true;
};

// score tracker
const scoreboard = () => {
  const checker = (arr, target) => target.every((v) => arr.includes(v));
  const box = new Array(...document.querySelectorAll(".box"));

  winKeys.forEach((w) => {
    if (checker(playerx, w)) {
      gameOver = true;
      document.querySelector(".winnerName").textContent = p1Name;
      winner.textContent = "wins!";
      p1Score += 1;
      document.querySelector(".p1Score").textContent = p1Score;
    }
    if (checker(playero, w)) {
      gameOver = true;
      document.querySelector(".winnerName").textContent = p2Name;
      winner.textContent = "wins!";
      p2Score += 1;
      document.querySelector(".p2Score").textContent = p2Score;
    }
    if (
      checker(playerx, w) === false &&
      checker(playero, w) === false &&
      box.every((e) => e.textContent !== "")
    ) {
      document.querySelector(".winnerName").textContent = "Tie game!";
    }
  });
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
