function login() {
    var user_credentials = {
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
            var response_data = response;
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

// function redflags() {
//     token = getCookie('token')
//     console.log(token)
//     fetch('http://127.0.0.1:5000/api/v2/redflags', {
//         method: 'POST',
//         body: JSON.stringify(user_credentials),
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }
//     })
//         .then((response) => response.json())
//         .then((response) => {
//             var response_data = response;
//             console.log(response_data)
//             if (response_data.status === 200) {

//             }

//         });


// }


// function setCookie(token, cvalue, exdays) {
//     var date = new Date();
//     date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     var expires = "expires=" + date.toUTCString();
//     document.cookie = token + "=" + cvalue + ";" + expires + ";path=/";
// }
// function getCookie(token) {
//     var name = token + "=";
//     var ca = document.cookie.split(';');
//     // console.log(ca)
//     for (var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }
