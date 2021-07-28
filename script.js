let firstOperand = "";
let secondOperand = "";
let operation = "";
let OPERATORS = ["+","-","*","/","=","^2","^","%","^-1","(-1)","^0.5"];

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener('click', displayText);
}); 

const operators = document.querySelectorAll('#operator');
operators.forEach(operator => {
    operator.addEventListener('click', function(e) {
    operation = e.target.value;
    });
});

const display = document.querySelector(".display");
function displayText(e) {
    const buttonValue = e.target.value;
    if (buttonValue === 'C' || buttonValue === "CE") {
        display.value = '';
        firstOperand = '';
        secondOperand = '';
        operation = '';
    }
    else if (buttonValue === "DEL") {
        display.value = display.value.slice(0,-1);
    }
    else {
        display.value += buttonValue;
        let separate = display.value.split(" ");
        if (separate.filter(value => OPERATORS.includes(value) && value !== "").length > 1) {
            firstOperand = separate[0];
            secondOperand = separate[2];
            operation = separate[1];
            if (separate[3] == "=" || separate[3] == "" ) {
                display.value = operate(operation, firstOperand, secondOperand)    
            }
            else if(separate[2] == "") {
                display.value = separate[0] + " " + separate[3] + " ";
            }
            else if (separate[0] == "") {
                display.value = separate[2] + " " + separate[3] + " ";  
            }
            else {
                display.value = operate(operation, firstOperand, secondOperand) + " " + separate[3] + " ";   
            }
            separate.shift();
            separate.shift();
            separate.shift();
        }
    }
}
function add (a,b) {
    return a + b;
}

function subtract (a,b) {
    return a - b;
}

function multiply (a,b) {
    return (a * b).toFixed(4);
}

function square (a,b) {
    return (a*a*b).toFixed(4);
}

function powera(a,b) {
    return (Math.pow(a,b)).toFixed(4);
}

function divide (a,b) {
    return (a/b).toFixed(4);
}

function percentage (a,b) {
    return ((a/100)*b).toFixed(4);
}

function inverse(a,b) {
    return ((1/a)*b).toFixed(4) ;
}

function plusminus(a,b) {
    if (a < 0) {
        return -a*b;
    }
    else {
        return -a*b;
    }
}

function sqrt (a,b) {
    return Math.sqrt(a)*b;
}

function operate (operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch(operator){
        case "+" :
            return add(a,b);
            break;
        case "-":
            return subtract(a,b);
            break;
        case "*":
            return multiply(a,b);
            break;
        case "/":
            if (b===0) {
                return "To Infinity and Beyond";
            }
            else {
                return divide(a,b);
            }
            break;
        case "^2":
            return square(a, 1);
            break;
        case "^":
            return powera(a, b);
            break;
        case "%":
            return percentage(a,1);
            break;
        case "^-1":
            if (a===0) return "To Infinity and Beyond";
            return inverse(a,1);
            break;
        case "(-1)":
            return plusminus(a,1);
            break;
        case "^0.5":
            if (a<0) return "Imaginary roots"
            return (sqrt(a,1)).toFixed(4);
            break;    
    }
}