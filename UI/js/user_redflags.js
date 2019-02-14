let auth = localStorage.getItem("token")
console.log(auth)
redflags();// function call
function redflags() {
    fetch('http://127.0.0.1:5000/api/v2/redflags', {
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
                if (response["message"] === "all Redflags") {
                    let data = response["data"]
                    console.log(data);
                    response["data"].forEach(redflag => {
                        document.getElementById('tabledata').innerHTML += `<tr>
                            <td>${redflag.date}</td>
                            <td>${redflag.status}</td>
                            <td>${redflag.comment}</td>
                            <td>
                            <input type="submit" name="btn-edit" id="edit-btn" onclick="view(${redflag.incident_id})" class="btn" value="view"/>
                            <input type="submit" name="btn-edit" id="edit-btn" onclick="edit(${redflag.incident_id})" class="btn" value="edit"/>
                            <input type="submit"  id="delete-btn" onclick="deleteRedflag(${redflag.incident_id})" class="btn" value="delete"/>
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
    let url = `http://127.0.0.1:5000/api/v2/redflags/${incident_id}`;
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
                    <p>Id: ${response['data'].incident_id}</p>
                    <p>comment: ${response['data'].comment}</p>
                    <p>created By: ${response['data'].createdby}</p>
                    <p>Date: ${response['data'].date}</p>
                    <p>file: ${response['data'].file}</p>
                    <p>Type: ${response['data'].incident_type}</p>
                    <p>location: ${response['data'].location}</p>
                    <p>status: ${response['data'].status}</p>
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

function deleteRedflag(incident_id) {
    console.log(incident_id);
    let url = `http://127.0.0.1:5000/api/v2/redflags/${incident_id}`;
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
                window.location.reload('../templates/redflag.html')
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


