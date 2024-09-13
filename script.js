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


// Export the functions we've defined
module.exports = {
  add,
  subtract,
  multiply,
  divide
};