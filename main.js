const calculator = document.querySelector(".calculator");
const display = document.querySelector(".display");
const keys = calculator.querySelector(".keys");
const expo = document.getElementById("expo");

display.textContent = 0;

const resetExpo = () => {
  display.style.paddingRight = "20px";
  expo.style.display = "none";
  document.getElementById("expo").value = " ";
};

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    let displayedNum = display.textContent;

    if (calculator.dataset.previousKeyType === "power") {
      let exponent = document.getElementById("expo").value;
      displayedNum = Math.pow(displayedNum, exponent);
      document.getElementById("expo").value = " ";
    }

    if (!action) {
      if (
        displayedNum === "0" ||
        calculator.dataset.previousKeyType === "operator" ||
        calculator.dataset.previousKeyType === "constant"
      ) {
        display.style.paddingRight = "20px";
        expo.style.display = "none";

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
      action === "divide"
    ) {
      Array.from(key.parentNode.children).forEach((k) =>
        k.classList.remove("is-depressed")
      );

      resetExpo();

      key.classList.add("is-depressed");

      calculator.dataset.previousKeyType = "operator";

      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;

      display.textContent = 0;
    }

    if (action === "calculate" && calculator.dataset.operator) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      display.textContent = calculate(firstValue, operator, secondValue);

      resetExpo();

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
    if (action === "power") {
      window.innerWidth > 500``
        ? (display.style.paddingRight = "45px")
        : (display.style.paddingRight = "30px");
      expo.style.display = "block";
      calculator.dataset.previousKeyType = "power";
      document.getElementById("expo").value = " ";
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

  return resultVal.toPrecision(4);
};

function myFunction() {
  exponent = document.getElementById("expo").value;
}
