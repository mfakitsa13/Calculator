// Select the display element
const display = document.getElementById('display');

// Initialize display value
let displayValue = '';

// Function to update the display
function updateDisplay(value) {
  display.innerText = value;
}

function handleButtonClick(value) { 
    if (value === 'AC') {
        // Clear display
        displayValue = '';
    } else if (value === '=') {
        // Calculate the result
        try {
            // Replace x with * for eval compatibility and evaluate the expression
            const lastValidExpression = displayValue.replace(/([+\-*/])\1+/g, '$1');
            displayValue = eval(lastValidExpression.replace(/x/g, '*')).toString();
        } catch (error) {
            displayValue = 'Error';
        }
    } else if (['+', '-', '*', '/'].includes(value)) {
        // Handle consecutive operators
        if (/[+\-*/]$/.test(displayValue)) {
            if (value === '-') {
                // Allow a minus after another operator for negative numbers
                displayValue += value;
            } else {
                // Replace the last operator with the current one
                displayValue = displayValue.replace(/[+\-*/]+$/, value);
            }
        } else {
            // Append the operator if no consecutive operators are present
            displayValue += value;
        }
    } else if (value === '.') {
        // Handle decimal point
        const lastNumber = displayValue.split(/[\+\-\*/]/).pop(); // Get the last number
        if (!lastNumber.includes('.')) { // Check if the last number has a decimal
            displayValue += value; // Append the decimal point
        }
    } else {
        // Handle numbers and prevent multiple leading zeros
        if (value === '0' && (displayValue === '' || /[+\-*/]0$/.test(displayValue))) {
            return; // Skip appending if it would cause a leading zero
        }
        // Replace leading zero in a number with the new digit
        if (/[+\-*/]0$/.test(displayValue) && value.match(/[1-9]/)) {
            displayValue = displayValue.slice(0, -1); // Remove the zero
        }
        displayValue += value; // Append the digit
    }

    // Update display
    updateDisplay(displayValue || '0');
}

// Add event listeners to all buttons
document.getElementById('equals').addEventListener('click', () => handleButtonClick('='));
document.getElementById('zero').addEventListener('click', () => handleButtonClick('0'));
document.getElementById('one').addEventListener('click', () => handleButtonClick('1'));
document.getElementById('two').addEventListener('click', () => handleButtonClick('2'));
document.getElementById('three').addEventListener('click', () => handleButtonClick('3'));
document.getElementById('four').addEventListener('click', () => handleButtonClick('4'));
document.getElementById('five').addEventListener('click', () => handleButtonClick('5'));
document.getElementById('six').addEventListener('click', () => handleButtonClick('6'));
document.getElementById('seven').addEventListener('click', () => handleButtonClick('7'));
document.getElementById('eight').addEventListener('click', () => handleButtonClick('8'));
document.getElementById('nine').addEventListener('click', () => handleButtonClick('9'));
document.getElementById('add').addEventListener('click', () => handleButtonClick('+'));
document.getElementById('subtract').addEventListener('click', () => handleButtonClick('-'));
document.getElementById('multiply').addEventListener('click', () => handleButtonClick('*'));
document.getElementById('divide').addEventListener('click', () => handleButtonClick('/'));
document.getElementById('decimal').addEventListener('click', () => handleButtonClick('.'));
document.getElementById('clear').addEventListener('click', () => handleButtonClick('AC'));

// Set initial display value
updateDisplay('0');