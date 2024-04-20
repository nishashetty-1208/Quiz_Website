const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What is the purpose of including a JavaScript file within an HTML document using a <script> tag with the src attribute?',
        choice1: 'Reduce the amount of code written by including commonly used functions in a separate file',
        choice2: "Download the JavaScript file to the browser's cache for faster loading of subsequent pages",
        choice3: 'Change the way the JavaScript code is interpreted by the browser.',
        choice4: 'None of the above',
        answer: 1,
    },
    {
        question: 'What is the difference between the confirm() and alert() methods in JavaScript?',
        choice1: 'confirm() displays a message box, while alert() writes the message to the console.',
        choice2: 'alert() displays a message box, while confirm() writes the message to the console and returns a Boolean value.',
        choice3: 'Both display a message box, but confirm() allows the user to choose between "OK" and "Cancel" and returns a Boolean value.',
        choice4: 'There is no difference between these methods.',
        answer: 3,
    },
    {
        question: 'How can you access the value entered by a user in a form field using JavaScript?',
        choice1: 'Using the name of the form followed by the dot (.) operator and the name of the field',
        choice2: 'There is no way to access the value entered by the user in a JavaScript program',
        choice3: 'You can access it using the window.prompt() method.',
        choice4: 'You can access it using the document.write() method.',
        answer: 1,
    },
    {
        question: 'Which of the following is NOT a way to validate data entered in a form using JavaScript?',
        choice1: 'Check if the entered value contains only alphabetic characters and full stops',
        choice2: 'Validate if the email address follows a specific format',
        choice3: 'Ensure the length of the phone number is 10 digits for a mobile number.',
        choice4: 'Disallow any characters other than numeric digits in the telephone number field.',
        answer: 2,
    },
    {
        question: 'What is the purpose of comments in JavaScript code?',
        choice1: 'To execute code immediately.',
        choice2: 'To change the background color of the webpage.',
        choice3: 'To declare variables.',
        choice4: 'To improve code readability and provide explanations.',
        answer: 4,
    },
    {
        question: 'Which keyword is used to declare variables in JavaScript?',
        choice1: 'const',
        choice2: 'let',
        choice3: 'variable',
        choice4: 'var',
        answer: 4,
    },
    {
        question: 'What is the result of 5 + "5" in JavaScript',
        choice1: '10',
        choice2: '"55"',
        choice3: '25',
        choice4: 'Error',
        answer: 2,
    },
    {
        question: 'Which operator is used for strict equality comparison in JavaScript?',
        choice1: '=',
        choice2: '==',
        choice3: '===',
        choice4: '!=',
        answer: 3,
    },
    {
        question: 'What method is used to convert a string to uppercase in JavaScript?',
        choice1: 'toUpper()',
        choice2: 'makeUpperCase()',
        choice3: 'upperCase()',
        choice4: 'toUpperCase()',
        answer: 4,
    },
    {
        question: 'What does the if...else statement do in JavaScript?',
        choice1: 'Executes a block of code only if a specified condition is true; otherwise, it executes another block of code.',
        choice2: 'Repeats a block of code until a condition becomes false.',
        choice3: 'Defines a function in JavaScript.',
        choice4: 'Assigns a value to a variable.',
        answer: 1,
    },
];

const SCORE_POINTS = 1;
const MAX_QUESTIONS = 10;

const startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/end.html');
    }
    questionCounter++;
    progressText.innerText = `question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

      // Store the selected answer in localStorage
      const questionIndex = questions.indexOf(currentQuestion);
      let userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
      userAnswers[questionIndex] = selectedAnswer;
      localStorage.setItem('userAnswers', JSON.stringify(userAnswers));

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

const incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startQuiz();
