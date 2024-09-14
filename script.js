// Define basic calculator functions

function add(a, b) {
  return a+b;
}

function subtract(a, b) {
  return a-b;
}

function multiply(a, b) {
  return a*b;
}

function divide(a, b) {
  return a/b;
}

function operate(a, opp, b) {
  // Silently convert a and b to numbers
  a = +a;
  b = +b;
  switch (opp) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "ERR";
  }
}

// Connections to nodes
const calcDisplay = document.querySelector(".calc-display input");
const calcButtons = document.querySelector(".calc-buttons");

// Variables to track current state of the calculator

const FIRST_NUMBER = 0;
const OPP = 1;
const SECOND_NUMBER = 2;

let inputMode = FIRST_NUMBER;
let displayText = "";
let firstNumberString;
let oppString;
let secondNumberString;

// Functions called as-needed
function updateDisplay() {
  if (displayText==="")
    calcDisplay.value = "0";
  else
    calcDisplay.value = displayText;
}

function addToDisplay(s) {
  displayText += s;
  updateDisplay();
}

// Functions to be connected to button presses
function pressNumberButton (e) {
  // Update input mode - either continue first or second number, or switch from opp to second number
  if (inputMode===OPP)
    inputMode = SECOND_NUMBER;

  // Get the number typed and add it to the display and whichever number we're currently typing
  let digitString = e.target.textContent;
  addToDisplay(digitString);

  if (inputMode===FIRST_NUMBER) {
    firstNumberString += digitString;
  } else {
    secondNumberString += digitString;
  }

}

// Connect functions to each button
for (const buttonRow of calcButtons.children) {
  for (const button of buttonRow.children) {
    buttonClasses = Array.from(button.classList);
    if (buttonClasses.includes("number")) {
      button.addEventListener("click", pressNumberButton);
    } // TODO else...
  }
}

// Export the functions we've defined so they can be tested
module.exports = {
  add,
  subtract,
  multiply,
  divide,
  operate
};