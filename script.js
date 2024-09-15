// Constants 

const RESULT = -2;
const ERR = -1;
const FIRST_NUMBER = 0;
const OPP = 1;
const SECOND_NUMBER = 2;

const MAX_DECIMALS = 4
const ROUND_FACTOR = Math.pow(10,MAX_DECIMALS);

// Variables to track current state of the calculator

let inputMode = FIRST_NUMBER;
let displayText = "";
const inputStrings = ["", "", ""];

// Connections to nodes
const calculator = document.querySelector(".calculator");
const calcDisplay = document.querySelector(".calc-display input");

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
  if (b==0) {
    inputMode = ERR;
    return "ERR";
  }
  return a/b;
}

function operate(a, opp, b) {
  // Silently convert a and b to numbers
  a = +a;
  b = +b;
  let result;
  switch (opp) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
    default:
      return "ERR";
  }
  return result;
}

// Functions called as-needed
function updateDisplay() {
  if (inputMode===ERR)
    displayText = "ERR";
  if (displayText==="")
    calcDisplay.value = "0";
  else
    calcDisplay.value = displayText;
}

function addToDisplay(s) {
  displayText += s;
  updateDisplay();
}

function updateNumber (s) {
  // Update input mode - either continue first or second number, or switch from opp to second number
  if (inputMode===OPP) {
    inputMode = SECOND_NUMBER;
  } else if (inputMode===RESULT) {
    // Not supported
    return;
  }
  
  // Special handling for decimals
  if (s===".") {
    // If the input string is currently empty, silently input a "0" first
    if (inputStrings[inputMode]==="") {
      updateNumber("0");  
    // Silently do nothing if the input already includes a decimal for this number
    } else if (inputStrings[inputMode].includes(".")) {
      return;
    }
  }

  // Get the operator typed and add it to the display and whichever number we're currently typing
  addToDisplay(s);
  inputStrings[inputMode] += s;
}

function reconstructDisplayText() {
  displayText = inputStrings[0] + inputStrings[1] + inputStrings[2];
}

function updateOperator (s) {
  // If the last number was negated but not specified, change it into zero
  if (inputMode===FIRST_NUMBER || inputMode===SECOND_NUMBER)
  {
    if (inputStrings[inputMode]==="-")
      inputStrings[inputMode] = "-0";
      reconstructDisplayText();
  }
  // If we already have the second number input, operate on it
  if (inputMode===SECOND_NUMBER) {
    operateOnInput();
  }
  // If we were inputting the first number or are in result mode, move on to inputting the operator
  if (inputMode===FIRST_NUMBER || inputMode===RESULT) {
    inputMode = OPP;
    // Check if initial input was empty, and set to 0 if so
    if (inputStrings[0]==="") {
      inputStrings[0] = "0";
      displayText = "0";
    }
  }

  // If an operator is already present, remove and replace it
  if (inputStrings[OPP] !== "") {
    inputStrings[OPP] = "";
    displayText = displayText.slice(0,-1);
  }

  // Get the operator typed and add it to the display and whichever number we're currently typing
  addToDisplay(s);
  inputStrings[OPP] += s;
}

function resetInput() {
  inputMode = FIRST_NUMBER;
  displayText = "";
  inputStrings[0] = "";
  inputStrings[1] = "";
  inputStrings[2] = "";
}

function operateOnInput() {
  // Only do something if current mode is entering the second number
  if (inputMode!==SECOND_NUMBER)
    return;

  let result = operate(...inputStrings);

  if (inputMode===ERR) {
    updateDisplay();
    return;
  }

  resetInput();

  // Set to result mode, to avoid confusion if the user starts typing more numbers next
  inputMode = RESULT;
  inputStrings[FIRST_NUMBER] = String(result);
  
  roundResult = Math.round(result*ROUND_FACTOR)/ROUND_FACTOR;
  displayText = String(roundResult);

  updateDisplay();
}

function negateCurrentInput (s) {
  // Update input mode - if we're on the operatore, move to the second number
  if (inputMode===OPP)
    inputMode = SECOND_NUMBER;

  // Check if the current number is already negated, and handle differently if so
  if (inputStrings[inputMode]!=="" && inputStrings[inputMode][0]=="-")
  {
    inputStrings[inputMode] = inputStrings[inputMode].slice(1);
  } else {
    inputStrings[inputMode] = "-" + inputStrings[inputMode];
  }

  reconstructDisplayText();

  updateDisplay();
}

// Functions to be connected to button presses
function pressNumberButton (e) {
  // Button is non-functional in error and result mode
  if (inputMode===ERR || inputMode===RESULT)
    return;
  updateNumber(e.target.textContent);
}
function pressOppButton (e) {
  // Button is non-functional in error mode
  if (inputMode===ERR)
    return;
  updateOperator(e.target.textContent);
}
function pressClearButton() {
  resetInput();
  updateDisplay();
}
function pressEqualsButton() {
  // Button is non-functional in error and result mode
  if (inputMode===ERR || inputMode===RESULT)
    return;
  operateOnInput();
}
function pressNegateButton() {
  // Button is non-functional in error and result mode
  if (inputMode===ERR || inputMode===RESULT)
    return;
  negateCurrentInput();
}

// Event delegation function for any button press
function pressButton(e) {

  buttonClasses = Array.from(e.target.classList);

  if (buttonClasses.includes("number") || buttonClasses.includes("decimal")) {
    return pressNumberButton(e);
  } else if (buttonClasses.includes("opp")) {
    return pressOppButton(e);
  } else if (buttonClasses.includes("clear")) {
    return pressClearButton(e);
  } else if (buttonClasses.includes("equals")) {
    return pressEqualsButton(e);
  } else if (buttonClasses.includes("negate")) {
    return pressNegateButton(e);
  }
}

// Connect the delegation function to the calculator
calculator.addEventListener("click", pressButton);

// Export the functions we've defined so they can be tested
module.exports = {
  add,
  subtract,
  multiply,
  divide,
  operate
};