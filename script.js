
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
    if(currentNumber !== '' ) {
        currentNumber = (Math.floor(currentNumber / 10)).toString();
    } else {
        return;
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

isEntryExpression = () => {
    if (previousNumber !== '' & operation !== '' & currentNumber !== '') {
        return true;
    }
    return false;
}
