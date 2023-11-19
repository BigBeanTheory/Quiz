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
        question: 'Law of Conservation of Mass states that the total mass of the reactants should be',
        choice1: 'More than the mass of products',
        choice2: 'Equal to the mass of products',
        choice3: 'Ignored during the reaction',
        choice4: 'Less than the mass of the products',
        answer: 2,
    },
    {
        question: "Reaction with quick lime and water is an example of",
        choice1: "Endothermic",
        choice2: "Displacement",
        choice3: "Exothermic",
        choice4: "Photolytic",
        answer: 3,
    },
    {
        question: "Which one of the following will turn blue litmus red?",
        choice1: "Vinegar",
        choice2: "Lime Water",
        choice3: "Baking Soda Solution",
        choice4: "Washing Soda Solution",
        answer: 2,
    },
    {
        question: "The chemical formula of caustic potash is",
        choice1: "NaOH",
        choice2: "Ca(OH)2",
        choice3: "NH4OH",
        choice4: "KOH",
        answer: 4,
    },
    {
        question: "The bronze medals are made up of",
        choice1: "Cu and Zn",
        choice2: "Zn and Ni",
        choice3: "Cu and Sn",
        choice4: "Cu, Zn, Tn",
        answer: 3,
    },
    {
        question: "Fatty foods become rancid due to the process of",
        choice1: "Oxidation",
        choice2: "Corrosion",
        choice3: "Reduction",
        choice4: "Hydrogenation",
        answer: 1,
    },
    {
        question: "An element belongs to period 2 and group 2 the number of valence electrons in the atoms of this element is.",
        choice1: "2",
        choice2: "4",
        choice3: "3",
        choice4: "1",
        answer: 1,
    },
    {
        question: "In the third period of the periodic table the element having smallest size is",
        choice1: "Na",
        choice2: "Ar",
        choice3: "Cl",
        choice4: "Si",
        answer: 2,
    },
    {
        question: "Electronic configuration of Al+3 is",
        choice1: "2,8,3",
        choice2: "2,8,8r",
        choice3: "2,8",
        choice4: "2,8,8,3",
        answer: 3,
    },
    {
        question: "The isomeric pair is",
        choice1: "Ethane and Propane",
        choice2: "Propane and Butane",
        choice3: "Ethane and Ethane",
        choice4: "Butane and 2-Methyl Propane",
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
        return window.location.assign("chemistry-end.html");
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