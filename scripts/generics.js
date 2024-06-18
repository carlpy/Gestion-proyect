const profile = JSON.parse(localStorage.getItem("currentProfile"));
const profileInfo = JSON.parse(localStorage.getItem("currentProfile"));
const signOutBtn = document.querySelector("#sign-out");
const userDisplay = document.querySelectorAll(".username")

window.addEventListener("DOMContentLoaded", () => {
	if (profileInfo == null) { 
		window.location.href = "../error-log-out.html";
	}
});

userDisplay.forEach((span) => {
	span.textContent = profile.name + ' ' + '(' + profile.role + ')'
});

signOutBtn.addEventListener("click", () => {
	alert('Sesion finalizada, de regreso al login')
	window.location.href = "../index.html"
    localStorage.setItem("currentProfile", null);
});