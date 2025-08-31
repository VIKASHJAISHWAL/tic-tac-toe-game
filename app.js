document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".box");
    let resetButton = document.querySelector("#Reset-button");
    let newGameBtn = document.querySelector("#new-btn");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");

    let turn = true; // true -> Player O, false -> Player X

    const winPattern = [
        [0,1,2], [3,4,5], [6,7,8], // Rows
        [0,3,6], [1,4,7], [2,5,8], // Columns
        [0,4,8], [2,4,6]           // Diagonals
    ];

    const resetGame = () => {
        boxes.forEach((box) => {
            box.innerText = "";
            box.disabled = false;
        });
        msgContainer.classList.add("hide");
        turn = true;
    };

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (turn) { 
                box.innerText = "O";
                box.style.color = "red";
                turn = false;
            } else { 
                box.innerText = "X";
                box.style.color = "blue";
                turn = true;
            }
            box.disabled = true;
            checkWinner();
        });
    });

    const showWinner = (winner) => {
        msg.innerText = `🎉 Congratulations, ${winner} Wins! 🎉`;
        msgContainer.classList.remove("hide");

        // Disable all boxes after win
        boxes.forEach(box => box.disabled = true);
    };

    const checkWinner = () => {
        for (let pattern of winPattern) {
            let pos1 = boxes[pattern[0]].innerText;
            let pos2 = boxes[pattern[1]].innerText;
            let pos3 = boxes[pattern[2]].innerText;

            if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return;
            }
        }

        // Check for draw
        if ([...boxes].every(box => box.innerText !== "")) {
            msg.innerText = "It's a Draw! 😐";
            msgContainer.classList.remove("hide");
        }
    };

    resetButton.addEventListener("click", resetGame);
    newGameBtn.addEventListener("click", resetGame);
});



