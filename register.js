const registerForm = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const hide = document.getElementById("hide");
registerForm.addEventListener("submit", function () {
    if (
        nameInput.value.trim() === "" ||
        emailInput.value.trim() === "" ||
        passwordInput.value.trim() === ""
    ) {
        alert("Заполните все поля");
        return;
    }
    const user = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
})

hide.addEventListener("click", function () {
    if (hide.src.includes("hide")) {
        hide.src = "./images/free-icon-eye.png";
        passwordInput.type = 'text';
    } else {
        hide.src = "./images/free-icon-hide.png";
        passwordInput.type = 'password'
    }

})