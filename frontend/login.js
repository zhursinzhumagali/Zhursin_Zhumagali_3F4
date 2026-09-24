const loginForm = document.getElementById("loginForm");
const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("password");
const hide = document.getElementById("hide");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (
        nameInput.value.trim() === "" ||
        passwordInput.value.trim() === ""
    ) {
        alert("Заполните все поля");
        return;
    }
    const user = {
        username: nameInput.value.trim(),
        password: passwordInput.value
    };
    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    alert(data.message);
    if (response.ok) {
        loginForm.reset();
    }
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