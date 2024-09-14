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


// Export the functions we've defined
module.exports = {
  add,
  subtract,
  multiply,
  divide,
  operate
};