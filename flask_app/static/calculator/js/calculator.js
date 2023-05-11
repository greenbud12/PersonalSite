//Calculator
let display = document.getElementById('display');
let numButtons = Array.from(document.getElementsByClassName('num'));
let opButtons = Array.from(document.getElementsByClassName('op'));
let negateButton = document.getElementsByClassName('negate')[0];
let equalsButton = document.getElementsByClassName('equals')[0];
let clearButton = document.getElementsByClassName('clear')[0];
let factorialButton = document.getElementsByClassName('factorial')[0];

let operations = [];
let values = [""];
let lastOperation = null;
let lastValue = null;
let isEqualsPressed = false;
let calError = false;

display.value = "0"

// optional selection
let continueOperationCheckbox = document.getElementById('continue-operation');
let continueOperationCheckboxDisplayChange = document.getElementById('continue-op-dis-change');

continueOperationCheckbox.addEventListener('change', () => {
    continueOperationCheckboxDisplayChange.disabled = !continueOperationCheckbox.checked;
});


//Calculator
numButtons.map(button => {
    button.addEventListener('click', (e) => {
        if (operations.length === 0 && isEqualsPressed) {
            values = [""];
            
            if (!continueOperationCheckboxDisplayChange.checked){
                isEqualsPressed = false;
                operations = [];
                lastOperation = null;
                lastValue = null;
            }
        }

        // decimal and +/- added
        if (e.target.value === '.') {
            if (!values[values.length - 1].includes('.')) {
                values[values.length - 1] += '.';
            }
        }
        else {
            values[values.length - 1] += e.target.value;
        }
          
        updateDisplay();
    })
});

opButtons.map(button => {
    button.addEventListener('click', (e) => {
        if (values[values.length - 1] !== "") {
            operations.push(e.target.value);
            values.push("");
            isEqualsPressed = false;
            updateDisplay();
        }
    })
});

negateButton.addEventListener('click', () => {
    if (values[values.length - 1] !== "") {
        values[values.length - 1] = parseFloat(values[values.length - 1]) * -1; // Negate the value
    }
    updateDisplay();
});

equalsButton.addEventListener('click', () => {
    while (operations.length > 0) {
        calculate();
    }
    if (isEqualsPressed && continueOperationCheckbox.checked) {
        repeatLastOperation();
    }
    isEqualsPressed = true;
    updateDisplay();
});

clearButton.addEventListener('click', () => {
    operations = [];
    values = [""];
    lastOperation = null;
    lastValue = null;
    isEqualsPressed = false;
    updateDisplay();
});

factorialButton.addEventListener('click', () => {
    if (values.length !== 0 && values[values.length - 1]!==""){
        values[values.length - 1] = factorial(values[values.length - 1]);
    }else if (values.length > 1){
        values[values.length - 2] = factorial(values[values.length - 2]);
    }
    updateDisplay();
});

function updateDisplay() {
    display.value = "";
    for (let i = 0; i < values.length; i++) {
        display.value += values[i] + (operations[i] || "");
    }

    if (display.value === ""){
        display.value = "0"
    }

    // bring display back into values
    if (display.value !== "0" && values.length < 2){
        values[0] = display.value;
    }
}

function calculate() {
    if (values.length < 2) return;
    let result;
    let operand1 = parseFloat(values[0]);
    let operand2 = parseFloat(values[1]);
    
    lastValue = operand2;
    switch (operations[0]) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            if (operand2 !== 0) {
                result = operand1 / operand2;
            } else {
                display.value = "Error! Div by 0";
                values = [""];
                operations = [];
                lastOperation = null;
                lastValue = null;
                isEqualsPressed = false;
                calError = True;
            }
            break;
        // Just in case there's an operation that is not handled
        default:
            console.error('Unknown operation:', operations[0]);
            break;
    }

    if(!calError){
        values.shift();
        values.shift();
        values.unshift(result.toString());
        lastOperation = operations.shift();
    }else{
        calError=false;
    }
}

function repeatLastOperation() {
    if (!lastOperation || !lastValue) return;
    let result;
    let operand1 = parseFloat(values[0]);
    let operand2 = lastValue;
    switch (lastOperation) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            if (operand2 !== 0) {
                result = operand1 / operand2;
            } else {
                display.value = "Error! Div by 0";
                values = [""];
                operations = [];
                lastOperation = null;
                lastValue = null;
                calError = true;
            }
            break;
        // Just in case there's an operation that is not handled
        default:
            console.error('Unknown operation:', operations[0]);
            return;
    }
    values[0] = result.toString();
}

function factorial(n) {
    
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}