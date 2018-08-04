var quiz = [

  {
    question: "How many kids does Ross have?",
    choices: ["1", "2", "3"],
    answer: "2",
    isAnswered: false
  },
  {
    question: "Who does Chandler marry?",
    choices: ["Monica", "Rachel", "Phoebe"],
    answer: "Monica",
    isAnswered: false
  },
  {
    question: "What is Joey's favourite food?",
    choices: ["Hotdog", "Caeser Salad", "Sandwiches"],
    answer: "Sandwiches",
    isAnswered: false
  },
  {
    question: "How many times does Ross get married?",
    choices: ["1", "2", "3"],
    answer: "3",
    isAnswered: false
  },
  {
    question: "How many children does Monica have?",
    choices: ["0", "1", "2"],
    answer: "2",
    isAnswered: false
  },
  {
    question: "How many sisters does Rachel have?",
    choices: ["4", "2", "1"],
    answer: "2",
    isAnswered: false
  },
  {
    question: "Which actor plays the role of 'Will - from highschool' in the show?",
    choices: ["Tom Cruise", "Paul Stevens", "Brad Pitt"],
    answer: "Brad Pitt",
    isAnswered: false
  }
];

console.log(quiz);
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;

function showQuestions(data, i) {
  stopwatch.start();
  var questionDiv = $("<div>");
  questionDiv.addClass("qna-style");
  questionDiv.text(data[i].question);
  var answersDiv = $("<div>");
  answersDiv.addClass("qna-style");
  // start for-loop to create 3 buttons for each question
  for (var k = 0; k < 3; k++) {
    var option = $('<input type="radio" >' + data[i].choices[k] + '</input>');
    option.data("questionPointer", data[i]);
    console.log("choice is: " + data[i].choices[k]);
    // name keeps the radio buttons exclusive
    option.attr("name", "button" + i);

    // value stores the choice/value associated with the button
    option.attr("value", data[i].choices[k]);
   
    // id stores the correct answer to the question
    option.attr("id", data[i].answer);

    // radio-button class is to listen the clicks
    option.addClass("radio-button");
    answersDiv.append(option);
  }         //close for loop-button creation   
  var newDiv = $("<div>");
  $("#qna").before(newDiv);
  newDiv.addClass("qna-border-style");
  newDiv.append(questionDiv).append(answersDiv);
}          //close showQuestions()

function showSubmitButton() {
  var submitButton = $("<button>");
  submitButton.attr("type", "button");
  submitButton.addClass("btn btn-primary");
  submitButton.attr("data-toggle", "modal");
  submitButton.attr("data-target", "#exampleModalCenter");
  submitButton.attr("id", "submit");
  submitButton.addClass("button-style");
  submitButton.text("Submit");
  $("#qna").append(submitButton);
}

function clickFunction() {
  var button = $(this);
  var quesNum = button.data("questionPointer");
  quesNum.isAnswered = true;
  console.log(quesNum.isAnswered);
  var correctAns = button.attr("id");
  console.log("correct ans is ------ " + correctAns);
  var selection = button.attr("value");
  console.log("I selected----- " + selection);
  if ((quesNum.isAnswered === true) && (selection === correctAns)) {
    correctAnswers = correctAnswers + 1;
    console.log("#correct: " + correctAnswers)
  }
  else if ((quesNum.isAnswered === true) && (selection !== correctAns)) {
    incorrectAnswers = incorrectAnswers + 1;
    console.log("#incorrect: " + incorrectAnswers);
  }
}   //close clickFunction()

$(document).on("click", ".radio-button", clickFunction);

function showScore() {

  for (var j = 0; j < quiz.length; j++) {
    if (quiz[j].isAnswered === false) {
      unanswered = unanswered + 1;
    }
  }
  var remTime = stopwatch.timeLeft();
  var scoreDiv = $("<div>");
  var cor, incor, unans;
   var timeDiv = $("<p>");
  cor = $("<p>");
  incor = $("<p>");
  unans = $("<p>");
  cor.text("Correct answers: " + correctAnswers);
  console.log("correct ans: " + correctAnswers);
  incor.text("Incorrect answers: " + incorrectAnswers);
  console.log("incorect ans: " + incorrectAnswers);
  unans.text("Unanswered: " + unanswered);
  console.log("unanswered: " + unanswered);
  timeDiv.text("Completed in: "+remTime);
  $("#score-append").html(scoreDiv);
  scoreDiv.append(timeDiv).append(cor).append(incor).append(unans);

}  //close showScore()



window.onload = function () {

  // $("#submit").on("click", stopwatch.stop);
 
  $("#start").on("click", stopwatch.start);
  
      
}

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;

// Our stopwatch object
var stopwatch = {
  timerset: 30,
  time: 30,
  timed: 0,

  start: function () {
    // $(".container").addClass("display-container");
    // $("header").addClass("no-display-container");
    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
      intervalId = setInterval(stopwatch.count, 1000);
      clockRunning = true;
      for (var k = 0; k < quiz.length; k++) {
        showQuestions(quiz, k);
      }
      showSubmitButton();
    }
  },
  stop: function () {

    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
  },
  count: function () {

    // DONE: increment time by 1, remember we cant use "this" here.
    stopwatch.time--;
    console.log(stopwatch.time);
    if (stopwatch.time === 00) {
      stopwatch.stop();
      showScore();
      $("#exampleModalCenter").modal('show');
    }
    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = stopwatch.timeConverter(stopwatch.time);
    console.log(converted);

    // DONE: Use the variable we just created to show the converted time in the "display" div.
    $("#timer").text(converted);
  },
  timeLeft: function(){
    var timedIn = stopwatch.timerset - stopwatch.time;
    stopwatch.timed= stopwatch.timeConverter(timedIn);
    return(stopwatch.timed);
  },
  timeConverter: function (t){

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }

};

$(document).on("click", "#submit", function() {
  stopwatch.stop();
  showScore();
});

// -------------------------------------
// -------------------------------------
// ------- adding audio file------------
// -------------------------------------
// -------------------------------------




