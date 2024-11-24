const { isCorrectAnswer, getQuestion } = require("../../utils/mathUtilities");

describe("Tests for getQuestion", () => {
    test("should return an object with num1, num2, operator, and correctAnswer", () => {
        const question = getQuestion();
        expect(question).toHaveProperty("num1");
        expect(question).toHaveProperty("num2");
        expect(question).toHaveProperty("operator");
        expect(question).toHaveProperty("correctAnswer");
    });

    test("should generate valid operators (+, -, *, /)", () => {
        const question = getQuestion();
        const validOperators = ["+", "-", "*", "/"];
        expect(validOperators).toContain(question.operator);
    });

    test("should calculate the correctAnswer based on the operator", () => {
        const { num1, num2, operator, correctAnswer } = getQuestion();

        let expectedAnswer;
        switch (operator) {
            case "+":
                expectedAnswer = num1 + num2;
                break;
            case "-":
                expectedAnswer = num1 - num2;
                break;
            case "*":
                expectedAnswer = num1 * num2;
                break;
            case "/":
                expectedAnswer = parseFloat((num1 / num2).toFixed(2));
                break;
        }

        expect(correctAnswer).toBe(expectedAnswer);
    });
});

describe("Tests for isCorrectAnswer", () => {
    test("should return true for a correct answer", () => {
        const question = { num1: 5, num2: 3, operator: "+", correctAnswer: 8 };
        const userAnswer = 8;
        expect(isCorrectAnswer(userAnswer, question.correctAnswer)).toBe(true);
    });

    test("should return false for an incorrect answer", () => {
        const question = { num1: 5, num2: 3, operator: "+", correctAnswer: 8 };
        const userAnswer = 10;
        expect(isCorrectAnswer(userAnswer, question.correctAnswer)).toBe(false);
    });
});
