require("./bootstrap");
/**
 * Join a WebSocket presence channel
 * @param {string} channel - Channel name
 * @param {number} roomId - Room/arena ID
 * @returns {Object} Echo channel instance
 */
export const joinChannel = (channel, roomId) => {
    try {
        if (!channel || typeof channel !== 'string') {
            console.warn('⚠️ Invalid channel name provided to joinChannel');
            return null;
        }
        if (!roomId || typeof roomId !== 'number') {
            console.warn('⚠️ Invalid roomId provided to joinChannel');
            return null;
        }
        return Echo.join(`presence.${channel}.${roomId}`);
    } catch (error) {
        console.error('❌ Error joining channel:', error);
        return null;
    }
};

// Backward compatibility alias for deprecated typo spelling
export const joinChanel = joinChannel;
