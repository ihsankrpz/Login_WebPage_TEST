// base uri API
const URI = "https://node-expess.martinpedraza.repl.co/api/secret"
let userData = null

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
                            <img src="../img/user-default-avatar.png" alt="user avatar" width="32" height="32" class="rounded-circle user-avatar">
                        </a>
                        <ul class="dropdown-menu text-small">
                            <li><button class="dropdown-item"
									data-bs-toggle="modal"
									data-bs-target="#userModal"
									>Profile</button></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><button class="dropdown-item signOut" href="#">Sign out</button></li>
                        </ul>
                    </div>
                `

				document.querySelector(".nav").innerHTML += `
					<li>
						<a href="./scores.html" class="nav-link px-2 link-light">Scores</a>
					</li>
				`
				const data = await res.json()
				userData = data.user
				console.log(userData)
				localStorage.setItem("scores", JSON.stringify(data.scores))

				/*   MODAL TREATMENT  */
				document.getElementById("userModalLabel").textContent =
					userData.userName
				document.querySelector(".modal-body").innerHTML = `
				<img src="../img/user-default-avatar.png" alt="user name" class="img-fluid rounded mx-auto d-block user-avatar" style="max-width: 180px;" >
					<ul class="list-group">
						<li class="list-group-item"><span class="fw-bold">UserName: ${userData.userName}</span></li>
						<li class="list-group-item"><span class="fw-bold">Email: </span>${userData.email}</li>
						<li class="list-group-item"><span class="fw-bold">Date of Birth: </span>${userData.birthDate}</li>
					</ul>
				
				`

				/*  check if user has personalized image */
				if (userData.imageUrl != "") {
					document
						.querySelectorAll(".user-avatar")
						.forEach((img) => (img.src = userData.imageUrl))
				}

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
