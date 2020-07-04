function add(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) {
    // if bad input print error message
    return "Addition Error: Invalid Input";
  } else {
    // if both parameters are numbers
    var sum = num1 + num2;
    return sum;
  }
}

function subtract(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) {
    // if bad input print error message
    return "Subtraction Error: Invalid Input";
  } else {
    // if both parameters are numbers
    var difference = num1 - num2;
    return difference;
  }
}

function multiply(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) {
    // if bad input print error message
    return "Multiplication Error: Invalid Input";
  } else {
    // if both parameters are numbers
    var product = num1 * num2;
    return product;
  }
}

function divide(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) {
    // if bad input print error message
    return "Division Error: Invalid Input";
  } else {
    // if both parameters are numbers
    if (num2 != 0) {
      // if not dividing by zero
      var quotient = num1 / num2;
      return quotient;
    } else {
      // error message if dividing by zerp
      return "Division Error: Cannot divide by zero";
    }
  }
}

function operate(num1, num2, operator) {
  const additionSign = "+";
  const subtractionSign = "-";
  const multiplicationSign = "*";
  const divisionSign = "/";

  var answer = 0;
  if (operator === additionSign) {
    answer = add(num1, num2);
  } else if (operator === subtractionSign) {
    answer = subtract(num1, num2);
  } else if (operator === multiplicationSign) {
    answer = multiply(num1, num2);
  } else if (operator === divisionSign) {
    answer = divide(num1, num2);
  }

  return answer;
}

let longTempAnswer = null;
let inputNum1 = null;
let inputNum2 = null;
let operator = "";
let positiveNumber = true;

function buttonPressed(buttonName) {
  const additionSign = "+";
  const subtractionSign = "-";
  const multiplicationSign = "*";
  const divisionSign = "/";
  const equalsSign = "=";
  const positiveNegativeSign = "polarSign";
  const clearMemorySign = "c";
  const backspaceSign = "b";
  const display = document.querySelector(".calculator-screen");

  if (
    buttonName === additionSign ||
    buttonName === subtractionSign ||
    buttonName === multiplicationSign ||
    buttonName === divisionSign
  ) {
    if (inputNum1 == null) {
      inputNum1 = parseFloat(display.value);
    } else if (inputNum1 != null) {
      inputNum2 = parseFloat(display.value);
    }

    if (inputNum1 != null && inputNum2 != null) {
      longTempAnswer += operate(inputNum1, inputNum2, operator);
      inputNum1 = null;
      inputNum2 = null;
    }

    operator = buttonName;
    display.value = "";
  } else if (buttonName === equalsSign) {
    if (display.value.length != 0 && display.value != ".") {
      if (inputNum2 == null) {
        inputNum2 = parseFloat(display.value);
        longTempAnswer += operate(inputNum1, inputNum2, operator);
        display.value = longTempAnswer;
        longTempAnswer = null;
        inputNum1 = null;
        inputNum2 = null;
        operator = buttonName;
      } else if (inputNum1 != null && inputNum2 != null) {
        longTempAnswer += operate(inputNum1, longTempAnswer, operator);
        display.value = longTempAnswer;
        longTempAnswer = null;
        inputNum1 = null;
        inputNum2 = null;
        operator = buttonName;
      }
    }
  } else if (buttonName === clearMemorySign) {
    // if clear memory sign is clicked
    display.value = ""; // clear display
    longTempAnswer = null; // reset calulator values
    inputNum1 = null; // reset calulator values
    inputNum2 = null; // reset calulator values
    operator = ""; // reset calulator values
  } else if (buttonName == backspaceSign) {
    // if backspace button pressed
    display.value = display.value.substring(0, display.value.length - 1); // remove most recent character
  } else if (buttonName == positiveNegativeSign) {
    // if positive/negative button is pressed
    if (display.value.length != 0) {
      // if a number is enter on the screen
      if (positiveNumber == true) {
        // if displayNumber is currently positive
        display.value = "-" + display.value; // change to negative number
        positiveNumber = false; // make positiveNumber false
      } else if (positiveNumber == false) {
        // if displayNumber is currently negative
        display.value = display.value.substring(1, display.value.length);
        positiveNumber = true;
      }
    }
  } else {
    if (operator == equalsSign) {
      display.value = "";
      display.value = display.value + buttonName;
      operator = null;
    } else {
      display.value = display.value + buttonName;
    }
  }
}
