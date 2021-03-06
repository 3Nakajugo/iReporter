let auth = localStorage.getItem("token")
console.log(auth)
redflags();
function redflags() {
    fetch('https://appireporter2.herokuapp.com/api/v2/interventions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`
        }
    })
        .then((response) => response.json())
        .then((response) => {
            // let response_data = response;
            console.log(response)
            if (response.status === 200) {
                if (response["message"] === "all interventions") {
                    let data = response["data"]
                    console.log(data);
                    response["data"].forEach(redflag => {
                        document.getElementById('tabledata').innerHTML += ` <tr>
                        <td>${redflag.incident_id}</td>
                        <td>${redflag.incident_type}</td>
                        <td>${redflag.date}</td>
                        <td>${redflag.createdby}</td>
                        <td>${redflag.location}</td>
                        <td>${redflag.status}</td>
                        <td>${redflag.file}</td>
                        <td>${redflag.comment}</td>
                        <td><input type="submit" id="edit-btn" onclick="edit(${redflag.incident_id})" class="btn" value="edit status"/></td>
                        </tr>
                        `
                    });

                }
                else {
                    document.getElementById('Red-Flags').innerHTML = `${response.message}`
                }

            }
            else if (response.status === 401) {
                document.getElementById('Red-Flags').innerHTML = `${response.message}`
                window.location.href = 'login.html';
            }

        })
        .catch(error => console.log(error));


}

function edit(incident_id) {
    console.log(incident_id);
    let modal = document.getElementById('myModal');
    let btn = document.getElementById("edit-btn");
    let close = document.getElementsByClassName("close")[0];
    let url = `https://appireporter2.herokuapp.com/api/v2/interventions/${incident_id}/status`;
    modal.style.display = "block";

    document.getElementById('status-form').addEventListener('submit', change)
    function change(e) {
        e.preventDefault();
        let new_status = document.getElementById('select').value;
        let status = {
            status: new_status
        }
        fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(status),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth}`
            }
        })
            .then((response) => response.json())
            .then(response => {
                if (response.status === 200) {
                    document.getElementById('error').style.display = 'none'
                    modal.style.display = "none";
                    window.location.reload('../templates/all_interventions.html')
                }
                else if (response.status === 400) {
                    document.getElementById('error').innerHTML = `${response.message}`
                }
                else if (response.status === 401) {
                    document.getElementsByClassName('error').innerHTML = `${response.message}`

                }

            })
    }
    close.onclick = function () {
        modal.style.display = "none";
    }


}

