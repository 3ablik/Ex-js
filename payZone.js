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
