let auth = localStorage.getItem("token")
console.log(auth)
redflags();// function call
function redflags() {
    fetch('http://127.0.0.1:5000/api/v2/interventions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`
        }
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            if (response.status === 200) {
                if (response["message"] === "all interventions") {
                    let data = response["data"]
                    console.log(data);
                    response["data"].forEach(intervention => {
                        document.getElementById('tabledata').innerHTML += `<tr>
                            <td>${intervention.date}</td>
                            <td>${intervention.status}</td>
                            <td>${intervention.comment}</td>
                            <td>
                            <input type="submit" name="btn-edit" id="edit-btn" onclick="view(${intervention.incident_id})" class="btn" value="view"/>
                            <input type="submit" name="btn-edit" id="edit-btn" onclick="edit(${intervention.incident_id})" class="btn" value="edit"/>
                            <input type="submit"  id="delete-btn" onclick="deleteInt(${intervention.incident_id})" class="btn" value="delete"/>
                            </td>
                            </tr>
                            `
                    });

                }
                else {
                    document.getElementById('Red-Flags').innerHTML = `${response.message}`
                }

            }
            else if (response.status === 401) {
                document.getElementById('Red-Flags').innerHTML = `<p>${response.message}</p>`
            }

        })
        .catch(error => console.log(error));
}

function view(incident_id) {
    let modal = document.getElementById('myModal');
    let btn = document.getElementById("edit-btn");
    let close = document.getElementsByClassName("close")[0];
    let url = `http://127.0.0.1:5000/api/v2/interventions/${incident_id}`;
    console.log(url)

    modal.style.display = "block";
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`
        }
    })
        .then((response) => response.json())
        .then(response => {
            if (response.status === 200) {
                console.log(response)
                document.getElementById("results").innerHTML = `
                <form>
                    <p>Id: ${response['data'][0].incident_id}</p>
                    <p>comment: ${response['data'][0].comment}</p>
                    <p>created By: ${response['data'][0].createdby}</p>
                    <p>Date: ${response['data'][0].date}</p>
                    <p>file: ${response['data'][0].file}</p>
                    <p>Type: ${response['data'][0].incident_type}</p>
                    <p>location: ${response['data'][0].location}</p>
                    <p>status: ${response['data'][0].status}</p>
                </form>`
            }
            if (response.status === 404) {
                document.getElementById('results').innerHTML = `${response.message}`
            }
            else if (response.status === 401) {
                document.getElementById('results').innerHTML = `${response.message}`
            }
        })
        .catch((error) => console.log(error));
    close.onclick = function () {
        modal.style.display = "none";
    }
}

function deleteTnt(incident_id) {
    console.log(incident_id);
    let url = `http://127.0.0.1:5000/api/v2/interventions/${incident_id}`;
    console.log(url)
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`
        }
    })
        .then((response) => response.json())
        .then(response => {
            if (response.status === 200) {
                document.getElementById('message').innerHTML = 'record was deleted'
                window.location.reload('../templates/intervention.html')
            }
            else if (response.status === 404) {
                document.getElementById('message').innerHTML = `${response.message}`
            }
            else if (response.status === 401) {
                document.getElementById('message').innerHTML = `${response.message}`
            }

        })
        .catch((error) => console.log(error));
}


