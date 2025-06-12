/**
 * `videoEvents` stores the log of video controlling event
 */
const videoEvents = [];

/**
 * The `onYoutubeIframeAPIReady` function initialize the YT video embedded in the UI
 */
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "360",
        width: "640",
        videoId: "iPzmBKQVcjo",
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

/** When the Video is loaded, this function is executed
 */
function onPlayerReady(_event) {
    // event.target.playVideo();
}

/** When the state of video playing is changed, this function is executed
 */
function onPlayerStateChange(event) {
    switch (event.data) {
        case YT.PlayerState.PLAYING:
            videoEvents.push({
                type: "play",
                time: performance.now(),
            });
            break;
        case YT.PlayerState.PAUSED:
            videoEvents.push({
                type: "pause",
                time: performance.now(),
            });
            break;
    }
}

