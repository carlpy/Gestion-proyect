const profile = JSON.parse(localStorage.getItem("currentProfile"));

document.querySelectorAll(".username")
    .forEach((span) => (span.textContent = profile.name + ' ' + '(' + profile.role + ')'));
