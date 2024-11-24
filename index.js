const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static('public')); // To serve static files (e.g., CSS));

// Route: Home Page
app.get('/', (req, res) => {
    const streak = req.app.locals.streak || 0; // Default streak is 0 if undefined
    res.render('index', { streak });
});

// Route: Quiz Page (GET)
app.get('/quiz', (req, res) => {
    // Generate random numbers and operator
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    // Calculate the correct answer
    let correctAnswer;
    switch (operator) {
        case '+': correctAnswer = num1 + num2; break;
        case '-': correctAnswer = num1 - num2; break;
        case '*': correctAnswer = num1 * num2; break;
        case '/': correctAnswer = parseFloat((num1 / num2).toFixed(2)); break; // Round to 2 decimals
    }

    // Store the question and correct answer
    req.app.locals.currentQuestion = { num1, num2, operator, correctAnswer };

    // Pass the question and a default null error to the EJS template
    res.render('quiz', { num1, num2, operator, error: null });
});

// Route: Quiz Submission (POST)
app.post('/quiz', (req, res) => {
    const { answer } = req.body; // Get user input
    const userAnswer = parseFloat(answer); // Convert input to a number
    const { correctAnswer } = req.app.locals.currentQuestion; // Get the correct answer

    // Retrieve streak or initialize it
    req.app.locals.streak = req.app.locals.streak || 0;

    // Validate the user's answer
    if (userAnswer === correctAnswer) {
        req.app.locals.streak += 1; // Increment streak
        console.log('Correct answer!');
        res.redirect('/quiz/completion'); // Redirect to completion page
    } else {
        // Reset streak and pass an error message back to the quiz page
        req.app.locals.streak = 0;
        console.log('Incorrect answer.');
        res.render('quiz', {
            num1: req.app.locals.currentQuestion.num1,
            num2: req.app.locals.currentQuestion.num2,
            operator: req.app.locals.currentQuestion.operator,
            error: 'Incorrect answer. Try again!'
        });
    }
});

// Route: Quiz Completion Page
app.get('/quiz/completion', (req, res) => {
    const streak = req.app.locals.streak || 0; // Get the current streak

    // Initialize leaderboards if not already present
    req.app.locals.leaderboards = req.app.locals.leaderboards || [];

    // Update leaderboards only if streak is greater than 0
    if (streak > 0) {
        const date = new Date().toLocaleString(); // Get current date and time
        req.app.locals.leaderboards.push({ streak, date });

        // Sort leaderboards by streak in descending order and keep only the top 10
        req.app.locals.leaderboards = req.app.locals.leaderboards
            .sort((a, b) => b.streak - a.streak)
            .slice(0, 10);
    }

    res.render('completion', { streak }); // Render the completion page
});

// Route: Leaderboards Page
app.get('/leaderboards', (req, res) => {
    const leaderboards = req.app.locals.leaderboards || []; // Ensure leaderboards is always an array
    res.render('leaderboards', { leaderboards });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
