import {
    activeRound,
    channelOperator,
    channelUpdateScore,
    getArenaData,
    userData,
} from "./library/ScoreFunc";

require("./bootstrap");
import {
    checkWinner,
    changeRoundCouncil,
    clearIndicator,
    enabledAction,
    handlePenaltyClick,
    handleScoreChange,
    loadDataSave,
    saveData,
    updateDataScore,
    updateMatch,
} from "./library/CouncilFunc";

const redWarningFirst = document.getElementById("red-warning-first");
const redCoachingFirst = document.getElementById("red-coaching-first");
const redPenaltyFirst = document.getElementById("red-penalty-first");
const redWarningSecond = document.getElementById("red-warning-second");
const redCoachingSecond = document.getElementById("red-coaching-second");
const redPenaltySecond = document.getElementById("red-penalty-second");
const redPenaltyThird = document.getElementById("red-penalty-third");
const blueWarningFirst = document.getElementById("blue-warning-first");
const blueCoachingFirst = document.getElementById("blue-coaching-first");
const bluePenaltyFirst = document.getElementById("blue-penalty-first");
const blueWarningSecond = document.getElementById("blue-warning-second");
const blueCoachingSecond = document.getElementById("blue-coaching-second");
const bluePenaltySecond = document.getElementById("blue-penalty-second");
const bluePenaltyThird = document.getElementById("blue-penalty-third");
const redFallValid = document.getElementById("red-fall-plus");
const redFallInvalid = document.getElementById("red-fall-minus");
const blueFallValid = document.getElementById("blue-fall-plus");
const blueFallInvalid = document.getElementById("blue-fall-minus");
const redDisqualification = document.getElementById("red-disqualification");
const blueDisqualification = document.getElementById("blue-disqualification");
enabledAction(true);
// localStorage.clear();
if (localStorage.getItem("councilData")) {
    loadDataSave();
}

channelUpdateScore.listen(`.updateScore.${userData.arena_id}`, (event) => {
    updateDataScore(event);
    saveData();
});
channelOperator.listen(`.operator.${userData.arena_id}`, (event) => {
    updateCouncilData(event);
});

redWarningFirst.addEventListener(
    "click",
    handlePenaltyClick("red", "first-warning")
);
redWarningSecond.addEventListener(
    "click",
    handlePenaltyClick("red", "second-warning")
);
redCoachingFirst.addEventListener(
    "click",
    handlePenaltyClick("red", "first-coaching")
);
redCoachingSecond.addEventListener(
    "click",
    handlePenaltyClick("red", "second-coaching")
);
redPenaltyFirst.addEventListener(
    "click",
    handlePenaltyClick("red", "first-penalty")
);
redPenaltySecond.addEventListener(
    "click",
    handlePenaltyClick("red", "second-penalty")
);
redPenaltyThird.addEventListener(
    "click",
    handlePenaltyClick("red", "third-penalty")
);
redPenaltyThird.addEventListener("click", function () {
    updateMatch("blue");
});

blueWarningFirst.addEventListener(
    "click",
    handlePenaltyClick("blue", "first-warning")
);
blueWarningSecond.addEventListener(
    "click",
    handlePenaltyClick("blue", "second-warning")
);
blueCoachingFirst.addEventListener(
    "click",
    handlePenaltyClick("blue", "first-coaching")
);
blueCoachingSecond.addEventListener(
    "click",
    handlePenaltyClick("blue", "second-coaching")
);
bluePenaltyFirst.addEventListener(
    "click",
    handlePenaltyClick("blue", "first-penalty")
);
bluePenaltySecond.addEventListener(
    "click",
    handlePenaltyClick("blue", "second-penalty")
);
bluePenaltyThird.addEventListener("click", function () {
    updateMatch("red");
});

redFallValid.addEventListener("click", handleScoreChange("red", 3));
redFallInvalid.addEventListener("click", handleScoreChange("red", -3));

blueFallValid.addEventListener("click", handleScoreChange("blue", 3));
blueFallInvalid.addEventListener("click", handleScoreChange("blue", -3));
redDisqualification.addEventListener("click", disqualification("blue"));
blueDisqualification.addEventListener("click", disqualification("red"));

function disqualification(corner) {
    return function () {
        updateMatch(corner);
    };
}
enabledAction();

function updateCouncilData(e) {
    switch (e.action) {
        case "start":
            saveData();
            break;
        case "finish":
            localStorage.clear();
            checkWinner();
            break;
        case "round":
            enabledAction(false);
            clearIndicator();
            changeRoundCouncil(e.activeRound);
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
