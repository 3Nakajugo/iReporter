// creates account for users
document.getElementById('error').style.display = 'none'
document.getElementById('message').style.display = 'none'
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
        fetch('https://appireporter2.herokuapp.com/api/v2/auth/signup', {
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
                    document.getElementById('error').style.display = 'block';
                    document.getElementById('error').innerHTML = `${response.message}`;
                    setTimeout(() => {
                        document.getElementById('error').innerHTML = "";
                    }, 3000);
                }
                else if (response.status === 201) {
                    document.getElementById('message').style.display = 'block';
                    document.getElementById('message').innerHTML = 'User has been created'

                    setTimeout(() => {
                        window.location.href = 'login.html';;
                    }, 1000);
                    
                }
            })
            .catch(error => console.log(error));
    }
}
