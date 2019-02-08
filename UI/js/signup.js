function signup() {
    let user = {
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
                console.log(response)
                if (response.status === 400) {
                    document.getElementById('error').innerHTML = `${response.message}`
                }
                else if (response.status === 201) {
                    document.getElementById('error').style.display = 'none';
                    window.alert('user was created');
                    window.location.href = 'login.html';
                }
            })
        .catch (error => console.log(error));
    }
}
