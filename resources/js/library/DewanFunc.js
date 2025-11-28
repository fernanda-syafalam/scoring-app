import { isEmpty } from "lodash";
import { activeRound, getDataGelanggang } from "./ScoreFunc";

const pelanggaran = [
    "teguran-pertama",
    "teguran-kedua",
    "binaan-pertama",
    "binaan-kedua",
    "peringatan-pertama",
    "peringatan-kedua",
    "peringatan-ketiga",
];
let bluePenalty = "pertama";
const peringatan = [
    "peringatan-pertama",
    "peringatan-kedua",
    "peringatan-ketiga",
];
let redPenalty = "pertama";
let redPelanggaran = [];
let bluePelanggaran = [];
let pureScoreRed = 0;
let pureScoreBlue = 0;
const rounds = ["round-1", "round-2", "round-3"];
let peringatanPenaltyBlue = false;

let peringatanPenaltyRed = false;

// ========================================
// DROP TRACKING SYSTEM
// ========================================
let redDropCount = 0;
let blueDropCount = 0;
const MAX_DROPS_PER_ROUND = 5;
const DROP_SCORE_VALUE = 3; // Points for valid drop

// ========================================
// PERFORMANCE OPTIMIZATION: Debounce timeout
// ========================================
let scoreUpdateTimeout;
const SCORE_DEBOUNCE_MS = 150; // Wait 150ms to batch multiple clicks

// ========================================
// LOGGING & OPTIMIZATION: Verbose logging control
// ========================================
const LOG_LEVEL = process.env.NODE_ENV === 'production' ? 'ERROR' : 'INFO';
const shouldLog = (level) => {
    const levels = { ERROR: 0, WARN: 1, INFO: 2, DEBUG: 3 };
    return levels[level] <= levels[LOG_LEVEL];
};

// ========================================
// STATE CHANGE DETECTION: Prevent redundant broadcasts
// ========================================
let lastBroadcastState = {
    redScore: 0,
    blueScore: 0,
    redPenalties: [],
    bluePenalties: [],
};

function hasStateChanged(newState) {
    // Compare scores
    if (newState.redScore !== lastBroadcastState.redScore ||
        newState.blueScore !== lastBroadcastState.blueScore) {
        return true;
    }

    // Compare penalties (as JSON strings since arrays need deep comparison)
    const redPenaltiesChanged = JSON.stringify(newState.redPenalties) !==
                               JSON.stringify(lastBroadcastState.redPenalties);
    const bluePenaltiesChanged = JSON.stringify(newState.bluePenalties) !==
                                JSON.stringify(lastBroadcastState.bluePenalties);

    return redPenaltiesChanged || bluePenaltiesChanged;
}

const pelanggaranPoint = {
    pertama: 0,
    "binaan-pertama": 0,
    "binaan-kedua": 0,
    "teguran-pertama": 1,
    "teguran-kedua": 2,
    "peringatan-pertama": 5,
    "peringatan-kedua": 10,
    "peringatan-ketiga": 0,
};
let pelanggaranBiru = ["pertama"];
let pelanggaranMerah = ["pertama"];
const buttonAction = [
    "jatuhan-biru-minus",
    "jatuhan-biru-plus",
    "jatuhan-merah-minus",
    "jatuhan-merah-plus",
    "peringatan-biru-ketiga",
    "peringatan-biru-kedua",
    "binaan-biru-kedua",
    "teguran-biru-kedua",
    "peringatan-biru-pertama",
    "binaan-biru-pertama",
    "teguran-biru-pertama",
    "peringatan-merah-ketiga",
    "peringatan-merah-kedua",
    "binaan-merah-kedua",
    "teguran-merah-kedua",
    "peringatan-merah-pertama",
    "binaan-merah-pertama",
    "teguran-merah-pertama",
    "disk-merah",
    "disk-biru",
];

let actionStatus = false;
const pelanggaranRedElement = {
    "teguran-pertama": document.getElementById("teguran-merah-pertama"),
    "teguran-kedua": document.getElementById("teguran-merah-kedua"),
    "binaan-pertama": document.getElementById("binaan-merah-pertama"),
    "binaan-kedua": document.getElementById("binaan-merah-kedua"),
    "peringatan-pertama": document.getElementById("peringatan-merah-pertama"),
    "peringatan-kedua": document.getElementById("peringatan-merah-kedua"),
    "peringatan-ketiga": document.getElementById("peringatan-merah-ketiga"),
};
const pelanggaranBlueElement = {
    "teguran-pertama": document.getElementById("teguran-biru-pertama"),
    "teguran-kedua": document.getElementById("teguran-biru-kedua"),
    "binaan-pertama": document.getElementById("binaan-biru-pertama"),
    "binaan-kedua": document.getElementById("binaan-biru-kedua"),
    "peringatan-pertama": document.getElementById("peringatan-biru-pertama"),
    "peringatan-kedua": document.getElementById("peringatan-biru-kedua"),
    "peringatan-ketiga": document.getElementById("peringatan-biru-ketiga"),
};
const dataDewan = {
    blueInput: document.getElementById(`round-1-blueInput`),
    redInput: document.getElementById(`round-1-redInput`),
    redScore: document.getElementById("round-1-redScore"),
    blueScore: document.getElementById("round-1-blueScore"),
};
export function updateRoundDewan(round) {
    dataDewan.blueInput = document.getElementById(`${round}-blueInput`);
    dataDewan.redInput = document.getElementById(`${round}-redInput`);
    dataDewan.blueScore = document.getElementById(`${round}-blueScore`);
    dataDewan.redScore = document.getElementById(`${round}-redScore`);
}
export function enabledAction(status = true) {
    actionStatus = status;
    buttonAction.map((action) => {
        const button = document.getElementById(action);
        button.disabled = !status;
    });
}
export function handlePenaltyClick(color, penalty) {
    if (shouldLog('DEBUG')) console.log("🚀 ~ handlePenaltyClick ~ penalty:", penalty);
    return function () {
        if (peringatan.includes(penalty)) {
            if (color === "red") {
                if (redPelanggaran.includes(penalty)) {
                    redPelanggaran = redPelanggaran.filter(
                        (pelanggaran) => pelanggaran != penalty
                    );
                } else {
                    redPelanggaran.push(penalty);
                }
            } else if (color === "blue") {
                if (bluePelanggaran.includes(penalty)) {
                    bluePelanggaran = bluePelanggaran.filter(
                        (pelanggaran) => pelanggaran != penalty
                    );
                } else {
                    bluePelanggaran.push(penalty);
                }
            }
        }
        if (color === "red") {
            redPenalty = penalty;
        } else if (color === "blue") {
            bluePenalty = penalty;
        }
        changeIndicatorPelanggaran(color, penalty);
        pushScore();
        pushIndicator(color, penalty);
    };
}
function pushIndicator(color, penalty) {
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

export function cekWinner() {
    console.log("🏆 Checking winner based on final scores...");
    // ✅ FIX: Corrected variable assignment (was backwards)
    const redScore = parseInt(dataDewan["redScore"].textContent) || 0;
    const blueScore = parseInt(dataDewan["blueScore"].textContent) || 0;

    console.log(`Final scores - Red: ${redScore}, Blue: ${blueScore}`);

    if (redScore > blueScore) {
        console.log("🔴 Red corner wins by points");
        updatePertandingan("merah", redScore, blueScore);
    } else if (blueScore > redScore) {
        console.log("🔵 Blue corner wins by points");
        updatePertandingan("biru", redScore, blueScore);
    } else {
        console.log("⚖️ Tie - need tiebreaker rules");
        // TODO: Implement tiebreaker logic
        updatePertandingan("merah", redScore, blueScore); // Default to red for now
    }
}

export function updatePertandingan(winner, redScore = 0, blueScore = 0) {
    const dataPartai = getDataGelanggang();
    localStorage.clear();

    // Determine winner info
    const winnerName = winner === "merah" ? dataPartai.namaMerah : dataPartai.namaBiru;
    const winnerCorner = winner === "merah" ? "Merah" : "Biru";
    const winnerContingent = winner === "merah" ? dataPartai.kontingenMerah : dataPartai.kontingenBiru;

    // ✅ FIX: Send to /winner endpoint (not /operator-update)
    // ✅ FIX: Corrected contingent assignment (was swapped)
    // ✅ NEW: Added winMethod, redScore, blueScore
    axios.post("/winner", {
        message: {
            name: winnerName,
            corner: winnerCorner,
            contingent: winnerContingent,
            winMethod: "Teknik", // Automatic win by points
            redScore: redScore,
            blueScore: blueScore,
            // Additional match data for records
            redName: dataPartai.namaMerah,
            blueName: dataPartai.namaBiru,
            redContingent: dataPartai.kontingenMerah,  // ✅ Fixed: was kontingenBiru
            blueContingent: dataPartai.kontingenBiru,  // ✅ Fixed: was kontingenMerah
            babak: dataPartai.babak,
            activeRound: activeRound.textContent,
        },
    }).then(() => {
        console.log("✅ Winner broadcast successful");
    }).catch((error) => {
        console.error("❌ Error broadcasting winner:", error);
    });
}
export function changeRoundDewan(round) {
    updateRoundDewan(round);
    if (shouldLog('DEBUG')) console.log("🚀 ~ changeRoundDewan ~ round:", round);
    updateDataIndicator();
    pushScore();
}

export function updateDataIndicator() {
    if (redPelanggaran.length > 0) {
        if (shouldLog('DEBUG')) console.log("🚀 ~ updateDataIndicator ~ redPelanggaran:", redPelanggaran);
        redPelanggaran.map((pelanggaran) => {
            // pureScoreRed -= pelanggaranPoint[pelanggaran]
            pelanggaranMerah = pelanggaranMerah.filter(
                (oldPelanggaran) => oldPelanggaran !== pelanggaran
            );
        });
        pelanggaranMerah.map((pelanggaran) => {
            pureScoreRed -= pelanggaranPoint[pelanggaran];
        });
        pelanggaranMerah = redPelanggaran;
        redPenalty = "pertama";
        changeIndicatorPelanggaran("red", redPenalty);
    } else {
        pelanggaranMerah.map((pelanggaran) => {
            pureScoreRed -= pelanggaranPoint[pelanggaran];
        });
        pelanggaranMerah = [];
        if (shouldLog('DEBUG')) console.log("🚀 ~ updateDataIndicator ~ pelanggaranMerah reset");
        redPenalty = "pertama";
        changeIndicatorPelanggaran("red", redPenalty);
    }

    if (bluePelanggaran.length > 0) {
        if (shouldLog('DEBUG')) console.log("🚀 ~ updateDataIndicator ~ bluePelanggaran:", bluePelanggaran);
        bluePelanggaran.map((pelanggaran) => {
            // pureScoreBlue -= pelanggaranPoint[pelanggaran]
            pelanggaranBiru = pelanggaranBiru.filter(
                (oldPelanggaran) => oldPelanggaran !== pelanggaran
            );
        });
        pelanggaranBiru.map((pelanggaran) => {
            pureScoreBlue -= pelanggaranPoint[pelanggaran];
        });
        pelanggaranBiru = bluePelanggaran;
        bluePenalty = "pertama";
        changeIndicatorPelanggaran("blue", bluePenalty);
    } else {
        pelanggaranBiru.map((pelanggaran) => {
            pureScoreBlue -= pelanggaranPoint[pelanggaran];
        });
        pelanggaranBiru = [];
        if (shouldLog('DEBUG')) console.log("🚀 ~ updateDataIndicator ~ pelanggaranBiru reset");
        bluePenalty = "pertama";
        changeIndicatorPelanggaran("blue", bluePenalty);
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
    rounds.map((round) => {
        data[round] = {
            blueInput: document.getElementById(`${round}-blueInput`)
                .textContent,
            redInput: document.getElementById(`${round}-redInput`).textContent,
            redScore: document.getElementById(`${round}-redScore`).textContent,
            blueScore: document.getElementById(`${round}-blueScore`)
                .textContent,
        };
    });
    localStorage.setItem("dataDewan", JSON.stringify(data));
}
export function loadDataSave() {
    const data = JSON.parse(localStorage.getItem("dataDewan"));
    bluePenalty = data.bluePenalty;
    redPenalty = data.redPenalty;
    pureScoreRed = data.pureScoreRed;
    pureScoreBlue = data.pureScoreBlue;
    rounds.map((round) => {
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
    bluePenalty !== "pertama"
        ? changeIndicatorPelanggaran("blue", bluePenalty)
        : "";
    redPenalty !== "pertama"
        ? changeIndicatorPelanggaran("red", redPenalty)
        : "";
}

export function pushScore(droppingRed = 0, droppingBlue = 0) {
    pureScoreRed += droppingRed;
    pureScoreBlue += droppingBlue;

    // ========================================
    // PERFORMANCE OPTIMIZATION: Debounce HTTP requests
    // ========================================
    // Clear previous timeout to batch multiple clicks
    clearTimeout(scoreUpdateTimeout);

    // Schedule the HTTP POST after waiting for more clicks (150ms window)
    scoreUpdateTimeout = setTimeout(() => {
        // ========================================
        // STATE CHANGE DETECTION: Only broadcast if state changed
        // ========================================
        const newState = {
            redScore: pureScoreRed,
            blueScore: pureScoreBlue,
            redPenalties: [...pelanggaranMerah],
            bluePenalties: [...pelanggaranBiru],
        };

        if (!hasStateChanged(newState)) {
            if (shouldLog('DEBUG')) console.log("⏭️ Skipping redundant broadcast - state unchanged");
            return;
        }

        // Update last broadcast state
        lastBroadcastState = newState;

        if (shouldLog('INFO')) console.log("📤 Sending score update (state changed)");
        axios.post("/score-update", {
            message: {
                blueScore: pureScoreBlue,
                redScore: pureScoreRed,
                redPenalty: pelanggaranMerah,
                bluePenalty: pelanggaranBiru,
                droppingRed: droppingRed,
                droppingBlue: droppingBlue,
            },
        }).catch((error) => {
            console.error("❌ Error updating score:", error);
        });
    }, SCORE_DEBOUNCE_MS);

    // Save locally immediately (fast, no network)
    saveData();
}

export function handleScoreChange(color, scoreChange) {
    return function () {
        if (color === "red") {
            // ========================================
            // PERFORMANCE OPTIMIZATION: Use textContent instead of innerHTML (5-10x faster)
            // ========================================
            let text = dataDewan.redInput.textContent;
            if (!isEmpty(text)) {
                // ✅ Direct array operation, no unnecessary map()
                const values = text.split(",");
                values.push(`${scoreChange}`);
                dataDewan.redInput.textContent = values.join(",");
            } else {
                dataDewan.redInput.textContent = scoreChange;
            }
            pushScore(scoreChange, 0);
        } else if (color === "blue") {
            // ========================================
            // PERFORMANCE OPTIMIZATION: Use textContent, remove unnecessary reverses
            // ========================================
            let text = dataDewan.blueInput.textContent;
            if (!isEmpty(text)) {
                // ✅ Direct array operation, no reverse/push/reverse
                const values = text.split(",");
                values.push(`${scoreChange}`);
                dataDewan.blueInput.textContent = values.join(",");
            } else {
                dataDewan.blueInput.textContent = scoreChange;
            }
            pushScore(0, scoreChange);
        }
    };
}

// ========================================
// DROP (JATUHAN) FUNCTIONALITY
// ========================================
/**
 * Handle drop/knockdown button clicks
 * Manages drop counter with validation and broadcasting
 * @param {string} color - 'red' or 'blue'
 * @returns {Function} Event handler
 */
export function handleDropClick(color) {
    return function (increment = 1) {
        if (shouldLog('DEBUG')) console.log(`🔄 Drop button clicked for ${color}, increment: ${increment}`);

        // ========================================
        // CALCULATE SCORE VALUE FOR DISPLAY
        // ========================================
        // increment = 1 for "jatuhan +" (valid drop = +3 points)
        // increment = -1 for "jatuhan -" (invalid drop = -3 points)
        const scoreValue = DROP_SCORE_VALUE * increment;
        const displayScore = scoreValue > 0 ? `${scoreValue}` : `${scoreValue}`;  // Shows "3" or "-3"

        if (color === "red") {
            // Update counter
            redDropCount += increment;

            // Validate against maximum
            if (redDropCount < 0) redDropCount = 0;
            if (redDropCount > MAX_DROPS_PER_ROUND) {
                redDropCount = MAX_DROPS_PER_ROUND;
                if (shouldLog('WARN')) console.warn(`⚠️ Red team reached max drops (${MAX_DROPS_PER_ROUND})`);
            }

            // ========================================
            // UPDATE SCORE HISTORY DISPLAY (Like pukul/tendang)
            // ========================================
            let text = dataDewan.redInput.textContent;
            if (!isEmpty(text)) {
                const values = text.split(",");
                values.push(displayScore);  // ✅ Shows "3" or "-3"
                dataDewan.redInput.textContent = values.join(",");
            } else {
                dataDewan.redInput.textContent = displayScore;  // ✅ Shows "3" or "-3"
            }

            // Update UI display
            updateDropDisplay("red", redDropCount);

            // Broadcast update (with debounce via pushScore)
            pushScore(redDropCount > 0 ? DROP_SCORE_VALUE * increment : 0, 0);

        } else if (color === "blue") {
            // Update counter
            blueDropCount += increment;

            // Validate against maximum
            if (blueDropCount < 0) blueDropCount = 0;
            if (blueDropCount > MAX_DROPS_PER_ROUND) {
                blueDropCount = MAX_DROPS_PER_ROUND;
                if (shouldLog('WARN')) console.warn(`⚠️ Blue team reached max drops (${MAX_DROPS_PER_ROUND})`);
            }

            // ========================================
            // UPDATE SCORE HISTORY DISPLAY (Like pukul/tendang)
            // ========================================
            let text = dataDewan.blueInput.textContent;
            if (!isEmpty(text)) {
                const values = text.split(",");
                values.push(displayScore);  // ✅ Shows "3" or "-3"
                dataDewan.blueInput.textContent = values.join(",");
            } else {
                dataDewan.blueInput.textContent = displayScore;  // ✅ Shows "3" or "-3"
            }

            // Update UI display
            updateDropDisplay("blue", blueDropCount);

            // Broadcast update (with debounce via pushScore)
            pushScore(0, blueDropCount > 0 ? DROP_SCORE_VALUE * increment : 0);
        }
    };
}

/**
 * Update drop display in UI
 * Shows current drop count with visual feedback
 * @param {string} color - 'red' or 'blue'
 * @param {number} count - Current drop count
 */
export function updateDropDisplay(color, count) {
    const round = activeRound?.textContent || "round-1";
    const elementId = `${round}-dropping-${color}`;
    const element = document.getElementById(elementId);

    if (element) {
        // Update display with count
        element.textContent = count > 0 ? `${count}x Jatuhan` : "0";

        // Visual feedback: highlight if approaching max
        if (count >= MAX_DROPS_PER_ROUND) {
            element.classList.add("bg-redDefault", "animate-pulse");
            if (shouldLog('WARN')) console.warn(`🚨 ${color} team at maximum drops!`);
        } else if (count >= MAX_DROPS_PER_ROUND - 1) {
            element.classList.add("bg-yellowDefault");
        } else {
            element.classList.remove("bg-redDefault", "bg-yellowDefault", "animate-pulse");
        }
    } else {
        if (shouldLog('WARN')) console.warn(`⚠️ Drop display element not found: ${elementId}`);
    }
}

/**
 * Reset drop counters (call when starting new round)
 */
export function resetDropCounters() {
    redDropCount = 0;
    blueDropCount = 0;
    if (shouldLog('INFO')) console.log("✅ Drop counters reset for new round");

    // Clear display for all rounds
    rounds.forEach((round) => {
        const redElement = document.getElementById(`${round}-dropping-red`);
        const blueElement = document.getElementById(`${round}-dropping-blue`);

        if (redElement) {
            redElement.textContent = "0";
            redElement.classList.remove("bg-redDefault", "bg-yellowDefault", "animate-pulse");
        }
        if (blueElement) {
            blueElement.textContent = "0";
            blueElement.classList.remove("bg-redDefault", "bg-yellowDefault", "animate-pulse");
        }
    });
}

export function changeIndicatorPelanggaran(corner, penalty) {
    let nameElemenet = pelanggaranRedElement;
    let dataPelanggaran;
    let color = "bg-redDefault";
    if (corner !== "red") {
        nameElemenet = pelanggaranBlueElement;
        if (!pelanggaranBiru.includes(penalty)) {
            pelanggaranBiru.push(penalty);
        } else {
            pelanggaranBiru = pelanggaranBiru.filter(
                (item) => item !== penalty
            );
        }
        dataPelanggaran = pelanggaranBiru;
        color = "bg-blueDark";
    } else {
        if (!pelanggaranMerah.includes(penalty)) {
            pelanggaranMerah.push(penalty);
        } else {
            pelanggaranMerah = pelanggaranMerah.filter(
                (item) => item !== penalty
            );
        }
        dataPelanggaran = pelanggaranMerah;
    }
    pelanggaranMerah.sort(compare);
    pelanggaranBiru.sort(compare);
    const pelanggaranMerahValue = pelanggaranMerah[pelanggaranMerah.length - 1];
    const pelanggaranBiruValue = pelanggaranBiru[pelanggaranBiru.length - 1];
    if (pelanggaran.indexOf(pelanggaranBiruValue) > 3) {
        peringatanPenaltyBlue = true;
    }
    if (pelanggaran.indexOf(pelanggaranMerahValue) > 3) {
        peringatanPenaltyRed = true;
    }
    redPenalty = pelanggaranMerahValue;
    bluePenalty = pelanggaranBiruValue;
    pelanggaran.map((itemPelanggaran) => {
        if (dataPelanggaran.includes(itemPelanggaran)) {
            nameElemenet[itemPelanggaran].classList.remove("bg-grayDefault");
            nameElemenet[itemPelanggaran].classList.add(color);
        } else {
            nameElemenet[itemPelanggaran].classList.add("bg-grayDefault");
            nameElemenet[itemPelanggaran].classList.remove(color);
        }
    });
}

function compare(value1, value2) {
    const index1 = pelanggaran.indexOf(value1);
    const index2 = pelanggaran.indexOf(value2);

    if (index1 < index2) {
        return -1;
    } else if (index1 > index2) {
        return 1;
    } else {
        return 0;
    }
}

export function clearIndicator() {
    const namesElement = [pelanggaranRedElement, pelanggaranBlueElement];
    namesElement.map((nameElemenet) => {
        pelanggaran.map((itemPelanggaran) => {
            nameElemenet[itemPelanggaran].classList.add("bg-grayDefault");
            nameElemenet[itemPelanggaran].classList.remove(
                "bg-redDefault",
                "bg-blueDark"
            );
        });
    });
}
