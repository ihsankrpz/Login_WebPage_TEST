const scores = JSON.parse(localStorage.getItem("scores"))
const scoresArray = Object.entries(scores)

const writeRows = () => {
	return scoresArray
		.map((score, i) => {
			return `<tr>
                <th scope="row">${i + 1}</th>
                <td>${score[0]}</td>
                <td>${score[1]}</td>
                 
            </tr>`
		})
		.join(" ")
}

if (!scores) {
	console.log("error")
} else {
	document.querySelector("tbody").innerHTML += writeRows()
}
