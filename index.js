// Main buttons selected

let display = document.querySelector('#display');
let clearBtn = document.querySelector('#clear');
let deleteBtn = document.querySelector('#delete');
let equalsBtn = document.querySelector('#equals');
let decimalBtn = document.querySelector('#dot');

// Initial vars

let displayDefaultValue = '0';
display.value = displayDefaultValue;
let firstNum = null;
let startSecond = true;
let operation = '';
let calculationDone = false;

// Math operations

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 !== 0) {
    return num1 / num2;
  } else {
    display.value = 'Boo! Can not divide by 0';
    console.log(display.value);
  }
}

function operate(operator, num1, num2) {
  num1 = +num1;
  num2 = +num2;
  if (operator == '+') {
    return add(num1, num2);
  } else if (operator == '-') {
    return subtract(num1, num2);
  } else if (operator == '*') {
    return multiply(num1, num2);
  } else if (operator == '/') {
    return divide(num1, num2);
  }
}

// C button

clearBtn.addEventListener('click', () => {
  display.value = displayDefaultValue;
  firstNum = null;
  secondNum = null;
  startSecond = true;
  calculationDone = false;
});

// DEL button

deleteBtn.addEventListener('click', () => {
  if (
    display.value &&
    display.value != '0' &&
    !startSecond &&
    !calculationDone
  ) {
    display.value = display.value.slice(0, -1);
    if (!display.value) {
      display.value = displayDefaultValue;
    }
  }
});

// Number buttons

let numButtons = document.querySelectorAll('#number');

numButtons.forEach((numBtn) =>
  numBtn.addEventListener('click', () => {
    //if (display.value.match(/^0($|[^.]+)/)) return;
    if (display.value.match(/^0[^.]+/)) return;
    if (
      startSecond || // if operator was just pressed
      calculationDone || // if equals was just pressed
      (isNaN(display.value) && !display.value.startsWith('.')) || // if display shows error
      display.value === '0' // if display has only 0
    ) {
      display.value = '';
      startSecond = false;
      calculationDone = false;
    }
    display.value += numBtn.innerText;
  })
);

// Decimal btn

let decimalBtnValue = decimalBtn.innerText;
//console.log(decimalBtnValue);

decimalBtn.addEventListener('click', () => {
  if (startSecond || calculationDone) {
    display.value = decimalBtnValue;
    startSecond = false;
    calculationDone = false;
  } else if (!display.value.includes(decimalBtnValue)) {
    display.value += decimalBtnValue;
  }
});

// Operation buttons

let operationButtons = document.querySelectorAll('.operation');
//console.log(operationButtons);

operationButtons.forEach((operationBtn) => {
  operationBtn.addEventListener('click', () => {
    if (display.value === '' || display.value === '.') return;
    if (!startSecond) {
      let result =
        firstNum !== null
          ? Math.round(
              operate(operation, firstNum, Number(display.value)) * 10000
            ) / 10000
          : Number(display.value);
      //firstNum = Math.round(firstNum * 10000) / 10000;
      if (isNaN(result)) {
        firstNum = null;
        secondNum = null;
        startSecond = true;
        calculationDone = false;
        return;
      } else {
        console.log(display.value, '=', result);
        display.value = firstNum = result;
      }
      //secondNum = Number(display.value);
      startSecond = true;
    }
    operation = operationBtn.innerText;
    console.log(firstNum, operationBtn.innerText);
  });
});

// Equals button

equalsBtn.addEventListener('click', () => {
  if (display.value === '' || display.value === '.' || startSecond) return;
  let secondNum = Number(display.value);
  let result =
    firstNum !== null
      ? Math.round(operate(operation, firstNum, secondNum) * 10000) / 10000
      : Number(display.value);
  //firstNum = Math.round(firstNum * 10000) / 10000;
  if (isNaN(result)) {
    firstNum = null;
    secondNum = null;
    startSecond = true;
    calculationDone = false;
    return;
  } else {
    display.value = firstNum = result;
    calculationDone = true;
    //console.log(operation, startSecond);
  }
  console.log(secondNum, '=', display.value);
  firstNum = null;
  //secondNum = Number(display.value);
  startSecond = false;
});
