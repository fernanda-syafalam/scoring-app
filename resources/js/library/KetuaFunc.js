let arenaData = JSON.parse(localStorage.getItem("arenaData"));
let round = arenaData?.activeRound?.toLowerCase() || "ROUND";
let dropRed = [];
let dropBlue = [];
let savedArenaData = {};
let savedChairmanData = {
    "round-1": {
        red: {},
        blue: {},
    },
    "round-2": {
        red: {},
        blue: {},
    },
    "round-3": {
        red: {},
        blue: {},
    },
};
let userElement = document.getElementById("user");
const userData = JSON.parse(userElement.getAttribute("data-user"));
export const matchChairmanChannel = Echo.join(
    `presence.match-chairman.${userData.arena_id}`
);
const chairmanData = JSON.parse(localStorage.getItem("chairmanData"));
const redName = document.getElementById("red-name");
const redContingent = document.getElementById("red-contingent");
const blueName = document.getElementById("blue-name");
const blueContingent = document.getElementById("blue-contingent");
const matchRound = document.getElementById("match-round");
const activeRound = document.getElementById("round");

const redCorner = {
    juror1: document.getElementById(`${round}-juror1-red`),
    juror2: document.getElementById(`${round}-juror2-red`),
    juror3: document.getElementById(`${round}-juror3-red`),
    point: document.getElementById(`${round}-point-red`),
    dropping: document.getElementById(`${round}-dropping-red`),
    penalty: document.getElementById(`${round}-penalty-red`),
    boardPoint: document.getElementById(`${round}-board-point-red`),
};

const blueCorner = {
    juror1: document.getElementById(`${round}-juror1-blue`),
    juror2: document.getElementById(`${round}-juror2-blue`),
    juror3: document.getElementById(`${round}-juror3-blue`),
    point: document.getElementById(`${round}-point-blue`),
    dropping: document.getElementById(`${round}-dropping-blue`),
    penalty: document.getElementById(`${round}-penalty-blue`),
    boardPoint: document.getElementById(`${round}-board-point-blue`),
};

function initialDynamicDom() {
    redCorner["juror1"] = document.getElementById(`${round}-juror1-red`);
    redCorner["juror2"] = document.getElementById(`${round}-juror2-red`);
    redCorner["juror3"] = document.getElementById(`${round}-juror3-red`);
    redCorner["point"] = document.getElementById(`${round}-point-red`);
    redCorner["dropping"] = document.getElementById(`${round}-dropping-red`);
    redCorner["penalty"] = document.getElementById(`${round}-penalty-red`);
    redCorner["boardPoint"] = document.getElementById(
        `${round}-board-point-red`
    );

    blueCorner["juror1"] = document.getElementById(`${round}-juror1-blue`);
    blueCorner["juror2"] = document.getElementById(`${round}-juror2-blue`);
    blueCorner["juror3"] = document.getElementById(`${round}-juror3-blue`);
    blueCorner["point"] = document.getElementById(`${round}-point-blue`);
    blueCorner["dropping"] = document.getElementById(`${round}-dropping-blue`);
    blueCorner["penalty"] = document.getElementById(`${round}-penalty-blue`);
    blueCorner["boardPoint"] = document.getElementById(
        `${round}-board-point-blue`
    );
}

function initialGeneralDom() {
    // round1
    document.getElementById(`round-1-juror1-red`).innerHTML =
        chairmanData["round-1"]?.red?.juror1 || "";
    document.getElementById(`round-1-juror2-red`).innerHTML =
        chairmanData["round-1"]?.red?.juror2 || "";
    document.getElementById(`round-1-juror3-red`).innerHTML =
        chairmanData["round-1"]?.red?.juror3 || "";
    document.getElementById(`round-1-point-red`).innerHTML =
        chairmanData["round-1"]?.red?.point || 0;
    document.getElementById(`round-1-dropping-red`).innerHTML =
        chairmanData["round-1"]?.red?.dropping || "";
    document.getElementById(`round-1-penalty-red`).innerHTML =
        chairmanData["round-1"]?.red?.penalty || "";
    document.getElementById(`round-1-board-point-red`).innerHTML =
        chairmanData["round-1"]?.red?.point || 0;

    document.getElementById(`round-1-juror1-blue`).innerHTML =
        chairmanData["round-1"]?.blue?.juror1 || "";
    document.getElementById(`round-1-juror2-blue`).innerHTML =
        chairmanData["round-1"]?.blue?.juror2 || "";
    document.getElementById(`round-1-juror3-blue`).innerHTML =
        chairmanData["round-1"]?.blue?.juror3 || "";
    document.getElementById(`round-1-point-blue`).innerHTML =
        chairmanData["round-1"]?.blue?.point || 0;
    document.getElementById(`round-1-dropping-blue`).innerHTML =
        chairmanData["round-1"]?.blue?.dropping || "";
    document.getElementById(`round-1-penalty-blue`).innerHTML =
        chairmanData["round-1"]?.blue?.penalty || "";
    document.getElementById(`round-1-board-point-blue`).innerHTML =
        chairmanData["round-1"]?.blue?.point || 0;

    // round 2
    document.getElementById(`round-2-juror1-red`).innerHTML =
        chairmanData["round-2"]?.red?.juror1 || "";
    document.getElementById(`round-2-juror2-red`).innerHTML =
        chairmanData["round-2"]?.red?.juror2 || "";
    document.getElementById(`round-2-juror3-red`).innerHTML =
        chairmanData["round-2"]?.red?.juror3 || "";
    document.getElementById(`round-2-point-red`).innerHTML =
        chairmanData["round-2"]?.red?.point || 0;
    document.getElementById(`round-2-dropping-red`).innerHTML =
        chairmanData["round-2"]?.red?.dropping || "";
    document.getElementById(`round-2-penalty-red`).innerHTML =
        chairmanData["round-2"]?.red?.penalty || "";
    document.getElementById(`round-2-board-point-red`).innerHTML =
        chairmanData["round-2"]?.red?.point || 0;

    document.getElementById(`round-2-juror1-blue`).innerHTML =
        chairmanData["round-2"]?.blue?.juror1 || "";
    document.getElementById(`round-2-juror2-blue`).innerHTML =
        chairmanData["round-2"]?.blue?.juror2 || "";
    document.getElementById(`round-2-juror3-blue`).innerHTML =
        chairmanData["round-2"]?.blue?.juror3 || "";
    document.getElementById(`round-2-point-blue`).innerHTML =
        chairmanData["round-2"]?.blue?.point || 0;
    document.getElementById(`round-2-dropping-blue`).innerHTML =
        chairmanData["round-2"]?.blue?.dropping || "";
    document.getElementById(`round-2-penalty-blue`).innerHTML =
        chairmanData["round-2"]?.blue?.penalty || "";
    document.getElementById(`round-2-board-point-blue`).innerHTML =
        chairmanData["round-2"]?.blue?.point || 0;

    // round 3
    document.getElementById(`round-3-juror1-red`).innerHTML =
        chairmanData["round-3"]?.red?.juror1 || "";
    document.getElementById(`round-3-juror2-red`).innerHTML =
        chairmanData["round-3"]?.red?.juror2 || "";
    document.getElementById(`round-3-juror3-red`).innerHTML =
        chairmanData["round-3"]?.red?.juror3 || "";
    document.getElementById(`round-3-point-red`).innerHTML =
        chairmanData["round-3"]?.red?.point || 0;
    document.getElementById(`round-3-dropping-red`).innerHTML =
        chairmanData["round-3"]?.red?.dropping || "";
    document.getElementById(`round-3-penalty-red`).innerHTML =
        chairmanData["round-3"]?.red?.penalty || "";
    document.getElementById(`round-3-board-point-red`).innerHTML =
        chairmanData["round-3"]?.red?.point || 0;

    document.getElementById(`round-3-juror1-blue`).innerHTML =
        chairmanData["round-3"]?.blue?.juror1 || "";
    document.getElementById(`round-3-juror2-blue`).innerHTML =
        chairmanData["round-3"]?.blue?.juror2 || "";
    document.getElementById(`round-3-juror3-blue`).innerHTML =
        chairmanData["round-3"]?.blue?.juror3 || "";
    document.getElementById(`round-3-point-blue`).innerHTML =
        chairmanData["round-3"]?.blue?.point || 0;
    document.getElementById(`round-3-dropping-blue`).innerHTML =
        chairmanData["round-3"]?.blue?.dropping || "";
    document.getElementById(`round-3-penalty-blue`).innerHTML =
        chairmanData["round-3"]?.blue?.penalty || "";
    document.getElementById(`round-3-board-point-blue`).innerHTML =
        chairmanData["round-3"]?.blue?.point || 0;
}

function storeArenaData(data) {
    savedArenaData = data;
}

function startMatch(e) {
    round = e.activeRound;
    redName.textContent = e.redName;
    redContingent.textContent = e.redContingent;
    blueName.textContent = e.blueName;
    blueContingent.textContent = e.blueContingent;
    matchRound.textContent = e.round.toUpperCase();
    activeRound.textContent = e.activeRound.toUpperCase();

    const arenaData = {
        redName: e.redName,
        redContingent: e.redContingent,
        blueName: e.blueName,
        blueContingent: e.blueContingent,
        round: e.round.toUpperCase(),
        activeRound: e.activeRound,
    };
    initialDynamicDom();

    localStorage.setItem("arenaData", JSON.stringify(arenaData));
}

function loadDataSaved() {
    redName.textContent = savedArenaData.redName;
    redContingent.textContent = savedArenaData.redContingent;
    blueName.textContent = savedArenaData.blueName;
    blueContingent.textContent = savedArenaData.blueContingent;
    matchRound.textContent = savedArenaData.round;
    activeRound.textContent = savedArenaData.activeRound;
    if (chairmanData) {
        savedChairmanData = chairmanData;
        initialGeneralDom();
    }
}

function changeRound(event) {
    const arena = JSON.parse(localStorage.getItem("arenaData"));
    round = event.activeRound;
    activeRound.textContent = round;
    arena.activeRound = round;
    localStorage.setItem("arenaData", JSON.stringify(arena));
    resetDropping();
    initialDynamicDom();
}

function storeJuror(juror, scorePiece, corner) {
    const cornerData = corner === "red" ? redCorner : blueCorner;

    let jurorKey;
    switch (juror) {
        case "Jury 1":
            jurorKey = "juror1";
            break;
        case "Jury 2":
            jurorKey = "juror2";
            break;
        case "Jury 3":
            jurorKey = "juror3";
            break;
        default:
            break;
    }
    cornerData[jurorKey].innerHTML = scorePiece;

    let jurorDataToAdd = {};
    jurorDataToAdd[jurorKey] = scorePiece;

    savedChairmanData[round][corner] = {
        ...savedChairmanData[round][corner],
        ...jurorDataToAdd,
    };
    localStorage.setItem(
        "chairmanData",
        JSON.stringify(savedChairmanData)
    );
}

function storePoint() {
    const scoreData = JSON.parse(localStorage.getItem("scoreData"));
    const redScore = scoreData?.redScore;
    const blueScore = scoreData?.blueScore;
    redCorner.point.innerText = redScore;
    blueCorner.point.innerText = blueScore;
    redCorner.boardPoint.innerText = redScore;
    blueCorner.boardPoint.innerText = blueScore;

    savedChairmanData[round]["red"].point = redScore;
    savedChairmanData[round]["blue"].point = blueScore;
    localStorage.setItem(
        "chairmanData",
        JSON.stringify(savedChairmanData)
    );
}

function storeDroppingRed(value) {
    if (value === -3) {
        dropRed.push("-3");
    } else if (value === 3) {
        dropRed.push("3");
    }
    value = dropRed.join(",");
    redCorner.dropping.innerText = value;
    savedChairmanData[round]["red"].dropping = value;
    localStorage.setItem(
        "chairmanData",
        JSON.stringify(savedChairmanData)
    );
}

function storeDroppingBlue(value) {
    if (value === -3) {
        dropBlue.reverse();
        dropBlue.push("-3");
        dropBlue.reverse();
    } else if (value === 3) {
        dropBlue.reverse();
        dropBlue.push("3");
        dropBlue.reverse();
    }
    value = dropBlue.join(",");
    blueCorner.dropping.innerText = value;
    savedChairmanData[round]["blue"].dropping = value;
    localStorage.setItem(
        "chairmanData",
        JSON.stringify(savedChairmanData)
    );
}

function resetDropping() {
    dropRed = [];
    dropBlue = [];
}

function storeRedPenalty(value) {
    let redPenalty = value.join(", ");
    redPenalty = redPenalty.replace(/-/g, " ");
    redCorner.penalty.innerText = redPenalty;
    savedChairmanData[round]["red"].penalty = redPenalty;
    localStorage.setItem(
        "chairmanData",
        JSON.stringify(savedChairmanData)
    );
}

function storeBluePenalty(value) {
    let bluePenalty = value.join(", ");
    bluePenalty = bluePenalty.replace(/-/g, " ");
    blueCorner.penalty.innerText = bluePenalty;
    savedChairmanData[round]["blue"].penalty = bluePenalty;
    localStorage.setItem(
        "chairmanData",
        JSON.stringify(savedChairmanData)
    );
}

export {
    storeArenaData,
    startMatch,
    loadDataSaved,
    changeRound,
    storeJuror,
    storePoint,
    storeDroppingRed,
    storeDroppingBlue,
    storeRedPenalty,
    storeBluePenalty,
};
