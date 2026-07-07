function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Can't divide by 0!";
    }
    return a / b;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return null;
    }
}

let number1 = "";
let number2 = "";
let operator = "";
let resultDisplayed = false;

const display = document.querySelector(".display");

const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");

function updateDisplay(value) {
    display.textContent = value;
}

function calculate() {
    if (number1 === "" || number2 === "" || operator === "") {
        return;
    }

    let result = operate(
        operator,
        +number1,
        +number2
    );

    if (typeof result === "number") {
        result = Math.round(result * 1000000) / 1000000;
    }

    updateDisplay(result);

    if (typeof result === "number") {
        number1 = result.toString();
    } else {
        number1 = "";
    }

    number2 = "";
    operator = "";
    resultDisplayed = true;
}

digitButtons.forEach(button => {
    button.addEventListener("click", () => {

        const digit = button.textContent;

        if (resultDisplayed && operator === "") {
            number1 = "";
            resultDisplayed = false;
        }

        if (operator === "") {

            if (digit === "." && number1.includes(".")) {
                return;
            }

            number1 += digit;
            updateDisplay(number1);

        } else {

            if (digit === "." && number2.includes(".")) {
                return;
            }

            number2 += digit;
            updateDisplay(number2);
        }
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {

        if (number1 === "") return;

        if (number2 !== "") {
            calculate();
        }

        operator = button.textContent;
        resultDisplayed = false;
    });
});

equalsButton.addEventListener("click", () => {
    calculate();
});

clearButton.addEventListener("click", () => {
    number1 = "";
    number2 = "";
    operator = "";
    resultDisplayed = false;
    updateDisplay("0");
});