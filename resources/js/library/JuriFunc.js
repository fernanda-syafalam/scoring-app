import { isEmpty } from "lodash";

// Constants for round names and button actions
const ROUNDS = ["round-1", "round-2", "round-3"];
const BUTTON_ACTIONS = [
    "blue-punch",
    "blue-kick",
    "red-punch",
    "red-kick",
];

// State variables
let pureScoreRed = 0;
let pureScoreBlue = 0;
let bluePenalty = ["first"];
let redPenalty = ["first"];
let activeRound =
    JSON.parse(
        localStorage.getItem("arenaData")
    )?.activeRound?.toLowerCase() || "ROUND";
let actionStatus = false;

// DOM element references
const juryData = {
    blueScore: document.getElementById(`round-1-blueScore`),
    redScore: document.getElementById(`round-1-redScore`),
    blueInput: document.getElementById(`round-1-blueInput`),
    redInput: document.getElementById(`round-1-redInput`),
};

// Timeout references
export const timeouts = {};

/**
 * Updates the DOM element references for the current round.
 * @param {string} round - The current round.
 */
export function updateRoundJury(round) {
    juryData.blueScore = document.getElementById(`${round}-blueScore`);
    juryData.redScore = document.getElementById(`${round}-redScore`);
    juryData.blueInput = document.getElementById(`${round}-blueInput`);
    juryData.redInput = document.getElementById(`${round}-redInput`);
    activeRound = round;
}

/**
 * Converts an ID string to a CSS-friendly format.
 * @param {string} id - The ID string.
 * @returns {string} The formatted ID.
 */
export function getId(id) {
    return id.toLowerCase().replace(/ /g, "-");
}

/**
 * Toggles the indicator for a given element.
 * @param {string} id - The ID of the indicator element.
 * @param {string} corner - The corner color ("blue" or "red").
 */
export function indicatorUpdate(id, corner) {
    const indicator = document.getElementById(id);
    if (corner === "blue") {
        indicator.classList.toggle("bg-blueDefault");
        indicator.classList.toggle("bg-grayDefault");
    } else {
        indicator.classList.toggle("bg-redDefault");
        indicator.classList.toggle("bg-grayDefault");
    }
}

/**
 * Starts a timeout to toggle an indicator.
 * @param {string} element - The ID of the indicator element.
 * @param {string} corner - The corner color.
 */
export function startTimeoutIndicator(element, corner) {
    let name = element.replace(/-/g, "");
    timeouts[`${name}`] = setTimeout(() => {
        indicatorUpdate(element, corner);
    }, 2000);
}

/**
 * Starts a timeout to strike out a value.
 * @param {string} element - The DOM element to update.
 * @param {string} params - The timeout key.
 * @param {number} position - The position of the value to strike out.
 * @param {string} corner - The corner color.
 */
export function startTimeout(element, params, position, corner = "red") {
    timeouts[`${params}`] = setTimeout(() => {
        strikeoutLastValue(element, position, corner);
    }, 2000);
}

/**
 * Cancels a timeout.
 * @param {string} params - The timeout key.
 */
export function cancelTimeout(params) {
    params = params.toLowerCase();
    clearTimeout(timeouts[`${params}`]);
}

/**
 * Inputs a point value into the DOM.
 * @param {string} element - The DOM element to update.
 * @param {number} point - The point value.
 * @param {string} corner - The corner color.
 * @returns {number} The new number of values.
 */
export function inputPoint(element, point, corner = "red") {
    element = juryData[`${element}`];
    const text = element.innerHTML;
    const values = text.split(",");
    if (!isEmpty(text)) {
        const formattedValues = values.map((value) => {
            if (!value.includes("<s>")) {
                return `${value.trim()}`;
            } else {
                return value;
            }
        });
        if (corner === "blue") {
            formattedValues.reverse();
            formattedValues.push(`${point}`);
            formattedValues.reverse();
        } else {
            formattedValues.push(`${point}`);
        }
        const joinValues = formattedValues.join(",");
        element.innerHTML = joinValues;
        const scorePiece = joinValues;
        pushMatchChairmanUpdate(corner, scorePiece);
        saveJuryData();
        return values.length;
    } else {
        element.innerHTML = point;
        pushMatchChairmanUpdate(corner, point);
        saveJuryData();
    }
}

/**
 * Changes the active round.
 * @param {string} roundActive - The new active round.
 */
export function changeRoundJury(roundActive) {
    activeRound = roundActive;
}

/**
 * Strikes out the last value in a comma-separated list.
 * @param {string} element - The DOM element to update.
 * @param {number} position - The position of the value to strike out.
 * @param {string} corner - The corner color.
 */
function strikeoutLastValue(element, position, corner) {
    element = juryData[`${element}`];
    const text = element.innerHTML;

    if (text !== "") {
        let values = text.split(",");
        if (corner === "blue") {
            values = values.reverse();
        }
        const valuePosition = values.splice(position, 1)[0];
        values.splice(position, 0, `<s>${valuePosition.trim()}</s>`);
        if (corner === "blue") {
            values = values.reverse();
        }
        const formattedValues = values.map((value) => {
            if (!value.includes("<s>")) {
                return `${value.trim()}`;
            } else {
                return value;
            }
        });
        const scorePiece = formattedValues.join(",");
        element.innerHTML = scorePiece;
        pushMatchChairmanUpdate(corner, scorePiece);
        saveJuryData();
    }
    saveJuryData();
}

/**
 * Handles a scoring action.
 * @param {Event} event - The click event.
 * @param {string} color - The corner color.
 * @param {string} action - The action type.
 */
export function handleAction(event, color, action) {
    event.preventDefault();
    pushScoreEvent(color, action);
}

/**
 * Pushes a score event to the server.
 * @param {string} corner - The corner color.
 * @param {string} movement - The movement type.
 * @param {number} blueScore - The blue score.
 * @param {number} redScore - The red score.
 */
function pushScoreEvent(corner, movement, blueScore = 0, redScore = 0) {
    axios.post("/score-event", {
        message: {
            movement: movement,
            corner: corner,
            blueScore: blueScore,
            redScore: redScore,
            time: Date.now(),
        },
    });
}

/**
 * Pushes a match chairman update to the server.
 * @param {string} corner - The corner color.
 * @param {string} scorePiece - The score piece.
 */
function pushMatchChairmanUpdate(corner, scorePiece) {
    axios.post("/match-chairman-update", {
        message: {
            corner: corner,
            scorePiece: scorePiece,
        },
    });
}

/**
 * Saves the jury's scoring data to local storage.
 */
export function saveJuryData() {
    const data = {
        bluePenalty: bluePenalty,
        redPenalty: redPenalty,
        pureScoreRed: pureScoreRed,
        pureScoreBlue: pureScoreBlue,
        actionStatus: actionStatus,
    };
    ROUNDS.map((round) => {
        data[round] = {
            blueInput: document.getElementById(`${round}-blueInput`).innerHTML,
            redInput: document.getElementById(`${round}-redInput`).innerHTML,
            redScore: document.getElementById(`${round}-redScore`).textContent,
            blueScore: document.getElementById(`${round}-blueScore`)
                .textContent,
        };
    });
    localStorage.setItem("juryScoringData", JSON.stringify(data));
}

/**
 * Loads the jury's scoring data from local storage.
 */
export function loadDataSaveJury() {
    const data = JSON.parse(localStorage.getItem("juryScoringData"));
    bluePenalty = data.bluePenalty;
    redPenalty = data.redPenalty;
    pureScoreRed = data.pureScoreRed;
    pureScoreBlue = data.pureScoreBlue;
    console.log(data);
    ROUNDS.map((round) => {
        document.getElementById(`${round}-blueInput`).innerHTML =
            data[round].blueInput;
        document.getElementById(`${round}-redInput`).innerHTML =
            data[round].redInput;
        document.getElementById(`${round}-redScore`).textContent =
            data[round].redScore;
        document.getElementById(`${round}-blueScore`).textContent =
            data[round].blueScore;
    });
}

/**
 * Updates the score data from a WebSocket event.
 * @param {Object} event - The WebSocket event.
 */
export function updateDataScore(event) {
    pureScoreRed = event.red_score;
    pureScoreBlue = event.blue_score;
    redPenalty = event.red_penalty;
    bluePenalty = event.blue_penalty;
}

/**
 * Updates the score based on a WebSocket event.
 * @param {Object} event - The WebSocket event.
 */
export function updateScore(event) {
    console.log(event);
    const movement = event.movement;
    const corner = event.corner;
    const id = event.id;
    const name = corner + movement;
    const cornerPointTime = name + "time";
    const exp = event.expired;
    const score = {
        redScore: 0,
        blueScore: 0,
    };
    const cornerScore = event.corner + "Score";
    const elementName = getId(id + " " + movement + " " + corner);
    indicatorUpdate(elementName, corner);
    startTimeoutIndicator(elementName, corner);
    if (localStorage.getItem(cornerPointTime) && localStorage.getItem(name)) {
        const time = localStorage.getItem(cornerPointTime);
        if (exp - time <= 2000 && localStorage.getItem(name) !== id) {
            if (movement === "kick") {
                score[`${cornerScore}`] += 2;
            } else {
                score[`${cornerScore}`] += 1;
            }
            localStorage.removeItem(cornerPointTime);
            localStorage.removeItem(name);
            cancelTimeout(movement + corner);
            pureScoreRed += score["redScore"];
            pureScoreBlue += score["blueScore"];
            pushScoreUpdate();
            return score;
        }
        localStorage.removeItem(cornerPointTime);
        localStorage.removeItem(name);
    }
    localStorage.setItem(cornerPointTime, exp);
    localStorage.setItem(name, id);
    return score;
}

/**
 * Pushes a score update to the server.
 */
function pushScoreUpdate() {
    saveJuryData();
    axios.post("/score-update", {
        message: {
            redPenalty: redPenalty,
            bluePenalty: bluePenalty,
            blueScore: pureScoreBlue,
            redScore: pureScoreRed,
            droppingRed: 0,
            droppingBlue: 0,
        },
    });
}

/**
 * Enables or disables the scoring action buttons.
 * @param {boolean} status - The status of the buttons.
 */
export function enabledAction(status = true) {
    actionStatus = status;
    BUTTON_ACTIONS.map((action) => {
        const button = document.getElementById(action);
        button.disabled = !status;
    });
}
