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
  
  // Special handling for decimals
  if (s===".") {
    // If the input string is currently empty, silently input a "0" first
    if (inputStrings[inputIndex]==="") {
      updateNumber("0");  
    // Silently do nothing if the input already includes a decimal for this number
    } else if (inputStrings[inputIndex].includes(".")) {
      return;
    }
  }

  // Get the operator typed and add it to the display and whichever number we're currently typing
  addToDisplay(s);
  inputStrings[inputIndex] += s;
}

function updateOperator (s) {
  // Update input mode - if first number, move onto operator. If second number, operate then move onto new second number
  if (inputMode===FIRST_NUMBER) {
    inputMode = OPP;
    // Check if initial input was empty, and set to 0 if so
    if (inputStrings[0]==="") {
      inputStrings[0] = "0";
      displayText = "0";
    }
  } else if (inputMode===SECOND_NUMBER) {
    // TODO - operate
  }

  let inputIndex = getInputIndex(); // Will be 1

  // If an operator is already present, remove and replace it
  if (inputStrings[inputIndex] !== "") {
    inputStrings[inputIndex] = "";
    displayText = displayText.slice(0,-1);
  }

  // Get the operator typed and add it to the display and whichever number we're currently typing
  addToDisplay(s);
  inputStrings[inputIndex] += s;
}

// Functions to be connected to button presses
function pressNumberButton (e) {
  updateNumber(e.target.textContent);
}
function pressOppButton (e) {
  updateOperator(e.target.textContent);
}
function pressClearButton() {
  inputMode = FIRST_NUMBER;
  displayText = "";
  inputStrings[0] = "";
  inputStrings[1] = "";
  inputStrings[2] = "";
  updateDisplay();
}

// Connect functions to each button
for (const buttonRow of calcButtons.children) {
  for (const button of buttonRow.children) {

    buttonClasses = Array.from(button.classList);

    if (buttonClasses.includes("number") || buttonClasses.includes("decimal")) {
      button.addEventListener("click", pressNumberButton);
    } else if (buttonClasses.includes("opp")) {
      button.addEventListener("click", pressOppButton);
    } else if (buttonClasses.includes("clear")) {
      button.addEventListener("click", pressClearButton);
    }
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