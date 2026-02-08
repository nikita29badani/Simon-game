var userClickedPattern=[];
var gamePattern=[];
var buttonColours=['red','blue','green','yellow'];
var randomChosenColour;
var started =false;
var level=0;

$(document).on('keydown', function(){
    if(!started){
        started= true;
        $("#level-title").text("Level "+level);
        
        nextSequence();
    
}})
    
function nextSequence(){
    userClickedPattern=[]; //reset
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour= buttonColours[randomNumber];
    console.log(randomChosenColour);

    gamePattern.push(randomChosenColour);
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);
}

  
function makeSound(colour){
switch (colour) {
    case "red":
        new Audio("sounds/red.mp3").play();
        break;

    case "green":  
       new Audio("sounds/green.mp3").play();
    break;

    case "yellow":
        new Audio("sounds/yellow.mp3").play();
    break;

    case "blue": 
        new Audio("sounds/blue.mp3").play();
    break;
    default:
        new Audio("sounds/wrong.mp3").play();
        break;
}
}

$(".btn").on("click", function(){
    var userChosenColour= $(this).attr("id");
     userClickedPattern.push(userChosenColour);
     makeSound(userChosenColour);
    //console.log(userClickedPattern)
    animatePress(this);
    checkAnswer(userClickedPattern.length-1);
})

function animatePress(currentColour){
    $(".btn").on("click",function(){
        var currentButton=this;
        $(currentButton).addClass("pressed");

    setTimeout(function() {
         $(currentButton).removeClass('pressed');
    }, 100);
}  )}

function checkAnswer(index){
    if(userClickedPattern[index]===gamePattern[index]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)   //it will be called after little delay
        }
    }
    else{
        makeSound()
        $('body').addClass('game-over')
        $('#level-title').text("Game over, press any key to restart")
        setTimeout(function(){
            $('body').removeClass("game-over")
        },100)
        startOver();
    }
    
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}








    