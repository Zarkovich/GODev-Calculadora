const numbers = document.querySelectorAll("[numbers]");
const operators = document.querySelectorAll("[operator]");
const equal = document.querySelector("#equals");
const allClearButton = document.querySelector("[all-clear]");
const clearButton = document.querySelector("[clear]");
const invert = document.querySelector("[invert]");
const memoryText = document.querySelector("[memory]");
const currentValueText = document.querySelector("[current-value]");

class Calculadora {
  constructor(memoryText, currentValueText) {
    this.memoryText = memoryText;
    this.currentValueText = currentValueText;
    this.clear();
  }

  fixNumber(number) {
    if (number.toPrecision().length > 15) return number.toFixed(10);
    else return number;
  }

  invertNumber() {
    if (this.currentValue.includes("-")) this.currentValue.replace("-", "");
    else {
      let temp = this.currentValue;
      this.currentValue = "-" + temp;
    }
  }
  equal() {
    let temp;
    switch (this.operation) {
      case "+":
        temp = parseFloat(this.memory) + parseFloat(this.currentValue);
        this.currentValue = this.fixNumber(temp);
        this.memory = "";
        this.operation = "";
        break;
      case "-":
        temp = parseFloat(this.memory) - parseFloat(this.currentValue);
        this.currentValue = this.fixNumber(temp);
        this.memory = "";
        this.operation = "";

        break;
      case "x":
        temp = parseFloat(this.memory) * parseFloat(this.currentValue);
        this.currentValue = this.fixNumber(temp);
        this.memory = "";
        this.operation = "";

        break;
      case "÷":
        temp = parseFloat(this.memory) / parseFloat(this.currentValue);
        this.currentValue = this.fixNumber(temp);
        this.memory = "";
        this.operation = "";

        break;
      default:
        this.clear();
        break;
    }
  }

  delete() {
    length = this.currentValue.length;
    let temp = this.currentValue.slice(0, length - 1);
    this.currentValue = temp;
  }

  setOperator(operator) {
    if (this.currentValue === "") return;
    if (this.memory !== "") this.equal();
    this.operation = operator;
    this.memory = this.currentValue + " " + this.operation;
    this.currentValue = "";
  }

  addNumber(number) {
    if (
      (this.currentValue.includes(".") && number === ".") ||
      this.currentValue.length > 15
    )
      return;
    this.currentValue += number;
  }

  clear() {
    this.currentValue = "";
    this.memory = "";
    this.operation = undefined;
  }

  setDisplay() {
    this.currentValueText.innerText = this.currentValue;
    this.memoryText.innerText = this.memory;
  }
}

const calculadora = new Calculadora(memoryText, currentValueText);

allClearButton.addEventListener("click", () => {
  calculadora.clear();
  calculadora.setDisplay();
});

for (const number of numbers) {
  number.addEventListener("click", () => {
    calculadora.addNumber(number.textContent);
    calculadora.setDisplay();
  });
}

for (const operator of operators) {
  operator.addEventListener("click", () => {
    calculadora.setOperator(operator.textContent);
    calculadora.setDisplay();
  });
}

clearButton.addEventListener("click", () => {
  calculadora.delete();
  calculadora.setDisplay();
});

invert.addEventListener("click", () => {
  calculadora.invertNumber();
  calculadora.setDisplay();
});

equal.addEventListener("click", () => {
  calculadora.equal();
  calculadora.setDisplay();
});
