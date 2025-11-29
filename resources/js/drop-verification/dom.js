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
    dewanOverride: {
        blue: null,
        invalid: null,
        red: null,
    },
    dewanButtons: {
        cancel: null,
        confirm: null,
    },
    papanScoreResult: {
        modal: null,
        display: null,
        countdown: null,
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

    // Dewan override buttons
    elements.dewanOverride.blue = document.getElementById("dewan-override-blue");
    elements.dewanOverride.invalid = document.getElementById("dewan-override-invalid");
    elements.dewanOverride.red = document.getElementById("dewan-override-red");

    // Dewan action buttons
    elements.dewanButtons.cancel = document.getElementById("cancel-popup");
    elements.dewanButtons.confirm = document.getElementById("confirm-popup");

    // Papan score result modal
    elements.papanScoreResult.modal = document.getElementById("dropVerificationResultModal");
    elements.papanScoreResult.display = document.getElementById("papan-score-result");
    elements.papanScoreResult.countdown = document.getElementById("auto-close-countdown");
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

export function updatePopupState(redPopup, bluePopup, showResultOnPapanScore = false) {
    state.redPopup = redPopup;
    state.bluePopup = bluePopup;
    state.showResultOnPapanScore = showResultOnPapanScore;

    const currentPath = window.location.pathname;

    // Show papan score final result if flag is true
    if (showResultOnPapanScore && currentPath === PATHS.PAPAN_SCORE) {
        hidePopup(); // Hide judge voting modal if open
        // Result will be shown by showPapanScoreResult function
        return;
    }

    // Show modal when CALL is clicked
    if (redPopup || bluePopup) {
        // For papan_score: show judge voting modal (so spectators can see judge votes live)
        // For judges and dewan: show their respective modals
        showPopup();
    } else {
        hidePopup();
        hidePapanScoreResult(); // Also hide papan score result when closing
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

/**
 * Show papan score result modal with auto-close
 * @param {string} result - The final result (BLUE CORNER/RED CORNER/INVALID)
 * @param {number} autoCloseSeconds - Seconds before auto-close (default: 5)
 */
export function showPapanScoreResult(result, autoCloseSeconds = 5) {
    if (!elements.papanScoreResult.modal || !elements.papanScoreResult.display) {
        console.warn("[DropVerification] Papan score result elements not found");
        return;
    }

    // Set result text and color
    elements.papanScoreResult.display.textContent = result;

    // Apply color based on result
    const colorClasses = Object.values(CSS_CLASSES);
    elements.papanScoreResult.display.classList.remove(...colorClasses);

    if (result === CORNERS.BLUE) {
        elements.papanScoreResult.display.classList.add(CSS_CLASSES.BG_BLUE);
    } else if (result === CORNERS.RED) {
        elements.papanScoreResult.display.classList.add(CSS_CLASSES.BG_RED);
    } else if (result === CORNERS.INVALID) {
        elements.papanScoreResult.display.classList.add(CSS_CLASSES.BG_YELLOW);
    } else {
        elements.papanScoreResult.display.classList.add(CSS_CLASSES.BG_GRAY);
    }

    // Show modal
    elements.papanScoreResult.modal.style.display = "block";

    // Start countdown
    let countdown = autoCloseSeconds;
    if (elements.papanScoreResult.countdown) {
        elements.papanScoreResult.countdown.textContent = countdown;
    }

    const countdownInterval = setInterval(() => {
        countdown--;
        if (elements.papanScoreResult.countdown) {
            elements.papanScoreResult.countdown.textContent = countdown;
        }

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            hidePapanScoreResult();
        }
    }, 1000);

    console.log(`[DropVerification] Showing result: ${result} (auto-close in ${autoCloseSeconds}s)`);
}

/**
 * Hide papan score result modal
 */
export function hidePapanScoreResult() {
    if (!elements.papanScoreResult.modal) return;

    elements.papanScoreResult.modal.style.display = "none";

    // Reset display
    if (elements.papanScoreResult.display) {
        elements.papanScoreResult.display.textContent = "";
        const colorClasses = Object.values(CSS_CLASSES);
        elements.papanScoreResult.display.classList.remove(...colorClasses);
        elements.papanScoreResult.display.classList.add(CSS_CLASSES.BG_GRAY);
    }
}

/**
 * Highlight dewan's selected choice
 * @param {string} choice - Selected choice (BLUE CORNER/RED CORNER/INVALID)
 */
export function highlightDewanSelection(choice) {
    if (!elements.dewanOverride.blue || !elements.dewanOverride.red || !elements.dewanOverride.invalid) {
        return;
    }

    // Remove all focus/active states
    const colorClasses = Object.values(CSS_CLASSES);
    elements.dewanOverride.blue.classList.remove(...colorClasses);
    elements.dewanOverride.red.classList.remove(...colorClasses);
    elements.dewanOverride.invalid.classList.remove(...colorClasses);

    // Add gray default to all
    elements.dewanOverride.blue.classList.add(CSS_CLASSES.BG_GRAY);
    elements.dewanOverride.red.classList.add(CSS_CLASSES.BG_GRAY);
    elements.dewanOverride.invalid.classList.add(CSS_CLASSES.BG_GRAY);

    // Highlight selected choice
    if (choice === CORNERS.BLUE) {
        elements.dewanOverride.blue.classList.remove(CSS_CLASSES.BG_GRAY);
        elements.dewanOverride.blue.classList.add(CSS_CLASSES.BG_BLUE);
    } else if (choice === CORNERS.RED) {
        elements.dewanOverride.red.classList.remove(CSS_CLASSES.BG_GRAY);
        elements.dewanOverride.red.classList.add(CSS_CLASSES.BG_RED);
    } else if (choice === CORNERS.INVALID) {
        elements.dewanOverride.invalid.classList.remove(CSS_CLASSES.BG_GRAY);
        elements.dewanOverride.invalid.classList.add(CSS_CLASSES.BG_YELLOW);
    }
}
