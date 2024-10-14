const login = document.getElementById("log")
const em = document.getElementById("em")
const pass = document.getElementById("pass")
const sign = document.getElementById("in")

let accounts
if (JSON.parse(localStorage.getItem("accounts")) < 1) {
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


sign.addEventListener("click", ()=>{
    let newAcc = new Person(login.value, em.value, pass.value)
    newAcc.createPerson()
})