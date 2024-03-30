function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Math ERROR";
  }

  return a / b;
}

let firstNumber, operator, secondNumber;

function operate(operator, firstNumber, secondNumber) {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
    case "*":
      return multiply(firstNumber, secondNumber);
    case "/":
      return divide(firstNumber, secondNumber);
    default:
      return "Syntax ERROR";
  }
}

// Select display elements
const display = document.querySelector(".display");

// Initialize display variable
let displayValue = ""; // Store current expression

// Function to update display
function updateDisplay() {
  display.textContent = displayValue;
}

// Function to clear display
function clearDisplay() {
  displayValue = "";
  updateDisplay();
}

// Function to handle backspace
function backspace() {
  displayValue = displayValue.slice(0, -1);
  updateDisplay();
}

// Add event listener to number buttons
document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => {
    displayValue += button.textContent;
    updateDisplay();
  });
});

// Add event listener to clear button
document.querySelector(".clear").addEventListener("click", () => {
  clearDisplay();
});

// Add event listener to backspace button
document.querySelector(".backspace").addEventListener("click", () => {
  backspace();
});

// Add event listener to operator buttons
document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", () => {
    displayValue += `${button.textContent}`;
    updateDisplay();
  });
});
