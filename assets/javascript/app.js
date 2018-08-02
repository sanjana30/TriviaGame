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
        choices: ["Hotdog","Caeser Salad", "Sandwiches"],
        answer: "Sandwiches",
        isAnswered: false
    }
    
  ];
  
  console.log(quiz);
  var correctAnswers=0;
  var incorrectAnswers=0;
  var unanswered=0;
  for(var k=0; k<quiz.length; k++){
    showQuestions(quiz, k);
  }
  // showQuestions(quiz,0);
  // showQuestions(quiz, 1);
  // showQuestions(quiz, 2);

  function showQuestions(data, i){
      var questionDiv = $("<div>");
      
      questionDiv.text(data[i].question);
        
        var answersDiv = $("<div>");
      
        for(var k=0; k<3; k++){
            var option= $('<input type="radio" >'+data[i].choices[k]+'</input>');
            // option.data("questionPointer",data[i]);
            option.data("questionPointer", data[i]);
            console.log("choice is: " +data[i].choices[k]);
            // console.log("TEST", option.data("questionPointer").isAnswered);
            // console.log("new attr is " +option.attr("questionPointer"));

            // option.attr("testattr", "yes");
            
            // name keeps the radio buttons exclusive
            option.attr("name", "button"+i); 
            
            // value stores the choice/value associated with the button
            option.attr("value", data[i].choices[k]);
            console.log(option.attr("value"));
            
            console.log("yayyyyy" +option.attr("value"));

            // id stores the correct answer to the question
            option.attr("id", data[i].answer);
            
            // radio-button class is to listen the clicks
            option.addClass("radio-button");
            
            
            answersDiv.append(option);
        }         //close for loop-button creation   
        var newDiv=$("<div>");
        $("#qna").before(newDiv);
        newDiv.append(questionDiv).append(answersDiv); 

  }          //close showQuestions()
  
  function clickFunction(){
      var button = $(this);
      var quesNum = button.data("questionPointer");
      quesNum.isAnswered=true;
      console.log(quesNum.isAnswered);
      var correctAns = button.attr("id");
      console.log("correct ans is ------ " +correctAns);
      var selection = button.attr("value");
      console.log("I selected----- " +selection);
      if((quesNum.isAnswered===true)&& (selection === correctAns)){
        correctAnswers = correctAnswers+1;
        console.log("#correct: "+correctAnswers)
      }        
      else if((quesNum.isAnswered === true) && (selection !== correctAns)){
        incorrectAnswers = incorrectAnswers +1;
        console.log("#incorrect: " +incorrectAnswers);
      }
  }   //close clickFunction()

  $(document).on("click",".radio-button",clickFunction);

  $("#submit").on("click", function(){
    showScore();
  });

  function showScore()
  {
    for(var j=0; j<quiz.length; j++){  
      if(quiz[j].isAnswered === false){
        unanswered = unanswered + 1;
      }
    }
    var scoreDiv = $("<div>");
    var cor, incor, unans;
    cor = $("<p>");
    incor = $("<p>");
    unans = $("<p>");
    cor.text("Correct answers: " +correctAnswers);
    console.log("correct ans: "+correctAnswers);
    incor.text("Incorrect answers: " +incorrectAnswers);
    console.log("incorect ans: " +incorrectAnswers);
    unans.text("Unanswered: " +unanswered);
    console.log("unanswered: " +unanswered);
    $("#submit-row").append(scoreDiv);
    scoreDiv.append(cor).append(incor).append(unans);
    
  }  //close showScore()

    // // console.log(button);
    // console.log($(button).attr("id"));
    // console.log(index);
    // console.log("i am clicking" + $(button).attr("value"));
    // //get the id of the button here
    // // console.log(ident.attr("value"));
    // console.log(quiz[index].answer);
    // var temp = $(button).attr("value");
    // var ans= ($(button).attr("value"));
    // console.log(ans);
    // if(ans === quiz[index].answer){
    //     alert("you win");
    // }
    // else{
    //     alert("you lose");
    // }

 