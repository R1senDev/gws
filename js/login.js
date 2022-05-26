let backgroundShift = {
        x: 0,
        y: 0,

        // It makes the background "ehat". Like your "kukuha".
        playing: false,
        playPause: function() {
                if (playing) {
                        backgroundShift.pause();
                } else {
                        backgroundShift.play();
                }
                backgroundShift.playing = !backgroundShift.playing
        },
        engine: setInterval(function() {
                if (backgroundShift.playing) {
                        backgroundShift.x += 0.25;
                        backgroundShift.y -= 0.125;
                        document.body.style.backgroundPosition = `${backgroundShift.x}px ${backgroundShift.y}px`;
                }
        }, 30),
        pause: function() {
                backgroundShift.playing = false;
        },
        play: function() {
		backgroundShift.playing = true;
	}
};
