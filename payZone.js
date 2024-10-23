const bin = document.getElementById("bin_point")
const profile = document.getElementById("profile_point")
const allDiv = document.querySelector(".header__nav_me")
let really = false
bin.addEventListener("click", ()=>{
    if (really == false) {
        allDiv.innerHTML=`<p style="color:red">Ты действительно хочешь сделать это сейчас?<p>`     
        really = true   
    }

})
profile.addEventListener("click", ()=>{
    if (really == false) {
        allDiv.innerHTML=`<p style="color:red">Ты действительно хочешь сделать это сейчас?<p>`
        really = true  
    }
})

const hello = document.getElementById("header-title")
if (JSON.parse(localStorage.getItem("logged")) == true){
    logged = true
    userNowId = JSON.parse(localStorage.getItem("lastUserLogged"))[0]
    userName = JSON.parse(localStorage.getItem("lastUserLogged"))[1]
    hello.textContent = `САЛАМАЛЕЙКУМ ${userName}`    
}

else if(localStorage.getItem("logged") == null){
    logged = false
}
