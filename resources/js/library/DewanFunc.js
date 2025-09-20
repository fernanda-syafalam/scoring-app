import { isEmpty } from "lodash";
import { activeRound, getArenaData } from "./ScoreFunc";

const FOULS = [
    "first-warning",
    "second-warning",
    "first-coaching",
    "second-coaching",
    "first-penalty",
    "second-penalty",
    "third-penalty",
];
let bluePenalty = "first";
const PENALTIES = [
    "first-penalty",
    "second-penalty",
    "third-penalty",
];
let redPenalty = "first";
let redFouls = [];
let blueFouls = [];
let pureScoreRed = 0;
let pureScoreBlue = 0;
const ROUNDS = ["round-1", "round-2", "round-3"];
let bluePenaltyWarning = false;
let redPenaltyWarning = false;

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
let blueFoulList = ["first"];
let redFoulList = ["first"];
const BUTTON_ACTIONS = [
    "blue-fall-minus",
    "blue-fall-plus",
    "red-fall-minus",
    "red-fall-plus",
    "blue-penalty-third",
    "blue-penalty-second",
    "blue-coaching-second",
    "blue-warning-second",
    "blue-penalty-first",
    "blue-coaching-first",
    "blue-warning-first",
    "red-penalty-third",
    "red-penalty-second",
    "red-coaching-second",
    "red-warning-second",
    "red-penalty-first",
    "red-coaching-first",
    "red-warning-first",
    "red-disqualification",
    "blue-disqualification",
];

let actionStatus = false;
const redFoulElements = {
    "first-warning": document.getElementById("red-warning-first"),
    "second-warning": document.getElementById("red-warning-second"),
    "first-coaching": document.getElementById("red-coaching-first"),
    "second-coaching": document.getElementById("red-coaching-second"),
    "first-penalty": document.getElementById("red-penalty-first"),
    "second-penalty": document.getElementById("red-penalty-second"),
    "third-penalty": document.getElementById("red-penalty-third"),
};
const blueFoulElements = {
    "first-warning": document.getElementById("blue-warning-first"),
    "second-warning": document.getElementById("blue-warning-second"),
    "first-coaching": document.getElementById("blue-coaching-first"),
    "second-coaching": document.getElementById("blue-coaching-second"),
    "first-penalty": document.getElementById("blue-penalty-first"),
    "second-penalty": document.getElementById("blue-penalty-second"),
    "third-penalty": document.getElementById("blue-penalty-third"),
};
const councilData = {
    blueInput: document.getElementById(`round-1-blueInput`),
    redInput: document.getElementById(`round-1-redInput`),
    redScore: document.getElementById("round-1-redScore"),
    blueScore: document.getElementById("round-1-blueScore"),
};
export function updateRoundCouncil(round) {
    councilData.blueInput = document.getElementById(`${round}-blueInput`);
    councilData.redInput = document.getElementById(`${round}-redInput`);
    councilData.blueScore = document.getElementById(`${round}-blueScore`);
    councilData.redScore = document.getElementById(`${round}-redScore`);
}
export function enabledAction(status = true) {
    actionStatus = status;
    BUTTON_ACTIONS.map((action) => {
        const button = document.getElementById(action);
        button.disabled = !status;
    });
}
export function handlePenaltyClick(color, penalty) {
    return function () {
        if (PENALTIES.includes(penalty)) {
            if (color === "red") {
                if (redFouls.includes(penalty)) {
                    redFouls = redFouls.filter(
                        (foul) => foul != penalty
                    );
                } else {
                    redFouls.push(penalty);
                }
            } else if (color === "blue") {
                if (blueFouls.includes(penalty)) {
                    blueFouls = blueFouls.filter(
                        (foul) => foul != penalty
                    );
                } else {
                    blueFouls.push(penalty);
                }
            }
        }
        if (color === "red") {
            redPenalty = penalty;
        } else if (color === "blue") {
            bluePenalty = penalty;
        }
        changeFoulIndicator(color, penalty);
        pushScoreUpdate();
        pushFoulIndicator(color, penalty);
    };
}
function pushFoulIndicator(color, penalty) {
    axios.post("/penalty", {
        message: {
            color: color,
            penalty: penalty,
        },
    });
}

export function updateDataScore(event) {
    pureScoreRed = event.red_score;
    pureScoreBlue = event.blue_score;
}

export function checkWinner() {
    const red = parseInt(councilData["blueScore"].textContent);
    const blue = parseInt(councilData["redScore"].textContent);
    if (red > blue) {
        updateMatch("red");
    } else {
        updateMatch("blue");
    }
}

export function updateMatch(winner) {
    const matchData = getArenaData();
    localStorage.clear();
    axios.post("/operator-update", {
        message: {
            blueName: matchData.blueName,
            redName: matchData.redName,
            blueContingent: matchData.redContingent,
            redContingent: matchData.blueContingent,
            round: matchData.round,
            time: 0,
            activeRound: activeRound.textContent,
            action: winner,
        },
    });
}
export function changeRoundCouncil(round) {
    updateRoundCouncil(round);
    updateFoulIndicator();
    pushScoreUpdate();
}

export function updateFoulIndicator() {
    if (redFouls.length > 0) {
        redFouls.map((foul) => {
            redFoulList = redFoulList.filter(
                (oldFoul) => oldFoul !== foul
            );
        });
        redFoulList.map((foul) => {
            pureScoreRed -= FOUL_POINTS[foul];
        });
        redFoulList = redFouls;
        redPenalty = "first";
        changeFoulIndicator("red", redPenalty);
    } else {
        redFoulList.map((foul) => {
            pureScoreRed -= FOUL_POINTS[foul];
        });
        redFoulList = [];
        redPenalty = "first";
        changeFoulIndicator("red", redPenalty);
    }

    if (blueFouls.length > 0) {
        blueFouls.map((foul) => {
            blueFoulList = blueFoulList.filter(
                (oldFoul) => oldFoul !== foul
            );
        });
        blueFoulList.map((foul) => {
            pureScoreBlue -= FOUL_POINTS[foul];
        });
        blueFoulList = blueFouls;
        bluePenalty = "first";
        changeFoulIndicator("blue", bluePenalty);
    } else {
        blueFoulList.map((foul) => {
            pureScoreBlue -= FOUL_POINTS[foul];
        });
        blueFoulList = [];
        bluePenalty = "first";
        changeFoulIndicator("blue", bluePenalty);
    }
}

export function saveData() {
    const data = {
        bluePenalty: bluePenalty,
        redPenalty: redPenalty,
        pureScoreRed: pureScoreRed,
        pureScoreBlue: pureScoreBlue,
        actionStatus: actionStatus,
    };
    ROUNDS.map((round) => {
        data[round] = {
            blueInput: document.getElementById(`${round}-blueInput`)
                .textContent,
            redInput: document.getElementById(`${round}-redInput`).textContent,
            redScore: document.getElementById(`${round}-redScore`).textContent,
            blueScore: document.getElementById(`${round}-blueScore`)
                .textContent,
        };
    });
    localStorage.setItem("councilData", JSON.stringify(data));
}
export function loadDataSave() {
    const data = JSON.parse(localStorage.getItem("councilData"));
    bluePenalty = data.bluePenalty;
    redPenalty = data.redPenalty;
    pureScoreRed = data.pureScoreRed;
    pureScoreBlue = data.pureScoreBlue;
    ROUNDS.map((round) => {
        document.getElementById(`${round}-blueInput`).textContent =
            data[round].blueInput;
        document.getElementById(`${round}-redInput`).textContent =
            data[round].redInput;
        document.getElementById(`${round}-redScore`).textContent =
            data[round].redScore;
        document.getElementById(`${round}-blueScore`).textContent =
            data[round].blueScore;
    });
    enabledAction(true);
    bluePenalty !== "first"
        ? changeFoulIndicator("blue", bluePenalty)
        : "";
    redPenalty !== "first"
        ? changeFoulIndicator("red", redPenalty)
        : "";
}

export function pushScoreUpdate(droppingRed = 0, droppingBlue = 0) {
    pureScoreRed += droppingRed;
    pureScoreBlue += droppingBlue;
    axios.post("/score-update", {
        message: {
            blueScore: pureScoreBlue,
            redScore: pureScoreRed,
            redPenalty: redFoulList,
            bluePenalty: blueFoulList,
            droppingRed: droppingRed,
            droppingBlue: droppingBlue,
        },
    });
    saveData();
}

export function handleScoreChange(color, scoreChange) {
    return function () {
        if (color === "red") {
            let text = councilData.redInput.innerHTML;
            if (!isEmpty(text)) {
                const values = text.split(",");
                const formattedValues = values.map((value) => {
                    return value;
                });
                formattedValues.push(`${scoreChange}`);
                councilData.redInput.innerHTML = formattedValues.join(",");
            } else {
                councilData.redInput.innerHTML = scoreChange;
            }
            pushScoreUpdate(scoreChange, 0);
        } else if (color === "blue") {
            let text = councilData.blueInput.innerHTML;
            if (!isEmpty(text)) {
                const values = text.split(",");
                const formattedValues = values.map((value) => {
                    return value;
                });
                formattedValues.reverse();
                formattedValues.push(`${scoreChange}`);
                formattedValues.reverse();
                councilData.blueInput.innerHTML = formattedValues.join(",");
            } else {
                councilData.blueInput.innerHTML = scoreChange;
            }
            pushScoreUpdate(0, scoreChange);
        }
    };
}

export function changeFoulIndicator(corner, penalty) {
    let nameElement = redFoulElements;
    let dataFoul;
    let color = "bg-redDefault";
    if (corner !== "red") {
        nameElement = blueFoulElements;
        if (!blueFoulList.includes(penalty)) {
            blueFoulList.push(penalty);
        } else {
            blueFoulList = blueFoulList.filter(
                (item) => item !== penalty
            );
        }
        dataFoul = blueFoulList;
        color = "bg-blueDark";
    } else {
        if (!redFoulList.includes(penalty)) {
            redFoulList.push(penalty);
        } else {
            redFoulList = redFoulList.filter(
                (item) => item !== penalty
            );
        }
        dataFoul = redFoulList;
    }
    redFoulList.sort(compare);
    blueFoulList.sort(compare);
    const redFoulValue = redFoulList[redFoulList.length - 1];
    const blueFoulValue = blueFoulList[blueFoulList.length - 1];
    if (FOULS.indexOf(blueFoulValue) > 3) {
        bluePenaltyWarning = true;
    }
    if (FOULS.indexOf(redFoulValue) > 3) {
        redPenaltyWarning = true;
    }
    redPenalty = redFoulValue;
    bluePenalty = blueFoulValue;
    FOULS.map((itemFoul) => {
        if (dataFoul.includes(itemFoul)) {
            nameElement[itemFoul].classList.remove("bg-grayDefault");
            nameElement[itemFoul].classList.add(color);
        } else {
            nameElement[itemFoul].classList.add("bg-grayDefault");
            nameElement[itemFoul].classList.remove(color);
        }
    });
}

function compare(value1, value2) {
    const index1 = FOULS.indexOf(value1);
    const index2 = FOULS.indexOf(value2);

    if (index1 < index2) {
        return -1;
    } else if (index1 > index2) {
        return 1;
    } else {
        return 0;
    }
}

export function clearIndicator() {
    const namesElement = [redFoulElements, blueFoulElements];
    namesElement.map((nameElement) => {
        FOULS.map((itemFoul) => {
            nameElement[itemFoul].classList.add("bg-grayDefault");
            nameElement[itemFoul].classList.remove(
                "bg-redDefault",
                "bg-blueDark"
            );
        });
    });
}
