//Made with assistance from Anglea Wu's WebDev course. Only parts of the JS file are mine.

var level = 0;
var start = true;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//Detect first keypress to start the game
$(document).on("keypress", function() {
  if (start == true) {
    nextSequence();
  }
  start = false;
});

//Detect click on colored button and pass values to play sound
//, play animation and check answer
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

//Generate random number between 1-4 that lights a button, plays sound and
//increments level
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  level = level + 1;
  $("h1").html("Level " + level);
}

//Checks answers and initiates next level if pattern is right
//and stops game if wrong
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("Correct!");
    if (currentLevel == gamePattern.length - 1) {
      setTimeout(function() {nextSequence();}, 1000);
      userClickedPattern = [];
    }
  }

  else {
    console.log("Wrong!");
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {$("body").removeClass("game-over");}, 500);

    $("h1").html("Game Over! Press any key to restart");

    $(document).on("keypress", function() {startOver();});

  }

}

//Inititate reset of all variables and start over
function startOver(){
  level = 0;
  gamePattern = [];
  start = true;

}

//Play sounds associated with buttons and wrong answer
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
