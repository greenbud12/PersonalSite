//Calculator
// Buttons
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
let memoryButtons = Array.from(document.getElementsByClassName('mem'));

// Storage and memory
let operations = [];
let openCnt = 0;
let closeCnt = 0;
let lastValue = 0;
let lastOperation = null;
let memory = [];

// regex ops
const isNumber = /^[+-]?\d+(\.\d+)?$/;
const isOperator = /^[-+\/*%^]$/;

// init display
display.value = "0"

//KeyBoard
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    switch (key) {
        case '0':
            numButtons[9].click();
            break;
        case '1':
            numButtons[6].click();
            break;
        case '2':
            numButtons[7].click();
            break;
        case '3':
            numButtons[8].click();
            break;
        case '4':
            numButtons[3].click();
            break;
        case '5':
            numButtons[4].click();
            break;
        case '6':
            numButtons[5].click();
            break;
        case '7':
            numButtons[0].click();
            break;
        case '8':
            numButtons[1].click();
            break;
        case '9':
            numButtons[2].click();
            break;
        case '.':
            decimalButton.click();
            break;
        case '+':
            opButtons[1].click();
            break;
        case '-':
            opButtons[2].click();
            break;
        case '*':
            opButtons[4].click();
            break;
        case '/':
            opButtons[0].click();
            break;
        case '%':
            opButtons[3].click();
            break;
        case '^':
            opButtons[5].click();
            break;
        case '=':
        case 'Enter':
            equalsButton.click();
            break;
        case 'Backspace':
        case 'Escape':
        case 'Delete':
        case 'c':
        case 'C':
            clearButton.click();
            break;
        case '(':
            openParenButton.click();
            break;
        case ')':
            closeParenButton.click();
            break;
        case '!':
            factorialButton.click();
            break;
        case 'm':
        case 'M':
            memoryButtons[0].click();
            break;
        case 'r':
        case 'R':
            memoryButtons[1].click();
            break;
        case 'n':
        case 'N':
            negateButton.click();
            break;
    }
  });

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
            lastValue = e.target.value;
        // case of number
        }else if (operations[i].length > 1 && /[0-9]/.test(operations[i])){ //
            operations[i] = operations[i] + e.target.value;
            lastValue = operations[i];
        // case of one char
        }else if (operations[i].length === 1) {
            lastValue = e.target.value;
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
            else{
                operations[i] = operations[i] + e.target.value;
                lastValue = operations[i];
            }
        }
        // case of pressing equals again and then a number
        else{
            clear();
            operations.push(e.target.value);
            lastValue = e.target.value;
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

        // // update lastValue
        // if (operations.length !== 0){lastValue = operations[i];};
        
        // add 0 if NUM DEC OP -> NUM DEC 0 OP
        let j = operations[i]
        if (j[j.length - 1] === '.'){operations[i] = j + '0';};

        // add op
        if (operations[i] !== "" && isNumber.test(operations[i]) || operations[i] === ')') {
            operations.push(e.target.value);
            lastOperation = e.target.value;
        }
        update();
    })
});

memoryButtons.map(button => {
    button.addEventListener('click', (e) => {
        if (e.target.value === "MS"){
            memory = Object.assign( [] ,operations);
            display.value = "SAVED";
        }else if (e.target.value === "ML"){
            operations = Object.assign( [] ,memory);
            update();
        }
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
    console.log("--------Equals-----------")
    
    let i = operations.length - 1;
    if (operations.length !== 0 && operations[i][operations[i].length-1] === '.'){
        operations[i] = operations[i]+"0";
        
    };

    //fix case where no closeing parenth
    if (closeCnt < openCnt){
        closeParenth();
        update();
    };

    console.log("--------Evaluate-----------")
    evaluate();

});

clearButton.addEventListener('click', () => {
    clear();
    update();
});

factorialButton.addEventListener('click', () => {

    let i = operations.length-1;
    let num = null;

    while (i >= 0){
        if (isNumber.test(operations[i])){
            num = operations[i];
            break;
        }
        i--;
    }

    if (num !== null){
        operations[i] = factorial(num);
    }

    update();
});

openParenButton.addEventListener('click', () => {
    if (operations.length !== 0 && isNumber.test(operations[operations.length-1]) || operations[operations.length-1] === ")"){
        operations.push("*");
    };
    operations.push("(");
    openCnt += 1;
    update();
});
  
closeParenButton.addEventListener('click', () => {
    if (closeCnt < openCnt){
        closeParenth();
        update();
    }
    
});
// ######## END BUTTON MAP ########

function update() {
    console.log("--------Update-----------")
    display.value = "";

    for (let i = 0; i < operations.length; i++) {
        display.value += operations[i];
    }

    // 0 if nothing
    if (display.value === ""){
        display.value = "0";
    }


    console.log("OPS",operations);
    console.log("lastvals", lastValue, lastOperation);
}

function evaluateExpression(expression) {
    //todo do custom eval?

    try {
        return eval(expression.join('')).toString();
    } catch (error) {
        console.error('Error evaluating expression:', error);
        return null;
    }
}
  
function evaluate() {
    // evaluate

    // pressing equal again
    if(operations.length === 1 && lastOperation !== null){
        operations.push(lastOperation);
        operations.push(lastValue);
    }

    // replace ^ with ** for eval
    replaceAll(operations, '^', "**");

    if (operations.length !== 0){
        evaluated = evaluateExpression(operations);
        
    }else{
        evaluated = [];
    }
    
    if (evaluated===null){
        clear();
        display.value = "ERROR";
    }else{
        if (evaluated.length === 0){
            operations = [];
        }else{
            operations = [evaluated];
        }
        update();
    }    
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
    lastOperation = null;
    lastValue = 0;
    openCnt = 0;
    closeCnt = 0;
}

function replaceAll(list, oldValue, newValue) {
    for (let i = 0; i < list.length; i++) {
      if (list[i] === oldValue) {
        list[i] = newValue;
      }
    }
  }

function closeParenth(){
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
}