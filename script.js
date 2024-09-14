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
const inputStrings = ["", "", ""];

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

function getInputIndex() {
  switch (inputMode) {
    case FIRST_NUMBER:
      return 0;
    case OPP:
      return 1;
    case SECOND_NUMBER:
      return 2;
    default:
      return -1;
  }
}

function updateNumber (s) {
  // Update input mode - either continue first or second number, or switch from opp to second number
  if (inputMode===OPP)
    inputMode = SECOND_NUMBER;

  let inputIndex = getInputIndex(); // Will be 0 or 2
  
  // If we're inputting a decimal and the input string is currently empty, silently input a "0" first
  if (s==="." && inputStrings[inputIndex]==="")
    updateNumber("0");

  // Get the number typed and add it to the display and whichever number we're currently typing
  addToDisplay(s);
  inputStrings[inputIndex] += s;
}

// Functions to be connected to button presses
function pressNumberButton (e) {
  updateNumber(e.target.textContent);
}

// Connect functions to each button
for (const buttonRow of calcButtons.children) {
  for (const button of buttonRow.children) {
    buttonClasses = Array.from(button.classList);
    if (buttonClasses.includes("number") || buttonClasses.includes("decimal")) {
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