// import puppeteer from 'puppeteer';

require("./bootstrap");
import {
    matchChairmanChannel,
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
} from "./library/ChairmanFunc.js";
import {
    channelUpdateScore,
    channelOperator,
    updateScore,
    userData,
    savedArenaData,
} from "./library/ScoreFunc.js";

storeArenaData(savedArenaData);
loadDataSaved();

channelUpdateScore.listen(`.updateScore.${userData.arena_id}`, (event) => {
    updateScore(event);
    storePoint();
    storeDroppingRed(event.droppingRed);
    storeDroppingBlue(event.droppingBlue);
    storeRedPenalty(event.red_penalty);
    storeBluePenalty(event.blue_penalty);
});

channelOperator.listen(`.operator.${userData.arena_id}`, (event) => {
    updateArenaData(event);
});

matchChairmanChannel.listen(
    `.match-chairman.${userData.arena_id}`,
    (event) => {
        storeJuror(event.id, event.scorePiece, event.corner);
    }
);

function screenShot() {
    axios.get("/capture-screenshot");
}

function updateArenaData(e) {
    switch (e.action) {
        case "start":
            startMatch(e);
            break;
        case "finish":
            screenShot();
            break;
        case "round":
            changeRound(e);
            break;
        case "reset":
            localStorage.clear();
            location.reload();
            break;
        case "play":
            break;
        case "pause":
            break;
    }
}
