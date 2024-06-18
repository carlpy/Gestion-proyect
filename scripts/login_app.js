const mainForm = document.querySelector("#login");
const inputs = document.querySelectorAll('input');

mainForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const userName = e.target.querySelector("#user").value.trim();
	const userPassword = e.target.querySelector("#password").value.trim();
	const userRole = e.target.querySelector("#roles").value;
	
	if(userName !== '' && userPassword !== '') {
		checkLogin(userName, userPassword, userRole);
	} else {
		alert("Uno o mas campos estan vacios")
	}
});

async function checkLogin(nameF, passwordF, roleF) {
    fetch("./db.json")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((userItem) => {
                const { name, password, role } = userItem;

                if (nameF === name && passwordF === password && roleF === role) {
                    alert("Login exitoso");
					inputs.forEach(inp => inp.value = '')
					
                    localStorage.setItem(
                        "currentProfile",
                        JSON.stringify({
                            name: nameF,
                            role: roleF,
							isLoggedIn: true
                        })
                    );

                    window.location.href = redirectToProperPage(roleF);
                }
            });
        });
}

function redirectToProperPage(givenRole) {
	const roles = {
		'estudiante': './views/estudiante-screen.html',
		'administrador': './views/admin-screen.html',
		'personal-bienestar': './views/bienestar-screen.html',
	}
	return roles[givenRole];
}