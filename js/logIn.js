// base uri API
const BASE_URI = "https://node-expess.ihsankrpz.repl.co/"
fetch(BASE_URI)
	.then((res) => {
		res.json().then((data) => {
			console.log(data)
		})
	})
	.catch((err) => {
		alert("you are offline !")
		document.querySelector(".form-signin").innerHTML = `
        <h2 class='text-center'>Something went wrong connecting to the API ..</h2>
        <p>try again later</p>           
        `
	})

const logInForm = document.getElementById("logInForm")

logInForm.addEventListener("submit", async (e) => {
	const postUrl = BASE_URI + "api/login"

	e.preventDefault()
	console.log(logInForm.email.value, logInForm.password.value)
	const formData = {
		email: logInForm.email.value,
		password: logInForm.password.value,
	}
	try {
		const res = await fetch(postUrl, {
			method: "POST",
			mode: "cors",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		})
		if (res.status === 401) {
			throw new Error("Wrong pass or email")
		}
		/*  all good  */
		const data = await res.json()
		console.log(data)
		/* store token */
		localStorage.setItem("token", data.token)
		window.location = "./"
	} catch (err) {
		console.log(err)
		document.querySelector(".invalid-feedback").style.display = "block"
		document.querySelector(".invalid-feedback").innerHTML = err
	}
})
