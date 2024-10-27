const timeThree = document.querySelector("#time3");
const timeFive = document.querySelector("#time5");
const timeTen = document.querySelector("#time10");

timeThree.addEventListener("click", () => {
    GLOBAL.maxTime = 3
});

timeFive.addEventListener("click", () => {
    GLOBAL.maxTime = 5
});

timeTen.addEventListener("click", () => {
    GLOBAL.maxTime = 10
});

