const login = document.getElementById("log")
const pass = document.getElementById("pass")
const sign = document.getElementById("in")
const inputDiv = document.querySelector(".inputs")

let accounts = JSON.parse(localStorage.getItem("accounts"))
localStorage.removeItem("logged")
let logged = false
let lastUser = []
sign.addEventListener("click", () => {
    login.value = login.value.trim()
    pass.value = pass.value.trim()
    console.log(login.value);
    console.log(pass.value);
    if (login == "" || pass == "") {
        let errorMsg = document.createElement("p")
        errorMsg.textContent = "Введи все нормально"
        errorMsg.style.color = "red"
        errorMsg.classList.add("error_msg")
        inputDiv.append(errorMsg)
    }

    if (accounts != null) {
        let found = false
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].login == login.value && accounts[i].pass == pass.value) {
                found = true
                lastUser.push(accounts[i].id)
                lastUser.push(login.value)
                
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
            localStorage.setItem("lastUserLogged", JSON.stringify(lastUser))
            window.location.href = "index.html"
        }
    } 
    else {
        let excitingErrorMsg = document.querySelector(".error_msg")
        if (excitingErrorMsg == null) {
            let errorMsg = document.createElement("p")
            errorMsg.textContent = "Создай акк сначало"
            errorMsg.style.color = "red"
            errorMsg.classList.add("error_msg")
            inputDiv.append(errorMsg)
        }
        else{
            excitingErrorMsg.remove()
            let errorMsg = document.createElement("p")
            errorMsg.textContent = "Создай акк сначало"
            errorMsg.style.color = "red"
            errorMsg.classList.add("error_msg")
            inputDiv.append(errorMsg)
        }
    }
})