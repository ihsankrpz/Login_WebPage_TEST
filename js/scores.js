const scores = JSON.parse(localStorage.getItem("scores"))

if (!scores) {
	console.log("error")
} else {
    const scoresArray = Object.entries(scores)
    document.querySelector("tbody").innerHTML += `
        <tr>
            <th scope="row">1</th>
            <td>${scoresArray[0][0]}</td>
            <td>${scoresArray[0][1]}</td>           
        </tr>
        <tr>
            <th scope="row">2</th>
            <td>${scoresArray[1][0]}</td>
            <td>${scoresArray[1][1]}</td>           
        </tr>
        <tr>
            <th scope="row">3</th>
            <td>${scoresArray[2][0]}</td>
            <td>${scoresArray[2][1]}</td>           
        </tr>
        <tr>
            <th scope="row">4</th>
            <td>${scoresArray[3][0]}</td>
            <td>${scoresArray[3][1]}</td>           
        </tr>
        `
	
}
