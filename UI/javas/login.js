function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(username);
    console.log(password);
    if (username == "admin" && password == "admin") {
        window.location.href = "admin.html";
    }
    else if (username == "user" && password == "user") {
        window.location.href = "profile.html";
    }
}