function login() {
    let user_credentials = {
        user_name: document.getElementById("username").value,
        password: document.getElementById("password").value
    }

    console.log(user_credentials);

    fetch('http://127.0.0.1:5000/api/v2/auth/login', {
        method: 'POST',
        body: JSON.stringify(user_credentials),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response.status)
            let response_data = response;
            if (response_data.status === 200) {
                document.getElementById('error').style.display = 'none';
                window.alert('succesfully logged in');
                console.log(response_data.token)
                localStorage.setItem("token", response_data.token);
                if (document.getElementById("username").value === "admin") {
                    document.getElementById('error').style.display = 'none';
                    window.location.href = 'admin.html';
                }
                else {
                    window.location.href = "profile.html"
                }


            }
            else if (response.status === 400) {
                document.getElementById('error').innerHTML = `${response_data.message}`
            }
            else if (response.status === 401) {
                document.getElementById('error').innerHTML = `${response_data.message}`
            }

        });

}

