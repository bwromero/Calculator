
const display = document.getElementById('display');
const buttons = document.querySelectorAll('div.button');

const operators = ['+', '-', '/', '*', '=', 'del', 'C', 'CE', '.']

const result = 0;

let numberEntry = [];
const operatorEntry = [];

buttons.forEach((el) => {
    el.addEventListener("click", () => newEntry(el))
})

function newEntry(entry) {

    const text = entry.textContent;

    if (isNumber(text)) {
        let currentNumber = numberEntry[0];
        if(currentNumber) {
            currentNumber = currentNumber.concat(text);
            numberEntry.splice(0, 0, currentNumber)
        } else {
            numberEntry.push(text);
        }

        display.innerText = numberEntry[0];
    }

    if (isOperator(text)) {
        // clear all entries
        if(text == 'C') {
            numberEntry = [];
            display.innerText = '';
        }

        // Clear single entry
        if(text == 'CE') {
            numberEntry[0] = numberEntry.innerText.slice(0, -1);
            display.innerText = display.innerText.slice(0, -1);
        }

        operatorEntry.push(text);
    }

    console.log("current numberEntry: ", numberEntry[0]);
    console.log("current operatorEntry: ", operatorEntry);
}

isNumber = (text) => {
    if (!isNaN(text) && text !== '') {
        console.log("Number selected:", text);
        return true;
    }
    return false;
}

isOperator = (text) => {
    if (operators.includes(text)) {
        console.log("Operator selected:", text);
        return true;
    }

    return false;
}