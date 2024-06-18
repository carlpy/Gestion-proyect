const apiKey = "ksbmrt9utNZi2BWssHhLbmkTqZtLfgMZn8k2ET8Uy@Y947xjJYQefNWxxjRVIcGh";
const url = `https://sheet.best/api/sheets/03c6e9d9-8a82-48c4-b569-cf1725d290b6`;

const mainForm = document.querySelector("#login");
const inputs = document.querySelectorAll("input");

mainForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = e.target.querySelector("#user").value.trim();
    const userPassword = e.target.querySelector("#password").value.trim();
    const userRole = e.target.querySelector("#roles").value;

    if (userName !== "" && userPassword !== "") {
        checkLogin(userName, userPassword, userRole);
    } else {
        alert("Uno o mas campos estan vacios");
    }
});

async function checkLogin(nameF, passwordF, roleF) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + apiKey,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        data.forEach((userItem) => {
            const { name, password, role } = userItem;

            if (nameF === name && passwordF === password && roleF === role) {
                alert("Login exitoso");
                inputs.forEach((inp) => (inp.value = ""));

                localStorage.setItem(
                    "currentProfile",
                    JSON.stringify({
                        name: nameF,
                        role: roleF,
                        isLoggedIn: true,
                    })
                );

                window.location.href = redirectToProperPage(roleF);
            }
        });
    } catch (error) {
        console.error("Error fetching data from Sheet.best:", error);
    }
}

function redirectToProperPage(givenRole) {
    const roles = {
        estudiante: "./views/estudiante-screen.html",
        administrador: "./views/admin-screen.html",
        "personal-bienestar": "./views/bienestar-screen.html",
    };
    return roles[givenRole];
}
