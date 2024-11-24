// Generates a math question
function getQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1-10
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ["+", "-", "*", "/"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    // Calculate the correct answer based on the operator
    let correctAnswer;
    switch (operator) {
        case "+":
            correctAnswer = num1 + num2;
            break;
        case "-":
            correctAnswer = num1 - num2;
            break;
        case "*":
            correctAnswer = num1 * num2;
            break;
        case "/":
            correctAnswer = parseFloat((num1 / num2).toFixed(2)); // Round to 2 decimals
            break;
    }

    return { num1, num2, operator, correctAnswer };
}

// Compares the user's answer with the correct answer
function isCorrectAnswer(userAnswer, correctAnswer) {
    return parseFloat(userAnswer) === correctAnswer;
}

module.exports = { getQuestion, isCorrectAnswer };
