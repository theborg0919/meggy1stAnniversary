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
        document.getElementById('boxFeedback').innerHTML = "now...";
        setTimeout(() => {
            document.getElementById('boxGame').style.display = 'none';
            startQuiz(); 
        }, 1000);
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
    document.getElementById('boxFeedback').innerHTML = "WRONG.";
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
        correctAnswer: 1 // Index of the correct answer
    },
    {
        question: "What was \"the pool incident\"?",
        options: ["dropped my phone in the pool", "pushed you into the pool", "shark in the pool", "the titanic"],
        correctAnswer: 0
    },
    {
        question: "What did we paint at Color Me Mine?",
        options: ["A car and a bowl", "A bowl and a cup", "A cup and a plate", "Batman"],
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
    
    if (selectedOption === currentQuestion.correctAnswer) {
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
    document.getElementById('quizGame').style.display = 'block';
    loadQuestion();
}

const asciiArtString = `
________00000000000___________000000000000_________
______00000000_____00000___000000_____0000000______
____0000000_____________000______________00000_____
___0000000_______________0_________________0000____
__000000____________________________________0000___
__00000_____________________________________ 0000__
_00000______________________________________00000__
_00000_____________________________________000000__
__000000_________________________________0000000___
___0000000______________________________0000000____
_____000000____________________________000000______
_______000000________________________000000________
__________00000_____________________0000___________
_____________0000_________________0000_____________
_______________0000_____________000________________
_________________000_________000___________________
_________________ __000_____00_____________________
______________________00__00_______________________
________________________00_________________________
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