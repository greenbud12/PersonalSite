//Calculator
let display = document.getElementById('display');
let numButtons = Array.from(document.getElementsByClassName('num'));
let opButtons = Array.from(document.getElementsByClassName('op'));
let decimalButton = document.getElementsByClassName('deci')[0];
let negateButton = document.getElementsByClassName('negate')[0];
let equalsButton = document.getElementsByClassName('equals')[0];
let clearButton = document.getElementsByClassName('clear')[0];
let factorialButton = document.getElementsByClassName('factorial')[0];
let openParenButton = document.getElementsByClassName('open-paren')[0];
let closeParenButton = document.getElementsByClassName('close-paren')[0];

let operations = [];
let values = [""];

let openCnt = 0;
let closeCnt = 0;

let lastOperation = null;
let lastValue = null;
let isEqualsPressed = false;
let calError = false;

display.value = "0"

// optional selection
// let continueOperationCheckbox = document.getElementById('continue-operation');
// let continueOperationCheckboxDisplayChange = document.getElementById('continue-op-dis-change');

// continueOperationCheckbox.addEventListener('change', () => {
//     continueOperationCheckboxDisplayChange.disabled = !continueOperationCheckbox.checked;
// });


//Calculator
// ###### START BUTTON MAP ########
numButtons.map(button => {
    button.addEventListener('click', (e) => {
        // if (operations.length === 0 && isEqualsPressed) {
        //     values = [""];
            
        //     if (!continueOperationCheckboxDisplayChange.checked){
        //         isEqualsPressed = false;
        //         operations = [];
        //         lastOperation = null;
        //         lastValue = null;
        //     }
        // }

        // Add number
        values[values.length - 1] += e.target.value;
        update();
    })
});

opButtons.map(button => {
    button.addEventListener('click', (e) => {
        if (values[values.length - 1] !== "") {
            operations.push(e.target.value);

            // add 0 if NUM DEC OP -> NUM DEC NUM OP
            let j = values[values.length - 1]
            if (j[j.length - 1] === '.'){
                values[values.length - 1] = j + '0'
            }


            values.push("");
            isEqualsPressed = false;
            update();
        }
    })
});

decimalButton.addEventListener('click', () => {
    let i = values.length - 1;
    if (!values[i].includes('.')) {
        console.log(values[i].length);
        if (values[i].length === 0){
            values[i] += '0.';
        }else{
            values[i] += '.';
        };
    };
    update();
});

negateButton.addEventListener('click', () => {
    // if (values[values.length - 1] !== "") {
    //     values[values.length - 1] = parseFloat(values[values.length - 1]) * -1; // Negate the value
    // }
    // updateDisplay();
});

equalsButton.addEventListener('click', () => {
    evaluateExpression();
});

clearButton.addEventListener('click', () => {
    console.log("clear")
    clear();
    update();
});

factorialButton.addEventListener('click', () => {
    // if (values.length !== 0 && values[values.length - 1]!==""){
    //     values[values.length - 1] = factorial(values[values.length - 1]);
    // }else if (values.length > 1){
    //     values[values.length - 2] = factorial(values[values.length - 2]);
    // }
    // update();
});

openParenButton.addEventListener('click', () => {
    // if (values[values.length - 1] !== "") {
    //     operations.push("*");
    //     values.push("");
    // }
    openCnt += 1;
    operations.push("(");
    update();
});
  
closeParenButton.addEventListener('click', () => {
    // if (values[values.length - 1] === "") {
    //     operations.pop(); // Remove the preceding operator if no value entered after it
    // }
    // operations.push(values.pop());
    if (closeCnt < openCnt){
        closeCnt += 1;
        operations.push(")");
        update();
    };
});
// ######## END BUTTON MAP ########

function update() {
    display.value = "";
    let j = 0;
    for (let i = 0; i + j < values.length; i++) {
        if (values[i] === '(' || values[i] === ')'){
            j += 1;
        }
        display.value += values[i+j] + (operations[i+j] || "");
    }

    // 0 if nothing
    if (display.value === ""){
        display.value = "0";
    };
};

function evaluateExpression() {
    // add last value to values if NUM OP EQL -> NUM OP NUM EQL
    let i = values.length-1;
    if (values[i].length === 0 && values.length > 1) {
        values[i] = values[i-1];
    };


    console.log(operations)
    console.log(values)
    update();
    evaluate();
}
  
function evaluate() {
    // evaluate


    
    lastValue = 0;
    lastOperation = operations[operations.length - 1];

    clear();
    update();

    
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

function clear(){
    operations = [];
    values = [""];
    lastOperation = null;
    lastValue = null;
    isEqualsPressed = false;
}