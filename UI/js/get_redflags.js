auth = localStorage.getItem("token")
console.log(auth)
redflags();
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
            var response_data = response;
            console.log(response_data)
            if (response_data.status === 200) {
                var data = response_data["data"]
                console.log(data);
                response_data["data"].forEach(redflag => {
                    document.getElementById('tabledata').innerHTML += ` <tr>
                    <td>${redflag.incident_id}</td>
                    <td>${redflag.incident_type}</td>
                    <td>${redflag.date}</td>
                    <td>${redflag.createdby}</td>
                    <td>${redflag.location}</td>
                    <td>${redflag.status}</td>
                    <td>${redflag.file}</td>
                    <td>${redflag.comment}</td>
                    </tr>
                    `
                });
            }
            else if (response_data.status === 401) {
                document.getElementById('Red-Flags').innerHTML = `${response_data.message}`
            }

        });


}

