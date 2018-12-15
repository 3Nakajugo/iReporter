function validate() {
    var Username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "admin" && password == "admin") {
        window.location.href = "admin.html";
    }
    else if (username == "user" && password == "user") {
        window.location.href = "profile.html";
    }

}