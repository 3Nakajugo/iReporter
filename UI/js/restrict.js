function checkIfUserIsLoggedIn() {
    if (localStorage.getItem("token") == "") {
        login();
    }
}