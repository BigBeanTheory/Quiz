const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('answer'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'A and B are two matrices of the order 3 x m and 3 x n, respectively, and m = n, then the order of matrix (5A - 2B) is',
        choice1: 'm x 3',
        choice2: '3 x 3',
        choice3: 'm x n',
        choice4: '3 x n',
        answer: 4,
    },
    {
        question: "Differentiate y = x(3x2 - 5)?",
        choice1: "9x2 -5x",
        choice2: "9x - 5",
        choice3: "6x",
        choice4: "9x2 - 5",
        answer: 4,
    },
    {
        question: "Find the surface area of a pyramid with a square base length 10 and a slant height of 13",
        choice1: "580 units squared",
        choice2: "480 units squared",
        choice3: "620 units squared",
        choice4: "340 units squared",
        answer: 4,
    },
    {
        question: "Surface Area is found by:",
        choice1: "Adding the lengths of all the sides together",
        choice2: "Adding the area of all the sides together",
        choice3: "Multiplying the length and bases together",
        choice4: "Multiplying the perimeter by two",
        answer: 2,
    },
    {
        question: "How many terms are there in AP 20,25,30....140?",
        choice1: "22",
        choice2: "25",
        choice3: "23",
        choice4: "24",
        answer: 2,
    },
    {
        question: "The 7th term of an AP is -39/12 and the 15th term is -103/12. What is the 27th term?",
        choice1: "-187/12",
        choice2: "-191/12",
        choice3: "-199/12",
        choice4: "-205/12",
        answer: 3,
    },
    {
        question: "Solve for x : 2x + y = 8,  y= - 6",
        choice1: "6",
        choice2: "4",
        choice3: "7",
        choice4: "16",
        answer: 3,
    },
    {
        question: "The probability of an event can't be _____.",
        choice1: "Postive",
        choice2: "Negative",
        choice3: "Both",
        choice4: "None of the Above",
        answer: 2,
    },
    {
        question: "Given that sin A = 1/2  and cos B= 1/ then the value of (A+B) is : ",
        choice1: "30 Degree",
        choice2: "45 Degree",
        choice3: "75 Degree",
        choice4: "15 Degree",
        answer: 3,
    },
    {
        question: "If 1+2+….+k=55, then the value of k is",
        choice1: "10",
        choice2: "11",
        choice3: "12",
        choice4: "13",
        answer: 1,
    },
];


const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("math-end.html");
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000)  
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();