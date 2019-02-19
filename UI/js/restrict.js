
function LoggedIn() {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") == null) {
        window.location.href = 'login.html';
        window.alert('Please logIn')

    }
}