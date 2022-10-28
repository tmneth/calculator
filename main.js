const calculator = document.querySelector(".calculator");
const display = document.querySelector(".display");
const history = document.querySelector(".history");
const keys = calculator.querySelector(".keys");

display.textContent = 0;
history.textContent = 0;

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    let displayedNum = display.textContent;

    if (!action) {
      if (
        displayedNum === "0" ||
        calculator.dataset.previousKeyType === "operator" ||
        calculator.dataset.previousKeyType === "constant" ||
        calculator.dataset.previousKeyType === "calculate"
      ) {
        calculator.dataset.result = "";
        display.textContent = keyContent;
        calculator.dataset.previousKeyType = "number";
      } else {
        if (displayedNum.length <= 10)
          display.textContent = displayedNum + keyContent;
      }
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide" ||
      action === "power"
    ) {
      Array.from(key.parentNode.children).forEach((k) =>
        k.classList.remove("is-depressed")
      );

      key.classList.add("is-depressed");

      calculator.dataset.previousKeyType = "operator";

      history.textContent = displayedNum;

      calculator.dataset.firstValue = displayedNum;

      calculator.dataset.operator = action;

      display.textContent = 0;
    }

    if (action === "calculate" && calculator.dataset.operator.length) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      calculator.dataset.operator = "";
      history.textContent = 0;

      calculator.dataset.result = calculate(firstValue, operator, secondValue);

      display.textContent = calculator.dataset.result;

      calculator.dataset.previousKeyType = "calculate";

      Array.from(key.parentNode.children).forEach((k) =>
        k.classList.remove("is-depressed")
      );
    }

    if (action === "decimal") {
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (previousKeyType === "operator") {
        display.textContent = "0.";
      }

      calculator.dataset.previousKeyType = "decimal";
    }

    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }

      history.textContent = 0;

      Array.from(key.parentNode.children).forEach((k) =>
        k.classList.remove("is-depressed")
      );

      display.textContent = 0;
      calculator.dataset.previousKeyType = "clear";
    }

    if (action === "revert") {
      displayedNum = -displayedNum;
      display.textContent = displayedNum;
    }

    if (action === "log" && displayedNum > 0) {
      displayedNum = Math.log(displayedNum).toPrecision(4);
      display.textContent = displayedNum;
    }

    if (action === "sqrt" && displayedNum > 0) {
      displayedNum = Math.sqrt(displayedNum).toPrecision(4);
      display.textContent = displayedNum;
    }

    if (action === "pi") {
      display.textContent = Math.PI.toFixed(10);
      calculator.dataset.previousKeyType = "constant";
    }

    if (action === "e") {
      display.textContent = Math.E.toFixed(10);
      calculator.dataset.previousKeyType = "constant";
    }
  }
});
``;
const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  let resultVal;

  if (operator === "add") resultVal = firstNum + secondNum;
  if (operator === "subtract") resultVal = firstNum - secondNum;
  if (operator === "multiply") resultVal = firstNum * secondNum;
  if (operator === "divide") resultVal = firstNum / secondNum;
  if (operator === "power") resultVal = Math.pow(firstNum, secondNum);

  if (resultVal.toString().length > 10) return resultVal.toPrecision(4);
  else return resultVal;
};
