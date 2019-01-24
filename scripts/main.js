var currentVideo = document.getElementById("main-video");
var choiceContainer = document.getElementById("choice-container");
var timerBar = document.getElementById("timer-bar");

currentVideo.addEventListener("timeupdate", function () {
    if(currentVideo.duration - currentVideo.currentTime <= 12)
        choiceContainer.style.transform = "translateY(0%)";
});

choiceContainer.addEventListener("transitionend", function () {
    if(choiceContainer.style.transform == "translateY(0%)"){
        timerBar.style.transition = "width 10s linear";
        timerBar.style.width = "0%";
    } else if(choiceContainer.style.transform == "translateY(100%)"){
        timerBar.style.transition = "width 0s linear";
        timerBar.style.width = "100%";
    }
});

timerBar.addEventListener("transitionend", function () {
    choiceContainer.style.transform = "translateY(100%)";
});