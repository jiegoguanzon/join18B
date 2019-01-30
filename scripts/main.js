var logoContainer = document.getElementById("logo-container");
var formContainer = document.getElementById("form-container");
var introContainer = document.getElementById("intro-container");
var videoContainer = document.getElementById("video-container");
var choiceContainer = document.getElementById("choice-container");

var introCard = document.getElementById("intro-card");
var titleCard = document.getElementById("title-card");

var currentVideo = document.getElementById("main-video");
var videoSource = document.getElementById("video-source");

var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");
var logo= document.getElementById("circuit-logo");
var timerBar = document.getElementById("timer-bar");

const excessVideoDuration = 15.5; // 15 + 0.5 

var introStage = 0;

var choiceBarHidden = true; 
var trackVideoPos = true; 

var currentVideoNum = 1;
var currentChoice = 0;
var showChoices = 1;

var nextChoice1 = "Snooze";
var nextChoice2 = "Stop";

updateChoices();
currentVideo.load();

logoContainer.addEventListener("click", function() {
    logoContainer.style.opacity = "0";
});

logoContainer.addEventListener("transitionend", function(e) {
    if(e.propertyName == "opacity"){
        logoContainer.style.display = "none";
        introCard.style.opacity = "1";
        introStage++;
    }
});

introCard.addEventListener("transitionend", function (e) {
    if(e.propertyName == "opacity"){
        if(introStage == 1){
            introCard.style.opacity = "0";
        } else if (introStage == 2) {
            introCard.style.display = "none";
            titleCard.style.opacity = "1";
        }
        introStage++;
    }
});

titleCard.addEventListener("transitionend", function (e) {
    if(e.propertyName == "opacity"){
        if(introStage == 3){
            titleCard.style.opacity = "0";
        } else if (introStage == 4) {
            titleCard.style.display = "none";
            introContainer.style.opacity = "0";
        }
        introStage++;
    }
});

introContainer.addEventListener("transitionend", function (e) {
    if(e.propertyName == "opacity"){
        if(introStage == 5){
            introContainer.style.display = "none";
            currentVideo.play();
            trackVideoPos = true;
        }
    }
});

videoContainer.addEventListener("transitionend", function (e) {
    if(e.propertyName == "opacity"){
        videoContainer.style.display = "none";
    }
});

currentVideo.addEventListener("ended", function () {
    switch(parseVideoName()){
        case "snoozeAlarm.mp4":
        case "commute.mp4":
            nextVidSource = "media/late.mp4";
        break;
        case "roadLessTravelled.mp4":
        case "roadMoreTravelled.mp4":
            nextVidSource = "media/exam.mp4";
        break;
        case "late.mp4":
            restart();
        break;
        case "exam.mp4":
            videoContainer.style.opacity = "0";
            formContainer.style.opacity = "1";
        break;
    }
    videoSource.src = nextVidSource;
    currentVideo.load();
    currentVideo.play();
    trackVideoPos = true;
});

currentVideo.addEventListener("timeupdate", function () {
    if((currentVideo.duration - currentVideo.currentTime <= excessVideoDuration) && choiceBarHidden){
        if(trackVideoPos && showChoices)
            choiceContainer.style.transform = "translateY(0%)";
        trackVideoPos = false;
    }
});

/*
choiceContainer.addEventListener("transitionstart", function (e) {
    console.log("choiceContainerStart");
    if(e.propertyName == "transform" && choiceBarHidden){
        timerBar.style.transition = "width 2s linear";
        timerBar.style.width = "100%";
    }
});
*/

choiceContainer.addEventListener("transitionend", function (e) {
    console.log("choiceContainerEnd");
    if(e.propertyName == "transform"){
        choiceBarHidden = !choiceBarHidden;
        if(!choiceBarHidden){
            choice1.className = "clickable-choice";
            choice2.className = "clickable-choice";
            timerBar.style.transition = "width 10s linear";
            timerBar.style.width = "0%";
        } else {
            timerBar.style.transition = "width 0s linear";
            timerBar.style.width = "100%";
            updateChoices();
            choice1.className = "choice";
            choice2.className = "choice";
            choice1.style.opacity = "1";
            choice2.style.opacity = "1";
            currentChoice = 0;
        }
    }
});

timerBar.addEventListener("transitionend", function () {
    choiceContainer.style.transform = "translateY(100%)";
    if(!currentChoice && !choiceBarHidden){
        currentChoice = 1;
        choice1.className = "selected-choice";
        updateSelection();
    }
});

choice1.addEventListener("click", function () {
    currentChoice = 1;
    choice1.className = "selected-choice";
    choice2.className = "unselected-choice";
    choice2.style.opacity = "0";
    updateSelection();
});

choice2.addEventListener("click", function () {
    currentChoice = 2;
    choice2.className = "selected-choice";
    choice1.className = "unselected-choice";
    choice1.style.opacity = "0";
    updateSelection();
});

function updateSelection() {
    var sourceName = parseVideoName(); 

    switch(sourceName) {

        case "wakeUp.mp4":
            if(currentChoice == 1){ // Wrong choice
                showChoices = 0;
                nextVidSource = "media/snoozeAlarm.mp4";
            } else if(currentChoice == 2){
                showChoices = 1;
                nextChoice1 = "Attire 1";
                nextChoice2 = "Attire 2";
                nextVidSource = "media/stopAlarm.mp4";
            }
        break;

        case "stopAlarm.mp4":
            if(currentChoice == 1){
                nextVidSource = "media/poloShirt.mp4";
            } else if(currentChoice == 2){
                nextVidSource = "media/tShirt.mp4";
            }
            showChoices = 1;
            nextChoice1 = "Walk";
            nextChoice2 = "Commute";
        break;

        case "poloShirt.mp4":
        case "tShirt.mp4":
            if(currentChoice == 1){
                showChoices = 1;
                nextChoice1 = "Path 1";
                nextChoice2 = "Path 2";
                nextVidSource = "media/walk.mp4"
            } else if(currentChoice == 2){
                showChoices = 0;
                nextVidSource = "media/commute.mp4"
            }
        break;

        case "walk.mp4":
            if(currentChoice == 1){
                nextVidSource = "media/roadLessTravelled.mp4"
            } else if(currentChoice == 2){
                nextVidSource = "media/roadMoreTravelled.mp4"
            }
            showChoices = 0;
        break;

        /*
        case "roadLessTravelled.mp4":
        case "roadMoreTravelled.mp4":
        break;
        */

    }
}

function updateChoices() {
    choice1.innerHTML = nextChoice1;
    choice2.innerHTML = nextChoice2;
}

function restart() {
    nextVidSource = "media/wakeUp.mp4";
    nextChoice1 = "Snooze";
    nextChoice2 = "Stop";
    showChoices = 1;
    updateChoices();
}

function parseVideoName(){
    var sourceName = videoSource.src.split('/');
    return sourceName[sourceName.length-1];
}