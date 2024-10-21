const login = document.getElementById("log")
const pass = document.getElementById("pass")
const sign = document.getElementById("in")
const inputDiv = document.querySelector(".inputs")

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
        let excitingErrorMsg = document.querySelector(".error_msg")
        if (!found) {
            if (excitingErrorMsg == null) {
                let errorMsg = document.createElement("p")
                errorMsg.textContent = "Uncorrect login or password. Please, try again"
                errorMsg.style.color = "red"
                errorMsg.classList.add("error_msg")
                inputDiv.append(errorMsg)
            }
            else{
                excitingErrorMsg.remove()
                let errorMsg = document.createElement("p")
                errorMsg.textContent = "Uncorrect login or password. Please, try again"
                errorMsg.style.color = "red"
                errorMsg.classList.add("error_msg")
                inputDiv.append(errorMsg)
            }
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