var gamePattern = [];
var buttonColours = ["blue","yellow","red","yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;


$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);  
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});

$(document).keypress(function (e) {
    if(!started && e.key === "a")
    {
        $("#start-heading").html("Level 0");
        nextSequance();
        started = true;
    } 
    
});


function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("Succsess");

        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function () 
            {  
                nextSequance();
            },1000);
        }

    }
    else
    {
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);

        $("#start-heading").text("Game Over, Press 'a' Key to Restart");

        startOver();
        console.log("Wrong");
    }
}


function nextSequance() 
{
    userClickedPattern = [];
    var randomNumber = Math.round(Math.random() * 3);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);
    $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChoosenColour);
    level = level + 1;
    $("h1").html("Level " + level);
}

function makeSound(key) 
{
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
}


function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed");
    setTimeout(function()
    {   
        $("#" + currentColour).removeClass("pressed");
    },100);
    
}

function startOver() 
{  
  level = 0;
  gamePattern = [];
  started = false;
}
