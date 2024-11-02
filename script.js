const display = document.getElementById("display");
const buttons = document.querySelectorAll("div.button");

let previousNumber = "";
let currentNumber = "";
let operation = "";

function appendNumber(number) {
  if (currentNumber == "0") {
    currentNumber = number.toString();
    updateDisplay();
    return;
  }
  currentNumber += number;
  updateDisplay();
}

function deleteEntry() {
  if (currentNumber !== "") {
    currentNumber = Math.floor(currentNumber / 10).toString();
    if (currentNumber == 0) currentNumber = "";
    updateDisplay();
    return;
  }

  if (operation !== "") {
    operation = "";
    updateDisplay();
    return;
  }

  if (previousNumber !== "") {
    previousNumber = Math.floor(previousNumber / 10).toString();
    if (previousNumber == 0) previousNumber = "";
    updateDisplay();
    return;
  }
}

function setOperation(_operation) {
  if (currentNumber === "") return; // if there's not numbers currently, we cannot display and set an operator

  if (isEntryExpression()) {
    calculate();
  }

  operation = _operation;

  previousNumber = currentNumber;
  display.innerText = `${previousNumber} ${operation}`;
  currentNumber = "";
}

function calculate() {
  if (previousNumber == "") {
    // if there's no numbers that has already been inserted, we cannot perform any calculation
    return;
  }

  let result;

  const prev = parseFloat(previousNumber);
  const current = parseFloat(currentNumber);

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }

  currentNumber = result;
  operation = "";
  previousNumber = "";
  updateDisplay();
}

function updateDisplay() {
  display.innerText = `${previousNumber} ${operation} ${currentNumber}`;
}

function clearEntry(clearType) {
  if (clearType == "all") {
    display.innerText = "";
    currentNumber = "";
    operation = "";
    previousNumber = "";
    return;
  }
  if (clearType == "single") {
    if (isEntryExpression()) {
      if (currentNumber !== "") {
        currentNumber = "0";
        updateDisplay();
        return;
      }
    } else {
      currentNumber = "0";
      updateDisplay();
    }
  }
}

isEntryExpression = () => {
  if ((previousNumber !== "") & (operation !== "") & (currentNumber !== "")) {
    return true;
  }
  return false;
};
