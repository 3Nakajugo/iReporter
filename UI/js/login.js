document.getElementById('error').style.display = 'none'
document.getElementById('message').style.display = 'none'
function login() {
    let user_credentials = {
        user_name: document.getElementById("username").value,
        password: document.getElementById("password").value
    }

    fetch('https://appireporter2.herokuapp.com/api/v2/auth/login', {
        method: 'POST',
        body: JSON.stringify(user_credentials),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.status === 200) {
                localStorage.setItem("token", response.token);
                if (document.getElementById("username").value === "admin") {
                    document.getElementById('message').style.display = 'block';
                    document.getElementById('message').innerHTML = `${response.message}`
                    setTimeout(() => {
                        window.location.href = 'admin.html';
                    }, 1000);
                    
                }
                else {
                    document.getElementById('message').style.display = 'block';
                    document.getElementById('message').innerHTML = `${response.message}`;
                    setTimeout(() => {
                        window.location.href = "profile.html";
                    }, 1000);
                }
            }
            else if (response.status === 400) {
                document.getElementById('error').style.display = 'block';
                document.getElementById('error').innerHTML = `${response.message}`
                setTimeout(() => {
                    document.getElementById('error').innerHTML = "";
                }, 3000);
            }
            else if (response.status === 401) {
                document.getElementById('error').style.display = 'block';
                document.getElementById('error').innerHTML = `${response.message}`
                setTimeout(() => {
                    document.getElementById('error').innerHTML = "";
                }, 3000);
            }

        })
        .catch(error => console.log(error));

}

