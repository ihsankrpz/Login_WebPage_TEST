// base uri API
const BASE_URI = "https://node-expess.martinpedraza.repl.co/"
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

const cameraBtn = document.querySelector(".camera-edit")
/*  modal parts */
const modalTitle = document.querySelector(".modal-title")
const modalBody = document.querySelector(".modal-body")
const modalFooter = document.querySelector(".modal-footer")

const newUserForm = document.getElementById("newUserForm")

/* edit image modal / form  */
cameraBtn.addEventListener("click", () => {
	modalTitle.textContent = "Change Image URL"
	modalBody.innerHTML = `
    
    
        
        <form id="imgPreviewForm">
            <div class="form-floating mb-3">
                <img src="../img/user-default-avatar.png" alt="avatar img preview" class="m-auto d-block preview" >
            </div>
            <div class="form-floating mb-3">
                    <input
                        type="text"
                        class="form-control"
                        id="imagePreview"
                        placeholder="image URL"
                        autocomplete="off"
                    />
                    <label for="imagePreview">Image URL</label>
            </div>
            <div class="form-floating mb-3">
                <button type="submit" class="btn btn-primary float-end">Save changes</button>
            </div>
        </form>
    `

	modalFooter.innerHTML = `
            <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
            >
                Close
            </button>
            
    `
	// form input change
	const imagePreviewInput = document.getElementById("imagePreview")
	const imagePreview = document.querySelector(".preview")

	imagePreviewInput.addEventListener("input", () => {
		if (imagePreviewInput.value != "") {
			imagePreview.src = imagePreviewInput.value
			return
		}

		imagePreview.src = "../img/user-default-avatar.png"
	})

	// form submit
	const imgPreviewForm = document.getElementById("imgPreviewForm")
	imgPreviewForm.addEventListener("submit", (e) => {
		const myModalEl = document.querySelector("#formModal")
		const modal = bootstrap.Modal.getInstance(myModalEl)
		console.log(modal)
		e.preventDefault()
		if (imagePreviewInput.value != "") {
			document.querySelector(".avatar-img").src = imagePreviewInput.value
			newUserForm.imageUrl.value = imagePreviewInput.value
		} else {
			document.querySelector(".avatar-img").src =
				"../img/user-default-avatar.png"
		}
		modal.hide()
	})
})

/* newUserForm  submit */
newUserForm.addEventListener("submit", (e) => {
	e.preventDefault()
	const formData = {
		email: newUserForm.email.value,
		userName: newUserForm.userName.value,
		userPassword: newUserForm.floatingPassword.value,
		confirmUserPassword: newUserForm.confirmFloatingPassword.value,
		imageUrl: newUserForm.imageUrl.value,
		birthDate: newUserForm.birthDate.value,
	}
	/* check passwords */
	if (formData.confirmUserPassword != formData.userPassword) {
		document.querySelector(".invalid-feedback").style.display = "block"
		document.querySelector(".invalid-feedback").textContent =
			"Wrong passwords !!"
		return
	}
	const myModalEl = document.querySelector("#formModal")
	const modal = bootstrap.Modal.getInstance(myModalEl)
	modal.show()
	modalTitle.textContent = "Confirmation Message"
	modalBody.innerHTML = "<h3>User created !</h3>"
	modalFooter.innerHTML = `
            <button
                type="button"
                class="btn btn-secondary finished-form"
                data-bs-dismiss="modal"
            >
                Close
            </button>
            
    `
	/* all good and successful */
	document.querySelector(".finished-form").addEventListener("click", () => {
		window.location = "/"
	})
	document.querySelector(".modal").addEventListener("click", () => {
		window.location = "/"
	})
})
