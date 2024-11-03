const display = document.getElementById("display");
const buttons = document.querySelectorAll("div.button");

const calculatorState = {
    previousNumber: "",
    currentNumber: "",
    operation: ""
}

function appendNumber(number) {
    calculatorState.currentNumber += number;
    updateDisplay(calculatorState.previousNumber, calculatorState.operation, calculatorState.currentNumber);
}

function deleteEntry() {
    if (deleteValue(calculatorState, "currentNumber")) return;
    if (deleteValue(calculatorState, "operation", true)) return;
    if (deleteValue(calculatorState, "previousNumber")) return;
}

function setOperation(_operation) {
    // if there's not numbers currently, we cannot display and set an operator
    if (calculatorState.operation !== "" || (calculatorState.currentNumber === "" && calculatorState.previousNumber === "")) return;

    if (calculatorState.previousNumber !== "" && calculatorState.operation !== "" && calculatorState.currentNumber !== "") { // if we alredy have an operation, first we calculate this
        calculate();   // operation and the result will become the previousNumber
    }

    calculatorState.operation = _operation;

    //when an operation is inserted, if there's not previous number, we set the previous number to current number
    if (calculatorState.currentNumber !== '') calculatorState.previousNumber = calculatorState.currentNumber;
    updateDisplay(calculatorState.previousNumber, calculatorState.operation);
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
    updateDisplay(calculatorState.previousNumber, calculatorState.operation, calculatorState.currentNumber);
}

function clearEntry(type) {
    if (type == "all") {
        updateDisplay(); // remove all entries from display
        clearAllStateKeys(calculatorState); // clear the state
        return;
    }
    if (type == "single") {
        if (clearStateKey(calculatorState, "currentNumber")) return;
        if (clearStateKey(calculatorState, "operation")) return;
        if (clearStateKey(calculatorState, "previousNumber")) return;
    }
}

function updateDisplay(previousNumber = "", operation = "", currentNumber = "") {
    display.innerText = `${previousNumber} ${operation} ${currentNumber}`.trim();
}

function truncateNumber(number) {
    const truncated = Math.floor(number / 10).toString();
    return truncated === "0" ? "" : truncated;
}

function deleteValue(state, key, isOperator = false) {
    if (state[key] !== "") {
        state[key] = isOperator ? "" : truncateNumber(state[key]);
        updateDisplay(calculatorState.previousNumber, calculatorState.operation, calculatorState.currentNumber);
        return true;
    }
    return false;
}

function clearStateKey(state, key) {
    if (state[key] !== "") {
        state[key] = ""
        updateDisplay(calculatorState.previousNumber, calculatorState.operation, calculatorState.currentNumber);
        return true;
    }
    return false;
}

function clearAllStateKeys(state) {
    for (const key of Object.keys(state)) {
        clearStateKey(state, key);
    }
}