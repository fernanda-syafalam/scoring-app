const redName = document.getElementById("red-name");
const redContingent = document.getElementById("red-contingent");
const blueName = document.getElementById("blue-name");
const blueContingent = document.getElementById("blue-contingent");
const matchRound = document.getElementById("match-round");
let pureScoreRed = 0;
let pureScoreBlue = 0;
export let matchId = "";

export let matchClass;
let redScore = "";
let blueScore = "";
let userElement = document.getElementById("user");
export const userData = JSON.parse(userElement.getAttribute("data-user"));
export const channelUpdateScore = Echo.join(
    `presence.updateScore.${userData.arena_id}`
);
export const channelPenalty = Echo.join(
    `presence.penalty.${userData.arena_id}`
);
export const channelOperator = Echo.join(
    `presence.operator.${userData.arena_id}`
);
export const activeRound = document.getElementById("round");
const FOUL_POINTS = {
    first: 0,
    "first-coaching": 0,
    "second-coaching": 0,
    "first-warning": 1,
    "second-warning": 2,
    "first-penalty": 5,
    "second-penalty": 10,
    "third-penalty": 0,
};
export const savedArenaData = JSON.parse(
    localStorage.getItem("arenaData")
) || {
    redName: "Red Corner",
    redContingent: "Contingent",
    blueName: "Blue Corner",
    blueContingent: "Contingent",
    round: "ROUND",
    activeRound: "ROUND",
};
const savedScoreData = JSON.parse(localStorage.getItem("scoreData")) || {
    redScore: 0,
    blueScore: 0,
    bluePenalty: "first-warning",
    redPenalty: "first-warning",
};
export let redPenalty = "";
export let bluePenalty = "";
function changeScoreElement(newRedScoreElement, newBlueScoreElement) {
    redScore = newRedScoreElement;
    blueScore = newBlueScoreElement;
}
function updateScore(event, redPenalty, bluePenalty) {
    redPenalty = event.red_penalty;
    bluePenalty = event.blue_penalty;
    pureScoreRed = event.red_score;
    pureScoreBlue = event.blue_score;
    let redFoulPoints = 0;
    let blueFoulPoints = 0;
    redPenalty.map((penalty) => {
        redFoulPoints += FOUL_POINTS[penalty];
    });
    bluePenalty.map((penalty) => {
        blueFoulPoints += FOUL_POINTS[penalty];
    });
    const redScoreValue = pureScoreRed - redFoulPoints;
    const blueScoreValue = pureScoreBlue - blueFoulPoints;

    const scoreData = {
        redScore: redScoreValue,
        blueScore: blueScoreValue,
        pureScoreRed: pureScoreRed,
        pureScoreBlue: pureScoreBlue,
        redPenalty: event.red_penalty,
        bluePenalty: event.blue_penalty,
        droppingRed: event.droppingRed,
        droppingBlue: event.droppingBlue,
    };

    localStorage.setItem("scoreData", JSON.stringify(scoreData));
    if (window.location.pathname !== "/match-chairman") {
        redScore.textContent = redScoreValue;
        blueScore.textContent = blueScoreValue;
    }
}
function startMatch(e) {
    matchId = e.id;
    matchClass = e.class;
    redName.textContent = e.redName;
    redContingent.textContent = e.redContingent;
    blueName.textContent = e.blueName;
    blueContingent.textContent = e.blueContingent;
    matchRound.textContent = e.round.toUpperCase();
    activeRound.textContent = e.activeRound.toUpperCase();

    const arenaData = {
        matchId: e.id,
        class: e.class,
        redName: redName.textContent,
        redContingent: redContingent.textContent,
        blueName: blueName.textContent,
        blueContingent: blueContingent.textContent,
        round: matchRound.textContent,
        activeRound: activeRound.textContent,
    };

    localStorage.setItem("arenaData", JSON.stringify(arenaData));
}

export function getArenaData() {
    return {
        redName: redName.textContent,
        redContingent: redContingent.textContent,
        blueName: blueName.textContent,
        blueContingent: blueContingent.textContent,
        round: matchRound.textContent,
        activeRound: activeRound.textContent,
    };
}

function loadDataSaved() {
    matchId = savedArenaData.matchId;
    matchClass = savedArenaData.class;
    redName.textContent = savedArenaData.redName;
    redContingent.textContent = savedArenaData.redContingent;
    blueName.textContent = savedArenaData.blueName;
    blueContingent.textContent = savedArenaData.blueContingent;
    matchRound.textContent = savedArenaData.round;
    activeRound.textContent = savedArenaData.activeRound;
    redPenalty = savedScoreData.redPenalty;
    bluePenalty = savedScoreData.bluePenalty;
    redScore.textContent = savedScoreData.redScore;
    blueScore.textContent = savedScoreData.blueScore;
}

export { startMatch, loadDataSaved, updateScore, changeScoreElement };
