const green = document.querySelector("#score1");
const pillar = document.querySelector("#score3");
const cherry = document.querySelector("#score5");

green.addEventListener("click", () => {
    GLOBAL.maxScore = 1
});

pillar.addEventListener("click", () => {
    GLOBAL.maxScore = 3
});

cherry.addEventListener("click", () => {
    GLOBAL.maxScore = 5
});
