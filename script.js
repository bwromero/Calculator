
const display = document.getElementById('display');
const buttons = document.querySelectorAll('div.button');

let previousNumber = '';
let currentNumber = '';
let operation = '';


function appendNumber(number) {
    currentNumber += number;
    updateDisplay();
}

function setOperation(_operation) {

    if (currentNumber === '') return; // if there's not numbers currently, we cannot display and set an operator

    if(previousNumber !== '' & operation !== '' & currentNumber !== '') {
        calculate();
    }

    operation = _operation; 

    previousNumber = currentNumber;
    display.innerText = `${previousNumber} ${operation}`;
    currentNumber = '';
}

function calculate() {
    if(previousNumber == '') { // if there's no numbers that has already been inserted, we cannot perform any calculation
        return;
    } 

    let result; 

    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    switch(operation) {
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

