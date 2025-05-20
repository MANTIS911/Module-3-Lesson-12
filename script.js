// Get elements for history and output
function getHistory() {
    return document.getElementById("history").innerText;
}
function printHistory(num) {
    document.getElementById("history").innerText = num;
}
function getOutput() {
    return document.getElementById("output").innerText;
}
function printOutput(num) {
    document.getElementById("output").innerText = num ? formatNumber(num) : "";
}

// Format numbers with commas
function formatNumber(num) {
    if (num === "-") return "";
    return Number(num).toLocaleString("en");
}

// Remove commas for internal calculations
function removeFormat(num) {
    return Number(num.replace(/,/g, ""));
}

// Handle operator buttons
let operators = document.getElementsByClassName("operator");
for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", function () {
        let output = getOutput();
        let history = getHistory();

        if (this.id === "clear") {
            printOutput("");
            printHistory("");
        } else if (this.id === "backspace") {
            output = removeFormat(output).toString();
            if (output) {
                output = output.slice(0, -1);
                printOutput(output);
            }
        } else {
            if (output === "" && history !== "") {
                if (isNaN(history.slice(-1))) {
                    history = history.slice(0, -1);
                }
            }

            if (output !== "" || history !== "") {
                output = output === "" ? output : removeFormat(output);
                history += output;

                if (this.id === "equal") {
                    let result = eval(history);
                    printOutput(result);
                    printHistory("");
                } else {
                    history += this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

// Handle number buttons
let numbers = document.getElementsByClassName("number");
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function () {
        let output = removeFormat(getOutput())
        if(!isNaN(output)) {
          output += this.id;
          printOutput(output)
        }
    });
}
