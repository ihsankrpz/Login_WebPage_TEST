// base uri API
const URI = "https://node-expess.martinpedraza.repl.co/api/secret"

const checkUser = async () => {
	const token = localStorage.getItem("token")
	if (token) {
		try {
			const res = await fetch(URI, {
				headers: { Authorization: `Bearer ${token}` },
			})
			/* user logged in */
			/*  successful login  */
			if (res.ok) {
				document.querySelector(".login-section").innerHTML = `
                    <div class="dropdown text-end">
                        <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
                        </a>
                        <ul class="dropdown-menu text-small">
                            <li><button class="dropdown-item" href="#">Profile</button></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><button class="dropdown-item signOut" href="#">Sign out</button></li>
                        </ul>
                    </div>
                `

				document.querySelector(".nav").innerHTML += `
					<li>
						<a href="./scores.html" class="nav-link px-2 link-light">Scoress</a>
					</li>
				`
				const data = await res.json()
				console.log(data.scores)
				localStorage.setItem("scores", JSON.stringify(data.scores))

				const signOutBtn = document.querySelector(".signOut")
				signOutBtn.addEventListener("click", () => {
					logUserOut()
					window.location = "./"
				})
			} else {
				document.querySelector(".login-section").innerHTML = `
                    <a href="./logIn.html" class="btn btn-outline-primary me-2">
						Login
					</a>
					<a href="./signUp.html" class="btn btn-primary">Sign-up</a>
                `
				logUserOut()
			}
			console.log(res)
		} catch (err) {
			return err
		}
	} else {
		logUserOut()
	}
}

const logUserOut = () => {
	localStorage.clear()
	if (window.location.pathname === "/scores.html") {
		window.location = "./"
	}
}

checkUser()
