const calculator = document.querySelector(".calculator");
const display = document.querySelector("h2");


calculator.addEventListener("click", handleClick)


function handleClick(e) {
    const buttonClicked = e.target.textContent;
    if (!Array.from(document.querySelectorAll("button")).includes(e.target)) {
        return;
    }
    if(buttonClicked === "CLEAR") {
        display.textContent = "";
    }
    else if (usedOperatorBeforeNum(buttonClicked, display.textContent)) {
        alert("You must enter a number first !");
    }
    else if (usedOperatorTwice(buttonClicked, display.textContent)) {
        alert("You have already used an operator !");
    }
    else if (buttonClicked === "=" && equationNotFinished(display.textContent)) {
        alert("Equation is not ready to evaluate !");
    }
    else if (buttonClicked === "=") {
        const formatedOp = formatEquation(display.textContent);
        display.textContent = operate(+formatedOp[0], +formatedOp[2], formatedOp[1]) + restOfEquation(formatedOp);
    } else {
        display.textContent += buttonClicked;
    }
}

function formatEquation(string) {
    return string.split(" ").filter(item => item !== "");
}

function restOfEquation(formatedOp) {
    if (formatedOp[formatedOp.length - 1] === "+" ||
        formatedOp[formatedOp.length - 1] === "-" ||
        formatedOp[formatedOp.length - 1] === "*" ||
        formatedOp[formatedOp.length - 1] === "/" ) 
    {
        return " " + formatedOp.slice(3).join(" ") + " ";
    }
    else if(formatedOp.length > 3) {
        return " " + formatedOp.slice(3).join(" ");
    }else {
        return "";
    }
}

function equationNotFinished(display) {
    const equation = display.split(" ").filter(item => item !== "");
    console.log(equation);
    return !(equation.length >= 3);
    
}

function usedOperatorTwice(btn, display) {
    const last3 = display.slice(display.length - 3);
    return  (last3 === " + " || last3 === " - " || last3 === " * " || last3 === " / ")
            && (btn === " + " || btn === " - " || btn === " * " || btn === " / ")
}

function usedOperatorBeforeNum(buttonClicked, displayValue) {
    return (buttonClicked === " + " || buttonClicked === " - " || buttonClicked === " * " || buttonClicked === " / " || buttonClicked === "=")
           && displayValue === "";
}

function operate(num1, num2, operator) {
    let result;
    switch(operator) {
        case "+":
           result = add(num1, num2);
           break;
        case "-":
           result = sub(num1, num2);
           break;
        case "*":
           result = multiply(num1, num2);
           break;
        case "/":
           result = divide(num1, num2);
           break;
        default:
            console.log("You must enter numbers...");
    }
    if(result % 1 === 0) {
        return result;
    }else {
        return result.toFixed(2);
    }
}

function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

