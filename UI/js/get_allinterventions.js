let auth = localStorage.getItem("token")
console.log(auth)
redflags();
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
                        <td><input type="submit" name="btn-edit" id="edit-btn" class="btn" value="edit status"/></td>
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
            }

        });


}

