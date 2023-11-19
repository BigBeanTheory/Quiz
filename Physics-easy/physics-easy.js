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
        question: 'What is the S.I. Unit of electric current?',
        choice1: 'Ohm',
        choice2: 'Farday',
        choice3: 'Ampere',
        choice4: 'Volt',
        answer: 3,
    },
    {
        question: "What is the hindrance to the flow of electric current known as?",
        choice1: "Resistance",
        choice2: "Potential Difference",
        choice3: "Inductance",
        choice4: "Conductance",
        answer: 1,
    },
    {
        question: "What is  the definition of average velocity?",
        choice1: "Average Velocity = displacement ------------------ elapsed time",
        choice2: "Elapsed time= Distance ------------- speed",
        choice3: "Velocity= Elapsed time ----------------- acceleration",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "What is the flow of electric charges called?",
        choice1: "Electric conductance",
        choice2: "Electric current",
        choice3: "Electric potential",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: "The least distance of distinct vision for a young adult with normal vision is",
        choice1: "25m",
        choice2: "20m",
        choice3: "25cm",
        choice4: "20cm",
        answer: 1,
    },
    {
        question: "The persistence of vision for human eye is",
        choice1: "1/10th of a second",
        choice2: "1/16th of a second",
        choice3: "1/6th of the second",
        choice4: "1/18th of a second",
        answer: 3,
    },
    {
        question: "The amount of light entering the human eye is controlled by",
        choice1: "Ciliary muscles",
        choice2: "Pupil",
        choice3: "Cornea",
        choice4: "Iris",
        answer: 2,
    },
    {
        question: "A body of mass 1kg is attracted by the earth with a force which is equal to",
        choice1: "9.8N",
        choice2: "6.67x 1011",
        choice3: "1 N",
        choice4: "9.8m/s",
        answer: 1,
    },
    {
        question: "Which method is used to produce electricity in hydroelectric power plant.",
        choice1: "By boiling the water to produce steam",
        choice2: "By ionizing water",
        choice3: "By running dynamo by kinetic energy",
        choice4: "All of the Above",
        answer: 3,
    },
    {
        question: "Who has stated the Right hand Thumb Rule?",
        choice1: "Orsted",
        choice2: "Fleming",
        choice3: "Einstein",
        choice4: "Maxwell",
        answer: 4,
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
        return window.location.assign("physics-end.html");
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