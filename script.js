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

function appendDot() {
    calculatorState.currentNumber += '.';
    updateDisplay(calculatorState.previousNumber, calculatorState.operation, calculatorState.currentNumber);
}

function deleteEntry() {
    if (deleteValue(calculatorState, "currentNumber")) return;
    if (deleteValue(calculatorState, "operation", true)) return;
    if (deleteValue(calculatorState, "previousNumber")) return;
}

function setOperation(_operation) {
    // if there's not numbers currently, we cannot display and set an operator
    if (calculatorState.currentNumber === "" && calculatorState.previousNumber === "") return;
    // if we insert an operation when we already have an expression, we calculate this expression
    calculate();   // and the result will be the previous number 
    //when an operation is inserted, if there's not previous number, we set the previous number to current number
    setCalculatorState({
        previousNumber: calculatorState.currentNumber !== ''? calculatorState.currentNumber: calculatorState.previousNumber, 
        operation: _operation, 
        currentNumber: ''
    });
}

function calculate() {
    // if there's no expression present, we can't perform any calculation
    if (!isExpressionPresent()) return;

    let result;
    const prev = parseFloat(calculatorState.previousNumber);
    const current = parseFloat(calculatorState.currentNumber);

    switch (calculatorState.operation) { // we perform the operation
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

    setCalculatorState({
        previousNumber: result,  
        operation: '', 
        currentNumber: ''
    });
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

function updateStateKey(state, key, newValue) {
    if(state[key] !== newValue) { //if the new value has not been setted yet, we update it
        state[key] = newValue;
        updateDisplay(state.previousNumber, state.operation, state.currentNumber);
        return true;
    }
    return false;
}

function deleteValue(state, key, isOperator = false) {
    return updateStateKey(state, key, isOperator ? "" : truncateNumber(state[key]))
}

function clearStateKey(state, key) {
    return updateStateKey(state, key, "");
}

function clearAllStateKeys(state) {
    for(const key of Object.keys(state)) {
        updateStateKey(state, key, "");
    }
}

function setCalculatorState({ previousNumber = calculatorState.previousNumber, operation = calculatorState.operation, currentNumber = calculatorState.currentNumber } = {}) {
    updateStateKey(calculatorState, "previousNumber", previousNumber);
    updateStateKey(calculatorState, "operation", operation);
    updateStateKey(calculatorState, "currentNumber", currentNumber);
    updateDisplay(calculatorState.previousNumber, calculatorState.operation, calculatorState.currentNumber);
}

isExpressionPresent = () => { // we check if an expression has been inserted, by checking if every key has a value
    return Object.values(calculatorState).every(x => x !== '');
}