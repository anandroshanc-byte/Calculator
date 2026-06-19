# Simple Modern Calculator

A clean, stylish, and functional calculator built with vanilla HTML, CSS, and JavaScript.

## Features
- **Responsive Design**: Works on mobile and desktop devices.
- **Modern UI**: Stylish dark theme with rounded buttons, smooth transitions, and hover effects.
- **Safe Evaluation**: Does **NOT** use `eval()`. Instead, it employs a custom token-based mathematical parser for security.
- **Basic Operations**: Supports Addition (+), Subtraction (−), Multiplication (×), Division (÷), and Modulo (%).

## How it works (Safe Evaluation)
The calculator's logic avoids the dangerous `eval()` function by:
1. **Sanitizing Input**: Only allows numbers and mathematical operators.
2. **Tokenization**: Breaks the input string into numbers (including negatives) and operator tokens.
3. **Two-Pass Parsing**: 
   - **Pass 1**: Handles Multiplication, Division, and Modulo (higher precedence).
   - **Pass 2**: Handles Addition and Subtraction (lower precedence).

## Getting Started
Simply open `index.html` in your web browser to start calculating!

## Screenshot
(Imagine a beautiful dark-themed calculator here)
