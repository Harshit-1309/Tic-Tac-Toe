let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgCont = document.querySelector(".msg");
let msg = document.querySelector("#msg");
let darkMode = document.querySelector("#mode");

let turnO = true;
let count = 0;
let currDark = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgCont.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    count++;
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
    checkDraw();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const showWinner = (winner) => {
  msg.innerText = `Congratulations! ${winner} is the Winner.`;
  msgCont.classList.remove("hide");
  disableBoxes();
  count = 0;
};
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let val1 = boxes[pattern[0]].innerText;
    let val2 = boxes[pattern[1]].innerText;
    let val3 = boxes[pattern[2]].innerText;

    if (val1 != "" && val2 != "" && val3 != "") {
      if (val1 === val2 && val2 === val3) {
        showWinner(val1);
      }
    }
  }
};

const checkDraw = () => {
  if (count === 9) {
    msg.innerText = "Oops!! Its a TIE.";
    msgCont.classList.remove("hide");
    disableBoxes();
  }
};

const switchMode = () => {
  if (currDark) {
    //Body
    document.body.classList.remove("dark");
    // Dark Mode Button
    darkMode.classList.add("switchModeDark");
    darkMode.classList.remove("switchMode");
    //Dark Mode Text
    darkMode.innerText = "Dark Mode";
    // Reset Button
    resetBtn.classList.remove("resetDark");
    resetBtn.classList.add("reset-btn");
    //New Game Button
    newGameBtn.classList.remove("newDark");
    newGameBtn.classList.add("new-btn");
    // Win Msg
    msg.classList.remove("msgDark");
    msg.classList.add("msgLight");
    currDark = false;
  } else {
    //Body
    document.body.classList.add("dark");
    // Dark Mode Button
    darkMode.classList.add("switchMode");
    darkMode.classList.remove("switchModeDark");
    //Dark Mode Text
    darkMode.innerText = "Light Mode";
    //Reset Button
    resetBtn.classList.add("resetDark");
    resetBtn.classList.remove("reset-btn");
    //New Game Button
    newGameBtn.classList.remove("new-btn");
    newGameBtn.classList.add("newDark");
    // Win Message
    msg.classList.remove("msgLight");
    msg.classList.add("msgDark");
    currDark = true;
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
darkMode.addEventListener("click", switchMode);
