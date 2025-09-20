import { channelOperator, channelUpdateScore } from "./library/ScoreFunc";

require("./bootstrap");
import {
    changeRoundJury,
    enabledAction,
    handleAction,
    inputPoint,
    loadDataSaveJury,
    saveDataJury,
    startTimeout,
    updateDataScore,
    updateRoundJury,
    updateScore,
} from "./library/JuryFunc";

let userElement = document.getElementById("user");
const userData = JSON.parse(userElement.getAttribute("data-user"));
const header = document.getElementById("header");
const toggleHeaderButton = document.getElementById("toggle-header-button");
const firstLinePointGroup = document.getElementById("first-line-point-group");
const bluePunch = document.getElementById("blue-punch");
const redPunch = document.getElementById("red-punch");
const blueKick = document.getElementById("blue-kick");
const redKick = document.getElementById("red-kick");
const arenaChannel = Echo.join(`presence.jury.${userData.arena_id}`);
// localStorage.clear()\
enabledAction(false);

if (localStorage.getItem("juryScoringData")) {
    console.log(JSON.parse(localStorage.getItem("juryScoringData")));
    loadDataSaveJury();
}
channelOperator.listen(`.operator.${userData.arena_id}`, (event) => {
    updateJuryData(event);
});

channelUpdateScore.listen(`.updateScore.${userData.arena_id}`, (event) => {
    updateDataScore(event);
    saveDataJury();
});

arenaChannel.listen(`.jury.${userData.arena_id}`, (event) => {
    updateScore(event);
});

toggleHeaderButton.addEventListener("click", function () {
    header.classList.toggle("hidden");
    header.classList.toggle("flex");
    firstLinePointGroup.classList.toggle("mt-[0%]");
    firstLinePointGroup.classList.toggle("mt-[5%]");
    toggleHeaderButton.textContent = header.classList.contains("hidden") ? "Show" : "Hide";
});

bluePunch.addEventListener("click", function (event) {
    startTimeout(
        "blueInput",
        "blue-punch",
        inputPoint("blueInput", 1, "blue"),
        "blue"
    );
    handleAction(event, "blue", "punch");
});

redPunch.addEventListener("click", function (event) {
    startTimeout("redInput", "red-punch", inputPoint("redInput", 1));
    handleAction(event, "red", "punch");
});

redKick.addEventListener("click", function (event) {
    startTimeout("redInput", "red-kick", inputPoint("redInput", 2));
    handleAction(event, "red", "kick");
});

blueKick.addEventListener("click", function (event) {
    startTimeout(
        "blueInput",
        "blue-kick",
        inputPoint("blueInput", 2, "blue"),
        "blue"
    );
    handleAction(event, "blue", "kick");
});

function updateJuryData(e) {
    switch (e.action) {
        case "start":
            updateRoundJury(e.activeRound);
            break;
        case "finish":
            break;
        case "round":
            enabledAction(false);
            changeRoundJury(e.activeRound);
            updateRoundJury(e.activeRound);
            break;
        case "pause":
            enabledAction(false);
            break;
        case "play":
            enabledAction();
            break;
        case "reset":
            localStorage.clear();
            location.reload();
            break;
    }
}
