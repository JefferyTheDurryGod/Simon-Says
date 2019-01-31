const colourArray = { 0: "red", 1: "blue", 2: "yellow", 3: "green" }
const baseNum = 3;

let currentLevel = 1;
let pattern = [];

playerPattern = [];

function createPattern(num) {
    num = parseInt(num) + baseNum - 1;
    pattern = [];
    $('#simon').empty();

    for (let i = 0; i < parseInt(num); i++) {
        let colour = colourArray[Math.floor(Math.random() * 4)];
        pattern.push(colour);
        $('#simon').append(`<div class="pattern" id=simonColour${i} style="background-color: ${colour}"> </div>`);
    }
    $('#simon').css('visibility', 'visible');
    hidePattern();
    console.log(pattern)
}

// Creates the pattern to be followed.
// param:  level is the current level that the player is on.
function createLevel(level) {
    $("#reset").hide();
    $("#nextLevel").hide();
    $("#message").html("")

    createPattern(level);
}

function hidePattern() {
    //$("#simon").delay(3000).hide(500);
    $('#simon')
        .delay(3000)
        .queue(function (next) {
            $(this).css('visibility', 'hidden');
            next();
        });
}

function setUp(){
    $("#reset").click(function(){
        createLevel(currentLevel)
    })
    $("#nextLevel").click(function(){
        createLevel(currentLevel)
    })

    $(".gameButton").each(function () {
        $(this).click(function () {
            $(this).fadeOut(100).fadeIn(100);
            playerPattern.push($(this).attr("id"))
            if(checkPatterns($(this).attr("id")) === true){
                playerPattern = [];
                currentLevel++;
                $("#message").html("Correct. Press next level to continue.")
                $("#nextLevel").show();
            }
            else if(checkPatterns($(this).attr("id")) === false){
                currentLevel = 1;
                playerPattern = [];
                $("#message").html("Oops. Press reset to start again.")
                $("#reset").show();
            }          
        })
    })
    createLevel(currentLevel);
}

function checkPatterns(id){
    if(pattern[playerPattern.length-1] != id){
        return false;
    }
    else{
        if(pattern.length === playerPattern.length){
            return true;
        }
    }
}

