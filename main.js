const calculator = document.querySelector(".calculator");
const display = document.querySelector(".display");
const keys = calculator.querySelector(".keys");
const expo = document.getElementById("expo");

display.textContent = 0;

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    let displayedNum = display.textContent;

    if (calculator.dataset.previousKeyType === "power") {
      let exponent = document.getElementById("expo").value;
      displayedNum = Math.pow(displayedNum, exponent);
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

      key.classList.add("is-depressed");
      // Add custom attribute
      calculator.dataset.previousKeyType = "operator";

      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
    }

    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      display.textContent = calculate(firstValue, operator, secondValue);

      display.style.paddingRight = "20px";
      expo.style.display = "none";

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

    if (action === "log") {
      displayedNum = Math.log(displayedNum);
      display.textContent = displayedNum;
    }

    if (action === "sqrt") {
      displayedNum = Math.sqrt(displayedNum);
      display.textContent = displayedNum;
    }

    if (action === "pi") {
      display.textContent = Math.PI.toFixed(5);
      calculator.dataset.previousKeyType = "constant";
    }

    if (action === "e") {
      display.textContent = Math.E.toFixed(5);
      calculator.dataset.previousKeyType = "constant";
    }
    if (action === "power") {
      display.style.paddingRight = "45px";
      expo.style.display = "block";
      calculator.dataset.previousKeyType = "power";
    }
  }
});

const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  if (operator === "add") return firstNum + secondNum;
  if (operator === "subtract") return firstNum - secondNum;
  if (operator === "multiply") return firstNum * secondNum;
  if (operator === "divide") return firstNum / secondNum;
};

function myFunction() {
  exponent = document.getElementById("expo").value;
}
