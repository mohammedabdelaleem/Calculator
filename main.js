const input = document.getElementById("input");
const result = document.getElementById("result");

let Calculator = {
  Expression: "",
  
  WriteText: function () {
    input.value = this.Expression;
  },

  ClickOperation: function (text) {
    if (text === "C") {
      this.Expression = "";
      this.WriteText();
      return;
    }

    if (text === "=") {
      try {
        let exp = this.Expression.replace(/x/g, "*").replace(/−/g, "-");

        // Safe calculation without eval
        let finalResult = this.safeCalculate(exp);
        this.Expression = finalResult.toString();
        result.innerText = finalResult;
      } catch {
        this.Expression = "Error";
      }
      this.WriteText();
      return;
    }

    if (text === "<") { // Backspace
      this.Expression = this.Expression.slice(0, -1); // from [0] to [end -1]
      this.WriteText();
      return;
    }

    this.Expression += text;
    this.WriteText();
  },

  safeCalculate: function (exp) {
    // Only allow numbers, operators, and decimal points
    if (!/^[0-9+\-*/%. ]+$/.test(exp)) { //.test(exp) checks if exp contains only those allowed characters.
      throw new Error("Invalid expression");
    }

    // Use Function constructor (safer here than eval for limited input)
    return Function(`"use strict"; return (${exp})`)(); // creates a new function that, when called, will return the result of 7+3*2.

    /*
    ✅ Difference from eval():
    eval() can run any JavaScript — it has access to your scope and variables.
    Function(...) creates a new isolated function, doesn’t touch local variables, and here we validate the input first — much safer.
    */
  }
};
