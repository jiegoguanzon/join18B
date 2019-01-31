var logoContainer = document.getElementById("logo-container");
var formContainer = document.getElementById("form-container");
var introContainer = document.getElementById("intro-container");
var videoContainer = document.getElementById("video-container");
var choiceContainer = document.getElementById("choice-container");
var endContainer = document.getElementById("end-container");
var iframeContainer = document.getElementById("iframe-container");

var mainForm = document.getElementById("main-form");

var introCard = document.getElementById("intro-card");
var titleCard = document.getElementById("title-card");

var currentVideo = document.getElementById("main-video");
var videoSource = document.getElementById("video-source");

var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");
var logo = document.getElementById("circuit-logo");
var timerBar = document.getElementById("timer-bar");

const excessVideoDuration = 10.5; // 10 + 0.5 

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

mainForm.onsubmit = function () {
    formContainer.style.opacity = "0";
}

formContainer.addEventListener("transitionend", function(e) {
    if(e.propertyName == "opacity" && formContainer.style.opacity == 0){
        formContainer.style.display = "none";
        endContainer.style.opacity = "1";
    }
});

logoContainer.addEventListener("click", function() {
    logoContainer.style.opacity = "0";
});

logoContainer.addEventListener("transitionend", function(e) {
    if(e.propertyName == "opacity"){
        logoContainer.style.display = "none";
        introCard.style.opacity = "1";
        console.log(introStage)
        introStage++;
    }
});

introCard.addEventListener("transitionend", function (e) {
    if(e.propertyName == "opacity"){
        console.log(introStage)
        if(introStage == 1){
            introCard.style.opacity = "0";
        } else if (introStage == 2) {
            introCard.style.display = "none";
            //titleCard.style.opacity = "1";
            introContainer.style.opacity = "0";
        }
        introStage++;
    }
});

/*
titleCard.addEventListener("transitionend", function (e) {
    if(e.propertyName == "opacity"){
        console.log(introStage)
        if(introStage == 3){
            titleCard.style.opacity = "0";
        } else if (introStage == 4) {
            titleCard.style.display = "none";
            introContainer.style.opacity = "0";
        }
        introStage++;
    }
});
*/

introContainer.addEventListener("transitionend", function (e) {
    if(e.propertyName == "opacity"){
        if(introStage == 3){
            introContainer.style.display = "none";
            currentVideo.play();
            trackVideoPos = true;
        }
    }
});

videoContainer.addEventListener("transitionend", function (e) {
    if(e.propertyName == "opacity"){
        videoContainer.style.display = "none";
        iframeContainer.innerHTML = "<iframe name='hidden_iframe' id='hidden_iframe'><iframe>";
    }
});

currentVideo.addEventListener("ended", function () {
    switch(parseVideoName()){
        case "snoozeAlarm.mp4":
        case "commuteDenimJacket.mp4":
            nextVidSource = "media/lateDenimJacket.mp4";
        break;
        case "commutePinkJacket.mp4":
            nextVidSource = "media/latePinkJacket.mp4";
        break;
        case "runPinkJacket.mp4":
        case "runDenimJacket.mp4":
            nextVidSource = "media/exam.mp4";
        break;
        case "lateDenimJacket.mp4":
        case "latePinkJacket.mp4":
            restart();
        break;
        case "exam.mp4":
            currentVideo.pause();
            nextVidSource = "";
            //videoContainer.style.opacity = "0";
            //formContainer.style.opacity = "1";
            formContainer.style.pointerEvents = "all";
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

    if((currentVideo.duration - currentVideo.currentTime <= 3) && choiceBarHidden && (parseVideoName() == "exam.mp4")){
        videoContainer.style.opacity = "0";
        formContainer.style.opacity = "1";
    }
});

choiceContainer.addEventListener("transitionend", function (e) {
    if(e.propertyName == "transform"){
        choiceBarHidden = !choiceBarHidden;
        if(!choiceBarHidden){
            choice1.className = "clickable-choice";
            choice2.className = "clickable-choice";
            timerBar.style.transition = "width 5s linear";
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
        let videoName = parseVideoName();
        if(videoName == "pinkJacket.mp4" || videoName == "denimJacket.mp4") {
            currentChoice = 2;
            choice2.className = "selected-choice";
        } else {
            currentChoice = 1;
            choice1.className = "selected-choice";
        }
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
                nextChoice1 = "Pink Jacket";
                nextChoice2 = "Denim Jacket";
                nextVidSource = "media/stopAlarm.mp4";
            }
        break;

        case "stopAlarm.mp4":
            if(currentChoice == 1){
                nextVidSource = "media/pinkJacket.mp4";
            } else if(currentChoice == 2){
                nextVidSource = "media/denimJacket.mp4";
            }
            showChoices = 1;
            nextChoice1 = "Run";
            nextChoice2 = "Commute";
        break;

        case "denimJacket.mp4":
            if(currentChoice == 1){
                nextVidSource = "media/runDenimJacket.mp4"
            } else if(currentChoice == 2){
                nextVidSource = "media/commuteDenimJacket.mp4"
            }
            showChoices = 0;
        break;

        case "pinkJacket.mp4":
            if(currentChoice == 1){
                nextVidSource = "media/runPinkJacket.mp4"
            } else if(currentChoice == 2){
                nextVidSource = "media/commutePinkJacket.mp4"
            }
            showChoices = 0;
        break;

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