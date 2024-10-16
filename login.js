const login = document.getElementById("log")
const pass = document.getElementById("pass")
const sign = document.getElementById("in")

let accounts = JSON.parse(localStorage.getItem("accounts"))
let logged = false

sign.addEventListener("click", () => {
    login.value = login.value.trim()
    pass.value = pass.value.trim()

    if (login == "" || pass == "") {
        alert("Введи все нормально")
    }

    if (accounts.length > 0) {
        let found = false
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].login == login.value && accounts[i].pass == pass.value) {
                found = true
                break
            }
        }
        if (!found) {
            alert("Корявый пароль или логин")
        }
        else{
            logged = true
            localStorage.setItem("logged", logged)

            window.location.href = "index.html"
        }
    } 
    else {
        alert("Создай акк сначало")
    }
})