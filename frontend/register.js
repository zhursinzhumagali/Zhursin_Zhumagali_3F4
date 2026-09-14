const registerForm = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const hide = document.getElementById("hide");

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (
        nameInput.value.trim() === "" ||
        emailInput.value.trim() === "" ||
        passwordInput.value.trim() === ""
    ) {
        alert("Заполните все поля");
        return;
    }
    const user = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value
    };

    const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    alert(data.message);
    registerForm.reset();
});

hide.addEventListener("click", function () {
    if (hide.src.includes("hide")) {
        hide.src = "./images/free-icon-eye.png";
        passwordInput.type = "text";
    } else {
        hide.src = "./images/free-icon-hide.png";
        passwordInput.type = "password";
    }
});