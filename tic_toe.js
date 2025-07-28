const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#Reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true; // Player O starts

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],           // diagonals
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.remove("show");
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations, Winner is ${winner}!`;
    msgContainer.classList.add("show");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const val1 = boxes[a].innerText;
        const val2 = boxes[b].innerText;
        const val3 = boxes[c].innerText;

        if (val1 && val1 === val2 && val2 === val3) {
            showWinner(val1);
            return;
        }
    }

    // Check draw
    const allFilled = [...boxes].every(box => box.innerText !== "");
    if (allFilled) {
        msg.innerText = "🤝 It's a Draw!";
        msgContainer.classList.add("show");
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;

        box.innerText = turnO ? "O" : "X";
        box.disabled = true;
        checkWinner();
        turnO = !turnO;
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
