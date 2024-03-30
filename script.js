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
const questionDisplay = document.querySelector(".question");
const answerDisplay = document.querySelector(".answer");

// Initialize display variables
let currentQuestion = ""; // Store current expression
let currentAnswer = ""; // Store current answer

// Function to update display
function updateDisplay() {
  questionDisplay.textContent = currentQuestion;
  answerDisplay.textContent = currentAnswer;
}

// Function to clear display
function clearDisplay() {
  currentQuestion = "";
  currentAnswer = "";
  updateDisplay();
}

// Function to handle backspace
function backspace() {
  currentQuestion = currentQuestion.slice(0, -1);
  updateDisplay();
}
