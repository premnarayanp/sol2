//Write your javascript code here

let score = 0;
let timer = 60;
let interval;

const scoreDisplay = document.getElementById('score');
const startRulesDiv = document.getElementById("start-rules");

document.getElementById('startQuiz').addEventListener('click', function () {
    startRulesDiv.style.display = "none";
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('quizScreen').classList.remove('hidden');
    getQuestion();
    startTimer();
    updateScore();
});

document.getElementById('playAgain').addEventListener('click', function () {
    document.getElementById('endScreen').classList.add('hidden');
    document.getElementById('quizScreen').classList.remove('hidden');
    score = 0;
    timer = 60;
    getQuestion();
    startTimer();
    updateScore();
});
// write play again code here


const question = document.getElementById("question");
const answers = document.getElementsByClassName("answer");
const timerElement = document.getElementById("timer");
const finalScore = document.getElementById("finalScore");
const endMessage = document.getElementById("endMessage");

async function getQuestion() {
    try {
        // call the api here use async-await
        const response = await fetch("https://opentdb.com/api.php?amount=1");
        const data = await response.json();
        let lastIndex = 0;
        const questionSet = data.results[0];
        question.textContent = questionSet.question;
        questionSet.incorrect_answers.forEach((option, index) => {
            answers[index].textContent = option;
            answers[index].setAttribute("onclick", "wrongAnswer()");
            ++lastIndex;
        });
        answers[lastIndex].textContent = questionSet.correct_answer;
        answers[lastIndex].setAttribute("onclick", "correctAnswer()");
        //console.log("questionSet=", questionSet.correct_answer);

    } catch (error) {
        // error handling code
        console.error('Failed to fetch question:', error);
        question.innerText = 'Failed to load question. Please try again.';
    }
}

function correctAnswer() {
    console.log("--------correctAnswer--------");
    score += 10;
    updateScore();
    getQuestion()
}

function wrongAnswer() {
    console.log("--------wrongAnswer--------");
    getQuestion();

}

function updateScore() {
    document.getElementById("score").innerText = score;
}

function startTimer() {
    interval = setInterval(function () {

        if (timer === 0) {
            endGame();
            return;
        }
        timerElement.innerText = `Time left: ${timer} seconds`;
        timer--;

        // timer--;
        // timerElement.innerText = `Time left: ${timer} seconds`;
        // if (timer === 1) {
        //     endGame();
        // }
    }, 1000);
}

function endGame() {
    clearInterval(interval);
    document.getElementById('quizScreen').classList.add('hidden');
    document.getElementById('endScreen').classList.remove('hidden');
    endMessage.textContent = "You were excellent during quiz";
    document.getElementById("finalScore").innerText = `Your score: ${score}`;
    //finalScore.textContent =
}