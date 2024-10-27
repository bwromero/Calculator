
const display = document.getElementById('#display');
const buttons = document.querySelectorAll('div.button');

const operators = ['+', '-', '/', '*', '=', 'del', 'C', 'CE', '.']

const result = 0;

const numberEntry = [];
const operatorEntry = [];

buttons.forEach((el) => {
    el.addEventListener("click", () => newEntry(el))
})

function newEntry(entry) {

    const text = entry.textContent;

    if (isNumber(text)) {
        numberEntry.push(text);
    }

    if (isOperator(text)) {
        operatorEntry.push(text);
    }

    display.innerText = numberEntry[0];

    console.log("current numberEntry: ", numberEntry);
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