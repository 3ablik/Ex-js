const bin = document.getElementById("bin_point")
const profile = document.getElementById("profile_point")
const nav = document.querySelector(".header__nav_me")
const navAll = document.getElementsByClassName("header__nav")
const hello = document.getElementById("header-title")
let exitBtn = document.getElementById("exit_btn")
const ls = document.getElementById("ls_point")
const main = document.querySelector(".main")
userNowId = JSON.parse(localStorage.getItem("lastUserLogged"))[0]
logName = JSON.parse(localStorage.getItem("lastUserLogged"))[1]
hello.textContent = `САЛАМАЛЕЙКУМ ${logName}`
users = JSON.parse(localStorage.getItem("accounts"))
let user
for (let i = 0; i < users.length; i++) {
    if (users[i].id == userNowId){
        user = users[i]
        let removed = users.splice(i, 1);
        break
    } 
}
const userDataDiv = document.getElementById("user-data")

profile.addEventListener("click", (e)=>{
    e.stopPropagation() // Я не знаю как работает, но без этого не работает
    profile.style.display = "none"
    exitBtn.style.display = "block"
    exitBtn.style.display = "block"
    exitBtn.style.background = "red"
    exitBtn.style.color = "white"
    exitBtn.style.fontSize = "12px"
    exitBtn.innerText = "Выйти???"
    exiting = true

    ls.style.display = "block"
    ls.style.background = "white"
    ls.style.color = "black"
    ls.style.fontSize = "12px"
    ls.innerText = "Личка"

})

exitBtn.addEventListener("click", ()=>{
    window.location.href = "login.html"
})

ls.addEventListener("click", ()=>{
    window.location.href = "ls.html"
})


document.addEventListener("click", (e) => {
    console.log(e)
    if (e.target !== exitBtn || e.target !==ls) {
        exitBtn.style.display = "none"
        ls.style.display = "none"
        profile.style.display ="block"
        exiting = false
    }
}) 

const mainP = document.createElement("p")
mainP.textContent = `How are you doing, ${logName}?`
mainP.classList.add('main-title')
main.insertAdjacentElement("afterBegin", mainP)

let nameLabel = document.createElement("p")
nameLabel.textContent = "Login"
let userName = document.createElement("input")
userName.type = "text"
userName.readOnly = true
userName.value = user.login

userName.classList.add("userDatas")
const logDiv = document.createElement("div")
logDiv.append(nameLabel)
logDiv.append(userName)
logDiv.classList.add("userDataDivs")

userDataDiv.append(logDiv)

let emLabel = document.createElement("p")
emLabel.textContent = "E-mail"
let userEm = document.createElement("input")
userEm.type = "email"
userEm.readOnly = true
userEm.value = user.em
userEm.classList.add("userDatas")

const emDiv = document.createElement("div")
emDiv.append(emLabel)
emDiv.append(userEm)
userDataDiv.append(emDiv)
emDiv.classList.add("userDataDivs")

let passLabel = document.createElement("p")
passLabel.textContent = "Password"
let userPass = document.createElement("input")
userPass.type = "password"
userPass.readOnly = true
userPass.value = user.pass
userDataDiv.append(passLabel)
userDataDiv.append(userPass)
userPass.classList.add("userDatas") 

const passDiv = document.createElement("div")
passDiv.append(passLabel)
passDiv.append(userPass)
userDataDiv.append(passDiv)
passDiv.classList.add("userDataDivs")

let editBtn = document.createElement("button")
editBtn.textContent = "Edit"
editBtn.classList.add("edit_btn")
let editLabel = document.createElement("p")
editLabel.textContent = "Edit/Save"

const editDiv = document.createElement("div")
editDiv.append(editLabel)
editDiv.append(editBtn)
userDataDiv.append(passDiv)
editDiv.classList.add("userDataDivs")
userDataDiv.append(editDiv)

let edit = false

editBtn.addEventListener('click', ()=>{
    if (!edit) {
        let inputs = document.querySelectorAll(".userDatas")
        console.log(inputs);
        userName.readOnly = false
        userEm.readOnly = false
        userPass.readOnly = false
        editBtn.textContent = "Save"
        edit = true        
    }
    else{
        let inputs = document.querySelectorAll(".userDatas")
        console.log(inputs);
        let errorStill = false
        let error = document.createElement("p")
        error.style.color = "red"
        users.forEach(element => {
            if (element.login == userName.value) {
                error.textContent = "This login is already zanyat"
                errorStill = true
            }
            else if (element.em == userEm.value) {
                error.textContent = "This email is already zanyat"
                errorStill = true
            }
            else if (userPass.value.length < 8){
                error.textContent = "This password is too short. It must be at least 8"
                errorStill = true                
            }
        });
        if (error.textContent != undefined && errorStill == true) {
            userDataDiv.append(error)
            errorStill = false
        }
        else{
            userName.readOnly = true
            userEm.readOnly = true
            userPass.readOnly = true
            editBtn.textContent = "Edit"
            edit = false
            save(userName.value, userEm.value, userPass.value)             
        }
     
    }
})


function save(l, e, p){
    const newUser ={
        id: userNowId,
        login: l,
        em: e,
        pass: p,
        
    }
    users.push(newUser)
    localStorage.removeItem("accounts")
    localStorage.setItem("accounts", JSON.stringify(users))

    localStorage.removeItem("lastUserLogged")
    localStorage.setItem("lastUserLogged", JSON.stringify([userNowId, newUser.login]))
    location.reload()
}