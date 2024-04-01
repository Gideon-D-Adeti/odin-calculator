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
  displayValue = displayValue.toString();
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
    operator = button.textContent;

    // Check if displayValue is not empty or operator is a minus sign
    if (displayValue !== "" || operator === "-") {
      // Check if the last character is a valid character to add an operator
      if (!"+-x÷".includes(displayValue.at(-1))) {
        // Add operator to displayValue
        displayValue += operator;

        // Update display
        updateDisplay();
      } else if (
        (displayValue.endsWith("x") || displayValue.endsWith("÷")) &&
        operator === "-"
      ) {
        // Allow adding minus sign after multiplication or division
        displayValue += operator;

        // Update display
        updateDisplay();
      }
    }
  });
});

function validateExpression(displayValue) {
  // Check if displayValue is empty
  if (displayValue === "") {
    return false;
  }
  // Check if displayValue ends with an operator
  else if ("+-x÷".includes(displayValue.at(-1))) {
    return false;
  }
  // Check if displayValue is just a number (positive or negative)
  else if (/^-?\d+$/.test(displayValue)) {
    return false;
  }
  // Check if displayValue contains any non-digit characters apart from operators and decimal points
  if (/[^\d+\-x÷.]/.test(displayValue)) {
    // Clear the display
    clearDisplay();
    return;
  } else {
    return true;
  }
}

// Add event listener to equal button
document.querySelector(".equal").addEventListener("click", () => {
  if (validateExpression(displayValue) === false) {
    return; // Do nothing
  }
  // Check if displayValue contains both 'x' and '-'
  if (displayValue.includes("x") && displayValue.includes("-")) {
    operator = "x";
    [firstNumber, secondNumber] = displayValue.split(operator).map(parseFloat);

    // Perform operation with firstNumber and secondNumber
    displayValue = operate("*", firstNumber, secondNumber);

    updateDisplay();
  }
  // Check if displayValue contains both '÷' and '-'
  else if (displayValue.includes("÷") && displayValue.includes("-")) {
    operator = "÷";
    [firstNumber, secondNumber] = displayValue.split(operator).map(parseFloat);

    // Perform operation with firstNumber and secondNumber
    displayValue = operate("/", firstNumber, secondNumber);

    updateDisplay();
  }
  // Check if displayValue contains two minuses as in '-6-6'
  else if (
    displayValue.includes("-") &&
    displayValue.match(/-/g).length === 2
  ) {
    // Find the index of the second minus sign
    const secondMinusIndex = displayValue.lastIndexOf("-");

    // Split displayValue into two parts based on the second minus sign
    firstNumber = parseFloat(displayValue.slice(0, secondMinusIndex));
    secondNumber = parseFloat(displayValue.slice(secondMinusIndex + 1));

    // Perform subtraction operation between firstNumber and secondNumber
    displayValue = operate("-", firstNumber, secondNumber);

    updateDisplay();
  }
  // Check if displayValue contains one minus and no other operator as in '4-6'
  else if (
    displayValue.includes("-") &&
    displayValue.match(/-/g).length === 1 &&
    displayValue.match(/[+x÷]/) === null
  ) {
    operator = "-";
    [firstNumber, secondNumber] = displayValue.split(operator).map(parseFloat);

    // Perform operation with firstNumber and secondNumber
    displayValue = operate("-", firstNumber, secondNumber);

    updateDisplay();
  } else {
    // Split currentQuestion into numbers and operator
    [firstNumber, secondNumber] = displayValue.split(/[+x÷]/).map(parseFloat);
    operator = displayValue.match(/[+x÷]/)[0];

    // Check if numbers are valid
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
      displayValue = "Syntax ERROR";

      updateDisplay();
    } else {
      // Convert 'x' to '*' and '÷' to '/' for calculation
      operator = operator === "x" ? "*" : operator === "÷" ? "/" : operator;

      // Calculate result using operate function
      displayValue = operate(operator, firstNumber, secondNumber);

      updateDisplay();
    }
  }
});
