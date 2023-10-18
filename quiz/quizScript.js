const questions = [
    {
        question: "What is your preferred protein source for a healthy dinner?",
        answers: [
            {text: "Chicken", correct: true},
            {text: "Tofu", correct: true},
            {text: "Lentils", correct: true},
            {text: "Fish", correct: true},
        ]
    },
    {
        question: "What kind of cuisine are you in the mood for?",
        answers: [
            {text: "Italian", correct: true},
            {text: "Mexican", correct: true},
            {text: "Asian", correct: true},
            {text: "Mediterranean", correct: true},
        ]
    },
    {
        question: "Which vegetable would you like to include in your meals?",
        answers: [
            {text: "Spinach", correct: true},
            {text: "Kale", correct: true},
            {text: "Arugula", correct: true},
            {text: "Mixed Greens", correct: true},
        ]
    },
    {
        question: "What is your preferred cooking method for dinner preparation?",
        answers: [
            {text: "Grilling", correct: true},
            {text: "Stir-frying", correct: true},
            {text: "Roasting", correct: true},
            {text: "Steaming", correct: true},
        ]
    },
    {
        question: "Which type of grain would you like to incorporate into your meals?",
        answers: [
            {text: "Quinoa", correct: true},
            {text: "Brown Rice", correct: true},
            {text: "White Rice", correct: true},
            {text: "Oats", correct: true},
        ]
    }    
];

const questionElement = document.getElementById("question");
const answerChoices = document.getElementById("answer-choices");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;

function startQuiz(){
    let answers = [];
    currentQuestionIndex = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("choice");
        answerChoices.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
    // to do : append selection to answers array

}

function resetState(){
    nextBtn.style.display = "none";
    while(answerChoices.firstChild){
        answerChoices.removeChild(answerChoices.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
    }
    nextBtn.style.display = "block";
}

function getResults(){
    resetState();
    questionElement.innerHTML = "RESULTS";
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        getResults();
    }
}

nextBtn.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})


startQuiz();

