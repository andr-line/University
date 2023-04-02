// Dark Mode

// Listener for browsers dark mode setting
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
	checkDarkMode()
});

// Run setup when loading website
window.onload = checkDarkMode();

// Switch to dark or light mode by adding the .darkmode class to all objects
function checkDarkMode() {
	let elements = document.querySelectorAll("*")
	if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
		Array.prototype.forEach.call(elements, (elem) => {
			elem.classList.add("darkmode")
		})
		// foreach does not work since documents.querySelectorAll does not return an Array but a HTMLCollection
	} else {
		Array.prototype.forEach.call(elements, (elem) => {
			elem.classList.remove("darkmode")
		})
	}
};


// Navigation (iframe)

function changePage(index) {
	const pageArray = ["index.html", "../page1/page1.html", "../page2/page2.html", "../page3/page3.html", "../page4/page4.html", "../page5/page5.html", "../page6/page6.html"]
	
	// Change the content of the page to the clicked value
	document.getElementById("contentBox").src = pageArray[index];
	//resizeIframe(document.getElementById("contentBox"));
	
	// Change the current active button to the new one
	let buttons = document.querySelectorAll(".navbarbutton");
	Array.prototype.forEach.call(buttons, function (button) {
		button.classList.remove("active")
	})
	buttons.item(index-1).classList.add("active")
};