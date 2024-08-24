const timeThree = document.querySelector("#time-3");
const timeFive = document.querySelector("#time-5");
const timeTen = document.querySelector("#time-10");

timeThree.addEventListener("click", () => {
    GLOBAL.maxTime = 3
});

timeFive.addEventListener("click", () => {
    GLOBAL.maxTime = 5
});

timeTen.addEventListener("click", () => {
    GLOBAL.maxTime = 10
});

