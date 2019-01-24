var currentVideo = document.getElementById("main-video");
var choiceContainer = document.getElementById("choice-container");
var timerBar = document.getElementById("timer-bar");

choiceContainer.addEventListener("click", function () {
    choiceContainer.style.height = "20%";
});

timerBar.addEventListener("click", function () {
    timerBar.style.width = "0%";
});