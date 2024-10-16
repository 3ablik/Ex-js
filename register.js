const login = document.getElementById("log")
const em = document.getElementById("em")
const pass = document.getElementById("pass")
const sign = document.getElementById("in")

let accounts
if (JSON.parse(localStorage.getItem("accounts")).length < 1) {
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
        let newId = Math.floor(Math.random() * 100000)
        if (JSON.parse(localStorage.getItem("accounts")) > 0) {
            let accs = JSON.parse(localStorage.getItem("accounts"))
            accs.forEach(element => {
                if(element.id == newId){
                    newId = Math.floor(Math.random() * 100000)
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
    if (login.value == "" || em.value == "" || pass.value == "") {
        alert("No.")
    }
    else{
        if (accounts.length != 0){
            for (let i = 0; i < accounts.length; i++) {
                if (accounts[i].login == login.value && accounts[i].em == em.value){
                    alert("No no no mister Fish. Change Login and Email")
                    stat = false
                    break
                }
                else if (accounts[i].login == login.value){
                    alert("No no no mister Fish. Change Login")
                    stat = false
                    break
                }
                else if (accounts[i].em == em.value) {
                    alert("No no no mister Fish. Change Email")
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