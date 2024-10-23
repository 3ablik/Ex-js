const login = document.getElementById("log")
const em = document.getElementById("em")
const pass = document.getElementById("pass")
const sign = document.getElementById("in")
const inputDiv = document.querySelector(".inputs")

let accounts
if (JSON.parse(localStorage.getItem("accounts")) == null) {
    accounts = []
}
else{
    accounts = JSON.parse(localStorage.getItem("accounts"))
}

class Person{
    constructor(login, em, pass){
        this.login = login
        this.em = em
        this.pass = pass
    }

    createPerson(){
        let newId = Math.floor(Math.random() * 100000000)
        if (JSON.parse(localStorage.getItem("accounts")) > 0) {
            let accs = JSON.parse(localStorage.getItem("accounts"))
            accs.forEach(element => {
                if(element.id == newId){
                    newId = Math.floor(Math.random() * 100000000)
                }
            });
        }
        let person ={
            id: newId,
            login: this.login,
            em: this.em,
            pass: this.pass,
        }
        accounts.push(person)
        localStorage.setItem("accounts", JSON.stringify(accounts))
    }
}

let stat = true


sign.addEventListener("click", ()=>{
    let newAcc = new Person(login.value, em.value, pass.value)
    login.value = login.value.trim()
    em.value = em.value.trim()
    pass.value = pass.value.trim()
    console.log(login.value);
    console.log(em.value);
    console.log(pass.value);
    let excitingErrorMsg = document.querySelector(".error_msg")
    if (login.value == "" || em.value == "" || pass.value == "") {
        console.log(excitingErrorMsg)
        if (excitingErrorMsg == null) {
            let errorMsg = document.createElement("p")
            errorMsg.textContent = "Incorrect input value. Please, input all data"
            errorMsg.style.color = "red"
            errorMsg.classList.add("error_msg")
            inputDiv.append(errorMsg)
        }
        else{
            excitingErrorMsg.remove()
            let errorMsg = document.createElement("p")
            errorMsg.textContent = "Incorrect input value. Please, input all data"
            errorMsg.style.color = "red"
            errorMsg.classList.add("error_msg")
            inputDiv.append(errorMsg)
        }
    }
    else if(pass.value.length < 8){
        if (excitingErrorMsg == null) {
            let errorMsg = document.createElement("p")
            errorMsg.textContent = "Password length must be more than 8 symbol"
            errorMsg.style.color = "red"
            errorMsg.classList.add("error_msg")
            inputDiv.append(errorMsg)
        }
        else{
            excitingErrorMsg.remove()
            let errorMsg = document.createElement("p")
            errorMsg.textContent = "Password length must be more than 8 symbol"
            errorMsg.style.color = "red"
            errorMsg.classList.add("error_msg")
            inputDiv.append(errorMsg)
        }
    }
    else{
        if (accounts.length != 0){
            for (let i = 0; i < accounts.length; i++) {
                if (accounts[i].login == login.value && accounts[i].em == em.value){
                    if (excitingErrorMsg == null) {
                        let errorMsg = document.createElement("p")
                        errorMsg.textContent = "No no no Mr.Fish. Change Login and Email"
                        errorMsg.style.color = "red"
                        errorMsg.classList.add("error_msg")
                        inputDiv.append(errorMsg)
                    }
                    else{
                        excitingErrorMsg.remove()
                        let errorMsg = document.createElement("p")
                        errorMsg.textContent = "No no no Mr.Fish. Change Login and Email"
                        errorMsg.style.color = "red"
                        errorMsg.classList.add("error_msg")
                        inputDiv.append(errorMsg)
                    }
                    stat = false
                    break
                }
                else if (accounts[i].login == login.value){
                    if (excitingErrorMsg == null) {
                        let errorMsg = document.createElement("p")
                        errorMsg.textContent = "No no no Mr.Fish. Change Login"
                        errorMsg.style.color = "red"
                        errorMsg.classList.add("error_msg")
                        inputDiv.append(errorMsg)
                    }
                    else{
                        excitingErrorMsg.remove()
                        let errorMsg = document.createElement("p")
                        errorMsg.textContent = "No no no Mr.Fish. Change Login"
                        errorMsg.style.color = "red"
                        errorMsg.classList.add("error_msg")
                        inputDiv.append(errorMsg)
                    }
                    stat = false
                    break

                }
                else if (accounts[i].em == em.value) {
                    if (excitingErrorMsg == null) {
                        let errorMsg = document.createElement("p")
                        errorMsg.textContent = "No no no Mr.Fish. Change Email"
                        errorMsg.style.color = "red"
                        errorMsg.classList.add("error_msg")
                        inputDiv.append(errorMsg)
                    }
                    else{
                        excitingErrorMsg.remove()
                        let errorMsg = document.createElement("p")
                        errorMsg.textContent = "No no no Mr.Fish. Change Email"
                        errorMsg.style.color = "red"
                        errorMsg.classList.add("error_msg")
                        inputDiv.append(errorMsg)
                    }
                    stat = false
                    break
                }
            }
            if (stat == true){
                newAcc.createPerson()
                window.location.href = "login.html"
            }
        }
        else{
            newAcc.createPerson()
            window.location.href = "login.html"
        }
}
})