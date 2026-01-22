let display = document.getElementById("display");

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function appendFunction(func) {
  display.value += func + "(";
}

function calculateResult() {
  try {
    let expression = display.value
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/sqrt/g, "Math.sqrt");

    display.value = eval(expression);
  } catch {
    display.value = "Error";
  }
}

/* Keyboard Support */
document.addEventListener("keydown", function (e) {
  if ("0123456789+-*/().".includes(e.key)) {
    appendValue(e.key);
  }
  if (e.key === "Enter") calculateResult();
  if (e.key === "Escape") clearDisplay();
});
