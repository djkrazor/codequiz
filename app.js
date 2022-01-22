var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// question 
var quizQuestions = [{
    question: "How do you get your website online?",
    choiceA: "pick a domain name",
    choiceB: "Register your domain name",
    choiceC: "all the above",
    choiceD: "upload your website",
    correctAnswer: "c"
},
{
    question: "Which one of these is not a programming language?",
    choiceA: "Banana",
    choiceB: "Ruby",
    choiceC: "Java",
    choiceD: "python",
    correctAnswer: "a"
},
{
    question: "Which of these do not run using computer program?",
    choiceA: "train",
    choiceB: "bike",
    choiceC: "rocket",
    choiceD: "car",
    correctAnswer: "b"
},
{
    question: "What are people who write computer code called?",
    choiceA: "manufactures",
    choiceB: "Crytptographers",
    choiceC: "professors",
    choiceD: "Programmers",
    correctAnswer: "d"
},
{
    question: "When is localStorage data cleared?",
    choiceA: "No expiration time",
    choiceB: "On page reload",
    choiceC: "On browser close",
    choiceD: "On computer restart",
    correctAnswer: "a"
},
{
    question: "What is computer coding?",
    choiceA: "Radio show ",
    choiceB: "list of functions",
    choiceC: "tells the computer what to do ",
    choiceD: "tv show ",
    correctAnswer: "c"
},
{
    question: "What word describes instructions that computers need to do work?",
    choiceA: "blueprint",
    choiceB: "program",
    choiceC: "synopsis",
    choiceD: "agenda",
    correctAnswer: "b"
},


];
// Other global variables 
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;


// This function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};
//Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz() {
    gameoverDiv.style.display = "none"; startQuizDiv.style.display = "none";

    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function () {
        timeLeft--;
        // timeleft = timeleft -1
        quizTimer.textContent = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            // when time is equal to 0 to show score and stop timer 
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizBody.style.display = "block";
}
// This function is at the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// This function checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display answer is correct
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display answer is incorrect.
        // 10 seconds will decrease
        timeLeft = timeLeft-10;
    }else{
        showScore();
    }
}

// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local stoage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
submitScoreBtn.addEventListener("click", function highscore(){


    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }

});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// This function displays the high scores page while hiding all of the other pages from 
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}















//This button starts the quiz!
startQuizButton.addEventListener("click",startQuiz);