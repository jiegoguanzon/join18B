var currentVideo = document.getElementById("main-video");
var choiceContainer = document.getElementById("choice-container");
var timerBar = document.getElementById("timer-bar");
var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");

const excessVideoDuration = 15.5; // 15 + 0.5 

var choiceBarHidden = true; 
var trackVideoPos = true; 

var currentChoice = 0;

currentVideo.addEventListener("click", function () {
    currentVideo.play();
    trackVideoPos = true;
});

currentVideo.addEventListener("ended", function () {
    currentVideo.play();
    trackVideoPos = true;
});

currentVideo.addEventListener("timeupdate", function () {
    if((currentVideo.duration - currentVideo.currentTime <= excessVideoDuration) && choiceBarHidden){
        if(trackVideoPos)
            choiceContainer.style.transform = "translateY(0%)";
        trackVideoPos = false;
    }
});

choiceContainer.addEventListener("transitionend", function (e) {
    if(e.propertyName == "transform"){
        choiceBarHidden = !choiceBarHidden;
        if(!choiceBarHidden){
            timerBar.style.transition = "width 10s linear";
            timerBar.style.width = "0%";
        } else {
            timerBar.style.transition = "width 2s linear";
            timerBar.style.width = "100%";
            choice1.className = "choice";
            choice2.className = "choice";
            currentChoice = 0;
        }
    }
});

timerBar.addEventListener("transitionend", function () {
    choiceContainer.style.transform = "translateY(100%)";
    if(!currentChoice && !choiceBarHidden){
        currentChoice = 1;
        choice1.className = "selected-choice";
    }
});

choice1.addEventListener("click", function () {
    currentChoice = 1;
    choice1.className = "selected-choice";
    choice2.className = "unselected-choice";
});

choice2.addEventListener("click", function () {
    currentChoice = 2;
    choice2.className = "selected-choice";
    choice1.className = "unselected-choice";
});