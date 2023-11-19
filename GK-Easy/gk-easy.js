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
        question: 'Who Was the court poet of Samudragupta?',
        choice1: 'Banabhatta',
        choice2: 'Harishen',
        choice3: 'Chand Bardai',
        choice4: 'Bhavabhuti',
        answer: 2,
    },
    {
        question: "Durin World War II, When did Germany attack France?",
        choice1: "1940",
        choice2: "1941",
        choice3: "1942",
        choice4: "1943",
        answer: 1,
    },
    {
        question: "India's first sattelite is named after",
        choice1: "Aryabhattas",
        choice2: "Bhaskara II",
        choice3: "Bhaskara I",
        choice4: "Albert Einstein",
        answer: 1,
    },
    {
        question: "How many times has Brazil won the World Cup Football Championship?",
        choice1: "Four times",
        choice2: "Twice",
        choice3: "Five Times",
        choice4: "Once",
        answer: 3,
    },
    {
        question: "Indira Gandhi was assassinated in",
        choice1: "1974",
        choice2: "1984",
        choice3: "1994",
        choice4: "2004",
        answer: 2,
    },
    {
        question: "In which year did Sir Edmund Hillary reach the summit of Mount Everest?",
        choice1: "1952",
        choice2: "1953",
        choice3: "1954",
        choice4: "1955",
        answer: 4,
    },
    {
        question: "Which Team won the First Cricket World Cup",
        choice1: "Australia",
        choice2: "West Indies",
        choice3: "India",
        choice4: "England",
        answer: 2,
    },
    {
        question: "India became a member of the United Nations in",
        choice1: "1945",
        choice2: "1947",
        choice3: "1959",
        choice4: "1960",
        answer: 1,
    },
    {
        question: "The first historical mention of the holding of the ancient Olympic Games occurred about",
        choice1: "2000 years ago",
        choice2: "2250 years ago",
        choice3: "2500 years ago",
        choice4: "2775 years ago",
        answer: 4,
    },
    {
        question: "The first lady Prime Minister of a country was",
        choice1: "Srimavo Bhadaranaike (Sri Lanka)",
        choice2: "Maria Estate Pew (Argentina)",
        choice3: "Junko Taibei (Japan)",
        choice4: "None of the above",
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
        return window.location.assign("gk-end.html");
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