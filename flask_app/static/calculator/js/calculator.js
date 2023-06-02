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

const isNumber = /^[+-]?\d+(\.\d+)?$/;
const isOperator = /^[-+\/*%^]$/;
let operations = [];

let openCnt = 0;
let closeCnt = 0;

let lastValue = 0;


display.value = "0"


//Calculator
// ###### START BUTTON MAP ########
numButtons.map(button => {
    button.addEventListener('click', (e) => {

        // Add number
        // Handle impossible numbers
        let i = operations.length - 1;
        // nothing case
        if (operations.length === 0){
            operations.push(e.target.value);
        // case of number
        }else if (operations[i].length > 1 && /[0-9]/.test(operations[i])){ //
            operations[i] = operations[i] + e.target.value;
        // case of one char
        }else if (operations[i].length === 1) {
            // 0 case
            if (operations[i] === '0'){
                operations[i] = e.target.value;
            // last is op or parenth
            }else if (!isNumber.test(operations[i])){
                // right paren case -> mult is default
                if (operations[i] === ')'){
                    operations.push('*');
                };
                operations.push(e.target.value);
            }
            //add to number
            else operations[i] = operations[i] + e.target.value;
        }

        update();
    })
});

opButtons.map(button => {
    button.addEventListener('click', (e) => {

        // add in 0 if nothing
        if (operations.length === 0){
            operations.push('0')
        };

        

        let i = operations.length - 1;

        // update lastValue
        if (operations.length !== 0){lastValue = operations[i];};
        
        // add 0 if NUM DEC OP -> NUM DEC 0 OP
        let j = operations[i]
        if (j[j.length - 1] === '.'){operations[i] = j + '0';};

        // add op
        if (operations[i] !== "" && isNumber.test(operations[i]) || operations[i] === ')') {
            operations.push(e.target.value);
        }
        update();
    })
});

decimalButton.addEventListener('click', () => {
    if (operations.length === 0){
        operations.push('0');
    }

    let i = operations.length - 1;
    if (!operations[i].includes('.')) {
        if (!isNumber.test(operations[i])){
            if (!isOperator.test(operations[i])){
                operations.push('*');
            };
            operations.push('0.');
        }else{
            operations[i] += '.';
        };
    };
    update();
});

negateButton.addEventListener('click', () => {
    let i = operations.length - 1;
    if (operations.length !== 0 && operations[i] !== '0' && isNumber.test(operations[i])){
        if (operations[i][0] === '-'){
            operations[i] = operations[i].slice(1);
        }else operations[i] = '-' + operations[i];
    };

    //TODO fix negateing (
    
    update();
});

equalsButton.addEventListener('click', () => {
    // fix case where last number is just 4. instead of 4.0, prob not needed
    let i = operations.length-1;
    if (operations.length !== 0 && operations[i][operations[i].length-1] === '.'){
        operations[i] = operations[i]+"0";
    };
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
    if (operations.length !== 0 && isNumber.test(operations[operations.length-1])){
        operations.push("*");
    };
    operations.push("(");
    openCnt += 1;
    update();
});
  
closeParenButton.addEventListener('click', () => {
    if (closeCnt < openCnt){

        // unclosed decimal case
        if (operations.length !== 0){
            let i = operations.length-1
            if (operations[i][operations[i].length-1]==='.'){
                // this is the behaivor of the microsoft calculator
                // operations[i] = operations[i].slice(0, -1);
                operations[i] = operations[i] + '0';
            };

            // case where closeing on an operator 
            if (isOperator.test(operations[i])){
                operations.push(lastValue);
            };
        }
        

        closeCnt += 1;
        operations.push(")");
        update();
    }
    
});
// ######## END BUTTON MAP ########

function update() {
    display.value = "";

    for (let i = 0; i < operations.length; i++) {
        display.value += operations[i]
    }

    // 0 if nothing
    if (display.value === ""){
        display.value = "0"
    }


    console.log(operations)
}

function evaluateExpression() {
    // needs to happen after evaluation of parenths

    // eval parenths 

    // add last value to values if NUM OP EQL -> NUM OP NUM EQL
    // Micro evals the first portion and then adds it to the end
    // let i = operations.length-1;
    // if (operations.length !== 0 && !isNumber.test(operations[i])) {
    //     operations.push(operations[i-1]);
    // };

    evaluate();
}
  
function evaluate() {
    // evaluate


    
    lastValue = 0;
    lastOperation = operations[operations.length - 1];

    
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
    parenths = [];
    operations = [];
    expected = "";
    values = [""];
    lastOperation = null;
    lastValue = null;
    isEqualsPressed = false;
}