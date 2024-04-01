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
    // Get the equal button element
    const equalButton = document.querySelector(".equal");

    if (isValidExpression(displayValue)) {
      // Trigger the click event on the equal button
      equalButton.click();
    }

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

// Function to check if the expression is valid after an operator is pressed
function isValidExpression(displayValue) {
  // Regular expression pattern to match a valid expression
  const pattern = /(-?\d+(\.\d+)?)[+\-x÷]+(-?\d+(\.\d+)?)/;

  // Check if the current expression matches the pattern
  return pattern.test(displayValue);
}

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
    return "error";
  } else {
    return true;
  }
}

// Add event listener to equal button
document.querySelector(".equal").addEventListener("click", () => {
  if (validateExpression(displayValue) === false) {
    return; // Do nothing
  } else if (validateExpression(displayValue) === "error") {
    displayValue = "Syntax ERROR";
    updateDisplay();
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

// Add event listener to the decimal button
document.querySelector(".decimal").addEventListener("click", () => {
  // Check if the current expression is empty or the previous value is an operator
  if (displayValue === "" || "+-x÷".includes(displayValue.at(-1))) {
    // If the current expression is empty or the previous value is an operator, add "0." to the expression
    displayValue += "0.";
  } else {
    // Check if the second number in the current expression already contains a decimal point
    const numbers = displayValue.split(/[+\-x÷]/);
    const lastNumber = numbers.at(-1);
    if (!lastNumber.includes(".")) {
      // If the second number doesn't already contain a decimal point, add "." to the expression
      displayValue += ".";
    } else {
      return; // Do nothing
    }
  }
  // Update the display
  updateDisplay();
});

// Add event listener to the percentage button
document.querySelector(".percent").addEventListener("click", () => {
  // Check if the display value is empty or ends with an operator
  if (displayValue === "" || "+-x÷".includes(displayValue.at(-1))) {
    return; // Do nothing if the conditions are not met
  }

  // Define a regular expression to match numbers in the expression
  const numberRegex = /-?\d+(\.\d+)?/g;

  // Extract numbers from the display value
  const numbers = displayValue.match(numberRegex);

  // Get the last number from the extracted numbers
  const lastNumber = numbers[numbers.length - 1];

  // Check if the last number exists and is not empty
  if (lastNumber) {
    // Calculate the percentage of the last number
    const parsedLastNumber = parseFloat(lastNumber);
    const percentage = parsedLastNumber / 100;

    // Replace the last number with its percentage value
    const modifiedExpression = displayValue.replace(
      new RegExp(`${lastNumber}$`),
      percentage.toString()
    );

    // Update the display value
    displayValue = modifiedExpression;

    // Update the display
    updateDisplay();
  }
});
