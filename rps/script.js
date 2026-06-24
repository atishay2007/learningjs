console.log("JS is connected");

let choice = null;
document.querySelector("#rockBtn").addEventListener("click", () => selectChoice(0));
document.querySelector("#paperBtn").addEventListener("click", () => selectChoice(1));
document.querySelector("#scissorsBtn").addEventListener("click", () => selectChoice(2));
//document.querySelector("#playBtn").addEventListener("click", play);

//const showOption = document.querySelector("#option");
const keys = ["Rock", "Paper", "Scissors"];

const result = document.querySelector("#result");
const choices = document.querySelector("#choices");
const history = document.querySelector("#history");
const playerScoreLog = document.querySelector("#player")
const computerScoreLog = document.querySelector("#computer")
const totalLog = document.querySelector("#total")

document.getElementById("resetBtn").addEventListener("click", reset)
let playerScore = 0;
let computerScore = 0;
let resultType;
let total = 0;

function selectChoice(index) {
    choice = index;
    play();
}

function showScore() {
    playerScoreLog.textContent = `Your Score: ${playerScore}`;
    computerScoreLog.textContent = `Computer Score: ${computerScore}`;
    totalLog.textContent = `Total Games: ${total}`;
}

function play() {
    let rand = Math.floor(Math.random() * 3);

    if (choice === null) {
        alert("Please Select An Option!")
        result.textContent = "Please select an option";
        return;
    }

    choices.textContent = `You selected ${keys[choice]} and computer selected ${keys[rand]}`;

    if (choice === rand) {
        result.textContent = "Its A Tie!";
        resultType = "tie";
    }
    else if (choice - 1 === rand || choice + 2 === rand) {
        result.textContent = "You Win!";
        playerScore++;
        resultType = "win";
    }
    else {
        result.textContent = "Computer Wins!";
        computerScore++;
        resultType = "loss";
    }
    total++;
    showScore();

    const row = document.createElement("tr");

    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    const cell3 = document.createElement("td");
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.classList.add(resultType);

    cell1.textContent = keys[choice];
    cell2.textContent = keys[rand];
    cell3.textContent = result.textContent;

    history.prepend(row);
}

function reset() {
    playerScore = 0;
    computerScore = 0;
    total = 0;

    choice = null;

    history.innerHTML = "";

    result.textContent = "";
    choices.textContent = "";

    showScore();
}