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
                        document.getElementById('tabledata').innerHTML += ` <tr>
                        <td>${redflag.incident_id}</td>
                        <td>${redflag.incident_type}</td>
                        <td>${redflag.date}</td>
                        <td>${redflag.createdby}</td>
                        <td>${redflag.location}</td>
                        <td>${redflag.status}</td>
                        <td>${redflag.file}</td>
                        <td>${redflag.comment}</td>
                        <td><input type="submit" name="btn-edit" id="edit-btn" onclick="edit(${redflag.incident_id})" class="btn" value="edit status"/></td> 
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

        });


}

function edit(incident_id) {
    console.log(incident_id);
    let modal = document.getElementById('myModal');
    let btn = document.getElementById("edit-btn");
    btn.onclick = function () {
        modal.style.display = "block";
    }


}
