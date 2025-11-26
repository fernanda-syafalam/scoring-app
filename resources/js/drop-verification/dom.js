import { PATHS, CSS_CLASSES, JUDGES, CORNERS } from "./constants.js";
import { state } from "./state.js";

export const elements = {
    user: null,
    jury: {
        first: { red: null, blue: null, invalid: null },
        second: { red: null, blue: null, invalid: null },
        third: { red: null, blue: null, invalid: null },
    },
    popup: {
        modal: null,
        red: null,
        blue: null,
        close: null,
    },
    choice: {
        blue: null,
        invalid: null,
        red: null,
        result: null,
    },
};

export function cacheElements() {
    elements.user = document.getElementById("user");
    elements.jury.first.red = document.getElementById("jurror1-red");
    elements.jury.first.blue = document.getElementById("jurror1-blue");
    elements.jury.first.invalid = document.getElementById("jurror1-invalid");
    elements.jury.second.red = document.getElementById("jurror2-red");
    elements.jury.second.blue = document.getElementById("jurror2-blue");
    elements.jury.second.invalid = document.getElementById("jurror2-invalid");
    elements.jury.third.red = document.getElementById("jurror3-red");
    elements.jury.third.blue = document.getElementById("jurror3-blue");
    elements.jury.third.invalid = document.getElementById("jurror3-invalid");
    elements.popup.modal = document.getElementById("dropVerificationModal");
    elements.popup.red = document.getElementById("popup-merah");
    elements.popup.blue = document.getElementById("popup-biru");
    elements.popup.close = document.getElementById("done-popup");
    elements.choice.blue = document.getElementById("choice1");
    elements.choice.invalid = document.getElementById("choice2");
    elements.choice.red = document.getElementById("choice3");
    elements.choice.result = document.getElementById("choice-result");
}

export function getUserData() {
    if (!elements.user) {
        throw new Error("User element not found in DOM");
    }

    const userData = JSON.parse(elements.user.getAttribute("data-user"));
    const userDetails = JSON.parse(elements.user.getAttribute("detail-user"));

    if (!userData?.gelanggang_id) {
        throw new Error("Invalid user data: missing gelanggang_id");
    }

    return { ...userData, details: userDetails };
}

export function updateJuryIndicators(event) {
    if (window.location.pathname === PATHS.JURI) {
        return;
    }

    const judgeMap = {
        [JUDGES.FIRST]: {
            vote: event.juri_pertama,
            elements: elements.jury.first,
        },
        [JUDGES.SECOND]: {
            vote: event.juri_kedua,
            elements: elements.jury.second,
        },
        [JUDGES.THIRD]: {
            vote: event.juri_ketiga,
            elements: elements.jury.third,
        },
    };

    const judge = judgeMap[event.id];
    if (judge) {
        setJuryVoteColors(judge.elements, judge.vote);
    }
}

function setJuryVoteColors(juryElements, vote) {
    setElementClasses(juryElements.red, CSS_CLASSES.BG_GRAY);
    setElementClasses(juryElements.blue, CSS_CLASSES.BG_GRAY);
    setElementClasses(juryElements.invalid, CSS_CLASSES.BG_GRAY);

    switch (vote) {
        case CORNERS.RED:
            setElementClasses(juryElements.red, CSS_CLASSES.BG_RED);
            break;
        case CORNERS.BLUE:
            setElementClasses(juryElements.blue, CSS_CLASSES.BG_BLUE);
            break;
        case CORNERS.INVALID:
            setElementClasses(juryElements.invalid, CSS_CLASSES.BG_YELLOW);
            break;
    }
}

function setElementClasses(element, activeClass) {
    if (!element) return;

    const colorClasses = Object.values(CSS_CLASSES);
    element.classList.remove(...colorClasses);
    element.classList.add(activeClass);
}

export function updatePopupState(redPopup, bluePopup) {
    state.redPopup = redPopup;
    state.bluePopup = bluePopup;

    if (redPopup || bluePopup) {
        showPopup();
    } else {
        hidePopup();
    }
}

function showPopup() {
    if (!elements.popup.modal) return;

    elements.popup.modal.style.display = "block";

    if (
        window.location.pathname === PATHS.PAPAN_SCORE &&
        elements.popup.close
    ) {
        elements.popup.close.style.display = "none";
    }
}

function hidePopup() {
    if (!elements.popup.modal) return;

    elements.popup.modal.style.display = "none";

    if (window.location.pathname === PATHS.JURI && elements.choice.result) {
        setElementClasses(elements.choice.result, CSS_CLASSES.BG_GRAY);
        elements.choice.result.innerText = "";
    }
}

export function resetAllJuryIndicators() {
    Object.values(elements.jury).forEach((judge) => {
        setElementClasses(judge.red, CSS_CLASSES.BG_GRAY);
        setElementClasses(judge.blue, CSS_CLASSES.BG_GRAY);
        setElementClasses(judge.invalid, CSS_CLASSES.BG_GRAY);
    });
}

export function updateChoiceIndicator(choice) {
    if (!elements.choice.result) return;

    elements.choice.result.innerText = choice;

    const colorMap = {
        [CORNERS.BLUE]: CSS_CLASSES.BG_BLUE,
        [CORNERS.INVALID]: CSS_CLASSES.BG_YELLOW,
        [CORNERS.RED]: CSS_CLASSES.BG_RED,
    };

    setElementClasses(
        elements.choice.result,
        colorMap[choice] || CSS_CLASSES.BG_GRAY
    );
}

export function showErrorMessage(message) {
    console.error(message);
}
