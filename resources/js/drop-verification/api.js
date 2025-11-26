import { state } from "./state.js";
import { showErrorMessage } from "./dom.js";

export async function sendVerification(voteData) {
    try {
        const response = await axios.post("/drop-verification", {
            message: {
                juriPertama: voteData.juriPertama || state.juriPertama,
                juriKedua: voteData.juriKedua || state.juriKedua,
                juriKetiga: voteData.juriKetiga || state.juriKetiga,
                redPopup: voteData.redPopup ?? state.redPopup,
                bluePopup: voteData.bluePopup ?? state.bluePopup,
            },
        });

        return response;
    } catch (error) {
        console.error("[DropVerification] Failed to send verification:", error);
        showErrorMessage("Failed to send verification vote");
        throw error;
    }
}
