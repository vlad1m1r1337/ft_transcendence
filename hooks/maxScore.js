const green = document.querySelector("#score-1");
const pillar = document.querySelector("#score-3");
const cherry = document.querySelector("#score-5");

green.addEventListener("click", () => {
    GLOBAL.maxScore = 1
});

pillar.addEventListener("click", () => {
    GLOBAL.maxScore = 3
});

cherry.addEventListener("click", () => {
    GLOBAL.maxScore = 5
});
