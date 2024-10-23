let binTovars = JSON.parse(localStorage.getItem("binStorage"))
console.log(binTovars);
let bins = document.querySelector(".bins")
const main = document.querySelector(".main")
const logged = JSON.parse(localStorage.getItem("logged"))

console.log(logged);
let userNowId = JSON.parse(localStorage.getItem("lastUserLogged"))
let lastUserBin = []
if (binTovars != null) {
    for (let index = 0; index < binTovars.length; index++) {
        if (binTovars[index].id == userNowId) {
            lastUserBin.push(binTovars[index])
            console.log(index);
            console.log(binTovars[index]);
        }
        
    }    
}

const profile = document.getElementById("profile_point")
const exitBtn = document.getElementById("exit_btn")
profile.addEventListener("click", (e)=>{
    if (logged) {
        e.stopPropagation() // Я не знаю как работает, но без этого не работает
        exitBtn.style.display = "block"
        profile.style.display = "none"
        exitBtn.style.display = "block"
        exitBtn.style.background = "red"
        exitBtn.style.color = "white"
        exitBtn.style.fontSize = "12px"
        exitBtn.innerText = "Выйти???"
        exiting = true        
    }
    else{
        window.location.href = "login.html"
    }

})

exitBtn.addEventListener("click", ()=>{
    window.location.href = "login.html"
    
})
document.addEventListener("click", (e) => {
    console.log(e)
    if (e.target !== exitBtn) {
        exitBtn.style.display = "none"
        profile.style.display ="block"
        exiting = false
    }
}) 

let total = 0

class Show{ //Использовал классы
    constructor(category, title, image, price, amount){
        this.category = category
        this.title = title
        this.image = image
        this.price = price
        this.amount = amount
    }



    render(){
        console.log("Rendering...")
        console.log(bins)

        let tovarCard = document.createElement("div")
        tovarCard.classList.add("tovar")
        let tovarImg = document.createElement("img")
        tovarImg.src = this.image
        tovarImg.classList.add("tovar_img")
        let tovarTitle = document.createElement("p")
        tovarTitle.textContent = this.title
        tovarTitle.classList.add("tovar_title")
        let tovarData = document.createElement("div")
        tovarData.classList.add("tovar_data")
        let tovarPrice = document.createElement("p")
        tovarPrice.classList.add("tovar_price")
        tovarPrice.textContent = this.price
        let amountAll = document.createElement("div")
        amountAll.classList.add("amount_all")
        let reduce = document.createElement("button")
        reduce.classList.add("tovar_price")
        reduce.classList.add("reduce")
        reduce.textContent = "-"
        let up = document.createElement("button")
        up.classList.add("tovar_price")
        up.classList.add("up")
        up.textContent = "+"
        let tovarAmount = document.createElement("p")
        tovarAmount.textContent = this.amount
        tovarAmount.classList.add("tovar_price")

        total = total + this.amount*this.price

        tovarCard.append(tovarImg)
        tovarCard.append(tovarTitle)
        tovarCard.append(tovarData)
        tovarData.append(tovarPrice)
        tovarData.append(amountAll)
        amountAll.append(reduce)
        amountAll.append(tovarAmount)
        amountAll.append(up)
        bins.append(tovarCard)

        // bins.innerHTML += `
        // <div class="tovar">
        //     <img src="${this.image}" alt="" class="tovar_img">
        //     <p class="tovar_title">${this.title}</p>
        //     <div class="tovar_data">
        //         <p class="tovar_price">${this.price*this.amount}</p>
        //         <div class = "amount_all">
        //             <button class="tovar_price reduce">-</button>
        //             <p class="tovar_price">${this.amount}</p>
        //             <button class="tovar_price up">+</button>
        //         </div>

        //     </div>
        // </div>`
    } //Буквальный рендер через this, впихивает в хтмл
}



if (lastUserBin.length != 0) {
    lastUserBin.forEach(element => {
        let tovarShow = new Show(element.category, element.title, element.image, element.price, element.amount)
        tovarShow.render()
    });
    
    main.innerHTML += `
    <br>
    <br>
    <br>
    <br>
    <p class = tovar_price> Total: ${total}<p>    
    <a href="./payZone.html"><button id="buyBin">Купить все</button></a>
    `
}
else{
    main.innerHTML += `<p class="desc">Пусто...</p>`
}
const reduceBtn = document.querySelectorAll(".reduce")
const upBtn = document.querySelectorAll(".up")
let uBinStorage = binTovars
console.log(reduceBtn)

reduceBtn.forEach((e, index)=>{
    e.addEventListener("click", ()=>{
        console.log(e)
        let tovarAllData = e.parentElement.parentElement.parentElement.children
        tovarData = tovarAllData[2].children
        tovarImg = tovarAllData[0].src
        tovarTitle = tovarAllData[1].innerText
        tovarAmount = tovarData[1].children[1].innerText
        console.log(tovarAmount)
        console.log(tovarImg, tovarTitle, tovarAmount, index) //Получает все данные в виде текста
        tovarAmount--
        if (tovarAmount < 1) {
            let removed = uBinStorage.splice(index, 1)
            console.log("aaa")
        }
        else{
            console.log(uBinStorage)
            for (let i = 0; i < uBinStorage.length; i++) {
                console.log(tovarTitle)
                console.log(uBinStorage[i].title.trim())

                if (tovarTitle == uBinStorage[i].title.trim()) {
                    uBinStorage[i].amount = tovarAmount
                }
                
            }
           
        }
        console.log(uBinStorage)
        localStorage.removeItem("binStorage")
        localStorage.setItem("binStorage", JSON.stringify(uBinStorage))
        location.reload()         

    })
})

upBtn.forEach((e, index)=>{
    e.addEventListener("click", ()=>{
        console.log(e)
        let tovarAllData = e.parentElement.parentElement.parentElement.children
        tovarData = tovarAllData[2].children
        tovarImg = tovarAllData[0].src
        tovarTitle = tovarAllData[1].innerText
        tovarAmount = tovarData[1].children[1].innerText
        console.log(tovarAmount)
        console.log(tovarImg, tovarTitle, tovarAmount, index) //Получает все данные в виде текста
        tovarAmount++
        console.log(uBinStorage)
        for (let i = 0; i < uBinStorage.length; i++) {
            console.log(tovarTitle)
            console.log(uBinStorage[i].title.trim())

            if (tovarTitle == uBinStorage[i].title.trim()) {
                uBinStorage[i].amount = tovarAmount
            }
            
        }
        console.log(uBinStorage)
        localStorage.removeItem("binStorage")
        localStorage.setItem("binStorage", JSON.stringify(uBinStorage))
        location.reload()
    })
})