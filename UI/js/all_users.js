let auth = localStorage.getItem("token")
console.log(auth)
users();
function users() {
    fetch('http://127.0.0.1:5000/api/v2/users', {
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
                if (response["message"] === "all users") {
                    let data = response["data"]
                    console.log(data);
                    response["data"].forEach(user => {
                        document.getElementById('tabledata').innerHTML += ` <tr>
                        <td>${user.user_name}</td>
                        <td>${user.registered}</td>
                        <td>${user.isadmin}</td>
                        </tr>
                        `
                    });

                }
                else {
                    document.getElementById('user-table').innerHTML = `${response.message}`
                }

            }
            else if (response.status === 401) {
                document.getElementById('user-table').innerHTML = `${response.message}`
                window.location.href = 'login.html';
            }

        })
        .catch(error => console.log(error));


}
