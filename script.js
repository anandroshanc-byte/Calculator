const display = document.getElementById('display');

function appendToDisplay(input) {
    // Prevent multiple operators in a row
    const lastChar = display.value.slice(-1);
    const operators = ['+', '-', '*', '/', '%'];
    if (operators.includes(lastChar) && operators.includes(input)) {
        display.value = display.value.slice(0, -1) + input;
    } else {
        display.value += input;
    }
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

/**
 * Safe evaluation without eval()
 * Uses a basic tokenization and calculation logic for + - * / %
 */
function calculate() {
    const expression = display.value;
    if (!expression) return;

    try {
        const result = safeEvaluate(expression);
        display.value = result;
    } catch (error) {
        console.error(error);
        display.value = "Error";
        setTimeout(clearDisplay, 1500);
    }
}

function safeEvaluate(expr) {
    // Remove any non-allowed characters
    const sanitized = expr.replace(/[^-0-9+*/.%]/g, '');
    
    const tokens = tokenize(sanitized);
    if (tokens.length === 0) return "";
    
    return parseExpression(tokens);
}

function tokenize(str) {
    const tokens = [];
    let number = "";
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        
        // Handle negative numbers at start or after an operator
        if (char === '-' && (tokens.length === 0 || ['+', '-', '*', '/', '%'].includes(tokens[tokens.length - 1])) && number === "") {
            number = "-";
            continue;
        }

        if (/[0-9.]/.test(char)) {
            number += char;
        } else {
            if (number !== "" && number !== "-") {
                tokens.push(parseFloat(number));
                number = "";
            } else if (number === "-") {
                // This shouldn't happen with valid math but handle it
                throw new Error("Invalid placement of minus sign");
            }
            tokens.push(char);
        }
    }
    if (number !== "" && number !== "-") tokens.push(parseFloat(number));
    return tokens;
}

function parseExpression(tokens) {
    // 1. Handle Multiplication, Division, and Modulo first (MDM)
    const mdmStack = [];
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token === '*' || token === '/' || token === '%') {
            const left = mdmStack.pop();
            const right = tokens[++i];
            if (right === undefined) throw new Error("Missing operand");
            
            if (token === '*') mdmStack.push(left * right);
            else if (token === '/') {
                if (right === 0) throw new Error("Division by zero");
                mdmStack.push(left / right);
            }
            else if (token === '%') mdmStack.push(left % right);
        } else {
            mdmStack.push(token);
        }
    }
    
    // 2. Handle Addition and Subtraction (AS)
    if (mdmStack.length === 0) return 0;
    
    let result = mdmStack[0];
    for (let i = 1; i < mdmStack.length; i += 2) {
        const op = mdmStack[i];
        const val = mdmStack[i + 1];
        if (val === undefined) throw new Error("Missing operand");
        
        if (op === '+') result += val;
        else if (op === '-') result -= val;
    }
    
    return result;
}
