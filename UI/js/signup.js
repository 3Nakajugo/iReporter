function signup() {
    var user = {
        first_name: document.getElementById("firstname").value,
        last_name: document.getElementById("lastname").value,
        telephone: document.getElementById("telephone").value,
        user_name: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    if (document.getElementById('confirmpass').value !== document.getElementById('password').value) {
        document.getElementById('error').innerHTML = 'password does not match'
    }
    else {
        console.log(user)
        fetch('http://127.0.0.1:5000/api/v2/auth/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((response) => {
                var response_data = response;
                console.log(response_data)
                if (response_data.status === 400) {
                    document.getElementById('error').innerHTML = `${response_data.message}`
                }
                else if (response_data.status === 201) {
                    document.getElementById('error').style.display = 'none';
                    window.alert('user was created');
                    window.location.href = 'login.html';
                }
            })
        .catch (error => console.log(error));
    }
}
