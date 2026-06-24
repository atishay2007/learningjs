console.log("JS is connected");
let count = 0;
const countElement = document.getElementById("count");

function updateDisplay() {
    countElement.textContent = count;
}

function increase() {
    alert("You clicked the increase button!");
    count++;
    console.log(count);
    updateDisplay();
}

function decrease() {
    count--;
    console.log(count);
    updateDisplay();
}

function reset() {
    count = 0;
    console.log(count);
    updateDisplay();
}

