import {
    changeFoulIndicator,
    clearIndicator,
    updateFoulIndicator,
} from "./library/CouncilFunc";

require("./bootstrap");
import {
    startMatch,
    loadDataSaved,
    updateScore,
    activeRound,
    changeScoreElement,
    channelUpdateScore,
    channelOperator,
    userData,
    getArenaData,
    channelPenalty,
} from "./library/ScoreFunc";
import {
    getId,
    indicatorUpdate,
    startTimeoutIndicator,
} from "./library/JuryFunc";

let blueScore = document.getElementById(`blueScore`);
let redScore = document.getElementById(`redScore`);
const timerDisplay = document.getElementById("timer");
const arenaChannel = Echo.join(`presence.jury.${userData.arena_id}`);
let timerStarted = false;
let timePerRound = 120;
let countdown;
let isPaused = false;
let endTime;
let secondsRemaining = 0;

changeScoreElement(redScore, blueScore);
loadDataSaved();
if (localStorage.getItem("timerStarted")) {
    loadSaveTimer();
}

arenaChannel.listen(`.jury.${userData.arena_id}`, (event) => {
    updateIndicator(event);
});
channelPenalty.listen(`.penalty.${userData.arena_id}`, (event) => {
    changeFoulIndicator(event.color, event.penalty);
});

channelUpdateScore.listen(`.updateScore.${userData.arena_id}`, (event) => {
    updateScore(event);
});

channelOperator.listen(`.operator.${userData.arena_id}`, (event) => {
    updateArenaData(event);
});

function updateTimer(action) {
    if (action === "play") {
        if (!timerStarted) {
            startTimer(timePerRound);
            timerStarted = true;
            saveTimerState();
        } else {
            startTimer(secondsRemaining);
            isPaused = false;
            saveTimerState();
        }
    } else {
        secondsRemaining = Math.max(
            0,
            Math.ceil((endTime - Date.now()) / 1000)
        );
        isPaused = true;
        saveTimerState();
    }
}

function saveTimerState() {
    localStorage.setItem("timerStarted", timerStarted);
    localStorage.setItem("timerIsPaused", isPaused);
    localStorage.setItem("timerSecondsRemaining", secondsRemaining);
    localStorage.setItem("timerEndTime", endTime);
}

function loadSaveTimer() {
    timerStarted = localStorage.getItem("timerStarted");
    isPaused = localStorage.getItem("timerIsPaused");
    secondsRemaining = localStorage.getItem("timerSecondsRemaining");
    endTime = localStorage.getItem("timerEndTime");
    startTimer(secondsRemaining);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? "0" : ""}${minutes}:${
        remainderSeconds < 10 ? "0" : ""
    }${remainderSeconds}`;
    if (!isPaused) {
        timerDisplay.textContent = display;
    }
}

function clearTimerState() {
    timerStarted = false;
    localStorage.removeItem("timerIsPaused");
    localStorage.removeItem("timerSecondsRemaining");
    localStorage.removeItem("timerEndTime");
}

function startTimer(seconds) {
    clearInterval(countdown);

    if (isPaused) {
        endTime = Date.now() + secondsRemaining * 1000;
    } else {
        endTime = Date.now() + seconds * 1000;
        secondsRemaining = seconds;
    }

    displayTimeLeft(secondsRemaining);

    countdown = setInterval(() => {
        const secondsLeft = Math.max(
            0,
            Math.round((endTime - Date.now()) / 1000)
        );
        if (secondsLeft === 0) {
            clearInterval(countdown);
            if (!isPaused) {
                clearTimerState();
                timerDisplay.textContent = "00:00";
            }
            return;
        }

        if (isPaused) return;

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function updateArenaData(e) {
    switch (e.action) {
        case "start":
            timePerRound = e.time;
            startMatch(e);
            break;
        case "reset":
        case "finish":
            localStorage.clear();
            location.reload();
            break;
        case "round":
            clearIndicator();
            changeRound(e);
            break;
        case "pause":
            updateTimer("pause");
            break;
        case "play":
            updateTimer("play");
            break;
    }
}

function updateIndicator(event) {
    const movement = event.movement;
    const corner = event.corner;
    const id = event.id;
    const elementName = getId(id + " " + movement + " " + corner);
    indicatorUpdate(elementName, corner);
    startTimeoutIndicator(elementName, corner);
}

function changeRound(e) {
    updateFoulIndicator();
    activeRound.textContent = e.activeRound.toUpperCase();
    round = e.activeRound;
}
