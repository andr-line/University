let first = 0;

// execute when window content has loaded (throws error otherwise)
window.addEventListener("load", function() {
	checkDarkMode();
	
	// Change android color on click or keypress
	window.onkeypress = androidColor();
	window.onclick = androidColor();
});

// change androids color
function androidColor() {
	// first two executions are when loading window
	if(first>1){
		document.getElementById("green").setAttribute("fill", randomColor());
		document.getElementById("pink").setAttribute("fill", randomColor())
	} else {
		first++
	}
};

// Returns a random color
function randomColor() {
	return '#' + (0x1000000 + Math.floor(Math.random() * 0x1000000)).toString(16).substr(1)
};