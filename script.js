let boxes = document.querySelectorAll(".box");
let backBtn = document.querySelector("#back");
let resetBtn = document.querySelector("#reset");
let msgContnr = document.querySelector(".msgContnr");
let newGmBtn = document.querySelector("#newGame");
let msg = document.querySelector("#msg");
let drawMsg = document.querySelector(".draw"); // Select draw message

let turnO = true; // Player X starts
let moves = []; // To track the moves made

let winnings = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const showWinner = (winner) => {
    msg.innerText = winner === "Draw" ? "It's a draw!" : `Congrats, the winner is ${winner}`;
    msgContnr.classList.remove("hide");
    drawMsg.classList.add("hidden"); // Hide draw message if there is a winner
    disableAllBoxes(); // Disable all boxes after showing the winner or draw
};

const disableAllBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true; // Disable all boxes
    });
};

const checkWinner = () => {
    for (let wins of winnings) {
        let pos1val = boxes[wins[0]].innerText;
        let pos2val = boxes[wins[1]].innerText;
        let pos3val = boxes[wins[2]].innerText;
        if (pos1val && pos1val === pos2val && pos2val === pos3val) {
            showWinner(pos1val); // If we have a winner
            backBtn.disabled = true;
            return; // Exit the function once we found a winner
        }
    }

    // Check for a draw using the every method
    if ([...boxes].every(box => box.innerText !== "")) {
        showWinner("Draw");
        backBtn.disabled = true;
    }
};

const enableAllBoxes = () => {
    for (let box of boxes) {
        box.disabled = false; // Enable all boxes
        box.innerText = ""; // Clear the box
    }
};

const reset = () => {
    turnO = true; // Reset turn to player X
    enableAllBoxes(); // Enable all boxes and clear them
    msgContnr.classList.add("hide"); // Hide message container
    moves = []; // Clear moves history
};

const backMove = () => {
    if (moves.length > 0) {
        let lastMove = moves.pop(); // Get the last move
        boxes[lastMove.index].innerText = ""; // Clear the last move box
        boxes[lastMove.index].disabled = false; // Enable the box again
        turnO = lastMove.turnO; // Revert turn to the player who made the last move
        msgContnr.classList.add("hide"); // Hide the message container after back move

        // Enable all empty boxes after backing up
        boxes.forEach((box) => {
            if (box.innerText === "") {
                box.disabled = false; // Enable only empty boxes
            }
        });
    }
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        // Only allow clicking if box is empty
        if (box.innerText === "") {
            if (turnO) {
                box.innerText = "X";
                box.style.color = "#255957";
                moves.push({ index: index, turnO: turnO });
                turnO = false; // Switch turn
            } else {
                box.innerText = "O";
                box.style.color = "#96031A"; // Color for O
                moves.push({ index: index, turnO: turnO });
                turnO = true; // Switch turn
            }
            box.disabled = true; // Disable the clicked box
            checkWinner(); // Check for winner or draw
        }
    });
});

// Add event listeners for buttons
resetBtn.addEventListener("click", reset);
newGmBtn.addEventListener("click", reset);
backBtn.addEventListener("click", backMove);
