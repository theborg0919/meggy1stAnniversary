function unbox() {
    document.getElementById('box').style.display = 'none';
    document.getElementById('message').style.display = 'block';
}

const correctNumber = Math.floor(Math.random() * 10) + 1;

function checkGuess() {
    const userGuess = Number(document.getElementById('guess').value);
    const feedback = document.getElementById('feedback');

    if (userGuess === correctNumber) {
        feedback.innerHTML = "good job!";
        feedback.style.color = "green";
        setTimeout(() => {
            document.getElementById('message').style.display = 'none';
            document.getElementById('boxGame').style.display = 'block';
        }, 1000);
    } else if (userGuess < correctNumber) {
        feedback.innerHTML = "higher...";
        feedback.style.color = "blue";
    } else {
        feedback.innerHTML = "lower...";
        feedback.style.color = "blue";
    }
}

let correctOrder = [1, 2, 3, 4, 5, 6];
let clickedOrder = [];

function flipBox(boxNumber) {
    clickedOrder.push(boxNumber);
    const box = document.getElementById(`box${boxNumber}`);
    box.classList.add('flipped');

    if (!checkOrder()) {
        resetBoxes();
    } else if (clickedOrder.length === correctOrder.length) {
        document.getElementById('boxFeedback').innerHTML = "YAYAY CLICK BELOW NOW";
        const nextButton = document.getElementById('nextButton');
        nextButton.style.display = 'block';
        nextButton.onclick = startQuiz;
    }
}

function checkOrder() {
    for (let i = 0; i < clickedOrder.length; i++) {
        if (clickedOrder[i] !== correctOrder[i]) {
            return false;
        }
    }
    return true;
}

function resetBoxes() {
    clickedOrder = [];
    document.getElementById('boxFeedback').innerHTML = "nopers click it in order";
    setTimeout(() => {
        document.getElementById('boxFeedback').innerHTML = "";
        for (let i = 1; i <= 6; i++) {
            const box = document.getElementById(`box${i}`);
            box.classList.remove('flipped');
        }
    }, 1000);
}


const quizQuestions = [
    {
        question: "My favorite color?",
        options: ["red", "orange", "black", "i don't have a favorite color because i can't choose"],
        correctAnswer: 1 
    },
    {
        question: "What was \"the pool incident\"?",
        options: ["dropped my phone in the pool", "pushed you into the pool", "shark in the pool", "the titanic"],
        correctAnswer: 0
    },
    {
        question: "What did we paint at Color Me Mine?",
        options: ["A car and a bowl", "A box and a cup", "A cup and a plate", "Batman"],
        correctAnswer: 1
    },
    {
        question: "I love you",
        options: ["I love you too", "Aww thanks", "Mwahahaha", "I love you MORE"],
        correctAnswer: 3
    },
    {
        question: "Who's the best girlfriend?",
        options: ["meggy", "catwoman", "megan josephine chou", "my girlfriend"],
        correctAnswer: [0,1,2,3]
    }
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    document.getElementById('quizQuestion').innerText = currentQuestion.question;
    document.getElementById('option1').innerText = currentQuestion.options[0];
    document.getElementById('option2').innerText = currentQuestion.options[1];
    document.getElementById('option3').innerText = currentQuestion.options[2];
    document.getElementById('option4').innerText = currentQuestion.options[3];
}

function checkAnswer(selectedOption) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const quizFeedback = document.getElementById('quizFeedback');

    console.log(`Selected Option: ${selectedOption}, Correct Answer: ${currentQuestion.correctAnswer}`);

    const isCorrect = Array.isArray(currentQuestion.correctAnswer)
        ? currentQuestion.correctAnswer.includes(selectedOption)
        : currentQuestion.correctAnswer === selectedOption;

    if (isCorrect) {
        quizFeedback.innerHTML = "YIPPEE!";
        quizFeedback.style.color = "green";

        setTimeout(() => {
            quizFeedback.innerHTML = "";
            currentQuestionIndex++;

            if (currentQuestionIndex < quizQuestions.length) {
                loadQuestion();
            } else {
                document.getElementById('quizGame').style.display = 'none';
                startFinalSurprise();
            }
        }, 1000);
    } else {
        quizFeedback.innerHTML = "how did you get this wrong... try again";
        quizFeedback.style.color = "red";
    }
}


function startQuiz() {
    document.getElementById('boxGame').style.display = 'none';

    document.getElementById('quizGame').style.display = 'block';

    loadQuestion();
}


const asciiArtString = `I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU 
I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU 
I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU 
I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU 
I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU 
I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU 
I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU 
I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU 
I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU 
I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU 
I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU I LOVE YOU 
`;

function typeAsciiArt() {
    const artContainer = document.getElementById('asciiArt');
    const cursor = document.getElementById('cursor');
    let index = 0;

    const interval = setInterval(() => {
        artContainer.innerText += asciiArtString[index];
        index++;

        artContainer.appendChild(cursor);

        if (index >= asciiArtString.length) {
            clearInterval(interval);
            cursor.style.display = 'none'; 
        }
    }, 50); 
}

function startFinalSurprise() {
    document.getElementById('finalSurprise').style.display = 'block'; 
    typeAsciiArt(); 
}
