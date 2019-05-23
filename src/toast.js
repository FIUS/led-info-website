/**
 * 
 * Displays a message on the website
 * 
 */
function showToast(message) {
	document.getElementById("snackbar").innerHTML = message;
	var x = document.getElementById("snackbar");
	x.className = "show";
	setTimeout(function() {
		x.className = x.className.replace("show", "");
	}, 3000);
}