
const display = document.getElementById('display');
const buttons = document.querySelectorAll('div.button');

let previousNumber = '';
let currentNumber = '';
let operation = '';


function appendNumber(number) {
    if(currentNumber == '0') {
        currentNumber = number.toString();
        updateDisplay();
        return;
    }
    currentNumber += number;
    updateDisplay();
}

function deleteEntry(){
    if(currentNumber !== '' ) { //if a number is present
        currentNumber = (Math.floor(currentNumber / 10)).toString(); // math.floor can give back 0
        if(currentNumber == 0) currentNumber = ''; // so here we turn 0 to ''
        updateDisplay();
        return;
    } else if (operation !== '') {
        operation = '';
        display.innerText = `${previousNumber}`;
    } else if (previousNumber !== '') {
        previousNumber = (Math.floor(previousNumber / 10)).toString();
        if(previousNumber == 0) previousNumber = '';
        updateDisplay();
    }

    if(currentNumber == '' && operation !== '') { // if an operation is present
        operation = '';
        display.innerText = `${previousNumber}`;
    }

    updateDisplay();
}

function setOperation(_operation) {

    if (currentNumber === '') return; // if there's not numbers currently, we cannot display and set an operator

    if (isEntryExpression()) {
        calculate();
    }

    operation = _operation;

    previousNumber = currentNumber;
    display.innerText = `${previousNumber} ${operation}`;
    currentNumber = '';
}

function calculate() {
    if (previousNumber == '') { // if there's no numbers that has already been inserted, we cannot perform any calculation
        return;
    }

    let result;

    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentNumber = result;
    operation = '';
    previousNumber = '';
    updateDisplay();

}

function updateDisplay() {
    display.innerText = `${previousNumber} ${operation} ${currentNumber}`;
}

function clearDisplay(clearType) {
    if(clearType == 'all') {
        display.innerText = '';
        return;
    }
    if(clearType == 'single') {
        if(isEntryExpression) {

            return;
        }

    }
}

isEntryExpression = () => {
    if (previousNumber !== '' & operation !== '' & currentNumber !== '') {
        return true;
    }
    return false;
}
