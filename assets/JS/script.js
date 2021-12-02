var doneEl = document.getElementById('alldone')
var submitButton = document.getElementById("submit")
var scoreEl = document.getElementById("score")
var backButton  = document.getElementById("back")
var wrongEl = document.getElementById("wrong")
var clearButton = document.getElementById("clear")
var highScoresWl = document.getElementById("highScores")
var timerEl = document.getElementById("timer")
var correctEl = document.getElementById("correct")
var userScoreEl = document.getElementById("userScore")
var nameInput=document.getElementById("name")
var userScores = document.getElementById("scores")
var buttonEl = document.getElementById("startbtn")
var startEl = document.getElementById("start")
var quizEl = document.getElementById("quiz")
var questionEl = document.getElementById("question")
var answerEl = document.getElementById("answers")


var questionNumber = 0; //Start with first question in the array questions

var timer = 80; //Initial time, set to player. 
var finalScore = 0; //Set from beginning to 0; 

var questions = [{ //Objects with keys inside and array called question
    question: "Which are JavaScript Data Types:",
    answer: ["Number","String", "All options", "Object" ],
    correct:2,
}, //Defined the correct index of question, to later be used in code. 
{
    question: "The functions inside other functions can be accessed outside of that scope?",
    answer: ["No","Yes", "Depends on the situation", "Functions cannot have other functions" ],
    correct:0,
}
,
{
    question: "All of the next options are Javascript Frameworks for UI except for...",
    answer: ["AngularJS","React", "Ember.js", "SpringCore" ],
    correct:3,
},
{
    question: "Which of the below can be used to debug front end of a web application",
    answer: ["Junit","Fitnesse", "Firebug", "Mockito" ],
    correct:2,
}
]


function done() {
    // 
    if(doneEl.style.display == "none"){
        doneEl.style.display = "block"
        userScoreEl.textContent = "Your final score " + finalScore
    }
    else{
        doneEl.style.display = "none"

    }
}

function score() {

    // Show the Scores, at last element shown on screen
    while (userScores.lastElementChild) {
        userScores.removeChild(userScores.lastElementChild);
      }
    if(scoreEl.style.display == "none"){
        scoreEl.style.display = "block"

        Object.keys(localStorage).forEach(element => {
            var user = document.createElement("li")
            user.textContent = element + " - " +localStorage.getItem(element)
            user.setAttribute('class', "bg-secondary text-white p-1 mb-2")
            userScores.appendChild(user)
            
        });

    }
    else{
        scoreEl.style.display = "none"

    }
}

function start() {
    // Function which set all of the other elements and continuity. 

    if(startEl.style.display == "none"){
        startEl.style.display = "block"
    }
    else{
        startEl.style.display = "none"

    }
}

function quiz() {
    // We start the quiz
    if(quizEl.style.display == "none"){
        quizEl.style.display = "block"
    }
    else{
        quizEl.style.display = "none"

    }
}

function wrong() {
    // If wrong answer is picked then it will display a message Incorrect, and for a seconds visible on screen.
    if(wrongEl.style.display == "none"){
        wrongEl.style.display = "block"
        var correctTime = 1
        var timerInterval = setInterval(function() {
            correctTime--
            if(correctTime == 0){
                clearInterval(timerInterval)
                wrong()
            }
        
        }, 1000)
    }
    else{
        wrongEl.style.display = "none"

    }
}

function correct() {
    // If answer is the correct, message will display on screen CORRECT for a second. 

    if(correctEl.style.display == "none"){
        correctEl.style.display = "block"

        var correctTime = 1
        var timerInterval = setInterval(function() {
            correctTime--
            if(correctTime == 0){
                clearInterval(timerInterval)
                correct()
            }
        
        }, 1000)
    }
    else{
        correctEl.style.display = "none"

    }
}

function setQuestion() { //Functions thats takes questions from array and sets them for the user. 

    while (answerEl.lastElementChild) {
        answerEl.removeChild(answerEl.lastElementChild);
      }

    if(questions[questionNumber]){
        questionEl.textContent = questions[questionNumber].question
    
        questions[questionNumber].answer.forEach(function(element, i) {
            var answers = document.createElement("button")
            answers.textContent =element
            console.log(i)
            answers.setAttribute("class","btn btn-primary  p-3 m-2 ")
            answers.setAttribute("data-index", i)
            answerEl.appendChild(answers)
    
        });
    }
    else{
        finalScore = timer
        timer = 1
    }

}

// Takes what the user inputs to load it to local storage. 
submitButton.addEventListener("click", function () {
    done()
    var name = nameInput.value.trim()
    localStorage.setItem(name, timer)
    score()

})

// Button to go to the main screen. 
backButton.addEventListener("click", function(){
    score()
    start()
    timerEl.textContent = "Time: 80"
})

// Sets the time Left on screen. 
function time(){

    console.log(timer)
    var timerInterval = setInterval(function() {
        timer--
        timerEl.textContent = "Time: " + timer
        

        if(timer == 0){
            clearInterval(timerInterval)
            quiz()
            done()
        }
    
    }, 1100)


}

//EVENT LISTENERS BEGIN HERE: 

buttonEl.addEventListener("click", function(){
    timer = 80
    questionNumber = 0
    console.log(timer, questionNumber)
    time()

    start() 
    quiz()

    setQuestion()


    
    
    answerEl.addEventListener("click", function (event) {
        var element = event.target
        
        if(element.matches("button")){
            var index = element.getAttribute("data-index")

            console.log(index, questions[questionNumber].correct)
            
            if(index == questions[questionNumber].correct){
                questionNumber++
                correct()
                setQuestion()

            }
            else{
                questionNumber++
                timer -= 10
                setQuestion()
                wrong()
            }

        }
    })
   




})

// Clears local storage
clearButton.addEventListener("click", function(){
    localStorage.clear()

    while(userScores.lastElementChild){
        userScores.removeChild(userScores.lastElementChild)
    }

    toggleScore()
    toggleScore()
})

// Shows high scores
highScoresWl.addEventListener("click", function(){
    start()
    toggleScore()

})

//EVENT LISTENERS FINISH HERE. 