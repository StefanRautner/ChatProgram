function changeToRegister() {
    document.getElementById("registerLink").addEventListener("click", function() {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("registerForm").style.display = "block";
    });
}

function changeToLogin() {
    document.getElementById("loginLink").addEventListener("click", function() {
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
    });
}