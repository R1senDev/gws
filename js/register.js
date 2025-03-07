let mailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

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
function setMaxBirthday() {
	let today = new Date();
	let month;
	if (today.getMonth() + 1 < 10) {
		month = `0${today.getMonth() + 1}`;
	} else {
		month = today.getMonth() + 1;
	}
	let day;
	if (today.getDate() < 10) {
		day = `0${today.getDate()}`;
	} else {
		day = today.getDate();
	}
	document.getElementById('birthday').max = `${today.getFullYear()}-${month}-${day}`;
	console.log(`${today.getFullYear()}-${month}-${day}`);
}
setMaxBirthday();

setInterval(function() {
	document.getElementById('nickname').value = document.getElementById('nickname').value.toLowerCase();
	let verified = false;
	if ((document.getElementById('nickname').value.length >= 3) && (!document.getElementById('nickname').value.includes(' '))) {
		if ((document.getElementById('nickname').value.toLowerCase() == 'risenanderson') || (document.getElementById('nickname').value.toLowerCase() == 'lord_laminat')) {
			document.getElementById('nickname').style.borderColor = 'rgb(0, 0, 255)';
		} else {
			document.getElementById('nickname').style.borderColor = 'rgb(0, 255, 0)';
		}
		verified = true;
	} else {
		document.getElementById('nickname').style.borderColor = 'rgb(255, 0, 0)';
	}

	if (mailRegExp.test(document.getElementById('mail').value)) {
		document.getElementById('mail').style.borderColor = 'rgb(0, 255, 0)';
	} else {
		document.getElementById('mail').style.borderColor = 'rgb(255, 0, 0)';
		verified = false;
	}

	if (document.getElementById('password').value.length >= 6) {
		document.getElementById('password').style.borderColor = 'rgb(0, 255, 0)';
	} else {
		document.getElementById('password').style.borderColor = 'rgb(255, 0, 0)';
		verified = false;
	}

	if (document.getElementById('confirm-password').value == document.getElementById('password').value && document.getElementById('confirm-password').value.length >= 6) {
		document.getElementById('confirm-password').style.borderColor = 'rgb(0, 255, 0)';
	} else {
		document.getElementById('confirm-password').style.borderColor = 'rgb(255, 0, 0)';
		verified = false;
	}

	if (!document.getElementById('male').checked && !document.getElementById('female').checked && !document.getElementById('helicopter').checked) {
		verified = false;
	}

	if (document.getElementById('birthday').value != '') {
		document.getElementById('birthday').style.borderColor = 'rgb(0, 255, 0)';
	} else {
		document.getElementById('birthday').style.borderColor = 'rgb(255, 0, 0)';
		verified = false;
	}
	
	if (!document.getElementById('agree').checked) {
		verified = false;
	}

	document.getElementById('submit').disabled = !verified;
}, 20);

document.getElementById('login').addEventListener('keydown', function(event) {
	if(event.keyCode == 13) {
		event.preventDefault();
		return false;
	}
});
