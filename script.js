const display = document.getElementById("display");
const buttons = document.querySelectorAll("div.button");



const calculatorState = {
    previousNumber: "",
    currentNumber: "",
    operation: ""
}

function appendNumber(number) {
    if (calculatorState.currentNumber == "0") {
        calculatorState.currentNumber = number.toString();
        updateDisplay();
        return;
    }
    calculatorState.currentNumber += number;
    updateDisplay();
}

function deleteEntry() {
    if (deleteNumber(calculatorState, "currentNumber")) return;
    if (clearOperation(calculatorState)) return;
    if (deleteNumber(calculatorState, "previousNumber")) return;
  }

  function deleteNumber(state, key) {
    if (state[key] !== "") {
      state[key] = truncateNumber(state[key]);
      updateDisplay();
      return true;
    }
    return false;
  }

function clearOperation(state) {
  if (state.operation !== "") {
    state.operation = "";
    updateDisplay();
    return true;
  }
  return false;
}

function truncateNumber(number) {
  const truncated = Math.floor(number / 10).toString();
  return truncated === "0" ? "" : truncated;
}

function setOperation(_operation) {
    if (calculatorState.currentNumber === "" && calculatorState.previousNumber === "") return; // if there's not numbers currently, we cannot display and set an operator

    if (isEntryExpression()) {
        calculate();
    }

    calculatorState.operation = _operation;

    if(calculatorState.currentNumber !== '' ) calculatorState.previousNumber = calculatorState.currentNumber;
    display.innerText = `${calculatorState.previousNumber} ${calculatorState.operation}`;
    calculatorState.currentNumber = "";
}

function calculate() {
    if (calculatorState.previousNumber == "") {
        // if there's no numbers that has already been inserted, we cannot perform any calculation
        return;
    }

    let result;

    const prev = parseFloat(calculatorState.previousNumber);
    const current = parseFloat(calculatorState.currentNumber);

    switch (calculatorState.operation) {
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

    calculatorState.currentNumber = result;
    calculatorState.operation = "";
    calculatorState.previousNumber = "";
    updateDisplay();
}

function updateDisplay() {
    display.innerText = `${calculatorState.previousNumber} ${calculatorState.operation} ${calculatorState.currentNumber}`;
}

function clearEntry(clearType) {
    if (clearType == "all") {
        display.innerText = "";
        calculatorState.currentNumber = "";
        calculatorState.operation = "";
        calculatorState.previousNumber = "";
        return;
    }
    if (clearType == "single") {
        if (isEntryExpression()) {
            if (calculatorState.currentNumber !== "") {
                calculatorState.currentNumber = "0";
                updateDisplay();
                return;
            }
        } else {
            calculatorState.currentNumber = "0";
            updateDisplay();
        }
    }
}

isEntryExpression = () => {
    if ((calculatorState.previousNumber !== "") & (calculatorState.operation !== "") & (calculatorState.currentNumber !== "")) {
        return true;
    }
    return false;
};
