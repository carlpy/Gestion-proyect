const profileInfo = JSON.parse(localStorage.getItem("currentProfile"));
const signOutBtn = document.querySelector("#sign-out");

window.addEventListener("DOMContentLoaded", () => {
    if (profileInfo == null) { 
		window.location.href = "../error-log-out.html";
    }
});

signOutBtn.addEventListener("click", () => {
    localStorage.setItem("currentProfile", null);
});

document.querySelector("h1 span").textContent += profileInfo.name;
