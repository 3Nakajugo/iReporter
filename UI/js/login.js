function login() {
    let user_credentials = {
        user_name: document.getElementById("username").value,
        password: document.getElementById("password").value
    }

    console.log(user_credentials);

    fetch('https://appireporter2.herokuapp.com/api/v2/auth/login', {
        method: 'POST',
        body: JSON.stringify(user_credentials),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response.status)
            if (response.status === 200) {
                document.getElementById('error').style.display = 'none';
                console.log(response.token)
                localStorage.setItem("token", response.token);
                if (document.getElementById("username").value === "admin") {
                    document.getElementById('message').innerHTML = `${response.message}`
                    window.location.href = 'admin.html';
                }
                else {
                    document.getElementById('message').innerHTML = `${response.message}`
                    window.location.href = "profile.html"
                }


            }
            else if (response.status === 400) {
                document.getElementById('error').innerHTML = `${response.message}`
            }
            else if (response.status === 401) {
                document.getElementById('error').innerHTML = `${response.message}`
            }

        })
        .catch(error => console.log(error));

}

