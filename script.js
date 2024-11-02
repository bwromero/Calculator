const display = document.getElementById("display");
const buttons = document.querySelectorAll("div.button");

const calculatorState = {
    previousNumber: "",
    currentNumber: "",
    operation: ""
}

function appendNumber(number) {
    calculatorState.currentNumber += number;
    updateDisplay();
}

function deleteEntry() {
    if (deleteValue(calculatorState, "currentNumber")) return;
    if (deleteValue(calculatorState, "operation", true)) return;
    if (deleteValue(calculatorState, "previousNumber")) return;
}

function deleteValue(state, key, isOperator = false) {
    if (state[key] !== "") {
        state[key] = isOperator ? "" : truncateNumber(state[key]);
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

    if (isEntryExpression()) { // if we alredy have an operation, first we calculate this
        calculate();   // operation and the result will become the previousNumber
    }

    calculatorState.operation = _operation;

    if (calculatorState.currentNumber !== '') calculatorState.previousNumber = calculatorState.currentNumber;
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

function clearEntry(type) {
    if (type == "all") {
        display.innerText = "";
        clearAllStateKeys(calculatorState);
        return;
    }
    if (type == "single") {
        if (isEntryExpression()) {
            if(clearStateKey(calculatorState, "currentNumber")) return;
        } else {
            if(clearStateKey(calculatorState, "currentNumber")) return;
            if(clearStateKey(calculatorState, "previousNumber")){
                 if (calculatorState.operation !== '') calculatorState.operation = '';
                 return;
            };
            updateDisplay();
        }
    }
}

function clearStateKey(state, key) {
    if(state[key] !== ""){
        state[key] = ""
        updateDisplay();
        return true;
    }
    return false;
}

function clearAllStateKeys(state) {
    for(const key of Object.entries(state)){
        clearStateKey(state, key);
    }
}

isEntryExpression = () => {
    if ((calculatorState.previousNumber !== "") & (calculatorState.operation !== "") & (calculatorState.currentNumber !== "")) {
        return true;
    }
    return false;
};
